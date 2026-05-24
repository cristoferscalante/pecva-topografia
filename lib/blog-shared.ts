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
