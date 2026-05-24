import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de Cookies",
  description: "Informacion general sobre el uso de cookies y herramientas de analitica en el sitio de AV Topografia.",
  alternates: {
    canonical: "/politica-de-cookies",
  },
}

export default function CookiesPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">Politica de Cookies</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Este sitio puede utilizar cookies tecnicas y herramientas de analitica para mejorar
            la experiencia de navegacion y entender que contenidos generan mas interes.
          </p>
          <p>
            La informacion recopilada se usa con fines operativos, estadisticos y de optimizacion del sitio.
          </p>
          <p>
            Si su organizacion exige un tratamiento particular de cookies, puede solicitar mayor
            detalle antes de usar formularios o canales de contacto.
          </p>
        </div>
      </div>
    </main>
  )
}
