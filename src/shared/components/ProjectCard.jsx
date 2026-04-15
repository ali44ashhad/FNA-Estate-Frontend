export default function ProjectCard({ title, location, badge, priceLabel = 'Price on Request' }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-emerald-200/80 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 via-emerald-50/80 to-slate-200">
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-emerald-800 shadow-sm backdrop-blur">
          {badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-800">{title}</h3>
        <p className="text-sm text-slate-600">{location}</p>
        <p className="mt-auto text-sm font-medium text-emerald-700">{priceLabel}</p>
        <button
          type="button"
          className="mt-2 w-full rounded-lg border border-emerald-700/20 bg-emerald-50/50 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-700 hover:text-white"
        >
          See details
        </button>
      </div>
    </article>
  )
}
