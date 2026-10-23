import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Calendar, ChevronRight, Clock3, MessageCircle, User } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { StructuredData } from "@/components/structured-data"
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog"
import { formatBlogDate, normalizeBlogCategory } from "@/lib/blog-shared"
import { absoluteUrl, buildWhatsAppUrl, siteConfig } from "@/lib/site-config"
import { servicesData } from "@/lib/services-data"

type Props = {
  params: Promise<{ slug: string }>
}

function extractFaqs(content: string): { question: string; answer: string }[] {
  const faqMatch = content.match(/##\s*(?:Preguntas\s+[Ff]recuentes|FAQs?)\s*([\s\S]*)$/i)
  if (!faqMatch) return []

  const block = faqMatch[1]
  const items: { question: string; answer: string }[] = []
  const rawSections = block.split(/(?=###\s+)/)

  for (const sec of rawSections) {
    const trimmed = sec.trim()
    if (!trimmed.startsWith("###")) continue

    const lines = trimmed.split("\n")
    const question = lines[0].replace(/^###\s+/, "").trim()
    const answer = lines.slice(1).join(" ").trim().replace(/\s+/g, " ")

    if (question && answer) {
      items.push({ question, answer })
    }
  }

  return items
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

  const imageUrl = absoluteUrl(post.image)
  const canonicalUrl = `/blog/${post.slug}`

  return {
    title: post.title,
    description: post.seoDescription,
    keywords: post.keywords,
    robots: {
      index: true,
      follow: true,
      googlebot: { index: true, follow: true },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      url: absoluteUrl(canonicalUrl),
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription,
      images: [imageUrl],
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const faqs = extractFaqs(post.content)
  const relatedServices = servicesData.filter((service) =>
    post.relatedServiceSlugs.includes(service.slug)
  )
  const category = normalizeBlogCategory(post.category)
  const contactUrl = buildWhatsAppUrl(`Hola PECVA, leí el artículo "${post.title}" y quisiera asesoría profesional.`)

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Schema.org BlogPosting */}
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

      {/* Schema.org FAQPage for Google Rich Snippets */}
      {faqs.length > 0 && (
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }}
        />
      )}

      <article className="pb-20">
        <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,rgba(76,166,73,0.16),transparent_35%),linear-gradient(180deg,rgba(77,104,140,0.12),transparent_68%)]">
          <div className="container mx-auto px-4 py-14 lg:px-8 lg:py-18">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">Inicio</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{post.title}</span>
            </nav>

            <span className="inline-block rounded-full bg-secondary/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
              {category.label}
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatBlogDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid gap-12 px-4 pt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div>
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border shadow-sm">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
            <MarkdownRenderer content={post.content} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Servicios relacionados
              </p>
              <div className="mt-5 space-y-4">
                {relatedServices.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Explore nuestro{" "}
                    <Link href="/servicios" className="font-semibold text-primary hover:text-secondary">
                      catálogo completo de servicios
                    </Link>
                    .
                  </p>
                )}
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicios/${service.slug}`}
                    className="block rounded-2xl border border-border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
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

            <div className="rounded-[2rem] border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-foreground">¿Necesita asesoría profesional?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Nuestro equipo de ingenieros y topógrafos matriculados ante el CPNT responde
                cotizaciones formales en menos de 24 horas.
              </p>
              <a
                href={contactUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" />
                Hablar con un especialista
              </a>
            </div>
          </aside>
        </section>

        <section className="container mx-auto mt-6 px-4 lg:px-8">
          <div className="rounded-[2rem] border border-border bg-muted/40 p-8 text-center sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Siga explorando</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">Más artículos sobre {category.label.toLowerCase()}</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Revise el resto de nuestras guías técnicas o vuelva al listado completo del blog.
            </p>
            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
            >
              Ver todos los artículos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
