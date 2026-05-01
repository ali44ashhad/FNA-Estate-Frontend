import { clearAccessToken, getAccessToken, setAccessToken } from '../auth/authStorage.js'

const DEFAULT_API_BASE_URL = 'http://localhost:5008'

function getApiBaseUrl() {
  const raw = import.meta.env?.VITE_API_BASE_URL
  if (typeof raw !== 'string' || !raw.trim()) return DEFAULT_API_BASE_URL
  return raw.replace(/\/+$/, '')
}

let refreshPromise = null

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const url = `${getApiBaseUrl()}/api/auth/refresh`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const text = await res.text()
    const data = text ? JSON.parse(text) : null

    if (!res.ok) {
      const message = data?.message || `Request failed (${res.status})`
      const err = new Error(message)
      err.status = res.status
      err.data = data
      throw err
    }

    const token = data?.data?.accessToken
    if (token) setAccessToken(token)
    return token || null
  })()

  try {
    return await refreshPromise
  } finally {
    refreshPromise = null
  }
}

async function requestOnce(path, { method = 'GET', body, auth = false } = {}) {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`

  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method,
    headers,
    credentials: 'include',
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

export async function request(path, opts = {}) {
  const { auth = false } = opts || {}

  try {
    return await requestOnce(path, opts)
  } catch (err) {
    const status = err && typeof err === 'object' ? err.status : undefined
    const isRefreshEndpoint = typeof path === 'string' && path.replace(/\/+$/, '') === '/api/auth/refresh'

    if (!auth || isRefreshEndpoint || status !== 401) throw err

    try {
      const next = await refreshAccessToken()
      if (!next) throw err
      return await requestOnce(path, opts)
    } catch (refreshErr) {
      clearAccessToken()
      throw refreshErr
    }
  }
}

