import type { Metadata } from "next";
import CtaFinal from "@/components/CtaFinal";
import { etapesMethode, casUsage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Méthode",
  description:
    "Notre méthode en 4 étapes : diagnostic, pilote, déploiement, adoption. Des indicateurs définis avant chaque étape, des résultats mesurables en 90 jours.",
};

export default function Methode() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
          La méthode
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold text-ink md:text-5xl">
          Du diagnostic à l&rsquo;adoption. En 90 jours.
        </h1>
        <p className="mt-5 max-w-xl text-mist">
          Un chemin balisé, des indicateurs définis avant chaque étape — pas
          après. Vous savez toujours où vous en êtes et ce que ça rapporte.
        </p>

        <ol className="mt-12 grid gap-4">
          {etapesMethode.map((e) => (
            <li
              key={e.numero}
              className="grid gap-3 rounded-lg border border-line bg-white p-7 md:grid-cols-[100px_220px_1fr] md:items-baseline"
            >
              <p className="font-display text-3xl font-bold text-violet">
                {e.numero}
              </p>
              <div>
                <h2 className="text-xl font-bold text-ink">{e.nom}</h2>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-mist">
                  {e.duree}
                </p>
              </div>
              <p className="text-sm text-mist">{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper-2 px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-3xl font-bold text-ink">
            Des cas concrets, sur votre métier.
          </h2>
          <p className="mt-3 max-w-xl text-mist">
            Un aperçu des cas d&rsquo;usage déployés sur des PME — chacun avec
            un résultat mesurable et un délai réaliste.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {casUsage.slice(0, 9).map((c) => (
              <div
                key={c.titre}
                className="flex h-full flex-col rounded-lg bg-white p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-violet">
                  {c.domaine}
                </p>
                <h3 className="mt-2 font-bold text-ink">{c.titre}</h3>
                <p className="mt-2 flex-1 text-sm text-mist">{c.description}</p>
                <p className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold text-green-deep">
                    {c.resultat}
                  </span>
                  <span className="text-mist">{c.delai}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaFinal />
    </>
  );
}
