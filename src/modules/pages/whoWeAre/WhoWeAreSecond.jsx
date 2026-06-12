import React from 'react'

export default function RealEstateHighlights() {
  // Static data array configured with your exact layout schema
  const items = [
    {
      id: "01.",
      title: "What we do",
      description: "We maintain this by ensuring transparency and professional conduct in every aspect.",
      linkText: "Our Solutions",
      href: "#solutions",
      variant: "dark-black" // First block: Blackish theme
    },
    {
      id: "02.",
      title: "Our impact",
      description: "We work with both investors and developers to create landmarks that make an impact.",
      linkText: "See Projects",
      href: "#projects",
      variant: "corporate-green", // Second block: Your custom #004F3B corporate green
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "03.",
      title: "Core values",
      description: "To empower businesses with cutting-edge web solutions that enhance their digital presence and drive growth.",
      linkText: "Discover More",
      href: "#values",
      variant: "image-bg", // Third block: As-is with image background
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    }
  ]

  return (
    <section id="highlights" className="scroll-mt-20 bg-white py-20 text-neutral-950 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-neutral-700">
            RE • WHO WE WE
          </div>
          
          <h2 className="max-w-3xl font-sans text-4xl font-normal leading-[1.15] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl lg:text-right">
            We developed landmark <br className="hidden sm:inline" /> real estate projects
          </h2>
        </div>

        {/* Responsive Cards Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            
            // Explicitly handling the distinct card styles
            const isDarkBlack = item.variant === 'dark-black'
            const isCorporateGreen = item.variant === 'corporate-green'
            const isImageBg = item.variant === 'image-bg'

            return (
              <div
                key={index}
                className={`relative flex h-[500px] flex-col justify-between overflow-hidden p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1
                  ${isDarkBlack ? 'bg-[#121610] text-white' : ''}
                  ${isCorporateGreen ? 'bg-[#004F3B] text-white' : ''}
                  ${isImageBg ? 'bg-neutral-900 text-white' : ''}
                  rounded-[2.5rem] rounded-br-none
                `}
              >
                {/* Background Image Setup for Card 3 */}
                {isImageBg && item.imageUrl && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover brightness-[0.45] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                )}

                {/* Top Numbering and Line Structure */}
                <div className="relative z-10 w-full">
                  <div className="flex flex-col gap-4">
                    <span className="text-sm font-semibold tracking-wider text-emerald-400">
                      {item.id}
                    </span>
                    <hr className="w-full border-white opacity-20" />
                  </div>
                </div>

                {/* Cropped Architectural Image Component (Unique layout for Card 2) */}
                {isCorporateGreen && item.imageUrl && (
                  <div className="absolute inset-x-0 bottom-0 z-0 h-[42%] w-full overflow-hidden px-6">
                    <img
                      src={item.imageUrl}
                      alt="Architecture showcase"
                      className="h-full w-full rounded-t-3xl object-cover object-center"
                    />
                  </div>
                )}

                {/* Bottom Content Area */}
                <div className={`relative z-10 mt-auto flex flex-col items-start ${isCorporateGreen ? 'mb-[45%]' : ''}`}>
                  <h3 className="font-sans text-3xl font-medium tracking-tight sm:text-4xl">
                    {item.title}
                  </h3>
                  
                  <p className="mt-4 text-sm leading-relaxed text-neutral-300 max-w-[290px] sm:max-w-xs">
                    {item.description}
                  </p>

                  <a
                    href={item.href}
                    className="mt-6 inline-block text-sm font-semibold text-white underline underline-offset-4 transition-opacity hover:opacity-80"
                  >
                    {item.linkText}
                  </a>
                </div>

                {/* Premium Floating Corner Action Button */}
                <div className="absolute bottom-0 right-0 z-20 flex h-14 w-14 items-center justify-center rounded-tl-[2rem] bg-white">
                  <a
                    href={item.href}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400 text-[#004F3B] transition-transform hover:scale-105"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}