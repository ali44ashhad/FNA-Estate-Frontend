import Container from '../../../shared/components/Container.jsx'
import SectionHeading from '../../../shared/components/SectionHeading.jsx'
import ProjectCard from '../../../shared/components/ProjectCard.jsx'

export default function ProjectShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  projects,
  loading = false,
  error = '',
  viewAllHref = '#projects',
  variant = 'muted',
}) {
  const bg = variant === 'muted' ? 'bg-slate-50' : 'bg-white'
  return (
    <section id={id} className={`scroll-mt-20 py-16 ${bg}`}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
            <p className="font-semibold">Couldn’t load projects</p>
            <p className="mt-1 text-sm text-rose-800">{error}</p>
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[18rem] animate-pulse rounded-2xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                title={p.title}
                location={p.location}
                badge={p.badge}
                priceLabel={p.priceLabel}
                imageUrl={p.imageUrl}
                images={p.images}
                to={p.to}
              />
            ))}
          </div>
        )}
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
