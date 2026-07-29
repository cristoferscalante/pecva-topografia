import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { getSiteUrl, siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteConfig.legalName,
  title: {
    default: `${siteConfig.name} | Servicios de topografia en Colombia`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  category: "engineering",
  openGraph: {
    title: `${siteConfig.name} | Servicios de topografia en Colombia`,
    description: siteConfig.description,
    type: "website",
    locale: "es_CO",
    siteName: siteConfig.legalName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Topografia profesional`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Servicios de topografia`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <Toaster />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
