import { Outlet } from 'react-router-dom'
import SiteHeader from '../modules/layout/SiteHeader.jsx'
import SiteFooter from '../modules/layout/SiteFooter.jsx'
import ScrollToTop from '../shared/components/ScrollToTop.jsx'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <ScrollToTop />
      <SiteHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  )
}
