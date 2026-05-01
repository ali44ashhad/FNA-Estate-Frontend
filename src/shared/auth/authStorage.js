const ACCESS_TOKEN_KEY = 'accessToken'
const AUTH_EVENT_NAME = 'auth:token'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || null
}

export function setAccessToken(token) {
  if (!token) return
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
  window.dispatchEvent(new Event(AUTH_EVENT_NAME))
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT_NAME))
}

export function subscribeAccessToken(cb) {
  const onChange = () => cb?.()
  window.addEventListener(AUTH_EVENT_NAME, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(AUTH_EVENT_NAME, onChange)
    window.removeEventListener('storage', onChange)
  }
}

