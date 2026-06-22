import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  robots: { index: false, follow: true },
};

export default function CGUPage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl uppercase text-[var(--color-abyss)] mb-8">
          Conditions générales d'utilisation
        </h1>

        <div className="prose prose-sm text-[var(--color-channel)] leading-relaxed flex flex-col gap-6">
          <div className="p-4 bg-[var(--color-foam-dim)] border-l-4 border-[var(--color-beacon)] rounded-sm">
            <p className="text-sm text-[var(--color-abyss)] font-medium m-0">
              ⚠️ Contenu provisoire — Dom & Sea agit comme intermédiaire de
              mise en relation et n'est pas transporteur. Ce point, ainsi que
              les responsabilités de chaque partie, doivent être rédigés avec
              un avocat spécialisé en droit des transports avant toute mise en
              ligne définitive.
            </p>
          </div>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              1. Objet
            </h2>
            <p>
              Les présentes conditions générales régissent l'utilisation de la
              plateforme Dom & Sea, service de mise en relation entre
              entreprises expéditrices de marchandises et prestataires de
              transport (transitaires, commissionnaires, transporteurs,
              logisticiens) spécialisés sur les flux France métropolitaine /
              DOM-TOM.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              2. Rôle de Dom & Sea
            </h2>
            <p>
              Dom & Sea met en relation les utilisateurs mais n'intervient pas
              dans l'exécution du contrat de transport conclu entre le client
              et le partenaire. Dom & Sea ne saurait être tenue responsable de
              l'exécution, de la qualité ou des conséquences des prestations
              de transport réalisées par les partenaires référencés.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              3. Inscription et compte utilisateur
            </h2>
            <p>
              L'inscription sur la plateforme nécessite la fourniture
              d'informations exactes. Les partenaires font l'objet d'une
              vérification manuelle avant validation de leur compte.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              4. Obligations des utilisateurs
            </h2>
            <p>
              Chaque utilisateur s'engage à fournir des informations exactes
              et à jour, et à utiliser la plateforme conformément à sa
              destination.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
