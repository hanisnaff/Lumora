import React from 'react';
import { motion } from 'framer-motion';
import { DiscoverVisual, UnderstandVisual, ImproveVisual } from './illustrations/HowItWorksVisuals';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  { number: '01', title: 'Find your gaps', description: 'Answer five questions to see which pointer concepts need work.', visual: <DiscoverVisual /> },
  { number: '02', title: 'Learn the concept', description: 'Get a focused explanation with a clear example and memory visual.', visual: <UnderstandVisual /> },
  { number: '03', title: 'Put it into practice', description: 'Try targeted questions and get feedback as you improve.', visual: <ImproveVisual /> },
];

export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="border-t border-[#D6DDD8] bg-[#F8FAF9]/70 py-16 sm:py-20">
    <div className="mx-auto max-w-[1240px] px-6">
      <div className="mb-10 flex flex-col justify-between gap-3 border-b border-[#D6DDD8] pb-7 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#244B3C]">The process</p><h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#244B3C]">Three steps. A clearer way forward.</h2></div>
        <div className="max-w-sm">
          <p className="text-sm leading-relaxed text-[#68716C]">No need to repeat everything. Focus on the ideas you missed.</p>
          <p className="mt-2 text-[10px] leading-relaxed text-[#89938B]">Illustrations include sample scores and concept states; they are not real learner results.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.article key={step.number} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.08 }} className={`flex flex-col rounded-2xl border p-6 ${index === 1 ? 'border-[#244B3C] bg-[#244B3C] text-white' : 'border-[#D6DDD8] bg-white text-[#244B3C]'}`}>
            <div className="mb-5 flex items-center justify-between border-b border-current/15 pb-4"><span className={`font-mono text-xs font-bold tracking-widest ${index === 1 ? 'text-[#C6F36B]' : 'text-[#68716C]'}`}>{step.number} / STEP</span>{index === 2 && <CheckCircle2 className="h-4 w-4 text-[#244B3C]" />}</div>
            <h3 className="font-heading text-xl font-bold">{step.title}</h3>
            <p className={`mt-2 min-h-[48px] text-sm leading-relaxed ${index === 1 ? 'text-white/75' : 'text-[#68716C]'}`}>{step.description}</p>
            <div className={`mt-5 overflow-hidden rounded-xl border p-2 ${index === 1 ? 'border-white/10 bg-white/5' : 'border-[#D6DDD8]/70 bg-[#E8EBE9]/40'}`}>{step.visual}</div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
