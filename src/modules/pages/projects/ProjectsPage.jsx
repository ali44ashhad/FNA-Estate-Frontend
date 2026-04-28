import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import ProjectCard from '../../../shared/components/ProjectCard.jsx'
import { formatPriceLabel } from '../../../shared/api/projects.js'
import { PROJECT_PROPERTY_TYPE_OPTIONS, PROJECT_PROPERTY_TYPES } from '../../../shared/constants/projectTypes.js'
import PropertyTypeTabs from '../../projects/components/PropertyTypeTabs.jsx'
import { useProjectsList } from '../../projects/hooks/useProjectsList.js'
import Pagination from '../../projects/components/Pagination.jsx'
import { projectToCardProps } from '../../projects/utils/projectCardAdapter.js'

function normalizePropertyType(raw) {
  const v = typeof raw === 'string' ? raw.trim().toLowerCase() : ''
  if (v === 'apartment' || v === 'plot' || v === 'villa') return v
  return ''
}

function normalizePage(raw) {
  const n = typeof raw === 'string' ? Number(raw) : Number(raw)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.floor(n)
}

function formatBadge(p) {
  const type = PROJECT_PROPERTY_TYPES[p?.propertyType] || 'Project'
  const status = typeof p?.status === 'string' && p.status.trim() ? p.status.trim() : null
  return status ? `${type} · ${status}` : type
}

function formatLocation(p) {
  const name = p?.city?.name
  const state = p?.city?.state
  if (typeof name === 'string' && typeof state === 'string') return `${name}, ${state}`
  if (typeof name === 'string') return name
  return '—'
}

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedType = normalizePropertyType(searchParams.get('propertyType'))
  const page = normalizePage(searchParams.get('page'))

  const tabs = useMemo(() => PROJECT_PROPERTY_TYPE_OPTIONS, [])

  const limit = 9
  const state = useProjectsList({ propertyType: selectedType || undefined, page, limit })
  const totalPages = Math.max(1, Math.ceil((state.meta?.total || 0) / limit))

  function onSelectType(next) {
    const nextType = normalizePropertyType(next)
    const nextParams = new URLSearchParams(searchParams)
    if (nextType) nextParams.set('propertyType', nextType)
    else nextParams.delete('propertyType')
    nextParams.delete('page')
    setSearchParams(nextParams, { replace: false })
  }

  function onPageChange(nextPage) {
    const next = normalizePage(nextPage)
    const nextParams = new URLSearchParams(searchParams)
    if (next <= 1) nextParams.delete('page')
    else nextParams.set('page', String(next))
    setSearchParams(nextParams, { replace: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <article className="min-h-[60vh] bg-slate-50 py-12 sm:py-16">
      <Container>
        <header className="mb-8 max-w-3xl border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Projects</h1>
          <p className="mt-3 text-lg text-slate-600">Browse projects by type and enquire with confidence.</p>
        </header>

        <div className="mb-8">
          <PropertyTypeTabs options={tabs} value={selectedType} onChange={onSelectType} />
        </div>

        {state.error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
            <p className="font-semibold">Couldn’t load projects</p>
            <p className="mt-1 text-sm text-rose-800">{state.error}</p>
          </div>
        ) : null}

        {state.loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[18rem] animate-pulse rounded-2xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.items.map((p) => {
                const card = projectToCardProps(p)
                return <ProjectCard key={card.id || p.id} {...card} />
              })}
            </div>

            {!state.error && state.items.length > 0 ? (
              <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
            ) : null}
          </>
        )}

        {!state.loading && !state.error && state.items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-slate-800">
            <p className="text-base font-semibold">No projects found</p>
            <p className="mt-1 text-sm text-slate-600">Try a different project type.</p>
            <div className="mt-4">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-full border border-emerald-800 px-6 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-800 hover:text-white"
              >
                View all projects
              </Link>
            </div>
          </div>
        ) : null}
      </Container>
    </article>
  )
}

