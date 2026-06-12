import React from 'react';

const LocationMap = () => {
  // Encoded address string for the Google Maps Embed API
  const mapAddress = encodeURIComponent("First floor, SCO 52, Sector 82, JLPL Industrial Area, Punjab 140306");
  const mapUrl = `https://maps.google.com/maps?q=${mapAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout Wrapper */}
        <div className="w-full overflow-hidden rounded-3xl bg-white p-4 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.08)] border border-slate-100">
          
          {/* Responsive Map Container Frame */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] sm:aspect-[21/9] lg:h-[480px]">
            <iframe
              title="Office Location Map"
              src={mapUrl}
              className="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-[110%] transition-all duration-300 hover:grayscale-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          
          {/* Symmetrical Informational Banner below the map */}
          <div className="mt-4 flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold tracking-tight text-slate-900">
                Our Corporate Headquarters
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                First Floor, SCO 52, Sector 82, JLPL Industrial Area, Punjab 140306
              </p>
            </div>
            
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
            >
              Get Directions
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default LocationMap;