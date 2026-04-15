import Container from '../../../shared/components/Container.jsx'
import SectionHeading from '../../../shared/components/SectionHeading.jsx'
import ProjectCard from '../../../shared/components/ProjectCard.jsx'

export default function ProjectShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  projects,
  viewAllHref = '#projects',
  variant = 'muted',
}) {
  const bg = variant === 'muted' ? 'bg-slate-50' : 'bg-white'
  return (
    <section id={id} className={`scroll-mt-20 py-16 ${bg}`}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} title={p.title} location={p.location} badge={p.badge} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={viewAllHref}
            className="inline-flex items-center justify-center rounded-full border border-emerald-800 px-6 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-800 hover:text-white"
          >
            View all
          </a>
        </div>
      </Container>
    </section>
  )
}
