import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LearningPathPreview } from './LearningPathPreview';

interface HeroProps {
  onStartLearning: () => void;
  onSeeHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onSeeHowItWorks }) => (
  <section className="relative overflow-hidden bg-dot-pattern py-14 sm:py-20 lg:py-24">
    <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#C6F36B]/10 blur-3xl" />
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-14">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex flex-col items-start text-left lg:col-span-7">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6DDD8] bg-[#F8FAF9] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#244B3C]">
          <span className="h-2 w-2 rounded-full border border-[#244B3C] bg-[#C6F36B]" />
          C++ POINTERS · INTERACTIVE DEMO
        </div>
        <h1 className="font-heading text-[clamp(2.7rem,5.2vw+0.5rem,4.4rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#242A27]">
          Learn what you <span className="relative whitespace-nowrap">missed.<span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-[#C6F36B]/80" /></span>
        </h1>
        <p className="mt-6 max-w-[470px] text-base leading-relaxed text-[#68716C] sm:text-lg">
          Take a short check. Get a lesson built around your gaps.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button type="button" onClick={onStartLearning} className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#244B3C] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#1D3D31]">
            Start the 5-question check <ArrowRight className="h-4 w-4 text-[#C6F36B] transition-transform group-hover:translate-x-1" />
          </button>
          <button type="button" onClick={onSeeHowItWorks} className="rounded-xl border border-[#D6DDD8] bg-[#F8FAF9] px-6 py-3.5 text-[15px] font-semibold text-[#244B3C] transition hover:border-[#244B3C] hover:bg-white">
            How it works
          </button>
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs text-[#68716C]">
          <CheckCircle2 className="h-4 w-4 text-[#2E8055]" />
          About 3 minutes · No sign-in required
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex w-full justify-center lg:col-span-5 lg:justify-end">
        <LearningPathPreview />
      </motion.div>
    </div>
  </section>
);
