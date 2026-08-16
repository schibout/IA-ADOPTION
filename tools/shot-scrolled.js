// Capture après défilement, en laissant le temps aux transitions CSS
// d'aboutir (le rendu WebGL logiciel de headless les ralentit fortement).
const { chromium } = require("playwright-core");

(async () => {
  const [url, w, h, y, out] = process.argv.slice(2);
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate((yy) => window.scrollTo(0, Number(yy)), y);
  await page.waitForTimeout(4000);
  await page.screenshot({ path: out });
  await browser.close();
})();
