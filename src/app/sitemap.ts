import type { MetadataRoute } from 'next'
import { getCaseStudyProjects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ixra.tech'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const caseStudyPages: MetadataRoute.Sitemap = getCaseStudyProjects().map(
    (project) => ({
      url: `${baseUrl}/case-studies/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })
  )

  return [...staticPages, ...caseStudyPages]
}
