import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/**
 * Layout partagé par toutes les pages publiques (accueil, destinations, blog, contact…).
 * Le Header est fixed (z-40), donc on ajoute pt-16 pour compenser sa hauteur.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
