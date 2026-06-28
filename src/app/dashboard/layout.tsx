import type { Metadata } from "next";
import { Fjalla_One, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fjalla = Fjalla_One({
  variable: "--font-fjalla",
  subsets: ["latin"],
  weight: "400",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

function getSafeSiteUrl(): URL {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  try {
    if (candidate) return new URL(candidate);
  } catch {
  }
  return new URL("https://www.domandsea.com");
}

export const metadata: Metadata = {
  metadataBase: getSafeSiteUrl(),
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
