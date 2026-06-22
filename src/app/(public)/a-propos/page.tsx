import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "À propos de Dom & Sea",
  description:
    "Dom & Sea simplifie la logistique entre la France métropolitaine et les DOM-TOM en connectant entreprises et partenaires de transport vérifiés.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-abyss)] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            À propos
          </p>
          <h1 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-foam)] mb-6">
            Connecter les deux rives
          </h1>
          <p className="text-lg text-[var(--color-channel-light)] leading-relaxed font-serif">
            {siteConfig.description}
          </p>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="py-20 bg-[var(--color-foam)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <p className="font-mono text-xs text-[var(--color-beacon)] uppercase tracking-widest mb-3">
                Mission
              </p>
              <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-4">
                Simplifier l'accès au transport DOM-TOM
              </h2>
              <p className="text-sm text-[var(--color-channel)] leading-relaxed">
                Les entreprises qui expédient vers les territoires d'outre-mer
                font face à un marché fragmenté et peu transparent. Notre
                mission est de leur donner accès, en quelques minutes, à un
                réseau de prestataires vérifiés et comparables.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs text-[var(--color-beacon)] uppercase tracking-widest mb-3">
                Vision
              </p>
              <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-4">
                La référence de la logistique ultramarine
              </h2>
              <p className="text-sm text-[var(--color-channel)] leading-relaxed">
                Nous voulons devenir le point de passage incontournable pour
                toute entreprise — petite ou grande — ayant besoin
                d'expédier vers ou depuis les DOM-TOM, en construisant la
                confiance par la transparence et la donnée.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs text-[var(--color-beacon)] uppercase tracking-widest mb-3">
                Valeurs
              </p>
              <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-4">
                Confiance, rigueur, proximité
              </h2>
              <p className="text-sm text-[var(--color-channel)] leading-relaxed">
                Chaque partenaire est vérifié manuellement. Chaque demande est
                traitée avec la rigueur du secteur logistique. Et chaque
                échange reste humain, malgré la technologie.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
