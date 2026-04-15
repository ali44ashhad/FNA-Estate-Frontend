import { useState } from 'react'
import Container from '../../../shared/components/Container.jsx'

const categories = ['Residential', 'Commercial', 'Plots']

export default function HeroSection() {
  const [active, setActive] = useState('Residential')

  return (
    <section id="home" className="relative overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.2), transparent 40%), linear-gradient(180deg, rgba(15,23,42,0.2), rgba(15,23,42,0.95))',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" aria-hidden />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-300/90">India&apos;s trusted property partner</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Find your dream home</h1>
          <p className="mt-4 text-lg text-slate-300">Search premium residential, commercial, and plotted inventory in top corridors.</p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  active === cat
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/95 p-2 shadow-xl backdrop-blur sm:flex-row sm:items-center">
            <label htmlFor="hero-search" className="sr-only">
              Search localities or projects
            </label>
            <input
              id="hero-search"
              type="search"
              placeholder={`Search ${active.toLowerCase()} in Noida, Gurugram…`}
              className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
            <button
              type="button"
              className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Search
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
