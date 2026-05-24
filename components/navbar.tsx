"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { section: "inicio", label: "Inicio", isPage: false },
  { section: "nosotros", label: "Nosotros", isPage: true },
  { section: "servicios", label: "Servicios", isPage: false },
  { section: "blog", label: "Blog", isPage: false },
  { section: "contacto", label: "Contacto", isPage: false },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(isHome ? "inicio" : pathname.replace("/", ""))
  const { scrollY } = useScroll()

  const resolvedLinks = useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        href: link.isPage
          ? `/${link.section}`
          : isHome
          ? `#${link.section}`
          : `/#${link.section}`,
      })),
    [isHome]
  )

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  useEffect(() => {
    if (!isHome) {
      if (pathname.startsWith("/servicios")) {
        setActiveSection("servicios")
      } else if (pathname.startsWith("/blog")) {
        setActiveSection("blog")
      } else if (pathname.startsWith("/nosotros")) {
        setActiveSection("nosotros")
      } else if (pathname.includes("politica") || pathname.includes("terminos")) {
        setActiveSection("")
      } else {
        setActiveSection("inicio")
      }
      return
    }

    const handleScroll = () => {
      const sections = navLinks.filter((link) => !link.isPage).map((link) => link.section)
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome, pathname])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? "border-b border-border/50 bg-card/90 shadow-lg backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              className="relative h-14 w-14 overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-Byc7z2G5QOHsXI7QXXZMouj9f1HqDM.png"
                alt="AV Topografia Logo"
                fill
                className="object-contain"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span
                className="text-lg font-bold leading-tight text-foreground"
                whileHover={{ color: "var(--primary)" }}
              >
                AV Topografia
              </motion.span>
              <span className="text-xs text-muted-foreground">Topografia Profesional</span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {resolvedLinks.map((link) => {
              const isActive = activeSection === link.section

              return (
                <Link key={link.section} href={link.href} className="relative px-4 py-2 text-sm font-medium transition-colors">
                  <motion.span
                    className={`relative z-10 ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                  {isActive ? (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-lg bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-0.5 origin-left bg-secondary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              )
            })}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="group relative overflow-hidden bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Link href={isHome ? "#contacto" : "/#contacto"} className="flex items-center gap-2">
                  <span className="relative z-10">Solicitar Cotizacion</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                  <motion.span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    whileHover={{ translateX: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.button
            className="relative p-2 text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border bg-card/95 backdrop-blur-xl md:hidden"
            >
              <div className="space-y-1 py-4">
                {resolvedLinks.map((link, index) => (
                  <motion.div
                    key={link.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-muted"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="px-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Link href={isHome ? "#contacto" : "/#contacto"} onClick={() => setIsMobileMenuOpen(false)}>
                      Solicitar Cotizacion
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
