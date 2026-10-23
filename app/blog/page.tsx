import type { Metadata } from "next"
import { StructuredData } from "@/components/structured-data"
import { BlogCatalog } from "@/components/blog-catalog"
import { getAllBlogPosts } from "@/lib/blog"
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
            {posts.length} articulos sobre georreferenciacion, fotogrametria, gestion predial y
            buenas practicas para proyectos en Colombia. Filtre por tema para encontrar lo que
            necesita.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <BlogCatalog posts={posts} />
      </section>
    </main>
  )
}
