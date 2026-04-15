import Container from '../../../shared/components/Container.jsx'
import { builderNames } from '../data/homeContent.js'

export default function BuildersStrip() {
  return (
    <section className="border-y border-slate-200 bg-white py-14" aria-label="Partner developers">
      <Container>
        <h2 className="mb-8 text-center text-xl font-bold text-slate-900 sm:text-2xl">Our network builders</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-slate-600">
          Committed to quality, integrity, and on-time delivery — curated partnerships across leading developers.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {builderNames.map((name) => (
            <li
              key={name}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
