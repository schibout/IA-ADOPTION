#!/usr/bin/env node
/**
 * Lance le serveur du site puis la suite Playwright, et garantit l'arrêt
 * du serveur à la fin — ce que le webServer de Playwright ne parvient pas
 * à faire ici : son arrêt passe par un wrapper shell qui ne relaie pas le
 * signal au next-server petit-fils, lequel survivait au run et bloquait le
 * port au run suivant (« port already used »).
 *
 * Tout argument est transmis à `playwright test` :
 *   node run-tests.js --project=desktop --grep "Navigation"
 */
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

// 4323 : port dédié aux tests. Surtout pas 4321 — c'est celui du serveur de
// PRODUCTION (service systemd ia-adoption, derrière nginx ia-adoption-preview) ;
// le partager faisait entrer les tests en collision avec la prod.
const PORT = 4323;
const SITE = path.join(__dirname, "..", "site");

/** Attente synchrone — utilisable dans un handler d'exit. */
function pauseSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/**
 * Pids qui écoutent sur le port, via /proc uniquement : pas de sous-processus
 * (ss/lsof), car dans cet environnement leur sortie n'est pas fiable pendant
 * l'arrêt du processus.
 */
function pidsSurPort(port) {
  const hex = port.toString(16).toUpperCase().padStart(4, "0");
  const inodes = new Set();
  for (const table of ["tcp", "tcp6"]) {
    let txt;
    try {
      txt = fs.readFileSync(`/proc/net/${table}`, "utf8");
    } catch {
      continue;
    }
    for (const ligne of txt.split("\n").slice(1)) {
      const cols = ligne.trim().split(/\s+/);
      // cols : sl local_address rem_address st ... inode(9e)
      if (cols.length > 9 && cols[3] === "0A" && cols[1].endsWith(":" + hex)) {
        inodes.add(cols[9]);
      }
    }
  }
  if (inodes.size === 0) return [];
  const pids = [];
  for (const entree of fs.readdirSync("/proc")) {
    if (!/^\d+$/.test(entree)) continue;
    let fds;
    try {
      fds = fs.readdirSync(`/proc/${entree}/fd`);
    } catch {
      continue;
    }
    for (const fd of fds) {
      let lien;
      try {
        lien = fs.readlinkSync(`/proc/${entree}/fd/${fd}`);
      } catch {
        continue;
      }
      const m = lien.match(/^socket:\[(\d+)\]$/);
      if (m && inodes.has(m[1])) {
        pids.push(Number(entree));
        break;
      }
    }
  }
  return pids;
}

/** Tue tout ce qui écoute encore sur le port (orphelins d'un run précédent). */
function libererPort() {
  for (let essai = 0; essai < 3; essai++) {
    const pids = pidsSurPort(PORT);
    if (pids.length === 0) return;
    for (const pid of pids) {
      // Le groupe entier (npm + sh + next-server), pas seulement le
      // processus lié au port — sinon les parents survivent.
      try {
        const stat = fs.readFileSync(`/proc/${pid}/stat`, "utf8");
        const pgid = Number(stat.split(") ").pop().split(" ")[2]);
        if (pgid > 1) process.kill(-pgid, "SIGKILL");
      } catch {}
      try {
        process.kill(pid, "SIGKILL");
      } catch {}
    }
    console.log(`[run-tests] port ${PORT} : arrêt de ${pids.join(", ")}`);
    pauseSync(300);
  }
}

function attendreServeur(timeoutMs = 120_000) {
  const debut = Date.now();
  return new Promise((resolve, reject) => {
    (function essai() {
      http
        .get({ host: "127.0.0.1", port: PORT, path: "/" }, (res) => {
          res.resume();
          resolve();
        })
        .on("error", () => {
          if (Date.now() - debut > timeoutMs) reject(new Error("le serveur ne répond pas"));
          else setTimeout(essai, 500);
        });
    })();
  });
}

(async () => {
  libererPort();

  // detached : le serveur et ses enfants forment leur propre groupe,
  // qu'on peut tuer d'un bloc à la fin. spawn direct de node, sans shell,
  // pour échapper à tout wrapper.
  const nextBin = path.join(SITE, "node_modules", "next", "dist", "bin", "next");
  const serveur = spawn(
    process.execPath,
    [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(PORT)],
    { cwd: SITE, detached: true, stdio: "ignore" },
  );
  const arreterServeur = () => {
    try {
      process.kill(-serveur.pid, "SIGKILL");
    } catch {}
    // Ceinture et bretelles : le kill de groupe peut manquer le next-server
    // re-parenté ; on balaie ce qui écoute encore sur le port (synchrone,
    // car exécuté dans le handler d'exit).
    libererPort();
  };
  process.on("exit", arreterServeur);
  for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => process.exit(130));

  try {
    await attendreServeur();
  } catch (e) {
    console.error(`[run-tests] ${e.message}`);
    process.exit(1);
  }

  const cli = require.resolve("@playwright/test/cli");
  const tests = spawn(process.execPath, [cli, "test", ...process.argv.slice(2)], {
    cwd: __dirname,
    stdio: "inherit",
  });
  tests.on("close", (code) => process.exit(code ?? 1));
})();
