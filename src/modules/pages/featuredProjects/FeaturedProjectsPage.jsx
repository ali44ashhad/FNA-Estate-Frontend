import Container from '../../../shared/components/Container.jsx'
import ProjectCard from '../../../shared/components/ProjectCard.jsx'
import { exclusiveProjects, featuredProjects } from '../../home/data/homeContent.js'

const allFeatured = [...featuredProjects, ...exclusiveProjects]

export default function FeaturedProjectsPage() {
  return (
    <article className="min-h-[60vh] bg-slate-50 py-12 sm:py-16">
      <Container>
        <header className="mb-10 max-w-3xl border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured projects</h1>
          <p className="mt-3 text-lg text-slate-600">
            A curated snapshot of corridors and developers we track. Inventory and pricing are subject to confirmation at the time of
            enquiry.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allFeatured.map((p) => (
            <ProjectCard key={p.id} title={p.title} location={p.location} badge={p.badge} />
          ))}
        </div>
      </Container>
    </article>
  )
}
