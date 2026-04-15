import { Link } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'

export default function AboutStrip() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-slate-200 bg-white py-16">
      <Container className="max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">About FNA Estate</h2>
        <p className="mt-4 text-slate-600">
          We help families and investors shortlist the right projects — with transparent comparisons, on-ground support, and a focus on
          compliance. This landing is a UI shell; wire your APIs from the FNA Estate backend when you are ready.
        </p>
        <Link
          to={ROUTES.whoWeAre}
          className="mt-6 inline-flex rounded-full border border-emerald-800 px-5 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-800 hover:text-white"
        >
          Who we are
        </Link>
      </Container>
    </section>
  )
}
