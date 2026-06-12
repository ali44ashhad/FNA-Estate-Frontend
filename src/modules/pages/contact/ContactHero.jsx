import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import ContactPage from './ContactPage';
import LocationMap from '../../home/components/LocationMap';

const ContactHero = () => {


  return (
 <>
    <section className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden selection:bg-emerald-50 selection:text-emerald-950 relative flex items-center">
      {/* Background Premium Glow Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#004F3B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-slate-50 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Container tailored to Nav margins */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Side: Text & Quick Info Blocks */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left"
          >
            <span className="text-xs font-bold tracking-widest text-[#004F3B] uppercase mb-3 block">
              Connect With Us
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.15] mb-6">
              Let's Discuss Your <br />
              <span className="font-normal text-[#004F3B]">Next Property Asset</span>
            </h1>
            
            <p className="text-base sm:text-lg font-light text-slate-500 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed tracking-wide">
              Have questions about RERA clearance, plot compliance, or upcoming corridor inventories? Reach out directly. Our property consultants are ready to assist you.
            </p>

          
          
          </motion.div>

          {/* Right Side: Proportional Framed Architectural Image */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end relative w-full h-full min-h-[300px] sm:min-h-[440px] lg:min-h-0">
            {/* Ambient Shadow Overlay */}
            <div className="absolute inset-12 bg-emerald-950/5 rounded-3xl filter blur-3xl transform scale-95 pointer-events-none" />
            
            {/* Balanced Card Container */}
            <motion.div 
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              className="relative w-full max-w-[620px] h-[24rem] sm:h-[32rem] md:h-[36rem] lg:h-[38rem] p-2 sm:p-3 overflow-hidden group flex items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-xs"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                alt="Modern commercial corporate workspace building glass facade" 
                className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                loading="eager"
              />
              
              {/* Floating Verification Accent Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider text-[#004F3B] uppercase shadow-sm z-10 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Response within 2 Hours
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
    <ContactPage/>
    <LocationMap/>
 </>
  );
};

export default ContactHero;