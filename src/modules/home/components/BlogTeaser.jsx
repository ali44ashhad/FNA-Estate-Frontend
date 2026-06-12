import { Link } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'

const posts = [
  {
    slug: 'rera-checklist',
    title: 'How to read a RERA registration before you book',
    excerpt: 'A definitive checklist for first-time homebuyers navigating state disclosures.',
    id: '1',
    readTime: '4 min read'
  },
  {
    slug: 'ncr-bengaluru-yields',
    title: 'NCR vs Bengaluru: where yields look healthier',
    excerpt: 'Deep-dive market notes for investors comparing micro-market rental corridors.',
    id: '2',
    readTime: '6 min read'
  },
  {
    slug: 'plot-due-diligence',
    title: 'Plot due diligence in 10 minutes',
    excerpt: 'Unpacking land title search, zoning laws, and developer track record verification.',
    id: '3',
    readTime: '3 min read'
  },
]

export default function BlogTeaser() {
  return (
    <section id="blog" className="scroll-mt-20 bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <Container>
        {/* Header Section */}
        <div className="mb-14 border-b border-slate-100 pb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
              Perspectives
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              From our blog
            </h2>
            <p className="max-w-xl text-base text-slate-500 leading-relaxed">
              Expertly curated, practical intelligence for buyers, institutional investors, and NRIs.
            </p>
          </div>
          
          <Link 
            to={ROUTES.blog} 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-950"
          >
            <span>View all articles</span>
            <svg 
              className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Responsive Grid System */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/60 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-600/20 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)]"
            >
              <div>
                {/* Meta details */}
                <div className="mb-4 flex items-center justify-between text-xs font-medium text-slate-400">
                  <span>Insight</span>
                  <span>{post.readTime}</span>
                </div>
                
                {/* Interactive Header Link */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-emerald-900">
                  <Link to={`${ROUTES.blog}#${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

            
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}