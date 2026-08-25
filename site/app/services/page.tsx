import type { Metadata } from "next";
import Link from "next/link";
import CtaFinal from "@/components/CtaFinal";
import { piliers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Audit et conseil en stratégie IA, agents IA, automatisation, SaaS sur mesure : quatre façons de créer de la valeur avec l'IA dans votre PME.",
};

export default function Services() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
          Services
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold text-ink md:text-5xl">
          Quatre façons de créer de la valeur avec l&rsquo;IA.
        </h1>
        <p className="mt-5 max-w-xl text-mist">
          Nous intervenons là où l&rsquo;IA crée une valeur immédiatement
          tangible — sans disruption, sans sur-promesse. Chaque intervention
          commence par comprendre votre métier.
        </p>

        <div className="mt-12 grid gap-5">
          {piliers.map((p, i) => (
            <Link
              key={p.slug}
              href={`/services/${p.slug}`}
              className="group grid gap-4 rounded-lg border border-line bg-paper-2 p-8 transition-colors hover:border-ink md:grid-cols-[1fr_2fr]"
            >
              <div>
                <p className="font-display text-sm font-bold text-mist">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-ink">{p.nom}</h2>
              </div>
              <div>
                <p className="font-medium text-ink">{p.accroche}</p>
                <p className="mt-2 text-sm text-mist">{p.description}</p>
                <p className="mt-4 text-sm font-medium text-ink">
                  En savoir plus{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaFinal />
    </>
  );
}
