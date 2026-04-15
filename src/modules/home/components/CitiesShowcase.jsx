import Container from '../../../shared/components/Container.jsx'
import SectionHeading from '../../../shared/components/SectionHeading.jsx'
import { popularCities } from '../data/homeContent.js'

export default function CitiesShowcase() {
  return (
    <section id="cities" className="scroll-mt-20 bg-white py-16">
      <Container>
        <SectionHeading
          eyebrow="Locations"
          title="Most popular cities"
          subtitle="Explore inventory and RERA-registered options in corridors we actively cover."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularCities.map((city) => (
            <a
              key={city.name}
              href="#contact"
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-emerald-300 hover:bg-white hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-800">{city.name}</h3>
              <p className="mt-2 line-clamp-2 text-xs text-slate-500">RERA: {city.rera}</p>
              <span className="mt-3 inline-block text-sm font-medium text-emerald-700">View localities →</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
