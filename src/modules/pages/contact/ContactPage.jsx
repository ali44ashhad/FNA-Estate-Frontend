import StaticPageLayout from '../../../shared/components/StaticPageLayout.jsx'

export default function ContactPage() {
  return (
    <StaticPageLayout
      title="Contact us"
      subtitle="Reach the advisory desk for inventory checks, site visits, and documentation support."
    >
      <p>
        Use the form below for a callback. For urgent walk-ins, call the desk number listed — hours are indicative and may change during
        holidays.
      </p>
      <div className="not-prose mt-8 grid gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Office</h2>
          <p className="mt-2 text-sm text-slate-600">
            FNA Estate Advisory
            <br />
            Tower Astralis, Sector 94
            <br />
            Noida, Uttar Pradesh 201301
            <br />
            India
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <strong className="text-slate-800">Phone:</strong> +91 120 0000 0000
            <br />
            <strong className="text-slate-800">Email:</strong> hello@fnaestate.example
          </p>
          <p className="mt-3 text-xs text-slate-500">Replace placeholders with your production contact details.</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800">
              Full name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-800">
              Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-slate-800">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              placeholder="City, budget range, and property type help us respond faster."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-800 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 sm:w-auto sm:px-8"
          >
            Submit enquiry
          </button>
        </form>
      </div>
    </StaticPageLayout>
  )
}
