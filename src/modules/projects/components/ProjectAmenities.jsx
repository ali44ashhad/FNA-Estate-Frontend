function normalizeAmenities(amenities) {
  if (!Array.isArray(amenities)) return []
  return amenities
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean)
}

export default function ProjectAmenities({ amenities }) {
  const items = normalizeAmenities(amenities)
  if (!items.length) return null

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Amenities</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((a) => (
          <span
            key={a}
            className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-900/10"
          >
            {a}
          </span>
        ))}
      </div>
    </section>
  )
}

