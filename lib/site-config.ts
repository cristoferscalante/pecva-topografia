export const siteConfig = {
  name: "AV Topografia",
  legalName: "AV Topografia Profesional",
  description:
    "Servicios de topografia profesional en Colombia para levantamientos, georreferenciacion MAGNA-SIRGAS, fotogrametria con drones, batimetria y soporte tecnico para proyectos de ingenieria.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "http://2.24.104.66:3002",
  ogImage: "/og-topografia.svg",
  email: "contacto@avtopografia.co",
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
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
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
