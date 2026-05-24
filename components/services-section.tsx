"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { ContourBackground } from "@/components/contour-background"
import { servicesData } from "@/lib/services-data"

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

function ServiceCard({ service, index }: { service: (typeof servicesData)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = colorClasses[service.color]

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border bg-card ${colors.border} ${colors.hoverBorder} transition-all duration-500`}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <Link href={`/servicios/${service.slug}`} className="block h-full">
        <div className="relative aspect-[16/11] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={service.image} alt={service.title} fill className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
          <motion.span
            className={`absolute left-5 top-5 rounded-full border px-3 py-1 text-xs font-semibold text-white ${colors.border} ${colors.bg}`}
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Servicio especializado
          </motion.span>
        </div>

        <div className="relative p-6">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0`}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10">
            <h3 className="mb-3 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {service.title}
            </h3>

            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              {service.shortDescription}
            </p>

            <ul className="mb-5 space-y-3">
              {service.highlights.slice(0, 2).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${colors.iconColor}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <motion.div
              className="flex items-center gap-2 text-sm font-medium"
              initial={{ opacity: 0.85, x: 0 }}
              animate={{ opacity: 1, x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={colors.iconColor}>Ver pagina del servicio</span>
              <ArrowUpRight className={`h-4 w-4 ${colors.iconColor}`} />
            </motion.div>
          </div>
        </div>
      </Link>

      <motion.div
        className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full ${colors.bg}`}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.article>
  )
}

export function ServicesSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-100px" })

  return (
    <section id="servicios" className="relative overflow-hidden bg-muted/30 py-24">
      <ContourBackground variant="subtle" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div ref={headerRef} className="mx-auto mb-16 max-w-3xl text-center">
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
            Soluciones topograficas{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              integrales
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground"
          >
            Cada servicio ahora muestra una imagen limpia, una pagina dedicada y enlaces
            relacionados para explicar mejor su alcance tecnico.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
