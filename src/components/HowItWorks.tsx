import React from 'react';
import { motion } from 'framer-motion';
import { DiscoverVisual, UnderstandVisual, ImproveVisual } from './illustrations/HowItWorksVisuals';
import { Compass, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 border-t border-[#D6DDD8] bg-[#F8FAF9]/60 relative">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D6DDD8]/70">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244B3C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
              <span>THE ADAPTIVE LEARNING CYCLE</span>
            </div>

            <h2 className="font-heading font-extrabold text-[#244B3C] tracking-tight text-[clamp(2rem,3.2vw+0.5rem,2.75rem)] leading-[1.18]">
              Less guessing. More understanding.
            </h2>

            <p className="text-[17px] text-[#68716C] mt-3 leading-relaxed">
              Your learning path changes as your understanding grows. Traditional courses force you through identical chapters; Lumora pinpoints the exact concept holding you back.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#68716C]">
            <span className="w-2 h-2 rounded-full bg-[#244B3C]" />
            <span>Continuous Cognitive Diagnosis</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition: Varied cards with Purposeful Illustrations */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 01 — Discover (Span 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-6 bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xs transition-all duration-200 hover:border-[#244B3C]/40 hover:-translate-y-0.5"
          >
            <div>
              {/* Header bar */}
              <div className="flex items-center justify-between pb-5 border-b border-[#D6DDD8]/60">
                <span className="font-mono text-xs font-extrabold text-[#244B3C] tracking-widest uppercase">
                  01 &bull; DISCOVER
                </span>
                <span className="text-[11px] font-semibold text-[#244B3C] bg-[#E8EBE9] px-2.5 py-1 rounded-md border border-[#D6DDD8]">
                  Baseline Check
                </span>
              </div>

              {/* Custom Editorial Illustration */}
              <div className="my-4 rounded-xl bg-[#E8EBE9]/40 border border-[#D6DDD8]/60 overflow-hidden">
                <DiscoverVisual />
              </div>

              {/* Title & Copy */}
              <h3 className="font-heading font-bold text-xl text-[#244B3C] tracking-tight mt-2">
                Pinpoint root misconceptions in 3 minutes.
              </h3>
              <p className="text-[15px] text-[#68716C] leading-relaxed mt-2.5">
                Start with a short assessment that reveals what you genuinely know and where your reasoning breaks down. No penalty for guessing, just honest diagnostic clarity.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D6DDD8]/50 flex items-center justify-between text-xs text-[#68716C]">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#244B3C]" />
                <span>Concept-level diagnosis</span>
              </span>
              <span className="font-mono text-[11px] text-[#244B3C] font-bold">5 targeted questions</span>
            </div>
          </motion.div>

          {/* Right Column (Span 6 cols): Stacked Cards 02 & 03 */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Card 02 — Understand (Deep Forest Highlight Card) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-[#244B3C] text-[#F8FAF9] border border-[#1D3D31] rounded-2xl p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-[#C6F36B] tracking-widest uppercase">
                  02 &bull; UNDERSTAND
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#C6F36B] text-[#244B3C] px-2 py-0.5 rounded">
                  Targeted Remediation
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mt-4">
                <div className="md:col-span-7">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F8FAF9] tracking-tight">
                    Focused explanations, zero redundant fluff.
                  </h3>
                  <p className="text-xs sm:text-[14px] text-[#F8FAF9]/80 leading-relaxed mt-2">
                    Get clear plain-language mental models, relatable analogies, and interactive memory diagrams built around your exact gap.
                  </p>
                </div>
                <div className="md:col-span-5 rounded-xl bg-white/5 border border-white/10 p-1">
                  <UnderstandVisual />
                </div>
              </div>
            </motion.div>

            {/* Card 03 — Improve (Trajectory & Adaptive Loop) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-7 shadow-xs transition-all duration-200 hover:border-[#244B3C]/40 hover:-translate-y-0.5 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D6DDD8]/60">
                  <span className="font-mono text-xs font-extrabold text-[#244B3C] tracking-widest uppercase">
                    03 &bull; IMPROVE
                  </span>
                  <span className="text-[11px] font-semibold text-[#244B3C] bg-[#E8EBE9] px-2 py-0.5 rounded border border-[#D6DDD8]">
                    Dynamic Milestones
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mt-4">
                  <div className="md:col-span-7">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#244B3C] tracking-tight">
                      Recalibrate with every practice drill.
                    </h3>
                    <p className="text-xs sm:text-[14px] text-[#68716C] leading-relaxed mt-2">
                      Reassess your understanding through targeted drills. As your confidence grows, Lumora dynamically unlocks the next conceptual milestone.
                    </p>
                  </div>
                  <div className="md:col-span-5 rounded-xl bg-[#E8EBE9]/40 border border-[#D6DDD8]/60 p-1">
                    <ImproveVisual />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#D6DDD8]/50 flex items-center justify-between text-xs text-[#68716C]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#244B3C]" />
                  <span>Threshold-based advancement (80%)</span>
                </span>
                <span className="font-mono text-[11px] text-[#244B3C] font-bold">Feedback Loop</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
