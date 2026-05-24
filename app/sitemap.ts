import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { getSiteUrl } from "@/lib/site-config"
import { servicesData } from "@/lib/services-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticRoutes = [
    "",
    "/servicios",
    "/blog",
    "/politica-de-privacidad",
    "/politica-de-cookies",
    "/terminos-y-condiciones",
  ]

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...servicesData.map((service) => ({
      url: `${siteUrl}/servicios/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...getAllBlogPosts().map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
