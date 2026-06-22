import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl uppercase text-[var(--color-abyss)] mb-8">
          Politique de confidentialité
        </h1>

        <div className="prose prose-sm text-[var(--color-channel)] leading-relaxed flex flex-col gap-6">
          <div className="p-4 bg-[var(--color-foam-dim)] border-l-4 border-[var(--color-beacon)] rounded-sm">
            <p className="text-sm text-[var(--color-abyss)] font-medium m-0">
              ⚠️ Contenu provisoire — un audit RGPD complet (durées de
              conservation réelles, base légale de chaque traitement, sous-
              traitants, éventuel DPO) est nécessaire avant mise en ligne
              définitive et avant la collecte de vraies données personnelles.
            </p>
          </div>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              1. Données collectées
            </h2>
            <p>
              Dans le cadre de l'utilisation de la plateforme, Dom & Sea
              collecte : nom, prénom, adresse email, numéro de téléphone, nom
              de l'entreprise, et informations relatives aux demandes de
              transport (origine, destination, type de marchandise).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              2. Finalité du traitement
            </h2>
            <p>
              Ces données sont utilisées pour la mise en relation entre
              clients et partenaires, la gestion des comptes utilisateurs et
              l'amélioration du service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              3. Vos droits
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez d'un droit d'accès, de rectification, de
              suppression et de portabilité de vos données. Pour exercer ces
              droits, contactez-nous à l'adresse{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-[var(--color-beacon)]">
                {siteConfig.contactEmail}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
              4. Sécurité des données
            </h2>
            <p>
              Les mots de passe sont chiffrés. L'accès aux données sensibles
              est limité aux personnes habilitées. Les documents transmis via
              la plateforme sont stockés de manière sécurisée.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
