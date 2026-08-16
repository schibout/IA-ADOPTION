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

  for (const ms of [0, 100, 350, 800, 2000]) {
    await page.waitForTimeout(ms === 0 ? 0 : ms);
    const v = await page.evaluate(() => {
      const h = document.querySelector("header");
      const cs = getComputedStyle(h);
      return {
        fond: cs.backgroundColor,
        transitionDuree: cs.transitionDuration,
        transitionProp: cs.transitionProperty,
        classe: h.className.includes("bg-paper") ? "solide" : "transparent",
      };
    });
    console.log(ms + "ms cumulés :", JSON.stringify(v));
  }
  await browser.close();
})();
