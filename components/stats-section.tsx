"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Compass, Shield, Zap, HeartHandshake } from "lucide-react"

const values = [
  {
    icon: Compass,
    title: "Precisión Absoluta",
    description: "Cada medición cuenta. Utilizamos tecnología de última generación para garantizar resultados exactos en todos nuestros levantamientos.",
  },
  {
    icon: Shield,
    title: "Confianza y Respaldo",
    description: "Nuestro equipo de profesionales certificados respalda cada proyecto con años de experiencia en el sector topográfico colombiano.",
  },
  {
    icon: Zap,
    title: "Agilidad en Entregas",
    description: "Entendemos la importancia del tiempo en sus proyectos. Trabajamos con eficiencia sin comprometer la calidad de los resultados.",
  },
  {
    icon: HeartHandshake,
    title: "Compromiso Total",
    description: "Desde la primera consulta hasta la entrega final, acompañamos a nuestros clientes en cada paso del proceso.",
  },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-foreground/5"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Contour lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
          {[...Array(5)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx="500"
              cy="200"
              rx={150 + i * 80}
              ry={60 + i * 30}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary-foreground"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>

      <div 
        ref={ref}
        className="container mx-auto px-4 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Por qué elegirnos
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Experiencia que marca la diferencia
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Combinamos conocimiento técnico, tecnología avanzada y un equipo comprometido para ofrecer soluciones topográficas integrales.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 } 
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-primary-foreground/10 flex items-center justify-center relative overflow-hidden"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-primary-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <value.icon className="w-10 h-10 text-primary-foreground relative z-10" />
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold text-primary-foreground mb-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {value.title}
              </motion.h3>
              
              <motion.p 
                className="text-sm text-primary-foreground/70 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {value.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
