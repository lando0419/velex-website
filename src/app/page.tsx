import {
  Hero,
  ProblemSection,
  SolutionSection,
  AboutSection,
  ProofSection,
  CapabilitiesSection,
  ProcessSection,
  TechStackSection,
  ShowcaseSection,
  ResultsSection,
  MeshComparisonSection,
  PricingSection,
  FAQSection,
  ContactSection,
} from '@/components/sections'

export default function Home() {
  return (
    <>
      {/* Skip link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ixra-blue focus:text-void focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>
      <main id="main-content">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <AboutSection />
        <ProofSection />
        <CapabilitiesSection />
        <ProcessSection />
        <TechStackSection />
        <ShowcaseSection />
        <ResultsSection />
        <MeshComparisonSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  )
}
