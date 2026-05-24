import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Shield, Zap, Target } from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { ContourBackground } from "@/components/contour-background"
import { NosotrosGallery } from "@/components/nosotros-gallery"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Nosotros | AV Topografía",
  description:
    "Conoce a AV Topografía: trayectoria, valores corporativos y equipo de ingeniería de precisión para levantamientos, drones y batimetría en Colombia.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title: "Nosotros | AV Topografía",
    description:
      "Trayectoria, profesionalismo y precisión milimétrica en levantamientos topográficos y catastrales en todo el territorio colombiano.",
    url: absoluteUrl("/nosotros"),
    images: [absoluteUrl(siteConfig.ogImage)],
  },
}

const valueCards = [
  {
    icon: Compass,
    title: "Precisión Absoluta",
    description: "Operamos bajo tolerancias mínimas de error. Empleamos instrumentación calibrada y metodologías rigurosas de control en campo y oficina para garantizar resultados milimétricos en linderos, cotas y ejes.",
  },
  {
    icon: Shield,
    title: "Confianza y Legalidad",
    description: "Cada levantamiento y plano cuenta con el respaldo legal de ingenieros topógrafos matriculados y con tarjeta profesional vigente, alineados a las exigencias catastrales y notariales de Colombia.",
  },
  {
    icon: Zap,
    title: "Agilidad Técnica",
    description: "Entendemos los tiempos críticos de los constructores y diseñadores. Optimizamos nuestros flujos de trabajo en campo y procesamiento de datos para entregar planos y perfiles de manera rápida y puntual.",
  },
  {
    icon: Target,
    title: "Compromiso de Acompañamiento",
    description: "No solo entregamos planos; acompañamos técnicamente a su equipo técnico de diseño, cálculo o legal durante todo el ciclo del proyecto para prevenir reprocesos y sobrecostos.",
  },
]

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background pt-24 overflow-hidden">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Sobre Nosotros - AV Topografia",
          description: "Informacion corporativa, valores, trayectoria y proyectos reales de AV Topografia Profesional en Colombia.",
          url: absoluteUrl("/nosotros"),
          mainEntity: {
            "@type": "LocalBusiness",
            name: siteConfig.legalName,
            description: siteConfig.description,
            telephone: siteConfig.phoneDisplay,
            address: {
              "@type": "PostalAddress",
              addressLocality: siteConfig.address.city,
              addressRegion: siteConfig.address.region,
              addressCountry: siteConfig.address.country,
            },
          },
        }}
      />

      {/* Hero Section */}
      <section className="relative border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(77,104,140,0.12),transparent_40%),radial-gradient(circle_at_left,rgba(76,166,73,0.14),transparent_35%)] py-20 lg:py-28">
        <ContourBackground variant="hero" />
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <span className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              Nuestra Trayectoria
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Precisión que define territorios,{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                respaldada por expertos
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl">
              Somos un equipo de profesionales apasionados por la ingeniería topográfica. Brindamos servicios integrales en Colombia, con alta precisión, enfoque comercial y soporte normativo estricto en cada medición.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Identity & Story Section */}
      <section className="container mx-auto px-4 py-20 lg:px-8 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              +15 años liderando la topografía en Colombia
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
            <p className="text-muted-foreground leading-relaxed">
              En <strong>AV Topografía</strong> entendemos que cada plano topográfico es la cimentación de una inversión importante. Ya sea para el trazado de un acueducto, la segregación de un predio o el control volumétrico de una cantera, tratamos cada punto capturado con el máximo rigor técnico.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Equipados con tecnología satelital GNSS RTK de alta gama, estaciones totales láser y drones de fotogrametría aérea, cubrimos la geografía colombiana llevando soluciones confiables a constructoras, consorcios viales, entidades del sector público y propietarios privados.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/#contacto" className="flex items-center gap-2">
                  <span>Solicitar una Cotización</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/servicios">Ver Servicios Especializados</Link>
              </Button>
            </div>
          </div>

          {/* Stats Highlight Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-5xl font-extrabold text-primary block mb-2">+15</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Años de experiencia</h3>
              <p className="text-sm text-muted-foreground">Trayectoria sólida respaldando proyectos urbanos y de infraestructura.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-5xl font-extrabold text-secondary block mb-2">100%</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Rigurosidad Catastral</h3>
              <p className="text-sm text-muted-foreground">Planos listos y validados para notarías, curadurías e IGAC.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-5xl font-extrabold text-accent block mb-2">±2mm</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Precisión RTK</h3>
              <p className="text-sm text-muted-foreground">Tolerancias milimétricas en campo utilizando equipos de doble frecuencia.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="text-5xl font-extrabold text-foreground block mb-2">+500</span>
              <h3 className="text-lg font-bold text-foreground mb-1">Proyectos Exitosos</h3>
              <p className="text-sm text-muted-foreground">Clientes satisfechos en vías, acueductos, desenglobes y canteras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 border-y border-border relative py-20 overflow-hidden">
        <ContourBackground variant="subtle" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Nuestros Pilares
            </span>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Valores que guían nuestra precisión
            </h2>
            <p className="mt-4 text-muted-foreground">
              Nos regimos bajo estrictos estándares éticos y de ingeniería para brindarte la tranquilidad espacial y legal que tu proyecto exige.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {valueCards.map((card, index) => (
              <article
                key={index}
                className="rounded-3xl border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-20 lg:px-8">
        <NosotrosGallery />
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-foreground text-background py-16 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full border border-background" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">¿Tiene un proyecto en mente?</h2>
          <p className="text-background/70 text-lg mb-8 leading-relaxed">
            Consúltenos sin costo. Ofrecemos acompañamiento técnico personalizado y cotizaciones ajustadas a los requerimientos de su obra civil, predio rural o estudio geodésico.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">
                Contactar por WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-background/20 hover:bg-background/10 text-background">
              <Link href="/#contacto">Ir al Formulario</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
