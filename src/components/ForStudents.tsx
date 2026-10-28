import React from 'react';
import { GraduationCap, Brain, Target, ArrowRight } from 'lucide-react';

interface ForStudentsProps {
  onStartLearning: () => void;
}

export const ForStudents: React.FC<ForStudentsProps> = ({ onStartLearning }) => {
  const useCases = [
    {
      icon: GraduationCap,
      category: 'STEM & Quantitative Disciplines',
      title: 'Stop compounding early misunderstandings.',
      description: 'In subjects like C++, calculus, and computer systems, an unaddressed gap in week two makes week eight impenetrable. MindPath flags foundational weaknesses before they sabotage your grade.'
    },
    {
      icon: Brain,
      category: 'Self-Directed Learners',
      title: 'Validate real understanding, not just passive recall.',
      description: 'Watching a tutorial creates an illusion of competence. MindPath gives you active, low-friction checks that prove whether you can genuinely apply the theorem or algorithm on your own.'
    },
    {
      icon: Target,
      category: 'Exam & Milestone Preparation',
      title: 'Spend preparation hours where they matter most.',
      description: 'Instead of re-doing 50 practice problems you already understand, MindPath surfaces the exact problem archetypes where your reasoning tends to break down.'
    }
  ];

  return (
    <section id="for-students" className="py-20 lg:py-28 border-t border-[#D6DDD8] bg-[#E8EBE9]/40">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-[700px]">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244B3C] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
            <span>FOR DELIBERATE LEARNERS</span>
          </div>

          <h2 className="font-heading font-extrabold text-[#244B3C] tracking-tight text-[clamp(2rem,3.2vw+0.5rem,2.75rem)] leading-[1.18]">
            Designed for thinkers, not memorizers.
          </h2>

          <p className="text-[17px] text-[#68716C] mt-4 leading-relaxed">
            MindPath is built for students who care about genuine conceptual depth and want their study time to produce clear, lasting mastery.
          </p>
        </div>

        {/* 3 Pillars / Contexts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
          {useCases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#244B3C]/40 hover:-translate-y-0.5 shadow-xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#E8EBE9] border border-[#D6DDD8] flex items-center justify-center text-[#244B3C] mb-5">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#68716C]">
                    {item.category}
                  </span>

                  <h3 className="font-heading font-bold text-lg text-[#244B3C] mt-2">
                    {item.title}
                  </h3>

                  <p className="text-[14.5px] text-[#68716C] leading-[1.65] mt-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D6DDD8]/40">
                  <button
                    type="button"
                    onClick={onStartLearning}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#244B3C] hover:text-[#1D3D31] transition-colors"
                  >
                    <span>Explore sample pathway</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
