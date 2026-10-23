export type BlogFrontmatter = {
  title: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  image: string
  seoDescription: string
  keywords: string[]
  relatedServiceSlugs: string[]
}

export type BlogPost = BlogFrontmatter & {
  slug: string
  content: string
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}

export const BLOG_CATEGORIES: { id: string; label: string; match: string[] }[] = [
  { id: "catastro-legal", label: "Catastro y Legal", match: ["catastro y legal", "predial", "gestion predial", "gestión predial"] },
  { id: "obras-civiles", label: "Obras Civiles", match: ["obras civiles", "control de obra", "industrial"] },
  { id: "infraestructura", label: "Infraestructura", match: ["infraestructura", "infraestructura vial", "urbanismo"] },
  { id: "hidraulica", label: "Hidráulica", match: ["hidraulica", "hidráulica", "redes hidrosanitarias"] },
  { id: "energia-mineria", label: "Energía y Minería", match: ["energia", "energía", "energia y mineria", "energía y minería"] },
  { id: "tecnologia", label: "Tecnología", match: ["tecnologia", "tecnología", "tecnologia avanzada", "tecnología avanzada", "georreferenciacion", "georreferenciación", "drones"] },
]

export function normalizeBlogCategory(raw: string) {
  const needle = raw.trim().toLowerCase()
  return (
    BLOG_CATEGORIES.find((c) => c.match.some((m) => needle === m || needle.includes(m))) ?? {
      id: "general",
      label: raw,
      match: [],
    }
  )
}
