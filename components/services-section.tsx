"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Map,
  FileText,
  Building2,
  Droplets,
  Waves,
  Route,
  Anchor,
  Satellite,
  Plane,
  Users,
} from "lucide-react"
import { ContourBackground } from "@/components/contour-background"
import { servicesData, type ServiceDataEntry } from "@/lib/services-data"
import { buildWhatsAppUrl } from "@/lib/site-config"

const iconMap = {
  map: Map,
  fileText: FileText,
  building2: Building2,
  droplets: Droplets,
  waves: Waves,
  route: Route,
  anchor: Anchor,
  satellite: Satellite,
  plane: Plane,
  users: Users,
} as const

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
    iconColor: "text-primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    hoverBorder: "hover:border-secondary/50",
    iconColor: "text-secondary",
    gradient: "from-secondary/10 via-secondary/5 to-transparent",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    hoverBorder: "hover:border-accent/50",
    iconColor: "text-accent",
    gradient: "from-accent/10 via-accent/5 to-transparent",
  },
} as const

const FLAGSHIP_SLUGS = [
  "levantamiento-planimetrico-altimetrico",
  "topografia-para-urbanismos",
  "fotogrametria-con-drones",
]

const CATALOG_GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: "Catastro y legal",
    slugs: ["desenglobes-y-englobes", "georreferenciacion-magna-sirgas", "comisiones-topograficas"],
  },
  {
    label: "Agua e infraestructura",
    slugs: ["topografia-redes-hidrosanitarias", "topografia-para-acueductos", "topografia-para-vias", "batimetria"],
  },
]

function FlagshipCard({ service, index, badge }: { service: ServiceDataEntry; index: number; badge: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = colorClasses[service.color]
  const Icon = iconMap[service.iconKey]

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card ${colors.border} ${colors.hoverBorder} transition-all duration-500`}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Link href={`/servicios/${service.slug}`} className="relative block aspect-[16/11] w-full flex-shrink-0 overflow-hidden">
        <motion.div className="absolute inset-0" animate={{ scale: isHovered ? 1.06 : 1 }} transition={{ duration: 0.5 }}>
          <Image src={service.image} alt={service.title} fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/15 to-transparent" />
        <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          {badge}
        </span>
        <div
          className={`absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} border ${colors.border} backdrop-blur-md`}
        >
          <Icon className={`h-5 w-5 ${colors.iconColor}`} />
        </div>
      </Link>

      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          <Link href={`/servicios/${service.slug}`} className="transition-colors hover:text-primary">
            {service.title}
          </Link>
        </h3>
        <p className="mb-5 flex-grow text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {service.shortDescription}
        </p>
        <ul className="mb-5 space-y-2.5">
          {service.highlights.slice(0, 2).map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
              <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${colors.iconColor}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2 border-t border-border/50 pt-4">
          <Link
            href={`/servicios/${service.slug}`}
            className={`flex-1 rounded-xl px-4 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-all duration-300 hover:shadow-md ${
              service.color === "primary"
                ? "bg-primary hover:bg-primary/95"
                : service.color === "secondary"
                  ? "bg-secondary hover:bg-secondary/95"
                  : "bg-accent hover:bg-accent/95"
            }`}
          >
            Ver servicio
          </Link>
          <a
            href={buildWhatsAppUrl(`Hola PECVA, me interesa solicitar cotización e información sobre el servicio de: ${service.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 text-[#25D366] shadow-sm transition-all duration-300 hover:bg-[#25D366] hover:text-white"
            title="Consultar por WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function CatalogRow({ service, index }: { service: ServiceDataEntry; index: number }) {
  const colors = colorClasses[service.color]
  const Icon = iconMap[service.iconKey]

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Link
        href={`/servicios/${service.slug}`}
        className="group flex items-start gap-4 border-b border-border/60 py-5 transition-colors last:border-b-0 hover:pl-1.5"
      >
        <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${colors.bg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`h-[18px] w-[18px] ${colors.iconColor}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">{service.title}</h4>
          <p className="mt-1 text-sm leading-snug text-muted-foreground line-clamp-1">{service.shortDescription}</p>
        </div>
        <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </Link>
    </motion.div>
  )
}

export function ServicesSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-100px" })

  const flagship = FLAGSHIP_SLUGS.map((slug) => servicesData.find((s) => s.slug === slug)).filter(
    (s): s is ServiceDataEntry => Boolean(s)
  )

  return (
    <section id="servicios" className="relative overflow-hidden bg-muted/30 py-24">
      <ContourBackground variant="subtle" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div ref={headerRef} className="mx-auto mb-14 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
          >
            Nuestros Servicios
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl lg:text-5xl"
          >
            Un portafolio técnico,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              con jerarquía clara
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            Los tres servicios que sostienen la mayoría de proyectos, al frente. El resto del
            catálogo, organizado por frente de trabajo.
          </motion.p>
        </div>

        <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flagship.map((service, index) => (
            <FlagshipCard key={service.slug} service={service} index={index} badge="Servicio insignia" />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {CATALOG_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="rounded-2xl border border-border bg-card px-6 py-2"
            >
              <div className="flex items-center justify-between border-b border-border/60 py-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.label}
                </h3>
                <span className="text-xs font-medium text-muted-foreground">{group.slugs.length} servicios</span>
              </div>
              {group.slugs.map((slug, index) => {
                const service = servicesData.find((s) => s.slug === slug)
                if (!service) return null
                return <CatalogRow key={slug} service={service} index={index} />
              })}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Ver el catálogo completo de servicios ({servicesData.length})
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
