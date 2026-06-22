import type { Metadata } from "next";
import { PartnerRegisterForm } from "@/components/forms/partner-register-form";

export const metadata: Metadata = {
  title: "Devenir partenaire transitaire / transporteur",
  description:
    "Rejoignez le réseau Dom & Sea : transitaires, commissionnaires, transporteurs et logisticiens. Recevez des demandes qualifiées sur vos destinations DOM-TOM.",
  alternates: { canonical: "/devenir-partenaire" },
};

export default function DevenirPartenairePage() {
  return (
    <div className="py-16">
      {/* En-tête */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-2xl">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Espace partenaire
          </p>
          <h1 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-abyss)] mb-4">
            Rejoignez le réseau<br />Dom & Sea
          </h1>
          <p className="text-[var(--color-channel)] leading-relaxed">
            Recevez des demandes de transport qualifiées sur les destinations
            que vous desservez. Inscription gratuite, validation manuelle de
            votre dossier sous 3 à 5 jours ouvrés.
          </p>
        </div>

        {/* Avantages en bref */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {[
            { icon: "◫", title: "Demandes qualifiées", body: "Reçues directement, sans intermédiaire ni prospection." },
            { icon: "✓", title: "Visibilité renforcée", body: "Votre note et vos avis clients valorisent votre profil." },
            { icon: "⊕", title: "Gestion centralisée", body: "Devis, messages et documents au même endroit." },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex items-start gap-4 p-5 bg-[var(--color-foam-dim)] rounded-sm">
              <span className="text-xl shrink-0 font-mono text-[var(--color-beacon)]">{icon}</span>
              <div>
                <p className="font-display text-sm uppercase text-[var(--color-abyss)] mb-1">{title}</p>
                <p className="text-xs text-[var(--color-channel)]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnerRegisterForm />
      </div>
    </div>
  );
}
