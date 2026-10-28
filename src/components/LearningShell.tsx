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
    <div className="min-h-screen bg-[#E8EBE9] text-[#242A27] flex flex-col md:flex-row antialiased selection:bg-[#C6F36B]/40 selection:text-[#244B3C]">
      {/* Desktop Sidebar (Left ~260px) */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-[#D6DDD8] bg-[#F8FAF9] shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#D6DDD8]/70">
          <NavLink to="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] rounded-lg">
            <Logo size={24} />
          </NavLink>

          <div className="mt-4 px-3 py-2 rounded-xl bg-[#E8EBE9] border border-[#D6DDD8] text-xs text-[#68716C] flex items-center justify-between">
            <span className="font-bold text-[#244B3C]">{selectedSubject} Track</span>
            <span className="text-[10px] font-mono font-bold uppercase bg-[#244B3C] text-[#C6F36B] px-1.5 py-0.5 rounded">
              {selectedTopic}
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 p-3.5 space-y-1" aria-label="Learning Portal Navigation">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#68716C] uppercase">
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
                    ? 'bg-[#244B3C] text-[#F8FAF9] shadow-xs'
                    : 'text-[#68716C] hover:text-[#244B3C] hover:bg-[#E8EBE9]/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6F36B]' : 'text-[#68716C]'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Contextual Study Flow Items */}
          <div className="pt-4 px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#68716C] uppercase">
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
                    ? 'bg-[#244B3C] text-[#F8FAF9] shadow-xs'
                    : 'text-[#68716C] hover:text-[#244B3C] hover:bg-[#E8EBE9]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6F36B]' : 'text-[#68716C]'}`} />
                  <span>{item.name}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  isActive ? 'bg-[#C6F36B] text-[#244B3C]' : 'bg-[#D6DDD8]/50 text-[#68716C]'
                }`}>
                  {item.badge}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Diagnostic Snapshot Badge in Sidebar */}
        <div className="p-3.5 mx-3 mb-3 bg-[#E8EBE9]/80 border border-[#D6DDD8] rounded-xl text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#244B3C] font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#244B3C]" />
              <span>Diagnostic status</span>
            </span>
            <span className="font-mono text-[10px] bg-[#244B3C] text-[#C6F36B] px-1.5 py-0.2 rounded font-bold">
              {assessmentResult ? `${assessmentResult.percentage}%` : 'Pending'}
            </span>
          </div>
          <p className="text-[11px] text-[#68716C] leading-tight">
            {assessmentResult
              ? `Weakest concept: ${assessmentResult.conceptMastery[assessmentResult.weakestConceptId]?.conceptName || 'Pointers'}`
              : 'Take the 5-question baseline to isolate gaps.'}
          </p>
        </div>

        {/* Sidebar Footer with Reset Button */}
        <div className="p-3.5 border-t border-[#D6DDD8]/70">
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#68716C] hover:text-[#244B3C] hover:bg-[#E8EBE9]/80 rounded-xl border border-[#D6DDD8]/80 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Progress</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[#F8FAF9] border-b border-[#D6DDD8] px-4 py-3 flex items-center justify-between">
        <NavLink to="/">
          <Logo size={22} />
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink
            to="/learn"
            className="text-xs font-bold bg-[#244B3C] text-[#F8FAF9] px-3 py-1.5 rounded-lg"
          >
            Learning Path
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg border border-[#D6DDD8] text-[#244B3C]"
            aria-label="Toggle navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-[#F8FAF9] border-b border-[#D6DDD8] px-5 py-4 space-y-2 z-30 shadow-md">
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
                  isActive ? 'bg-[#244B3C] text-[#F8FAF9]' : 'text-[#68716C] hover:bg-[#E8EBE9]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
          <div className="pt-2 border-t border-[#D6DDD8]/50">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-semibold text-[#68716C]"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </span>
                  <span className="text-[10px] bg-[#D6DDD8]/40 px-1.5 py-0.5 rounded font-mono">{item.badge}</span>
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
            className="w-full mt-3 py-2 text-xs font-semibold text-[#68716C] border border-[#D6DDD8] rounded-xl"
          >
            Reset Demo Progress
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Optional Page Subheader */}
        {(title || subtitle) && (
          <div className="border-b border-[#D6DDD8] bg-[#F8FAF9]/80 px-6 py-5">
            <div className="max-w-[1100px] mx-auto">
              {title && (
                <h1 className="font-heading font-extrabold text-2xl text-[#244B3C] tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-[#68716C] mt-1">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244B3C]/40 backdrop-blur-xs">
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-[#244B3C]">
              Reset Demo Progress?
            </h3>
            <p className="text-sm text-[#68716C] mt-2 leading-relaxed">
              This will clear your diagnostic assessment results, concept mastery scores, and return the demo to its initial state.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#68716C] hover:text-[#244B3C] rounded-xl border border-[#D6DDD8]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="px-4 py-2 text-xs font-semibold bg-[#244B3C] text-[#F8FAF9] rounded-xl hover:bg-[#1D3D31]"
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
