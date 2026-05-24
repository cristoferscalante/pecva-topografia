import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { getAllBlogPosts } from "@/lib/blog"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { servicesData, servicesDataBySlug } from "@/lib/services-data"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = servicesDataBySlug.get(slug)

  if (!service) {
    return {}
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `/servicios/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | AV Topografia`,
      description: service.seoDescription,
      url: absoluteUrl(`/servicios/${service.slug}`),
      images: [absoluteUrl(service.image)],
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = servicesDataBySlug.get(slug)

  if (!service) {
    notFound()
  }

  const relatedArticles = getAllBlogPosts().filter((post) =>
    service.relatedArticleSlugs.includes(post.slug)
  )

  return (
    <main className="min-h-screen bg-background pt-24">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.seoDescription,
          provider: {
            "@type": "LocalBusiness",
            name: siteConfig.legalName,
            areaServed: "Colombia",
          },
          serviceType: service.title,
          url: absoluteUrl(`/servicios/${service.slug}`),
        }}
      />

      <section className="border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(77,104,140,0.15),transparent_38%),radial-gradient(circle_at_left,rgba(76,166,73,0.18),transparent_32%)]">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
          <Link
            href="/servicios"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a servicios
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                Servicio especializado
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                {service.overview}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Solicitar informacion
                </a>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Ir al formulario
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 py-16 lg:grid-cols-3 lg:px-8">
        <article className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold text-foreground">Entregables frecuentes</h2>
          <ul className="mt-5 space-y-4">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold text-foreground">Ideal para</h2>
          <ul className="mt-5 space-y-4">
            {service.idealFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold text-foreground">Como trabajamos</h2>
          <ol className="mt-5 space-y-4">
            {service.process.map((item, index) => (
              <li key={item} className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-secondary/10 text-xs font-semibold text-secondary">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      {/* Precision Technical Specifications Datasheet */}
      <section className="border-t border-border bg-muted/20 relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="mx-auto mb-16 text-center max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Rigor Metodológico
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              Ficha Técnica de Precisión
            </h2>
            <p className="mt-4 text-muted-foreground">
              Especificaciones de instrumentación, estándares de calibración y tolerancias aplicadas en la ejecución técnica de este servicio.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary block mb-2">Instrumentación de Campo</span>
              <h3 className="text-lg font-bold text-foreground mb-2">Equipamiento Principal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.specs.equipment}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary block mb-2">Margen de Tolerancia</span>
              <h3 className="text-lg font-bold text-foreground mb-2">Precisión Obtenida</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.specs.precision}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary block mb-2">Formatos de Entrega</span>
              <h3 className="text-lg font-bold text-foreground mb-2">Estándar de Archivos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.specs.formats}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary block mb-2">Marco Regulatorio</span>
              <h3 className="text-lg font-bold text-foreground mb-2">Normativa Aplicable</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.specs.standards}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                Contenido relacionado
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                Informacion util para entender mejor este servicio
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
            >
              Ver blog completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {relatedArticles.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {post.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Leer articulo
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
