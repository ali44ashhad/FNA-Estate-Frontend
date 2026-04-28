import { PROJECT_PROPERTY_TYPES } from '../../../shared/constants/projectTypes.js'
import { formatPriceLabel } from '../../../shared/api/projects.js'

export function projectToCardProps(p) {
  const name = typeof p?.name === 'string' && p.name.trim() ? p.name.trim() : 'Project'
  const cityName = p?.city?.name
  const cityState = p?.city?.state
  const images = Array.isArray(p?.images) ? p.images : []
  const imageUrl = images.find((x) => typeof x === 'string' && x.trim())?.trim() || ''

  const location =
    typeof cityName === 'string' && typeof cityState === 'string'
      ? `${cityName}, ${cityState}`
      : typeof cityName === 'string'
        ? cityName
        : '—'

  const typeLabel = PROJECT_PROPERTY_TYPES[p?.propertyType] || 'Project'
  const status = typeof p?.status === 'string' && p.status.trim() ? p.status.trim() : null
  const badge = status ? `${typeLabel} · ${status}` : typeLabel

  return {
    id: p?.id,
    title: name,
    location,
    badge,
    priceLabel: formatPriceLabel(p),
    imageUrl,
    to: p?.id ? `/projects/${encodeURIComponent(String(p.id))}` : '',
  }
}

