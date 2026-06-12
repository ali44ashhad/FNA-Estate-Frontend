import React from 'react';
import { ShieldCheck, Users, Building2, Star } from 'lucide-react';

export default function BlogSectionWhyChoose() {
  const features = [
    {
      id: 1,
      icon: <ShieldCheck className="h-5 w-5 text-wihte" />,
      title: "Verified Listings",
      description: "Rigorous title searches, legal verification, and developer track record checks for total peace of mind."
    },
    {
      id: 2,
      icon: <Users className="h-5 w-5 text-white" />,
      title: "Elite Advisory",
      description: "Localized micro-market analysis, legal due diligence, and custom investment plans for high-end buyers."
    },
    {
      id: 3,
      icon: <Building2 className="h-5 w-5 text-white" />,
      title: "Capital Impact",
      description: "Strategic collaboration with premier developers to secure spaces that maximize yield and long-term gains."
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Container: 40/60 Split on Desktop */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
          
          {/* Left Column: 40% Width */}
          <div className="relative w-full max-w-[460px] mx-auto lg:mx-0 lg:w-[40%] lg:max-w-none shrink-0 flex">
            <div className="relative w-full h-full min-h-[400px] flex">
              <div className="w-full overflow-hidden bg-slate-100 shadow-xl rounded-bl-[40px] rounded-br-[40px] rounded-tl-[80px] rounded-tr-[40px]">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="Real estate team" 
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {/* Rating Badge */}
              <div className="absolute -bottom-5 -left-4 sm:left-6 w-52 rounded-2xl bg-slate-900/40 p-4 text-center text-white shadow-xl backdrop-blur-xl border border-white/10">
                <p className="text-3xl font-extrabold tracking-tight">4.9</p>
                <div className="mt-2 flex justify-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="mt-1 text-[11px] font-medium text-slate-200">2k+ satisfied customers</p>
              </div>
            </div>
          </div>

          {/* Right Column: 60% Width */}
          <div className="w-full lg:w-[60%] flex flex-col justify-between py-2">
            <div>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-700">
                Who We Are &middot; Our Core
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                What makes us different
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-500">
                We bridge the gap between premium real estate brokerage and transparent, data-backed asset advisory.
              </p>
            </div>

            {/* List Row: Tight Header/Icon Gap */}
            <div className="mt-8 divide-y divide-slate-100 border-t border-b border-slate-100">
              {features.map((feature) => (
                <div key={feature.id} className="py-6 flex flex-col sm:flex-row gap-4 items-start">
                  {/* Tight Icon + Header Group */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-white/80 flex h-10 w-10 items-center justify-center rounded-full bg-[#004F3B]">
                      {feature.icon}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 min-w-[140px]">
                      {feature.title}
                    </h3>
                  </div>
                  {/* Expanded Description Area */}
                  <p className="text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}