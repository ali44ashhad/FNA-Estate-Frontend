import HeroSection from './components/HeroSection.jsx'
import TrustStats from './components/TrustStats.jsx'
import ProjectShowcase from './components/ProjectShowcase.jsx'
import LuxuryHighlight from './components/LuxuryHighlight.jsx'
import CitiesShowcase from './components/CitiesShowcase.jsx'
import BuildersStrip from './components/BuildersStrip.jsx'
import BlogTeaser from './components/BlogTeaser.jsx'
import AboutStrip from './components/AboutStrip.jsx'
import {
  exclusiveProjects,
  featuredProjects,
  plotProjects,
} from './data/homeContent.js'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustStats />
      <ProjectShowcase
        id="projects"
        eyebrow="Exclusive"
        title="Exclusive projects"
        subtitle="Curated inventory from acclaimed developers — handpicked for location, delivery track record, and lifestyle fit."
        projects={exclusiveProjects}
        viewAllHref="#projects"
        variant="white"
      />
      <ProjectShowcase
        id="plots"
        eyebrow="Plots"
        title="Invest in plots"
        subtitle="RERA-registered plotted options in high-growth micro-markets."
        projects={plotProjects}
        viewAllHref="#plots"
        variant="muted"
      />
      <ProjectShowcase
        id="featured"
        eyebrow="Featured"
        title="Featured projects"
        subtitle="Move-in ready and under-construction homes across NCR and beyond."
        projects={featuredProjects}
        viewAllHref="#featured"
        variant="white"
      />
      <LuxuryHighlight />
      <CitiesShowcase />
      <BuildersStrip />
      <BlogTeaser />
      <AboutStrip />
    </main>
  )
}
