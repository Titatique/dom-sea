import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// À partir de Prisma 7, la configuration de connexion à la base de données
// (auparavant déclarée dans schema.prisma via `url` et `directUrl`) se
// définit ici. Les valeurs sont lues depuis les variables d'environnement
// (fichier .env en local, Environment Variables dans Vercel).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
