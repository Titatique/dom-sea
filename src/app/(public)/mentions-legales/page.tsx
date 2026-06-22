import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl uppercase text-[var(--color-abyss)] mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-sm text-[var(--color-channel)] leading-relaxed flex flex-col gap-6">
          <div className="p-4 bg-[var(--color-foam-dim)] border-l-4 border-[var(--color-beacon)] rounded-sm">
            <p className="text-sm text-[var(--color-abyss)] font-medium m-0">
              ⚠️ Contenu provisoire — à compléter avec les informations
              réelles de votre société (raison sociale, SIRET, adresse du
              siège, capital social, hébergeur) et à faire valider par un
              professionnel du droit avant mise en ligne définitive.
            </p>
          </div>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              Éditeur du site
            </h2>
            <p>
              [Raison sociale à compléter], [forme juridique], au capital de
              [montant] euros, immatriculée au RCS de [ville] sous le numéro
              [SIRET], dont le siège social est situé [adresse complète].
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              Directeur de la publication
            </h2>
            <p>[Nom du responsable légal à compléter]</p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              Hébergement
            </h2>
            <p>
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images,
              logo, charte graphique) est protégé par le droit d'auteur. Toute
              reproduction sans autorisation préalable est interdite.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
