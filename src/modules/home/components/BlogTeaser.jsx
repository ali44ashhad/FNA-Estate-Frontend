import { Link } from 'react-router-dom'
import Container from '../../../shared/components/Container.jsx'
import { ROUTES } from '../../../shared/constants/routes.js'

const posts = [
  {
    slug: 'rera-checklist',
    title: 'How to read a RERA registration before you book',
    excerpt: 'A short checklist for first-time buyers.',
    id: '1',
  },
  {
    slug: 'ncr-bengaluru-yields',
    title: 'NCR vs Bengaluru: where yields look healthier',
    excerpt: 'Market notes for investors comparing corridors.',
    id: '2',
  },
  {
    slug: 'plot-due-diligence',
    title: 'Plot due diligence in 10 minutes',
    excerpt: 'Title, zoning, and developer track record.',
    id: '3',
  },
]

export default function BlogTeaser() {
  return (
    <section id="blog" className="scroll-mt-20 bg-slate-50 py-16">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Insights</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">From our blog</h2>
            <p className="mt-2 max-w-xl text-slate-600">Practical guides for buyers, investors, and NRIs.</p>
          </div>
          <Link to={ROUTES.blog} className="text-sm font-semibold text-emerald-800 hover:underline">
            View all articles
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <Link
                to={`${ROUTES.blog}#${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-emerald-800 hover:underline"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
