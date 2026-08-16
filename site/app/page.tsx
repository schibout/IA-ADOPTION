import Link from "next/link";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import CtaFinal from "@/components/CtaFinal";
import { piliers, activites, etapesMethode, fondateurs } from "@/lib/content";

export default function Accueil() {
  return (
    <>
      <Hero />

      {/* Chiffres clés */}
      <section className="bg-ink px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {[
            ["25+", "cas d'usage déployés sur des PME réelles"],
            ["90 j", "pour des résultats mesurables et prouvés"],
            ["100 %", "des indicateurs définis avant chaque mission"],
          ].map(([n, l]) => (
            <div key={n} className="border-l-2 border-green pl-5">
              <p className="font-display text-4xl font-bold text-paper">{n}</p>
              <p className="mt-1 text-sm text-paper/50">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Les 4 piliers */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
            Nos services
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-ink md:text-4xl">
            Quatre façons de créer de la valeur avec l&rsquo;IA.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {piliers.map((p) => (
            <Reveal key={p.slug}>
              <Link
                href={`/services/${p.slug}`}
                className="group block h-full rounded-lg border border-line bg-white p-7 transition-colors hover:border-green-deep"
              >
                <h3 className="text-xl font-bold text-ink">{p.nom}</h3>
                <p className="mt-2 text-sm text-mist">{p.accroche}</p>
                <p className="mt-5 text-sm font-medium text-green-deep">
                  En savoir plus{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Méthode */}
      <section className="bg-paper-2 px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
              Comment ça marche
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-ink md:text-4xl">
              Du diagnostic à l&rsquo;adoption, en 90 jours.
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {etapesMethode.map((e) => (
              <Reveal key={e.numero} as="li">
                <div className="h-full rounded-lg bg-white p-6">
                  <p className="font-display text-sm font-bold text-violet">
                    {e.numero}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-ink">{e.nom}</h3>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-mist">
                    {e.duree}
                  </p>
                  <p className="mt-3 text-sm text-mist">{e.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-8">
            <Link href="/methode" className="text-sm font-medium text-green-deep">
              Voir la méthode en détail <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Activités */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
            Activités IA
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-ink md:text-4xl">
            De la sensibilisation au projet livré.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activites.slice(0, 6).map((a) => (
            <Reveal key={a.nom}>
              <div className="h-full rounded-lg border border-line bg-white p-6">
                <h3 className="font-bold text-ink">{a.nom}</h3>
                <p className="mt-2 text-sm text-mist">{a.description}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-violet">
                  {a.format}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <Link href="/activites" className="text-sm font-medium text-green-deep">
            Voir les 9 activités <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      {/* Fondateurs */}
      <section className="bg-paper-2 px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
              L&rsquo;équipe fondatrice
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-ink md:text-4xl">
              Un pair du dirigeant. Un architecte technique.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {fondateurs.map((f) => (
              <Reveal key={f.nom}>
                <div className="h-full rounded-lg bg-white p-7">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display font-bold text-green">
                      {f.initiales}
                    </span>
                    <div>
                      <h3 className="font-bold text-ink">{f.nom}</h3>
                      <p className="text-xs uppercase tracking-wider text-mist">
                        {f.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-mist">{f.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/a-propos" className="text-sm font-medium text-green-deep">
              Faire connaissance <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
