import type { Metadata } from "next";
import CtaFinal from "@/components/CtaFinal";
import { fondateurs } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "IA Doption réunit un pair du dirigeant et un architecte technique. Notre manifeste : l'IA adoptée, pas subie.",
};

export default function APropos() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
          À propos
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold text-ink md:text-5xl">
          Une complémentarité rare&nbsp;: le conseil et la technique.
        </h1>
        <p className="mt-5 max-w-xl text-mist">
          Un grand cabinet vous vendra de la stratégie sans déploiement ; un
          freelance, du déploiement sans stratégie. Nous réunissons les deux
          dans une même structure — du diagnostic à l&rsquo;adoption, une seule
          équipe.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {fondateurs.map((f) => (
            <article
              key={f.nom}
              className="flex h-full flex-col rounded-lg border border-line bg-paper-2 p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-paper">
                  {f.initiales}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-ink">{f.nom}</h2>
                  <p className="text-xs uppercase tracking-wider text-mist">
                    {f.role}
                  </p>
                </div>
              </div>
              <p className="mt-5 flex-1 text-sm text-mist">{f.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-xs text-mist"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-sm font-medium text-ink hover:underline"
              >
                Profil LinkedIn ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/60">
            Notre manifeste
          </p>
          <blockquote className="mt-5 font-display text-2xl font-bold text-paper md:text-3xl">
            « L&rsquo;IA adoptée, pas subie. »
          </blockquote>
          <p className="mx-auto mt-5 max-w-xl text-paper/60">
            Nous ne déployons pas de la technologie pour la technologie. Chaque
            intervention part de votre réalité opérationnelle, se mesure en
            résultats concrets, et se termine quand vos équipes sont autonomes.
            Vous restez propriétaire de vos outils, de vos données et de vos
            décisions.
          </p>
        </div>
      </section>
      <CtaFinal />
    </>
  );
}
