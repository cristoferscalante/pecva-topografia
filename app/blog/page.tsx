import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock3 } from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { getAllBlogPosts } from "@/lib/blog"
import { formatBlogDate } from "@/lib/blog-shared"
import { absoluteUrl, siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blog de topografia y recursos tecnicos",
  description:
    "Articulos sobre georreferenciacion, fotogrametria con drones, gestion predial y mejores practicas para proyectos topograficos.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog de topografia | PECVA Topografia",
    description:
      "Recursos y articulos para clientes, interventorias y equipos tecnicos que necesitan tomar mejores decisiones topograficas.",
    url: absoluteUrl("/blog"),
    images: [absoluteUrl(siteConfig.ogImage)],
  },
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <main className="min-h-screen bg-background pt-24">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog PECVA Topografia",
          url: absoluteUrl("/blog"),
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.publishedAt,
            image: absoluteUrl(post.image),
          })),
        }}
      />

      <section className="border-b border-border bg-[radial-gradient(circle_at_top,rgba(77,104,140,0.14),transparent_40%),linear-gradient(180deg,rgba(76,166,73,0.1),transparent_65%)]">
        <div className="container mx-auto px-4 py-20 lg:px-8 lg:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
            Blog y recursos
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Guias y recursos para tomar mejores decisiones topograficas
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Encontrara articulos sobre georreferenciacion, fotogrametria, gestion predial y
            buenas practicas para proyectos en Colombia.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  {post.category}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>{formatBlogDate(post.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                >
                  Leer articulo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
