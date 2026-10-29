import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 28 }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Refined geometric icon representing interconnected nodes & branching path */}
      <div 
        className="relative flex items-center justify-center rounded-lg bg-[#244B3C] text-[#FFFFFF] shadow-xs transition-transform duration-200 group-hover:scale-105 border border-[#1E3F33]"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.65}
          height={size * 0.65}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main path */}
          <path
            d="M5 19L12 12L19 19"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12L12 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Distinctive lime accent node */}
          <circle cx="12" cy="5" r="2.8" fill="#C6F36B" />
          <circle cx="5" cy="19" r="2" fill="currentColor" />
          <circle cx="19" cy="19" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="font-heading font-extrabold text-xl tracking-tight text-[#242A27]">
          Lumora
        </span>
        <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded border border-[#D6DDD8] text-[#244B3C] bg-[#DCEBE2]">
          Adaptive
        </span>
      </div>
    </div>
  );
};
