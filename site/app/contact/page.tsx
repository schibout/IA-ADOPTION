import type { Metadata } from "next";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Réservez un appel découverte de 30 minutes : identifions ensemble où l'IA peut créer de la valeur dans votre organisation. Gratuit, sans engagement.",
};

export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
        Contact
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold text-ink md:text-5xl">
        Votre premier diagnostic est gratuit.
      </h1>
      <p className="mt-5 max-w-xl text-mist">
        30 minutes pour identifier où l&rsquo;IA peut créer de la valeur dans
        votre organisation. Sans engagement, sans jargon.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-lg bg-ink p-8">
          <h2 className="text-xl font-bold text-paper">
            Réserver un appel découverte
          </h2>
          <p className="mt-3 text-sm text-paper/60">
            Le plus simple : un créneau de 30 minutes avec l&rsquo;un des deux
            fondateurs. Vous repartez avec une première lecture de vos
            opportunités IA.
          </p>
          <a
            href={contact.calendrier}
            className="mt-6 inline-block rounded-md bg-paper px-7 py-3.5 font-medium text-ink transition-opacity hover:opacity-85"
          >
            Choisir un créneau
          </a>
          <p className="mt-4 text-xs text-paper/40">
            Le calendrier de réservation en ligne (Cal.com) sera activé au
            lancement — en attendant, ce bouton ouvre un e-mail pré-rempli.
          </p>
        </div>

        <div className="rounded-lg border border-line bg-paper-2 p-8">
          <h2 className="text-xl font-bold text-ink">Nous écrire</h2>
          <p className="mt-3 text-sm text-mist">
            Une question, un projet à cadrer, une demande de formation ? Écrivez-nous — nous répondons sous 24 h ouvrées.
          </p>
          <p className="mt-6">
            <a
              href={`mailto:${contact.email}`}
              className="font-medium text-ink underline underline-offset-2"
            >
              {contact.email}
            </a>
          </p>
          <p className="mt-6 text-xs text-mist">
            Vos coordonnées ne servent qu&rsquo;à vous répondre. Pas de
            newsletter sans votre accord, pas de cookie de suivi sur ce site.
          </p>
        </div>
      </div>
    </section>
  );
}
