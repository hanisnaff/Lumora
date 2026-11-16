import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { getRecommendedAction } from '../services/learningPathService';
import { ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, Dumbbell, LockKeyhole } from 'lucide-react';

export const LearningSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentResult, conceptMasteries, setActiveLessonConcept } = useLearning();

  const next = getRecommendedAction(
    Boolean(assessmentResult),
    assessmentResult?.weakestConceptId ?? null,
    conceptMasteries
  );

  const continueLearning = () => {
    if (next.conceptId) setActiveLessonConcept(next.conceptId);
    navigate(next.targetRoute);
  };

  const steps = [
    {
      number: '01',
      title: 'Check your starting point',
      description: 'Answer five short questions. There is no pass or fail.',
      icon: ClipboardCheck,
      state: assessmentResult ? 'done' : 'current',
      action: assessmentResult ? 'View results' : 'Start check',
      onClick: () => navigate(assessmentResult ? '/results' : '/assessment'),
    },
    {
      number: '02',
      title: 'Learn what needs work',
      description: 'Get one focused explanation based on your answers.',
      icon: BookOpen,
      state: assessmentResult ? 'current' : 'upcoming',
      action: 'Open lesson',
      onClick: () => {
        if (assessmentResult) setActiveLessonConcept(assessmentResult.weakestConceptId);
        navigate(assessmentResult ? '/lesson' : '/assessment');
      },
    },
    {
      number: '03',
      title: 'Try a few questions',
      description: 'Practise the concept and see whether it makes sense.',
      icon: Dumbbell,
      state: 'upcoming',
      action: 'Practice',
      onClick: () => navigate(assessmentResult ? '/practice' : '/assessment'),
    },
  ] as const;

  return (
    <LearningShell title="Your learning path" subtitle="One small step at a time. Lumora guides you through the process.">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border border-[#E2E8E2] bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#54715F]">
            <span className="rounded-full bg-[#EDF4EE] px-3 py-1">WORKING DEMO</span>
            <span>C++</span><span aria-hidden="true">·</span><span>Pointers</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#202923] sm:text-3xl">
            {assessmentResult ? 'Here is what to do next.' : 'First, let’s see what you already know.'}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#68736C]">
            {assessmentResult
              ? 'Your answers are saved. Continue with the recommended lesson, then practise what you learned.'
              : 'Take a quick five-question check. We’ll use your answers to choose what you should study first.'}
          </p>
          <button
            type="button"
            onClick={continueLearning}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#285443] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1F4436] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285443]"
          >
            {assessmentResult ? 'Continue learning' : 'Start the 3-minute check'}
            <ArrowRight className="h-4 w-4" />
          </button>
          {assessmentResult && (
            <button type="button" onClick={() => navigate('/results')} className="ml-3 mt-6 rounded-xl px-3 py-3 text-sm font-semibold text-[#285443] hover:bg-[#EDF4EE]">
              See my results
            </button>
          )}
        </section>

        <section className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-[#202923]">How it works</h3>
            <p className="mt-1 text-sm text-[#68736C]">You only need to follow these three steps.</p>
          </div>
          <div className="space-y-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const complete = step.state === 'done';
              const current = step.state === 'current';
              return (
                <article key={step.number} className={`flex items-center gap-4 rounded-xl border p-4 sm:p-5 ${current ? 'border-[#B9D0BE] bg-white' : 'border-[#E2E8E2] bg-white'}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${complete ? 'bg-[#EDF4EE] text-[#285443]' : current ? 'bg-[#285443] text-white' : 'bg-[#F1F3F1] text-[#879189]'}`}>
                    {complete ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-[#89938B]">{step.number}</span>
                      <h4 className="font-semibold text-[#202923]">{step.title}</h4>
                      {complete && <span className="rounded-full bg-[#EDF4EE] px-2 py-0.5 text-[10px] font-semibold text-[#285443]">DONE</span>}
                      {!current && !complete && <LockKeyhole className="h-3.5 w-3.5 text-[#A1AAA3]" />}
                    </div>
                    <p className="mt-1 text-sm leading-5 text-[#68736C]">{step.description}</p>
                  </div>
                  <button type="button" onClick={step.onClick} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-[#285443] hover:bg-[#EDF4EE]">
                    {step.action}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
        <p className="text-center text-xs text-[#89938B]">This demo currently covers C++ pointers. More subjects will be added later.</p>
      </div>
    </LearningShell>
  );
};
