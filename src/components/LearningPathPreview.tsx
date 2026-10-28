import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Lock, ArrowRight, AlertCircle, Compass, CheckCircle2, Network, ListTree } from 'lucide-react';
import { ConceptGraphVisual } from './illustrations/ConceptGraphVisual';

export const LearningPathPreview: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2); // Default to Step 2 (In progress)
  const [viewMode, setViewMode] = useState<'stepper' | 'graph'>('stepper');

  const steps = [
    {
      id: 1,
      title: 'Memory Addresses (&)',
      status: 'Completed',
      statusKey: 'completed',
      duration: 'Completed in 8m',
      summary: 'Stack allocation and virtual memory addresses verified at 94%.',
      insightTitle: 'Core foundation verified',
      insightNote: 'Memory layout and address-of mechanics verified with high consistency.',
      insightTag: '94% mastery'
    },
    {
      id: 2,
      title: "Dereferencing (*ptr)",
      status: 'In progress',
      statusKey: 'in-progress',
      duration: '~6 mins remaining',
      summary: 'Targeted drill: Modifying underlying values via pointer addresses.',
      insightTitle: 'We found a concept worth revisiting.',
      insightNote: 'Distinction between mutating target values vs re-aiming pointers needs reinforcement.',
      insightTag: 'Gap identified'
    },
    {
      id: 3,
      title: 'nullptr Safety Checks',
      status: 'Upcoming',
      statusKey: 'upcoming',
      duration: '5 synthesis questions',
      summary: 'Defensive guards against uninitialized memory and segmentation faults.',
      insightTitle: 'Upcoming checkpoint',
      insightNote: 'Synthesizes defensive pointer patterns before advancing to dynamic heap memory.',
      insightTag: 'Unlocks next'
    }
  ];

  const currentStepData = steps.find(s => s.id === activeStep) || steps[1];

  return (
    <div className="w-full max-w-[540px] mx-auto lg:max-w-none select-none">
      {/* Outer ambient container with subtle framing */}
      <div className="relative">
        
        {/* Subtle decorative background glow */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-[#244B3C]/10 via-[#C6F36B]/15 to-[#2E8055]/10 rounded-3xl blur-xl -z-10" />

        {/* Floating Top Mini-Badge */}
        <div className="absolute -top-3.5 right-6 z-20 px-3 py-1 rounded-full bg-[#244B3C] text-[#C6F36B] border border-[#C6F36B]/40 shadow-sm text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6F36B] animate-pulse" />
          <span>Interactive Product Preview</span>
        </div>

        {/* Main Product Card */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-5 sm:p-7 shadow-[0_12px_36px_-6px_rgba(36,75,60,0.08)] relative overflow-hidden bg-dot-pattern">
          
          {/* Top Panel Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D6DDD8]/70">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#C6F36B] border border-[#244B3C]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#244B3C]">
                YOUR LEARNING PATH
              </span>
            </div>

            {/* View Switcher: Stepper vs Concept Graph */}
            <div className="flex items-center gap-1 bg-[#E8EBE9] p-1 rounded-lg border border-[#D6DDD8]">
              <button
                type="button"
                onClick={() => setViewMode('stepper')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  viewMode === 'stepper'
                    ? 'bg-[#244B3C] text-[#FFFFFF] shadow-xs'
                    : 'text-[#68716C] hover:text-[#244B3C]'
                }`}
              >
                <ListTree className="w-3 h-3" />
                <span>Path</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('graph')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  viewMode === 'graph'
                    ? 'bg-[#244B3C] text-[#FFFFFF] shadow-xs'
                    : 'text-[#68716C] hover:text-[#244B3C]'
                }`}
              >
                <Network className="w-3 h-3" />
                <span>Concept Map</span>
              </button>
            </div>
          </div>

          {/* Progress Indicator: Concept understanding */}
          <div className="py-4">
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#244B3C]">
                  Concept understanding
                </span>
                <span className="text-[11px] text-[#68716C] font-mono">(C++ Pointers &bull; Track Target: 80%)</span>
              </div>
              <span className="font-heading text-sm font-bold text-[#244B3C]">
                74%
              </span>
            </div>

            {/* Minimal Progress Bar with gentle animation and lime cap */}
            <div className="w-full h-2.5 bg-[#E8EBE9] rounded-full overflow-hidden p-0.5 border border-[#D6DDD8]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '74%' }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="h-full bg-[#244B3C] rounded-full relative"
              >
                {/* Lime accent highlight cap */}
                <span className="absolute right-0 top-0 bottom-0 w-2 bg-[#C6F36B] rounded-full shadow-xs" />
              </motion.div>
            </div>
          </div>

          {/* View Content: Either the 3 Connected Steps OR the Interactive Concept Graph */}
          {viewMode === 'graph' ? (
            <div className="my-3 p-3 rounded-xl bg-[#FFFFFF] border border-[#D6DDD8] shadow-inner">
              <ConceptGraphVisual activeConceptName={currentStepData.title} />
              <div className="mt-2 text-center text-[10px] text-[#68716C]">
                Click nodes to inspect prerequisite connections &amp; diagnostic status.
              </div>
            </div>
          ) : (
            <div className="relative my-3 pt-1">
              {/* Vertical connector line */}
              <div className="absolute left-[17px] top-4 bottom-5 w-[2px] bg-[#D6DDD8] -z-0" />

              <div className="space-y-3">
                {steps.map((step) => {
                  const isSelected = activeStep === step.id;
                  const isCompleted = step.statusKey === 'completed';
                  const isInProgress = step.statusKey === 'in-progress';
                  const isUpcoming = step.statusKey === 'upcoming';

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full relative z-10 flex items-start gap-3.5 p-3 rounded-xl transition-all duration-200 text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#244B3C] shadow-sm ring-1 ring-[#244B3C]'
                          : 'bg-[#F8FAF9]/80 border-transparent hover:bg-[#FFFFFF]'
                      }`}
                    >
                      {/* Node indicator */}
                      <div className="flex-shrink-0 mt-0.5">
                        {isCompleted && (
                          <div className="w-[30px] h-[30px] rounded-full bg-[#244B3C] text-[#C6F36B] flex items-center justify-center shadow-xs">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}

                        {isInProgress && (
                          <div className="w-[30px] h-[30px] rounded-full bg-[#FFFFFF] border-2 border-[#244B3C] flex items-center justify-center relative shadow-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#C6F36B]" />
                            <span className="absolute -inset-1 rounded-full border border-[#C6F36B] animate-pulse" />
                          </div>
                        )}

                        {isUpcoming && (
                          <div className="w-[30px] h-[30px] rounded-full bg-[#F8FAF9] border border-[#D6DDD8] text-[#68716C] flex items-center justify-center">
                            <Lock className="w-3.5 h-3.5 stroke-[1.8]" />
                          </div>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-[14px] font-semibold text-[#244B3C] tracking-tight truncate">
                            {step.title}
                          </h4>
                          
                          {/* Status Badge */}
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${
                              isCompleted
                                ? 'bg-[#DCEBE2] text-[#244B3C]'
                                : isInProgress
                                ? 'bg-[#244B3C] text-[#C6F36B] font-bold'
                                : 'bg-[#D6DDD8]/50 text-[#68716C]'
                            }`}
                          >
                            {step.status}
                          </span>
                        </div>

                        <p className="text-xs text-[#68716C] mt-0.5 line-clamp-1 leading-relaxed">
                          {step.summary}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Layered Insight Card: "We found a concept worth revisiting." */}
          <div className="mt-4 pt-3.5 border-t border-[#D6DDD8]/70">
            <div className="bg-[#244B3C] text-[#FFFFFF] rounded-xl p-4 flex items-start gap-3.5 shadow-md border border-[#1E3F33]">
              <div className="w-7 h-7 rounded-lg bg-[#1E3F33] text-[#C6F36B] flex items-center justify-center flex-shrink-0 mt-0.5">
                {currentStepData.statusKey === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#C6F36B]" />
                ) : currentStepData.statusKey === 'in-progress' ? (
                  <AlertCircle className="w-4 h-4 text-[#C6F36B]" />
                ) : (
                  <Compass className="w-4 h-4 text-[#C6F36B]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[#FFFFFF] tracking-tight">
                    {currentStepData.insightTitle}
                  </p>
                  <span className="text-[10px] text-[#C6F36B] font-mono uppercase bg-[#1E3F33] px-2 py-0.5 rounded border border-[#C6F36B]/30 font-bold">
                    {currentStepData.insightTag}
                  </span>
                </div>
                <p className="text-[11.5px] text-[#FFFFFF]/80 mt-1 leading-relaxed">
                  {currentStepData.insightNote}
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C6F36B] hover:underline cursor-pointer">
                    <span>
                      {currentStepData.statusKey === 'completed'
                        ? 'View verified prerequisites'
                        : currentStepData.statusKey === 'in-progress'
                        ? 'Launch 5-min concept remediation'
                        : 'Review checkpoint curriculum'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subdued Footer Note inside Preview */}
          <div className="mt-3.5 flex items-center justify-between text-[11px] text-[#68716C] px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#244B3C]" />
              <span>Real-time adaptive path engine</span>
            </span>
            <span className="font-mono text-[10px] text-[#244B3C] font-semibold">C++ Systems Track</span>
          </div>

        </div>
      </div>
    </div>
  );
};
