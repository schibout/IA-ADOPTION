// Screenshot + diagnostic de débordement horizontal.
// Usage: node shot.js <url> <largeur> <hauteur> <fichier-sortie> [fullpage]
const { chromium } = require("playwright-core");

(async () => {
  const [url, w, h, out, full] = process.argv.slice(2);
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: Number(w), height: Number(h) },
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const diag = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const sw = document.documentElement.scrollWidth;
    const coupables = [];
    if (sw > vw) {
      for (const el of document.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 0) {
          coupables.push(
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 80)} right=${Math.round(r.right)} w=${Math.round(r.width)}`,
          );
        }
        if (coupables.length > 12) break;
      }
    }
    return { vw, sw, coupables };
  });
  console.log(JSON.stringify(diag, null, 2));

  await page.screenshot({ path: out, fullPage: full === "fullpage" });
  await browser.close();
})();
