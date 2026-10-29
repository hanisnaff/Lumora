import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { Difficulty } from '../types/learning';
import { getLearningPathModules, getRecommendedAction } from '../services/learningPathService';
import {
  Code2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const LearningSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedSubject,
    setSubject,
    selectedTopic,
    setTopic,
    difficulty,
    setDifficulty,
    assessmentResult,
    conceptMasteries,
    completedLessons,
    setActiveLessonConcept,
  } = useLearning();

  const subjects = [
    {
      id: 'C++',
      name: 'C++',
      featured: true,
      tag: 'Featured Demo',
      badge: 'Systems & Memory',
      description: 'Ideal for demonstrating concept-level learning, memory addresses, and pointer mechanics.',
    },
    {
      id: 'Python',
      name: 'Python',
      featured: false,
      tag: 'Preview',
      badge: 'Scripting',
      description: 'Dynamic typing, scoping rules, and memory references.',
    },
    {
      id: 'DataStructures',
      name: 'Data Structures',
      featured: false,
      tag: 'Preview',
      badge: 'Algorithms',
      description: 'Linked lists, trees, graphs, and memory layout.',
    },
  ];

  const topics = [
    'Variables and data types',
    'Conditions and loops',
    'Functions',
    'Pointers', // Featured demo topic
    'References',
    'Dynamic memory',
  ];

  const difficulties: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

  const pathModules = getLearningPathModules(conceptMasteries, completedLessons);
  const recommended = getRecommendedAction(
    !!assessmentResult,
    assessmentResult ? assessmentResult.weakestConceptId : null,
    conceptMasteries
  );

  const handleStartDiagnostic = () => {
    navigate('/assessment');
  };

  const handleModuleClick = (conceptId: any) => {
    setActiveLessonConcept(conceptId);
    navigate('/lesson');
  };

  return (
    <LearningShell
      title="Learning Setup & Path"
      subtitle="Start with the working C++ pointers demo. No account or sign-in is needed to try it."
    >
      <div className="space-y-10">
        
        {/* Setup Card Container */}
        <section className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden bg-dot-pattern">
          <div className="max-w-[700px]">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244B3C] mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
              <span>DIAGNOSTIC CONFIGURATION</span>
            </div>
            <h2 className="font-heading font-extrabold text-[#244B3C] tracking-tight text-2xl sm:text-3xl">
              Let's find your starting point.
            </h2>
            <p className="text-[15.5px] text-[#68716C] mt-2 leading-relaxed">
              C++ Pointers is the working demo. Choose your difficulty, answer five questions, then follow the lesson and practice recommended for you.
            </p>
          </div>

          {/* 1. Subject Selection */}
          <div className="mt-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#244B3C] mb-3">
              1. Choose a learning track
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subjects.map((sub) => {
                const isSelected = selectedSubject === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    disabled={!sub.featured}
                    aria-label={sub.featured ? `Select ${sub.name}` : `${sub.name} preview, coming soon`}
                    onClick={() => setSubject(sub.id)}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#244B3C] shadow-md ring-2 ring-[#244B3C]'
                        : 'bg-[#F8FAF9] border-[#D6DDD8] hover:bg-[#E8EBE9]/50'
                    } ${!sub.featured ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#244B3C]" />
                        <span className="font-heading font-bold text-base text-[#244B3C]">
                          {sub.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        sub.featured ? 'bg-[#244B3C] text-[#C6F36B]' : 'bg-[#D6DDD8]/50 text-[#68716C]'
                      }`}>
                        {sub.tag}
                      </span>
                    </div>

                    <p className="text-xs text-[#68716C] mt-2.5 leading-relaxed">
                      {sub.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Topic Selection */}
          <div className="mt-7">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#244B3C] mb-3">
              2. Choose a topic
            </label>
            <div className="flex flex-wrap gap-2.5">
              {topics.map((t) => {
                const isSelected = selectedTopic === t;
                const isFeatured = t === 'Pointers';
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={!isFeatured}
                    aria-label={isFeatured ? 'Select Pointers, active demo' : `${t}, preview coming soon`}
                    onClick={() => setTopic(t)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-180 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#244B3C] text-[#F8FAF9] border-[#244B3C] shadow-xs'
                        : 'bg-[#F8FAF9] text-[#68716C] border-[#D6DDD8] hover:text-[#244B3C] hover:bg-[#E8EBE9]/60'
                    } ${!isFeatured ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <span>{t}</span>
                    {isFeatured && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        isSelected ? 'bg-[#C6F36B] text-[#244B3C]' : 'bg-[#244B3C] text-[#C6F36B]'
                      }`}>
                        Active Demo
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Difficulty Preference */}
          <div className="mt-7">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#244B3C] mb-3">
              3. Choose your starting level
            </label>
            <div className="flex flex-wrap gap-3">
              {difficulties.map((diff) => {
                const isSelected = difficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-180 ${
                      isSelected
                        ? 'bg-[#244B3C] text-[#F8FAF9] border-[#244B3C]'
                        : 'bg-[#F8FAF9] text-[#68716C] border-[#D6DDD8] hover:text-[#244B3C] hover:bg-[#E8EBE9]/60'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-[#D6DDD8]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#68716C]">
              <Sparkles className="w-3.5 h-3.5 text-[#244B3C]" />
              <span>5 quick questions • About 3 minutes • No sign-in required</span>
            </div>

            <button
              type="button"
              onClick={handleStartDiagnostic}
              className="inline-flex items-center gap-2 bg-[#244B3C] text-[#F8FAF9] px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#1D3D31] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C]"
            >
              <span>Start diagnostic</span>
              <ArrowRight className="w-4 h-4 text-[#C6F36B]" />
            </button>
          </div>
        </section>

        {/* Dynamic Learning Path Overview */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[#244B3C] tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#244B3C]" />
                <span>Your learning steps: {selectedTopic}</span>
              </h3>
              <p className="text-xs text-[#68716C] mt-0.5">
                After the check, start with the lesson and practice suggested by your results.
              </p>
            </div>

            {/* Recommended Action Card / Button */}
            <button
              type="button"
              onClick={() => navigate(recommended.targetRoute)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8FAF9] border border-[#D6DDD8] text-xs font-bold text-[#244B3C] hover:border-[#244B3C] transition-colors shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#C6F36B] border border-[#244B3C]" />
              <span>Next: {recommended.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#68716C]" />
            </button>
          </div>

          {/* Module List with 3 states: Not started, In progress, Completed */}
          <div className="space-y-3">
            {pathModules.map((mod, index) => {
              const isCompleted = mod.status === 'completed';
              const isInProgress = mod.status === 'in-progress';
              const isNotStarted = mod.status === 'not-started';

              return (
                <div
                  key={mod.id}
                  onClick={() => handleModuleClick(mod.conceptId)}
                  className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-180 hover:border-[#244B3C]/40 hover:-translate-y-0.5 cursor-pointer shadow-xs"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* State Marker */}
                    <div className="shrink-0 mt-0.5 sm:mt-0">
                      {isCompleted && (
                        <div className="w-9 h-9 rounded-full bg-[#244B3C] text-[#C6F36B] flex items-center justify-center shadow-xs">
                          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      )}
                      {isInProgress && (
                        <div className="w-9 h-9 rounded-full bg-[#F8FAF9] border-2 border-[#244B3C] flex items-center justify-center shadow-xs">
                          <span className="w-3 h-3 rounded-full bg-[#C6F36B]" />
                        </div>
                      )}
                      {isNotStarted && (
                        <div className="w-9 h-9 rounded-full bg-[#E8EBE9] border border-[#D6DDD8] flex items-center justify-center text-xs font-mono font-bold text-[#68716C]">
                          0{index + 1}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-sm sm:text-base text-[#244B3C]">
                          {mod.title}
                        </h4>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-[#244B3C]/10 text-[#244B3C]'
                            : isInProgress
                            ? 'bg-[#244B3C] text-[#C6F36B]'
                            : 'bg-[#D6DDD8]/40 text-[#68716C]'
                        }`}>
                          {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                      <p className="text-xs text-[#68716C] mt-1 line-clamp-1">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  {/* Right metadata & Action */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D6DDD8]/40">
                    <div className="flex items-center gap-3 text-xs text-[#68716C]">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#68716C]" />
                        <span>~{mod.estimatedMinutes}m</span>
                      </span>
                      {mod.masteryScore > 0 && (
                        <span className="font-bold text-[#244B3C] font-mono">
                          {mod.masteryScore}% mastery
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#244B3C] hover:text-[#1D3D31] transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'Review' : 'Open'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </LearningShell>
  );
};
