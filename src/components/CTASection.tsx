import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onStartLearning: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStartLearning }) => {
  return (
    <section className="py-20 lg:py-28 border-t border-[#D9CCBA] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Rich deep forest-green container for distinct, grounded contrast */}
        <div className="relative rounded-3xl bg-[#1A3628] text-[#FAF8F3] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-xl border border-[#254636]">
          
          {/* Subtle geometric contour curves in background */}
          <div 
            className="absolute -right-20 -bottom-20 w-[420px] h-[420px] rounded-full border border-[#C8E348]/15 pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full border border-white/10 pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -left-20 -top-20 w-80 h-80 rounded-full border border-[#C8E348]/10 pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 max-w-[680px] mx-auto text-center flex flex-col items-center">
            
            {/* Small Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C8E348]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8E348]">
                Start your adaptive journey
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading font-extrabold text-[#FAF8F3] tracking-tight text-[clamp(2.1rem,3.6vw+0.5rem,3.25rem)] leading-[1.15]">
              Your next breakthrough starts with understanding.
            </h2>

            {/* Description */}
            <p className="text-[17px] sm:text-[18px] text-[#FAF8F3]/80 mt-5 max-w-[500px] leading-relaxed">
              Find your starting point, pinpoint the conceptual gaps, and build forward from there.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={onStartLearning}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#C8E348] text-[#1A3628] px-7 py-4 rounded-xl text-[15px] font-bold hover:bg-[#BBD83B] active:scale-[0.99] transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8E348] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A3628]"
              >
                <span>Begin your learning path</span>
                <ArrowRight className="w-4 h-4 text-[#1A3628] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Supporting note */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#FAF8F3]/60 mt-5">
              <span>Free 3-minute diagnostic baseline</span>
              <span>&bull;</span>
              <span>No credit card required</span>
              <span>&bull;</span>
              <span>Personalized C++ & STEM pathways</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
