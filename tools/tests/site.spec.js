const { test, expect } = require("@playwright/test");

const PAGES = [
  { url: "/", titre: /IA Doption/, h1: /L.IA adoptée/ },
  { url: "/services", titre: /Services/, h1: /Quatre façons/ },
  { url: "/services/conseil-strategie-ia", titre: /conseil/i, h1: /Audit & conseil/ },
  { url: "/services/agents-ia", titre: /Agents IA/, h1: /Agents IA/ },
  { url: "/services/automatisation", titre: /Automatisation/, h1: /Automatisation/ },
  { url: "/services/saas-sur-mesure", titre: /SaaS/, h1: /SaaS sur mesure/ },
  { url: "/activites", titre: /Activités/, h1: /De la sensibilisation/ },
  { url: "/methode", titre: /Méthode/, h1: /Du diagnostic/ },
  { url: "/a-propos", titre: /À propos/, h1: /complémentarité rare/ },
  { url: "/contact", titre: /Contact/, h1: /premier diagnostic est gratuit/ },
  { url: "/mentions-legales", titre: /Mentions légales/, h1: /Mentions légales/ },
  { url: "/confidentialite", titre: /confidentialité/, h1: /confidentialité/ },
];

test.describe("Pages", () => {
  for (const p of PAGES) {
    test(`${p.url} répond, a un titre et un seul h1`, async ({ page }) => {
      const erreurs = [];
      page.on("console", (m) => m.type() === "error" && erreurs.push(m.text()));
      page.on("pageerror", (e) => erreurs.push(String(e)));

      const reponse = await page.goto(p.url);
      expect(reponse.status(), `statut HTTP de ${p.url}`).toBe(200);

      await expect(page).toHaveTitle(p.titre);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toContainText(p.h1);
      expect(erreurs, `erreurs console sur ${p.url}`).toEqual([]);
    });

    test(`${p.url} ne déborde pas horizontalement`, async ({ page }) => {
      await page.goto(p.url);
      const { vw, sw } = await page.evaluate(() => ({
        vw: document.documentElement.clientWidth,
        sw: document.documentElement.scrollWidth,
      }));
      expect(sw, `scrollWidth (${sw}) doit tenir dans le viewport (${vw})`).toBeLessThanOrEqual(vw + 1);
    });
  }
});

test.describe("Navigation", () => {
  test("le menu principal mène aux bonnes pages", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: /ouvrir le menu/i }).click();
    }
    const nav = page.locator("header");
    await nav.getByRole("link", { name: "Méthode", exact: true }).click();
    await expect(page).toHaveURL(/\/methode$/);
    await expect(page.locator("h1")).toContainText("Du diagnostic");
  });

  test("le logo ramène à l'accueil", async ({ page }) => {
    await page.goto("/methode");
    await page.locator("header").getByRole("link").first().click();
    await expect(page).toHaveURL(/localhost:4321\/$/);
  });

  test("les cartes services mènent au détail du pilier", async ({ page }) => {
    await page.goto("/services");
    await page.getByRole("link", { name: /Agents IA/ }).first().click();
    await expect(page).toHaveURL(/\/services\/agents-ia$/);
    await expect(page.getByRole("heading", { name: "Ce que vous obtenez" })).toBeVisible();
  });

  test("aucun lien interne mort depuis l'accueil", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page.locator("a[href^='/']").evaluateAll((as) => [
      ...new Set(as.map((a) => a.getAttribute("href"))),
    ]);
    expect(hrefs.length).toBeGreaterThan(4);
    for (const href of hrefs) {
      const r = await request.get(href);
      expect(r.status(), `lien ${href}`).toBe(200);
    }
  });
});

test.describe("Menu mobile", () => {
  test("s'ouvre et se ferme", async ({ page, isMobile }) => {
    test.skip(!isMobile, "spécifique au mobile");
    await page.goto("/");
    // Le libellé du bouton change à l'ouverture ; on le cible par sa position
    // dans l'en-tête pour suivre les deux états.
    const bouton = page.locator("header button").first();
    const lienServices = page.locator("header").getByRole("link", { name: "Services" });

    await expect(bouton).toHaveAccessibleName(/ouvrir le menu/i);
    await expect(bouton).toHaveAttribute("aria-expanded", "false");
    await expect(lienServices).toBeHidden();

    await bouton.click();
    await expect(lienServices).toBeVisible();
    await expect(bouton).toHaveAttribute("aria-expanded", "true");
    await expect(bouton).toHaveAccessibleName(/fermer le menu/i);

    await bouton.click();
    await expect(lienServices).toBeHidden();
    await expect(bouton).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Conversion", () => {
  test("le CTA principal ouvre la prise de rendez-vous", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Réserver un appel découverte/ }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", /mailto:contact@iaadoption\.ai/);
  });

  test("chaque page de service se termine par un appel à l'action", async ({ page }) => {
    await page.goto("/services/automatisation");
    await expect(
      page.getByRole("heading", { name: /Parlons de votre projet/ }),
    ).toBeVisible();
  });

  test("les liens LinkedIn des fondateurs sont corrects", async ({ page }) => {
    await page.goto("/a-propos");
    const liens = page.getByRole("link", { name: /Profil LinkedIn/ });
    await expect(liens).toHaveCount(2);
    for (const l of await liens.all()) {
      await expect(l).toHaveAttribute("href", /linkedin\.com\/in\//);
      await expect(l).toHaveAttribute("rel", /noopener/);
    }
  });
});

test.describe("Accessibilité", () => {
  test("la navigation clavier atteint le CTA avec un focus visible", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "navigation clavier testée sur desktop");
    await page.goto("/");
    let trouve = false;
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const actif = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { texte: el.textContent?.trim().slice(0, 40), tag: el.tagName } : null;
      });
      if (actif?.texte?.includes("Réserver un appel")) {
        trouve = true;
        const outline = await page.evaluate(
          () => getComputedStyle(document.activeElement, ":focus-visible").outlineWidth,
        );
        expect(outline, "le focus doit être visible").not.toBe("0px");
        break;
      }
    }
    expect(trouve, "le CTA doit être atteignable au clavier").toBe(true);
  });

  test("toutes les images ont une alternative textuelle", async ({ page }) => {
    for (const p of ["/", "/a-propos", "/activites"]) {
      await page.goto(p);
      const sansAlt = await page.locator("img:not([alt])").count();
      expect(sansAlt, `images sans alt sur ${p}`).toBe(0);
    }
  });

  test("la langue du document est le français", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("le mouvement réduit désactive les animations d'apparition", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const transition = await page
      .locator(".reveal")
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(["0s", "0.01s"]).toContain(transition);
  });
});

test.describe("SEO", () => {
  test("l'accueil expose ses métadonnées de partage", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /adoption de l.IA|Agence/i,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "fr_FR",
    );
  });

  test("les pages légales ne sont pas indexées", async ({ page }) => {
    await page.goto("/mentions-legales");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  });
});
