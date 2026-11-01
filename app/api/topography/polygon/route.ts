import { NextRequest, NextResponse } from "next/server";
import {
  computeBowditchTraverse,
  computeDirectCoordinatesTraverse,
  generateTraverseCsv,
  TraverseLegInput,
  DirectVertexInput,
  PolygonCalculationResult,
} from "@/lib/topography-calc";
import { generateAutoCAD_DXF } from "@/lib/dxf-generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, initialPoint, legs, vertices, projectName, action } = body;

    let result: PolygonCalculationResult;

    if (mode === "direct" && Array.isArray(vertices) && vertices.length >= 3) {
      result = computeDirectCoordinatesTraverse(vertices as DirectVertexInput[]);
    } else if (Array.isArray(legs) && legs.length >= 3) {
      const initPt = initialPoint || {
        name: "P1",
        north: 2000000.0,
        east: 5000000.0,
        elevation: 1000.0,
      };
      result = computeBowditchTraverse(initPt, legs as TraverseLegInput[]);
    } else {
      return NextResponse.json(
        { error: "Se requieren al menos 3 lados o vértices para procesar la poligonal." },
        { status: 400 }
      );
    }

    const dxfContent = generateAutoCAD_DXF(result, {
      projectName: projectName || "LEVANTAMIENTO PECVA",
      includeTable: true,
      includeDimensions: true,
    });

    const csvContent = generateTraverseCsv(result);

    // Si se solicita descarga directa de archivo con encabezados
    if (action === "download-dxf") {
      return new Response(dxfContent, {
        status: 200,
        headers: {
          "Content-Type": "application/dxf",
          "Content-Disposition": 'attachment; filename="poligonal_pecva.dxf"',
        },
      });
    }

    if (action === "download-csv") {
      return new Response(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="cartera_topografica_pecva.csv"',
        },
      });
    }

    // Respuesta JSON completa
    return NextResponse.json({
      success: true,
      data: result,
      dxf: dxfContent,
      csv: csvContent,
      metadata: {
        engine: "PECVA Topography Engine v2.0",
        geodesy: "MAGNA-SIRGAS CTM12 Compatible",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Error en API topography/polygon:", error);
    return NextResponse.json(
      { error: error?.message || "Ocurrió un error al calcular la poligonal topográfica." },
      { status: 500 }
    );
  }
}
