import React from 'react';
import Container from '../../../shared/components/Container.jsx';
import SectionHeading from '../../../shared/components/SectionHeading.jsx';
import { popularCities } from '../data/homeContent.js';

export default function CitiesShowcase() {
  return (
    <section id="cities" className="scroll-mt-20 bg-white py-16 selection:bg-emerald-50 selection:text-emerald-900">
      <Container>
        <SectionHeading
          eyebrow="Locations"
          title="Most popular cities"
          subtitle="Explore inventory and RERA-registered options in corridors we actively cover."
        />
        
        {/* Responsive Grid Layout */}  
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {popularCities.map((city) => (
            <a
              key={city.name}
              href="#contact"
              className="group rounded-2xl border border-slate-100 bg-slate-50/40 overflow-hidden flex flex-col transition-all duration-300 hover:border-emerald-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,122,85,0.06)] hover:-translate-y-1"
            >
              {/* Responsive Image Wrapper at the Top Block */}
              <div className="w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-100 relative">
                <img
                  src={city.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'}
                  alt={`${city.name} cityscape`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle gradient overlay to make image blend cleanly */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Content Block Area */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#007A55]">
                  {city.name}
                </h3>
                
                <p className="mt-2 line-clamp-2 text-xs text-slate-500 leading-relaxed font-light">
                  RERA: {city.rera}
                </p>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#007A55] flex items-center gap-1">
                    View localities 
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}