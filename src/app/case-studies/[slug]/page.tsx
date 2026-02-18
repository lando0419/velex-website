import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.metaTitle || `${project.title} | IXRA Case Study`,
    description: project.metaDescription || project.description,
    openGraph: {
      title: project.metaTitle || `${project.title} | IXRA Case Study`,
      description: project.metaDescription || project.description,
      url: `https://ixra.tech/case-studies/${slug}`,
      images: [
        { url: project.image, width: 1536, height: 1024, alt: project.title },
      ],
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project || !project.caseStudy) {
    notFound()
  }

  const { caseStudy } = project

  return (
    <>
      <article className="min-h-screen bg-void pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-titanium hover:text-ixra-blue transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Case Studies
          </Link>

          {/* Header */}
          <header className="mb-12">
            <span className="text-xs uppercase tracking-widest text-ixra-blue">
              {project.category}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl text-plasma-white mt-2 mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-titanium">{project.description}</p>

            {/* Stats bar */}
            {project.stats && (
              <div className="flex flex-wrap gap-6 mt-6 p-4 rounded-lg bg-titanium/5 border border-titanium/10">
                {Object.entries(project.stats).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-numbers text-lg text-ixra-blue">
                      {value}
                    </p>
                    <p className="text-xs text-titanium capitalize">{key}</p>
                  </div>
                ))}
              </div>
            )}
          </header>

          {/* Hero image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12 border border-titanium/20">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Case study sections */}
          <div className="space-y-12">
            <Section title="Problem" content={caseStudy.problem} />
            <Section title="Approach" content={caseStudy.approach} />
            <Section title="Simulation" content={caseStudy.simulation} />
            <Section title="Results" content={caseStudy.results} />
          </div>

          {/* Specifications table */}
          {caseStudy.specifications && (
            <div className="mt-12 p-6 rounded-xl bg-titanium/5 border border-titanium/10">
              <h2 className="font-headline text-2xl text-plasma-white mb-4">
                SPECIFICATIONS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(caseStudy.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-titanium/10"
                    >
                      <span className="text-titanium">{key}</span>
                      <span className="font-numbers text-plasma-white">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-8 rounded-xl border border-titanium/20">
            <h2 className="font-headline text-2xl text-plasma-white mb-3">
              NEED SOMETHING LIKE THIS?
            </h2>
            <p className="text-titanium mb-6">
              We design, simulate, and validate. Tell us what you&apos;re
              building.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3 bg-ixra-blue text-void font-medium rounded-lg hover:bg-electric-cyan transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </article>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: project.title,
            description: project.description,
            image: `https://ixra.tech${project.image}`,
            author: {
              '@type': 'Organization',
              name: 'IXRA Engineering',
              url: 'https://ixra.tech',
            },
            publisher: {
              '@type': 'Organization',
              name: 'IXRA Engineering',
              url: 'https://ixra.tech',
            },
          }),
        }}
      />
    </>
  )
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <section>
      <h2 className="font-headline text-2xl text-plasma-white mb-4">
        {title.toUpperCase()}
      </h2>
      <p className="text-titanium leading-relaxed">{content}</p>
    </section>
  )
}
