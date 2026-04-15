import Container from '../../../shared/components/Container.jsx'

const faqs = [
  {
    q: 'Do you charge buyers a fee?',
    a: 'Compensation structures vary by project and corridor. We explain fees transparently before you proceed with a specific developer booking.',
  },
  {
    q: 'Can you help with home loans?',
    a: 'We coordinate introductions to partner banks and NBFCs. Credit approval, rates, and documentation remain between you and the lender.',
  },
  {
    q: 'Is RERA verification included?',
    a: 'We guide you on what to verify on the RERA portal and highlight discrepancies we notice in filed documents versus marketing claims. Independent legal review is still recommended.',
  },
  {
    q: 'Do you support NRI buyers?',
    a: 'Yes — remote shortlisting, video walkthroughs, and documentation checklists are common. Final agreements may require PoA or in-person steps depending on developer policy.',
  },
  {
    q: 'What cities do you cover?',
    a: 'Our public listings focus on major corridors (for example NCR, Jaipur, Pune, Bengaluru). Reach out for the latest active micro-markets.',
  },
]

export default function FaqPage() {
  return (
    <article className="min-h-[60vh] bg-white py-12 sm:py-16">
      <Container>
        <header className="mb-10 max-w-3xl border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">FAQ</h1>
          <p className="mt-3 text-lg text-slate-600">Quick answers about how FNA Estate works with buyers and investors.</p>
        </header>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 open:bg-white open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-2">
                  {item.q}
                  <span className="text-emerald-700 transition group-open:rotate-180" aria-hidden>
                    ▼
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </article>
  )
}
