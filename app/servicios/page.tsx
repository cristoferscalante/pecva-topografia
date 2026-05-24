import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { StructuredData } from "@/components/structured-data"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { servicesData } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Servicios de topografia",
  description:
    "Conoce los servicios de topografia de AV Topografia: levantamientos, georreferenciacion, fotogrametria con drones, batimetria y apoyo para proyectos de ingenieria.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: "Servicios de topografia | AV Topografia",
    description:
      "Servicios tecnicos para ingenieria, urbanismo, predios, vias, acueductos y levantamientos con precision profesional.",
    url: absoluteUrl("/servicios"),
    images: [absoluteUrl(siteConfig.ogImage)],
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Servicios de topografia",
          url: absoluteUrl("/servicios"),
          hasPart: servicesData.map((service) => ({
            "@type": "Service",
            name: service.title,
            description: service.seoDescription,
            url: absoluteUrl(`/servicios/${service.slug}`),
          })),
        }}
      />

      <section className="border-b border-border bg-[radial-gradient(circle_at_top,rgba(76,166,73,0.16),transparent_42%),linear-gradient(180deg,rgba(77,104,140,0.08),transparent_70%)]">
        <div className="container mx-auto px-4 py-20 lg:px-8 lg:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
            Servicios especializados
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Topografia aplicada a decisiones tecnicas, tramites prediales y ejecucion de obra
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Explore servicios especializados para levantamientos, urbanismo, corredores, redes y
            proyectos que necesitan precision y trazabilidad.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicesData.map((service) => (
            <article
              key={service.slug}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-foreground">{service.title}</h2>
                <p className="mt-3 text-muted-foreground">{service.shortDescription}</p>
                <ul className="mt-5 space-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                >
                  Ver pagina del servicio
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
