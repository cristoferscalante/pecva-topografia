import fs from "node:fs"
import path from "node:path"
import type { BlogPost } from "@/lib/blog-shared"

const blogDirectory = path.join(process.cwd(), "content", "blog")

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    return { data: {} as Record<string, string | string[]>, content: raw.trim() }
  }

  const [, frontmatterBlock, content] = match
  const data: Record<string, string | string[]> = {}
  let currentArrayKey: string | null = null

  for (const line of frontmatterBlock.split("\n")) {
    if (!line.trim()) {
      continue
    }

    if (line.startsWith("  - ") || line.startsWith("- ")) {
      if (currentArrayKey) {
        const value = line.replace(/^\s*-\s*/, "").trim()
        const currentValue = data[currentArrayKey]
        if (Array.isArray(currentValue)) {
          currentValue.push(value)
        } else {
          data[currentArrayKey] = [value]
        }
      }
      continue
    }

    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()

    if (!rawValue) {
      currentArrayKey = key
      data[key] = []
      continue
    }

    currentArrayKey = null
    data[key] = rawValue.replace(/^["']|["']$/g, "")
  }

  return { data, content: content.trim() }
}

export function getAllBlogPosts(): BlogPost[] {
  const filenames = fs
    .readdirSync(blogDirectory)
    .filter((filename) => filename.endsWith(".md"))

  return filenames
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(blogDirectory, filename), "utf8")
      const { data, content } = parseFrontmatter(raw)

      return {
        slug,
        title: String(data.title || ""),
        excerpt: String(data.excerpt || ""),
        category: String(data.category || ""),
        author: String(data.author || ""),
        publishedAt: String(data.publishedAt || ""),
        readTime: String(data.readTime || ""),
        image: String(data.image || ""),
        seoDescription: String(data.seoDescription || ""),
        keywords: Array.isArray(data.keywords) ? data.keywords : [],
        relatedServiceSlugs: Array.isArray(data.relatedServiceSlugs)
          ? data.relatedServiceSlugs
          : [],
        content,
      }
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getBlogPostBySlug(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug)
}
