"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatBlogDate, type BlogPost } from "@/lib/blog-shared"

function BlogCard({
  post,
  featured = false,
  index = 0,
}: {
  post: BlogPost
  featured?: boolean
  index?: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block">
        <motion.article
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent"
              animate={{ opacity: isHovered ? 0.95 : 0.75 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute left-4 top-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground backdrop-blur-sm">
                {post.category}
              </span>
            </motion.div>
            <motion.div
              className="absolute right-4 top-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                Destacado
              </span>
            </motion.div>
            <motion.div
              className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-card/90 opacity-0 backdrop-blur-sm group-hover:opacity-100"
              animate={{ y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-5 w-5 text-secondary" />
            </motion.div>
          </div>

          <div className="p-6">
            <motion.h3
              className="mb-3 line-clamp-2 text-xl font-bold text-foreground"
              animate={{ color: isHovered ? "var(--primary)" : "var(--foreground)" }}
              transition={{ duration: 0.3 }}
            >
              {post.title}
            </motion.h3>
            <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatBlogDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <motion.article
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ x: 8 }}
        className="group relative flex gap-4 overflow-hidden rounded-xl border border-border bg-card p-4"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </motion.div>

        <div className="relative z-10 min-w-0 flex-1">
          <motion.span
            className="mb-2 inline-block rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
            animate={{
              backgroundColor: isHovered ? "var(--secondary)" : "var(--muted)",
              color: isHovered ? "var(--secondary-foreground)" : "var(--muted-foreground)",
            }}
            transition={{ duration: 0.3 }}
          >
            {post.category}
          </motion.span>
          <motion.h3
            className="mb-2 line-clamp-2 font-semibold text-foreground"
            animate={{ color: isHovered ? "var(--primary)" : "var(--foreground)" }}
          >
            {post.title}
          </motion.h3>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
        </div>

        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
          animate={{ x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="h-5 w-5 text-secondary" />
        </motion.div>
      </motion.article>
    </Link>
  )
}

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <section id="blog" className="relative overflow-hidden bg-background py-24">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(77,104,140,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(77,104,140,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div
          ref={headerRef}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              Blog y Recursos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 text-3xl font-bold text-foreground text-balance md:text-4xl"
            >
              Contenido que explica los{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                servicios
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground"
            >
              Publicamos guias y articulos tecnicos para ayudar a clientes, residentes e
              interventorias a entender mejor cada servicio.
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
              className="group self-start border-border hover:bg-muted md:self-auto"
            >
              <Link href="/blog" className="flex items-center gap-2">
                Ver todos los articulos
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="lg:sticky lg:top-28">
            {posts[0] ? <BlogCard post={posts[0]} featured /> : null}
          </div>
          <div className="space-y-6">
            {posts.slice(1, 4).map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
