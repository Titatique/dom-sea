# Mettre Dom & Sea en ligne — Guide pas à pas (sans rien installer)

Ce guide t'explique comment faire apparaître ton site avec une vraie adresse
web (ex: `dom-and-sea.vercel.app`), uniquement depuis ton navigateur, sans
terminal ni logiciel à installer. Compte environ 20 minutes.

Tu vas avoir besoin de créer 3 comptes gratuits : **GitHub**, **Vercel**,
**Neon**. Aucun ne demande de carte bancaire.

---

## Étape 1 — Créer un compte GitHub

1. Va sur **https://github.com**
2. Clique sur "Sign up", choisis un email et un mot de passe
3. Confirme ton email (un code arrive dans ta boîte mail)

C'est juste un endroit où ton code va être stocké, comme un Google Drive.

---

## Étape 2 — Mettre le projet sur GitHub

1. Une fois connecté à GitHub, clique sur le bouton **"+"** en haut à droite
   → **"New repository"**
2. Donne-lui un nom, par exemple `dom-and-sea`
3. Laisse-le en **Public** ou **Private** (les deux fonctionnent)
4. Clique sur **"Create repository"**
5. Sur la page qui s'affiche, clique sur le lien **"uploading an existing
   file"**
6. Dépose (glisser-déposer) **tous les fichiers et dossiers** du ZIP que je
   t'ai donné (après l'avoir décompressé sur ton ordinateur — double-clique
   sur le ZIP pour l'extraire)
   - ⚠️ Ne mets PAS le dossier `node_modules` s'il y en a un, ni le fichier
     `.env` — ils ne doivent jamais être uploadés.
7. En bas de page, clique sur **"Commit changes"**

Ton code est maintenant sur GitHub.

---

## Étape 3 — Créer la base de données (Neon, gratuit)

1. Va sur **https://neon.tech** et crée un compte gratuit (tu peux te
   connecter directement avec ton compte GitHub, un seul clic)
2. Une fois connecté, clique sur **"Create a project"**
3. Donne-lui un nom, ex: `dom-and-sea-db`, laisse les options par défaut
4. Une fois créé, Neon t'affiche une adresse qui ressemble à :
   ```
   postgresql://user:password@ep-xxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
5. **Copie cette adresse** et garde-la de côté (tu vas en avoir besoin à
   l'étape suivante). Neon en donne généralement deux versions (une "pooled"
   et une "direct") — copie les deux si elles sont affichées séparément.

---

## Étape 4 — Déployer sur Vercel

1. Va sur **https://vercel.com** et clique sur "Sign up"
2. Choisis **"Continue with GitHub"** (connexion en un clic avec le compte
   créé à l'étape 1)
3. Une fois connecté, clique sur **"Add New..."** → **"Project"**
4. Vercel te montre la liste de tes dépôts GitHub : clique sur **"Import"**
   à côté de `dom-and-sea`
5. Avant de cliquer sur "Deploy", déroule la section **"Environment
   Variables"** et ajoute, une par une, ces variables (nom à gauche, valeur
   à droite) :

   | Nom de la variable | Valeur |
   |---|---|
   | `DATABASE_URL` | l'adresse copiée depuis Neon à l'étape 3 |
   | `DIRECT_URL` | la même adresse (ou la version "direct" si Neon t'en donne deux) |
   | `AUTH_SECRET` | n'importe quelle longue suite de caractères aléatoires (ex: tape au hasard 40 lettres/chiffres) |
   | `NEXTAUTH_URL` | laisse vide pour l'instant, tu la complèteras après le premier déploiement |
   | `NEXT_PUBLIC_SITE_URL` | laisse vide pour l'instant, pareil |

6. Clique sur **"Deploy"**

Vercel va construire le site automatiquement (3-5 minutes). À la fin, il
t'affiche une adresse du type `https://dom-and-sea-xxxx.vercel.app` — **c'est
ton site en ligne.**

---

## Étape 5 — Finaliser l'adresse du site

1. Copie l'adresse `.vercel.app` que Vercel t'a donnée
2. Retourne dans ton projet Vercel → onglet **"Settings"** → **"Environment
   Variables"**
3. Remplis maintenant `NEXTAUTH_URL` et `NEXT_PUBLIC_SITE_URL` avec cette
   adresse complète (ex: `https://dom-and-sea-xxxx.vercel.app`)
4. Retourne dans l'onglet **"Deployments"**, clique sur les "..." du dernier
   déploiement → **"Redeploy"**

---

## Étape 6 — Préparer les tables de la base de données

À ce stade, le site s'affiche mais la base de données est vide (aucune
table créée). C'est la seule étape où je ne peux pas t'éviter complètement
une ligne de commande — mais une seule, et je te montre exactement où la
taper :

1. Va sur **https://neon.tech**, ouvre ton projet
2. Cherche l'onglet **"SQL Editor"** dans le menu de gauche
3. Dis-le moi quand tu y es : je te donnerai le contenu SQL exact à coller
   pour créer toutes les tables (alternative à la commande `prisma db push`
   que tu aurais utilisée avec un terminal).

---

## Ce que tu auras à la fin

Une adresse web publique, que tu peux ouvrir sur ton téléphone, ton
ordinateur, ou envoyer à quelqu'un — avec le vrai site Dom & Sea qui tourne,
connecté à une vraie base de données.

**Dis-moi à quelle étape tu es rendu, et je t'accompagne pour la suite.**
