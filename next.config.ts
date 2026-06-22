import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Désactive l'optimisation d'image stricte pour autoriser les sources
  // d'images distantes utilisées par les couvertures d'articles de blog
  // et les avatars partenaires. À restreindre à des domaines précis en prod.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  // En-têtes de sécurité de base (défense en profondeur, en complément du
  // middleware d'authentification et de la validation serveur Zod).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
