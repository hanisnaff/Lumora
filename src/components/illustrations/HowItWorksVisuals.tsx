import React from 'react';

export const DiscoverVisual: React.FC = () => {
  return (
    <div className="w-full h-36 flex items-center justify-center p-2 select-none">
      <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[260px]">
        {/* Radar / Diagnostic Scanning Field */}
        <circle cx="140" cy="70" r="58" stroke="#D9CCBA" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="140" cy="70" r="38" stroke="#D9CCBA" strokeWidth="1" opacity="0.8" />
        <circle cx="140" cy="70" r="18" stroke="#1A3628" strokeWidth="1.5" />

        {/* Scanning beam angle */}
        <path d="M 140 70 L 195 35 A 58 58 0 0 1 198 70 Z" fill="#C8E348" opacity="0.25" />

        {/* Verified Knowledge Nodes */}
        <circle cx="95" cy="48" r="8" fill="#1A3628" />
        <path d="M 93 48 L 95 50 L 98 46" stroke="#C8E348" strokeWidth="1.5" strokeLinecap="round" />

        <circle cx="102" cy="98" r="8" fill="#1A3628" />
        <path d="M 100 98 L 102 100 L 105 96" stroke="#C8E348" strokeWidth="1.5" strokeLinecap="round" />

        <circle cx="178" cy="102" r="8" fill="#1A3628" />
        <path d="M 176 102 L 178 104 L 181 100" stroke="#C8E348" strokeWidth="1.5" strokeLinecap="round" />

        {/* TARGET GAP DETECTED (Pulsing node) */}
        <circle cx="182" cy="46" r="14" fill="#C8E348" opacity="0.25" />
        <circle cx="182" cy="46" r="9" fill="#FAF8F3" stroke="#1A3628" strokeWidth="2.5" />
        <circle cx="182" cy="46" r="3" fill="#C8E348" />

        {/* Crosshair / Reticle on Gap */}
        <line x1="182" y1="28" x2="182" y2="34" stroke="#1A3628" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="182" y1="58" x2="182" y2="64" stroke="#1A3628" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="164" y1="46" x2="170" y2="46" stroke="#1A3628" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="194" y1="46" x2="200" y2="46" stroke="#1A3628" strokeWidth="1.5" strokeLinecap="round" />

        {/* Small Data Chip */}
        <rect x="188" y="24" width="76" height="18" rx="4" fill="#1A3628" />
        <text x="194" y="36" fill="#C8E348" fontSize="8" fontWeight="700" fontFamily="monospace">
          GAP ISOLATED
        </text>
      </svg>
    </div>
  );
};

export const UnderstandVisual: React.FC = () => {
  return (
    <div className="w-full h-36 flex items-center justify-center p-2 select-none">
      <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[260px]">
        {/* Layered Knowledge Architecture / Mental Model Stack */}
        
        {/* Layer 1: Core Foundation Base */}
        <rect x="40" y="94" width="200" height="26" rx="6" fill="#FAF8F3" stroke="#D9CCBA" strokeWidth="1.5" />
        <circle cx="56" cy="107" r="4" fill="#1A3628" />
        <text x="68" y="111" fill="#28302B" fontSize="9" fontWeight="600" fontFamily="Inter">
          Layer 01 &bull; Memory Allocation & RAM
        </text>
        <rect x="196" y="99" width="36" height="15" rx="3" fill="#1A3628" />
        <text x="202" y="110" fill="#C8E348" fontSize="8" fontWeight="700" fontFamily="monospace">
          94%
        </text>

        {/* Connecting Guide Lines */}
        <line x1="140" y1="94" x2="140" y2="82" stroke="#1A3628" strokeWidth="1.5" strokeDasharray="2 3" />

        {/* Layer 2: Targeted Remediation Focus (Deep Forest Green Card) */}
        <rect x="55" y="52" width="170" height="30" rx="6" fill="#1A3628" stroke="#C8E348" strokeWidth="1.5" />
        <circle cx="72" cy="67" r="5" fill="#C8E348" />
        <text x="84" y="71" fill="#FAF8F3" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">
          Dereferencing (*ptr)
        </text>
        <rect x="180" y="58" width="38" height="16" rx="3" fill="#C8E348" />
        <text x="184" y="69.5" fill="#1A3628" fontSize="8" fontWeight="800" fontFamily="monospace">
          DRILL
        </text>

        {/* Connecting Guide Lines */}
        <line x1="140" y1="52" x2="140" y2="40" stroke="#D9CCBA" strokeWidth="1.5" strokeDasharray="2 3" />

        {/* Layer 3: Target Application (Upcoming) */}
        <rect x="70" y="16" width="140" height="24" rx="6" fill="#FAF8F3" stroke="#D9CCBA" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="140" y="32" textAnchor="middle" fill="#5C675F" fontSize="9" fontWeight="600" fontFamily="Inter">
          Next &bull; Pointer Arithmetic & Data Structures
        </text>
      </svg>
    </div>
  );
};

export const ImproveVisual: React.FC = () => {
  return (
    <div className="w-full h-36 flex items-center justify-center p-2 select-none">
      <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[260px]">
        {/* Dynamic Trajectory / Adaptive Progress Loop */}
        
        {/* Coordinate Axis */}
        <line x1="35" y1="115" x2="250" y2="115" stroke="#D9CCBA" strokeWidth="1.2" />
        <line x1="35" y1="115" x2="35" y2="20" stroke="#D9CCBA" strokeWidth="1.2" />

        {/* Trajectory Curve: Starts low, jumps with adaptive drill, reaches mastery */}
        <path
          d="M 35 105 C 75 100, 100 85, 130 65 C 160 45, 190 35, 235 28"
          stroke="#1A3628"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Accent Glow Fill under Curve */}
        <path
          d="M 35 105 C 75 100, 100 85, 130 65 C 160 45, 190 35, 235 28 L 235 115 L 35 115 Z"
          fill="url(#improveGradient)"
          opacity="0.3"
        />

        <defs>
          <linearGradient id="improveGradient" x1="35" y1="28" x2="35" y2="115" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C8E348" stopOpacity="0.8" />
            <stop offset="1" stopColor="#FAF8F3" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Checkpoint 1: Initial Diagnosis (42%) */}
        <circle cx="85" cy="94" r="5" fill="#FAF8F3" stroke="#1A3628" strokeWidth="2" />
        <text x="85" y="82" textAnchor="middle" fill="#5C675F" fontSize="8" fontWeight="600" fontFamily="monospace">
          42%
        </text>

        {/* Checkpoint 2: Post-Explanation Recheck (74%) */}
        <circle cx="145" cy="55" r="5" fill="#FAF8F3" stroke="#1A3628" strokeWidth="2" />
        <text x="145" y="44" textAnchor="middle" fill="#1A3628" fontSize="8" fontWeight="700" fontFamily="monospace">
          74%
        </text>

        {/* Checkpoint 3: Mastery Target (88%) with Lime Star */}
        <circle cx="215" cy="30" r="10" fill="#1A3628" />
        <circle cx="215" cy="30" r="4" fill="#C8E348" />
        <rect x="180" y="10" width="70" height="15" rx="3" fill="#C8E348" />
        <text x="215" y="21" textAnchor="middle" fill="#1A3628" fontSize="8" fontWeight="800" fontFamily="monospace">
          88% MASTERED
        </text>

        {/* Recalibration Feedback arrow */}
        <path
          d="M 235 60 C 248 75, 220 90, 185 88"
          stroke="#C8E348"
          strokeWidth="1.8"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
        <polygon points="183,88 188,85 188,91" fill="#C8E348" />
      </svg>
    </div>
  );
};
