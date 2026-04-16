const GIS_SRC = 'https://accounts.google.com/gsi/client'

function loadScriptOnce() {
  if (document.querySelector(`script[src="${GIS_SRC}"]`)) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GIS_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google sign-in'))
    document.head.appendChild(script)
  })
}

export async function requestGoogleAuthCode() {
  const clientId = import.meta.env?.VITE_GOOGLE_CLIENT_ID
  if (typeof clientId !== 'string' || !clientId.trim()) {
    throw new Error('Missing VITE_GOOGLE_CLIENT_ID')
  }

  await loadScriptOnce()

  const google = window.google
  if (!google?.accounts?.oauth2?.initCodeClient) {
    throw new Error('Google sign-in is unavailable')
  }

  return await new Promise((resolve, reject) => {
    const client = google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: 'openid email profile',
      ux_mode: 'popup',
      redirect_uri: window.location.origin,
      callback: (response) => {
        if (!response?.code) reject(new Error('Google sign-in was cancelled'))
        else resolve(response.code)
      },
      error_callback: () => reject(new Error('Google sign-in failed')),
    })

    client.requestCode()
  })
}

