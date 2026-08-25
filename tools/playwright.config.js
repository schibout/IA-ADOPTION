const { defineConfig, devices } = require("@playwright/test");

/**
 * Tests end-to-end du site IA Doption.
 * Utilise le Chrome installé sur la machine (pas de téléchargement de navigateur).
 *
 * Lancer via `npm test` (ou `node run-tests.js`) : c'est le lanceur qui
 * démarre et arrête le serveur sur le port 4323 — pas de webServer ici,
 * car son arrêt par Playwright laissait un next-server orphelin qui
 * bloquait le port au run suivant.
 */
module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    // 4323 = port de test dédié ; 4321 est réservé au serveur de production.
    baseURL: "http://localhost:4323",
    channel: "chrome",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
});
