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
    command: "npm run start -- --port 4321",
    cwd: "../site",
    url: "http://localhost:4321",
    // false : on veut toujours tester CE site, jamais une autre app
    // qui occuperait déjà le port.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
