export const siteConfig = {
  name: "PECVA Topografia",
  legalName: "PECVA Topografia Profesional",
  description:
    "Servicios de topografia profesional en Colombia para levantamientos, georreferenciacion MAGNA-SIRGAS, fotogrametria con drones, batimetria y soporte tecnico para proyectos de ingenieria.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://topografiapecva.com",
  ogImage: "/og-topografia.svg",
  email: "estudiostopograficos@topografiapecva.com",
  phoneDisplay: "+57 322 6219982",
  phoneHref: "tel:+573226219982",
  whatsappHref:
    "https://wa.me/573226219982?text=Hola,%20me%20interesa%20recibir%20informacion%20sobre%20sus%20servicios%20de%20topografia",
  address: {
    city: "Pitalito",
    region: "Huila",
    country: "Colombia",
  },
  social: {
    facebook: "https://www.facebook.com/estudiostopograficos.pecva",
    instagram: "https://www.instagram.com/topografiapecva/",
  },
  keywords: [
    "topografia en colombia",
    "levantamiento topografico",
    "georreferenciacion magna sirgas",
    "fotogrametria con drones",
    "batimetria",
    "topografia para vias",
    "desenglobe de predios",
    "topografia para urbanismo",
    "topografia",
    "topografía",
    "topografo",
    "topógrafo",
    "topógrafos",
    "trabajos topograficos",
    "trabajos topográficos",
    "equipo topografico",
    "equipo topográfico",
    "equipos topograficos",
    "servicios de topografia",
  ],
} as const

export function getSiteUrl() {
  return siteConfig.domain.replace(/\/$/, "")
}

export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/573226219982?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(subject: string, body: string, to = siteConfig.email) {
  const params = new URLSearchParams({
    subject,
    body,
  })

  return `mailto:${to}?${params.toString()}`
}
