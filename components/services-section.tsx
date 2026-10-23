"use client"

import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  FileCheck2,
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
import { servicesData, type ServiceDataEntry, SERVICE_CATEGORIES, categoryOfService } from "@/lib/services-data"
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
  primary: { bg: "bg-primary/10", border: "border-primary/20", hoverBorder: "hover:border-primary/40", text: "text-primary", solid: "bg-primary hover:bg-primary/90" },
  secondary: { bg: "bg-secondary/10", border: "border-secondary/20", hoverBorder: "hover:border-secondary/40", text: "text-secondary", solid: "bg-secondary hover:bg-secondary/90" },
  accent: { bg: "bg-accent/10", border: "border-accent/20", hoverBorder: "hover:border-accent/40", text: "text-accent", solid: "bg-accent hover:bg-accent/90" },
} as const

const CATEGORIES = SERVICE_CATEGORIES

function categoryOf(slug: string) {
  return categoryOfService(slug)?.id ?? "otros"
}

function ServiceCard({ service, index }: { service: ServiceDataEntry; index: number }) {
  const colors = colorClasses[service.color]
  const Icon = iconMap[service.iconKey]
  const category = CATEGORIES.find((c) => c.id === categoryOf(service.slug))

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className={`group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-colors duration-300 ${colors.border} ${colors.hoverBorder}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          {category?.label}
        </span>
      </div>

      <h3 className="mb-2 text-base font-semibold leading-snug text-foreground">
        <Link href={`/servicios/${service.slug}`} className="transition-colors hover:text-primary">
          {service.title}
        </Link>
      </h3>
      <p className="mb-4 flex-grow text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {service.shortDescription}
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {service.highlights.slice(0, 2).map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground"
          >
            <CheckCircle2 className={`h-3 w-3 ${colors.text}`} />
            {item}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          <FileCheck2 className="h-3 w-3" />
          {service.deliverables.length} entregables
        </span>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4">
        <Link
          href={`/servicios/${service.slug}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Ver detalle
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href={buildWhatsAppUrl(`Hola PECVA, quiero cotizar el servicio de: ${service.title}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold text-white shadow-sm transition-all ${colors.solid}`}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Cotizar
        </a>
      </div>
    </motion.article>
  )
}

export function ServicesSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<string>("todos")

  const filtered = useMemo(() => {
    if (activeCategory === "todos") return servicesData
    return servicesData.filter((s) => categoryOf(s.slug) === activeCategory)
  }, [activeCategory])

  return (
    <section id="servicios" className="relative overflow-hidden bg-muted/30 py-24">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div ref={headerRef} className="mx-auto mb-10 max-w-3xl text-center">
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
            Soluciones topográficas para cada etapa de{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              su proyecto
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            Desde el levantamiento inicial hasta el control de obra, respaldados por equipos
            calibrados y profesionales matriculados ante el CPNT en toda Colombia.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          {[{ id: "todos", label: `Todos (${servicesData.length})` }, ...CATEGORIES.map((c) => ({ id: c.id, label: `${c.label} (${c.slugs.length})` }))].map(
            (cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="activeServiceCategory"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          )}
        </motion.div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
