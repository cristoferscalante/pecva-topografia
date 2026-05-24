"use client"

import { motion } from "framer-motion"

interface ContourBackgroundProps {
  className?: string
  variant?: "hero" | "section" | "subtle"
}

export function ContourBackground({ className = "", variant = "section" }: ContourBackgroundProps) {
  const opacityMap = {
    hero: 0.2,
    section: 0.1,
    subtle: 0.06
  }

  const baseOpacity = opacityMap[variant]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating particles */}
      {variant === "hero" && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-secondary/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </>
      )}

      {/* Main topographic contour lines - SVG paths for realistic contours */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="contourGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(76, 166, 73)" stopOpacity={baseOpacity} />
            <stop offset="100%" stopColor="rgb(77, 104, 140)" stopOpacity={baseOpacity * 0.5} />
          </linearGradient>
          <linearGradient id="contourGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(77, 104, 140)" stopOpacity={baseOpacity} />
            <stop offset="100%" stopColor="rgb(90, 191, 86)" stopOpacity={baseOpacity * 0.5} />
          </linearGradient>
        </defs>

        {/* Animated contour paths */}
        {[...Array(8)].map((_, i) => (
          <motion.ellipse
            key={`contour-center-${i}`}
            cx="500"
            cy="500"
            rx={100 + i * 60}
            ry={80 + i * 50}
            fill="none"
            stroke={i % 2 === 0 ? "url(#contourGradient1)" : "url(#contourGradient2)"}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: baseOpacity * (1 - i * 0.08),
              rotate: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              pathLength: { duration: 2, delay: i * 0.2, ease: "easeOut" },
              opacity: { duration: 1, delay: i * 0.2 },
              rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ transformOrigin: "center" }}
          />
        ))}

        {/* Top-right contour group */}
        {[...Array(6)].map((_, i) => (
          <motion.ellipse
            key={`contour-tr-${i}`}
            cx="850"
            cy="150"
            rx={60 + i * 45}
            ry={50 + i * 35}
            fill="none"
            stroke="rgb(77, 104, 140)"
            strokeWidth={1}
            strokeOpacity={baseOpacity * (1 - i * 0.12)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: baseOpacity * (1 - i * 0.12),
            }}
            transition={{
              scale: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1, delay: i * 0.15 },
            }}
            style={{ transformOrigin: "850px 150px" }}
          />
        ))}

        {/* Bottom-left contour group */}
        {[...Array(5)].map((_, i) => (
          <motion.ellipse
            key={`contour-bl-${i}`}
            cx="150"
            cy="800"
            rx={70 + i * 55}
            ry={55 + i * 40}
            fill="none"
            stroke="rgb(90, 191, 86)"
            strokeWidth={1}
            strokeOpacity={baseOpacity * (1 - i * 0.15)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: baseOpacity * (1 - i * 0.15),
            }}
            transition={{
              scale: { duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
              opacity: { duration: 1, delay: i * 0.2 },
            }}
            style={{ transformOrigin: "150px 800px" }}
          />
        ))}
      </svg>

      {/* Gradient overlays */}
      {variant === "hero" && (
        <>
          <motion.div 
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-secondary/5 to-transparent"
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}
    </div>
  )
}
