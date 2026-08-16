const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4400", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(900);

  const info = await page.evaluate(() => {
    const h = document.querySelector("header");
    const root = getComputedStyle(document.documentElement);
    // Une sonde pour voir ce que valent les utilitaires isolément.
    const probe = document.createElement("div");
    probe.className = "bg-paper border-line";
    document.body.appendChild(probe);
    const ps = getComputedStyle(probe);
    const out = {
      classes: h.className,
      fondHeader: getComputedStyle(h).backgroundColor,
      varPaper: root.getPropertyValue("--color-paper"),
      varLine: root.getPropertyValue("--color-line"),
      sondeFond: ps.backgroundColor,
      sondeBordure: ps.borderTopColor,
    };
    probe.remove();
    return out;
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
