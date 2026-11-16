import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const start = () => navigate('/learn');
  const scrollToSteps = () => {
    const section = document.getElementById('how-it-works');
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#E8EBE9] text-[#242A27] selection:bg-[#C6F36B]/30 selection:text-[#242A27] font-sans antialiased overflow-x-hidden">
      <Navbar onStartLearning={start} onExploreDemo={start} />
      <main id="main-content">
        <Hero onStartLearning={start} onSeeHowItWorks={scrollToSteps} />
        <HowItWorks />
        <CTASection onStartLearning={start} />
      </main>
      <Footer />
    </div>
  );
};
