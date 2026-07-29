import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { getSiteUrl } from "@/lib/site-config"
import { servicesData } from "@/lib/services-data"
import { citiesData } from "@/lib/cities-data"

// Static pages last major update — update when content changes significantly
const SITE_UPDATED = new Date("2025-07-01")

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/servicios`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/nosotros`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/herramientas`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/politica-de-privacidad`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/politica-de-cookies`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terminos-y-condiciones`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${siteUrl}/servicios/${service.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  const cityRoutes: MetadataRoute.Sitemap = citiesData.map((city) => ({
    url: `${siteUrl}/topografia-en/${city.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes, ...blogRoutes]
}

