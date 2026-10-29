import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ValueStrip } from '../components/ValueStrip';
import { HowItWorks } from '../components/HowItWorks';
import { LearningApproach } from '../components/LearningApproach';
import { ForStudents } from '../components/ForStudents';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleOpenStart = () => navigate('/learn');
  const handleExploreDemo = () => navigate('/learn');
  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-[#E8EBE9] text-[#242A27] selection:bg-[#C6F36B]/30 selection:text-[#242A27] font-sans antialiased overflow-x-hidden">
      <Navbar onStartLearning={handleOpenStart} onSignIn={handleOpenSignIn} />
      <main id="main-content">
        <Hero onStartLearning={handleOpenStart} onSeeHowItWorks={handleScrollToHowItWorks} />
        <ValueStrip />
        <HowItWorks />
        <LearningApproach />
        <ForStudents onStartLearning={handleOpenStart} />
        <CTASection onStartLearning={handleOpenStart} />
      </main>
      <Footer />
    </div>
  );
};
