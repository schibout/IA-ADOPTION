"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const liens = [
  { href: "/services", label: "Services" },
  { href: "/activites", label: "Activités IA" },
  { href: "/methode", label: "Méthode" },
  { href: "/a-propos", label: "À propos" },
];

export default function Nav() {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const pathname = usePathname();

  // L'accueil ouvre sur un hero noir pleine largeur : la barre s'y pose en
  // transparence pour ne pas le trancher, et ne reprend son fond clair qu'une
  // fois le hero dépassé.
  const surHero = pathname === "/";

  useEffect(() => {
    if (!surHero) return;
    const onScroll = () => setDefile(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [surHero]);

  // Transparent seulement en haut de l'accueil, menu fermé.
  const clair = surHero && !defile && !ouvert;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        clair
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-paper/90 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-baseline gap-1 no-underline">
          <span
            className={`font-display text-xl font-bold tracking-tight ${
              clair ? "text-white" : "text-ink"
            }`}
          >
            IA
            <span className={clair ? "text-white" : "text-ink"}>
              {" "}
              Doption
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {liens.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm transition-colors ${
                  clair
                    ? "text-white/70 hover:text-white"
                    : "text-mist hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85 ${
                clair ? "bg-paper text-ink" : "bg-ink text-paper"
              }`}
            >
              Réserver un appel
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-expanded={ouvert}
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOuvert(!ouvert)}
          className={`flex h-10 w-10 items-center justify-center md:hidden ${
            clair ? "text-white" : "text-ink"
          }`}
        >
          <span aria-hidden="true" className="text-xl">
            {ouvert ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {ouvert && (
        <ul className="border-t border-line bg-paper px-5 py-4 md:hidden">
          {liens.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                className="block py-2.5 text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/contact"
              onClick={() => setOuvert(false)}
              className="inline-block rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper"
            >
              Réserver un appel
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
