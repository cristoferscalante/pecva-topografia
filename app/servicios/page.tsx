import type { Metadata } from "next"
import { StructuredData } from "@/components/structured-data"
import { ServiceCatalog } from "@/components/service-catalog"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { servicesData } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Servicios de topografia",
  description:
    "Conoce los servicios de topografia de PECVA Topografia: levantamientos, georreferenciacion, fotogrametria con drones, batimetria y apoyo para proyectos de ingenieria.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: "Servicios de topografia | PECVA Topografia",
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
            proyectos que necesitan precision y trazabilidad. Filtre por frente de trabajo y
            cotice directo por WhatsApp.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <ServiceCatalog />
      </section>
    </main>
  )
}
