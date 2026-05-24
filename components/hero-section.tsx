"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ContourBackground } from "@/components/contour-background"

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <ContourBackground variant="hero" />
      
      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(77,104,140,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(77,104,140,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div style={{ y, opacity }} className="container mx-auto px-4 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-sm"
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-secondary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-secondary">+15 años de experiencia</span>
            </motion.div>

            {/* Heading with staggered animation */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <motion.span
                  custom={0}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="block"
                >
                  Precisión que define
                </motion.span>
                <motion.span
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
                >
                  territorios
                </motion.span>
              </h1>
              <motion.p 
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                Servicios de topografía profesional con tecnología de punta. 
                Levantamientos, georreferenciación y fotogrametría con drones.
              </motion.p>
            </div>

            {/* CTA Buttons with hover effects */}
            <motion.div 
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden"
              >
                <Link href="#servicios">
                  <span className="relative z-10 flex items-center">
                    Ver Servicios
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-secondary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-muted group overflow-hidden relative"
              >
                <Link href="#blog">
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Ver Proyectos
                </Link>
              </Button>
            </motion.div>

          </div>

          {/* Visual Element - 3D-like floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto perspective-1000">
              {/* Floating service cards */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-8 left-0 p-4 bg-card/90 backdrop-blur-md rounded-xl border border-border shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Levantamientos</p>
                    <p className="text-xs text-muted-foreground">Alta precisión</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.5 }}
                className="absolute top-1/4 right-0 p-4 bg-card/90 backdrop-blur-md rounded-xl border border-border shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">GPS RTK</p>
                    <p className="text-xs text-muted-foreground">± 2mm precisión</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
                className="absolute bottom-1/4 left-4 p-4 bg-card/90 backdrop-blur-md rounded-xl border border-border shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Drones</p>
                    <p className="text-xs text-muted-foreground">Fotogrametría</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Central visual with logo */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {/* Animated rings */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-2"
                    style={{
                      width: `${60 + i * 20}%`,
                      height: `${60 + i * 20}%`,
                      borderColor: i % 2 === 0 ? "rgba(76, 166, 73, 0.2)" : "rgba(77, 104, 140, 0.2)",
                      borderStyle: i % 2 === 0 ? "solid" : "dashed",
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Center content with logo */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <div className="relative w-32 h-32 bg-card/90 backdrop-blur-md rounded-2xl border border-border shadow-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-Byc7z2G5QOHsXI7QXXZMouj9f1HqDM.png"
                    alt="AV Topografía Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-xs text-muted-foreground">Scroll</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 text-muted/30" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
          <motion.path 
            d="M0 96L60 85.3C120 75 240 53 360 48C480 43 600 53 720 58.7C840 64 960 64 1080 58.7C1200 53 1320 43 1380 37.3L1440 32V96H1380C1320 96 1200 96 1080 96C960 96 840 96 720 96C600 96 480 96 360 96C240 96 120 96 60 96H0Z" 
            fill="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
      </div>
    </section>
  )
}
