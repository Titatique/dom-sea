import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, destinations } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ─── Métadonnées SEO ──────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Dom & Sea — Logistique Métropole / DOM-TOM",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

// ─── Section Hero ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative bg-[var(--color-abyss)] overflow-hidden min-h-[90vh] flex items-center">
      {/* Carte de navigation SVG — la "signature" du design */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Quadrillage nautique subtil */}
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1b3a4b" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C8651B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C8651B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#grid)" />
          <ellipse cx="720" cy="400" rx="500" ry="300" fill="url(#glow)" />

          {/* Routes maritimes — tracés stylisés métropole → DOM-TOM */}
          {/* Le Havre → Antilles (Caraïbes) */}
          <path
            className="route-dash"
            d="M 420 180 C 350 300, 280 400, 200 500 S 100 620, 80 700"
            stroke="#5B7A8C"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 8"
          />
          {/* Marseille → Réunion / Mayotte (Indien) */}
          <path
            className="route-dash"
            d="M 680 250 C 720 350, 800 450, 900 550 S 1050 680, 1100 750"
            stroke="#5B7A8C"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 8"
          />
          {/* Marseille → Pacifique */}
          <path
            className="route-dash"
            d="M 680 250 C 820 280, 1050 300, 1200 320 S 1380 340, 1420 380"
            stroke="#5B7A8C"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 8"
          />

          {/* Point de départ : métropole */}
          <circle cx="550" cy="200" r="6" fill="#C8651B" />
          <circle cx="550" cy="200" r="12" fill="#C8651B" fillOpacity="0.2" />

          {/* Points d'arrivée DOM-TOM */}
          <circle cx="80" cy="710" r="5" fill="#C8651B" fillOpacity="0.8" />
          <circle cx="160" cy="670" r="5" fill="#C8651B" fillOpacity="0.8" />
          <circle cx="1110" cy="755" r="5" fill="#C8651B" fillOpacity="0.8" />
          <circle cx="1050" cy="700" r="5" fill="#C8651B" fillOpacity="0.8" />
          <circle cx="1420" cy="390" r="5" fill="#C8651B" fillOpacity="0.8" />
        </svg>
      </div>

      {/* Contenu hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Label de contexte en mono */}
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-6">
            France métropolitaine · DOM-TOM · Logistique maritime
          </p>

          {/* Titre principal */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase text-[var(--color-foam)] leading-none mb-6 text-balance">
            Votre partenaire logistique entre la{" "}
            <span className="text-[var(--color-beacon)]">métropole</span> et les{" "}
            <span className="text-[var(--color-beacon)]">DOM-TOM</span>
          </h1>

          <p className="text-lg text-[var(--color-channel-light)] leading-relaxed mb-10 max-w-xl font-serif">
            Comparez et trouvez les meilleures solutions de transport pour vos
            marchandises. Transitaires, commissionnaires, transporteurs — tous
            vérifiés, tous notés.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button size="xl" asChild>
              <Link href="/devis">Obtenir un devis gratuit</Link>
            </Button>
            <Button variant="outline" size="xl" className="border-[var(--color-channel)] text-[var(--color-foam)] hover:bg-[var(--color-foam)] hover:text-[var(--color-abyss)]" asChild>
              <Link href="/devenir-partenaire">Devenir partenaire</Link>
            </Button>
          </div>

          {/* Chiffres clés */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#233544]">
            {[
              { value: "7", label: "DOM-TOM desservies", unit: "destinations" },
              { value: "48h", label: "Délai de réponse moyen", unit: "devis" },
              { value: "100%", label: "Partenaires vérifiés", unit: "garantie" },
            ].map(({ value, label, unit }) => (
              <div key={unit}>
                <p className="font-mono text-3xl font-semibold text-[var(--color-foam)] mb-1">
                  {value}
                </p>
                <p className="text-xs text-[var(--color-channel)] uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vague de transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60 Q360 0 720 30 Q1080 60 1440 10 L1440 60 Z" fill="var(--color-foam)" />
        </svg>
      </div>
    </section>
  );
}

// ─── Section Fonctionnement ───────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Décrivez votre besoin",
      body: "Remplissez notre formulaire de demande : type de marchandise, destination, volume, fréquence. Moins de 3 minutes.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Recevez des devis",
      body: "Nos partenaires qualifiés sur la destination choisie reçoivent votre demande et vous soumettent leurs offres sous 48h.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Comparez et choisissez",
      body: "Prix, délais, notes des autres clients : toutes les informations pour choisir en toute confiance.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Suivez votre expédition",
      body: "Messagerie intégrée, documents centralisés, historique complet. Votre logistique DOM-TOM enfin lisible.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
  ];

  return (
    <section id="fonctionnement" className="py-24 bg-[var(--color-foam)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Comment ça marche
          </p>
          <h2 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-abyss)]">
            Votre logistique DOM-TOM<br />en 4 étapes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ step, title, body, icon }) => (
            <div key={step} className="relative">
              {/* Connecteur entre étapes (desktop seulement) */}
              <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[var(--color-border-subtle)] z-0 -translate-x-1/2" aria-hidden="true" />

              <div className="relative z-10">
                {/* Numéro d'étape + icône */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-sm bg-[var(--color-abyss)] text-[var(--color-foam)] flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <span className="font-mono text-3xl font-semibold text-[var(--color-foam-dim)]">
                    {step}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-channel)] leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/devis">Déposer ma demande</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Section Avantages ────────────────────────────────────────────────────────

function AdvantagesSection() {
  const advantages = [
    {
      title: "Partenaires vérifiés",
      body: "Chaque transitaire et transporteur est validé manuellement par notre équipe avant d'accéder aux demandes clients.",
      icon: "✓",
    },
    {
      title: "Spécialisation DOM-TOM",
      body: "Nous ne faisons que ça. Notre réseau maîtrise les spécificités douanières, réglementaires et logistiques de chaque territoire.",
      icon: "◈",
    },
    {
      title: "Devis sous 48h",
      body: "Fini les appels téléphoniques à rallonge. Vos demandes sont reçues et traitées dans les délais affichés, garantie contractuelle.",
      icon: "◷",
    },
    {
      title: "Messagerie centralisée",
      body: "Toutes vos communications avec les prestataires, vos documents et l'historique de vos expéditions au même endroit.",
      icon: "⊟",
    },
    {
      title: "Données protégées",
      body: "Hébergement européen, chiffrement des données sensibles, conformité RGPD. Votre activité commerciale reste confidentielle.",
      icon: "⊕",
    },
    {
      title: "Gratuit pour les clients",
      body: "L'accès à la plateforme et la réception de devis sont gratuits pour les entreprises expéditrices. Toujours.",
      icon: "€",
    },
  ];

  return (
    <section className="py-24 bg-[var(--color-abyss)] dark-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Pourquoi Dom & Sea
          </p>
          <h2 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-foam)]">
            La confiance comme fondation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map(({ title, body, icon }) => (
            <Card key={title} variant="dark" padding="lg" className="group hover:border-[var(--color-beacon)] transition-colors duration-200">
              <div className="w-10 h-10 rounded bg-[var(--color-beacon)] text-white flex items-center justify-center font-mono text-lg mb-5">
                {icon}
              </div>
              <h3 className="font-display text-lg uppercase text-[var(--color-foam)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-channel-light)] leading-relaxed">
                {body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section Destinations ─────────────────────────────────────────────────────

function DestinationsSection() {
  return (
    <section id="destinations" className="py-24 bg-[var(--color-foam)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Réseau de destinations
          </p>
          <h2 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-abyss)]">
            7 destinations couvertes
          </h2>
          <p className="mt-4 text-[var(--color-channel)] max-w-lg mx-auto">
            Des Caraïbes à l'Océan Pacifique, notre réseau de partenaires vous
            accompagne sur toutes les liaisons DOM-TOM.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group block"
              aria-label={`Voir les solutions logistiques vers ${dest.name}`}
            >
              <div className="border border-[var(--color-border-subtle)] rounded-sm p-6 bg-white hover:border-[var(--color-beacon)] hover:shadow-md transition-all duration-200">
                {/* Région */}
                <p className="font-mono text-xs text-[var(--color-channel)] uppercase tracking-widest mb-2">
                  {dest.region}
                </p>
                {/* Nom de la destination */}
                <h3 className="font-display text-xl uppercase text-[var(--color-abyss)] group-hover:text-[var(--color-beacon)] transition-colors mb-3">
                  {dest.name}
                </h3>
                {/* Port principal */}
                <p className="text-xs text-[var(--color-channel)] mb-4">
                  {dest.mainPort}
                </p>
                {/* Délai de transit */}
                <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border-subtle)]">
                  <svg className="w-3.5 h-3.5 text-[var(--color-beacon)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-xs text-[var(--color-channel)]">
                    {dest.transitTimeDays}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section Témoignages ──────────────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    {
      author: "Marie-Claire Bertrand",
      role: "Directrice Supply Chain",
      company: "GMS Caraïbes",
      text: "Avant Dom & Sea, trouver un transitaire fiable pour la Martinique prenait des semaines. Aujourd'hui on reçoit 3 devis comparables en 48h. Le gain de temps est réel.",
      destination: "Martinique",
    },
    {
      author: "Thierry Kowalski",
      role: "Responsable logistique",
      company: "BTP Réunion Négoce",
      text: "La traçabilité des demandes et la messagerie centralisée ont complètement changé notre façon de gérer l'expédition de matériaux. Je recommande à tous les acteurs de la construction sur la Réunion.",
      destination: "La Réunion",
    },
    {
      author: "Jean-Paul Moutou",
      role: "Gérant",
      company: "Import Export DOM",
      text: "En tant que commissionnaire, recevoir des demandes qualifiées directement dans mon tableau de bord change tout. Les clients sont sérieux et les demandes bien renseignées.",
      destination: "Guadeloupe",
    },
  ];

  return (
    <section id="temoignages" className="py-24 bg-[var(--color-foam-dim)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Témoignages clients
          </p>
          <h2 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-abyss)]">
            Ils nous font confiance
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map(({ author, role, company, text, destination }) => (
            <Card key={author} variant="default" padding="lg" className="flex flex-col">
              {/* Guillemet stylisé */}
              <div className="font-mono text-4xl text-[var(--color-beacon)] leading-none mb-4">"</div>
              <p className="text-sm text-[var(--color-channel)] leading-relaxed mb-6 flex-1 italic">
                {text}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)]">
                <div>
                  <p className="font-display text-sm uppercase text-[var(--color-abyss)]">
                    {author}
                  </p>
                  <p className="text-xs text-[var(--color-channel)]">
                    {role} · {company}
                  </p>
                </div>
                <span className="font-mono text-xs bg-[var(--color-foam-dim)] text-[var(--color-channel)] px-2 py-1 rounded">
                  {destination}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section FAQ ──────────────────────────────────────────────────────────────

function FAQSection() {
  const faqs = [
    {
      q: "Dom & Sea est-il gratuit pour les entreprises expéditrices ?",
      a: "Oui, totalement. La plateforme est gratuite pour les entreprises qui recherchent des solutions de transport. Les prestataires (transitaires, transporteurs) s'acquittent d'un abonnement mensuel pour accéder aux demandes.",
    },
    {
      q: "Comment les partenaires sont-ils sélectionnés ?",
      a: "Chaque inscription de partenaire fait l'objet d'une validation manuelle par notre équipe : vérification du Kbis, des licences de transport, de l'assurance RC professionnelle. Aucun partenaire non validé n'accède aux demandes clients.",
    },
    {
      q: "Quels types de marchandises puis-je expédier ?",
      a: "Palettes standard, conteneurs 20 ou 40 pieds, vrac, colis, véhicules, marchandises réfrigérées. Pour les marchandises dangereuses, nous orientons vers des spécialistes IMDG.",
    },
    {
      q: "Quels sont les délais de transit moyens ?",
      a: "Les délais varient selon la destination : 12-18 jours pour les Antilles, 25-35 jours pour l'Océan Indien, 35-50 jours pour le Pacifique. Chaque page destination détaille les délais spécifiques et les rotations de navires.",
    },
    {
      q: "Je suis transitaire. Comment rejoindre la plateforme ?",
      a: "Rendez-vous sur la page 'Devenir partenaire', remplissez le formulaire d'inscription et soumettez vos justificatifs. Notre équipe valide les dossiers sous 3 à 5 jours ouvrés.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Questions fréquentes
          </p>
          <h2 className="font-display text-4xl uppercase text-[var(--color-abyss)]">
            FAQ
          </h2>
        </div>

        <div className="divide-y divide-[var(--color-border-subtle)]">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                <span className="font-display text-sm uppercase text-[var(--color-abyss)] group-open:text-[var(--color-beacon)] transition-colors">
                  {q}
                </span>
                <svg
                  className="w-5 h-5 text-[var(--color-channel)] group-open:rotate-45 transition-transform duration-200 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-channel)] leading-relaxed">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section CTA final ────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-20 bg-[var(--color-beacon)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl lg:text-5xl uppercase text-white mb-4">
          Prêt à simplifier votre logistique DOM-TOM ?
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Déposez votre première demande en moins de 3 minutes. Gratuit, sans engagement.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="xl"
            className="bg-white text-[var(--color-beacon)] hover:bg-[var(--color-foam)]"
            asChild
          >
            <Link href="/devis">Obtenir un devis</Link>
          </Button>
          <Button
            size="xl"
            className="border border-white text-white bg-transparent hover:bg-white/10"
            asChild
          >
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <AdvantagesSection />
      <DestinationsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
