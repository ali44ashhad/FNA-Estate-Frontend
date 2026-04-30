import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import ProjectCard from '../../../shared/components/ProjectCard.jsx'
import {
  getSubTypeOptions,
  PROJECT_CATEGORY_OPTIONS,
  PROJECT_CATEGORIES,
} from '../../../shared/constants/projectTypes.js'
import CategoryTabs from '../../projects/components/filters/CategoryTabs.jsx'
import SubTypeSelect from '../../projects/components/filters/SubTypeSelect.jsx'
import ApartmentConfigSelect from '../../projects/components/filters/ApartmentConfigSelect.jsx'
import { useProjectsList } from '../../projects/hooks/useProjectsList.js'
import Pagination from '../../projects/components/Pagination.jsx'
import { projectToCardProps } from '../../projects/utils/projectCardAdapter.js'

function normalizeCategory(raw) {
  const v = typeof raw === 'string' ? raw.trim().toLowerCase() : ''
  if (v === 'residential' || v === 'commercial') return v
  return ''
}

function normalizeSubType(raw) {
  const v = typeof raw === 'string' ? raw.trim().toLowerCase() : ''
  if (!v) return ''
  return v
}

function normalizeApartmentConfig(raw) {
  const v = typeof raw === 'string' ? raw.trim() : ''
  return v
}

function normalizePage(raw) {
  const n = typeof raw === 'string' ? Number(raw) : Number(raw)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.floor(n)
}

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = normalizeCategory(searchParams.get('category'))
  const subType = normalizeSubType(searchParams.get('subType'))
  const apartmentConfig = normalizeApartmentConfig(searchParams.get('apartmentConfig'))
  const page = normalizePage(searchParams.get('page'))

  const tabs = useMemo(() => PROJECT_CATEGORY_OPTIONS, [])
  const subTypeOptions = useMemo(() => getSubTypeOptions(category), [category])

  const limit = 9
  const state = useProjectsList({
    category: category || undefined,
    subType: subType || undefined,
    apartmentConfig: apartmentConfig || undefined,
    page,
    limit,
  })
  const totalPages = Math.max(1, Math.ceil((state.meta?.total || 0) / limit))

  const apartmentConfigOptions = useMemo(() => {
    if (category !== 'residential' || subType !== 'apartment') return [{ value: '', label: 'All configs' }]
    const set = new Map()
    for (const p of state.items) {
      const inv = Array.isArray(p?.inventory) ? p.inventory : []
      for (const row of inv) {
        if (row?.category !== 'residential' || row?.subType !== 'apartment') continue
        const cfgs = Array.isArray(row?.apartmentConfigs) ? row.apartmentConfigs : []
        for (const cfg of cfgs) {
          const key = typeof cfg?.config === 'string' ? cfg.config.trim() : ''
          if (!key) continue
          const label = typeof cfg?.configLabel === 'string' && cfg.configLabel.trim() ? cfg.configLabel.trim() : key
          if (!set.has(key)) set.set(key, label)
        }
      }
    }
    const opts = [...set.entries()]
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([value, label]) => ({ value, label }))
    return [{ value: '', label: 'All configs' }, ...opts]
  }, [apartmentConfig, category, subType, state.items])

  function onSelectCategory(next) {
    const nextCategory = normalizeCategory(next)
    const nextParams = new URLSearchParams(searchParams)
    if (nextCategory) nextParams.set('category', nextCategory)
    else nextParams.delete('category')
    nextParams.delete('subType')
    nextParams.delete('apartmentConfig')
    nextParams.delete('page')
    setSearchParams(nextParams, { replace: false })
  }

  function onSelectSubType(next) {
    const nextSubType = normalizeSubType(next)
    const nextParams = new URLSearchParams(searchParams)
    if (nextSubType) nextParams.set('subType', nextSubType)
    else nextParams.delete('subType')
    if (nextSubType !== 'apartment') nextParams.delete('apartmentConfig')
    nextParams.delete('page')
    setSearchParams(nextParams, { replace: false })
  }

  function onSelectApartmentConfig(next) {
    const nextConfig = normalizeApartmentConfig(next)
    const nextParams = new URLSearchParams(searchParams)
    if (nextConfig) nextParams.set('apartmentConfig', nextConfig)
    else nextParams.delete('apartmentConfig')
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
          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Filters</p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Browse {category ? PROJECT_CATEGORIES[category] : 'all'} projects by sub-type.
                </p>
              </div>
              <CategoryTabs options={tabs} value={category} onChange={onSelectCategory} />
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-6">
                <SubTypeSelect
                  options={subTypeOptions}
                  value={subType}
                  onChange={onSelectSubType}
                  label={category ? `${PROJECT_CATEGORIES[category]} sub-type` : 'Sub-type'}
                  disabled={!category}
                />
              </div>

              {category === 'residential' && subType === 'apartment' ? (
                <div className="md:col-span-6">
                  <ApartmentConfigSelect
                    options={apartmentConfigOptions}
                    value={apartmentConfig}
                    onChange={onSelectApartmentConfig}
                  />
                </div>
              ) : null}
            </div>
          </div>
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
            <p className="mt-1 text-sm text-slate-600">Try changing the category or sub-type filters.</p>
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

