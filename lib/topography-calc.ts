/**
 * Módulo de Cálculo Topográfico y Compensación de Poligonales
 * PECVA Topografía (topografiapecva.com)
 *
 * Incluye:
 * - Compensación por Método de la Brújula (Bowditch)
 * - Análisis y Cuadro de Construcción de Linderos
 * - Cálculo de Área por Coordenadas (Gauss / Shoelace)
 * - Rumbos, Azimuts, Pendientes y Desniveles
 * - Tolerancias y Precisión Relativa (1 : N)
 */

export interface TraverseLegInput {
  id: string;
  from: string;
  to: string;
  azimuthDeg: number;       // Azimut en grados decimales (0-360)
  distance: number;         // Distancia horizontal en metros
  deltaZ: number;           // Desnivel vertical en metros (Z_to - Z_from)
}

export interface DirectVertexInput {
  id: string;
  name: string;
  north: number;
  east: number;
  elevation: number;
}

export interface ComputedSide {
  index: number;
  from: string;
  to: string;
  azimuthDeg: number;
  azimuthDms: string;
  bearing: string;           // Rumbo cuadrantal (ej. "N 45° 20' 15\" E")
  distance: number;          // Distancia horizontal (m)
  slopeDistance: number;     // Distancia inclinada (m)
  deltaN_raw: number;
  deltaE_raw: number;
  corrN: number;             // Corrección Bowditch Norte
  corrE: number;             // Corrección Bowditch Este
  deltaN_corr: number;
  deltaE_corr: number;
  deltaZ: number;
  slopePercent: number;      // Pendiente en porcentaje (%)
  startPoint: { name: string; north: number; east: number; elevation: number };
  endPoint: { name: string; north: number; east: number; elevation: number };
}

export interface PolygonCalculationResult {
  isClosed: boolean;
  totalPerimeter: number;
  areaM2: number;
  areaHa: number;
  areaFanegadas: number;     // 1 Fanegada/Plaza colombiana = 6,400 m²
  areaAcres: number;
  errorN: number;
  errorE: number;
  errorLinear: number;
  relativePrecision: number; // Ej. 18500 para "1 : 18,500"
  precisionRating: {
    status: "excelente" | "buena" | "regular" | "tolerancia_excedida";
    label: string;
    description: string;
    color: string;
  };
  sides: ComputedSide[];
  vertices: Array<{ name: string; north: number; east: number; elevation: number }>;
  centroid: { north: number; east: number };
  bounds: { minN: number; maxN: number; minE: number; maxE: number };
}

/**
 * Convierte grados decimales a formato Grados, Minutos, Segundos (GMS)
 */
export function degToDms(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  const d = Math.floor(normalized);
  const minFloat = (normalized - d) * 60;
  const m = Math.floor(minFloat);
  const s = ((minFloat - m) * 60).toFixed(1);
  return `${d}° ${m}' ${s}"`;
}

/**
 * Parsea un texto de ángulo en múltiples formatos a grados decimales
 * Formatos aceptados: "45.5", "45 30 15", "45° 30' 15\"", "45-30-15"
 */
export function parseDmsToDeg(input: string | number): number {
  if (typeof input === "number") return isNaN(input) ? 0 : input;
  const str = input.trim();
  if (!str) return 0;

  // Si es un número decimal simple
  const num = parseFloat(str);
  if (!isNaN(num) && !str.includes(" ") && !str.includes("°") && !str.includes("'") && !str.includes("-")) {
    return num;
  }

  // Extraer partes numéricas
  const parts = str.match(/[-+]?\d*\.?\d+/g);
  if (!parts || parts.length === 0) return 0;

  const d = parseFloat(parts[0]) || 0;
  const m = parseFloat(parts[1]) || 0;
  const s = parseFloat(parts[2]) || 0;

  const sign = d < 0 || str.startsWith("-") ? -1 : 1;
  const absD = Math.abs(d);
  return sign * (absD + m / 60 + s / 3600);
}

/**
 * Convierte un Azimut (0° - 360°) a Rumbo Cuadrantal topográfico (N/S - Grados - E/W)
 */
export function azimuthToBearing(azimuthDeg: number): string {
  const az = ((azimuthDeg % 360) + 360) % 360;
  let prefix = "";
  let suffix = "";
  let angle = 0;

  if (az >= 0 && az <= 90) {
    prefix = "N";
    suffix = "E";
    angle = az;
  } else if (az > 90 && az <= 180) {
    prefix = "S";
    suffix = "E";
    angle = 180 - az;
  } else if (az > 180 && az <= 270) {
    prefix = "S";
    suffix = "W";
    angle = az - 180;
  } else {
    prefix = "N";
    suffix = "W";
    angle = 360 - az;
  }

  return `${prefix} ${degToDms(angle)} ${suffix}`;
}

/**
 * Calcula área de un polígono cerrado usando el método de Gauss / Cruces (Shoelace Formula)
 */
export function calculateShoelaceArea(points: Array<{ north: number; east: number }>): number {
  const n = points.length;
  if (n < 3) return 0;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    const current = points[i];
    const next = points[(i + 1) % n];
    sum += current.east * next.north - next.east * current.north;
  }

  return Math.abs(sum) / 2.0;
}

/**
 * Evalúa la precisión relativa del levantamiento según tolerancias de ingeniería y Catastro IGAC
 */
export function evaluatePrecision(relativeRatio: number): PolygonCalculationResult["precisionRating"] {
  if (relativeRatio >= 15000) {
    return {
      status: "excelente",
      label: "Excelente (Alta Precisión)",
      description: "Cumple con creces los estándares para redes geodésicas locales y obras civiles de precisión milimétrica.",
      color: "text-emerald-500"
    };
  } else if (relativeRatio >= 5000) {
    return {
      status: "buena",
      label: "Buena (Precisión Catastral IGAC)",
      description: "Apta para levantamientos prediales urbanos y rurales, deslindes y trámites notariales en Colombia.",
      color: "text-primary"
    };
  } else if (relativeRatio >= 2500) {
    return {
      status: "regular",
      label: "Aceptable (Límite Rural)",
      description: "Aceptable en levantamientos preliminares o terrenos rurales muy abruptos, pero se sugiere revisar estaciones.",
      color: "text-amber-500"
    };
  } else {
    return {
      status: "tolerancia_excedida",
      label: "Tolerancia Excedida",
      description: "El error de cierre supera la tolerancia técnica admisible. Se recomienda verificar lecturas angulares o distancias.",
      color: "text-rose-500"
    };
  }
}

/**
 * Flujo A: Compensación de Poligonal Cerrada por Método Bowditch (Regla de la Brújula)
 */
export function computeBowditchTraverse(
  initialPoint: { name: string; north: number; east: number; elevation: number },
  legs: TraverseLegInput[]
): PolygonCalculationResult {
  if (!legs || legs.length < 3) {
    throw new Error("Se requieren al menos 3 lados para una poligonal cerrada.");
  }

  const perimeter = legs.reduce((acc, leg) => acc + (leg.distance || 0), 0);
  if (perimeter <= 0) {
    throw new Error("El perímetro total de la poligonal debe ser mayor a cero.");
  }

  // 1. Proyecciones parciales sin corregir
  const rawSides = legs.map((leg, idx) => {
    const azRad = (leg.azimuthDeg * Math.PI) / 180.0;
    const deltaN = leg.distance * Math.cos(azRad);
    const deltaE = leg.distance * Math.sin(azRad);
    return {
      index: idx + 1,
      from: leg.from || `P${idx + 1}`,
      to: leg.to || `P${((idx + 1) % legs.length) + 1}`,
      azimuthDeg: leg.azimuthDeg,
      distance: leg.distance,
      deltaZ: leg.deltaZ || 0,
      deltaN,
      deltaE,
    };
  });

  // 2. Errores de cierre lineal
  const sumDeltaN = rawSides.reduce((acc, s) => acc + s.deltaN, 0);
  const sumDeltaE = rawSides.reduce((acc, s) => acc + s.deltaE, 0);
  const errorLinear = Math.sqrt(sumDeltaN * sumDeltaN + sumDeltaE * sumDeltaE);

  // Precisión relativa (1 : P/El)
  const relativePrecision = errorLinear > 0.000001
    ? Math.round(perimeter / errorLinear)
    : 999999;

  // 3. Compensación de Bowditch y acumulación de coordenadas
  let currentN = initialPoint.north;
  let currentE = initialPoint.east;
  let currentZ = initialPoint.elevation;

  const vertices: Array<{ name: string; north: number; east: number; elevation: number }> = [
    {
      name: initialPoint.name || "P1",
      north: currentN,
      east: currentE,
      elevation: currentZ,
    }
  ];

  const computedSides: ComputedSide[] = [];

  for (let i = 0; i < rawSides.length; i++) {
    const side = rawSides[i];
    const corrN = -sumDeltaN * (side.distance / perimeter);
    const corrE = -sumDeltaE * (side.distance / perimeter);
    const deltaN_corr = side.deltaN + corrN;
    const deltaE_corr = side.deltaE + corrE;

    const startPoint = {
      name: vertices[i].name,
      north: currentN,
      east: currentE,
      elevation: currentZ,
    };

    // Si es el último lado de una poligonal cerrada, el punto final es exactamente el inicial
    const isLast = i === rawSides.length - 1;
    const nextN = isLast ? initialPoint.north : currentN + deltaN_corr;
    const nextE = isLast ? initialPoint.east : currentE + deltaE_corr;
    const nextZ = currentZ + side.deltaZ;

    const endPoint = {
      name: isLast ? initialPoint.name : (side.to || `P${i + 2}`),
      north: nextN,
      east: nextE,
      elevation: nextZ,
    };

    if (!isLast) {
      vertices.push(endPoint);
    }

    const slopeDist = Math.sqrt(side.distance * side.distance + side.deltaZ * side.deltaZ);
    const slopePercent = side.distance > 0 ? (side.deltaZ / side.distance) * 100 : 0;

    computedSides.push({
      index: i + 1,
      from: startPoint.name,
      to: endPoint.name,
      azimuthDeg: side.azimuthDeg,
      azimuthDms: degToDms(side.azimuthDeg),
      bearing: azimuthToBearing(side.azimuthDeg),
      distance: Number(side.distance.toFixed(3)),
      slopeDistance: Number(slopeDist.toFixed(3)),
      deltaN_raw: Number(side.deltaN.toFixed(4)),
      deltaE_raw: Number(side.deltaE.toFixed(4)),
      corrN: Number(corrN.toFixed(4)),
      corrE: Number(corrE.toFixed(4)),
      deltaN_corr: Number(deltaN_corr.toFixed(4)),
      deltaE_corr: Number(deltaE_corr.toFixed(4)),
      deltaZ: Number(side.deltaZ.toFixed(3)),
      slopePercent: Number(slopePercent.toFixed(2)),
      startPoint,
      endPoint,
    });

    currentN = nextN;
    currentE = nextE;
    currentZ = nextZ;
  }

  // 4. Cálculo de Superficie por Gauss
  const areaM2 = calculateShoelaceArea(vertices);
  const areaHa = areaM2 / 10000.0;
  const areaFanegadas = areaM2 / 6400.0;
  const areaAcres = areaM2 / 4046.8564;

  // 5. Centroide y Bounding Box
  const norths = vertices.map(v => v.north);
  const easts = vertices.map(v => v.east);
  const minN = Math.min(...norths);
  const maxN = Math.max(...norths);
  const minE = Math.min(...easts);
  const maxE = Math.max(...easts);

  const centroid = {
    north: Number((norths.reduce((a, b) => a + b, 0) / vertices.length).toFixed(3)),
    east: Number((easts.reduce((a, b) => a + b, 0) / vertices.length).toFixed(3)),
  };

  return {
    isClosed: true,
    totalPerimeter: Number(perimeter.toFixed(3)),
    areaM2: Number(areaM2.toFixed(3)),
    areaHa: Number(areaHa.toFixed(4)),
    areaFanegadas: Number(areaFanegadas.toFixed(4)),
    areaAcres: Number(areaAcres.toFixed(4)),
    errorN: Number(sumDeltaN.toFixed(4)),
    errorE: Number(sumDeltaE.toFixed(4)),
    errorLinear: Number(errorLinear.toFixed(4)),
    relativePrecision,
    precisionRating: evaluatePrecision(relativePrecision),
    sides: computedSides,
    vertices,
    centroid,
    bounds: { minN, maxN, minE, maxE },
  };
}

/**
 * Flujo B: Análisis directo a partir de Coordenadas de Vértices (N, E, Z)
 */
export function computeDirectCoordinatesTraverse(
  verticesInput: DirectVertexInput[]
): PolygonCalculationResult {
  if (!verticesInput || verticesInput.length < 3) {
    throw new Error("Se requieren al menos 3 vértices para analizar una figura poligonal.");
  }

  const n = verticesInput.length;
  const computedSides: ComputedSide[] = [];
  let totalPerimeter = 0;

  for (let i = 0; i < n; i++) {
    const current = verticesInput[i];
    const next = verticesInput[(i + 1) % n];

    const dN = next.north - current.north;
    const dE = next.east - current.east;
    const dZ = next.elevation - current.elevation;

    const distHoriz = Math.sqrt(dN * dN + dE * dE);
    totalPerimeter += distHoriz;

    const slopeDist = Math.sqrt(distHoriz * distHoriz + dZ * dZ);
    const slopePercent = distHoriz > 0 ? (dZ / distHoriz) * 100 : 0;

    // Azimut de la línea
    let azRad = Math.atan2(dE, dN);
    let azDeg = (azRad * 180.0) / Math.PI;
    if (azDeg < 0) azDeg += 360.0;

    computedSides.push({
      index: i + 1,
      from: current.name || `P${i + 1}`,
      to: next.name || `P${((i + 1) % n) + 1}`,
      azimuthDeg: Number(azDeg.toFixed(4)),
      azimuthDms: degToDms(azDeg),
      bearing: azimuthToBearing(azDeg),
      distance: Number(distHoriz.toFixed(3)),
      slopeDistance: Number(slopeDist.toFixed(3)),
      deltaN_raw: Number(dN.toFixed(4)),
      deltaE_raw: Number(dE.toFixed(4)),
      corrN: 0,
      corrE: 0,
      deltaN_corr: Number(dN.toFixed(4)),
      deltaE_corr: Number(dE.toFixed(4)),
      deltaZ: Number(dZ.toFixed(3)),
      slopePercent: Number(slopePercent.toFixed(2)),
      startPoint: {
        name: current.name || `P${i + 1}`,
        north: current.north,
        east: current.east,
        elevation: current.elevation,
      },
      endPoint: {
        name: next.name || `P${((i + 1) % n) + 1}`,
        north: next.north,
        east: next.east,
        elevation: next.elevation,
      },
    });
  }

  const areaM2 = calculateShoelaceArea(verticesInput);
  const areaHa = areaM2 / 10000.0;
  const areaFanegadas = areaM2 / 6400.0;
  const areaAcres = areaM2 / 4046.8564;

  const norths = verticesInput.map(v => v.north);
  const easts = verticesInput.map(v => v.east);
  const minN = Math.min(...norths);
  const maxN = Math.max(...norths);
  const minE = Math.min(...easts);
  const maxE = Math.max(...easts);

  const centroid = {
    north: Number((norths.reduce((a, b) => a + b, 0) / verticesInput.length).toFixed(3)),
    east: Number((easts.reduce((a, b) => a + b, 0) / verticesInput.length).toFixed(3)),
  };

  return {
    isClosed: true,
    totalPerimeter: Number(totalPerimeter.toFixed(3)),
    areaM2: Number(areaM2.toFixed(3)),
    areaHa: Number(areaHa.toFixed(4)),
    areaFanegadas: Number(areaFanegadas.toFixed(4)),
    areaAcres: Number(areaAcres.toFixed(4)),
    errorN: 0,
    errorE: 0,
    errorLinear: 0,
    relativePrecision: 999999,
    precisionRating: {
      status: "excelente",
      label: "Polígono Cerrado Definido",
      description: "Coordenadas fijas geométricas calculadas directamente con cierre exacto 100%.",
      color: "text-emerald-500",
    },
    sides: computedSides,
    vertices: verticesInput.map(v => ({
      name: v.name,
      north: v.north,
      east: v.east,
      elevation: v.elevation,
    })),
    centroid,
    bounds: { minN, maxN, minE, maxE },
  };
}

/**
 * Genera el texto CSV exportable para Excel de la cartera topográfica
 */
export function generateTraverseCsv(result: PolygonCalculationResult): string {
  const headers = [
    "LADO",
    "ESTACION",
    "PV",
    "RUMBO",
    "AZIMUT",
    "DIST_HORIZ_M",
    "DELTA_NORTE_CORR",
    "DELTA_ESTE_CORR",
    "NORTE_VERTICE",
    "ESTE_VERTICE",
    "COTA_Z_M",
    "PENDIENTE_PORCENTAJE"
  ].join(",");

  const rows = result.sides.map(s => [
    `${s.from}-${s.to}`,
    s.from,
    s.to,
    `"${s.bearing}"`,
    `"${s.azimuthDms}"`,
    s.distance.toFixed(3),
    s.deltaN_corr.toFixed(4),
    s.deltaE_corr.toFixed(4),
    s.startPoint.north.toFixed(4),
    s.startPoint.east.toFixed(4),
    s.startPoint.elevation.toFixed(3),
    `${s.slopePercent.toFixed(2)}%`
  ].join(","));

  const summary = [
    "",
    "RESUMEN TECNICO PECVA TOPOGRAFIA",
    `Perimetro Total (m),${result.totalPerimeter.toFixed(3)}`,
    `Area (m2),${result.areaM2.toFixed(3)}`,
    `Area (Hectareas),${result.areaHa.toFixed(4)}`,
    `Area (Fanegadas / Plazas),${result.areaFanegadas.toFixed(4)}`,
    `Error Lineal (m),${result.errorLinear.toFixed(4)}`,
    `Precision Relativa,1 : ${result.relativePrecision.toLocaleString()}`,
    `Calificacion,${result.precisionRating.label}`
  ].join("\n");

  return `${headers}\n${rows.join("\n")}\n\n${summary}`;
}

/**
 * Ejemplos predefinidos para carga rápida con 1 click
 */
export const PRESETS_DATA = {
  ruralFinca: {
    name: "Predio Rural / Finca (5 Vértices)",
    description: "Levantamiento perimetral con estación total en terreno con topografía ondulada.",
    initialPoint: { name: "P1", north: 2000500.0, east: 5000200.0, elevation: 1820.5 },
    legs: [
      { id: "1", from: "P1", to: "P2", azimuthDeg: 42.5833, distance: 145.82, deltaZ: 4.25 },
      { id: "2", from: "P2", to: "P3", azimuthDeg: 128.3167, distance: 98.40, deltaZ: -2.10 },
      { id: "3", from: "P3", to: "P4", azimuthDeg: 195.7500, distance: 165.15, deltaZ: -7.80 },
      { id: "4", from: "P4", to: "P5", azimuthDeg: 260.4000, distance: 112.30, deltaZ: 1.95 },
      { id: "5", from: "P5", to: "P1", azimuthDeg: 341.2167, distance: 88.50, deltaZ: 3.70 },
    ],
    directVertices: [
      { id: "1", name: "P1", north: 2000500.0, east: 5000200.0, elevation: 1820.5 },
      { id: "2", name: "P2", north: 2000607.4, east: 5000298.7, elevation: 1824.75 },
      { id: "3", name: "P3", north: 2000546.4, east: 5000375.9, elevation: 1822.65 },
      { id: "4", name: "P4", north: 2000387.5, east: 5000331.1, elevation: 1814.85 },
      { id: "5", name: "P5", north: 2000368.8, east: 5000220.3, elevation: 1816.80 },
    ]
  },
  urbanoLote: {
    name: "Lote Urbano Residencial (4 Vértices)",
    description: "Levantamiento de alta precisión en zona urbana para desenglobe y licencia de construcción.",
    initialPoint: { name: "A", north: 2001000.0, east: 5000100.0, elevation: 2600.0 },
    legs: [
      { id: "1", from: "A", to: "B", azimuthDeg: 15.0000, distance: 25.00, deltaZ: 0.15 },
      { id: "2", from: "B", to: "C", azimuthDeg: 105.0000, distance: 40.00, deltaZ: -0.20 },
      { id: "3", from: "C", to: "D", azimuthDeg: 195.0000, distance: 25.00, deltaZ: -0.10 },
      { id: "4", from: "D", to: "A", azimuthDeg: 285.0000, distance: 40.00, deltaZ: 0.15 },
    ],
    directVertices: [
      { id: "1", name: "A", north: 2001000.0, east: 5000100.0, elevation: 2600.0 },
      { id: "2", name: "B", north: 2001024.15, east: 5000106.47, elevation: 2600.15 },
      { id: "3", name: "C", north: 2001013.80, east: 5000145.10, elevation: 2599.95 },
      { id: "4", name: "D", north: 2000989.65, east: 5000138.63, elevation: 2599.85 },
    ]
  },
  poligonalIngenieria: {
    name: "Poligonal Cerrada de Ingeniería (6 Vértices)",
    description: "Red de apoyo para proyecto de infraestructura vial y urbanismo.",
    initialPoint: { name: "E1", north: 2002000.0, east: 5001000.0, elevation: 1450.0 },
    legs: [
      { id: "1", from: "E1", to: "E2", azimuthDeg: 55.4500, distance: 85.30, deltaZ: 1.20 },
      { id: "2", from: "E2", to: "E3", azimuthDeg: 112.2000, distance: 120.45, deltaZ: 3.45 },
      { id: "3", from: "E3", to: "E4", azimuthDeg: 178.9000, distance: 95.80, deltaZ: -1.10 },
      { id: "4", from: "E4", to: "E5", azimuthDeg: 235.1000, distance: 110.15, deltaZ: -4.50 },
      { id: "5", from: "E5", to: "E6", azimuthDeg: 298.7500, distance: 75.60, deltaZ: -2.30 },
      { id: "6", from: "E6", to: "E1", azimuthDeg: 355.2000, distance: 88.70, deltaZ: 3.25 },
    ],
    directVertices: [
      { id: "1", name: "E1", north: 2002000.0, east: 5001000.0, elevation: 1450.0 },
      { id: "2", name: "E2", north: 2002048.4, east: 5001070.3, elevation: 1451.2 },
      { id: "3", name: "E3", north: 2002003.0, east: 5001181.8, elevation: 1454.65 },
      { id: "4", name: "E4", north: 2001907.2, east: 5001183.6, elevation: 1453.55 },
      { id: "5", name: "E5", north: 2001844.2, east: 5001093.3, elevation: 1449.05 },
      { id: "6", name: "E6", north: 2001880.6, east: 5001027.0, elevation: 1446.75 },
    ]
  }
};
