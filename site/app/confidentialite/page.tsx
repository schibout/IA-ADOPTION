import type { Metadata } from "next";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
};

export default function Confidentialite() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-bold text-ink">
        Politique de confidentialité
      </h1>

      <div className="mt-8 grid gap-6 text-sm text-mist">
        <div>
          <h2 className="font-bold text-ink">Aucun cookie de suivi</h2>
          <p className="mt-1">
            Ce site n&rsquo;utilise aucun cookie publicitaire ni traceur
            tiers. La mesure d&rsquo;audience, si elle est activée, repose sur
            une solution sans cookie hébergée en Europe et ne permet pas de
            vous identifier.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-ink">Données que vous nous confiez</h2>
          <p className="mt-1">
            Lorsque vous nous écrivez ou réservez un appel, nous recueillons
            uniquement les informations nécessaires pour vous répondre : nom,
            adresse e-mail, entreprise et votre message. Elles ne sont ni
            vendues, ni partagées, et sont conservées au maximum 3 ans après
            notre dernier échange.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-ink">Vos droits</h2>
          <p className="mt-1">
            Conformément au RGPD, vous pouvez demander l&rsquo;accès, la
            rectification ou la suppression de vos données à tout moment en
            écrivant à{" "}
            <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-2">
              {contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
