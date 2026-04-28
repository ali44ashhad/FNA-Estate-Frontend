export default function PropertyTypeTabs({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((t) => {
        const active = value === t.value
        return (
          <button
            key={t.value || 'all'}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              active
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-800 hover:border-emerald-200 hover:bg-emerald-50',
            ].join(' ')}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

