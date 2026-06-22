import type { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/config/site";

export const metadata: Metadata = {
  title: "Destinations DOM-TOM desservies",
  description:
    "Découvrez les 7 destinations DOM-TOM couvertes par le réseau Dom & Sea : Guadeloupe, Martinique, Guyane, La Réunion, Mayotte, Polynésie française, Nouvelle-Calédonie.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsIndexPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Réseau de destinations
          </p>
          <h1 className="font-display text-4xl lg:text-5xl uppercase text-[var(--color-abyss)] mb-4">
            7 territoires, un réseau
          </h1>
          <p className="text-[var(--color-channel)]">
            Des Caraïbes au Pacifique, sélectionnez votre destination pour
            découvrir les spécificités logistiques et obtenir un devis adapté.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="group block">
              <div className="border border-[var(--color-border-subtle)] rounded-sm p-7 bg-white hover:border-[var(--color-beacon)] hover:shadow-md transition-all h-full flex flex-col">
                <p className="font-mono text-xs text-[var(--color-channel)] uppercase tracking-widest mb-3">
                  {dest.region}
                </p>
                <h2 className="font-display text-2xl uppercase text-[var(--color-abyss)] group-hover:text-[var(--color-beacon)] transition-colors mb-3">
                  {dest.name}
                </h2>
                <p className="text-sm text-[var(--color-channel)] mb-5 flex-1">
                  {dest.heroDescription}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)] text-xs">
                  <span className="font-mono text-[var(--color-channel)]">{dest.mainPort}</span>
                  <span className="font-mono text-[var(--color-beacon)]">{dest.transitTimeDays}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
