import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../../assets/hero-image.png';

export default function HeroSection() {
  return (
    <>
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden selection:bg-emerald-50 selection:text-emerald-900 relative">
      {/* Subtle Premium Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-emerald-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-slate-50 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1440px] ml-auto pl-4 sm:pl-0 lg:pl-0 min-h-screen flex items-center justify-center py-12 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center w-full">
          
          {/* Left Side: Content Block (Shifted right using lg:pl-16) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left pr-4 sm:pr-6 lg:pr-8 lg:pl-16"
          >
         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.15] mb-6">
  Luxury Homes & <br />
  <span className="font-normal text-[#007A55]">Premium Properties</span> <br />
  Across Prime Locations
</h1>

<p className="text-base sm:text-lg font-light text-slate-500 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed tracking-wide">
  Explore exclusive properties in sought-after neighborhoods. From modern
  apartments to luxury villas and commercial spaces, we help you find
  investments that match your lifestyle and goals.
</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-[#007A55] hover:bg-[#006344] text-white font-medium rounded-xl shadow-lg shadow-emerald-800/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                Explore All Demos
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-[#007A55] font-medium rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                Browse Features
              </button>
            </div>
          </motion.div>

          {/* Right Side: Mockup Image Showcase */}
          <div className="lg:col-span-7 flex items-center justify-end relative w-full h-full min-h-[280px] sm:min-h-[440px] lg:min-h-0">
            {/* Soft ambient shadow behind the wrapper */}
            <div className="absolute inset-16 bg-emerald-800/5 rounded-3xl filter blur-3xl transform scale-95 pointer-events-none" />
            
            {/* Moderated Content Wrapper with Framer Motion slide-in up */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              className="relative w-full lg:w-[92%] h-[22rem] sm:h-[32rem] md:h-[38rem] lg:h-[38rem] p-2 sm:p-3 overflow-hidden group flex items-center justify-end rounded-l-2xl sm:rounded-l-3xl border-y border-l border-slate-100 bg-slate-50/50 backdrop-blur-md"
            >
              <img 
                src={heroImage}
                alt="Modern Real Estate Dashboard Mockup" 
                className="w-full h-full object-cover object-left transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                loading="eager"
              />
              
              {/* Floating Accent Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white/90 backdrop-blur-md border border-slate-100 px-4 py-2 rounded-lg text-xs font-medium tracking-wider text-[#007A55] uppercase shadow-sm z-10"
              >
                Premium Theme
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>

    </>
  );
}