# Site IA Doption

Site vitrine de l'agence, construit avec Next.js 16 (App Router) et Tailwind CSS v4.
Les spécifications complètes se trouvent dans [`../docs/cahier-des-charges.md`](../docs/cahier-des-charges.md).

## Commandes

```bash
npm run dev     # développement, http://localhost:3000
npm run build   # build de production
npm run start   # sert la build
npm run lint    # ESLint
```

Depuis la racine du dépôt, `./deploy.sh` enchaîne installation, lint, build et
tests end-to-end, puis produit l'artefact `.next`.

## Structure

| Dossier | Contenu |
|---|---|
| `app/` | Les routes. Une page par dossier ; `services/[slug]` génère les 4 pages piliers. |
| `components/` | Composants du site (`Nav`, `Hero`, `Footer`, `CtaFinal`, `Reveal`). |
| `components/ui/` | Composants d'interface réutilisables, au format shadcn. |
| `lib/content.ts` | **Tout le contenu éditorial** : piliers, activités, cas d'usage, méthode, fondateurs, tarifs. |

Pour modifier un texte, une offre ou un tarif, éditez `lib/content.ts` — les
pages s'alimentent à cette source unique.

## Direction artistique

Les jetons de couleur et de typographie sont déclarés dans `app/globals.css`
via `@theme` : `paper`, `ink`, `green`, `violet`, `mist`. Les polices sont
Space Grotesk (titres) et Inter (texte), auto-hébergées par `next/font`.

## Hero WebGL

`components/ui/blackhole-hero-section.tsx` trace un trou noir de Schwarzschild
par lancer de rayons, en WebGL. Il n'a aucune dépendance externe. Points à
connaître avant d'y toucher :

- Le disque reprend la palette de la marque via `hotColor` / `midColor` /
  `coolColor` (voir `components/Hero.tsx`).
- `steps` et `resolution` sont les deux curseurs de coût ; ils sont déjà réduits
  sur mobile.
- Le composant se retire de lui-même si WebGL est indisponible ou si le rendu
  est logiciel, et respecte `prefers-reduced-motion` en affichant une image fixe.
- Le titre et les boutons vivent dans le DOM, jamais dans le canevas : la page
  reste lisible et navigable même sans WebGL.

## Tests

Les tests end-to-end Playwright sont dans [`../tools/`](../tools) :

```bash
cd ../tools && npm test
```
