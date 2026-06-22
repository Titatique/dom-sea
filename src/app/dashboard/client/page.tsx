import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, generateRequestReference } from "@/lib/utils";

export const metadata: Metadata = { title: "Mon espace client" };

// Mapping statut DB → variante Badge
const statusBadge: Record<string, { label: string; variant: string }> = {
  NOUVELLE: { label: "Nouvelle", variant: "nouvelle" },
  EN_COURS_DE_MATCHING: { label: "En cours", variant: "en_cours" },
  REPONSES_RECUES: { label: "Réponses reçues", variant: "reponses" },
  DEVIS_ACCEPTE: { label: "Devis accepté", variant: "acceptee" },
  EN_TRANSIT: { label: "En transit", variant: "transit" },
  LIVREE: { label: "Livrée", variant: "livree" },
  ANNULEE: { label: "Annulée", variant: "annulee" },
  EXPIREE: { label: "Expirée", variant: "expiree" },
};

export default async function ClientDashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  // Récupérer les 5 dernières demandes du client
  const recentRequests = await prisma.shipmentRequest.findMany({
    where: { clientId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      destination: true,
      goodsType: true,
      status: true,
      createdAt: true,
      _count: { select: { responses: true } },
    },
  });

  // Statistiques globales du client
  const [totalRequests, pendingResponses, activeShipments] = await Promise.all([
    prisma.shipmentRequest.count({ where: { clientId: session.user.id } }),
    prisma.shipmentRequest.count({
      where: { clientId: session.user.id, status: "REPONSES_RECUES" },
    }),
    prisma.shipmentRequest.count({
      where: { clientId: session.user.id, status: "EN_TRANSIT" },
    }),
  ]);

  // Notifications non lues
  const unreadNotifications = await prisma.notification.count({
    where: { userId: session.user.id, readAt: null },
  });

  const destinationLabels: Record<string, string> = {
    GUADELOUPE: "Guadeloupe",
    MARTINIQUE: "Martinique",
    GUYANE: "Guyane",
    REUNION: "La Réunion",
    MAYOTTE: "Mayotte",
    POLYNESIE: "Polynésie fr.",
    NOUVELLE_CALEDONIE: "Nouvelle-Cal.",
  };

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl uppercase text-[var(--color-abyss)]">
            Bonjour, {session.user.name?.split(" ")[0] ?? "—"}
          </h1>
          <p className="text-sm text-[var(--color-channel)] mt-1">
            {session.user.companyName}
          </p>
        </div>
        <Button asChild>
          <Link href="/devis">Nouvelle demande</Link>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Demandes totales", value: totalRequests },
          { label: "Réponses en attente", value: pendingResponses },
          { label: "En transit", value: activeShipments },
          { label: "Notifications", value: unreadNotifications },
        ].map(({ label, value }) => (
          <Card key={label} padding="md" className="text-center">
            <p className="font-mono text-3xl font-semibold text-[var(--color-abyss)]">
              {value}
            </p>
            <p className="text-xs text-[var(--color-channel)] mt-1 uppercase tracking-wide">
              {label}
            </p>
          </Card>
        ))}
      </div>

      {/* Dernières demandes */}
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)]">
          <h2 className="font-display text-lg uppercase text-[var(--color-abyss)]">
            Mes dernières demandes
          </h2>
          <Link
            href="/dashboard/client/demandes"
            className="text-sm text-[var(--color-beacon)] hover:underline"
          >
            Voir tout →
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[var(--color-channel)] mb-4">
              Vous n'avez pas encore de demande de transport.
            </p>
            <Button asChild>
              <Link href="/devis">Créer une demande</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {recentRequests.map((req) => {
              const status = statusBadge[req.status] ?? {
                label: req.status,
                variant: "default",
              };
              return (
                <Link
                  key={req.id}
                  href={`/dashboard/client/demandes/${req.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-[var(--color-foam-dim)] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-mono text-xs text-[var(--color-channel)] mb-0.5">
                        {generateRequestReference(req.id)}
                      </p>
                      <p className="text-sm font-medium text-[var(--color-abyss)]">
                        {destinationLabels[req.destination] ?? req.destination}
                      </p>
                      <p className="text-xs text-[var(--color-channel)]">
                        {formatDate(req.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {req._count.responses > 0 && (
                      <span className="font-mono text-xs text-[var(--color-channel)]">
                        {req._count.responses} réponse{req._count.responses > 1 ? "s" : ""}
                      </span>
                    )}
                    <Badge variant={status.variant as never}>{status.label}</Badge>
                    <svg className="w-4 h-4 text-[var(--color-channel)] group-hover:text-[var(--color-beacon)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
