import React, { useState } from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onStartLearning: () => void;
  onExploreDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartLearning }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [{ name: 'How it works', href: '#how-it-works' }];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 h-[76px] w-full border-b border-[#D6DDD8]/70 bg-[#F8FAF9]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-6">
        <Link to="/" className="rounded-lg p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C]" aria-label="Lumora homepage"><Logo /></Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map(link => <a key={link.name} href={link.href} onClick={e => scrollTo(e, link.href)} className="text-sm font-semibold text-[#68716C] transition hover:text-[#244B3C]">{link.name}</a>)}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Link to="/auth" className="px-2 py-1.5 text-sm font-semibold text-[#242A27] hover:text-[#244B3C]">Sign in</Link>
          <button type="button" onClick={onStartLearning} className="group inline-flex items-center gap-2 rounded-xl bg-[#244B3C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D3D31]">
            Try the demo <ArrowRight className="h-3.5 w-3.5 text-[#C6F36B] transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <button type="button" onClick={onStartLearning} className="rounded-lg bg-[#244B3C] px-3 py-1.5 text-xs font-semibold text-white">Start</button>
          <button type="button" onClick={() => setMobileMenuOpen(v => !v)} className="rounded-xl border border-[#D6DDD8] p-2 text-[#244B3C]" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileMenuOpen && <div className="border-b border-[#D6DDD8] bg-[#F8FAF9] px-6 py-5 shadow-lg md:hidden"><nav className="flex flex-col gap-4" aria-label="Mobile navigation">{navLinks.map(link => <a key={link.name} href={link.href} onClick={e => scrollTo(e, link.href)} className="border-b border-[#D6DDD8]/60 py-2 text-sm font-semibold">{link.name}</a>)}<Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-[#244B3C]">Sign in</Link><button type="button" onClick={() => { setMobileMenuOpen(false); onStartLearning(); }} className="rounded-xl bg-[#244B3C] py-3 text-sm font-semibold text-white">Try the demo</button></nav></div>}
    </header>
  );
};
