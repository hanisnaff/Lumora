import React from 'react';
import { GitFork, Layers, Zap, CheckCircle2, XCircle } from 'lucide-react';

export const LearningApproach: React.FC = () => {
  return (
    <section id="learning-approach" className="py-20 lg:py-28 border-t border-[#D9CCBA] bg-[#FAF8F3]/60 relative">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3628] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E348]" />
            <span>LEARNING APPROACH</span>
          </div>

          <h2 className="font-heading font-extrabold text-[#1A3628] tracking-tight text-[clamp(2rem,3.2vw+0.5rem,2.75rem)] leading-[1.18]">
            Diagnose the root concept, not just the symptom.
          </h2>

          <p className="text-[17px] text-[#5C675F] mt-4 leading-relaxed">
            Most platforms treat learning as a conveyor belt: watch lecture, fail quiz, repeat. MindPath models understanding as an interconnected graph, isolating the exact missing link so new ideas click into place.
          </p>
        </div>

        {/* Comparison Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 lg:mt-16">
          
          {/* Traditional Method Card */}
          <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D9CCBA]/60">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C675F]">
                  Traditional Education
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#5C675F] font-mono">
                  <XCircle className="w-3.5 h-3.5 text-[#A85B53]" />
                  <span>Rigid &bull; Linear</span>
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#1A3628] mt-5">
                One-size-fits-all curricula
              </h3>
              <p className="text-[15px] text-[#5C675F] leading-relaxed mt-2.5">
                Forces learners through identical chapters regardless of existing mastery. When a prerequisite is shaky, the student struggles without knowing which foundational concept broke down.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#5C675F]">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EBDD]/60 border border-[#D9CCBA]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85B53]" />
                  <span>Re-reading entire chapters to find one forgotten rule</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EBDD]/60 border border-[#D9CCBA]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85B53]" />
                  <span>Binary pass/fail test scores with zero diagnostic root cause</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D9CCBA]/50 text-xs text-[#5C675F] font-mono">
              Outcome: High cognitive fatigue &bull; Compounding knowledge debt
            </div>
          </div>

          {/* MindPath Approach Card (Deep Forest Green Accent) */}
          <div className="bg-[#1A3628] text-[#FAF8F3] border border-[#254636] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#C8E348]/10 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8E348] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8E348]" />
                  MindPath Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#C8E348] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8E348]" />
                  <span>Adaptive Graph</span>
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#FAF8F3] mt-5">
                Dynamic dependency navigation
              </h3>
              <p className="text-[15px] text-[#FAF8F3]/80 leading-relaxed mt-2.5">
                MindPath maps your exact mental model. If an advanced formula fails, the platform identifies whether the blocker is algebraic simplification or concept formulation.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#FAF8F3]">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#C8E348]" />
                  <span>Pinpoints the missing prerequisite concept in under 3 minutes</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#C8E348]" />
                  <span>Dynamically recalibrates sequence as your drill accuracy evolves</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-[#C8E348] font-mono font-semibold relative z-10">
              Outcome: Rapid clarity &bull; Zero redundant repetition &bull; Lasting retention
            </div>
          </div>

        </div>

        {/* Supporting Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-xl border border-[#D9CCBA] bg-[#FAF8F3] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#1A3628] text-[#C8E348] flex items-center justify-center mb-4">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#1A3628]">
              Concept Dependency Trees
            </h4>
            <p className="text-xs text-[#5C675F] mt-2 leading-relaxed">
              Every subject is structured as nodes and prerequisites, making blind spots visible immediately.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#D9CCBA] bg-[#FAF8F3] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#1A3628] text-[#C8E348] flex items-center justify-center mb-4">
              <GitFork className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#1A3628]">
              Non-Linear Branching
            </h4>
            <p className="text-xs text-[#5C675F] mt-2 leading-relaxed">
              Skip content you have already mastered without penalty; take short detours only when a concept warrants it.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#D9CCBA] bg-[#FAF8F3] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#1A3628] text-[#C8E348] flex items-center justify-center mb-4">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-[16px] text-[#1A3628]">
              Micro-Remediation
            </h4>
            <p className="text-xs text-[#5C675F] mt-2 leading-relaxed">
              Receive bite-sized interactive explanations precisely when hesitation or confusion is detected.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
