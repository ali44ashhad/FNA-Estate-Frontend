import React from 'react';
import { motion } from 'framer-motion';
import SpecialityGrid from './SpecialityGrid';
export default function WhoWeAreHeroPage() {
  return (
   <>
    <section className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden selection:bg-emerald-50 selection:text-emerald-900 relative flex items-center">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#004F3B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-gradient-to-t from-slate-50 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Container - Restored normal centered bounds to keep layout balanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Side: Content Block */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left"
          >
            <span className="text-xs font-bold tracking-widest text-[#004F3B] uppercase mb-3 block">
              Who We Are
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.15] mb-6">
              Defining Premium <br />
              <span className="font-normal text-[#004F3B]">Real Estate Brokerage</span> <br />
              With Absolute Clarity
            </h1>
            
            <p className="text-base sm:text-lg font-light text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed tracking-wide">
              We are a team of dedicated property strategists tracking prime corridors to offer 
              fully verified listings, transparent transaction frameworks, and RERA-registered 
              investments. Your legacy portfolio deserves a professional consulting approach.
            </p>
          </motion.div>

          {/* Right Side: Regular Non-Full Container Box Layout */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end relative w-full h-full min-h-[280px] sm:min-h-[420px] lg:min-h-0">
            {/* Ambient Shadow Overlay */}
            <div className="absolute inset-12 bg-emerald-950/5 rounded-3xl filter blur-3xl transform scale-95 pointer-events-none" />
            
            {/* Contrained, proportional card wrapper matching classic grid limits */}
            <motion.div 
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              className="relative w-full max-w-[600px] h-[22rem] sm:h-[30rem] md:h-[34rem] lg:h-[34rem] p-2 sm:p-3 overflow-hidden group flex items-center justify-center rounded-3xl border border-slate-100 bg-slate-50/50 backdrop-blur-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Modern Villa Architecture" 
                className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                loading="eager"
              />
              
              {/* Corner Value Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white/95 backdrop-blur-md border border-slate-100 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider text-[#004F3B] uppercase shadow-sm z-10"
              >
                RERA Registered
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>

    <SpecialityGrid/>
   </>
  );
}