import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { destinations, siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/devis`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/devenir-partenaire`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/destinations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "daily", priority: 0.7 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${siteConfig.url}/destinations/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...destinationRoutes, ...blogRoutes];
}
