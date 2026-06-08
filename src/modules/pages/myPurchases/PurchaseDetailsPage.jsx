import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'
import { request } from '../../../shared/api/http.js'
import { useAccessToken } from '../../../shared/auth/useAccessToken.js'
import { getProjectById } from '../../../shared/api/projects.js'
import ProjectImageGallery from '../../projects/components/ProjectImageGallery.jsx'
import ProjectAmenities from '../../projects/components/ProjectAmenities.jsx'

function formatWhen(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

function formatPrice(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return '—'
  try {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(amount)
  } catch {
    return String(amount)
  }
}

function titleCase(s) {
  const raw = typeof s === 'string' ? s.trim() : ''
  if (!raw) return '—'
  return raw[0].toUpperCase() + raw.slice(1)
}

function safeText(s) {
  const raw = typeof s === 'string' ? s.trim() : ''
  return raw || null
}

export default function PurchaseDetailsPage() {
  const token = useAccessToken()
  const navigate = useNavigate()
  const { id } = useParams()
  const purchaseId = typeof id === 'string' ? id.trim() : ''

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [purchase, setPurchase] = useState(null)
  const [project, setProject] = useState(null)
  const [projectLoading, setProjectLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      const returnTo = `${ROUTES.myPurchases}/${encodeURIComponent(purchaseId || '')}`
      navigate(`${ROUTES.login}?returnTo=${encodeURIComponent(returnTo)}`, { replace: true })
      return
    }

    if (!purchaseId) {
      setLoading(false)
      setError('Invalid purchase')
      setPurchase(null)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await request('/api/purchases/me', { auth: true })
        const raw = res?.data
        const list = Array.isArray(raw) ? raw : Array.isArray(raw?.items) ? raw.items : []
        const found = list.find((p) => String(p?.id || '') === purchaseId) || null

        if (!cancelled) {
          setPurchase(found)
          setLoading(false)
          if (!found) setError('Purchase not found')
        }
      } catch (e) {
        const msg = e && typeof e === 'object' && e.message ? e.message : 'Could not load purchase'
        if (!cancelled) {
          setError(msg)
          setPurchase(null)
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [token, navigate, purchaseId])

  const projectId = useMemo(() => {
    const pid = purchase?.project?.id
    return typeof pid === 'string' && pid.trim() ? pid.trim() : null
  }, [purchase])

  useEffect(() => {
    if (!token) return
    if (!projectId) {
      setProject(null)
      return
    }

    let alive = true
    setProjectLoading(true)

    getProjectById(projectId)
      .then((item) => {
        if (!alive) return
        setProject(item)
        setProjectLoading(false)
      })
      .catch(() => {
        if (!alive) return
        setProject(null)
        setProjectLoading(false)
      })

    return () => {
      alive = false
    }
  }, [token, projectId])

  const projectName = safeText(project?.name) || safeText(purchase?.project?.name) || 'Project'
  const projectStatus = safeText(project?.status) || safeText(purchase?.project?.status) || ''
  const images = Array.isArray(project?.images)
    ? project.images
    : Array.isArray(purchase?.project?.images)
      ? purchase.project.images
      : []

  const summaryParts = useMemo(() => {
    if (!purchase) return []
    const parts = []
    if (safeText(purchase.category)) parts.push(titleCase(purchase.category))
    if (safeText(purchase.subType)) parts.push(titleCase(purchase.subType))
    const unit = safeText(purchase.unitTypeLabel) || safeText(purchase.apartmentConfig)
    if (unit) parts.push(unit)
    return parts
  }, [purchase])

  if (!token) return null

  return (
    <article className="min-h-[60vh] bg-slate-50 py-12 sm:py-16">
      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-600">Purchase details</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {projectName}
            </h1>
            {summaryParts.length ? <p className="mt-2 text-slate-600">{summaryParts.join(' • ')}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={ROUTES.myPurchases}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Back to purchases
            </Link>
            {projectId ? (
              <Link
                to={`/projects/${encodeURIComponent(projectId)}`}
                className="inline-flex items-center justify-center rounded-full bg-emerald-800 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900"
              >
                View project
              </Link>
            ) : null}
          </div>
        </div>

        {error && !loading ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
            <p className="font-semibold">Couldn’t load purchase</p>
            <p className="mt-1 text-sm text-rose-800">{error}</p>
          </div>
        ) : loading ? (
          <div className="grid animate-pulse gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="h-[22rem] rounded-2xl border border-slate-200 bg-white" />
            </div>
            <div className="lg:col-span-5">
              <div className="h-[18rem] rounded-2xl border border-slate-200 bg-white" />
            </div>
          </div>
        ) : purchase ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProjectImageGallery images={images} />
            </div>

            <div className="lg:col-span-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-slate-900">Purchase summary</h2>
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                    {titleCase(projectStatus || purchase.status)}
                  </span>
                </div>

                <dl className="mt-5 grid gap-4 text-sm text-slate-700">
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Agreed price</dt>
                    <dd className="mt-0.5 text-lg font-semibold text-slate-900">{formatPrice(purchase.agreedPrice)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-slate-500">Booked on</dt>
                    <dd className="mt-0.5 font-medium text-slate-900">{formatWhen(purchase.createdAt)}</dd>
                  </div>
                  {safeText(purchase.unitTypeLabel) ? (
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Unit</dt>
                      <dd className="mt-0.5 font-medium text-slate-900">{purchase.unitTypeLabel}</dd>
                    </div>
                  ) : null}
                  {safeText(purchase.apartmentConfig) ? (
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Configuration</dt>
                      <dd className="mt-0.5 font-medium text-slate-900">{purchase.apartmentConfig}</dd>
                    </div>
                  ) : null}
                  {safeText(purchase.category) || safeText(purchase.subType) ? (
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Type</dt>
                      <dd className="mt-0.5 font-medium text-slate-900">
                        {[
                          safeText(purchase.category) ? titleCase(purchase.category) : null,
                          safeText(purchase.subType) ? titleCase(purchase.subType) : null,
                        ]
                          .filter(Boolean)
                          .join(' • ') || '—'}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                {projectLoading ? (
                  <p className="mt-5 text-xs font-medium text-slate-500">Loading project details…</p>
                ) : project && safeText(project.description) ? (
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">About the project</p>
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-700">
                      {String(project.description).replace(/<[^>]*>/g, '').trim() || '—'}
                    </p>
                  </div>
                ) : null}
              </section>
            </div>

            {project ? (
              <div className="lg:col-span-12">
                <ProjectAmenities amenities={project.amenities} />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-800">
            <p className="font-semibold">Purchase not found</p>
            <p className="mt-1 text-sm text-slate-600">Try going back to your purchases list.</p>
          </div>
        )}
      </Container>
    </article>
  )
}

