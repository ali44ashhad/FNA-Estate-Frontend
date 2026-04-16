const ACCESS_TOKEN_KEY = 'accessToken'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || null
}

export function setAccessToken(token) {
  if (!token) return
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

