import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestinationBySlug } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ─── Génération statique des 7 pages destinations ────────────────────────────

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) return {};

  return {
    title: dest.metaTitle,
    description: dest.metaDescription,
    alternates: { canonical: `/destinations/${dest.slug}` },
    openGraph: {
      title: dest.metaTitle,
      description: dest.metaDescription,
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DestinationPage({
  params,
}: {
  params: { slug: string };
}) {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) notFound();

  // Schema.org JSON-LD pour le SEO local/service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Transport et logistique maritime",
    provider: { "@type": "Organization", name: "Dom & Sea" },
    areaServed: { "@type": "Place", name: dest.name },
    description: dest.metaDescription,
  };

  return (
    <>
      {/* JSON-LD structuré pour les moteurs de recherche */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero destination */}
      <section className="bg-[var(--color-abyss)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fil d'ariane */}
          <nav aria-label="Fil d'ariane" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-[var(--color-channel)]">
              <li><Link href="/" className="hover:text-[var(--color-beacon)]">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/destinations" className="hover:text-[var(--color-beacon)]">Destinations</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--color-foam)]">{dest.name}</li>
            </ol>
          </nav>

          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            {dest.region}
          </p>
          <h1 className="font-display text-4xl lg:text-6xl uppercase text-[var(--color-foam)] mb-6 max-w-3xl">
            Transport vers {dest.name}
          </h1>
          <p className="text-lg text-[var(--color-channel-light)] max-w-2xl leading-relaxed mb-8 font-serif">
            {dest.heroDescription}
          </p>
          <Button size="xl" asChild>
            <Link href={`/devis?destination=${dest.enumValue}`}>
              Obtenir un devis pour {dest.name}
            </Link>
          </Button>
        </div>
      </section>

      {/* Fiche technique */}
      <section className="py-16 bg-[var(--color-foam)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Infos clés */}
            <div className="lg:col-span-1">
              <Card padding="lg">
                <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-5">
                  Données clés
                </h2>
                <dl className="flex flex-col gap-4">
                  <div>
                    <dt className="text-xs text-[var(--color-channel)] uppercase tracking-wide mb-1">
                      Port de destination
                    </dt>
                    <dd className="font-mono text-sm text-[var(--color-abyss)]">{dest.mainPort}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-channel)] uppercase tracking-wide mb-1">
                      Port de départ
                    </dt>
                    <dd className="font-mono text-sm text-[var(--color-abyss)]">{dest.metropolePort}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-channel)] uppercase tracking-wide mb-1">
                      Délai de transit moyen
                    </dt>
                    <dd className="font-mono text-sm text-[var(--color-abyss)]">{dest.transitTimeDays}</dd>
                  </div>
                  {dest.keyFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs text-[var(--color-channel)] uppercase tracking-wide mb-1">
                        {fact.label}
                      </dt>
                      <dd className="font-mono text-sm text-[var(--color-abyss)]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>

            {/* Contenu éditorial SEO */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-4">
                  Expédier vers {dest.name} : ce qu'il faut savoir
                </h2>
                <div className="prose-sm text-sm text-[var(--color-channel)] leading-relaxed flex flex-col gap-4">
                  <p>
                    Les flux de marchandises entre la France métropolitaine et{" "}
                    {dest.name} transitent majoritairement par voie maritime,
                    via le port de {dest.mainPort}. Le choix du bon partenaire
                    logistique conditionne directement les délais, les coûts et
                    la fiabilité de votre chaîne d'approvisionnement.
                  </p>
                  <p>
                    Sur cette liaison, les transitaires et commissionnaires de
                    transport membres du réseau Dom & Sea gèrent l'ensemble des
                    formalités douanières spécifiques aux DOM-TOM, notamment
                    l'octroi de mer et les documents d'importation. Le délai de
                    transit moyen constaté est de {dest.transitTimeDays}, hors
                    aléas portuaires.
                  </p>
                  <p>
                    Que vous expédiiez une palette unique ou un conteneur
                    complet de façon régulière, déposez votre demande pour
                    recevoir des devis comparables de plusieurs prestataires
                    vérifiés et spécialisés sur la destination {dest.name}.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* CTA secondaire */}
          <div className="mt-10 text-center">
            <p className="text-[var(--color-channel)] mb-4">
              Prêt à comparer les offres pour votre expédition vers {dest.name} ?
            </p>
            <Button size="lg" asChild>
              <Link href={`/devis?destination=${dest.enumValue}`}>
                Demander un devis gratuit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Autres destinations */}
      <section className="py-16 bg-white border-t border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-6">
            Autres destinations couvertes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {destinations
              .filter((d) => d.slug !== dest.slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="text-center px-3 py-3 border border-[var(--color-border-subtle)] rounded-sm hover:border-[var(--color-beacon)] hover:text-[var(--color-beacon)] transition-colors text-sm"
                >
                  {d.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
