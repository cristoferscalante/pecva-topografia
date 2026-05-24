import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'TopoExpert | Servicios de Topografía Profesional en Colombia',
  description: 'Servicios de topografía profesional: levantamientos planimétricos, altimétricos, desenglobes, fotogrametría con drones, batimetría y georreferenciación MAGNA-SIRGAS. +15 años de experiencia.',
  keywords: 'topografía, levantamiento topográfico, desengloble, engloble, fotogrametría, drones, batimetría, georreferenciación, MAGNA-SIRGAS, Colombia',
  generator: 'v0.app',
  openGraph: {
    title: 'TopoExpert | Servicios de Topografía Profesional',
    description: 'Levantamientos topográficos, fotogrametría con drones, batimetría y más. Precisión profesional para sus proyectos.',
    type: 'website',
    locale: 'es_CO',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
