"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { siteConfig } from "@/lib/site-config"

export function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <motion.div
      className="fixed bottom-16 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
    >
      {/* Expanded chat preview */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-72 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">PECVA Topografía</p>
                <p className="text-white/80 text-xs">En línea</p>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="p-4 bg-[#ECE5DD]">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]"
              >
                <p className="text-sm text-foreground">
                  ¡Hola! 👋 ¿En qué podemos ayudarte con tu proyecto topográfico?
                </p>
                <p className="text-[10px] text-muted-foreground text-right mt-1">12:00</p>
              </motion.div>
            </div>
            
            {/* Action */}
            <div className="p-3 bg-card border-t border-border">
              <motion.a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-2.5 px-4 bg-[#25D366] text-white text-sm font-medium rounded-lg text-center hover:bg-[#20BD5A] transition-colors"
              >
                Iniciar conversación
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse rings */}
        <motion.span 
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ 
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
        <motion.span 
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ 
            scale: [1, 1.3, 1.3],
            opacity: [0.5, 0, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            delay: 0.3,
          }}
        />
        
        {/* Button */}
        <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow">
          <motion.div
            animate={isExpanded ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </motion.div>
          <motion.span 
            className="hidden sm:inline font-medium text-sm whitespace-nowrap overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ delay: 2, duration: 0.3 }}
          >
            {isExpanded ? "Cerrar" : "¿Necesita ayuda?"}
          </motion.span>
        </div>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isExpanded && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-foreground text-background text-xs whitespace-nowrap shadow-lg"
          >
            Escríbenos por WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
