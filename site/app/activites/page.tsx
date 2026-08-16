import type { Metadata } from "next";
import CtaFinal from "@/components/CtaFinal";
import { activites, formats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Activités IA",
  description:
    "Neuf activités pour faire adopter l'IA dans votre entreprise : audit de maturité, programme 90 jours, formations, assistants métiers, RAG documentaire, conformité, IA Ops.",
};

export default function Activites() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
          Activités IA
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold text-ink md:text-5xl">
          De la sensibilisation au projet livré.
        </h1>
        <p className="mt-5 max-w-xl text-mist">
          Neuf activités qui couvrent tout le chemin de l&rsquo;adoption :
          comprendre, décider, déployer, ancrer. Chacune a un format défini et
          un livrable clair.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activites.map((a) => (
            <div
              key={a.nom}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-6"
            >
              <h2 className="font-bold text-ink">{a.nom}</h2>
              <p className="mt-2 flex-1 text-sm text-mist">{a.description}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-violet">
                {a.format}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold text-ink">
          Nos formats d&rsquo;intervention
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {formats.map((f) => (
            <div key={f.nom} className="rounded-lg bg-ink p-6">
              <h3 className="font-bold text-paper">{f.nom}</h3>
              <p className="mt-1 text-xs text-paper/50">{f.duree}</p>
              <p className="mt-4 font-display text-xl font-bold text-green">
                {f.prix}
              </p>
            </div>
          ))}
        </div>
      </section>
      <CtaFinal />
    </>
  );
}
