const { defineConfig, devices } = require("@playwright/test");

/**
 * Tests end-to-end du site IA Doption.
 * Utilise le Chrome installé sur la machine (pas de téléchargement de navigateur).
 * Le serveur de production est démarré automatiquement sur le port 4321.
 */
module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4321",
    channel: "chrome",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
  webServer: {
    // Lancer le binaire directement (sans passer par `npm run`) : npm ne
    // relaie pas l'arrêt au next-server petit-fils, qui restait orphelin
    // et bloquait le port au run suivant.
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 4321",
    cwd: "../site",
    gracefulShutdown: { signal: "SIGTERM", timeout: 10_000 },
    url: "http://localhost:4321",
    // false : on veut toujours tester CE site, jamais une autre app
    // qui occuperait déjà le port.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
