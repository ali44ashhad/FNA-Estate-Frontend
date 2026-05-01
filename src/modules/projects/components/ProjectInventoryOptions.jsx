import { getCategoryLabel, getSubTypeLabel } from '../../../shared/constants/projectTypes.js'

function normalizeKey(raw) {
  return typeof raw === 'string' ? raw.trim() : ''
}

function collectOptions(project) {
  const inv = Array.isArray(project?.inventory) ? project.inventory : []
  /** @type {Array<{key:string, category:string, subType:string, apartmentConfig?:string, label:string}>} */
  const out = []
  const seen = new Set()

  for (const row of inv) {
    const category = normalizeKey(row?.category)
    const subType = normalizeKey(row?.subType)
    if (!category || !subType) continue

    if (category === 'residential' && subType === 'apartment') {
      const cfgs = Array.isArray(row?.apartmentConfigs) ? row.apartmentConfigs : []
      for (const cfg of cfgs) {
        const apartmentConfig = normalizeKey(cfg?.config)
        if (!apartmentConfig) continue
        const cfgLabel = normalizeKey(cfg?.configLabel) || apartmentConfig
        const key = `${category}/${subType}/${apartmentConfig}`
        if (seen.has(key)) continue
        seen.add(key)
        out.push({
          key,
          category,
          subType,
          apartmentConfig,
          label: cfgLabel,
        })
      }
      continue
    }

    const key = `${category}/${subType}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      key,
      category,
      subType,
      label: getSubTypeLabel(subType),
    })
  }

  return out
}

export default function ProjectInventoryOptions({ project, onEnquire }) {
  const options = collectOptions(project)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Available options</h2>
          <p className="mt-1 text-sm text-slate-600">Select what you’re interested in — we’ll confirm latest availability on call.</p>
        </div>
        <p className="text-sm font-semibold text-emerald-800">Price on Request</p>
      </div>

      {options.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">Inventory details will be shared on enquiry.</p>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {options.map((opt) => {
            const categoryLabel = getCategoryLabel(opt.category)
            const title =
              opt.category === 'residential' && opt.subType === 'apartment'
                ? `${categoryLabel} · Apartment · ${opt.label}`
                : `${categoryLabel} · ${getSubTypeLabel(opt.subType)}`

            return (
              <div key={opt.key} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="mt-0.5 text-xs text-slate-600">Tap enquire to share this preference with the advisory desk.</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900"
                  onClick={() =>
                    onEnquire?.({
                      category: opt.category,
                      subType: opt.subType,
                      apartmentConfig: opt.apartmentConfig,
                    })
                  }
                >
                  Enquire
                </button>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

