import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return {};

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
    include: { author: { select: { name: true } }, category: true },
  });

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    author: { "@type": "Person", name: post.author.name },
  };

  return (
    <article className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fil d'ariane */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-[var(--color-channel)]">
            <li><Link href="/" className="hover:text-[var(--color-beacon)]">Accueil</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="hover:text-[var(--color-beacon)]">Blog</Link></li>
          </ol>
        </nav>

        {post.category && (
          <span className="font-mono text-xs text-[var(--color-beacon)] uppercase tracking-widest mb-4 block">
            {post.category.name}
          </span>
        )}

        <h1 className="font-display text-3xl lg:text-4xl uppercase text-[var(--color-abyss)] mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-[var(--color-channel)] mb-10 pb-6 border-b border-[var(--color-border-subtle)]">
          <span>{post.author.name}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{post.publishedAt && formatDate(post.publishedAt)}</span>
        </div>

        {post.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-sm mb-10"
          />
        )}

        {/* Contenu de l'article (Markdown/HTML stocké en base) */}
        <div
          className="prose prose-lg max-w-none text-[var(--color-foreground)] leading-relaxed [&>h2]:font-display [&>h2]:uppercase [&>h2]:text-xl [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-[var(--color-border-subtle)]">
          <Link href="/blog" className="text-sm text-[var(--color-beacon)] hover:underline">
            ← Retour au blog
          </Link>
        </div>
      </div>
    </article>
  );
}
