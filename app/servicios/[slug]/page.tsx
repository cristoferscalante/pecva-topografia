import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Package,
  Target,
  Workflow,
  Settings2,
  Ruler,
  FileOutput,
  ShieldCheck,
} from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { ContourBackground } from "@/components/contour-background"
import { getAllBlogPosts } from "@/lib/blog"
import { absoluteUrl, siteConfig, buildWhatsAppUrl } from "@/lib/site-config"
import { servicesData, servicesDataBySlug, categoryOfService } from "@/lib/services-data"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

type Props = {
  params: Promise<{ slug: string }>
}

const colorClasses = {
  primary: { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary", solid: "bg-primary hover:bg-primary/90", ring: "ring-primary/15" },
  secondary: { bg: "bg-secondary/10", border: "border-secondary/20", text: "text-secondary", solid: "bg-secondary hover:bg-secondary/90", ring: "ring-secondary/15" },
  accent: { bg: "bg-accent/10", border: "border-accent/20", text: "text-accent", solid: "bg-accent hover:bg-accent/90", ring: "ring-accent/15" },
} as const

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
    robots: {
      index: true,
      follow: true,
      googlebot: { index: true, follow: true },
    },
    alternates: {
      canonical: `/servicios/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | PECVA Topografia`,
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

  const colors = colorClasses[service.color]
  const category = categoryOfService(service.slug)
  const quoteUrl = buildWhatsAppUrl(`Hola PECVA, quiero cotizar el servicio de: ${service.title}`)
  const precisionShort = service.specs.precision.split("|")[0].trim()

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

      {service.faqs && service.faqs.length > 0 && (
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": service.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }}
        />
      )}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <ContourBackground variant="subtle" />
        <div className="container relative z-10 mx-auto px-4 py-16 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Inicio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/servicios" className="transition-colors hover:text-foreground">Servicios</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{service.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide ${colors.border} ${colors.bg} ${colors.text}`}>
                  {category?.label ?? "Servicio especializado"}
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                {service.overview}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    <CheckCircle2 className={`h-3.5 w-3.5 ${colors.text}`} />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={quoteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md ${colors.solid}`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar por WhatsApp
                </a>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Ir al formulario
                </Link>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              <div className={`overflow-hidden rounded-[2rem] border bg-card shadow-xl ${colors.border}`}>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
                </div>
              </div>

              <div className={`absolute -bottom-6 left-6 max-w-[220px] rounded-2xl border bg-card p-4 shadow-xl ${colors.border}`}>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Precisión obtenida</span>
                <p className="mt-1 text-sm font-bold text-foreground">{precisionShort}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three info cards */}
      <section className="container mx-auto grid gap-6 px-4 py-20 lg:grid-cols-3 lg:px-8">
        <article className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-md">
          <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}>
            <Package className={`h-5 w-5 ${colors.text}`} />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Entregables frecuentes</h2>
          <ul className="mt-5 space-y-4">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${colors.text}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-md">
          <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}>
            <Target className={`h-5 w-5 ${colors.text}`} />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Ideal para</h2>
          <ul className="mt-5 space-y-4">
            {service.idealFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${colors.text}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-md">
          <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}>
            <Workflow className={`h-5 w-5 ${colors.text}`} />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Cómo trabajamos</h2>
          <ol className="relative mt-6 space-y-6 border-l border-border pl-6">
            {service.process.map((item, index) => (
              <li key={item} className="relative text-sm text-muted-foreground">
                <span className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-[11px] font-bold text-white ${colors.solid}`}>
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      {/* Precision Technical Specifications Datasheet */}
      <section className="relative overflow-hidden border-t border-border bg-muted/20 py-20">
        <div className="container relative z-10 mx-auto max-w-5xl px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
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
            {[
              { icon: Settings2, label: "Instrumentación de Campo", title: "Equipamiento Principal", value: service.specs.equipment },
              { icon: Ruler, label: "Margen de Tolerancia", title: "Precisión Obtenida", value: service.specs.precision },
              { icon: FileOutput, label: "Formatos de Entrega", title: "Estándar de Archivos", value: service.specs.formats },
              { icon: ShieldCheck, label: "Marco Regulatorio", title: "Normativa Aplicable", value: service.specs.standards },
            ].map((spec) => (
              <div key={spec.label} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                  <spec.icon className={`h-5 w-5 ${colors.text}`} />
                </div>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{spec.label}</span>
                <h3 className="mb-2 text-lg font-bold text-foreground">{spec.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="relative overflow-hidden border-t border-border bg-background py-20">
          <div className="container relative z-10 mx-auto max-w-4xl px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
                Preguntas Frecuentes
              </span>
              <h2 className="text-3xl font-bold text-foreground">
                Respuestas a tus dudas sobre este servicio
              </h2>
              <p className="mt-4 text-muted-foreground">
                Aclaramos las inquietudes técnicas, logísticas y de plazos más comunes al contratar este servicio.
              </p>
            </div>

            <div className="mx-auto rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={`faq-${index}`} value={`faq-${index}`} className="border-border">
                    <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA band */}
      <section className="relative overflow-hidden bg-primary py-16">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full border border-white/15" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full border border-white/10" />
        <div className="container relative z-10 mx-auto flex flex-col items-center gap-6 px-4 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
          <div>
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              ¿Listo para solicitar {service.title.toLowerCase()}?
            </h2>
            <p className="mt-2 text-primary-foreground/75">Respuesta y cotización formal en menos de 24 horas.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={quoteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-white/90"
            >
              <MessageCircle className="h-4 w-4" />
              Cotizar por WhatsApp
            </a>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:border-white"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
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
      )}
    </main>
  )
}
