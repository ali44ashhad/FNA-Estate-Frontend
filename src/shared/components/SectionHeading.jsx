export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-slate-600">{subtitle}</p> : null}
    </div>
  )
}
