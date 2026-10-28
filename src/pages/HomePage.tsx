import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ValueStrip } from '../components/ValueStrip';
import { HowItWorks } from '../components/HowItWorks';
import { LearningApproach } from '../components/LearningApproach';
import { ForStudents } from '../components/ForStudents';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { QuickStartModal } from '../components/QuickStartModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'start' | 'signin';
  }>({
    isOpen: false,
    type: 'start',
  });

  const handleOpenStart = () => {
    // Navigate straight to the learning setup!
    navigate('/learn');
  };

  const handleOpenSignIn = () => {
    setModalState({ isOpen: true, type: 'signin' });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E8EBE9] text-[#242A27] selection:bg-[#C6F36B]/30 selection:text-[#242A27] font-sans antialiased overflow-x-hidden">
      {/* Refined Navigation Bar */}
      <Navbar
        onStartLearning={handleOpenStart}
        onSignIn={handleOpenSignIn}
      />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onStartLearning={handleOpenStart}
          onSeeHowItWorks={handleScrollToHowItWorks}
        />

        {/* Value Proposition Strip */}
        <ValueStrip />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Learning Approach Section */}
        <LearningApproach />

        {/* For Students Section */}
        <ForStudents onStartLearning={handleOpenStart} />

        {/* Closing Call to Action */}
        <CTASection onStartLearning={handleOpenStart} />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Interactive Modal */}
      <QuickStartModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type={modalState.type}
        onNavigateToLearn={() => navigate('/learn')}
      />
    </div>
  );
};
