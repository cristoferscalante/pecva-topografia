import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { StructuredData } from "@/components/structured-data"
import { absoluteUrl, siteConfig } from "@/lib/site-config"
import { getAllBlogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Servicios de topografia en Colombia",
  description:
    "Levantamientos topograficos, georreferenciacion MAGNA-SIRGAS, fotogrametria con drones, batimetria y contenido tecnico para proyectos en Colombia.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Servicios de topografia en Colombia`,
    description:
      "Servicios topograficos con paginas por servicio, recursos tecnicos y enfoque comercial para convertir mejor.",
    url: absoluteUrl("/"),
    images: [absoluteUrl(siteConfig.ogImage)],
  },
}

export const revalidate = 3600

export default function HomePage() {
  const posts = getAllBlogPosts()

  return (
    <main className="min-h-screen bg-background">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: siteConfig.legalName,
          description: siteConfig.description,
          url: absoluteUrl("/"),
          telephone: siteConfig.phoneDisplay,
          email: siteConfig.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.region,
            addressCountry: siteConfig.address.country,
          },
          areaServed: "Colombia",
        }}
      />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <BlogSection posts={posts} />
      <ContactSection />
    </main>
  )
}
