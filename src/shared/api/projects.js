import { request } from './http.js'

function toQuery(params) {
  const qs = new URLSearchParams()
  for (const [k, v] of Object.entries(params || {})) {
    if (v === undefined || v === null) continue
    if (typeof v === 'string' && !v.trim()) continue
    qs.set(k, String(v))
  }
  const s = qs.toString()
  return s ? `?${s}` : ''
}

/**
 * @param {{
 *  propertyType?: 'apartment'|'plot'|'villa'|string,
 *  cityId?: string,
 *  minPrice?: number,
 *  maxPrice?: number,
 *  page?: number,
 *  limit?: number,
 * }} filters
 */
export async function listProjects(filters = {}) {
  const res = await request(`/api/projects${toQuery(filters)}`)
  return {
    items: Array.isArray(res?.data) ? res.data : [],
    meta: res?.meta || null,
  }
}

export async function getProjectById(id) {
  const safeId = typeof id === 'string' ? id.trim() : ''
  if (!safeId) throw new Error('Invalid project id')
  const res = await request(`/api/projects/${encodeURIComponent(safeId)}`)
  return res?.data || null
}

export function formatPriceLabel(project) {
  if (!project || typeof project !== 'object') return 'Price on Request'

  if (project.pricingType === 'direct' && project.price && typeof project.price === 'object') {
    const min = project.price.min
    const max = project.price.max
    if (Number.isFinite(min) && Number.isFinite(max)) return `₹${min.toLocaleString()}–₹${max.toLocaleString()}`
  }

  if (project.pricingType === 'unit_based' && Array.isArray(project.units)) {
    const mins = project.units.map((u) => u?.minPrice).filter((n) => Number.isFinite(n))
    const maxs = project.units.map((u) => u?.maxPrice).filter((n) => Number.isFinite(n))
    if (mins.length && maxs.length) {
      const min = Math.min(...mins)
      const max = Math.max(...maxs)
      return `₹${min.toLocaleString()}–₹${max.toLocaleString()}`
    }
  }

  return 'Price on Request'
}

