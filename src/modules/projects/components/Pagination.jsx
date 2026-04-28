function clamp(n, min, max) {
  if (!Number.isFinite(n)) return min
  return Math.max(min, Math.min(max, n))
}

export default function Pagination({ page, totalPages, onPageChange }) {
  const safeTotal = Math.max(1, Number(totalPages) || 1)
  const safePage = clamp(Number(page) || 1, 1, safeTotal)

  const windowSize = 5
  const half = Math.floor(windowSize / 2)
  let start = Math.max(1, safePage - half)
  let end = Math.min(safeTotal, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)

  const pages = []
  for (let p = start; p <= end; p++) pages.push(p)

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, safePage - 1))}
        disabled={safePage <= 1}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      {start > 1 ? (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-200 hover:bg-emerald-50"
          >
            1
          </button>
          {start > 2 ? <span className="px-1 text-slate-400">…</span> : null}
        </>
      ) : null}

      {pages.map((p) => {
        const active = p === safePage
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              active
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-800 hover:border-emerald-200 hover:bg-emerald-50',
            ].join(' ')}
          >
            {p}
          </button>
        )
      })}

      {end < safeTotal ? (
        <>
          {end < safeTotal - 1 ? <span className="px-1 text-slate-400">…</span> : null}
          <button
            type="button"
            onClick={() => onPageChange(safeTotal)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-emerald-200 hover:bg-emerald-50"
          >
            {safeTotal}
          </button>
        </>
      ) : null}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(safeTotal, safePage + 1))}
        disabled={safePage >= safeTotal}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  )
}

