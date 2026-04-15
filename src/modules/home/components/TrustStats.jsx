import Container from '../../../shared/components/Container.jsx'
import { trustStats } from '../data/homeContent.js'

export default function TrustStats() {
  return (
    <section className="border-b border-slate-200 bg-white py-10" aria-label="Company highlights">
      <Container>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustStats.map((item) => (
            <li key={item.label} className="text-center">
              <p className="text-2xl font-bold text-emerald-800 sm:text-3xl">
                {item.value}
                <span className="text-emerald-600">{item.suffix}</span>
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
