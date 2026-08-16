import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iaadoption.ai"),
  title: {
    default: "IA Doption — L'IA adoptée, pas subie",
    template: "%s · IA Doption",
  },
  description:
    "Agence d'adoption de l'IA pour PME et ETI : audit et conseil en stratégie IA, agents IA, automatisation, SaaS sur mesure. Des résultats mesurables en 30 à 90 jours.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "IA Doption",
    title: "IA Doption — L'IA adoptée, pas subie",
    description:
      "Audit et conseil en stratégie IA, agents IA, automatisation, SaaS sur mesure pour PME et ETI.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
