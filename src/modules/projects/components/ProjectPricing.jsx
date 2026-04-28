import { formatPriceLabel } from '../../../shared/api/projects.js'

function isNumber(n) {
  return typeof n === 'number' && Number.isFinite(n)
}

function formatMoney(n) {
  if (!isNumber(n)) return '—'
  return `₹${n.toLocaleString()}`
}

export default function ProjectPricing({ project }) {
  const label = formatPriceLabel(project)
  const pricingType = project?.pricingType

  const units = Array.isArray(project?.units) ? project.units : []
  const hasUnits =
    pricingType === 'unit_based' &&
    units.some((u) => typeof u?.type === 'string' && u.type.trim() && isNumber(u.minPrice) && isNumber(u.maxPrice))

  const price = project?.price && typeof project.price === 'object' ? project.price : null
  const hasDirect = pricingType === 'direct' && price && isNumber(price.min) && isNumber(price.max)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Pricing</h2>
      <p className="mt-2 text-sm font-semibold text-emerald-800">{label}</p>

      {hasDirect ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-900/10">
            <p className="text-xs font-semibold text-slate-600">Min</p>
            <p className="mt-1 text-sm font-bold text-slate-900">{formatMoney(price.min)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-900/10">
            <p className="text-xs font-semibold text-slate-600">Max</p>
            <p className="mt-1 text-sm font-bold text-slate-900">{formatMoney(price.max)}</p>
          </div>
        </div>
      ) : null}

      {hasUnits ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-700">
              <tr>
                <th className="px-3 py-2">Unit</th>
                <th className="px-3 py-2">Size</th>
                <th className="px-3 py-2">Min</th>
                <th className="px-3 py-2">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {units.map((u, idx) => {
                const type = typeof u?.type === 'string' ? u.type.trim() : ''
                if (!type || !isNumber(u?.minPrice) || !isNumber(u?.maxPrice)) return null
                const size = typeof u?.size === 'string' && u.size.trim() ? u.size.trim() : '—'
                return (
                  <tr key={`${type}-${idx}`} className="bg-white">
                    <td className="px-3 py-2 font-semibold text-slate-900">{type}</td>
                    <td className="px-3 py-2 text-slate-700">{size}</td>
                    <td className="px-3 py-2 text-slate-700">{formatMoney(u.minPrice)}</td>
                    <td className="px-3 py-2 text-slate-700">{formatMoney(u.maxPrice)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {!hasDirect && !hasUnits ? (
        <p className="mt-4 text-sm text-slate-600">Pricing details will be shared on enquiry.</p>
      ) : null}
    </section>
  )
}

