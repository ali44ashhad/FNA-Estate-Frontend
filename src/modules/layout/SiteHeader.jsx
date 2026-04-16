import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from '../../shared/components/Container.jsx'
import { ROUTES } from '../../shared/constants/routes.js'
import { navCities, navProjects } from '../home/data/homeContent.js'

function ChevronDown({ className = '' }) {
  return (
    <svg className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname === ROUTES.login || pathname === ROUTES.signup) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Link to={ROUTES.home} className="flex shrink-0 items-center gap-2">
        
          <span className="text-lg font-bold tracking-tight text-slate-900">Estate</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-700 lg:flex" aria-label="Primary">
          <Link className="rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-emerald-800" to={ROUTES.home}>
            Home
          </Link>
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-emerald-800"
            >
              Projects
              <ChevronDown />
            </button>
            <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="min-w-[12rem] rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                {navProjects.map((item) => (
                  <Link
                    key={item}
                    to={`${ROUTES.home}#projects`}
                    className="block px-4 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-900"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-emerald-800"
            >
              City
              <ChevronDown />
            </button>
            <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="max-h-72 min-w-[14rem] overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                {navCities.map((city) => (
                  <Link
                    key={city}
                    to={`${ROUTES.home}#cities`}
                    className="block px-4 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-900"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link className="rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-emerald-800" to={ROUTES.blog}>
            Blog
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-emerald-800" to={ROUTES.whoWeAre}>
            Who we are
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-emerald-800" to={ROUTES.contact}>
            Contact us
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="text-sm font-medium text-slate-600 hover:text-emerald-800"
            aria-label="Wishlist"
          >
            Wishlist <span className="text-slate-400">0</span>
          </button>
          <Link to={ROUTES.login} className="text-sm font-medium text-slate-600 hover:text-emerald-800">
            Log in
          </Link>
          <Link
            to={ROUTES.signup}
            className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
          >
            Sign up
          </Link>
          <Link
            to={ROUTES.contact}
            className="rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </Container>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <Link to={ROUTES.home} className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link
              to={ROUTES.login}
              className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </Link>
            <Link
              to={ROUTES.signup}
              className="rounded-lg px-3 py-2 font-semibold text-emerald-800 hover:bg-emerald-50"
              onClick={() => setMobileOpen(false)}
            >
              Sign up
            </Link>
            <Link
              to={`${ROUTES.home}#projects`}
              className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              Projects
            </Link>
            <Link
              to={`${ROUTES.home}#cities`}
              className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              Cities
            </Link>
            <Link to={ROUTES.blog} className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
            <Link
              to={ROUTES.whoWeAre}
              className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              Who we are
            </Link>
            <Link
              to={ROUTES.contact}
              className="rounded-lg px-3 py-2 font-semibold text-emerald-800 hover:bg-emerald-50"
              onClick={() => setMobileOpen(false)}
            >
              Contact us
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
