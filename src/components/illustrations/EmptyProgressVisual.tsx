import React from 'react';

export const EmptyProgressVisual: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto py-6 select-none">
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Subtle topographic contour landscape */}
        <path
          d="M 20 140 C 70 120, 120 150, 180 130 C 240 110, 270 140, 300 125"
          stroke="#D6DDD8"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <path
          d="M 20 100 C 80 80, 140 110, 200 90 C 250 70, 280 100, 300 85"
          stroke="#D6DDD8"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.5"
        />

        {/* Winding Concept Path awaiting charting */}
        <path
          d="M 50 145 C 90 140, 110 95, 160 90 C 210 85, 230 45, 270 40"
          stroke="#244B3C"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* Starting Origin Marker */}
        <circle cx="50" cy="145" r="14" fill="#F8FAF9" stroke="#244B3C" strokeWidth="2" />
        <circle cx="50" cy="145" r="6" fill="#C6F36B" />

        {/* Stepping stone 1 (Uncharted) */}
        <circle cx="160" cy="90" r="12" fill="#F8FAF9" stroke="#D6DDD8" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="160" cy="90" r="4" fill="#D6DDD8" />

        {/* Target Destination Milestone (Summit / Pin) */}
        <g transform="translate(270, 40)">
          <circle r="16" fill="#244B3C" />
          <path d="M -5 -2 L 0 -7 L 5 -2 M 0 -7 L 0 6" stroke="#C6F36B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating Compass Rose Accent */}
        <g transform="translate(260, 130)">
          <circle r="18" fill="#F8FAF9" stroke="#D6DDD8" strokeWidth="1" />
          <path d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z" fill="#244B3C" />
          <circle r="2" fill="#C6F36B" />
        </g>

        {/* Label Tag */}
        <rect x="75" y="132" width="105" height="20" rx="4" fill="#244B3C" />
        <text x="82" y="146" fill="#F8FAF9" fontSize="9" fontWeight="600" fontFamily="Inter">
          Trail: 0 / 5 Concepts
        </text>
      </svg>
    </div>
  );
};
