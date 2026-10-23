"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ServiceCatalog } from "@/components/service-catalog"

export function ServicesSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-100px" })

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

        <ServiceCatalog />
      </div>
    </section>
  )
}
