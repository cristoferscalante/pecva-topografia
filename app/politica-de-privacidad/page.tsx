import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de Privacidad",
  description: "Politica de privacidad para el sitio web de AV Topografia y el manejo basico de datos de contacto.",
  alternates: {
    canonical: "/politica-de-privacidad",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">Politica de Privacidad</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Esta pagina describe de forma general como AV Topografia usa la informacion enviada
            por formularios, correo o canales de contacto del sitio.
          </p>
          <p>
            Los datos compartidos por los usuarios se utilizan para responder solicitudes,
            preparar propuestas comerciales y coordinar la prestacion de servicios tecnicos.
          </p>
          <p>
            Si desea actualizar o eliminar informacion enviada por este medio, puede escribir a
            contacto@avtopografia.co.
          </p>
        </div>
      </div>
    </main>
  )
}
