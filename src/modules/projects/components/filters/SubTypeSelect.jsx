export default function SubTypeSelect({ label = 'Sub-type', options, value, onChange, disabled = false }) {
  const safeValue = typeof value === 'string' ? value : ''
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-800">{label}</span>
      <select
        value={safeValue}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        {options.map((o) => (
          <option key={o.value || 'all'} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

