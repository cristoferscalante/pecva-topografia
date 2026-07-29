import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, MessageCircle, MapPin, Award, Compass, HeartHandshake } from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { ContourBackground } from "@/components/contour-background"
import { servicesData } from "@/lib/services-data"
import { citiesData, citiesDataBySlug } from "@/lib/cities-data"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"

type Props = {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return citiesData.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = citiesDataBySlug.get(city)

  if (!cityData) {
    return {}
  }

  const title = `Topografía en ${cityData.name} | PECVA Topografía`
  const description = `${cityData.description} Equipamiento de precisión y profesionales certificados para sus levantamientos y loteamientos.`

  return {
    title,
    description,
    keywords: cityData.keywords,
    robots: {
      index: true,
      follow: true,
      googlebot: { index: true, follow: true },
    },
    alternates: {
      canonical: `/topografia-en/${cityData.slug}`,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/topografia-en/${cityData.slug}`),
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  }
}

export default async function CitySEOPage({ params }: Props) {
  const { city } = await params
  const cityData = citiesDataBySlug.get(city)

  if (!cityData) {
    notFound()
  }

  const isEpicenter = cityData.slug === "pitalito"
  const whatsAppUrl = `https://wa.me/573226219982?text=Hola,%20me%20interesa%20recibir%20informacion%20sobre%20sus%20servicios%20de%20topografia%20en%20${encodeURIComponent(cityData.name)}`

  return (
    <main className="min-h-screen bg-background pt-24 overflow-hidden">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: `${siteConfig.legalName} - Topografía en ${cityData.name}`,
          description: cityData.description,
          url: absoluteUrl(`/topografia-en/${cityData.slug}`),
          telephone: siteConfig.phoneDisplay,
          address: {
            "@type": "PostalAddress",
            addressLocality: cityData.name,
            addressRegion: cityData.region,
            addressCountry: "Colombia",
          },
          areaServed: [cityData.name, "Colombia"],
        }}
      />

      {/* Geolocalized Hero Section */}
      <section className="relative border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(77,104,140,0.12),transparent_40%),radial-gradient(circle_at_left,rgba(76,166,73,0.14),transparent_35%)] py-20 lg:py-28">
        <ContourBackground variant="hero" />
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              <MapPin className="h-4 w-4" />
              Servicios en {cityData.name}, {cityData.region}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance leading-tight">
              Ingeniería y precisión topográfica en{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {cityData.name}
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl">
              {cityData.intro} Brindamos soporte de alta precisión con total movilidad operativa en {cityData.name} y municipios aledaños.
            </p>

            {!isEpicenter && (
              <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10 max-w-2xl flex gap-3 items-start">
                <Award className="h-5 w-5 text-primary flex-none mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Epicentro Técnico</strong>: Nuestro centro de operaciones principal se ubica en <strong>Pitalito, Huila</strong>. Sin embargo, contamos con plena movilidad y equipamiento de doble frecuencia para respaldar tus obras y mediciones con exactitud y tiempos de respuesta ágiles en todo el territorio de {cityData.name} y {cityData.region}.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Cotizar en {cityData.name}
              </a>
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                Ir al formulario
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase for City */}
      <section className="container mx-auto px-4 py-20 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Nuestra Cobertura
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Soluciones para Ingeniería e Infraestructura en {cityData.name}
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ofrecemos un portafolio completo con especificaciones técnicas rigurosas y equipos calibrados.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicesData.map((service) => (
            <article
              key={service.slug}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground line-clamp-1">{service.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{service.shortDescription}</p>
                <ul className="mt-5 space-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                  >
                    Ver especificaciones
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disponible</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Corporate Values */}
      <section className="bg-muted/30 border-y border-border relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="mx-auto mb-16 text-center max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Nuestros Pilares
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              Rigor Técnico y Valores de Precisión
            </h2>
            <p className="mt-4 text-muted-foreground">
              Aseguramos la fiabilidad geométrica y el respaldo normativo que sus mediciones en {cityData.name} exigen.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="w-12 h-12 mb-5 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Precisión Absoluta</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Instrumentación calibrada de alta gama y tolerancias milimétricas en campo.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="w-12 h-12 mb-5 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Respaldo Legal</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Profesionales matriculados con firmas certificadas aptas para trámites catastrales e IGAC.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
              <div className="w-12 h-12 mb-5 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Acompañamiento</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Soporte directo a sus diseñadores viales, civiles, notarías y curadurías.</p>
            </div>
          </div>
        </div>
      </section>

      {/* City CTA Section */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#111C28] to-[#0B1520] text-white py-16 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="cityCtaContour" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(76, 166, 73)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(77, 104, 140)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="200" rx="150" ry="100" fill="none" stroke="url(#cityCtaContour)" strokeWidth="1.5" />
          <ellipse cx="100" cy="200" rx="230" ry="150" fill="none" stroke="url(#cityCtaContour)" strokeWidth="1.5" />
          <ellipse cx="100" cy="200" rx="310" ry="200" fill="none" stroke="url(#cityCtaContour)" strokeWidth="1.5" />
          <ellipse cx="900" cy="50" rx="120" ry="80" fill="none" stroke="url(#cityCtaContour)" strokeWidth="1.5" />
          <ellipse cx="900" cy="50" rx="190" ry="130" fill="none" stroke="url(#cityCtaContour)" strokeWidth="1.5" />
        </svg>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">¿Tiene requerimientos en {cityData.name}?</h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Consúltenos sin costo. Reciba soporte técnico personalizado y presupuestos ajustados a la faja vial, predio rural o levantamiento geodésico que necesite en {cityData.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar con un Ingeniero
            </a>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Enviar correo electrónico
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
