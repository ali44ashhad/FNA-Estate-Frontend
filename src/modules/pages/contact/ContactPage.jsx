import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi'

export default function ContactPage() {
  const [searchParams] = useSearchParams()

  const prefillMessage = useMemo(() => {
    const projectId = searchParams.get('projectId') || ''
    const projectName = searchParams.get('projectName') || ''
    const category = searchParams.get('category') || ''
    const subType = searchParams.get('subType') || ''
    const apartmentConfig = searchParams.get('apartmentConfig') || ''

    const parts = []
    if (projectName.trim()) parts.push(`Project: ${projectName.trim()}`)
    if (category.trim() || subType.trim()) {
      const tail = [category.trim(), subType.trim(), apartmentConfig.trim()].filter(Boolean).join(' / ')
      if (tail) parts.push(`Preference: ${tail}`)
    }
    if (projectId.trim()) parts.push(`Project ID: ${projectId.trim()}`)

    if (!parts.length) return ''
    return `Hi team,\n\nI’d like to enquire about:\n- ${parts.join('\n- ')}\n\nPlease share the latest availability and next steps.\n`
  }, [searchParams])

  const [message, setMessage] = useState(prefillMessage)

  // Motion variants for stagger effects on form fields
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Subtitle Desk Message */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="not-prose text-slate-600 font-sans mt-2 w-[100%] max-w-none leading-relaxed font-light text-base sm:text-lg"
      >
        <p>
          Use the form below for a callback. For urgent walk-ins, call the desk number listed — hours are indicative and may change during holidays.
        </p>
      </motion.div>

      {/* Absolute 100% Full-width Responsive Split Contact Section */}
      <div className="not-prose mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-[100%] max-w-none relative z-10 selection:bg-emerald-50 selection:text-emerald-950">
        
        {/* Left Column: Fixed Width Office Information & Channels */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="lg:col-span-5 space-y-5 flex flex-col justify-between w-[100%]"
        >
          {/* Primary Address Block */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs hover:border-[#004F3B]/30 transition-all duration-300 w-[100%]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#004F3B] shrink-0">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters</h2>
                <h3 className="text-xl font-semibold text-slate-900 mt-1 mb-3">Office</h3>
                <p className="text-base font-light text-slate-600 leading-relaxed">
                  <strong className="font-semibold text-slate-800 block not-italic mb-1">FNA Estate Advisory</strong>
                  Tower Astralis, Sector 94<br />
                  Noida, Uttar Pradesh 201301<br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Electronic Hotline & Communications Hub */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs hover:border-[#004F3B]/30 transition-all duration-300 w-[100%]">
            <div className="flex flex-col gap-4">
              
              {/* Phone Contact Layer */}
              <a 
                href="tel:+9112000000000"
                className="flex items-center gap-4 group rounded-xl p-2 -m-2 transition-colors hover:bg-slate-50/50 w-[100%]"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#004F3B] shrink-0 group-hover:bg-[#004F3B]/5 transition-colors duration-200">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone</span>
                  <span className="text-base font-semibold text-slate-800 group-hover:text-[#004F3B] transition-colors duration-200">
                    +91 120 0000 0000
                  </span>
                </div>
              </a>

              <div className="h-[1px] bg-slate-100 w-full" />

              {/* Email Contact Layer */}
              <a 
                href="mailto:hello@fnaestate.example"
                className="flex items-center gap-4 group rounded-xl p-2 -m-2 transition-colors hover:bg-slate-50/50 w-[100%]"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#004F3B] shrink-0 group-hover:bg-[#004F3B]/5 transition-colors duration-200">
                  <FiMail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Email</span>
                  <span className="text-base font-semibold text-slate-800 group-hover:text-[#004F3B] transition-colors duration-200 truncate block max-w-[200px] sm:max-w-xs">
                    hello@fnaestate.example
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Disclaimer Dynamic Operational Bar */}
          <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-100/50 flex items-start gap-3 text-xs text-slate-500 font-light w-[100%]">
            <FiClock className="text-[#004F3B] w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Replace placeholders with your production contact details. Desk operational timelines apply to standard business routing layers.
            </span>
          </div>
        </motion.div>

        {/* Right Column: Matched Form Container spanning full layout remaining width */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs hover:shadow-[0_20px_40px_rgba(0,79,59,0.03)] transition-all duration-300 w-[100%]"
        >
          <motion.form 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-5" 
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-[100%]">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-2xs transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#004F3B] focus:outline-none focus:ring-1 focus:ring-[#004F3B]"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-2xs transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#004F3B] focus:outline-none focus:ring-1 focus:ring-[#004F3B]"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-2xs transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#004F3B] focus:outline-none focus:ring-1 focus:ring-[#004F3B]"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-2xs transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-[#004F3B] focus:outline-none focus:ring-1 focus:ring-[#004F3B] resize-none"
                placeholder="City, budget range, and property type help us respond faster."
              />
            </motion.div>

            {/* Form Action Button using #004F3B Brand Accent */}
            <motion.div variants={itemVariants} className="pt-2 flex justify-start w-[100%]">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#004F3B] hover:bg-[#003829] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-950/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
              >
                <span>Submit enquiry</span>
                <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

      </div>
    </div>
  )
}