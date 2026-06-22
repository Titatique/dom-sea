import type { Metadata } from "next";
import { Fjalla_One, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Police d'affichage : condensée et haute, évoque la signalétique portuaire
// et le marquage des conteneurs. Utilisée pour tous les titres.
const fjalla = Fjalla_One({
  variable: "--font-fjalla",
  subsets: ["latin"],
  weight: "400",
});

// Police de corps : serif sobre, inspire la confiance et la lisibilité
// nécessaires pour un contenu à teneur contractuelle/légale.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Police mono : utilisée pour toutes les données chiffrées (poids, volumes,
// références de dossier, coordonnées GPS) afin de leur donner un statut
// de "donnée" clairement distinct du texte courant.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.domandsea.com"
  ),
  title: {
    default: "Dom & Sea — Logistique Métropole / DOM-TOM",
    template: "%s | Dom & Sea",
  },
  description:
    "Dom & Sea met en relation entreprises, transitaires, commissionnaires et transporteurs pour vos flux de marchandises entre la France métropolitaine et les DOM-TOM.",
  keywords: [
    "transport DOM-TOM",
    "transitaire Guadeloupe",
    "logistique Martinique",
    "fret maritime Réunion",
    "commissionnaire de transport",
    "expédition Guyane",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Dom & Sea",
    title: "Dom & Sea — Logistique Métropole / DOM-TOM",
    description:
      "Comparez et trouvez les meilleures solutions de transport pour vos marchandises entre la métropole et les DOM-TOM.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fjalla.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--color-background) text-(--color-foreground)">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
