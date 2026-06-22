/**
 * Script de seed — peuple la base de données avec des données de démonstration
 * réalistes : un compte admin, un client, un partenaire validé, des demandes
 * de transport, des articles de blog et des catégories.
 *
 * Lancer avec : npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seed...");

  const passwordHash = await bcrypt.hash("Password123", 12);

  // ── Compte admin ──────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@domandsea.com" },
    update: {},
    create: {
      name: "Équipe Dom & Sea",
      email: "admin@domandsea.com",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });

  // ── Compte client de démo ─────────────────────────────────────────────────
  const client = await prisma.user.upsert({
    where: { email: "client@demo.com" },
    update: {},
    create: {
      name: "Marie-Claire Bertrand",
      email: "client@demo.com",
      passwordHash,
      role: "CLIENT",
      status: "ACTIVE",
      companyName: "GMS Caraïbes",
      phone: "+33240000001",
      emailVerified: new Date(),
      clientProfile: {
        create: { city: "Nantes", postalCode: "44000", sector: "Distribution" },
      },
    },
  });

  // ── Compte partenaire de démo (validé) ────────────────────────────────────
  const partnerUser = await prisma.user.upsert({
    where: { email: "partenaire@demo.com" },
    update: {},
    create: {
      name: "Jean-Paul Moutou",
      email: "partenaire@demo.com",
      passwordHash,
      role: "PARTNER",
      status: "ACTIVE",
      companyName: "Import Export DOM Transit",
      phone: "+33240000002",
      emailVerified: new Date(),
      partnerProfile: {
        create: {
          partnerType: "TRANSITAIRE",
          status: "APPROVED",
          siret: "12345678900012",
          address: "12 Quai des Antilles",
          city: "Nantes",
          postalCode: "44200",
          description:
            "Spécialiste du transit maritime vers les Antilles depuis plus de 15 ans. Flotte propre et entrepôt sous douane.",
          coveredDestinations: ["GUADELOUPE", "MARTINIQUE", "GUYANE"],
          reviewedAt: new Date(),
          averageRating: 4.6,
          ratingsCount: 23,
        },
      },
    },
    include: { partnerProfile: true },
  });

  const partnerProfile = await prisma.partnerProfile.findUnique({
    where: { userId: partnerUser.id },
  });

  // ── Demandes de transport de démo ─────────────────────────────────────────
  const shipment1 = await prisma.shipmentRequest.create({
    data: {
      clientId: client.id,
      companyName: "GMS Caraïbes",
      contactName: "Marie-Claire Bertrand",
      email: "client@demo.com",
      phone: "+33240000001",
      origin: "Le Havre",
      destination: "MARTINIQUE",
      goodsType: "CONTENEUR_20_PIEDS",
      goodsDescription: "Produits alimentaires secs, palettisés",
      weightKg: 8500,
      volumeM3: 28,
      frequency: "MENSUEL",
      status: "REPONSES_RECUES",
      statusHistory: {
        create: { toStatus: "REPONSES_RECUES", note: "Demande créée (seed)" },
      },
    },
  });

  await prisma.shipmentRequest.create({
    data: {
      clientId: client.id,
      companyName: "GMS Caraïbes",
      contactName: "Marie-Claire Bertrand",
      email: "client@demo.com",
      phone: "+33240000001",
      origin: "Marseille",
      destination: "REUNION",
      goodsType: "PALETTE_STANDARD",
      goodsDescription: "Matériel électroménager",
      weightKg: 1200,
      volumeM3: 6,
      frequency: "PONCTUEL",
      status: "NOUVELLE",
      statusHistory: { create: { toStatus: "NOUVELLE" } },
    },
  });

  // ── Réponse du partenaire à la première demande ───────────────────────────
  if (partnerProfile) {
    await prisma.shipmentResponse.create({
      data: {
        shipmentRequestId: shipment1.id,
        partnerId: partnerProfile.id,
        priceAmount: 2450.0,
        estimatedTransitDays: 16,
        message:
          "Bonjour, nous pouvons prendre en charge votre conteneur avec un départ depuis Le Havre sous 5 jours. Notre rotation vers la Martinique est hebdomadaire.",
        status: "PROPOSEE",
      },
    });
  }

  // ── Catégories de blog ─────────────────────────────────────────────────────
  const categoryReglementation = await prisma.blogCategory.upsert({
    where: { slug: "reglementation" },
    update: {},
    create: { name: "Réglementation", slug: "reglementation" },
  });

  const categoryConseils = await prisma.blogCategory.upsert({
    where: { slug: "conseils-logistique" },
    update: {},
    create: { name: "Conseils logistique", slug: "conseils-logistique" },
  });

  // ── Articles de blog ───────────────────────────────────────────────────────
  await prisma.blogPost.upsert({
    where: { slug: "octroi-de-mer-comprendre-cette-taxe" },
    update: {},
    create: {
      title: "Octroi de mer : comprendre cette taxe spécifique aux DOM-TOM",
      slug: "octroi-de-mer-comprendre-cette-taxe",
      excerpt:
        "L'octroi de mer est une taxe spécifique aux territoires d'outre-mer qui impacte directement le coût de vos importations. Voici ce qu'il faut savoir.",
      content: `<p>L'octroi de mer est une taxe perçue sur les marchandises importées dans les départements et régions d'outre-mer. Elle s'applique également, dans une moindre mesure, aux productions locales.</p><h2>Pourquoi cette taxe existe-t-elle ?</h2><p>Historiquement, l'octroi de mer protège la production locale face à la concurrence des produits importés, tout en finançant les collectivités locales.</p><h2>Comment est-elle calculée ?</h2><p>Le taux varie selon la nature du produit et le territoire concerné. Il est essentiel d'anticiper ce coût dans votre devis logistique global.</p>`,
      status: "PUBLISHED",
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: categoryReglementation.id,
      metaTitle: "Octroi de mer DOM-TOM : guide complet 2026",
      metaDescription:
        "Tout comprendre sur l'octroi de mer, son calcul et son impact sur vos coûts d'importation vers les DOM-TOM.",
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "bien-emballer-marchandise-transport-maritime" },
    update: {},
    create: {
      title: "Bien emballer sa marchandise pour un transport maritime longue distance",
      slug: "bien-emballer-marchandise-transport-maritime",
      excerpt:
        "Entre l'humidité, les manutentions multiples et les durées de transit longues, l'emballage de votre marchandise conditionne sa bonne arrivée.",
      content: `<p>Un transport vers les DOM-TOM peut prendre plusieurs semaines. L'emballage doit donc résister à l'humidité, aux chocs et aux variations de température.</p><h2>Les bonnes pratiques</h2><p>Privilégiez le filmage étirable, les palettes traitées NIMP15 pour le bois, et une protection anti-humidité pour les produits sensibles.</p>`,
      status: "PUBLISHED",
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: categoryConseils.id,
      metaTitle: "Emballage marchandise transport maritime DOM-TOM",
      metaDescription:
        "Conseils pratiques pour bien emballer vos marchandises avant un transport maritime longue distance vers les DOM-TOM.",
    },
  });

  // ── Témoignages ─────────────────────────────────────────────────────────────
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        authorName: "Marie-Claire Bertrand",
        authorRole: "Directrice Supply Chain",
        companyName: "GMS Caraïbes",
        content:
          "Avant Dom & Sea, trouver un transitaire fiable pour la Martinique prenait des semaines. Aujourd'hui on reçoit 3 devis comparables en 48h.",
        isFeatured: true,
      },
      {
        authorName: "Thierry Kowalski",
        authorRole: "Responsable logistique",
        companyName: "BTP Réunion Négoce",
        content:
          "La traçabilité des demandes et la messagerie centralisée ont changé notre façon de gérer l'expédition de matériaux.",
        isFeatured: true,
      },
    ],
  });

  console.log("✅ Seed terminé !");
  console.log("");
  console.log("Comptes de démonstration (mot de passe commun : Password123) :");
  console.log("  Admin      : admin@domandsea.com");
  console.log("  Client     : client@demo.com");
  console.log("  Partenaire : partenaire@demo.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
