// Capture avec WebGL activé (Chrome headless désactive le GPU par défaut).
// Usage: node shot-webgl.js <url> <largeur> <hauteur> <fichier-sortie> [attente-ms]
const { chromium } = require("playwright-core");

(async () => {
  const [url, w, h, out, waitMs = "3500"] = process.argv.slice(2);
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: [
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--ignore-gpu-blocklist",
    ],
  });
  const page = await browser.newPage({
    viewport: { width: Number(w), height: Number(h) },
  });

  const logs = [];
  page.on("console", (m) => m.type() === "error" && logs.push(m.text()));
  page.on("pageerror", (e) => logs.push(String(e)));

  await page.goto(url, { waitUntil: "networkidle" });
  // Laisse la moyenne temporelle du rendu se stabiliser.
  await page.waitForTimeout(Number(waitMs));

  const etat = await page.evaluate(() => {
    const host = document.querySelector("[data-webgl]");
    const canvas = document.querySelector("canvas");
    const gl = canvas && (canvas.getContext("webgl2") || canvas.getContext("webgl"));
    return {
      webglAttribut: host ? host.dataset.webgl : "(aucun)",
      canvasPresent: !!canvas,
      canvasAffiche: canvas ? getComputedStyle(canvas).display : "(aucun)",
      contexteOK: !!gl,
      taille: canvas ? `${canvas.width}x${canvas.height}` : "-",
    };
  });
  console.log(JSON.stringify({ ...etat, erreursConsole: logs }, null, 2));

  await page.screenshot({ path: out });
  await browser.close();
})();
