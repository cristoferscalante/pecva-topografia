"use client"

import Image from "next/image"
import Link from "next/link"
import { FormEvent, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react"
import { buildMailtoUrl, siteConfig } from "@/lib/site-config"

const footerLinks = {
  servicios: [
    { label: "Levantamientos topograficos", href: "/servicios/levantamiento-planimetrico-altimetrico" },
    { label: "Desenglobes y englobes", href: "/servicios/desenglobes-y-englobes" },
    { label: "Fotogrametria con drones", href: "/servicios/fotogrametria-con-drones" },
    { label: "Batimetria", href: "/servicios/batimetria" },
    { label: "Georreferenciacion", href: "/servicios/georreferenciacion-magna-sirgas" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/#contacto" },
  ],
  legal: [
    { label: "Terminos y Condiciones", href: "/terminos-y-condiciones" },
    { label: "Politica de Privacidad", href: "/politica-de-privacidad" },
    { label: "Politica de Cookies", href: "/politica-de-cookies" },
  ],
} as const

const socialLinks = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
] as const

function FooterLink({
  href,
  children,
  index,
}: {
  href: string
  children: React.ReactNode
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex items-center gap-1 text-sm text-background/70 transition-colors hover:text-secondary"
      >
        <motion.span animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight className="h-3 w-3 text-secondary" />
        </motion.span>
      </Link>
    </motion.li>
  )
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)
  const [footerEmail, setFooterEmail] = useState("")

  function handleFooterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!footerEmail || typeof window === "undefined") {
      return
    }

    const body = [
      "Hola, quiero recibir informacion sobre sus servicios de topografia.",
      `Correo de contacto: ${footerEmail}`,
    ].join("\n")

    window.location.href = buildMailtoUrl("Solicitud de informacion", body)
  }

  return (
    <footer ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[#0B1520] to-[#04080D] border-t border-white/10 text-background">
      {/* Subtle animated topographic contour lines in footer background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="footerContour" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(76, 166, 73)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(77, 104, 140)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <motion.ellipse
            key={`fcontour-${i}`}
            cx="100"
            cy="350"
            rx={150 + i * 80}
            ry={100 + i * 60}
            fill="none"
            stroke="url(#footerContour)"
            strokeWidth="1.5"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 3, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "100px 350px" }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.ellipse
            key={`fcontour2-${i}`}
            cx="900"
            cy="50"
            rx={120 + i * 70}
            ry={80 + i * 50}
            fill="none"
            stroke="url(#footerContour)"
            strokeWidth="1.5"
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, -4, 0]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "900px 50px" }}
          />
        ))}
      </svg>

      <div className="container relative z-10 mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="group mb-6 flex items-center gap-3">
              <motion.div
                className="relative h-14 w-14 overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-sx28B0vKkoAJIUFVaOYeFTJds05gYw.png"
                  alt="AV Topografia Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-background transition-colors group-hover:text-secondary">
                  AV Topografia
                </span>
                <span className="text-xs text-background/60">Topografia Profesional</span>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-background/70">
              Servicios tecnicos de topografia para proyectos de ingenieria, predios, urbanismo y
              obra civil en Colombia.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  onHoverStart={() => setHoveredSocial(index)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-background/10 transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-secondary"
                    initial={{ y: "100%" }}
                    animate={{ y: hoveredSocial === index ? "0%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <social.icon className="relative z-10 h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-6 flex items-center gap-2 font-semibold text-background">
              Servicios
              <motion.span
                className="h-px flex-1 bg-background/20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ originX: 0 }}
              />
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <FooterLink key={link.href} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 flex items-center gap-2 font-semibold text-background">
              Empresa
              <motion.span
                className="h-px flex-1 bg-background/20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ originX: 0 }}
              />
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <FooterLink key={link.href} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 flex items-center gap-2 font-semibold text-background">
              Contacto
              <motion.span
                className="h-px flex-1 bg-background/20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ originX: 0 }}
              />
            </h4>
            <p className="mb-4 text-sm text-background/70">
              Reciba noticias del blog o escribanos para aclarar que servicio necesita.
            </p>
            <motion.form
              onSubmit={handleFooterSubmit}
              className="mb-8 flex gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                value={footerEmail}
                onChange={(event) => setFooterEmail(event.target.value)}
                required
                className="flex-1 rounded-lg border border-background/20 bg-background/10 px-4 py-2 text-sm text-background placeholder:text-background/50 transition-colors focus:border-secondary focus:outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-secondary p-2 text-secondary-foreground"
              >
                <Mail className="h-5 w-5" />
              </motion.button>
            </motion.form>

            <h4 className="mb-4 text-sm font-semibold text-background">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <FooterLink key={link.href} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 border-t border-background/10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-background/60">
              Copyright {new Date().getFullYear()} AV Topografia. Todos los derechos reservados.
            </p>
            <motion.p
              className="flex items-center gap-2 text-sm text-background/60"
              whileHover={{ color: "var(--secondary)" }}
            >
              Sitio optimizado para SEO, contenido tecnico y generacion de demanda
            </motion.p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
