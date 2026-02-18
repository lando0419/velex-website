import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PROJECTS } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Case Studies | IXRA Engineering',
  description:
    'Engineering case studies: FEA, CFD, topology optimization, and thermal simulation on real parts. See the process and results.',
  openGraph: {
    title: 'Case Studies | IXRA Engineering',
    description:
      'Real engineering projects with full simulation breakdowns.',
    url: 'https://ixra.tech/case-studies',
  },
}

export default function CaseStudiesPage() {
  const caseStudies = PROJECTS.filter((p) => p.caseStudy)
  const comingSoon = PROJECTS.filter((p) => !p.caseStudy)

  return (
    <main className="min-h-screen bg-void pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-6xl text-plasma-white mb-4">
            CASE <span className="text-ixra-blue">STUDIES</span>
          </h1>
          <p className="text-xl text-titanium max-w-2xl mx-auto">
            Engineering breakdowns of real projects. Problem, approach,
            simulation, results.
          </p>
        </div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {caseStudies.map((project) => (
            <Link
              key={project.slug}
              href={`/case-studies/${project.slug}`}
              className="group block rounded-xl border border-titanium/20 overflow-hidden hover:border-ixra-blue/50 transition-colors"
            >
              <div className="relative aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-ixra-blue">
                  {project.category}
                </span>
                <h2 className="font-headline text-xl text-plasma-white mt-2 mb-2 group-hover:text-ixra-blue transition-colors">
                  {project.title}
                </h2>
                <p className="text-titanium text-sm line-clamp-2">
                  {project.description}
                </p>
                {project.stats && (
                  <div className="flex gap-4 mt-4">
                    {Object.entries(project.stats)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="font-numbers text-sm text-ixra-blue">
                            {value}
                          </p>
                          <p className="text-xs text-titanium capitalize">
                            {key}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon section */}
        {comingSoon.length > 0 && (
          <>
            <h2 className="font-headline text-2xl text-plasma-white text-center mb-8">
              MORE <span className="text-titanium">COMING SOON</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {comingSoon.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-lg border border-titanium/10 p-4 opacity-60"
                >
                  <span className="text-xs uppercase tracking-widest text-titanium">
                    {project.category}
                  </span>
                  <h3 className="font-headline text-lg text-plasma-white mt-1">
                    {project.title}
                  </h3>
                  <p className="text-titanium text-sm mt-1">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
