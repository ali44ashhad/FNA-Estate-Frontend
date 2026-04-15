import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on client-side route changes (replacement for ScrollRestoration with BrowserRouter). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
