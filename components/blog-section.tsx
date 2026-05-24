"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calendar, Clock, ArrowRight, User, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "La importancia de la georreferenciación MAGNA-SIRGAS en Colombia",
    excerpt: "Descubre por qué la red geodésica nacional es fundamental para la precisión de tus proyectos topográficos.",
    category: "Georreferenciación",
    author: "Ing. Carlos Rodríguez",
    date: "15 Mar 2024",
    readTime: "5 min",
    image: "/blog-1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Fotogrametría con drones: Revolución en levantamientos topográficos",
    excerpt: "Cómo la tecnología UAV está transformando la manera en que realizamos levantamientos de grandes áreas.",
    category: "Tecnología",
    author: "Ing. María González",
    date: "10 Mar 2024",
    readTime: "8 min",
    image: "/blog-2.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Guía completa para el desengloble de predios",
    excerpt: "Todo lo que necesitas saber sobre el proceso de desengloble, requisitos y documentación necesaria.",
    category: "Legal",
    author: "Ing. Pedro Martínez",
    date: "5 Mar 2024",
    readTime: "6 min",
    image: "/blog-3.jpg",
    featured: false,
  },
]

function BlogCard({ post, featured = false, index = 0 }: { post: typeof blogPosts[0], featured?: boolean, index?: number }) {
  const [isHovered, setIsHovered] = useState(false)

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative rounded-2xl overflow-hidden bg-card border border-border cursor-pointer"
      >
        {/* Image area with parallax effect */}
        <div className="aspect-[16/10] relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Animated patterns */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: isHovered 
                ? "radial-gradient(circle at 30% 50%, rgba(76,166,73,0.3) 0%, transparent 50%)"
                : "radial-gradient(circle at 30% 50%, rgba(76,166,73,0.15) 0%, transparent 50%)",
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Category badge */}
          <motion.div 
            className="absolute top-4 left-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground backdrop-blur-sm">
              {post.category}
            </span>
          </motion.div>
          
          {/* Featured badge */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground backdrop-blur-sm">
              Destacado
            </span>
          </motion.div>

          {/* Floating icon */}
          <motion.div 
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100"
            animate={{ y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-5 h-5 text-secondary" />
          </motion.div>
        </div>
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold text-foreground mb-3 line-clamp-2"
            animate={{ color: isHovered ? "var(--primary)" : "var(--foreground)" }}
            transition={{ duration: 0.3 }}
          >
            {post.title}
          </motion.h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border-2 border-secondary/50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ x: 8 }}
      className="group flex gap-4 p-4 rounded-xl bg-card border border-border cursor-pointer relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image placeholder */}
      <motion.div 
        className="w-28 h-28 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 overflow-hidden relative"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,166,73,0.2)_0%,transparent_70%)]" />
      </motion.div>
      
      <div className="flex-1 min-w-0 relative z-10">
        <motion.span 
          className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground mb-2"
          animate={{ backgroundColor: isHovered ? "var(--secondary)" : "var(--muted)" }}
          transition={{ duration: 0.3 }}
        >
          {post.category}
        </motion.span>
        <motion.h3 
          className="font-semibold text-foreground mb-2 line-clamp-2"
          animate={{ color: isHovered ? "var(--primary)" : "var(--foreground)" }}
        >
          {post.title}
        </motion.h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Arrow indicator */}
      <motion.div 
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        animate={{ x: isHovered ? 0 : -10 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight className="w-5 h-5 text-secondary" />
      </motion.div>
    </motion.article>
  )
}

export function BlogSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <section id="blog" className="relative py-24 bg-background overflow-hidden">
      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(77,104,140,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(77,104,140,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              Blog & Recursos
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
            >
              Mantente actualizado en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">topografía</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Artículos, guías y recursos para profesionales del sector topográfico y de la construcción.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              asChild 
              variant="outline" 
              className="self-start md:self-auto border-border hover:bg-muted group"
            >
              <Link href="/blog" className="flex items-center gap-2">
                Ver todos los artículos
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          <BlogCard post={blogPosts[0]} featured />

          {/* Other Posts */}
          <div className="space-y-6">
            {blogPosts.slice(1).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
