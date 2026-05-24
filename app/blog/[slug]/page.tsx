import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { StructuredData } from "@/components/structured-data"
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog"
import { formatBlogDate } from "@/lib/blog-shared"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { servicesData } from "@/lib/services-data"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [absoluteUrl(post.image)],
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedServices = servicesData.filter((service) =>
    post.relatedServiceSlugs.includes(service.slug)
  )

  return (
    <main className="min-h-screen bg-background pt-24">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.seoDescription,
          image: absoluteUrl(post.image),
          datePublished: post.publishedAt,
          author: {
            "@type": "Organization",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.legalName,
          },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        }}
      />

      <article className="pb-20">
        <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,rgba(76,166,73,0.16),transparent_35%),linear-gradient(180deg,rgba(77,104,140,0.12),transparent_68%)]">
          <div className="container mx-auto px-4 py-14 lg:px-8 lg:py-18">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              {post.category}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid gap-12 px-4 pt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div>
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <MarkdownRenderer content={post.content} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Servicios relacionados
              </p>
              <div className="mt-5 space-y-4">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="block rounded-2xl border border-border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {service.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Ver servicio
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </article>
    </main>
  )
}
