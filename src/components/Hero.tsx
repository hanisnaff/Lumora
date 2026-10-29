import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { LearningPathPreview } from './LearningPathPreview';

interface HeroProps {
  onStartLearning: () => void;
  onSeeHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onSeeHowItWorks }) => {
  return (
    <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-26 overflow-hidden bg-dot-pattern">
      {/* Subtle organic depth */}
      <div 
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#C6F36B]/10 blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#244B3C]/5 blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (~55% -> 7 cols in 12-col grid) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow with Cool Grey & Lime Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8FAF9] border border-[#D6DDD8] shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C6F36B] border border-[#244B3C]" />
              <span className="text-[11.5px] font-bold tracking-wider uppercase text-[#244B3C]">
                ADAPTIVE LEARNING ARCHITECTURE
              </span>
              <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#244B3C] text-[#FFFFFF]">
                Concept-led
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-[#242A27] tracking-[-0.03em] leading-[1.12] text-[clamp(2.5rem,5.2vw+0.5rem,4.25rem)]">
              Learn at your pace.
              <span className="block mt-1 font-extrabold text-[#242A27]">
                <span className="relative inline-block">
                  Master your way.
                  {/* Subtle lime brush accent */}
                  <span 
                    className="absolute -bottom-1 left-0 right-0 h-[5px] rounded-full bg-[#C6F36B]/80" 
                    aria-hidden="true" 
                  />
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-[17px] sm:text-[18px] text-[#68716C] leading-[1.65] max-w-[530px] mt-6 mb-8 font-normal">
              Not everyone learns the same way. Lumora discovers what you understand, finds the exact conceptual gaps, and builds a learning path that moves with you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onStartLearning}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#244B3C] text-[#FFFFFF] px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-[#1D3D31] active:scale-[0.99] transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C]"
              >
                <span>Start diagnostic</span>
                <ArrowRight className="w-4 h-4 text-[#C6F36B] transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onSeeHowItWorks}
                className="inline-flex items-center justify-center gap-2 bg-[#F8FAF9] text-[#244B3C] border border-[#D6DDD8] px-6 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-[#FFFFFF] hover:border-[#244B3C] active:scale-[0.99] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C]"
              >
                <Compass className="w-4 h-4 text-[#68716C]" />
                <span>See how it works</span>
              </button>
            </div>

            {/* Small supporting trust strip */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#68716C]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8055] flex-shrink-0" />
                <span>3-minute diagnostic baseline</span>
              </div>
              <span className="hidden sm:inline text-[#D6DDD8]">&bull;</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#244B3C] flex-shrink-0" />
                <span>Isolates root misconceptions</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (~45% -> 5 cols in 12-col grid) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <LearningPathPreview />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
