"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Compass,
  Calculator,
  Ruler,
  RefreshCw,
  Layers,
  ArrowRightLeft,
  Download,
  Plus,
  Trash2,
  FileSpreadsheet,
  CheckCircle2,
  Share2,
  Sparkles,
  MapPin,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react"
import { ContourBackground } from "@/components/contour-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import {
  TraverseLegInput,
  DirectVertexInput,
  PolygonCalculationResult,
  computeBowditchTraverse,
  computeDirectCoordinatesTraverse,
  generateTraverseCsv,
  PRESETS_DATA,
} from "@/lib/topography-calc"
import { generateAutoCAD_DXF } from "@/lib/dxf-generator"
import {
  COLOMBIA_ORIGINS,
  latLonToProjected,
  projectedToLatLon,
  generateKml,
} from "@/lib/geodesy-magna"
import { PolygonVisualizer } from "@/components/polygon-visualizer"

type ToolTab = "polygonal" | "magna" | "coords" | "slope" | "scale"
type CalculationMode = "bowditch" | "direct"

export default function HerramientasPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>("polygonal")
  const [copiedTable, setCopiedTable] = useState(false)

  // ==========================================
  // HERRAMIENTA 1: COMPENSADOR DE POLIGONALES PRO
  // ==========================================
  const [calcMode, setCalcMode] = useState<CalculationMode>("bowditch")
  const [projectName, setProjectName] = useState("Predio Rural El Mirador")

  // Estado para Cartera de Campo (Bowditch)
  const [initialPoint, setInitialPoint] = useState({
    name: "P1",
    north: 2000500.0,
    east: 5000200.0,
    elevation: 1820.5,
  })

  const [legs, setLegs] = useState<TraverseLegInput[]>(
    PRESETS_DATA.ruralFinca.legs
  )

  // Estado para Coordenadas Directas
  const [directVertices, setDirectVertices] = useState<DirectVertexInput[]>(
    PRESETS_DATA.ruralFinca.directVertices
  )

  // Cálculo en tiempo real
  const polygonResult = useMemo<PolygonCalculationResult | null>(() => {
    try {
      if (calcMode === "bowditch") {
        if (!legs || legs.length < 3) return null
        return computeBowditchTraverse(initialPoint, legs)
      } else {
        if (!directVertices || directVertices.length < 3) return null
        return computeDirectCoordinatesTraverse(directVertices)
      }
    } catch (e) {
      console.error("Error en cálculo de poligonal:", e)
      return null
    }
  }, [calcMode, initialPoint, legs, directVertices])

  // Cargar preset
  const handleLoadPreset = (presetKey: keyof typeof PRESETS_DATA) => {
    const data = PRESETS_DATA[presetKey]
    if (!data) return
    setProjectName(data.name)
    setInitialPoint(data.initialPoint)
    setLegs(data.legs)
    setDirectVertices(data.directVertices)
  }

  // Modificar lados en cartera
  const handleUpdateLeg = (index: number, field: keyof TraverseLegInput, value: any) => {
    setLegs((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleAddLeg = () => {
    const nextIdx = legs.length + 1
    const prevTo = legs[legs.length - 1]?.to || `P${nextIdx}`
    setLegs((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        from: prevTo,
        to: `P${nextIdx + 1}`,
        azimuthDeg: 45.0,
        distance: 50.0,
        deltaZ: 0.0,
      },
    ])
  }

  const handleRemoveLeg = (index: number) => {
    if (legs.length <= 3) return
    setLegs((prev) => prev.filter((_, i) => i !== index))
  }

  // Modificar vértices directos
  const handleUpdateVertex = (index: number, field: keyof DirectVertexInput, value: any) => {
    setDirectVertices((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleAddVertex = () => {
    const nextIdx = directVertices.length + 1
    const last = directVertices[directVertices.length - 1]
    setDirectVertices((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: `P${nextIdx}`,
        north: last ? last.north + 20 : 2000000,
        east: last ? last.east + 20 : 5000000,
        elevation: last ? last.elevation : 1500,
      },
    ])
  }

  const handleRemoveVertex = (index: number) => {
    if (directVertices.length <= 3) return
    setDirectVertices((prev) => prev.filter((_, i) => i !== index))
  }

  // Descarga de archivo DXF
  const handleDownloadDxf = () => {
    if (!polygonResult) return
    const dxf = generateAutoCAD_DXF(polygonResult, {
      projectName,
      includeTable: true,
      includeDimensions: true,
    })
    const blob = new Blob([dxf], { type: "application/dxf;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `poligonal_${projectName.toLowerCase().replace(/\s+/g, "_")}.dxf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Descarga de archivo CSV
  const handleDownloadCsv = () => {
    if (!polygonResult) return
    const csv = generateTraverseCsv(polygonResult)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cartera_${projectName.toLowerCase().replace(/\s+/g, "_")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Copiar cuadro de construcción al portapapeles
  const handleCopyTable = () => {
    if (!polygonResult) return
    const csv = generateTraverseCsv(polygonResult)
    navigator.clipboard.writeText(csv)
    setCopiedTable(true)
    setTimeout(() => setCopiedTable(false), 2500)
  }

  // ==========================================
  // HERRAMIENTA 2: GEODESIA MAGNA-SIRGAS CTM12
  // ==========================================
  const [magnaDirection, setMagnaDirection] = useState<"geoToProj" | "projToGeo">("geoToProj")
  const [selectedOrigin, setSelectedOrigin] = useState<keyof typeof COLOMBIA_ORIGINS>("CTM12")
  const [geoLat, setGeoLat] = useState("4.60971")
  const [geoLon, setGeoLon] = useState("-74.08175")
  const [projNorth, setProjNorth] = useState("2067425.12")
  const [projEast, setProjEast] = useState("4880154.85")
  const [magnaResult, setMagnaResult] = useState<{
    north?: number
    east?: number
    lat?: number
    lon?: number
  } | null>(null)

  const handleConvertMagna = () => {
    if (magnaDirection === "geoToProj") {
      const lat = parseFloat(geoLat)
      const lon = parseFloat(geoLon)
      if (isNaN(lat) || isNaN(lon)) return
      const res = latLonToProjected(lat, lon, selectedOrigin)
      setMagnaResult({ north: res.north, east: res.east })
    } else {
      const north = parseFloat(projNorth)
      const east = parseFloat(projEast)
      if (isNaN(north) || isNaN(east)) return
      const res = projectedToLatLon(north, east, selectedOrigin)
      setMagnaResult({ lat: res.lat, lon: res.lon })
    }
  }

  const handleDownloadKml = () => {
    let lat: number
    let lon: number

    if (magnaDirection === "geoToProj") {
      lat = parseFloat(geoLat)
      lon = parseFloat(geoLon)
    } else {
      if (!magnaResult?.lat || !magnaResult?.lon) return
      lat = magnaResult.lat
      lon = magnaResult.lon
    }

    if (isNaN(lat) || isNaN(lon)) return

    const kml = generateKml(
      [{ name: "Punto Topográfico PECVA", lat, lon, elevation: 2600 }],
      "Punto Georreferenciado PECVA"
    )

    const blob = new Blob([kml], { type: "application/vnd.google-earth.kml+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "punto_magna_sirgas_pecva.kml"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ==========================================
  // HERRAMIENTAS ADICIONALES (Existentes)
  // ==========================================
  // Tool 3: Coords Converter States
  const [ddLat, setDdLat] = useState("2.4419")
  const [ddLon, setDdLon] = useState("-76.0125")
  const [dmsResult, setDmsResult] = useState({
    lat: "2° 26' 30.84\" N",
    lon: "76° 0' 45.00\" W",
  })

  // Tool 4: Slope Calculator States
  const [horizDist, setHorizDist] = useState("10")
  const [vertDist, setVertDist] = useState("1.5")

  // Tool 5: Map Scale States
  const [scaleFactor, setScaleFactor] = useState("500")
  const [paperDist, setPaperDist] = useState("5")
  const [groundDist, setGroundDist] = useState("25")

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
      setGroundDist(((p * s) / 100).toString())
    } else {
      const g = parseFloat(groundDist) || 0
      setPaperDist(((g / s) * 100).toString())
    }
  }

  return (
    <main className="min-h-screen bg-background pt-24 overflow-hidden">
      {/* Hero Header */}
      <section className="relative border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(77,104,140,0.14),transparent_45%),radial-gradient(circle_at_left,rgba(76,166,73,0.16),transparent_40%)] py-16 lg:py-20">
        <ContourBackground variant="hero" />

        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Suite de Ingeniería Topográfica PECVA
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Herramientas Topográficas{" "}
            <span className="bg-gradient-to-r from-secondary via-emerald-400 to-primary bg-clip-text text-transparent">
              de Alta Precisión
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Plataforma gratuita en línea para cálculo y compensación de poligonales (Bowditch),
            exportación directa a <strong>AutoCAD (.DXF)</strong> y <strong>Excel (.CSV)</strong>,
            y transformación geodésica oficial <strong>MAGNA-SIRGAS Origen Nacional CTM12</strong>.
          </p>
        </div>
      </section>

      {/* Selector de Herramientas (Tabs) */}
      <section className="container mx-auto px-4 py-8 lg:px-8 max-w-6xl">
        <div className="flex flex-wrap justify-center gap-3 mb-10 border-b border-border pb-6">
          {/* HERRAMIENTA PRINCIPAL */}
          <button
            onClick={() => setActiveTab("polygonal")}
            className={`relative flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-bold transition-all shadow-sm ${
              activeTab === "polygonal"
                ? "bg-secondary text-secondary-foreground border-secondary shadow-secondary/20"
                : "bg-card border-secondary/40 text-foreground hover:bg-secondary/10"
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Compensador Poligonales Pro + DXF</span>
            <span className="ml-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 font-extrabold uppercase border border-amber-400/30">
              Principal
            </span>
          </button>

          <button
            onClick={() => setActiveTab("magna")}
            className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all ${
              activeTab === "magna"
                ? "bg-primary border-primary text-primary-foreground shadow-md"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <MapPin className="h-4 w-4" />
            MAGNA-SIRGAS CTM12
          </button>

          <button
            onClick={() => setActiveTab("coords")}
            className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all ${
              activeTab === "coords"
                ? "bg-primary border-primary text-primary-foreground shadow-md"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Conversor DD a GMS
          </button>

          <button
            onClick={() => setActiveTab("slope")}
            className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all ${
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
            className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all ${
              activeTab === "scale"
                ? "bg-primary border-primary text-primary-foreground shadow-md"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Ruler className="h-4 w-4" />
            Escala Cartográfica
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: COMPENSADOR DE POLIGONALES PRO (HERRAMIENTA PRINCIPAL) */}
        {/* ======================================================== */}
        {activeTab === "polygonal" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Banner de Bienvenida del Módulo */}
            <div className="rounded-3xl border border-secondary/30 bg-card p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-secondary/15 px-2.5 py-0.5 text-xs font-bold text-secondary uppercase tracking-wider">
                      Módulo de Ingeniería
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Normativa IGAC & Método Bowditch
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    Compensador de Poligonales y Cartera de Campo
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    Ingresa los datos de estación, azimuts y distancias tomados en campo. El motor calcula
                    el error de cierre lineal, ajusta las coordenadas con la regla de la brújula y genera
                    el plano en AutoCAD (.DXF) y la cartera técnica en Excel (.CSV).
                  </p>
                </div>

                {/* Botones de Presets Rápidos */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <span className="text-xs font-semibold uppercase text-muted-foreground self-center sm:self-auto">
                    Cargar Ejemplo:
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadPreset("ruralFinca")}
                    className="text-xs"
                  >
                    Finca Rural (5 Vértices)
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadPreset("urbanoLote")}
                    className="text-xs"
                  >
                    Lote Urbano (4 Vértices)
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadPreset("poligonalIngenieria")}
                    className="text-xs"
                  >
                    Poligonal Red (6 Vértices)
                  </Button>
                </div>
              </div>

              {/* Selector de Modo y Configuración del Proyecto */}
              <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Nombre del Proyecto / Predio
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary font-medium"
                    placeholder="Ej. Predio Rural El Mirador"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Método de Ingreso de Datos
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcMode("bowditch")}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        calcMode === "bowditch"
                          ? "bg-secondary text-secondary-foreground border-secondary font-bold"
                          : "bg-muted/40 border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Cartera de Campo (Azimuts)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcMode("direct")}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        calcMode === "direct"
                          ? "bg-secondary text-secondary-foreground border-secondary font-bold"
                          : "bg-muted/40 border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Coordenadas Directas (N, E)
                    </button>
                  </div>
                </div>

                {calcMode === "bowditch" && (
                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Coordenada Punto Inicial ({initialPoint.name})
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={initialPoint.north}
                        onChange={(e) =>
                          setInitialPoint({ ...initialPoint, north: parseFloat(e.target.value) || 0 })
                        }
                        className="rounded-lg border border-border bg-background px-2.5 py-2 text-xs font-mono"
                        placeholder="Norte"
                        title="Norte Inicial"
                      />
                      <input
                        type="number"
                        value={initialPoint.east}
                        onChange={(e) =>
                          setInitialPoint({ ...initialPoint, east: parseFloat(e.target.value) || 0 })
                        }
                        className="rounded-lg border border-border bg-background px-2.5 py-2 text-xs font-mono"
                        placeholder="Este"
                        title="Este Inicial"
                      />
                      <input
                        type="number"
                        value={initialPoint.elevation}
                        onChange={(e) =>
                          setInitialPoint({
                            ...initialPoint,
                            elevation: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="rounded-lg border border-border bg-background px-2.5 py-2 text-xs font-mono"
                        placeholder="Cota Z"
                        title="Cota Z Inicial"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Formulario / Tabla de Entrada de Datos */}
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {calcMode === "bowditch"
                      ? "Lecturas de Campo de la Poligonal Cerrada"
                      : "Vértices de Coordenadas de la Poligonal"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {calcMode === "bowditch"
                      ? "Ingresa cada tramo estación-punto visado con su azimut en grados y distancia horizontal en metros."
                      : "Ingresa los vértices ordenados perimetralmente con sus coordenadas Norte, Este y Cota Z."}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={calcMode === "bowditch" ? handleAddLeg : handleAddVertex}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Fila
                  </Button>
                </div>
              </div>

              {/* Contenedor de la Tabla Editable */}
              <div className="overflow-x-auto rounded-xl border border-border">
                {calcMode === "bowditch" ? (
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="px-3 py-3 w-12 text-center">#</th>
                        <th className="px-3 py-3">Estación</th>
                        <th className="px-3 py-3">P. Visado</th>
                        <th className="px-3 py-3">Azimut (°)</th>
                        <th className="px-3 py-3">Dist. Horiz. (m)</th>
                        <th className="px-3 py-3">Desnivel ΔZ (m)</th>
                        <th className="px-3 py-3 w-12 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      {legs.map((leg, idx) => (
                        <tr key={leg.id || idx} className="hover:bg-muted/30">
                          <td className="px-3 py-2 text-center font-mono text-muted-foreground">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={leg.from}
                              onChange={(e) => handleUpdateLeg(idx, "from", e.target.value)}
                              className="w-16 rounded border border-border bg-background px-2 py-1 text-xs font-semibold"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={leg.to}
                              onChange={(e) => handleUpdateLeg(idx, "to", e.target.value)}
                              className="w-16 rounded border border-border bg-background px-2 py-1 text-xs font-semibold"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              step="any"
                              value={leg.azimuthDeg}
                              onChange={(e) =>
                                handleUpdateLeg(idx, "azimuthDeg", parseFloat(e.target.value) || 0)
                              }
                              className="w-24 rounded border border-border bg-background px-2 py-1 text-xs font-mono"
                              placeholder="0 - 360"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              step="any"
                              value={leg.distance}
                              onChange={(e) =>
                                handleUpdateLeg(idx, "distance", parseFloat(e.target.value) || 0)
                              }
                              className="w-24 rounded border border-border bg-background px-2 py-1 text-xs font-mono font-bold text-foreground"
                              placeholder="Metros"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              step="any"
                              value={leg.deltaZ}
                              onChange={(e) =>
                                handleUpdateLeg(idx, "deltaZ", parseFloat(e.target.value) || 0)
                              }
                              className="w-20 rounded border border-border bg-background px-2 py-1 text-xs font-mono"
                              placeholder="± Metros"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveLeg(idx)}
                              disabled={legs.length <= 3}
                              className="text-muted-foreground hover:text-rose-500 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors p-1"
                              title="Eliminar fila"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="px-3 py-3 w-12 text-center">#</th>
                        <th className="px-3 py-3">Nombre Vértice</th>
                        <th className="px-3 py-3">Coordenada Norte (Y)</th>
                        <th className="px-3 py-3">Coordenada Este (X)</th>
                        <th className="px-3 py-3">Cota Z (m)</th>
                        <th className="px-3 py-3 w-12 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      {directVertices.map((v, idx) => (
                        <tr key={v.id || idx} className="hover:bg-muted/30">
                          <td className="px-3 py-2 text-center font-mono text-muted-foreground">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={v.name}
                              onChange={(e) => handleUpdateVertex(idx, "name", e.target.value)}
                              className="w-20 rounded border border-border bg-background px-2 py-1 text-xs font-semibold"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              step="any"
                              value={v.north}
                              onChange={(e) =>
                                handleUpdateVertex(idx, "north", parseFloat(e.target.value) || 0)
                              }
                              className="w-36 rounded border border-border bg-background px-2 py-1 text-xs font-mono font-bold text-foreground"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              step="any"
                              value={v.east}
                              onChange={(e) =>
                                handleUpdateVertex(idx, "east", parseFloat(e.target.value) || 0)
                              }
                              className="w-36 rounded border border-border bg-background px-2 py-1 text-xs font-mono font-bold text-foreground"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              step="any"
                              value={v.elevation}
                              onChange={(e) =>
                                handleUpdateVertex(idx, "elevation", parseFloat(e.target.value) || 0)
                              }
                              className="w-24 rounded border border-border bg-background px-2 py-1 text-xs font-mono"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveVertex(idx)}
                              disabled={directVertices.length <= 3}
                              className="text-muted-foreground hover:text-rose-500 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors p-1"
                              title="Eliminar vértice"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* ======================================================== */}
            {/* RESULTADOS TÉCNICOS Y VISUALIZADOR */}
            {/* ======================================================== */}
            {polygonResult ? (
              <div className="space-y-8">
                {/* 1. Tarjetas Métricas Principales */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Área */}
                  <div className="rounded-2xl border border-secondary/30 bg-card p-5 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Superficie Calculada (Gauss)
                    </span>
                    <div className="text-2xl font-extrabold text-foreground font-mono">
                      {polygonResult.areaM2.toLocaleString("es-CO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      <span className="text-sm font-semibold text-secondary">m²</span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-1 flex items-center justify-between">
                      <span className="font-semibold text-secondary">
                        {polygonResult.areaHa.toFixed(4)} ha
                      </span>
                      <span>
                        {polygonResult.areaFanegadas.toFixed(3)} Fanegadas
                      </span>
                    </div>
                  </div>

                  {/* Perímetro */}
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Perímetro Total
                    </span>
                    <div className="text-2xl font-extrabold text-foreground font-mono">
                      {polygonResult.totalPerimeter.toFixed(3)}{" "}
                      <span className="text-sm font-semibold text-primary">m</span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-1">
                      Suma de {polygonResult.sides.length} tramos medidos
                    </div>
                  </div>

                  {/* Error de Cierre Lineal */}
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Error de Cierre Lineal (El)
                    </span>
                    <div className="text-2xl font-extrabold text-foreground font-mono">
                      {polygonResult.errorLinear.toFixed(4)}{" "}
                      <span className="text-sm font-semibold text-muted-foreground">m</span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-1 flex gap-2 font-mono">
                      <span>ΔN: {polygonResult.errorN.toFixed(3)}m</span>
                      <span>•</span>
                      <span>ΔE: {polygonResult.errorE.toFixed(3)}m</span>
                    </div>
                  </div>

                  {/* Precisión Relativa */}
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Precisión Relativa (1 : N)
                    </span>
                    <div className="text-2xl font-extrabold text-foreground font-mono">
                      1 : {polygonResult.relativePrecision.toLocaleString()}
                    </div>
                    <div className="text-xs pt-1 flex items-center gap-1.5 font-bold">
                      <span className={`inline-block h-2 w-2 rounded-full ${
                        polygonResult.precisionRating.status === "excelente"
                          ? "bg-emerald-500"
                          : polygonResult.precisionRating.status === "buena"
                          ? "bg-primary"
                          : "bg-amber-500"
                      }`} />
                      <span className={polygonResult.precisionRating.color}>
                        {polygonResult.precisionRating.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Visualizador Gráfico 2D Interactivo */}
                <PolygonVisualizer result={polygonResult} />

                {/* 3. Cuadro de Construcción Topográfico Oficial */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5 text-secondary" />
                        <h3 className="text-xl font-bold text-foreground">
                          Cuadro de Construcción Topográfico
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Linderos, rumbos, distancias y coordenadas definitivas compensadas.
                      </p>
                    </div>

                    {/* Botones de Exportación */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Button
                        type="button"
                        onClick={handleDownloadDxf}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xs font-bold shadow-sm flex items-center gap-1.5"
                      >
                        <Download className="h-4 w-4" />
                        Descargar AutoCAD (.DXF)
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleDownloadCsv}
                        className="text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Download className="h-4 w-4" />
                        Excel (.CSV)
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyTable}
                        className="text-xs flex items-center gap-1"
                      >
                        {copiedTable ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-500 font-bold">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copiar Tabla</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Tabla de Linderos */}
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                        <tr>
                          <th className="px-3 py-3 text-center">Lado</th>
                          <th className="px-3 py-3">Rumbo</th>
                          <th className="px-3 py-3">Azimut GMS</th>
                          <th className="px-3 py-3 text-right">Distancia (m)</th>
                          <th className="px-3 py-3 text-right">ΔN Corr (m)</th>
                          <th className="px-3 py-3 text-right">ΔE Corr (m)</th>
                          <th className="px-3 py-3 text-right">Norte (Y)</th>
                          <th className="px-3 py-3 text-right">Este (X)</th>
                          <th className="px-3 py-3 text-right">Cota Z (m)</th>
                          <th className="px-3 py-3 text-right">Pendiente %</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card font-mono">
                        {polygonResult.sides.map((side) => (
                          <tr key={side.index} className="hover:bg-muted/30">
                            <td className="px-3 py-2 text-center font-bold text-foreground">
                              {side.from}-{side.to}
                            </td>
                            <td className="px-3 py-2 font-semibold text-secondary">
                              {side.bearing}
                            </td>
                            <td className="px-3 py-2 text-muted-foreground">
                              {side.azimuthDms}
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-foreground">
                              {side.distance.toFixed(3)}
                            </td>
                            <td className="px-3 py-2 text-right text-muted-foreground">
                              {side.deltaN_corr > 0 ? `+${side.deltaN_corr.toFixed(3)}` : side.deltaN_corr.toFixed(3)}
                            </td>
                            <td className="px-3 py-2 text-right text-muted-foreground">
                              {side.deltaE_corr > 0 ? `+${side.deltaE_corr.toFixed(3)}` : side.deltaE_corr.toFixed(3)}
                            </td>
                            <td className="px-3 py-2 text-right font-semibold text-foreground">
                              {side.startPoint.north.toFixed(3)}
                            </td>
                            <td className="px-3 py-2 text-right font-semibold text-foreground">
                              {side.startPoint.east.toFixed(3)}
                            </td>
                            <td className="px-3 py-2 text-right text-muted-foreground">
                              {side.startPoint.elevation.toFixed(2)}
                            </td>
                            <td className="px-3 py-2 text-right text-muted-foreground">
                              {side.slopePercent.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Dictamen Técnico de Tolerancia */}
                  <div className="rounded-2xl bg-muted/40 border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
                        Dictamen Técnico del Levantamiento
                      </span>
                      <p className="text-sm font-medium text-foreground">
                        {polygonResult.precisionRating.description}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <CheckCircle2 className={`h-5 w-5 ${polygonResult.precisionRating.color}`} />
                      <span className={`text-sm font-bold ${polygonResult.precisionRating.color}`}>
                        {polygonResult.precisionRating.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center text-sm text-destructive">
                No fue posible calcular la poligonal. Por favor revisa que las distancias y azimuts sean valores válidos mayores a cero.
              </div>
            )}
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MAGNA-SIRGAS CTM12 (GEODESIA OFICIAL COLOMBIA) */}
        {/* ======================================================== */}
        {activeTab === "magna" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto"
          >
            <div className="flex gap-3 items-start border-b border-border pb-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Transformador Oficial MAGNA-SIRGAS (Origen Nacional CTM12)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Conversión geodésica oficial en Colombia (Resolución IGAC 471/529 de 2020 - EPSG:9377). Transforma coordenadas GPS elipsoidales (WGS84) a coordenadas planas proyectadas y viceversa.
                </p>
              </div>
            </div>

            {/* Dirección de conversión */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMagnaDirection("geoToProj")
                  setMagnaResult(null)
                }}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  magnaDirection === "geoToProj"
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                    : "bg-muted/40 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                WGS84 (Lat / Lon) ➔ MAGNA-SIRGAS CTM12 (N / E)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMagnaDirection("projToGeo")
                  setMagnaResult(null)
                }}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  magnaDirection === "projToGeo"
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                    : "bg-muted/40 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                MAGNA-SIRGAS CTM12 (N / E) ➔ WGS84 (Lat / Lon)
              </button>
            </div>

            {/* Selector de Origen Geodésico */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Sistema de Referencia y Origen Proyectado
              </label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary font-medium"
              >
                {Object.entries(COLOMBIA_ORIGINS).map(([key, orig]) => (
                  <option key={key} value={key}>
                    {orig.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-muted-foreground block">
                {COLOMBIA_ORIGINS[selectedOrigin]?.description}
              </span>
            </div>

            {/* Campos de entrada */}
            {magnaDirection === "geoToProj" ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Latitud Decimal (Grados N/S)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={geoLat}
                    onChange={(e) => setGeoLat(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground font-mono focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 4.60971"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Longitud Decimal (Grados E/W)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={geoLon}
                    onChange={(e) => setGeoLon(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground font-mono focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. -74.08175"
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Coordenada Norte Proyectada (Metros)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={projNorth}
                    onChange={(e) => setProjNorth(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground font-mono focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 2067425.12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Coordenada Este Proyectada (Metros)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={projEast}
                    onChange={(e) => setProjEast(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground font-mono focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                    placeholder="Ej. 4880154.85"
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleConvertMagna}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 rounded-xl flex items-center justify-center gap-2 font-bold transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Transformar Coordenada Geodésica
            </Button>

            {/* Resultados Geodésicos */}
            {magnaResult && (
              <div className="rounded-2xl bg-muted/40 border border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Resultado de Transformación Geodésica
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadKml}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Google Earth (.KML)
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {magnaResult.north !== undefined && magnaResult.east !== undefined ? (
                    <>
                      <div className="p-4 rounded-xl border border-border bg-card text-center">
                        <span className="text-xs text-muted-foreground block mb-1">
                          Norte Proyectado (Y)
                        </span>
                        <span className="text-lg font-mono font-bold text-foreground">
                          {magnaResult.north.toLocaleString("es-CO", { minimumFractionDigits: 3 })} m
                        </span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-card text-center">
                        <span className="text-xs text-muted-foreground block mb-1">
                          Este Proyectado (X)
                        </span>
                        <span className="text-lg font-mono font-bold text-foreground">
                          {magnaResult.east.toLocaleString("es-CO", { minimumFractionDigits: 3 })} m
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-xl border border-border bg-card text-center">
                        <span className="text-xs text-muted-foreground block mb-1">
                          Latitud Geográfica (WGS84)
                        </span>
                        <span className="text-lg font-mono font-bold text-foreground">
                          {magnaResult.lat?.toFixed(8)}°
                        </span>
                      </div>
                      <div className="p-4 rounded-xl border border-border bg-card text-center">
                        <span className="text-xs text-muted-foreground block mb-1">
                          Longitud Geográfica (WGS84)
                        </span>
                        <span className="text-lg font-mono font-bold text-foreground">
                          {magnaResult.lon?.toFixed(8)}°
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CONVERSOR DECIMALES A DMS */}
        {/* ======================================================== */}
        {activeTab === "coords" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto"
          >
            <div className="flex gap-3 items-start border-b border-border pb-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <ArrowRightLeft className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Conversor de Coordenadas Decimales a DMS
                </h2>
                <p className="text-xs text-muted-foreground">
                  Convierte rápidamente coordenadas en formato Grados Decimales (DD) al formato oficial de Grados, Minutos y Segundos (DMS).
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Latitud Decimal (DD)
                </label>
                <input
                  type="number"
                  step="any"
                  value={ddLat}
                  onChange={(e) => setDdLat(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  placeholder="Ej. 2.4419"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Longitud Decimal (DD)
                </label>
                <input
                  type="number"
                  step="any"
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

            <div className="rounded-2xl bg-muted/40 border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Resultado (DMS)
              </h3>
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

        {/* ======================================================== */}
        {/* TAB 4: CALCULADORA DE PENDIENTE Y DESNIVEL */}
        {/* ======================================================== */}
        {activeTab === "slope" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto"
          >
            <div className="flex gap-3 items-start border-b border-border pb-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Calculadora de Pendiente y Desnivel
                </h2>
                <p className="text-xs text-muted-foreground">
                  Calcula de forma matemática la pendiente relativa de una rasante, rampa, tubería o terreno ingresando la distancia horizontal y el desnivel vertical.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Distancia Horizontal (m)
                </label>
                <input
                  type="number"
                  step="any"
                  value={horizDist}
                  onChange={(e) => setHorizDist(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  placeholder="Ej. 10.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Desnivel Vertical (m)
                </label>
                <input
                  type="number"
                  step="any"
                  value={vertDist}
                  onChange={(e) => setVertDist(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  placeholder="Ej. 1.50"
                />
              </div>
            </div>

            {/* Esquema dinámico */}
            <div className="rounded-2xl bg-muted/40 border border-border p-6 flex flex-col items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Esquema Dinámico de Inclinación
              </span>
              <div className="relative w-full max-w-[280px] h-[150px] border-b border-l border-border flex items-end">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line
                    x1="0"
                    y1="100"
                    x2="100"
                    y2={Math.max(100 - (vd / hd) * 100, 10)}
                    stroke="var(--secondary)"
                    strokeWidth="3"
                  />
                  <polygon
                    points={`0,100 100,100 100,${Math.max(100 - (vd / hd) * 100, 10)}`}
                    fill="var(--secondary)"
                    fillOpacity="0.08"
                  />
                </svg>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-muted-foreground">
                  {hd}m (Horizontal)
                </span>
                <span className="absolute right-2 bottom-1/2 translate-y-1/2 text-xs font-mono font-bold text-muted-foreground">
                  {vd}m (Desnivel)
                </span>
              </div>
            </div>

            {/* Resultados */}
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

        {/* ======================================================== */}
        {/* TAB 5: ESCALA CARTOGRÁFICA */}
        {/* ======================================================== */}
        {activeTab === "scale" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto"
          >
            <div className="flex gap-3 items-start border-b border-border pb-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Ruler className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Calculadora de Escala Cartográfica</h2>
                <p className="text-xs text-muted-foreground">
                  Encuentra la equivalencia exacta entre la distancia en papel (plano en centímetros) y la distancia real en el terreno (metros) de acuerdo a la escala.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Escala del Plano (1:X)
                </label>
                <input
                  type="number"
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  placeholder="Ej. 500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Papel: cm en Plano
                </label>
                <input
                  type="number"
                  step="any"
                  value={paperDist}
                  onChange={(e) => setPaperDist(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  placeholder="Ej. 5"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Terreno: Metros Reales
                </label>
                <input
                  type="number"
                  step="any"
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

            <div className="rounded-2xl bg-muted/40 border border-border p-6 text-center space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Interpretación Cartográfica
              </span>
              <p className="text-sm font-semibold text-foreground leading-relaxed">
                Con una escala de <span className="text-secondary font-bold">1 : {scaleFactor}</span>, cada centímetro (<span className="text-primary font-bold">1 cm</span>) medido en el plano de papel equivale exactamente a <span className="text-secondary font-bold">{(parseFloat(scaleFactor) / 100).toFixed(1)} metros</span> reales sobre el terreno de campo.
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Tools CTA Block */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#111C28] to-[#0B1520] text-white py-16 relative overflow-hidden mt-16">
        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">¿Necesita soporte de precisión profesional?</h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Nuestros topógrafos e ingenieros emplean instrumentación de alta tecnología para dar soluciones centimétricas en campo y jurídicas ante notaría e IGAC.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
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
