/**
 * Geodesia MAGNA-SIRGAS Colombia
 * Proyección Oficial Origen Único Nacional CTM12 (Decreto IGAC 471 / 529 de 2020 - EPSG:9377)
 * y Orígenes Históricos Gauss-Krüger Colombia.
 */

export interface LatLon {
  lat: number; // Grados decimales (-90 a 90)
  lon: number; // Grados decimales (-180 a 180)
  elevation?: number;
}

export interface ProjectedCoord {
  north: number; // Metros
  east: number;  // Metros
  elevation?: number;
  originName: string;
}

// Parámetros Elipsoide GRS80 / WGS84
const GRS80 = {
  a: 6378137.0,              // Semieje mayor (m)
  f: 1.0 / 298.257222101,    // Aplanamiento
  get b() { return this.a * (1.0 - this.f); },
  get e2() { return 2.0 * this.f - this.f * this.f; },
  get ep2() { return (this.a * this.a - this.b * this.b) / (this.b * this.b); }
};

export interface ProjectionOrigin {
  name: string;
  code: string;
  lat0: number;   // Latitud de origen en grados decimales
  lon0: number;   // Longitud central en grados decimales
  k0: number;     // Factor de escala
  falseEast: number;
  falseNorth: number;
  description: string;
}

export const COLOMBIA_ORIGINS: Record<string, ProjectionOrigin> = {
  CTM12: {
    name: "MAGNA-SIRGAS / Origen Nacional CTM12 (EPSG:9377)",
    code: "CTM12",
    lat0: 4.0,
    lon0: -73.0,
    k0: 0.9992,
    falseEast: 5000000.0,
    falseNorth: 2000000.0,
    description: "Proyección cartográfica oficial única para toda la República de Colombia (IGAC 2020)."
  },
  BOGOTA: {
    name: "MAGNA-SIRGAS / Bogotá (EPSG:3116 - Histórico)",
    code: "BOGOTA",
    lat0: 4.59620041666667,
    lon0: -74.0775079166667,
    k0: 1.0,
    falseEast: 1000000.0,
    falseNorth: 1000000.0,
    description: "Origen central histórico Bogotá."
  },
  ESTE_CENTRAL: {
    name: "MAGNA-SIRGAS / Este Central (EPSG:3117 - Histórico)",
    code: "ESTE_CENTRAL",
    lat0: 4.59620041666667,
    lon0: -71.0775079166667,
    k0: 1.0,
    falseEast: 1000000.0,
    falseNorth: 1000000.0,
    description: "Origen Este-Central histórico para Meta, Casanare, Guaviare."
  },
  OESTE: {
    name: "MAGNA-SIRGAS / Oeste (EPSG:3115 - Histórico)",
    code: "OESTE",
    lat0: 4.59620041666667,
    lon0: -77.0775079166667,
    k0: 1.0,
    falseEast: 1000000.0,
    falseNorth: 1000000.0,
    description: "Origen Oeste histórico para Valle, Cauca, Nariño, Chocó."
  }
};

/**
 * Distancia del meridiano (arco de meridiano) desde el ecuador hasta la latitud phi
 */
function meridianDistance(phi: number, a: number, e2: number): number {
  const e4 = e2 * e2;
  const e6 = e4 * e2;
  const A = 1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256;
  const B = (3 * e2) / 8 + (3 * e4) / 32 + (45 * e6) / 1024;
  const C = (15 * e4) / 256 + (45 * e6) / 1024;
  const D = (35 * e6) / 3072;
  return a * (A * phi - B * Math.sin(2 * phi) + C * Math.sin(4 * phi) - D * Math.sin(6 * phi));
}

/**
 * Convierte Latitud/Longitud (WGS84 / MAGNA-SIRGAS) a coordenadas proyectadas Transverse Mercator
 */
export function latLonToProjected(
  lat: number,
  lon: number,
  originKey: keyof typeof COLOMBIA_ORIGINS = "CTM12"
): { north: number; east: number } {
  const origin = COLOMBIA_ORIGINS[originKey] || COLOMBIA_ORIGINS.CTM12;
  const a = GRS80.a;
  const e2 = GRS80.e2;
  const ep2 = GRS80.ep2;
  const k0 = origin.k0;

  const phi = (lat * Math.PI) / 180.0;
  const lambda = (lon * Math.PI) / 180.0;
  const phi0 = (origin.lat0 * Math.PI) / 180.0;
  const lambda0 = (origin.lon0 * Math.PI) / 180.0;

  const deltaLambda = lambda - lambda0;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const tanPhi = Math.tan(phi);

  const N = a / Math.sqrt(1 - e2 * sinPhi * sinPhi);
  const T = tanPhi * tanPhi;
  const C = ep2 * cosPhi * cosPhi;
  const A = deltaLambda * cosPhi;

  const M = meridianDistance(phi, a, e2);
  const M0 = meridianDistance(phi0, a, e2);

  const A2 = A * A;
  const A3 = A2 * A;
  const A4 = A2 * A2;
  const A5 = A4 * A;
  const A6 = A3 * A3;

  // Cálculo de Este (X)
  const x = k0 * N * (
    A +
    ((1 - T + C) * A3) / 6.0 +
    ((5 - 18 * T + T * T + 72 * C - 58 * ep2) * A5) / 120.0
  );
  const east = origin.falseEast + x;

  // Cálculo de Norte (Y)
  const y = k0 * (
    M - M0 +
    N * tanPhi * (
      A2 / 2.0 +
      ((5 - T + 9 * C + 4 * C * C) * A4) / 24.0 +
      ((61 - 58 * T + T * T + 600 * C - 330 * ep2) * A6) / 720.0
    )
  );
  const north = origin.falseNorth + y;

  return {
    north: Number(north.toFixed(4)),
    east: Number(east.toFixed(4))
  };
}

/**
 * Convierte coordenadas proyectadas Transverse Mercator a Latitud/Longitud (WGS84 / MAGNA-SIRGAS)
 */
export function projectedToLatLon(
  north: number,
  east: number,
  originKey: keyof typeof COLOMBIA_ORIGINS = "CTM12"
): { lat: number; lon: number } {
  const origin = COLOMBIA_ORIGINS[originKey] || COLOMBIA_ORIGINS.CTM12;
  const a = GRS80.a;
  const e2 = GRS80.e2;
  const ep2 = GRS80.ep2;
  const k0 = origin.k0;

  const x = east - origin.falseEast;
  const y = north - origin.falseNorth;

  const phi0 = (origin.lat0 * Math.PI) / 180.0;
  const lambda0 = (origin.lon0 * Math.PI) / 180.0;
  const M0 = meridianDistance(phi0, a, e2);
  const M = M0 + y / k0;

  // Iteración para hallar la latitud de pie (footprint latitude phi1)
  const mu = M / (a * (1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * e2 * e2 * e2) / 256));
  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

  const phi1 = mu +
    ((3 * e1) / 2 - (27 * Math.pow(e1, 3)) / 32) * Math.sin(2 * mu) +
    ((21 * e1 * e1) / 16 - (55 * Math.pow(e1, 4)) / 32) * Math.sin(4 * mu) +
    ((151 * Math.pow(e1, 3)) / 96) * Math.sin(6 * mu) +
    ((1097 * Math.pow(e1, 4)) / 512) * Math.sin(8 * mu);

  const sinPhi1 = Math.sin(phi1);
  const cosPhi1 = Math.cos(phi1);
  const tanPhi1 = Math.tan(phi1);

  const N1 = a / Math.sqrt(1 - e2 * sinPhi1 * sinPhi1);
  const R1 = (a * (1 - e2)) / Math.pow(1 - e2 * sinPhi1 * sinPhi1, 1.5);
  const D = x / (N1 * k0);

  const T1 = tanPhi1 * tanPhi1;
  const C1 = ep2 * cosPhi1 * cosPhi1;

  const D2 = D * D;
  const D3 = D2 * D;
  const D4 = D2 * D2;
  const D5 = D4 * D;
  const D6 = D3 * D3;

  const latRad = phi1 - (N1 * tanPhi1 / R1) * (
    D2 / 2 -
    ((5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * ep2) * D4) / 24 +
    ((61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * ep2 - 3 * C1 * C1) * D6) / 720
  );

  const lonRad = lambda0 + (
    D -
    ((1 + 2 * T1 + C1) * D3) / 6 +
    ((5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * ep2 + 24 * T1 * T1) * D5) / 120
  ) / cosPhi1;

  return {
    lat: Number(((latRad * 180.0) / Math.PI).toFixed(8)),
    lon: Number(((lonRad * 180.0) / Math.PI).toFixed(8))
  };
}

/**
 * Genera un archivo KML de Google Earth a partir de puntos
 */
export function generateKml(
  points: Array<{ name: string; lat: number; lon: number; elevation?: number }>,
  title: string = "Levantamiento PECVA Topografía"
): string {
  const coordinatesString = points
    .map(p => `${p.lon},${p.lat},${p.elevation ?? 0}`)
    .join(" ");

  // Cerrar el polígono si tiene más de 2 puntos
  const closedCoords = points.length > 2
    ? `${coordinatesString} ${points[0].lon},${points[0].lat},${points[0].elevation ?? 0}`
    : coordinatesString;

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${title}</name>
    <description>Generado con el Sistema de Topografía Profesional PECVA (topografiapecva.com)</description>
    <Style id="polygonStyle">
      <LineStyle>
        <color>ff00aaff</color>
        <width>3</width>
      </LineStyle>
      <PolyStyle>
        <color>3300ff00</color>
      </PolyStyle>
    </Style>
    <Placemark>
      <name>${title} - Perímetro</name>
      <styleUrl>#polygonStyle</styleUrl>
      <Polygon>
        <extrude>1</extrude>
        <altitudeMode>relativeToGround</altitudeMode>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>${closedCoords}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
    ${points
      .map(
        (p, idx) => `
    <Placemark>
      <name>${p.name || `P${idx + 1}`}</name>
      <description>Cota: ${p.elevation ?? 0} m | Lat: ${p.lat} | Lon: ${p.lon}</description>
      <Point>
        <coordinates>${p.lon},${p.lat},${p.elevation ?? 0}</coordinates>
      </Point>
    </Placemark>`
      )
      .join("")}
  </Document>
</kml>`;
}
