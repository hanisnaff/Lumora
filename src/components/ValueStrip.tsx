import React from 'react';
import { Clock, Crosshair, TrendingUp } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const values = [
    {
      icon: Clock,
      title: 'Learn at your own pace.',
      description: 'Progress rapidly through concepts you already know; spend deliberate time on the topics you need.'
    },
    {
      icon: Crosshair,
      title: 'Focus on concept-level gaps.',
      description: 'Pinpoint the exact underlying misconception before it compounds into larger learning hurdles.'
    },
    {
      icon: TrendingUp,
      title: 'Adapt as you improve.',
      description: 'Every drill, review, and practice session recalibrates your next milestone in real-time.'
    }
  ];

  return (
    <section className="border-t border-[#D6DDD8] bg-[#E8EBE9]/70 relative">
      <div className="max-w-[1240px] mx-auto px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F8FAF9] border border-[#D6DDD8] flex items-center justify-center flex-shrink-0 text-[#244B3C] shadow-xs relative">
                  <Icon className="w-5 h-5 stroke-[1.8] text-[#244B3C]" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C6F36B] border border-[#244B3C]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[16px] font-bold text-[#242A27] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-[#68716C] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
