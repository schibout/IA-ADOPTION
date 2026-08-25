import { contact } from "@/lib/content";

export default function CtaFinal() {
  return (
    <section className="bg-ink px-5 py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-paper md:text-5xl">
          Parlons de votre projet.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-paper/60">
          30 minutes pour identifier où l&rsquo;IA peut créer de la valeur dans
          votre organisation. Sans engagement, sans jargon.
        </p>
        <a
          href={contact.calendrier}
          className="mt-8 inline-block rounded-md bg-paper px-8 py-3.5 font-medium text-ink transition-opacity hover:opacity-85"
        >
          Réserver un appel découverte
        </a>
        <p className="mt-5 text-sm text-paper/40">{contact.email}</p>
      </div>
    </section>
  );
}
