import { useMemo, useState } from 'react'

function normalizeImages(images) {
  if (!Array.isArray(images)) return []
  return images
    .map((x) => (typeof x === 'string' ? x.trim() : ''))
    .filter(Boolean)
}

export default function ProjectImageGallery({ images }) {
  const items = useMemo(() => normalizeImages(images), [images])
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(() => new Set())

  const activeSrc = items[active] || ''

  if (!items.length) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 via-emerald-50/80 to-slate-200" />
        <div className="border-t border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-800">Photos</p>
          <p className="mt-1 text-sm text-slate-600">No images available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 via-emerald-50/80 to-slate-200">
        {activeSrc && !failed.has(activeSrc) ? (
          <img
            src={activeSrc}
            alt="Project"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => {
              setFailed((prev) => {
                const next = new Set(prev)
                next.add(activeSrc)
                return next
              })
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="border-t border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-800">Photos</p>
          <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
            {items.slice(0, 12).map((src, idx) => {
              const isActive = idx === active
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                    isActive ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-emerald-200'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  {!failed.has(src) ? (
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        setFailed((prev) => {
                          const next = new Set(prev)
                          next.add(src)
                          return next
                        })
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

