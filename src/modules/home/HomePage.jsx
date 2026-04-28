import { useMemo } from 'react'
import HeroSection from './components/HeroSection.jsx'
import TrustStats from './components/TrustStats.jsx'
import ProjectShowcase from './components/ProjectShowcase.jsx'
import LuxuryHighlight from './components/LuxuryHighlight.jsx'
import CitiesShowcase from './components/CitiesShowcase.jsx'
import BuildersStrip from './components/BuildersStrip.jsx'
import BlogTeaser from './components/BlogTeaser.jsx'
import AboutStrip from './components/AboutStrip.jsx'
import { ROUTES } from '../../shared/constants/routes.js'
import { useProjectsList } from '../projects/hooks/useProjectsList.js'
import { projectToCardProps } from '../projects/utils/projectCardAdapter.js'

export default function HomePage() {
  const exclusive = useProjectsList({ page: 1, limit: 3 })
  const plots = useProjectsList({ propertyType: 'plot', page: 1, limit: 3 })
  const featured = useProjectsList({ propertyType: 'apartment', page: 1, limit: 3 })

  const exclusiveCards = useMemo(() => exclusive.items.map(projectToCardProps), [exclusive.items])
  const plotCards = useMemo(() => plots.items.map(projectToCardProps), [plots.items])
  const featuredCards = useMemo(() => featured.items.map(projectToCardProps), [featured.items])

  return (
    <main>
      <HeroSection />
      <TrustStats />
      <ProjectShowcase
        id="projects"
        eyebrow="Exclusive"
        title="Exclusive projects"
        subtitle="Curated inventory from acclaimed developers — handpicked for location, delivery track record, and lifestyle fit."
        projects={exclusiveCards}
        loading={exclusive.loading}
        error={exclusive.error}
        viewAllHref={ROUTES.projects}
        variant="white"
      />
      <ProjectShowcase
        id="plots"
        eyebrow="Plots"
        title="Invest in plots"
        subtitle="RERA-registered plotted options in high-growth micro-markets."
        projects={plotCards}
        loading={plots.loading}
        error={plots.error}
        viewAllHref={`${ROUTES.projects}?propertyType=plot`}
        variant="muted"
      />
      <ProjectShowcase
        id="featured"
        eyebrow="Featured"
        title="Featured projects"
        subtitle="Move-in ready and under-construction homes across NCR and beyond."
        projects={featuredCards}
        loading={featured.loading}
        error={featured.error}
        viewAllHref={`${ROUTES.projects}?propertyType=apartment`}
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
