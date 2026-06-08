import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'
import { request } from '../../../shared/api/http.js'
import { useAccessToken } from '../../../shared/auth/useAccessToken.js'

function formatWhen(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, { dateStyle: 'medium' })
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

function PurchaseCardSkeleton({ k }) {
  return (
    <li key={k} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-square">
        <div className="h-1/2 bg-slate-100" />
        <div className="space-y-3 p-4">
          <div className="h-4 w-2/3 rounded bg-slate-100" />
          <div className="h-4 w-1/2 rounded bg-slate-100" />
          <div className="h-9 w-32 rounded bg-slate-100" />
        </div>
      </div>
    </li>
  )
}

export default function MyPurchasesPage() {
  const token = useAccessToken()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!token) {
      navigate(`${ROUTES.login}?returnTo=${encodeURIComponent(ROUTES.myPurchases)}`, { replace: true })
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
        if (!cancelled) {
          setItems(list)
          setLoading(false)
        }
      } catch (e) {
        const msg = e && typeof e === 'object' && e.message ? e.message : 'Could not load purchases'
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

  const cards = useMemo(
    () =>
      (Array.isArray(items) ? items : []).map((purchase) => {
        const projectName =
          purchase?.project && typeof purchase.project.name === 'string' ? purchase.project.name.trim() : ''
        const projectStatus =
          purchase?.project && typeof purchase.project.status === 'string' ? purchase.project.status.trim() : ''
        const images = purchase?.project && Array.isArray(purchase.project.images) ? purchase.project.images : []
        const image = typeof images?.[0] === 'string' ? images[0] : ''

        const summaryParts = []
        if (typeof purchase?.category === 'string' && purchase.category.trim()) summaryParts.push(titleCase(purchase.category))
        if (typeof purchase?.subType === 'string' && purchase.subType.trim()) summaryParts.push(titleCase(purchase.subType))
        const unit =
          typeof purchase?.unitTypeLabel === 'string' && purchase.unitTypeLabel.trim()
            ? purchase.unitTypeLabel.trim()
            : typeof purchase?.apartmentConfig === 'string' && purchase.apartmentConfig.trim()
              ? purchase.apartmentConfig.trim()
              : ''
        if (unit) summaryParts.push(unit)

        const onOpen = () => {
          if (!purchase?.id) return
          navigate(`${ROUTES.myPurchases}/${encodeURIComponent(String(purchase.id))}`)
        }

        return (
          <li key={purchase?.id || `${projectName}-${purchase?.createdAt || ''}`}>
            <button
              type="button"
              onClick={onOpen}
              className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/25"
            >
              <div className="flex aspect-square flex-col">
                <div className="relative flex-1 overflow-hidden bg-slate-50">
                  {image ? (
                    <img
                      src={image}
                      alt={projectName ? `${projectName} image` : 'Project image'}
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0 border-t border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Project</p>
                      <p className="mt-1 truncate text-lg font-semibold text-slate-900">
                        {projectName || 'Project'}
                      </p>
                      {summaryParts.length ? (
                        <p className="mt-1 line-clamp-1 text-sm text-slate-600">{summaryParts.join(' • ')}</p>
                      ) : null}
                    </div>

                    <span className="inline-flex shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                      {titleCase(projectStatus || purchase?.status)}
                    </span>
                  </div>

                  <dl className="mt-4 grid gap-3 text-sm text-slate-700">
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Agreed price</dt>
                      <dd className="mt-0.5 font-semibold text-slate-900">{formatPrice(purchase?.agreedPrice)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Booked on</dt>
                      <dd className="mt-0.5 font-medium text-slate-900">{formatWhen(purchase?.createdAt)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </button>
          </li>
        )
      }),
    [items, navigate]
  )

  if (!token) return null

  return (
    <article className="min-h-[60vh] bg-white py-12 sm:py-16">
      <Container>
        <header className="mb-10 max-w-3xl border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My purchases</h1>
          <p className="mt-3 text-lg text-slate-600">Your booked purchases, including project details and documents.</p>
        </header>

        {loading ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((k) => (
              <PurchaseCardSkeleton key={k} k={k} />
            ))}
          </ul>
        ) : error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>
        ) : cards.length === 0 ? (
          <p className="text-slate-600">You don&apos;t have any purchases yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards}</ul>
        )}
      </Container>
    </article>
  )
}

