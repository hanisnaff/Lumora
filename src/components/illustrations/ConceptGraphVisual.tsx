import React from 'react';
import { motion } from 'framer-motion';

interface ConceptGraphVisualProps {
  className?: string;
  activeConceptName?: string;
}

export const ConceptGraphVisual: React.FC<ConceptGraphVisualProps> = ({
  className = '',
  activeConceptName = 'Dereferencing (*ptr)'
}) => {
  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 0 460 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          {/* Subtle gradient for active branch */}
          <linearGradient id="activeBranch" x1="100" y1="130" x2="230" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#244B3C" />
            <stop offset="0.7" stopColor="#C6F36B" />
            <stop offset="1" stopColor="#244B3C" />
          </linearGradient>

          <linearGradient id="completedBranch" x1="100" y1="130" x2="230" y2="190" gradientUnits="userSpaceOnUse">
            <stop stopColor="#244B3C" />
            <stop offset="1" stopColor="#315844" />
          </linearGradient>

          {/* Glow filter for active concept node */}
          <filter id="limeGlow" x="190" y="30" width="80" height="80" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Grid Lines in background */}
        <line x1="40" y1="70" x2="420" y2="70" stroke="#D6DDD8" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />
        <line x1="40" y1="130" x2="420" y2="130" stroke="#D6DDD8" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />
        <line x1="40" y1="190" x2="420" y2="190" stroke="#D6DDD8" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />

        {/* Connection Paths */}
        {/* Root (100, 130) -> Node 1 Completed (230, 190) */}
        <path
          d="M 100 130 C 150 130, 180 190, 230 190"
          stroke="url(#completedBranch)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Root (100, 130) -> Node 2 ACTIVE GAP (230, 70) */}
        <path
          d="M 100 130 C 150 130, 180 70, 230 70"
          stroke="url(#activeBranch)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Active Node (230, 70) -> Upcoming Node 3 (370, 70) */}
        <path
          d="M 230 70 L 370 70"
          stroke="#D6DDD8"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />

        {/* Completed Node 1 (230, 190) -> Upcoming Node 4 (370, 190) */}
        <path
          d="M 230 190 L 370 190"
          stroke="#D6DDD8"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />

        {/* Diagonal Cross-Prerequisite Link */}
        <path
          d="M 230 190 C 290 190, 310 70, 370 70"
          stroke="#D6DDD8"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.7"
        />

        {/* ROOT NODE: (100, 130) Core Foundations */}
        <g transform="translate(100, 130)">
          <circle r="18" fill="#244B3C" />
          <circle r="22" stroke="#244B3C" strokeWidth="1" opacity="0.3" />
          {/* Checkmark icon */}
          <path d="M-5 0 L-1 4 L6 -4" stroke="#C6F36B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="0" y="34" textAnchor="middle" fill="#242A27" fontSize="10" fontWeight="600" fontFamily="Inter">
            Memory Addr (&)
          </text>
          <text x="0" y="45" textAnchor="middle" fill="#7D8880" fontSize="8.5" fontFamily="monospace">
            MASTERED
          </text>
        </g>

        {/* NODE 1: (230, 190) Completed Branch */}
        <g transform="translate(230, 190)">
          <circle r="16" fill="#244B3C" />
          <path d="M-4 0 L-1 3 L5 -3" stroke="#C6F36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="0" y="32" textAnchor="middle" fill="#242A27" fontSize="10" fontWeight="600" fontFamily="Inter">
            Type* Syntax
          </text>
          <text x="0" y="43" textAnchor="middle" fill="#7D8880" fontSize="8.5" fontFamily="monospace">
            VERIFIED
          </text>
        </g>

        {/* NODE 2: (230, 70) ACTIVE FOCUS / GAP ISOLATED */}
        <g transform="translate(230, 70)">
          {/* Pulsing Accent Glow */}
          <circle r="26" fill="#C6F36B" opacity="0.3" filter="url(#limeGlow)" />
          <motion.circle
            r="23"
            stroke="#C6F36B"
            strokeWidth="2"
            fill="none"
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle r="18" fill="#244B3C" stroke="#C6F36B" strokeWidth="2.5" />
          {/* Focal target icon */}
          <circle r="4" fill="#C6F36B" />
          <text x="0" y="-28" textAnchor="middle" fill="#244B3C" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans">
            {activeConceptName}
          </text>
          <rect x="-44" y="-22" width="88" height="15" rx="7.5" fill="#C6F36B" />
          <text x="0" y="-12" textAnchor="middle" fill="#244B3C" fontSize="8" fontWeight="800" fontFamily="monospace" letterSpacing="0.5">
            CURRENT FOCUS
          </text>
        </g>

        {/* NODE 3: (370, 70) Upcoming Milestone */}
        <g transform="translate(370, 70)">
          <circle r="15" fill="#F8FAF9" stroke="#D6DDD8" strokeWidth="2" />
          <circle r="4" fill="#D6DDD8" />
          <text x="0" y="30" textAnchor="middle" fill="#68716C" fontSize="10" fontWeight="500" fontFamily="Inter">
            Pointer Mutation
          </text>
          <text x="0" y="41" textAnchor="middle" fill="#7D8880" fontSize="8.5" fontFamily="monospace">
            UPCOMING
          </text>
        </g>

        {/* NODE 4: (370, 190) Upcoming Safety */}
        <g transform="translate(370, 190)">
          <circle r="15" fill="#F8FAF9" stroke="#D6DDD8" strokeWidth="2" />
          <circle r="4" fill="#D6DDD8" />
          <text x="0" y="30" textAnchor="middle" fill="#68716C" fontSize="10" fontWeight="500" fontFamily="Inter">
            nullptr Safety
          </text>
          <text x="0" y="41" textAnchor="middle" fill="#7D8880" fontSize="8.5" fontFamily="monospace">
            QUEUED
          </text>
        </g>

        {/* Small Data Badge / Telemetry Label */}
        <g transform="translate(150, 48)">
          <rect x="0" y="0" width="72" height="18" rx="4" fill="#F8FAF9" stroke="#D6DDD8" strokeWidth="1" />
          <circle cx="8" cy="9" r="3" fill="#C6F36B" />
          <text x="16" y="12.5" fill="#242A27" fontSize="8.5" fontWeight="600" fontFamily="monospace">
            Gap: 42%
          </text>
        </g>
      </svg>
    </div>
  );
};
