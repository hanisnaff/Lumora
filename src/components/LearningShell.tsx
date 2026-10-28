import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import {
  Home,
  Compass,
  FileCheck2,
  TrendingUp,
  BookOpen,
  Target,
  Menu,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

interface LearningShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const LearningShell: React.FC<LearningShellProps> = ({
  children,
  title,
  subtitle,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentResult, resetProgress, selectedSubject, selectedTopic } = useLearning();

  const navItems = [
    { name: 'Home', path: '/', icon: Home, exact: true },
    { name: 'My learning', path: '/learn', icon: Compass },
    { name: 'Assessment', path: '/assessment', icon: FileCheck2 },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
  ];

  // Secondary sub-items for active learning flow
  const subNavItems = [
    { name: 'Active Lesson', path: '/lesson', icon: BookOpen, badge: 'Lesson' },
    { name: 'Targeted Practice', path: '/practice', icon: Target, badge: 'Drill' },
  ];

  const handleResetConfirm = () => {
    resetProgress();
    setResetModalOpen(false);
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#28302B] flex flex-col md:flex-row antialiased selection:bg-[#C8E348]/40 selection:text-[#1A3628]">
      {/* Desktop Sidebar (Left ~260px) */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-[#D9CCBA] bg-[#FAF8F3] shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#D9CCBA]/70">
          <NavLink to="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3628] rounded-lg">
            <Logo size={24} />
          </NavLink>

          <div className="mt-4 px-3 py-2 rounded-xl bg-[#F3EBDD] border border-[#D9CCBA] text-xs text-[#5C675F] flex items-center justify-between">
            <span className="font-bold text-[#1A3628]">{selectedSubject} Track</span>
            <span className="text-[10px] font-mono font-bold uppercase bg-[#1A3628] text-[#C8E348] px-1.5 py-0.5 rounded">
              {selectedTopic}
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 p-3.5 space-y-1" aria-label="Learning Portal Navigation">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#5C675F] uppercase">
            Platform
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-180 ${
                  isActive
                    ? 'bg-[#1A3628] text-[#FAF8F3] shadow-xs'
                    : 'text-[#5C675F] hover:text-[#1A3628] hover:bg-[#F3EBDD]/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8E348]' : 'text-[#5C675F]'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Contextual Study Flow Items */}
          <div className="pt-4 px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#5C675F] uppercase">
            Adaptive Workspace
          </div>
          {subNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-180 ${
                  isActive
                    ? 'bg-[#1A3628] text-[#FAF8F3] shadow-xs'
                    : 'text-[#5C675F] hover:text-[#1A3628] hover:bg-[#F3EBDD]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8E348]' : 'text-[#5C675F]'}`} />
                  <span>{item.name}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  isActive ? 'bg-[#C8E348] text-[#1A3628]' : 'bg-[#D9CCBA]/50 text-[#5C675F]'
                }`}>
                  {item.badge}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Diagnostic Snapshot Badge in Sidebar */}
        <div className="p-3.5 mx-3 mb-3 bg-[#F3EBDD]/80 border border-[#D9CCBA] rounded-xl text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#1A3628] font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1A3628]" />
              <span>Diagnostic status</span>
            </span>
            <span className="font-mono text-[10px] bg-[#1A3628] text-[#C8E348] px-1.5 py-0.2 rounded font-bold">
              {assessmentResult ? `${assessmentResult.percentage}%` : 'Pending'}
            </span>
          </div>
          <p className="text-[11px] text-[#5C675F] leading-tight">
            {assessmentResult
              ? `Weakest concept: ${assessmentResult.conceptMastery[assessmentResult.weakestConceptId]?.conceptName || 'Pointers'}`
              : 'Take the 5-question baseline to isolate gaps.'}
          </p>
        </div>

        {/* Sidebar Footer with Reset Button */}
        <div className="p-3.5 border-t border-[#D9CCBA]/70">
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#5C675F] hover:text-[#1A3628] hover:bg-[#F3EBDD]/80 rounded-xl border border-[#D9CCBA]/80 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Progress</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[#FAF8F3] border-b border-[#D9CCBA] px-4 py-3 flex items-center justify-between">
        <NavLink to="/">
          <Logo size={22} />
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink
            to="/learn"
            className="text-xs font-bold bg-[#1A3628] text-[#FAF8F3] px-3 py-1.5 rounded-lg"
          >
            Learning Path
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg border border-[#D9CCBA] text-[#1A3628]"
            aria-label="Toggle navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-[#FAF8F3] border-b border-[#D9CCBA] px-5 py-4 space-y-2 z-30 shadow-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive ? 'bg-[#1A3628] text-[#FAF8F3]' : 'text-[#5C675F] hover:bg-[#F3EBDD]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
          <div className="pt-2 border-t border-[#D9CCBA]/50">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-semibold text-[#5C675F]"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </span>
                  <span className="text-[10px] bg-[#D9CCBA]/40 px-1.5 py-0.5 rounded font-mono">{item.badge}</span>
                </NavLink>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileSidebarOpen(false);
              setResetModalOpen(true);
            }}
            className="w-full mt-3 py-2 text-xs font-semibold text-[#5C675F] border border-[#D9CCBA] rounded-xl"
          >
            Reset Demo Progress
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Optional Page Subheader */}
        {(title || subtitle) && (
          <div className="border-b border-[#D9CCBA] bg-[#FAF8F3]/80 px-6 py-5">
            <div className="max-w-[1100px] mx-auto">
              {title && (
                <h1 className="font-heading font-extrabold text-2xl text-[#1A3628] tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-[#5C675F] mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 p-5 sm:p-8 lg:p-10">
          <div className="max-w-[1100px] mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A3628]/40 backdrop-blur-xs">
          <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-[#1A3628]">
              Reset Demo Progress?
            </h3>
            <p className="text-sm text-[#5C675F] mt-2 leading-relaxed">
              This will clear your diagnostic assessment results, concept mastery scores, and return the demo to its initial state.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#5C675F] hover:text-[#1A3628] rounded-xl border border-[#D9CCBA]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="px-4 py-2 text-xs font-semibold bg-[#1A3628] text-[#FAF8F3] rounded-xl hover:bg-[#254636]"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
