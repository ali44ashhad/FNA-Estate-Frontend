import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  projects = [],
  loading = false,
  error = '',
  viewAllHref = '#projects',
  variant = 'dark',
}) {
  // Track the currently hovered project index. Default to 0 so the first card is open initially.
  const [hoveredIndex, setHoveredIndex] = useState(0)

  // Use the premium dark background from your image
  const bg = variant === 'dark' ? 'bg-[#0b0f09]' : 'bg-slate-50'

  return (
    <section id={id} className={`scroll-mt-20 py-20 text-white transition-colors duration-300 ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="text-xs font-semibold tracking-widest text-lime-400 uppercase mb-2 block">
                {eyebrow}
              </span>
            )}
            <h2 className="text-4xl font-normal tracking-tight text-[#007A55] sm:text-5xl lg:text-6xl font-sans leading-tight">
              {title || "Discover luxury living at an affordable price"}
            </h2>
            {subtitle && <p className="mt-4 text-lg text-neutral-400">{subtitle}</p>}
          </div>

          <div>
            <a
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full bg-white pl-6 pr-2 py-2 text-sm font-medium text-black transition-all hover:bg-neutral-200 group whitespace-nowrap"
            >
              View All Projects
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-black transition-transform group-hover:rotate-45">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Error State */}
        {error ? (
          <div className="rounded-2xl border border-rose-900/50 bg-rose-950/20 p-4 text-rose-200">
            <p className="font-semibold">Couldn’t load projects</p>
            <p className="mt-1 text-sm text-rose-400/80">{error}</p>
          </div>
        ) : null}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col md:flex-row gap-4 h-[550px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className="h-full flex-1 animate-pulse rounded-3xl bg-neutral-900/50 border border-neutral-800" 
              />
            ))}
          </div>
        ) : (
          /* Interactive Expanding Accordion List */
          <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full select-none overflow-hidden py-2">
            {projects.map((p, index) => {
              const isHovered = hoveredIndex === index

              return (
                <motion.div
                  key={p.id || index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`relative h-full rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 bg-neutral-900 transition-all duration-500 ease-out flex-1`}
                  style={{
                    // Use flexbox distribution for width adjustment instead of absolute tracking
                    flexGrow: isHovered ? 3.5 : 1
                  }}
                >
                  {/* Background Image Container */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={p.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 brightness-[0.75] contrast-[1.05]"
                    />
                    {/* Dark overlay gradients matching image look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
                  </div>

                  {/* Content layout wrapper changing based on view state */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    
                    {/* Top Section Info (Shows only when card is expanded on desktop/tablet views) */}
                    <div className="hidden md:block">
                      <AnimatePresence>
                        {isHovered && p.location && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-1.5 text-white/80 text-sm font-medium"
                          >
                            <svg className="text-lime-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {p.location}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom / Side Title Section */}
                    <div className="relative w-full h-full md:h-auto flex items-center justify-center md:block">
                      {isHovered ? (
                        /* Expanded Content Layout */
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="absolute md:relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:left-auto md:translate-x-0 md:translate-y-0 flex flex-col items-center text-center md:items-start md:text-left gap-4 w-full px-4 md:px-0"
                        >
                          {/* Location included in center cluster for cleaner mobile layout spacing */}
                          {p.location && (
                            <div className="flex md:hidden items-center justify-center gap-1.5 text-white/80 text-xs font-medium">
                              <svg className="text-lime-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              {p.location}
                            </div>
                          )}

                          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white max-w-xs leading-tight">
                            {p.title}
                          </h3>
                          
                          {p.to && (
                            <a
                              href={p.to}
                              className="inline-flex items-center gap-2 rounded-full bg-white pl-5 pr-2 py-2 text-xs font-semibold text-black transition-transform hover:scale-105 mt-2 shadow-md"
                            >
                              Explore Project
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-black">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <line x1="7" y1="17" x2="17" y2="7"></line>
                                  <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                              </span>
                            </a>
                          )}
                        </motion.div>
                      ) : (
                        /* Collapsed Vertical Title Layout */
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 origin-bottom-left rotate-[-90deg] whitespace-nowrap text-xl sm:text-2xl font-medium text-white/90 tracking-wide translate-y-[-20px]"
                          style={{ width: 'max-content' }}
                        >
                          {p.title}
                        </motion.div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}