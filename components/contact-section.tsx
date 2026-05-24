"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContourBackground } from "@/components/contour-background"

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+57 300 123 4567",
    href: "tel:+573001234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@avtopografia.co",
    href: "mailto:contacto@avtopografia.co",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Bogotá, Colombia",
    href: "#",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Vie: 8am - 6pm",
    href: "#",
  },
]

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
}

export function ContactSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="contacto" className="relative py-24 bg-muted/30 overflow-hidden">
      <ContourBackground variant="subtle" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div ref={headerRef}>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-secondary/10 text-secondary border border-secondary/20"
            >
              Contáctenos
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
            >
              ¿Listo para iniciar su{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">proyecto</span>?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Nuestro equipo de expertos está listo para ayudarle con sus necesidades topográficas. 
              Contáctenos hoy para una cotización gratuita.
            </motion.p>

            {/* Contact Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border relative overflow-hidden"
                >
                  {/* Background glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center relative z-10"
                    animate={{ 
                      backgroundColor: hoveredCard === index ? "var(--secondary)" : "var(--secondary-alpha-10)",
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className={`w-5 h-5 transition-colors duration-300 ${hoveredCard === index ? "text-secondary-foreground" : "text-secondary"}`} />
                  </motion.div>
                  <div className="relative z-10">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-white relative overflow-hidden group"
              >
                <a 
                  href="https://wa.me/573001234567?text=Hola,%20me%20interesa%20solicitar%20información%20sobre%20sus%20servicios%20de%20topografía" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.div>
                  Escríbenos por WhatsApp
                  
                  {/* Shine effect */}
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

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <form className="p-8 rounded-2xl bg-card border border-border shadow-xl relative overflow-hidden">
              {/* Decorative corner */}
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <h3 className="text-xl font-semibold text-foreground mb-6 relative z-10">
                Solicite una cotización
              </h3>
              
              <div className="space-y-5 relative z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    animate={focusedField === "name" ? "focus" : ""}
                    variants={inputVariants}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="Su nombre"
                    />
                  </motion.div>
                  <motion.div
                    animate={focusedField === "phone" ? "focus" : ""}
                    variants={inputVariants}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="+57 300 000 0000"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  animate={focusedField === "email" ? "focus" : ""}
                  variants={inputVariants}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="correo@ejemplo.com"
                  />
                </motion.div>
                
                <motion.div
                  animate={focusedField === "service" ? "focus" : ""}
                  variants={inputVariants}
                >
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="levantamiento">Levantamiento Planimétrico y Altimétrico</option>
                    <option value="desengloble">Desenglobes y Englobes</option>
                    <option value="urbanismo">Topografía para Urbanismos</option>
                    <option value="hidro">Redes Hidro Sanitarias</option>
                    <option value="acueducto">Topografía para Acueductos</option>
                    <option value="vias">Topografía para Vías</option>
                    <option value="batimetria">Batimetría</option>
                    <option value="georeferenciacion">Georreferenciación MAGNA-SIRGAS</option>
                    <option value="fotogrametria">Fotogrametría con Drones</option>
                    <option value="comision">Acompañamiento de Comisiones</option>
                  </select>
                </motion.div>
                
                <motion.div
                  animate={focusedField === "message" ? "focus" : ""}
                  variants={inputVariants}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Descripción del proyecto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                    placeholder="Cuéntenos sobre su proyecto..."
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
                  >
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      Enviar solicitud
                    </span>
                    
                    {/* Animated background */}
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
