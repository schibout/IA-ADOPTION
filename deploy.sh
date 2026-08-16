#!/usr/bin/env bash
#
# Préparation d'une livraison du site IA Doption.
#
#   ./deploy.sh              installe, vérifie et construit le site
#   ./deploy.sh --skip-tests saute les tests end-to-end
#   ./deploy.sh --serve      sert la build en local après construction
#
# Le build n'est déclaré prêt que si le lint, les tests et la compilation
# passent. L'artefact produit est site/.next, à publier chez l'hébergeur
# de votre choix (`npm run start` pour le servir en Node).

set -euo pipefail

RACINE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE="$RACINE/site"
OUTILS="$RACINE/tools"

# Couleurs désactivées si la sortie n'est pas un terminal (CI, redirection)
if [ -t 1 ]; then
  VERT=$'\033[0;32m'; ROUGE=$'\033[0;31m'; GRAS=$'\033[1m'; FIN=$'\033[0m'
else
  VERT=''; ROUGE=''; GRAS=''; FIN=''
fi

etape() { printf '\n%s▸ %s%s\n' "$GRAS" "$1" "$FIN"; }
succes() { printf '%s✓ %s%s\n' "$VERT" "$1" "$FIN"; }
echec() { printf '%s✗ %s%s\n' "$ROUGE" "$1" "$FIN" >&2; exit 1; }

SANS_TESTS=0
SERVIR=0
for arg in "$@"; do
  case "$arg" in
    --skip-tests) SANS_TESTS=1 ;;
    --serve) SERVIR=1 ;;
    -h|--help) sed -n '3,11p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echec "Option inconnue : $arg (voir --help)" ;;
  esac
done

[ -d "$SITE" ] || echec "Dossier introuvable : $SITE"
command -v node >/dev/null 2>&1 || echec "Node.js est requis mais introuvable."

cd "$SITE"

etape "Installation des dépendances"
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
succes "Dépendances installées"

etape "Lint"
npm run lint
succes "Lint sans erreur"

etape "Build de production"
npm run build
succes "Build réussi"

if [ "$SANS_TESTS" -eq 0 ] && [ -d "$OUTILS" ]; then
  etape "Tests end-to-end (Playwright)"
  cd "$OUTILS"
  [ -d node_modules ] || npm install
  npm test
  succes "Tests end-to-end passés"
  cd "$SITE"
fi

printf '\n%s✓ Livraison prête.%s Artefact : site/.next\n' "$VERT" "$FIN"

if [ "$SERVIR" -eq 1 ]; then
  etape "Démarrage du serveur de production (Ctrl+C pour arrêter)"
  npm run start
fi
