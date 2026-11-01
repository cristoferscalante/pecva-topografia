/**
 * Generador de archivos AutoCAD DXF (Formato Universal ASCII R12 / AC1009)
 * Compatible con AutoCAD, Civil 3D, LibreCAD, QGIS, ArcGIS y BricsCAD.
 * PECVA Topografía (topografiapecva.com)
 */

import { PolygonCalculationResult } from "./topography-calc";

export interface DxfExportOptions {
  projectName?: string;
  surveyor?: string;
  includeTable?: boolean;
  includeDimensions?: boolean;
}

export function generateAutoCAD_DXF(
  result: PolygonCalculationResult,
  options: DxfExportOptions = {}
): string {
  const projectName = options.projectName || "LEVANTAMIENTO TOPOGRAFICO PECVA";
  const includeTable = options.includeTable !== false;
  const includeDimensions = options.includeDimensions !== false;

  const vertices = result.vertices;
  const sides = result.sides;
  const bounds = result.bounds;

  const width = Math.max(bounds.maxE - bounds.minE, 50);
  const height = Math.max(bounds.maxN - bounds.minN, 50);
  const maxDim = Math.max(width, height);

  // Escala de texto y marcadores proporcional al tamaño del predio
  const textHeight = Math.max(Number((maxDim * 0.02).toFixed(2)), 0.8);
  const circleRadius = Math.max(Number((maxDim * 0.012).toFixed(2)), 0.5);

  let dxf = "";

  // 1. HEADER SECTION
  dxf += "0\nSECTION\n2\nHEADER\n";
  dxf += "9\n$ACADVER\n1\nAC1009\n"; // DXF R12 universal
  dxf += "9\n$INSUNITS\n70\n6\n";     // Metros
  dxf += "0\nENDSEC\n";

  // 2. TABLES SECTION (Capas con colores estándar)
  dxf += "0\nSECTION\n2\nTABLES\n";
  dxf += "0\nTABLE\n2\nLAYER\n70\n5\n";

  // Capa 0
  dxf += "0\nLAYER\n2\n0\n70\n0\n62\n7\n6\nCONTINUOUS\n";
  // Capa PECVA_LINDERO (Verde - Color 3)
  dxf += "0\nLAYER\n2\nPECVA_LINDERO\n70\n0\n62\n3\n6\nCONTINUOUS\n";
  // Capa PECVA_VERTICES (Rojo - Color 1)
  dxf += "0\nLAYER\n2\nPECVA_VERTICES\n70\n0\n62\n1\n6\nCONTINUOUS\n";
  // Capa PECVA_ROTULOS (Amarillo - Color 2)
  dxf += "0\nLAYER\n2\nPECVA_ROTULOS\n70\n0\n62\n2\n6\nCONTINUOUS\n";
  // Capa PECVA_DISTANCIAS (Magenta - Color 6)
  dxf += "0\nLAYER\n2\nPECVA_DISTANCIAS\n70\n0\n62\n6\n6\nCONTINUOUS\n";
  // Capa PECVA_CUADRO_CONSTRUCCION (Cyan - Color 4)
  dxf += "0\nLAYER\n2\nPECVA_CUADRO_CONSTRUCCION\n70\n0\n62\n4\n6\nCONTINUOUS\n";

  dxf += "0\nENDTAB\n";
  dxf += "0\nENDSEC\n";

  // 3. ENTITIES SECTION
  dxf += "0\nSECTION\n2\nENTITIES\n";

  // A. POLILÍNEA CERRADA DEL LINDERO (X = Este, Y = Norte, Z = Cota)
  dxf += "0\nPOLYLINE\n";
  dxf += "8\nPECVA_LINDERO\n";
  dxf += "66\n1\n";      // Indica que siguen entidades VERTEX
  dxf += "70\n1\n";      // Polilínea cerrada flag = 1
  dxf += "10\n0.0\n20\n0.0\n30\n0.0\n";

  for (const v of vertices) {
    dxf += "0\nVERTEX\n";
    dxf += "8\nPECVA_LINDERO\n";
    dxf += `10\n${v.east.toFixed(4)}\n`;
    dxf += `20\n${v.north.toFixed(4)}\n`;
    dxf += `30\n${v.elevation.toFixed(4)}\n`;
  }

  dxf += "0\nSEQEND\n";

  // B. VÉRTICES (Círculos y Rótulos con Nombre y Cota)
  for (const v of vertices) {
    // Círculo en vértice
    dxf += "0\nCIRCLE\n";
    dxf += "8\nPECVA_VERTICES\n";
    dxf += `10\n${v.east.toFixed(4)}\n`;
    dxf += `20\n${v.north.toFixed(4)}\n`;
    dxf += `30\n${v.elevation.toFixed(4)}\n`;
    dxf += `40\n${circleRadius}\n`;

    // Texto con nombre del vértice y cota
    const textOffset = circleRadius * 1.5;
    dxf += "0\nTEXT\n";
    dxf += "8\nPECVA_ROTULOS\n";
    dxf += `10\n${(v.east + textOffset).toFixed(4)}\n`;
    dxf += `20\n${(v.north + textOffset).toFixed(4)}\n`;
    dxf += `30\n${v.elevation.toFixed(4)}\n`;
    dxf += `40\n${textHeight}\n`;
    dxf += `1\n${v.name} (Z=${v.elevation.toFixed(2)}m)\n`;
  }

  // C. RÓTULOS DE DISTANCIA Y RUMBO EN CADA LADO
  if (includeDimensions) {
    for (const side of sides) {
      const midE = (side.startPoint.east + side.endPoint.east) / 2.0;
      const midN = (side.startPoint.north + side.endPoint.north) / 2.0;
      const midZ = (side.startPoint.elevation + side.endPoint.elevation) / 2.0;

      // Ángulo de inclinación del texto a lo largo de la línea
      const dE = side.endPoint.east - side.startPoint.east;
      const dN = side.endPoint.north - side.startPoint.north;
      let textAngle = (Math.atan2(dN, dE) * 180.0) / Math.PI;
      if (textAngle < 0) textAngle += 360;
      // Mantener texto legible de izquierda a derecha
      if (textAngle > 90 && textAngle <= 270) {
        textAngle = (textAngle + 180) % 360;
      }

      dxf += "0\nTEXT\n";
      dxf += "8\nPECVA_DISTANCIAS\n";
      dxf += `10\n${midE.toFixed(4)}\n`;
      dxf += `20\n${midN.toFixed(4)}\n`;
      dxf += `30\n${midZ.toFixed(4)}\n`;
      dxf += `40\n${(textHeight * 0.85).toFixed(2)}\n`;
      dxf += `50\n${textAngle.toFixed(2)}\n`;
      dxf += `1\nD=${side.distance.toFixed(2)}m | ${side.bearing}\n`;
    }
  }

  // D. CUADRO DE CONSTRUCCIÓN TOPOGRÁFICO EN MODEL SPACE
  if (includeTable) {
    const tableOriginE = bounds.maxE + width * 0.15;
    const tableOriginN = bounds.maxN;
    const rowHeight = textHeight * 2.5;
    const colWidths = [
      textHeight * 6,  // EST-PV
      textHeight * 12, // RUMBO
      textHeight * 9,  // DIST (m)
      textHeight * 11, // NORTE
      textHeight * 11, // ESTE
      textHeight * 8,  // COTA (m)
    ];
    const totalTableWidth = colWidths.reduce((a, b) => a + b, 0);

    // Título de la Tabla
    dxf += "0\nTEXT\n";
    dxf += "8\nPECVA_CUADRO_CONSTRUCCION\n";
    dxf += `10\n${tableOriginE.toFixed(4)}\n`;
    dxf += `20\n${(tableOriginN + rowHeight * 1.5).toFixed(4)}\n`;
    dxf += `30\n0.0\n`;
    dxf += `40\n${(textHeight * 1.3).toFixed(2)}\n`;
    dxf += `1\nCUADRO DE CONSTRUCCION - ${projectName}\n`;

    // Subtítulo PECVA
    dxf += "0\nTEXT\n";
    dxf += "8\nPECVA_CUADRO_CONSTRUCCION\n";
    dxf += `10\n${tableOriginE.toFixed(4)}\n`;
    dxf += `20\n${(tableOriginN + rowHeight * 0.6).toFixed(4)}\n`;
    dxf += `30\n0.0\n`;
    dxf += `40\n${(textHeight * 0.8).toFixed(2)}\n`;
    dxf += `1\nPECVA Topografia Profesional (topografiapecva.com) - MAGNA-SIRGAS\n`;

    // Encabezados de Columna
    const colHeaders = ["EST-PV", "RUMBO", "DISTANCIA", "NORTE", "ESTE", "COTA"];
    let currColE = tableOriginE;
    for (let c = 0; c < colHeaders.length; c++) {
      dxf += "0\nTEXT\n";
      dxf += "8\nPECVA_CUADRO_CONSTRUCCION\n";
      dxf += `10\n${(currColE + textHeight * 0.5).toFixed(4)}\n`;
      dxf += `20\n${(tableOriginN - rowHeight * 0.7).toFixed(4)}\n`;
      dxf += `30\n0.0\n`;
      dxf += `40\n${textHeight.toFixed(2)}\n`;
      dxf += `1\n${colHeaders[c]}\n`;
      currColE += colWidths[c];
    }

    // Línea separadora horizontal del encabezado
    dxf += "0\nLINE\n8\nPECVA_CUADRO_CONSTRUCCION\n";
    dxf += `10\n${tableOriginE.toFixed(4)}\n20\n${(tableOriginN - rowHeight).toFixed(4)}\n30\n0.0\n`;
    dxf += `11\n${(tableOriginE + totalTableWidth).toFixed(4)}\n21\n${(tableOriginN - rowHeight).toFixed(4)}\n31\n0.0\n`;

    // Filas de Datos
    let currRowN = tableOriginN - rowHeight * 1.8;
    for (const side of sides) {
      let cE = tableOriginE;

      const rowValues = [
        `${side.from}-${side.to}`,
        side.bearing,
        `${side.distance.toFixed(2)} m`,
        side.startPoint.north.toFixed(3),
        side.startPoint.east.toFixed(3),
        `${side.startPoint.elevation.toFixed(2)} m`,
      ];

      for (let c = 0; c < rowValues.length; c++) {
        dxf += "0\nTEXT\n";
        dxf += "8\nPECVA_CUADRO_CONSTRUCCION\n";
        dxf += `10\n${(cE + textHeight * 0.5).toFixed(4)}\n`;
        dxf += `20\n${currRowN.toFixed(4)}\n`;
        dxf += `30\n0.0\n`;
        dxf += `40\n${(textHeight * 0.9).toFixed(2)}\n`;
        dxf += `1\n${rowValues[c]}\n`;
        cE += colWidths[c];
      }

      currRowN -= rowHeight;
    }

    // Línea de Cierre de Tabla
    dxf += "0\nLINE\n8\nPECVA_CUADRO_CONSTRUCCION\n";
    dxf += `10\n${tableOriginE.toFixed(4)}\n20\n${currRowN.toFixed(4)}\n30\n0.0\n`;
    dxf += `11\n${(tableOriginE + totalTableWidth).toFixed(4)}\n21\n${currRowN.toFixed(4)}\n31\n0.0\n`;

    // Resumen Técnico (Área, Perímetro, Precisión)
    currRowN -= rowHeight * 1.2;
    const summaryLines = [
      `PERIMETRO TOTAL: ${result.totalPerimeter.toFixed(3)} m`,
      `AREA: ${result.areaM2.toLocaleString("es-CO", { minimumFractionDigits: 2 })} m2  |  ${result.areaHa.toFixed(4)} ha  |  ${result.areaFanegadas.toFixed(4)} Fanegadas`,
      `ERROR LINEAL: ${result.errorLinear.toFixed(4)} m  |  PRECISION: 1 : ${result.relativePrecision.toLocaleString()}`,
      `CALIFICACION: ${result.precisionRating.label}`,
    ];

    for (const line of summaryLines) {
      dxf += "0\nTEXT\n";
      dxf += "8\nPECVA_CUADRO_CONSTRUCCION\n";
      dxf += `10\n${tableOriginE.toFixed(4)}\n`;
      dxf += `20\n${currRowN.toFixed(4)}\n`;
      dxf += `30\n0.0\n`;
      dxf += `40\n${(textHeight * 0.95).toFixed(2)}\n`;
      dxf += `1\n${line}\n`;
      currRowN -= rowHeight * 1.1;
    }
  }

  // 4. END OF FILE
  dxf += "0\nENDSEC\n";
  dxf += "0\nEOF\n";

  return dxf;
}
