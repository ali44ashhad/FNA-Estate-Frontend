import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'
import { request } from '../../../shared/api/http.js'
import { useAccessToken } from '../../../shared/auth/useAccessToken.js'

function formatVisitWhen(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

function formatStatus(status) {
  if (status === 'scheduled') return 'Scheduled'
  if (status === 'completed') return 'Completed'
  if (status === 'cancelled') return 'Cancelled'
  return typeof status === 'string' && status ? status : '—'
}

/** Uses stored Google Maps links as-is; plain text falls back to a Maps search URL. */
function mapsLinkFromLocation(raw) {
  const s = typeof raw === 'string' ? raw.trim() : ''
  if (!s) return null

  try {
    const u = new URL(s)
    if (u.protocol === 'http:' || u.protocol === 'https:') {
      return { href: s, label: 'Open in Google Maps', title: s }
    }
  } catch {
    // not an absolute URL — treat as address / place text
  }

  return {
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`,
    label: s,
    title: undefined,
  }
}

export default function MyVisitsPage() {
  const token = useAccessToken()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!token) {
      navigate(`${ROUTES.login}?returnTo=${encodeURIComponent(ROUTES.myVisits)}`, { replace: true })
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await request('/api/users/me/visits', { auth: true })
        const data = res?.data && typeof res.data === 'object' ? res.data : null
        const list = Array.isArray(data?.items) ? data.items : []
        if (!cancelled) {
          setItems(list)
          setLoading(false)
        }
      } catch (e) {
        const msg = e && typeof e === 'object' && e.message ? e.message : 'Could not load visits'
        if (!cancelled) {
          setError(msg)
          setItems([])
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [token, navigate])

  if (!token) return null

  return (
    <article className="min-h-[60vh] bg-white py-12 sm:py-16">
      <Container>
        <header className="mb-10 max-w-3xl border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My visits</h1>
          <p className="mt-3 text-lg text-slate-600">
            Scheduled site visits tied to your enquiries, including location and timing.
          </p>
        </header>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((k) => (
              <div
                key={k}
                className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        ) : error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </p>
        ) : items.length === 0 ? (
          <p className="text-slate-600">
            You don&apos;t have any visits yet. Submit an enquiry on a project to get started.
          </p>
        ) : (
          <ul className="mx-auto max-w-3xl space-y-4">
            {items.map((visit) => {
              const projectName =
                visit?.lead?.project && typeof visit.lead.project.name === 'string'
                  ? visit.lead.project.name
                  : null
              const salesName =
                visit?.sales && typeof visit.sales.name === 'string' ? visit.sales.name : null
              const locationRaw =
                typeof visit?.location === 'string' && visit.location.trim() ? visit.location.trim() : ''
              const locationLinkRaw =
                typeof visit?.locationLink === 'string' && visit.locationLink.trim() ? visit.locationLink.trim() : ''
              const mapsLink = locationLinkRaw
                ? mapsLinkFromLocation(locationLinkRaw)
                : locationRaw
                  ? mapsLinkFromLocation(locationRaw)
                  : null

              return (
                <li
                  key={visit.id || visit.leadId}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Location
                        </p>
                        {locationRaw ? (
                          <p className="mt-1 text-lg font-semibold leading-snug text-slate-900">
                            {locationRaw}
                          </p>
                        ) : (
                          <p className="mt-1 text-lg font-semibold text-slate-900">—</p>
                        )}
                      </div>

                      {mapsLink ? (
                        <a
                          href={mapsLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={mapsLink.title || 'Open in Google Maps'}
                          className="inline-flex w-full shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/25 sm:w-auto"
                        >
                          Open maps
                        </a>
                      ) : null}
                    </div>

                    <span className="inline-flex w-fit shrink-0 self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 sm:self-center">
                      {formatStatus(visit.status)}
                    </span>
                  </div>
                  <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Visit time</dt>
                      <dd className="mt-0.5 font-medium text-slate-900">
                        {formatVisitWhen(visit.visitTime)}
                      </dd>
                    </div>
                    {projectName ? (
                      <div>
                        <dt className="text-xs font-medium text-slate-500">Project</dt>
                        <dd className="mt-0.5 font-medium text-slate-900">{projectName}</dd>
                      </div>
                    ) : null}
                    {salesName ? (
                      <div className="sm:col-span-2">
                        <dt className="text-xs font-medium text-slate-500">Sales contact</dt>
                        <dd className="mt-0.5 font-medium text-slate-900">{salesName}</dd>
                      </div>
                    ) : null}
                  </dl>
                </li>
              )
            })}
          </ul>
        )}
      </Container>
    </article>
  )
}
