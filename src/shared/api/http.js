import { getAccessToken } from '../auth/authStorage.js'

const DEFAULT_API_BASE_URL = 'http://localhost:5008'

function getApiBaseUrl() {
  const raw = import.meta.env?.VITE_API_BASE_URL
  if (typeof raw !== 'string' || !raw.trim()) return DEFAULT_API_BASE_URL
  return raw.replace(/\/+$/, '')
}

export async function request(path, { method = 'GET', body, auth = false } = {}) {
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
    throw new Error(message)
  }

  return data
}

