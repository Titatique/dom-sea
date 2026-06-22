import type { Metadata } from "next";
import { DevisForm } from "@/components/forms/devis-form";

export const metadata: Metadata = {
  title: "Obtenir un devis de transport DOM-TOM",
  description:
    "Décrivez votre besoin logistique et recevez des devis de transitaires et transporteurs spécialisés France métropolitaine / DOM-TOM sous 48h.",
  alternates: { canonical: "/devis" },
};

export default function DevisPage() {
  return (
    <div className="py-16">
      {/* En-tête de page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-2xl">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Demande de devis
          </p>
          <h1 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-abyss)] mb-4">
            Obtenez des devis<br />pour votre expédition
          </h1>
          <p className="text-[var(--color-channel)] leading-relaxed">
            Remplissez le formulaire ci-dessous. Nos partenaires logistiques
            qualifiés sur votre destination vous répondront sous{" "}
            <strong>48 heures ouvrées</strong>. Le service est entièrement
            gratuit pour les expéditeurs.
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DevisForm />
      </div>

      {/* Bloc de réassurance sous le formulaire */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: "🔒",
              title: "Données sécurisées",
              body: "Vos informations sont chiffrées et ne sont jamais revendues à des tiers.",
            },
            {
              icon: "✓",
              title: "Partenaires vérifiés",
              body: "Seuls les prestataires validés manuellement par notre équipe reçoivent vos demandes.",
            },
            {
              icon: "◷",
              title: "Réponse sous 48h",
              body: "Nos partenaires s'engagent contractuellement à répondre dans ce délai.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex items-start gap-4 p-5 bg-[var(--color-foam-dim)] rounded-sm">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="font-display text-sm uppercase text-[var(--color-abyss)] mb-1">{title}</p>
                <p className="text-xs text-[var(--color-channel)]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
