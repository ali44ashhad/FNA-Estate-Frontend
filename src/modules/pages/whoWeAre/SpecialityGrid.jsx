import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCompass, FiLayers, FiShield } from 'react-icons/fi';

const SpecialityGrid = () => {
  // 4 blocks array with maximized icon sizing (w-9 h-9) matching the #004F3B theme
  const specialities = [
    {
      icon: <FiCheckCircle className="w-9 h-9 text-[#004F3B]" />,
      title: "100% RERA Compliance",
      desc: "We clear the static by tracking only registered corridors, matching exact government numbers before publication."
    },
    {
      icon: <FiCompass className="w-9 h-9 text-[#004F3B]" />,
      title: "Corridor Specialization",
      desc: "Our active focus rests deeply on high-growth premium pockets, assuring strategic geographical positioning."
    },
    {
      icon: <FiLayers className="w-9 h-9 text-[#004F3B]" />,
      title: "Verified Inventory Only",
      desc: "Every plot layout, built structure, and price listing undergoes double-pass field checks by our property team."
    },
    {
      icon: <FiShield className="w-9 h-9 text-[#004F3B]" />,
      title: "Consulting Over Brokerage",
      desc: "We look past easy sales pitches to treat your residential transition as a foundational family legacy structure."
    }
  ];

  return (
    <section id="specialities" className="bg-slate-50/60 py-20 lg:py-24 font-sans selection:bg-emerald-50 selection:text-emerald-950 relative overflow-hidden">
      {/* Structural Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-emerald-50/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Intro Typography Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest text-[#004F3B] uppercase mb-3 block">
            Core Specialities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 leading-[1.2] mb-5">
            What Sets Us Apart <br />
            In The <span className="font-normal text-[#004F3B]">Premium Segment</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#004F3B]/30 mx-auto mb-5" />
          <p className="text-base sm:text-lg font-light text-slate-500 leading-relaxed">
            We reject standard transactional real estate noise to bring rigorous vetting, verified catalog systems, and long-term advisory mapping to your asset choices.
          </p>
        </div>

        {/* 4 Block Centered Interactive Grid Track */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {specialities.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
              }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition-all duration-300 hover:border-[#004F3B]/40 hover:shadow-[0_20px_40px_rgba(0,79,59,0.08)] hover:-translate-y-1 flex flex-col items-center text-center"
            >
              {/* Maximized Icon Box Wrapper */}
              <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#004F3B]/5 border border-slate-200 group-hover:border-[#004F3B]/20 shadow-xs">
                {item.icon}
              </div>

              {/* Title Header */}
              <h3 className="text-lg font-semibold text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-[#004F3B] mb-3">
                {item.title}
              </h3>

              {/* Paragraph Body Text */}
              <p className="text-sm font-light text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-200 max-w-[260px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default SpecialityGrid;