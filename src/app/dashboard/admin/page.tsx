import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Administration" };

export default async function AdminDashboardPage() {
  // Toutes ces requêtes sont lancées en parallèle via Promise.all
  const [
    totalRequests,
    newRequests,
    totalUsers,
    activePartners,
    pendingPartners,
    totalDocuments,
    recentRequests,
    recentPartnerApplications,
  ] = await Promise.all([
    prisma.shipmentRequest.count(),
    prisma.shipmentRequest.count({ where: { status: "NOUVELLE" } }),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.partnerProfile.count({ where: { status: "APPROVED" } }),
    prisma.partnerProfile.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.document.count(),
    prisma.shipmentRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        companyName: true,
        destination: true,
        status: true,
        createdAt: true,
        _count: { select: { responses: true } },
      },
    }),
    prisma.partnerProfile.findMany({
      where: { status: "PENDING_REVIEW" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: { select: { name: true, email: true, companyName: true } } },
    }),
  ]);

  const statusColors: Record<string, string> = {
    NOUVELLE: "bg-blue-100 text-blue-700",
    EN_COURS_DE_MATCHING: "bg-yellow-100 text-yellow-700",
    REPONSES_RECUES: "bg-purple-100 text-purple-700",
    DEVIS_ACCEPTE: "bg-green-100 text-green-700",
    EN_TRANSIT: "bg-orange-100 text-orange-700",
    LIVREE: "bg-emerald-100 text-emerald-700",
    ANNULEE: "bg-gray-100 text-gray-500",
  };

  const destinationLabels: Record<string, string> = {
    GUADELOUPE: "Guadeloupe", MARTINIQUE: "Martinique", GUYANE: "Guyane",
    REUNION: "Réunion", MAYOTTE: "Mayotte", POLYNESIE: "Polynésie", NOUVELLE_CALEDONIE: "N-Calédonie",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl uppercase text-[var(--color-abyss)]">
          Tableau de bord — Administration
        </h1>
        <p className="text-sm text-[var(--color-channel)] mt-1">
          Vue d'ensemble de la plateforme Dom & Sea
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Demandes totales", value: totalRequests, href: "/dashboard/admin/demandes" },
          { label: "Nouvelles demandes", value: newRequests, href: "/dashboard/admin/demandes", highlight: newRequests > 0 },
          { label: "Utilisateurs actifs", value: totalUsers, href: "/dashboard/admin/utilisateurs" },
          { label: "Partenaires actifs", value: activePartners, href: "/dashboard/admin/partenaires" },
          { label: "En attente validation", value: pendingPartners, href: "/dashboard/admin/partenaires", highlight: pendingPartners > 0 },
          { label: "Documents", value: totalDocuments, href: "/dashboard/admin/documents" },
        ].map(({ label, value, href, highlight }) => (
          <Link key={label} href={href} className="block">
            <Card padding="md" className={`text-center hover:border-[var(--color-beacon)] transition-colors ${highlight ? "border-[var(--color-beacon)]" : ""}`}>
              <p className={`font-mono text-3xl font-semibold ${highlight ? "text-[var(--color-beacon)]" : "text-[var(--color-abyss)]"}`}>
                {value}
              </p>
              <p className="text-xs text-[var(--color-channel)] mt-1 uppercase tracking-wide leading-tight">
                {label}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Dernières demandes */}
        <div className="xl:col-span-2">
          <Card padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)]">
              <h2 className="font-display text-lg uppercase text-[var(--color-abyss)]">
                Dernières demandes
              </h2>
              <Link href="/dashboard/admin/demandes" className="text-sm text-[var(--color-beacon)] hover:underline">
                Voir tout →
              </Link>
            </div>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {recentRequests.map((req) => (
                <Link
                  key={req.id}
                  href={`/dashboard/admin/demandes/${req.id}`}
                  className="flex items-center justify-between px-6 py-3 hover:bg-[var(--color-foam-dim)] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--color-abyss)]">
                      {req.companyName}
                    </p>
                    <p className="text-xs text-[var(--color-channel)] font-mono">
                      {destinationLabels[req.destination]} · {formatDate(req.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {req._count.responses > 0 && (
                      <span className="font-mono text-xs text-[var(--color-channel)]">
                        {req._count.responses}✓
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded font-mono uppercase ${statusColors[req.status] ?? "bg-gray-100"}`}>
                      {req.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Partenaires en attente */}
        <div>
          <Card padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)]">
              <h2 className="font-display text-sm uppercase text-[var(--color-abyss)]">
                Partenaires à valider
              </h2>
              <Badge variant="pending">{pendingPartners}</Badge>
            </div>

            {recentPartnerApplications.length === 0 ? (
              <p className="px-6 py-8 text-sm text-[var(--color-channel)] text-center">
                Aucune candidature en attente
              </p>
            ) : (
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {recentPartnerApplications.map((p) => (
                  <Link
                    key={p.id}
                    href={`/dashboard/admin/partenaires/${p.id}`}
                    className="block px-6 py-3 hover:bg-[var(--color-foam-dim)] transition-colors"
                  >
                    <p className="text-sm font-medium text-[var(--color-abyss)]">
                      {p.user.companyName ?? p.user.name}
                    </p>
                    <p className="text-xs text-[var(--color-channel)] font-mono">
                      {p.partnerType} · {formatDate(p.createdAt)}
                    </p>
                    <p className="text-xs text-[var(--color-channel)]">{p.user.email}</p>
                  </Link>
                ))}
              </div>
            )}

            <div className="px-6 py-3 border-t border-[var(--color-border-subtle)]">
              <Link
                href="/dashboard/admin/partenaires"
                className="text-sm text-[var(--color-beacon)] hover:underline"
              >
                Gérer les partenaires →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
