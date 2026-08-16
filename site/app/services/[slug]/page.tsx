import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaFinal from "@/components/CtaFinal";
import { piliers, casUsage } from "@/lib/content";

export function generateStaticParams() {
  return piliers.map((p) => ({ slug: p.slug }));
}

const domainesParPilier: Record<string, string[]> = {
  "conseil-strategie-ia": ["Pilotage"],
  "agents-ia": ["Commercial", "RH"],
  automatisation: ["Support & Admin", "Opérations"],
  "saas-sur-mesure": ["Opérations", "Pilotage"],
};

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pilier = piliers.find((p) => p.slug === slug);
  if (!pilier) return {};
  return { title: pilier.nom, description: pilier.accroche };
}

export default async function PagePilier({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const pilier = piliers.find((p) => p.slug === slug);
  if (!pilier) notFound();

  const domaines = domainesParPilier[pilier.slug] ?? [];
  const exemples = casUsage
    .filter((c) => domaines.includes(c.domaine))
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm text-mist">
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>{" "}
          <span aria-hidden="true">/</span> {pilier.nom}
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold text-ink md:text-5xl">
          {pilier.nom}
        </h1>
        <p className="mt-4 max-w-xl text-lg font-medium text-ink">
          {pilier.accroche}
        </p>
        <p className="mt-4 max-w-2xl text-mist">{pilier.description}</p>

        <h2 className="mt-12 text-2xl font-bold text-ink">
          Ce que vous obtenez
        </h2>
        <ul className="mt-6 grid max-w-3xl gap-3">
          {pilier.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-lg border border-line bg-white px-5 py-4"
            >
              <span aria-hidden="true" className="mt-0.5 font-bold text-green-deep">
                ✓
              </span>
              <span className="text-sm text-ink">{point}</span>
            </li>
          ))}
        </ul>

        {exemples.length > 0 && (
          <>
            <h2 className="mt-14 text-2xl font-bold text-ink">
              Exemples de cas d&rsquo;usage
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {exemples.map((c) => (
                <div
                  key={c.titre}
                  className="rounded-lg border border-line bg-white p-6"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-violet">
                    {c.domaine}
                  </p>
                  <h3 className="mt-2 font-bold text-ink">{c.titre}</h3>
                  <p className="mt-2 text-sm text-mist">{c.description}</p>
                  <p className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-green-deep">
                      {c.resultat}
                    </span>
                    <span className="text-mist">{c.delai}</span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <CtaFinal />
    </>
  );
}
