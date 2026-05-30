"use client"

import { FormEvent, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContourBackground } from "@/components/contour-background"
import { buildMailtoUrl, buildWhatsAppUrl, siteConfig } from "@/lib/site-config"
import { servicesData } from "@/lib/services-data"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Phone,
    label: "Telefono",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Ubicacion",
    value: "Bogota, Colombia",
    href: "/#contacto",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Vie: 8am - 6pm",
    href: "/#contacto",
  },
] as const

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
}

type ContactFormState = {
  name: string
  phone: string
  email: string
  service: string
  message: string
}

const initialFormState: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
}

export function ContactSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [formData, setFormData] = useState<ContactFormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedService = servicesData.find((service) => service.slug === formData.service)

  function updateField(field: keyof ContactFormState, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function buildLeadMessage() {
    return [
      "Hola, quiero solicitar informacion sobre un servicio de topografia.",
      `Nombre: ${formData.name}`,
      `Telefono: ${formData.phone}`,
      `Correo: ${formData.email}`,
      `Servicio: ${selectedService?.title || "No especificado"}`,
      `Proyecto: ${formData.message}`,
    ].join("\n")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (typeof window === "undefined") {
      return
    }

    setIsSubmitting(true)
    const toastId = toast.loading("Enviando tu solicitud de cotización por correo...")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("¡Solicitud enviada! Hemos enviado una confirmación a tu correo.", {
          id: toastId,
        })
        
        // Guardar copia del mensaje
        const message = buildLeadMessage()
        
        // Resetear formulario
        setFormData(initialFormState)

        // Redirigir a WhatsApp de forma complementaria después de 1.5 segundos
        setTimeout(() => {
          window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer")
        }, 1500)
      } else {
        throw new Error("SMTP send failed")
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      toast.error("El servidor de correo no respondió, pero abriremos WhatsApp para cotizar.", {
        id: toastId,
      })
      
      const message = buildLeadMessage()
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden bg-muted/30 py-24">
      <ContourBackground variant="subtle" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div ref={headerRef}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
            >
              Contactenos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl"
            >
              Listo para iniciar su{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                proyecto
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 text-lg leading-relaxed text-muted-foreground"
            >
              Nuestro equipo esta listo para ayudarte con tus necesidades topograficas. Cada
              solicitud sale con una estructura mas clara para responder mejor.
            </motion.p>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-card p-4"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10"
                    animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        hoveredCard === index ? "text-primary" : "text-secondary"
                      }`}
                    />
                  </motion.div>
                  <div className="relative z-10">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button
                asChild
                size="lg"
                className="group relative w-full overflow-hidden bg-[#25D366] text-white hover:bg-[#20BD5A] sm:w-auto"
              >
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.div>
                  Escribenos por WhatsApp

                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-xl"
            >
              <motion.div
                className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              <h3 className="relative z-10 mb-6 text-xl font-semibold text-foreground">
                Solicite una cotizacion
              </h3>

              <div className="relative z-10 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div animate={focusedField === "name" ? "focus" : ""} variants={inputVariants}>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Su nombre"
                    />
                  </motion.div>

                  <motion.div animate={focusedField === "phone" ? "focus" : ""} variants={inputVariants}>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="+57 300 000 0000"
                    />
                  </motion.div>
                </div>

                <motion.div animate={focusedField === "email" ? "focus" : ""} variants={inputVariants}>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="correo@ejemplo.com"
                  />
                </motion.div>

                <motion.div animate={focusedField === "service" ? "focus" : ""} variants={inputVariants}>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-foreground">
                    Servicio de interes
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={(event) => updateField("service", event.target.value)}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Seleccione un servicio</option>
                    {servicesData.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div animate={focusedField === "message" ? "focus" : ""} variants={inputVariants}>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    Descripcion del proyecto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Cuentenos sobre su proyecto..."
                  />
                </motion.div>

                <div className="rounded-xl border border-dashed border-secondary/30 bg-secondary/5 p-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-secondary" />
                    <p>
                      Puede mencionar area del predio, ubicacion, objetivo del estudio y fecha
                      estimada. Eso ayuda a responder con mas precision.
                    </p>
                  </div>
                </div>

                <p className="text-xs leading-6 text-muted-foreground">
                  Al enviar, abriremos WhatsApp con el resumen del proyecto y dejaremos un correo
                  listo como respaldo.
                </p>

                <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          Enviar solicitud
                        </>
                      )}
                    </span>

                    <motion.span
                      className="absolute inset-0 bg-secondary"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
