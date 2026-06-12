import React from "react";

const HeroAboutSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        {/* Top Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-[#004F3B]/10 text-[#004F3B] rounded-full mb-6">
              About FNAEstate
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
              Building the future
              <br />
              <span className="font-normal text-[#004F3B]">of modern real estate</span>
            </h2>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start justify-between h-full">
            <div className="space-y-5">
              <p className="text-gray-600 leading-8 text-base md:text-lg">
                At <span className="font-semibold text-gray-900">FNAEstate</span>, we connect
                buyers, sellers, and investors with premium properties and trusted
                real estate solutions. Our mission is to simplify property
                transactions through transparency, innovation, and personalized
                guidance.
              </p>

              <p className="text-gray-600 leading-8 text-base md:text-lg">
                Whether you're searching for your dream home, commercial space, or
                investment opportunity, our experienced team helps you make
                confident real estate decisions backed by market expertise and
                local insights.
              </p>
            </div>

            <button className="mt-8 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-[#004F3B] group transition-colors duration-300">
              Learn More
              <span className="w-9 h-9 rounded-full bg-[#004F3B] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Image + Stats */}
        <div className="relative">
          {/* Reduced & Responsive Image Frame */}
          <div className="overflow-hidden rounded-3xl shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400"
              alt="Real Estate"
              className="w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[400px] object-cover filter brightness-95"
            />
          </div>

          {/* Stats Cards - Fully Responsive Grid & Placement */}
          <div className="relative lg:absolute lg:right-8 lg:bottom-8 grid grid-cols-2 gap-4 mt-6 lg:mt-0 max-w-md w-full ml-auto">
            
            <div className="bg-[#f8f7f4] border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004F3B]">
                500+
              </h3>
              <p className="text-gray-500 mt-1 text-xs md:text-sm font-medium">
                Properties Sold
              </p>
            </div>

            <div className="bg-[#f8f7f4] border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004F3B]">
                98%
              </h3>
              <p className="text-gray-500 mt-1 text-xs md:text-sm font-medium">
                Client Satisfaction
              </p>
            </div>

            <div className="bg-[#f8f7f4] border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004F3B]">
                15+
              </h3>
              <p className="text-gray-500 mt-1 text-xs md:text-sm font-medium">
                Years Experience
              </p>
            </div>

            <div className="bg-[#f8f7f4] border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004F3B]">
                1200+
              </h3>
              <p className="text-gray-500 mt-1 text-xs md:text-sm font-medium">
                Happy Clients
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroAboutSection;