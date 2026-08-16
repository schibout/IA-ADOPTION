import type { Metadata } from "next";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-bold text-ink">Mentions légales</h1>

      <div className="mt-8 grid gap-6 text-sm text-mist">
        <div>
          <h2 className="font-bold text-ink">Éditeur du site</h2>
          <p className="mt-1">
            IA Doption — [forme juridique, capital, RCS et adresse à compléter
            avant mise en ligne]. Contact&nbsp;:{" "}
            <a href={`mailto:${contact.email}`} className="text-green-deep">
              {contact.email}
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className="font-bold text-ink">Directeur de la publication</h2>
          <p className="mt-1">[À compléter avant mise en ligne]</p>
        </div>
        <div>
          <h2 className="font-bold text-ink">Hébergement</h2>
          <p className="mt-1">
            [Raison sociale, adresse et contact de l&rsquo;hébergeur à
            compléter avant mise en ligne — mention obligatoire au titre de la
            LCEN.]
          </p>
        </div>
        <div>
          <h2 className="font-bold text-ink">Propriété intellectuelle</h2>
          <p className="mt-1">
            L&rsquo;ensemble des contenus de ce site (textes, visuels, logo)
            est la propriété d&rsquo;IA Doption, sauf mention contraire. Toute
            reproduction sans autorisation est interdite.
          </p>
        </div>
      </div>
    </section>
  );
}
