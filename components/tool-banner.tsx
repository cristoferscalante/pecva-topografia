"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Compass, Download, Layers, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ToolBanner() {
  return (
    <section className="relative overflow-hidden border-y border-secondary/20 bg-gradient-to-br from-[#0F1D2B] via-[#132333] to-[#0A1622] py-12 lg:py-16 text-white">
      {/* Luces y patrón de fondo */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Lado Izquierdo: Textos y Llamado a la Acción */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1.5 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Nueva Herramienta de Ingeniería Topográfica
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Compensador de Poligonales Pro{" "}
                <span className="block bg-gradient-to-r from-secondary via-emerald-400 to-primary bg-clip-text text-transparent">
                  & Exportador AutoCAD DXF
                </span>
              </h2>
              <p className="text-sm leading-relaxed text-white/75 sm:text-base max-w-2xl">
                Diseñado para topógrafos e ingenieros civiles en Colombia y el mundo.
                Compensa carteras de campo con el método de la brújula (Bowditch), genera cuadros de construcción,
                calcula superficies en hectáreas y fanegadas, y descarga planos vectoriales listos para Civil 3D y AutoCAD sin costo.
              </p>
            </div>

            {/* Bullets de características clave */}
            <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>Compensación Bowditch en tiempo real</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>Exporta a AutoCAD (.DXF) y Excel (.CSV)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>MAGNA-SIRGAS Origen Único CTM12</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                <span>Visualizador 2D interactivo con cotas</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20 font-bold"
              >
                <Link href="/herramientas">
                  Probar Herramienta Principal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/herramientas">
                  Ver Ejemplos Predefinidos
                </Link>
              </Button>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta Interactiva / Preview Tecnológico */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/15 bg-card/40 p-6 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Levantamiento Finca Modelo</span>
                    <span className="text-[11px] text-white/50">Precisión Relativa 1 : 18,500</span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  Alta Precisión
                </span>
              </div>

              {/* Vista previa gráfica del polígono simulado */}
              <div className="relative w-full h-36 rounded-xl bg-black/30 border border-white/10 overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full p-3" viewBox="0 0 200 120">
                  {/* Grilla sutil */}
                  <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                  <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                  <line x1="70" y1="0" x2="70" y2="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                  <line x1="140" y1="0" x2="140" y2="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />

                  {/* Polígono estilizado */}
                  <polygon
                    points="30,80 70,25 150,35 175,90 95,105"
                    fill="rgba(76, 166, 73, 0.2)"
                    stroke="#4CA649"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Puntos de vértice */}
                  <circle cx="30" cy="80" r="3.5" fill="#ffffff" />
                  <circle cx="70" cy="25" r="3.5" fill="#ffffff" />
                  <circle cx="150" cy="35" r="3.5" fill="#ffffff" />
                  <circle cx="175" cy="90" r="3.5" fill="#ffffff" />
                  <circle cx="95" cy="105" r="3.5" fill="#ffffff" />

                  <text x="70" y="20" fill="#ffffff" fontSize="9" fontWeight="bold">P1</text>
                  <text x="155" y="32" fill="#ffffff" fontSize="9" fontWeight="bold">P2</text>
                  <text x="180" y="94" fill="#ffffff" fontSize="9" fontWeight="bold">P3</text>
                  <text x="95" y="116" fill="#ffffff" fontSize="9" fontWeight="bold">P4</text>
                  <text x="15" y="85" fill="#ffffff" fontSize="9" fontWeight="bold">P5</text>
                </svg>

                <div className="absolute top-2 right-2 text-[10px] font-mono text-white/50">
                  CTM12 (EPSG:9377)
                </div>
              </div>

              {/* Indicadores rápidos */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white/5 border border-white/10 p-2">
                  <span className="text-[10px] text-white/50 block">Superficie</span>
                  <span className="text-xs font-bold text-white font-mono">15,482 m²</span>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-2">
                  <span className="text-[10px] text-white/50 block">Hectáreas</span>
                  <span className="text-xs font-bold text-secondary font-mono">1.548 ha</span>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-2">
                  <span className="text-[10px] text-white/50 block">Fanegadas</span>
                  <span className="text-xs font-bold text-white font-mono">2.419 Plz</span>
                </div>
              </div>

              {/* Botón rápido de DXF */}
              <Link
                href="/herramientas"
                className="flex items-center justify-between rounded-xl bg-secondary/15 border border-secondary/30 p-2.5 text-xs text-secondary font-semibold hover:bg-secondary/25 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Exportación directa AutoCAD (.DXF)</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
