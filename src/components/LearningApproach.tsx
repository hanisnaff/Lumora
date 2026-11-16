import React from 'react';
import { GitFork, Layers, Zap, CheckCircle2, XCircle } from 'lucide-react';

export const LearningApproach: React.FC = () => {
  return (
    <section id="learning-approach" className="py-20 lg:py-28 border-t border-[#D6DDD8] bg-[#F8FAF9]/60 relative">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244B3C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
            <span>LEARNING APPROACH</span>
          </div>

          <h2 className="font-heading font-extrabold text-[#244B3C] tracking-tight text-[clamp(2rem,3.2vw+0.5rem,2.75rem)] leading-[1.18]">
            Diagnose the root concept, not just the symptom.
          </h2>

          <p className="text-[17px] text-[#68716C] mt-4 leading-relaxed">
            The current demo focuses on one learning track: C++ pointers. It checks a few core ideas, groups feedback by concept, and directs you to a focused explanation and practice.
          </p>
        </div>

        {/* Comparison Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 lg:mt-16">
          
          {/* Traditional Method Card */}
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D6DDD8]/60">
                <span className="text-xs font-bold uppercase tracking-wider text-[#68716C]">
                  A Generic Study Session
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#68716C] font-mono">
                  <XCircle className="w-3.5 h-3.5 text-[#A85B53]" />
                  <span>Broad &bull; Untargeted</span>
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#244B3C] mt-5">
                Repeating everything from the start
              </h3>
              <p className="text-[15px] text-[#68716C] leading-relaxed mt-2.5">
                A broad review can spend time on material you already understand, while leaving it unclear which specific idea needs another look.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#68716C]">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#E8EBE9]/60 border border-[#D6DDD8]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85B53]" />
                  <span>Reviewing a full chapter to fix one misunderstanding</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#E8EBE9]/60 border border-[#D6DDD8]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85B53]" />
                  <span>One total score with little concept-level feedback</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D6DDD8]/50 text-xs text-[#68716C] font-mono">
              Trade-off: More review than you may actually need
            </div>
          </div>

          {/* Lumora Approach Card (Deep Forest Green Accent) */}
          <div className="bg-[#244B3C] text-[#F8FAF9] border border-[#1D3D31] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#C6F36B]/10 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C6F36B] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
                  LUMORA DEMO
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#C6F36B] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6F36B]" />
                  <span>Concept Feedback</span>
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#F8FAF9] mt-5">
                A more focused next step
              </h3>
              <p className="text-[15px] text-[#F8FAF9]/80 leading-relaxed mt-2.5">
                The C++ pointers demo scores a short diagnostic, highlights weaker pointer concepts, and links those results to a focused lesson and practice questions.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#F8FAF9]">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
                  <span>Highlights pointer concepts to revisit</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
                  <span>Updates concept mastery after practice</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-[#C6F36B] font-mono font-semibold relative z-10">
              Current scope: A guided C++ pointers learning path
            </div>
          </div>

        </div>

        {/* Supporting Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-xl border border-[#D6DDD8] bg-[#F8FAF9] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mb-4">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#244B3C]">
              Concept-Level Feedback
            </h4>
            <p className="text-xs text-[#68716C] mt-2 leading-relaxed">
              See how your answers perform across the pointer concepts covered in this demo.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#D6DDD8] bg-[#F8FAF9] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mb-4">
              <GitFork className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#244B3C]">
              Focused Explanations
            </h4>
            <p className="text-xs text-[#68716C] mt-2 leading-relaxed">
              Open a lesson focused on the concept identified as your weakest area.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#D6DDD8] bg-[#F8FAF9] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mb-4">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#244B3C]">
              Practice & Progress
            </h4>
            <p className="text-xs text-[#68716C] mt-2 leading-relaxed">
              Answer targeted practice questions and track changes in your concept mastery.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
