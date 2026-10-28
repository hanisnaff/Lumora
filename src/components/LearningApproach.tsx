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
            Most platforms treat learning as a conveyor belt: watch lecture, fail quiz, repeat. MindPath models understanding as an interconnected graph, isolating the exact missing link so new ideas click into place.
          </p>
        </div>

        {/* Comparison Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 lg:mt-16">
          
          {/* Traditional Method Card */}
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D6DDD8]/60">
                <span className="text-xs font-bold uppercase tracking-wider text-[#68716C]">
                  Traditional Education
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#68716C] font-mono">
                  <XCircle className="w-3.5 h-3.5 text-[#A85B53]" />
                  <span>Rigid &bull; Linear</span>
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#244B3C] mt-5">
                One-size-fits-all curricula
              </h3>
              <p className="text-[15px] text-[#68716C] leading-relaxed mt-2.5">
                Forces learners through identical chapters regardless of existing mastery. When a prerequisite is shaky, the student struggles without knowing which foundational concept broke down.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#68716C]">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#E8EBE9]/60 border border-[#D6DDD8]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85B53]" />
                  <span>Re-reading entire chapters to find one forgotten rule</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#E8EBE9]/60 border border-[#D6DDD8]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85B53]" />
                  <span>Binary pass/fail test scores with zero diagnostic root cause</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D6DDD8]/50 text-xs text-[#68716C] font-mono">
              Outcome: High cognitive fatigue &bull; Compounding knowledge debt
            </div>
          </div>

          {/* MindPath Approach Card (Deep Forest Green Accent) */}
          <div className="bg-[#244B3C] text-[#F8FAF9] border border-[#1D3D31] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#C6F36B]/10 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C6F36B] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
                  MindPath Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#C6F36B] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6F36B]" />
                  <span>Adaptive Graph</span>
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#F8FAF9] mt-5">
                Dynamic dependency navigation
              </h3>
              <p className="text-[15px] text-[#F8FAF9]/80 leading-relaxed mt-2.5">
                MindPath maps your exact mental model. If an advanced formula fails, the platform identifies whether the blocker is algebraic simplification or concept formulation.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#F8FAF9]">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
                  <span>Pinpoints the missing prerequisite concept in under 3 minutes</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
                  <span>Dynamically recalibrates sequence as your drill accuracy evolves</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-[#C6F36B] font-mono font-semibold relative z-10">
              Outcome: Rapid clarity &bull; Zero redundant repetition &bull; Lasting retention
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
              Concept Dependency Trees
            </h4>
            <p className="text-xs text-[#68716C] mt-2 leading-relaxed">
              Every subject is structured as nodes and prerequisites, making blind spots visible immediately.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#D6DDD8] bg-[#F8FAF9] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mb-4">
              <GitFork className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#244B3C]">
              Non-Linear Branching
            </h4>
            <p className="text-xs text-[#68716C] mt-2 leading-relaxed">
              Skip content you have already mastered without penalty; take short detours only when a concept warrants it.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#D6DDD8] bg-[#F8FAF9] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mb-4">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#244B3C]">
              Micro-Remediation
            </h4>
            <p className="text-xs text-[#68716C] mt-2 leading-relaxed">
              Receive bite-sized interactive explanations precisely when hesitation or confusion is detected.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
