import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onStartLearning: () => void;
  onExploreDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartLearning, onExploreDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold 24px for smooth frosted transition
      const isPastThreshold = window.scrollY > 24;
      setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Learning approach', href: '#learning-approach' },
    { name: 'For students', href: '#for-students' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full h-[76px] transition-all duration-300 ease-out ${
        scrolled ? 'frosted-glass-scrolled' : 'frosted-glass-top'
      }`}
    >
      <div className="max-w-[1240px] h-full mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <a
          href="#"
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] rounded-lg p-0.5"
          aria-label="Lumora homepage"
        >
          <Logo />
        </a>

        {/* Middle: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[14.5px] font-semibold text-[#68716C] hover:text-[#244B3C] transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#244B3C] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/auth"
            className="text-[14.5px] font-semibold text-[#242A27] hover:text-[#244B3C] transition-colors duration-200 px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] rounded-lg"
          >Sign in</Link>
          <button
            type="button"
            onClick={onExploreDemo}
            className="text-[14.5px] font-semibold text-[#242A27] hover:text-[#244B3C] transition-colors duration-200 px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] rounded-lg"
          >Try the demo</button>
          <button
            type="button"
            onClick={onStartLearning}
            className="group inline-flex items-center justify-center gap-2 bg-[#244B3C] text-[#FFFFFF] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1D3D31] active:scale-[0.99] transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8EBE9]"
          >
            <span>Start learning</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={onStartLearning}
            className="text-xs font-semibold bg-[#244B3C] text-[#FFFFFF] px-3 py-1.5 rounded-lg"
          >
            Start
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#244B3C] hover:bg-[#F8FAF9] rounded-xl border border-[#D6DDD8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D6DDD8] bg-[#F8FAF9]/95 backdrop-blur-xl px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[16px] font-semibold text-[#242A27] py-2 border-b border-[#D6DDD8]/60"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreDemo();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-[#242A27] border border-[#D6DDD8] rounded-xl bg-[#FFFFFF] hover:bg-[#E8EBE9] transition-colors"
              >Explore demo</button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartLearning();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold bg-[#244B3C] text-[#FFFFFF] rounded-xl shadow-xs hover:bg-[#1D3D31] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Start learning</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
