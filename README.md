# Dom & Sea — Plateforme logistique Métropole / DOM-TOM

Plateforme de mise en relation entre entreprises expéditrices, transitaires,
commissionnaires de transport, transporteurs et logisticiens, pour les flux
de marchandises entre la France métropolitaine et les DOM-TOM.

## Stack technique

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **PostgreSQL** + **Prisma 7**
- **NextAuth v5 (Auth.js)** — authentification par credentials (email/mot de passe)
- **Stripe** — abonnements partenaires (V2)
- **Resend** — emails transactionnels
- **React Hook Form + Zod** — validation des formulaires
- **UploadThing** — upload sécurisé de documents

---

## 1. Installation locale

### Prérequis

- Node.js 20+
- Une base de données PostgreSQL (locale via Docker, ou hébergée : Neon, Supabase, Railway...)

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement et le remplir
cp .env.example .env
# → Éditez .env avec votre URL de base de données et vos clés

# 3. Générer le client Prisma
npx prisma generate

# 4. Créer les tables en base de données
npx prisma db push
# (ou, pour un suivi de migrations versionné : npx prisma migrate dev --name init)

# 5. Peupler la base avec des données de démonstration
npm run db:seed

# 6. Lancer le serveur de développement
npm run dev
```

Le site est alors accessible sur **http://localhost:3000**.

### Comptes de démonstration créés par le seed

Mot de passe commun : `Password123`

| Rôle | Email |
|---|---|
| Administrateur | admin@domandsea.com |
| Client | client@demo.com |
| Partenaire (validé) | partenaire@demo.com |

---

## 2. Base de données avec Docker (optionnel, pour tester en local)

Si vous n'avez pas encore de PostgreSQL, le plus simple en local :

```bash
docker run --name domandsea-db \
  -e POSTGRES_USER=domandsea \
  -e POSTGRES_PASSWORD=domandsea \
  -e POSTGRES_DB=domandsea \
  -p 5432:5432 \
  -d postgres:16

# Puis dans .env :
# DATABASE_URL="postgresql://domandsea:domandsea@localhost:5432/domandsea"
# DIRECT_URL="postgresql://domandsea:domandsea@localhost:5432/domandsea"
```

---

## 3. Structure du projet

```
src/
  app/
    (public)/          → Pages publiques (accueil, destinations, blog, contact...)
    (auth)/             → Connexion, inscription
    dashboard/
      client/            → Espace client
      partner/           → Espace partenaire
      admin/              → Back-office administrateur
    api/                → Routes API (REST, App Router route handlers)
  components/
    ui/                 → Composants de base (Button, Input, Card, Badge...)
    layout/             → Header, Footer
    forms/              → Formulaires métier (devis, inscription partenaire...)
    dashboard/          → Composants spécifiques aux dashboards
  lib/
    prisma.ts           → Client Prisma singleton
    auth/config.ts      → Configuration NextAuth
    validations/        → Schémas Zod
    utils.ts            → Fonctions utilitaires (formatage, slugify...)
  config/site.ts        → Configuration centrale (destinations, navigation...)
  middleware.ts          → Protection des routes par rôle
prisma/
  schema.prisma          → Schéma de base de données complet
  seed.ts                 → Script de données de démonstration
```

---

## 4. Déploiement en production (Vercel)

### a. Base de données

Créez une base PostgreSQL managée : Neon, Supabase ou Railway (offres
gratuites disponibles pour démarrer).

### b. Déploiement

```bash
npm install -g vercel
vercel
```

Ou directement depuis vercel.com en connectant votre dépôt Git.

### c. Variables d'environnement sur Vercel

Renseignez toutes les variables listées dans `.env.example` dans les
paramètres du projet Vercel (Settings → Environment Variables).
**Important** : `NEXTAUTH_URL` et `NEXT_PUBLIC_SITE_URL` doivent correspondre
à votre domaine de production réel.

### d. Migration de la base en production

```bash
npx prisma migrate deploy
```

### e. Domaine personnalisé

Configurez votre nom de domaine dans Vercel → Settings → Domains, puis
mettez à jour les enregistrements DNS chez votre registrar.

---

## 5. Ce qui reste à compléter avant un vrai lancement commercial

Ce projet est une V1 complète et fonctionnelle, mais certains points
nécessitent une action humaine avant la mise en production réelle :

- [ ] **Créer une structure juridique** (SASU minimum) pour facturer les
      abonnements partenaires et émettre des factures conformes.
- [ ] **Rédiger les CGU/CGV et la politique de confidentialité** avec un
      professionnel du droit (pages à créer : `/cgu`, `/confidentialite`,
      `/mentions-legales`).
- [ ] **Configurer un vrai compte Stripe** et créer les produits/prix pour
      les plans Pro (49€) et Business (149€).
- [ ] **Configurer Resend** (ou un autre fournisseur SMTP) avec un domaine
      vérifié pour l'envoi d'emails transactionnels.
- [ ] **Brancher un CAPTCHA réel** (Cloudflare Turnstile recommandé, gratuit)
      en complément du honeypot déjà implémenté.
- [ ] **Auditer le RGPD** : durée de conservation des données, registre des
      traitements, DPO si nécessaire.

---

## 6. Roadmap V2 (améliorations prévues)

- **Paiement Stripe complet** : abonnement récurrent partenaire avec gestion
  des factures, relances d'impayés, période d'essai.
- **Matching automatique avancé** : algorithme de scoring des partenaires
  selon destination, type de marchandise, note moyenne et taux de réponse.
- **Application mobile** (ou PWA) pour le suivi des expéditions en temps réel.
- **Intégration EDI/API transporteurs** pour le suivi automatique des
  conteneurs (AIS, tracking maritime).
- **Système d'avis vérifiés** avec modération.
- **Multi-langue** (anglais, créole) pour les pages destinations.
- **Export comptable** automatisé pour les partenaires (factures, relevés).
- **Tableau de bord analytics avancé** pour l'admin (cohortes, LTV, taux de
  conversion par destination).
- **Chat en temps réel** (WebSocket) pour la messagerie au lieu du polling.
- **Génération automatique de devis PDF** brandés Dom & Sea.

---

## 7. Sécurité déjà implémentée

- Mots de passe hachés avec bcrypt (facteur de coût 12)
- Validation systématique côté serveur avec Zod (jamais de confiance aveugle
  dans les données client)
- Protection anti-spam par honeypot sur les formulaires publics
- Protection des routes par middleware selon le rôle (CLIENT / PARTNER / ADMIN)
- En-têtes de sécurité HTTP (X-Frame-Options, nosniff, Referrer-Policy)
- Journal d'activité (`ActivityLog`) pour l'audit des actions sensibles
- Validation manuelle obligatoire des partenaires avant accès aux demandes

## Licence

Propriété privée — tous droits réservés.
