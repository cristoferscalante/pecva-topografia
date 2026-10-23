"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useMemo, useState } from "react"
import { ArrowRight, Calendar, Clock3 } from "lucide-react"
import { type BlogPost, formatBlogDate, normalizeBlogCategory, BLOG_CATEGORIES } from "@/lib/blog-shared"

const PAGE_SIZE = 9

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const category = normalizeBlogCategory(post.category)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay: (index % PAGE_SIZE) * 0.03, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }}>
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/5 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-secondary/90 px-3 py-1.5 text-xs font-semibold text-secondary-foreground backdrop-blur-sm">
          {category.label}
        </span>
      </Link>

      <div className="flex flex-grow flex-col p-6">
        <h2 className="mb-2 text-lg font-semibold leading-snug text-foreground">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="mb-4 flex-grow text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatBlogDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 border-t border-border/60 pt-4 text-sm font-semibold text-primary transition-colors hover:text-secondary"
        >
          Leer artículo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  )
}

export function BlogCatalog({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("todos")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) {
      const id = normalizeBlogCategory(post.category).id
      counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    return counts
  }, [posts])

  const filtered = useMemo(() => {
    if (activeCategory === "todos") return posts
    return posts.filter((p) => normalizeBlogCategory(p.category).id === activeCategory)
  }, [posts, activeCategory])

  const visible = filtered.slice(0, visibleCount)

  function handleCategoryChange(id: string) {
    setActiveCategory(id)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {[{ id: "todos", label: `Todos (${posts.length})` }, ...BLOG_CATEGORIES.filter((c) => categoryCounts.get(c.id)).map((c) => ({ id: c.id, label: `${c.label} (${categoryCounts.get(c.id)})` }))].map(
          (cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="activeBlogCategory"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          )
        )}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleCount < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Cargar más artículos ({filtered.length - visibleCount} restantes)
          </button>
        </div>
      )}
    </div>
  )
}
