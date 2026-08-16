const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4400", { waitUntil: "networkidle" });

  const info = await page.evaluate(() => {
    const essai = (cls) => {
      const d = document.createElement("div");
      d.className = cls;
      document.body.appendChild(d);
      const v = {
        fond: getComputedStyle(d).backgroundColor,
        bordure: getComputedStyle(d).borderBottomColor,
        largeurBordure: getComputedStyle(d).borderBottomWidth,
      };
      d.remove();
      return v;
    };
    // La règle générée pour bg-paper/90 est-elle seulement présente ?
    let regle = "(introuvable)";
    for (const feuille of document.styleSheets) {
      try {
        for (const r of feuille.cssRules) {
          if (r.cssText && r.cssText.includes("bg-paper\\/90")) regle = r.cssText.slice(0, 200);
        }
      } catch {}
    }
    return {
      "bg-paper": essai("bg-paper"),
      "bg-paper/90": essai("bg-paper/90"),
      "border-b border-line": essai("border-b border-line"),
      regleGeneree: regle,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
