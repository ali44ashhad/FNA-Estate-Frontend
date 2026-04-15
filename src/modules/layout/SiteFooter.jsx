import { Link } from 'react-router-dom'
import Container from '../../shared/components/Container.jsx'
import { ROUTES } from '../../shared/constants/routes.js'

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
            
              <span className="text-lg font-bold text-white">Estate</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Trusted real estate advisory for residential, commercial, and plotted developments across major Indian cities.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={ROUTES.whoWeAre} className="hover:text-white">
                  Who we are
                </Link>
              </li>
              <li>
                <Link to={ROUTES.featuredProjects} className="hover:text-white">
                  Featured projects
                </Link>
              </li>
              <li>
                <Link to={ROUTES.blog} className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={ROUTES.contact} className="hover:text-white">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={ROUTES.terms} className="hover:text-white">
                  Terms &amp; conditions
                </Link>
              </li>
              <li>
                <Link to={ROUTES.privacy} className="hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to={ROUTES.faq} className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div id="details">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Details</h3>
            <div className="space-y-4 text-sm text-slate-400">
              <div> 
                <p className="mt-1 leading-relaxed">
                First-floor, SCO 52, Sector 82, JLPL Industrial Area, Punjab 140308
                </p>
              </div>

              <div> 
                <p className="mt-1">
                  <a className="underline decoration-slate-600 underline-offset-4 hover:text-white" href="tel:+911200000000">
                    +91 120 0000 0000
                  </a>
                  <br />
                  <a
                    className="underline decoration-slate-600 underline-offset-4 hover:text-white"
                    href="mailto:hello@fnaestate.example"
                  >
                    hello@fnaestate.example
                  </a>
                </p>
              </div>
 
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-slate-800 pt-8 text-xs leading-relaxed text-slate-500">
          <strong className="text-slate-400">Disclaimer:</strong> Information on this website is provided for general guidance. Project
          details, pricing, inventory, and timelines may change and are subject to confirmation by the developer. This website does
          not constitute an offer or agreement. Please verify RERA registration and approvals independently and refer to our{' '}
          <Link to={ROUTES.terms} className="text-emerald-300 underline hover:text-emerald-200">
            Terms &amp; conditions
          </Link>{' '}
          for more.
        </p>
        <p className="mt-4 text-center text-xs text-slate-600">© {new Date().getFullYear()} Estate. All rights reserved.</p>
      </Container>
    </footer>
  )
}
