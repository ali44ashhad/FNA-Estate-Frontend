import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'
import { useProjectDetails } from '../../projects/hooks/useProjectDetails.js'
import ProjectAmenities from '../../projects/components/ProjectAmenities.jsx'
import ProjectImageGallery from '../../projects/components/ProjectImageGallery.jsx'
import ProjectMeta from '../../projects/components/ProjectMeta.jsx'
import ProjectInventoryOptions from '../../projects/components/ProjectInventoryOptions.jsx'
import LeadEnquiryModal from '../../leads/components/LeadEnquiryModal.jsx'
import { clearAccessToken, getAccessToken } from '../../../shared/auth/authStorage.js'

function normalizeKey(raw) {
  return typeof raw === 'string' ? raw.trim() : ''
}

function buildReturnTo({ projectId, interest }) {
  const qs = new URLSearchParams()
  qs.set('lead', '1')
  if (interest?.category) qs.set('category', String(interest.category))
  if (interest?.subType) qs.set('subType', String(interest.subType))
  if (interest?.apartmentConfig) qs.set('apartmentConfig', String(interest.apartmentConfig))
  if (interest?.unitTypeKey) qs.set('unitTypeKey', String(interest.unitTypeKey))
  if (interest?.unitTypeLabel) qs.set('unitTypeLabel', String(interest.unitTypeLabel))
  return `/projects/${encodeURIComponent(String(projectId))}?${qs.toString()}`
}

function sanitizeHtml(html) {
  const input = typeof html === 'string' ? html : ''
  if (!input.trim()) return ''
  if (typeof window === 'undefined' || typeof window.DOMParser === 'undefined') return input

  const doc = new window.DOMParser().parseFromString(input, 'text/html')
  const blockedTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta'])

  const tree = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT)
  const toRemove = []

  while (tree.nextNode()) {
    const el = /** @type {HTMLElement} */ (tree.currentNode)
    const tag = el.tagName.toLowerCase()
    if (blockedTags.has(tag)) {
      toRemove.push(el)
      continue
    }

    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase()
      const value = attr.value || ''

      if (name.startsWith('on')) {
        el.removeAttribute(attr.name)
        continue
      }

      if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(value)) {
        el.removeAttribute(attr.name)
        continue
      }
    }
  }

  for (const el of toRemove) el.remove()

  return doc.body.innerHTML
}

function ProjectDetailsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="h-[22rem] animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
      <div className="lg:col-span-5">
        <div className="h-[18rem] animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
      <div className="lg:col-span-12">
        <div className="h-[10rem] animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    </div>
  )
}

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const state = useProjectDetails(id)
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadInterest, setLeadInterest] = useState(null)

  const leadProject = useMemo(() => {
    if (!state.item) return null
    return { id: state.item.id, name: state.item.name }
  }, [state.item])

  function openLead(interest) {
    setLeadInterest(interest)
    setLeadOpen(true)
  }

  function handleEnquire(interest) {
    const token = getAccessToken()
    if (!token) {
      const returnTo = buildReturnTo({ projectId: id, interest })
      navigate(`${ROUTES.login}?returnTo=${encodeURIComponent(returnTo)}`)
      return
    }
    openLead(interest)
  }

  function handleAuthRequired() {
    clearAccessToken()
    const returnTo = buildReturnTo({ projectId: id, interest: leadInterest || undefined })
    navigate(`${ROUTES.login}?returnTo=${encodeURIComponent(returnTo)}`)
  }

  useEffect(() => {
    const token = getAccessToken()
    if (!token) return
    if (!location.search) return

    const sp = new URLSearchParams(location.search)
    if (sp.get('lead') !== '1') return

    const category = normalizeKey(sp.get('category'))
    const subType = normalizeKey(sp.get('subType'))
    const apartmentConfig = normalizeKey(sp.get('apartmentConfig'))
    const unitTypeKey = normalizeKey(sp.get('unitTypeKey'))
    const unitTypeLabel = normalizeKey(sp.get('unitTypeLabel'))

    if (!category || !subType) return
    if (category === 'residential' && subType === 'apartment' && !apartmentConfig) return

    openLead({
      category,
      subType,
      ...(apartmentConfig ? { apartmentConfig } : {}),
      ...(unitTypeKey ? { unitTypeKey } : {}),
      ...(unitTypeLabel ? { unitTypeLabel } : {}),
    })

    navigate(location.pathname, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, navigate])

  return (
    <article className="min-h-[60vh] bg-slate-50 py-12 sm:py-16">
      <Container>
        <div className="mb-8">
          {state.item ? (
            <ProjectMeta project={state.item} />
          ) : (
            <header className="max-w-4xl">
              <p className="text-sm font-medium text-slate-600">Project details</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Project</h1>
            </header>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={ROUTES.projects}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Back to projects
            </Link>
          </div>
        </div>

        {state.error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
            <p className="font-semibold">Couldn’t load project</p>
            <p className="mt-1 text-sm text-rose-800">{state.error}</p>
            <p className="mt-3 text-xs text-rose-800">
              Project id: <span className="font-mono">{id || '—'}</span>
            </p>
          </div>
        ) : state.loading ? (
          <ProjectDetailsSkeleton />
        ) : state.item ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProjectImageGallery images={state.item.images} />
            </div>
            <div className="lg:col-span-5">
              <div className="grid gap-6">
                <ProjectInventoryOptions project={state.item} onEnquire={handleEnquire} />

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-slate-900">About</h2>
                  {typeof state.item.description === 'string' && state.item.description.trim() ? (
                    <div
                      className="prose prose-slate mt-3 max-w-none text-sm leading-relaxed prose-a:text-emerald-800 prose-a:underline prose-strong:text-slate-900"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(state.item.description) }}
                    />
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">Description will be shared on enquiry.</p>
                  )}
                </section>
              </div>
            </div>

            <div className="lg:col-span-12">
              <ProjectAmenities amenities={state.item.amenities} />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-800">
            <p className="font-semibold">Project not found</p>
            <p className="mt-1 text-sm text-slate-600">Try going back to the projects list.</p>
          </div>
        )}

        <LeadEnquiryModal
          open={leadOpen}
          onClose={() => setLeadOpen(false)}
          project={leadProject}
          interest={leadInterest}
          onAuthRequired={handleAuthRequired}
        />
      </Container>
    </article>
  )
}

