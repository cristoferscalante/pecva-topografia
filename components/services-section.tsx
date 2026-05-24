"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
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
  ArrowUpRight
} from "lucide-react"
import { ContourBackground } from "@/components/contour-background"

const services = [
  {
    icon: Map,
    title: "Levantamiento Planimétrico y Altimétrico",
    description: "Determinación precisa de coordenadas y alturas para el desarrollo de proyectos de ingeniería y arquitectura.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Levantamientos para Desenglobes",
    description: "Servicios especializados para desenglobes, englobes, escrituración y aclaración de áreas catastrales.",
    color: "secondary",
  },
  {
    icon: Building2,
    title: "Topografía para Urbanismos",
    description: "Estudios topográficos completos para el diseño y planificación de desarrollos urbanísticos.",
    color: "accent",
  },
  {
    icon: Droplets,
    title: "Topografía para Redes Hidro Sanitarias",
    description: "Levantamientos especializados para el diseño de redes de acueducto y alcantarillado.",
    color: "primary",
  },
  {
    icon: Waves,
    title: "Topografía para Acueductos",
    description: "Estudios topográficos para la construcción y mantenimiento de sistemas de abastecimiento de agua.",
    color: "secondary",
  },
  {
    icon: Route,
    title: "Topografía para Vías",
    description: "Levantamientos y replanteos para el diseño y construcción de vías y carreteras.",
    color: "accent",
  },
  {
    icon: Anchor,
    title: "Batimetría",
    description: "Estudios de profundidad de cuerpos de agua para proyectos portuarios, hidroeléctricos y ambientales.",
    color: "primary",
  },
  {
    icon: Satellite,
    title: "Georreferenciación MAGNA-SIRGAS",
    description: "Georreferenciación de placas y puntos de control a la red geodésica nacional MAGNA-SIRGAS.",
    color: "secondary",
  },
  {
    icon: Plane,
    title: "Fotogrametría con Drones",
    description: "Levantamientos aéreos con tecnología UAV para generar modelos digitales y ortofotomosaicos.",
    color: "accent",
  },
  {
    icon: Users,
    title: "Comisiones Topográficas",
    description: "Acompañamiento profesional de comisiones topográficas para todo tipo de proyectos.",
    color: "primary",
  },
]

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    hoverBorder: "hover:border-secondary/50",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    gradient: "from-secondary/10 via-secondary/5 to-transparent",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    hoverBorder: "hover:border-accent/50",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    gradient: "from-accent/10 via-accent/5 to-transparent",
  },
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = colorClasses[service.color as keyof typeof colorClasses]

  return (
    <motion.div
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
      className={`group relative p-6 rounded-2xl bg-card border ${colors.border} ${colors.hoverBorder} cursor-pointer overflow-hidden transition-all duration-500`}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Animated gradient background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={isHovered ? {
          background: [
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            "linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.1) 150%, transparent 200%)",
          ],
        } : {}}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animation */}
        <motion.div 
          className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center mb-5`}
          animate={isHovered ? { 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <service.icon className={`w-7 h-7 ${colors.iconColor}`} />
        </motion.div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Link with animation */}
        <motion.div 
          className="flex items-center gap-2 text-sm font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <span className={colors.iconColor}>Más información</span>
          <motion.div
            animate={isHovered ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <ArrowUpRight className={`w-4 h-4 ${colors.iconColor}`} />
          </motion.div>
        </motion.div>
      </div>

      {/* Corner decoration */}
      <motion.div 
        className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full ${colors.bg}`}
        animate={{ 
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

export function ServicesSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-100px" })

  return (
    <section id="servicios" className="relative py-24 bg-muted/30 overflow-hidden">
      <ContourBackground variant="subtle" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-secondary/10 text-secondary border border-secondary/20"
          >
            Nuestros Servicios
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            Soluciones topográficas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              integrales
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Ofrecemos servicios de alta precisión respaldados por tecnología de última 
            generación y un equipo de profesionales altamente capacitados.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
