import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="border-t border-[#D9CCBA] bg-[#F3EBDD] py-14">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#D9CCBA]/60">
          
          {/* Left: Wordmark & Tagline */}
          <div className="space-y-2">
            <Logo size={26} />
            <p className="text-[14.5px] text-[#5C675F] pt-1">
              A learning path built around you.
            </p>
          </div>

          {/* Right: Minimal Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8" aria-label="Footer Navigation">
            <a
              href="#how-it-works"
              onClick={(e) => handleLinkClick(e, '#how-it-works')}
              className="text-sm font-semibold text-[#5C675F] hover:text-[#1A3628] transition-colors"
            >
              How it works
            </a>
            <a
              href="#learning-approach"
              onClick={(e) => handleLinkClick(e, '#learning-approach')}
              className="text-sm font-semibold text-[#5C675F] hover:text-[#1A3628] transition-colors"
            >
              Learning approach
            </a>
            <a
              href="#for-students"
              onClick={(e) => handleLinkClick(e, '#for-students')}
              className="text-sm font-semibold text-[#5C675F] hover:text-[#1A3628] transition-colors"
            >
              For students
            </a>
          </nav>
        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C675F]">
          <p>&copy; {new Date().getFullYear()} MindPath AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1A3628] cursor-pointer transition-colors">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-[#1A3628] cursor-pointer transition-colors">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-[#1A3628] cursor-pointer transition-colors">System Status</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
