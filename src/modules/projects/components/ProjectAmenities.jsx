function normalizeAmenities(amenities) {
  if (!Array.isArray(amenities)) return []
  return amenities
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean)
}

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProjectAmenities({ amenities }) {
  const items = normalizeAmenities(amenities)
  if (!items.length) return null

  return (
    <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50/60 p-6 shadow-sm">
      <div>
        <h2 className="text-base font-semibold text-slate-900">Amenities</h2>
        <p className="mt-1 text-sm text-slate-600">
          Highlights included with this project — confirm specifics on your site visit or enquiry.
        </p>
        <div className="mt-3 h-1 w-12 rounded-full bg-emerald-600/80" aria-hidden="true" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="flex min-h-[3rem] items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 ease-out hover:border-emerald-200/70 hover:shadow-md sm:min-h-0 sm:p-4"
          >
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"
              aria-hidden="true"
            >
              <CheckIcon />
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-slate-900 break-words">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
