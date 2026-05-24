"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, X, Eye, HelpCircle } from "lucide-react"

interface VideoShowcaseProps {
  videoId?: string
  title?: string
  subtitle?: string
  description?: string
  thumbnailUrl?: string
}

export function VideoShowcase({
  videoId = "J_G2fOgk0RI",
  title = "Tecnología y Precisión en Movimiento",
  subtitle = "Ingeniería en Acción",
  description = "Visualiza el rigor técnico, la tecnología GNSS RTK y el flujo de trabajo en campo de AV Topografía. Llevamos la precisión al siguiente nivel.",
  thumbnailUrl = "/images/services/fotogrametria-con-drones.png", // High-quality generated background
}: VideoShowcaseProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
          {subtitle}
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Video Cover Card with interactive Play button */}
      <motion.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl group cursor-pointer"
        whileHover={{ scale: 1.01, y: -4 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* Custom Thumbnail */}
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-103 brightness-90"
            sizes="(max-w-1200px) 100vw, 1000px"
          />

          {/* Dark overlay with modern gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:via-black/20" />

          {/* Pulsing Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Pulsing rings */}
              <motion.div
                className="absolute h-24 w-24 rounded-full bg-primary/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-32 w-32 rounded-full bg-secondary/20"
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Glassmorphic Play button container */}
              <motion.button
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105"
                whileTap={{ scale: 0.95 }}
                aria-label="Reproducir video"
              >
                <Play className="ml-1 h-8 w-8 fill-current" />
              </motion.button>
            </div>
          </div>

          {/* Bottom badge overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/90">
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase">Ver en Alta Definición</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-semibold">Reproducir ahora</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            {/* Close button */}
            <motion.button
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 z-50"
              aria-label="Cerrar reproductor"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Video Player Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-card shadow-2xl"
            >
              <div className="relative aspect-[16/9] w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
