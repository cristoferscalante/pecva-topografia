"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Compass, Calculator, Ruler, RefreshCw, Layers, ArrowRightLeft, HelpCircle } from "lucide-react"
import { ContourBackground } from "@/components/contour-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

type ToolTab = "coords" | "slope" | "scale"

export default function HerramientasPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>("coords")

  // Tool 1: Coords Converter States
  const [ddLat, setDdLat] = useState("2.4419")
  const [ddLon, setDdLon] = useState("-76.0125")
  const [dmsResult, setDmsResult] = useState({
    lat: "2° 26' 30.84\" N",
    lon: "76° 0' 45.00\" W",
  })

  // Tool 2: Slope Calculator States
  const [horizDist, setHorizDist] = useState("10")
  const [vertDist, setVertDist] = useState("1.5")

  // Tool 3: Map Scale States
  const [scaleFactor, setScaleFactor] = useState("500") // 1:500
  const [paperDist, setPaperDist] = useState("5") // 5 cm
  const [groundDist, setGroundDist] = useState("25") // 25 m

  // Conversions logic
  const handleConvertCoords = () => {
    const latNum = parseFloat(ddLat)
    const lonNum = parseFloat(ddLon)

    if (isNaN(latNum) || isNaN(lonNum)) return

    const convertToDMS = (val: number, isLat: boolean) => {
      const absVal = Math.abs(val)
      const deg = Math.floor(absVal)
      const minFloat = (absVal - deg) * 60
      const min = Math.floor(minFloat)
      const sec = ((minFloat - min) * 60).toFixed(2)

      let direction = ""
      if (isLat) {
        direction = val >= 0 ? "N" : "S"
      } else {
        direction = val >= 0 ? "E" : "W"
      }

      return `${deg}° ${min}' ${sec}" ${direction}`
    }

    setDmsResult({
      lat: convertToDMS(latNum, true),
      lon: convertToDMS(lonNum, false),
    })
  }

  // Slope Calculations
  const hd = parseFloat(horizDist) || 10
  const vd = parseFloat(vertDist) || 1.5
  const slopePercent = hd > 0 ? ((vd / hd) * 100).toFixed(2) : "0.00"
  const slopeDegrees = hd > 0 ? (Math.atan(vd / hd) * (180 / Math.PI)).toFixed(2) : "0.00"
  const slopeRatio = vd > 0 && hd > 0 ? `1 : ${(hd / vd).toFixed(1)}` : "1 : 0.0"

  // Map Scale Calculation
  const handleScaleCalc = (type: "ground" | "paper") => {
    const s = parseFloat(scaleFactor) || 500
    if (type === "ground") {
      const p = parseFloat(paperDist) || 0
      setGroundDist(((p * s) / 100).toString()) // cm * scale / 100 = m
    } else {
      const g = parseFloat(groundDist) || 0
      setPaperDist(((g / s) * 100).toString()) // m / scale * 100 = cm
    }
  }

  return (
    <main className="min-h-screen bg-background pt-24 overflow-hidden">
      {/* Hero Header */}
      <section className="relative border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(77,104,140,0.12),transparent_40%),radial-gradient(circle_at_left,rgba(76,166,73,0.14),transparent_35%)] py-16 lg:py-20">
        <ContourBackground variant="hero" />
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            Recursos Técnicos en Línea
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Herramientas Topográficas{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Interactivas
            </span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Calculadoras sencillas de precisión diseñadas para topógrafos, ingenieros, arquitectos y propietarios prediales en campo.
          </p>
        </div>
      </section>

      {/* Tabs Selection */}
      <section className="container mx-auto px-4 py-10 lg:px-8 max-w-5xl">
        <div className="flex flex-wrap justify-center gap-4 mb-10 border-b border-border pb-6">
          <button
            onClick={() => setActiveTab("coords")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full border text-sm font-semibold transition-all ${
              activeTab === "coords"
                ? "bg-primary border-primary text-primary-foreground shadow-md"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Conversor Coordenadas
          </button>
          <button
            onClick={() => setActiveTab("slope")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full border text-sm font-semibold transition-all ${
              activeTab === "slope"
                ? "bg-primary border-primary text-primary-foreground shadow-md"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Compass className="h-4 w-4" />
            Pendiente y Desnivel
          </button>
          <button
            onClick={() => setActiveTab("scale")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full border text-sm font-semibold transition-all ${
              activeTab === "scale"
                ? "bg-primary border-primary text-primary-foreground shadow-md"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Ruler className="h-4 w-4" />
            Escala Cartográfica
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mx-auto max-w-3xl">
          {activeTab === "coords" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6"
            >
              <div className="flex gap-3 items-start border-b border-border pb-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Conversor de Coordenadas Decimales a DMS</h2>
                  <p className="text-xs text-muted-foreground">Convierte rápidamente coordenadas en formato Grados Decimales (DD) al formato oficial de Grados, Minutos y Segundos (DMS).</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="ddLat" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Latitud Decimal (DD)</label>
                  <input
                    type="number"
                    step="any"
                    id="ddLat"
                    value={ddLat}
                    onChange={(e) => setDdLat(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 2.4419"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ddLon" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Longitud Decimal (DD)</label>
                  <input
                    type="number"
                    step="any"
                    id="ddLon"
                    value={ddLon}
                    onChange={(e) => setDdLon(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. -76.0125"
                  />
                </div>
              </div>

              <Button
                onClick={handleConvertCoords}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 rounded-xl flex items-center justify-center gap-2 font-bold transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                Calcular Conversión
              </Button>

              {/* Conversion Results */}
              <div className="rounded-2xl bg-muted/40 border border-border p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resultado (DMS)</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-xl border border-border bg-card text-center">
                    <span className="text-xs text-muted-foreground block mb-1">Latitud GMS</span>
                    <span className="text-base font-mono font-bold text-foreground">{dmsResult.lat}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card text-center">
                    <span className="text-xs text-muted-foreground block mb-1">Longitud GMS</span>
                    <span className="text-base font-mono font-bold text-foreground">{dmsResult.lon}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "slope" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6"
            >
              <div className="flex gap-3 items-start border-b border-border pb-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Calculadora de Pendiente y Desnivel</h2>
                  <p className="text-xs text-muted-foreground">Calcula de forma matemática la pendiente relativa de una rasante, rampa, tubería o terreno ingresando la distancia horizontal y el desnivel vertical.</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="horizDist" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Distancia Horizontal (m)</label>
                  <input
                    type="number"
                    step="any"
                    id="horizDist"
                    value={horizDist}
                    onChange={(e) => setHorizDist(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 10.00"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="vertDist" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Desnivel Vertical (m)</label>
                  <input
                    type="number"
                    step="any"
                    id="vertDist"
                    value={vertDist}
                    onChange={(e) => setVertDist(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 1.50"
                  />
                </div>
              </div>

              {/* Dynamic SVG Slope Visualizer */}
              <div className="rounded-2xl bg-muted/40 border border-border p-6 flex flex-col items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Esquema Dinámico de Inclinación</span>
                <div className="relative w-full max-w-[280px] h-[150px] border-b border-l border-border flex items-end">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Slope line */}
                    <line
                      x1="0"
                      y1="100"
                      x2="100"
                      y2={Math.max(100 - (vd / hd) * 100, 10)}
                      stroke="var(--secondary)"
                      strokeWidth="3"
                    />
                    {/* Filling under the slope */}
                    <polygon
                      points={`0,100 100,100 100,${Math.max(100 - (vd / hd) * 100, 10)}`}
                      fill="var(--secondary)"
                      fillOpacity="0.08"
                    />
                  </svg>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-muted-foreground">{hd}m (Horizontal)</span>
                  <span className="absolute right-2 bottom-1/2 translate-y-1/2 text-xs font-mono font-bold text-muted-foreground writing-vertical">{vd}m (Desnivel)</span>
                </div>
              </div>

              {/* Slope Results */}
              <div className="rounded-2xl bg-muted/40 border border-border p-6 grid gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Pendiente (%)</span>
                  <span className="text-xl font-bold text-primary">{slopePercent}%</span>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Ángulo (Grados)</span>
                  <span className="text-xl font-bold text-primary">{slopeDegrees}°</span>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Relación (1:X)</span>
                  <span className="text-xl font-bold text-primary">{slopeRatio}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "scale" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6"
            >
              <div className="flex gap-3 items-start border-b border-border pb-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Ruler className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Calculadora de Escala Cartográfica</h2>
                  <p className="text-xs text-muted-foreground">Encuentra la equivalencia exacta entre la distancia en papel (plano en centímetros) y la distancia real en el terreno (metros) de acuerdo a la escala.</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="scaleFactor" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Escala del Plano (1:X)</label>
                  <input
                    type="number"
                    id="scaleFactor"
                    value={scaleFactor}
                    onChange={(e) => setScaleFactor(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="paperDist" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Papel: cm en Plano</label>
                  <input
                    type="number"
                    step="any"
                    id="paperDist"
                    value={paperDist}
                    onChange={(e) => setPaperDist(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 5"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="groundDist" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Terreno: Metros Reales</label>
                  <input
                    type="number"
                    step="any"
                    id="groundDist"
                    value={groundDist}
                    onChange={(e) => setGroundDist(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 25"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <Button
                  onClick={() => handleScaleCalc("ground")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 py-5 rounded-xl font-semibold transition-all"
                >
                  Hallar Distancia Real (Metros)
                </Button>
                <Button
                  onClick={() => handleScaleCalc("paper")}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-semibold transition-all"
                >
                  Hallar Distancia Papel (cm)
                </Button>
              </div>

              {/* Scale Results */}
              <div className="rounded-2xl bg-muted/40 border border-border p-6 text-center space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Interpretación Cartográfica</span>
                <p className="text-sm font-semibold text-foreground leading-relaxed">
                  Con una escala de <span className="text-secondary font-bold">1 : {scaleFactor}</span>, cada centímetro (<span className="text-primary font-bold">1 cm</span>) medido en el plano de papel equivale exactamente a <span className="text-secondary font-bold">{(parseFloat(scaleFactor) / 100).toFixed(1)} metros</span> reales sobre el terreno de campo.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tools CTA Block */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#111C28] to-[#0B1520] text-white py-16 relative overflow-hidden mt-16">
        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">¿Necesita soporte de precisión profesional?</h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Nuestros topógrafos e ingenieros emplean instrumentación de alta tecnología para dar soluciones centimétricas en campo y jurídicas ante notaría e IGAC.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">
                Hablar con un Ingeniero
              </a>
            </Button>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Ir al Formulario
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
