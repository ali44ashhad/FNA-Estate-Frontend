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
 *  // New schema filters (preferred)
 *  category?: 'residential'|'commercial'|string,
 *  subType?: string,
 *  apartmentConfig?: string,
 *
 *  // Legacy filter (server maps it for backward compatibility)
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
  void project
  // Public Project APIs no longer return pricing fields.
  return 'Price on Request'
}

