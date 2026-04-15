import StaticPageLayout from '../../../shared/components/StaticPageLayout.jsx'

export default function WhoWeArePage() {
  return (
    <StaticPageLayout
      title="Who we are"
      subtitle="FNA Estate is a full-stack property advisory focused on transparency, compliance, and outcomes for buyers and investors."
    >
      <p>
        We help you shortlist the right inventory — residential towers, commercial assets, and plotted developments — across the corridors
        we actively track. Our team combines on-ground market intelligence with structured documentation support so you can move from
        discovery to booking with clarity.
      </p>
      <h2>What we do</h2>
      <ul>
        <li>Project comparison across location, developer delivery, and pricing benchmarks</li>
        <li>Site visits, inventory checks, and negotiation support</li>
        <li>Coordination with home loan partners and legal documentation workflows</li>
      </ul>
      <h2>How we work</h2>
      <p>
        We begin with your budget, timeline, and purpose (self-use vs investment). We then map eligible micro-markets, filter RERA-listed
        options, and present a concise shortlist — not an endless catalogue.
      </p>
      <h2>Disclaimer</h2>
      <p>
        Project information on this website is indicative and may change. Final terms, pricing, and inventory are governed by the
        developer&apos;s agreement and applicable law. Always verify RERA registration and approvals independently before transacting.
      </p>
    </StaticPageLayout>
  )
}
