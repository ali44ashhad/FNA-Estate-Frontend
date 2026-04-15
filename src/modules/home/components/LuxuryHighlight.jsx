import Container from '../../../shared/components/Container.jsx'

export default function LuxuryHighlight() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-16 text-white">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Spotlight</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Most luxurious project</h2>
          <p className="mt-4 text-slate-300">
            Ultra-luxury residences with curated amenities, concierge-style service, and strong location fundamentals — handpicked for
            serious buyers.
          </p>
          <a
            href="#projects"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-100"
          >
            Book a private walkthrough
          </a>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-sm text-emerald-200/90">Presented as advisory</p>
          <p className="mt-2 text-lg font-semibold">Premium inventory · Limited keys</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>✓ RERA-verified documentation support</li>
            <li>✓ End-to-end site visits &amp; negotiation</li>
            <li>✓ Home loan &amp; legal coordination</li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
