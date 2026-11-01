"use client"

import React, { useState, useMemo } from "react"
import { ZoomIn, ZoomOut, RotateCcw, Eye, Compass, Layers, Maximize2 } from "lucide-react"
import { PolygonCalculationResult } from "@/lib/topography-calc"
import { Button } from "@/components/ui/button"

interface PolygonVisualizerProps {
  result: PolygonCalculationResult
}

export function PolygonVisualizer({ result }: PolygonVisualizerProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)
  const [showDistances, setShowDistances] = useState(true)
  const [showElevations, setShowElevations] = useState(true)
  const [showCentroid, setShowCentroid] = useState(true)

  const { vertices, sides, bounds, centroid, areaM2, areaHa } = result

  // Dimensiones del canvas SVG
  const width = 640
  const height = 480
  const padding = 65

  // Rango de coordenadas de terreno
  const deltaE = Math.max(bounds.maxE - bounds.minE, 1)
  const deltaN = Math.max(bounds.maxN - bounds.minN, 1)

  // Escala para ajustar en el viewBox
  const scaleX = (width - padding * 2) / deltaE
  const scaleY = (height - padding * 2) / deltaN
  const baseScale = Math.min(scaleX, scaleY)

  // Centrado en el lienzo
  const offsetX = (width - deltaE * baseScale) / 2
  const offsetY = (height - deltaN * baseScale) / 2

  // Transformador de coordenadas de terreno (N, E) a SVG (X, Y)
  const toSvgCoords = (north: number, east: number) => {
    const x = offsetX + (east - bounds.minE) * baseScale
    const y = height - (offsetY + (north - bounds.minN) * baseScale)
    return { x, y }
  }

  // Generar string de puntos SVG para el polígono cerrado
  const polygonPoints = useMemo(() => {
    return vertices
      .map((v) => {
        const { x, y } = toSvgCoords(v.north, v.east)
        return `${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(" ")
  }, [vertices, bounds, baseScale])

  // Coordenadas transformadas del centroide
  const centroidSvg = useMemo(() => {
    return toSvgCoords(centroid.north, centroid.east)
  }, [centroid, bounds, baseScale])

  // Reiniciar vista
  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Grilla de coordenadas
  const gridLines = useMemo(() => {
    if (!showGrid) return { vLines: [], hLines: [] }
    const steps = 4
    const vLines = []
    const hLines = []

    for (let i = 0; i <= steps; i++) {
      const eVal = bounds.minE + (deltaE * i) / steps
      const nVal = bounds.minN + (deltaN * i) / steps

      const { x } = toSvgCoords(bounds.minN, eVal)
      const { y } = toSvgCoords(nVal, bounds.minE)

      vLines.push({ x, label: `${eVal.toFixed(1)}m E` })
      hLines.push({ y, label: `${nVal.toFixed(1)}m N` })
    }

    return { vLines, hLines }
  }, [bounds, deltaE, deltaN, showGrid, baseScale])

  return (
    <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-md flex flex-col">
      {/* Barra de herramientas superior del visualizador */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 px-4 py-3 bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Plano Geométrico Interactivo
            </span>
            <span className="text-[11px] text-muted-foreground">
              {vertices.length} vértices • Cuadrícula métrica ajustada
            </span>
          </div>
        </div>

        {/* Controles de visualización */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className="h-8 w-8 p-0"
            title="Acercar (Zoom +)"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
            className="h-8 w-8 p-0"
            title="Alejar (Zoom -)"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetView}
            className="h-8 w-8 p-0"
            title="Centrar y Ajustar"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <div className="h-4 w-[1px] bg-border mx-1" />

          {/* Toggles */}
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
              showGrid
                ? "bg-secondary/15 text-secondary border border-secondary/30"
                : "text-muted-foreground hover:bg-muted"
            }`}
            title="Alternar cuadrícula de coordenadas"
          >
            Grilla
          </button>
          <button
            type="button"
            onClick={() => setShowDistances(!showDistances)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
              showDistances
                ? "bg-secondary/15 text-secondary border border-secondary/30"
                : "text-muted-foreground hover:bg-muted"
            }`}
            title="Alternar rótulos de distancias"
          >
            Distancias
          </button>
          <button
            type="button"
            onClick={() => setShowElevations(!showElevations)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
              showElevations
                ? "bg-secondary/15 text-secondary border border-secondary/30"
                : "text-muted-foreground hover:bg-muted"
            }`}
            title="Alternar cotas Z"
          >
            Cotas Z
          </button>
        </div>
      </div>

      {/* Lienzo SVG */}
      <div className="relative w-full aspect-[4/3] max-h-[500px] bg-[radial-gradient(#8881_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center overflow-hidden cursor-crosshair">
        {/* Rosa de los vientos / Norte topográfico */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-center bg-card/80 border border-border/60 px-2 py-1.5 rounded-xl shadow-sm backdrop-blur-sm pointer-events-none">
          <div className="text-[10px] font-bold text-primary font-mono leading-none mb-0.5">N</div>
          <svg className="w-5 h-7 text-primary" viewBox="0 0 24 36" fill="currentColor">
            <polygon points="12,0 20,24 12,18" className="fill-primary" />
            <polygon points="12,0 4,24 12,18" className="fill-secondary/60" />
            <polygon points="12,18 20,24 12,36 4,24" className="fill-muted-foreground/30" />
          </svg>
        </div>

        {/* Badge de Área en esquina inferior izquierda */}
        <div className="absolute bottom-4 left-4 z-20 bg-card/90 border border-border/80 px-3 py-2 rounded-xl shadow-md backdrop-blur-sm pointer-events-none space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
            Área Calculada (Gauss)
          </span>
          <div className="text-sm font-extrabold text-foreground font-mono">
            {areaM2.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²
          </div>
          <div className="text-[11px] font-semibold text-secondary">
            {areaHa.toFixed(4)} ha • {(areaM2 / 6400).toFixed(4)} Fanegadas
          </div>
        </div>

        <svg
          className="w-full h-full select-none"
          viewBox={`0 0 ${width} ${height}`}
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: "center center",
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* Definiciones de gradientes y estilos */}
          <defs>
            <radialGradient id="polyGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.08" />
            </radialGradient>
            <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" floodColor="var(--secondary)" />
            </filter>
          </defs>

          {/* Grilla métrica */}
          {showGrid && (
            <g className="opacity-25 pointer-events-none">
              {gridLines.vLines.map((line, idx) => (
                <g key={`vline-${idx}`}>
                  <line
                    x1={line.x}
                    y1={0}
                    x2={line.x}
                    y2={height}
                    stroke="currentColor"
                    strokeDasharray="4 4"
                    strokeWidth="0.8"
                    className="text-muted-foreground"
                  />
                  <text
                    x={line.x + 3}
                    y={height - 8}
                    fontSize="9"
                    className="fill-muted-foreground font-mono"
                  >
                    {line.label}
                  </text>
                </g>
              ))}
              {gridLines.hLines.map((line, idx) => (
                <g key={`hline-${idx}`}>
                  <line
                    x1={0}
                    y1={line.y}
                    x2={width}
                    y2={line.y}
                    stroke="currentColor"
                    strokeDasharray="4 4"
                    strokeWidth="0.8"
                    className="text-muted-foreground"
                  />
                  <text
                    x={8}
                    y={line.y - 3}
                    fontSize="9"
                    className="fill-muted-foreground font-mono"
                  >
                    {line.label}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* Relleno del polígono */}
          <polygon
            points={polygonPoints}
            fill="url(#polyGradient)"
            stroke="var(--secondary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            filter="url(#shadowGlow)"
          />

          {/* Segmentos y Rótulos de Distancias/Rumbos */}
          {sides.map((side, idx) => {
            const p1 = toSvgCoords(side.startPoint.north, side.startPoint.east)
            const p2 = toSvgCoords(side.endPoint.north, side.endPoint.east)
            const midX = (p1.x + p2.x) / 2
            const midY = (p1.y + p2.y) / 2

            // Ángulo para alinear el texto con la línea
            const angleRad = Math.atan2(p2.y - p1.y, p2.x - p1.x)
            let angleDeg = (angleRad * 180) / Math.PI
            if (angleDeg > 90 || angleDeg < -90) {
              angleDeg += 180
            }

            return (
              <g key={`side-${idx}`}>
                {/* Rótulo de distancia en punto medio */}
                {showDistances && (
                  <g transform={`translate(${midX}, ${midY}) rotate(${angleDeg})`}>
                    <rect
                      x="-38"
                      y="-11"
                      width="76"
                      height="15"
                      rx="4"
                      fill="var(--card)"
                      stroke="var(--border)"
                      strokeWidth="0.8"
                      opacity="0.9"
                    />
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="9"
                      fontWeight="700"
                      className="fill-foreground font-mono"
                    >
                      {side.distance.toFixed(1)}m
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Marcador del Centroide */}
          {showCentroid && (
            <g transform={`translate(${centroidSvg.x}, ${centroidSvg.y})`}>
              <circle r="4" fill="var(--primary)" opacity="0.8" />
              <circle r="8" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2" />
              <text
                x="10"
                y="3"
                fontSize="9"
                fontWeight="700"
                className="fill-primary font-mono"
              >
                Centroide
              </text>
            </g>
          )}

          {/* Nodos de Vértices */}
          {vertices.map((v, idx) => {
            const { x, y } = toSvgCoords(v.north, v.east)
            return (
              <g key={`vert-${idx}`} transform={`translate(${x}, ${y})`}>
                {/* Círculo del punto */}
                <circle r="7" fill="var(--card)" stroke="var(--primary)" strokeWidth="2.5" />
                <circle r="3" fill="var(--secondary)" />

                {/* Etiqueta del vértice con cota Z */}
                <g transform="translate(10, -8)">
                  <rect
                    x="-2"
                    y="-10"
                    width={showElevations ? "75" : "30"}
                    height="18"
                    rx="4"
                    fill="var(--card)"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                    opacity="0.95"
                  />
                  <text
                    x="2"
                    y="3"
                    fontSize="10"
                    fontWeight="800"
                    className="fill-foreground font-mono"
                  >
                    {v.name}
                  </text>
                  {showElevations && (
                    <text
                      x="24"
                      y="3"
                      fontSize="8"
                      fontWeight="600"
                      className="fill-muted-foreground font-mono"
                    >
                      Z={v.elevation.toFixed(1)}m
                    </text>
                  )}
                </g>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Pie de lienzo con resumen dimensional */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2.5 bg-muted/20 border-t border-border/60 text-xs text-muted-foreground">
        <div>
          <span className="font-semibold text-foreground">Extensión:</span> ΔE = {deltaE.toFixed(1)}m | ΔN = {deltaN.toFixed(1)}m
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span>Min E: {bounds.minE.toFixed(1)}</span>
          <span>•</span>
          <span>Min N: {bounds.minN.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
