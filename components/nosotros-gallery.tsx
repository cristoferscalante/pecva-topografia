"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

const photos = [
  {
    src: "/fotos/1.webp",
    alt: "Nuestro Equipo Humano",
    caption: "El pilar fundamental de nuestra empresa: profesionales integrales, éticos y altamente capacitados en ingeniería topográfica.",
  },
  {
    src: "/fotos/2.webp",
    alt: "Capacitación Técnica Continuada",
    caption: "Equipo de campo altamente preparado para resolver desafíos técnicos directamente en el terreno.",
  },
  {
    src: "/fotos/3.webp",
    alt: "Liderazgo y Profesionalismo",
    caption: "Ingenieros y topógrafos certificados que supervisan cada detalle geométrico con rigurosidad matemática.",
  },
  {
    src: "/fotos/4.webp",
    alt: "Infraestructura Técnica Propia",
    caption: "Amplio inventario de receptores GNSS RTK de doble frecuencia y estaciones totales de última tecnología.",
  },
  {
    src: "/fotos/5.webp",
    alt: "Garantía de Calidad y Calibración",
    caption: "Protocolos estrictos de verificación y calibración de instrumentos para asegurar precisión milimétrica.",
  },
  {
    src: "/fotos/6.webp",
    alt: "Valores Familiares y Cercanía",
    caption: "Somos una empresa con un fuerte sentido humano, comprometida con el desarrollo y bienestar de las familias colombianas.",
  },
  {
    src: "/fotos/7.webp",
    alt: "Innovación Tecnológica Aérea",
    caption: "Fusión de métodos topográficos tradicionales con tecnología de drones (UAV) para agilizar el procesamiento de datos.",
  },
]

export function NosotrosGallery() {
  const [index, setIndex] = useState<number | null>(null)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (index === null) return
    setIndex((index - 1 + photos.length) % photos.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (index === null) return
    setIndex((index + 1) % photos.length)
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Compromiso, Tecnología y Talento Humano
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Conoce al equipo de profesionales y la infraestructura técnica de última generación que respalda la precisión de tus mediciones.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo, i) => (
          <motion.article
            key={photo.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => setIndex(i)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1 }}
                  animate={{ opacity: 1 }}
                  className="rounded-full bg-white/20 p-3 backdrop-blur-md"
                >
                  <ZoomIn className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {photo.alt}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {photo.caption}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setIndex(null)}
              className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative flex w-full max-w-5xl items-center justify-center">
              {/* Navigation Left */}
              <button
                onClick={handlePrev}
                className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-muted">
                <Image
                  src={photos[index].src}
                  alt={photos[index].alt}
                  fill
                  className="object-cover"
                  sizes="(max-w-1200px) 100vw, 1000px"
                  priority
                />
              </div>

              {/* Navigation Right */}
              <button
                onClick={handleNext}
                className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Captions */}
            <div className="mt-6 text-center max-w-xl">
              <h3 className="text-xl font-semibold text-white">{photos[index].alt}</h3>
              <p className="mt-2 text-sm text-gray-400">{photos[index].caption}</p>
              <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300">
                {index + 1} de {photos.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
