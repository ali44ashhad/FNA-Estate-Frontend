import Container from './Container.jsx'

export default function StaticPageLayout({ title, subtitle, children }) {
  return (
    <article className="min-h-[60vh] bg-white py-12 sm:py-16">
      <Container>
        <header className="mb-10 mx-auto max-w-3xl border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          {subtitle ? <p className="mt-3 text-lg text-slate-600">{subtitle}</p> : null}
        </header>
        <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-slate-700 [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2:first-child]:mt-0 [&>h3]:mt-6 [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-slate-900 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:mt-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ul>li]:mt-1 [&>ol>li]:mt-1 [&>a]:font-medium [&>a]:text-emerald-800 [&>a]:underline hover:[&>a]:text-emerald-950">
          {children}
        </div>
      </Container>
    </article>
  )
}
