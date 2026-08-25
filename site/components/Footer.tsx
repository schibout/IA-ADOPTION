import Link from "next/link";
import { contact } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-ink">
            IA<span className="text-ink"> Doption</span>
          </p>
          <p className="mt-2 max-w-60 text-sm text-mist">
            L&rsquo;IA adoptée, pas subie. Performance et création de valeur
            pour les PME.
          </p>
        </div>
        <nav aria-label="Pied de page">
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/services" className="text-mist hover:text-ink">
                Services
              </Link>
            </li>
            <li>
              <Link href="/activites" className="text-mist hover:text-ink">
                Activités IA
              </Link>
            </li>
            <li>
              <Link href="/methode" className="text-mist hover:text-ink">
                Méthode
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="text-mist hover:text-ink">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-mist hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="text-sm text-mist">
          <p>
            <a href={`mailto:${contact.email}`} className="hover:text-ink">
              {contact.email}
            </a>
          </p>
          <ul className="mt-4 grid gap-2">
            <li>
              <Link href="/mentions-legales" className="hover:text-ink">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-ink">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-mist">
        © {new Date().getFullYear()} IA Doption. Site sans cookie de suivi.
      </div>
    </footer>
  );
}
