// Vérifie que la barre de navigation passe bien du transparent au solide.
const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4400", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const lire = async () =>
    page.evaluate(() => {
      const h = document.querySelector("header");
      const s = getComputedStyle(h);
      const logo = h.querySelector("a span");
      return {
        fond: s.backgroundColor,
        bordure: s.borderBottomColor,
        couleurLogo: getComputedStyle(logo).color,
      };
    });

  const enHaut = await lire();
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(600);
  const apres = await lire();

  console.log(JSON.stringify({ enHaut, apresDefilement: apres }, null, 2));
  await page.screenshot({ path: "../screenshots/nav-scrolled.png" });
  await browser.close();
})();
