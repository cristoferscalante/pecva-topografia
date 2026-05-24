import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terminos y Condiciones",
  description: "Condiciones generales de uso del sitio de AV Topografia y de la informacion publicada.",
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">Terminos y Condiciones</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            La informacion del sitio tiene proposito informativo y comercial. El alcance tecnico
            final de cada servicio se define en la propuesta o contrato correspondiente.
          </p>
          <p>
            Los tiempos, entregables y metodos de trabajo pueden variar segun ubicacion,
            condiciones de campo, requisitos del cliente y disponibilidad operativa.
          </p>
          <p>
            Ningun contenido del sitio reemplaza la revision tecnica o juridica especifica que
            cada proyecto pueda requerir.
          </p>
        </div>
      </div>
    </main>
  )
}
