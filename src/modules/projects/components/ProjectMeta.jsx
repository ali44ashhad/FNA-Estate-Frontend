import { PROJECT_PROPERTY_TYPES } from '../../../shared/constants/projectTypes.js'

function formatLocation(project) {
  const name = project?.city?.name
  const state = project?.city?.state
  if (typeof name === 'string' && typeof state === 'string') return `${name}, ${state}`
  if (typeof name === 'string') return name
  return '—'
}

export default function ProjectMeta({ project }) {
  const name = typeof project?.name === 'string' && project.name.trim() ? project.name.trim() : 'Project'
  const propertyType = PROJECT_PROPERTY_TYPES[project?.propertyType] || 'Project'
  const status = typeof project?.status === 'string' && project.status.trim() ? project.status.trim() : ''
  const location = formatLocation(project)

  return (
    <header className="max-w-4xl">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-900/10">
          {propertyType}
        </span>
        {status ? (
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10">
            {status}
          </span>
        ) : null}
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{name}</h1>
      <p className="mt-2 text-base text-slate-600">{location}</p>
    </header>
  )
}

