"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Youtube, ArrowUpRight, Mail } from "lucide-react"

const footerLinks = {
  servicios: [
    { label: "Levantamientos Topográficos", href: "#servicios" },
    { label: "Desenglobes y Englobes", href: "#servicios" },
    { label: "Fotogrametría con Drones", href: "#servicios" },
    { label: "Batimetría", href: "#servicios" },
    { label: "Georreferenciación", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Nuestro Equipo", href: "#" },
    { label: "Proyectos", href: "#blog" },
    { label: "Blog", href: "#blog" },
    { label: "Contacto", href: "#contacto" },
  ],
  legal: [
    { label: "Términos y Condiciones", href: "#" },
    { label: "Política de Privacidad", href: "#" },
    { label: "Política de Cookies", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

function FooterLink({ href, children, index }: { href: string, children: React.ReactNode, index: number }) {
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
        className="text-sm text-background/70 hover:text-secondary transition-colors flex items-center gap-1 group"
      >
        <motion.span
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight className="w-3 h-3 text-secondary" />
        </motion.span>
      </Link>
    </motion.li>
  )
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)

  return (
    <footer ref={ref} className="bg-foreground text-background relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-background"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-background"
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <motion.div 
                className="relative w-14 h-14 overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-sx28B0vKkoAJIUFVaOYeFTJds05gYw.png"
                  alt="AV Topografía Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-background leading-tight group-hover:text-secondary transition-colors">AV Topografía</span>
                <span className="text-xs text-background/60">Topografía Profesional</span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Más de 15 años brindando servicios topográficos de alta precisión 
              para proyectos de ingeniería y construcción en Colombia.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  onHoverStart={() => setHoveredSocial(index)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center transition-colors relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-secondary"
                    initial={{ y: "100%" }}
                    animate={{ y: hoveredSocial === index ? "0%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-background mb-6 flex items-center gap-2">
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
                <FooterLink key={index} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-background mb-6 flex items-center gap-2">
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
                <FooterLink key={index} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Legal Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-background mb-6 flex items-center gap-2">
              Newsletter
              <motion.span 
                className="h-px flex-1 bg-background/20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ originX: 0 }}
              />
            </h4>
            <p className="text-sm text-background/70 mb-4">
              Suscríbete para recibir noticias y actualizaciones.
            </p>
            <motion.form 
              className="flex gap-2 mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 text-sm focus:outline-none focus:border-secondary transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary text-secondary-foreground"
              >
                <Mail className="w-5 h-5" />
              </motion.button>
            </motion.form>

            <h4 className="font-semibold text-background mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <FooterLink key={index} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className="border-t border-background/10 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} AV Topografía. Todos los derechos reservados.
            </p>
            <motion.p 
              className="text-sm text-background/60 flex items-center gap-2"
              whileHover={{ color: "var(--secondary)" }}
            >
              Diseñado y desarrollado con precisión topográfica
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ⊹
              </motion.span>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
