import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, truncate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Actualités logistique DOM-TOM",
  description:
    "Conseils, actualités et analyses sur la logistique et le transport de marchandises entre la France métropolitaine et les DOM-TOM.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1"));
  const perPage = 9;
  const query = searchParams.q?.trim();

  const where = {
    status: "PUBLISHED" as const,
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" as const } },
            { excerpt: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [posts, total, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { category: true, author: { select: { name: true } } },
    }),
    prisma.blogPost.count({ where }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Blog
          </p>
          <h1 className="font-display text-4xl uppercase text-[var(--color-abyss)] mb-4">
            Actualités logistique DOM-TOM
          </h1>
          <p className="text-[var(--color-channel)]">
            Conseils pratiques, réglementation, tendances du transport maritime
            entre la métropole et les territoires d'outre-mer.
          </p>
        </div>

        {/* Recherche + catégories */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <form action="/blog" method="GET" className="flex gap-2 max-w-md w-full">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Rechercher un article..."
              className="flex-1 px-3 py-2 text-sm border border-[var(--color-border-subtle)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-beacon)]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-abyss)] text-white text-sm rounded hover:bg-[var(--color-deep)] transition-colors"
            >
              Rechercher
            </button>
          </form>

          {categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat: { id: string; name: string; slug: string }) => (
                <Link
                  key={cat.id}
                  href={`/blog/categorie/${cat.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-beacon)] hover:text-[var(--color-beacon)] transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Liste d'articles */}
        {posts.length === 0 ? (
          <p className="text-center text-[var(--color-channel)] py-20">
            Aucun article pour le moment{query ? " correspondant à votre recherche" : ""}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="border border-[var(--color-border-subtle)] rounded-sm overflow-hidden bg-white hover:border-[var(--color-beacon)] hover:shadow-md transition-all h-full flex flex-col">
                  <div className="aspect-[16/9] bg-[var(--color-foam-dim)] flex items-center justify-center">
                    {post.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-mono text-xs text-[var(--color-channel)] uppercase">
                        Dom & Sea
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    {post.category && (
                      <span className="font-mono text-xs text-[var(--color-beacon)] uppercase tracking-wide mb-2">
                        {post.category.name}
                      </span>
                    )}
                    <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] group-hover:text-[var(--color-beacon)] transition-colors mb-2 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[var(--color-channel)] mb-4 flex-1">
                      {truncate(post.excerpt, 120)}
                    </p>
                    <p className="text-xs text-[var(--color-channel)] font-mono">
                      {post.publishedAt && formatDate(post.publishedAt)}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${query ? `&q=${query}` : ""}`}
                className={`w-9 h-9 flex items-center justify-center rounded text-sm font-mono ${
                  p === page
                    ? "bg-[var(--color-beacon)] text-white"
                    : "border border-[var(--color-border-subtle)] hover:border-[var(--color-beacon)]"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
