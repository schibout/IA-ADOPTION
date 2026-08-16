"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import { contact } from "@/lib/content";

/** Vrai tant que la fenêtre est étroite. Pilote le basculement de mise en page. */
function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

/**
 * Hero de l'accueil.
 *
 * Le trou noir est décalé hors de l'axe avec `focus` pour que la moitié chargée
 * et la moitié qui se lit ne se recouvrent jamais, et `scrim` n'assombrit que
 * le bord où se pose le texte. Sur mobile la composition pivote : texte en
 * haut sous un voile, trou noir entier dans le tiers bas.
 *
 * Le disque reprend la palette de la marque plutôt que l'orange par défaut :
 * blanc verdi au bord interne, vert de marque au milieu, violet en périphérie.
 */
export default function Hero() {
  const narrow = useNarrow();

  return (
    // La barre de navigation est transparente au-dessus de ce hero : on le
    // remonte de sa hauteur (4rem) pour qu'il passe dessous, et le contenu
    // reprend ce décalage en padding pour rester dégagé.
    <section className="relative -mt-16 min-h-[calc(88svh+4rem)] w-full md:min-h-[724px]">
      <BlackHoleHeroSection
        focus={narrow ? [0.5, 0.78] : [0.74, 0.48]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={0.92}
        distance={24}
        elevation={narrow ? -7 : -5.5}
        fov={narrow ? 58 : 42}
        hotColor="#EAFFF4"
        midColor="#00D084"
        coolColor="#3B2FA8"
        doppler={0.35}
        glow={narrow ? 0.85 : 1}
        exposure={0.92}
        steps={narrow ? 190 : 280}
        resolution={narrow ? 0.6 : 0.7}
      >
        <div className="flex h-full min-h-[calc(88svh+4rem)] items-start px-5 pt-28 sm:px-10 md:min-h-[724px] md:items-center md:pt-16 lg:px-16">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-green">
              PME &amp; ETI · France et Europe francophone
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              L&rsquo;IA adoptée,
              <br />
              pas subie.
            </h1>
            <p className="mt-6 max-w-md text-white/70 md:text-lg">
              Nous aidons les dirigeants de PME à transformer leur organisation
              grâce à l&rsquo;IA —{" "}
              <strong className="font-semibold text-white">
                des résultats mesurables, déployés en semaines, qui tiennent
                dans le temps.
              </strong>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={contact.calendrier}
                className="rounded-md bg-green px-7 py-3.5 font-medium text-ink transition-opacity hover:opacity-85"
              >
                Réserver un appel découverte
              </a>
              <Link
                href="/services"
                className="group rounded-md border border-white/25 px-6 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/50 hover:text-white"
              >
                Découvrir nos services{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </BlackHoleHeroSection>
    </section>
  );
}
