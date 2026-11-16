import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { ConceptId } from '../types/learning';
import { ArrowRight, RotateCcw } from 'lucide-react';

export const KnowledgeGapResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentResult, selectedSubject, setActiveLessonConcept } = useLearning();

  if (!assessmentResult) {
    return (
      <LearningShell title="Your results">
        <section className="mx-auto max-w-lg rounded-2xl border border-[#E2E8E2] bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-[#202923]">No results yet</h2>
          <p className="mt-2 text-sm leading-6 text-[#68736C]">Take the short starting check first. Lumora will then show you what to focus on.</p>
          <button type="button" onClick={() => navigate('/assessment')} className="mt-5 rounded-xl bg-[#285443] px-5 py-3 text-sm font-semibold text-white">Start the check</button>
        </section>
      </LearningShell>
    );
  }

  const concepts = Object.values(assessmentResult.conceptMastery).sort((a, b) => a.score - b.score);
  const weakest = assessmentResult.conceptMastery[assessmentResult.weakestConceptId];
  const study = (id: ConceptId) => {
    setActiveLessonConcept(id);
    navigate('/lesson');
  };

  return (
    <LearningShell title="Your results" subtitle={`${selectedSubject} · C++ pointers check`}>
      <div className="mx-auto max-w-3xl space-y-5">
        <section className="rounded-2xl border border-[#E2E8E2] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#64806C]">Your starting score</p>
          <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-5xl font-bold tracking-tight text-[#285443]">{assessmentResult.percentage}%</span>
            <span className="pb-1 text-sm text-[#68736C]">{assessmentResult.correctAnswers} out of {assessmentResult.totalQuestions} correct</span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736C]">This is just a starting point, not a grade. We use it to decide which concept to explain first.</p>
        </section>

        <section className="rounded-2xl border border-[#D8E5DA] bg-[#F0F5F0] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#54715F]">Recommended next step</p>
          <h2 className="mt-2 text-xl font-bold text-[#202923]">Start with {weakest.conceptName}</h2>
          <p className="mt-2 text-sm leading-6 text-[#68736C]">This was the concept you found most difficult. We’ll explain it with a focused lesson and an example.</p>
          <button type="button" onClick={() => study(weakest.conceptId)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#285443] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1F4436]">
            Study this concept <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        <section className="rounded-2xl border border-[#E2E8E2] bg-white p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="font-bold text-[#202923]">Your concepts</h3>
            <p className="mt-1 text-sm text-[#68736C]">Lowest scores appear first. Select any concept to review it.</p>
          </div>
          <div className="space-y-4">
            {concepts.map((concept) => (
              <div key={concept.conceptId} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-medium text-[#202923]">{concept.conceptName}</span>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-[#68736C]">{concept.score}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#EDF0ED]">
                    <div className="h-full rounded-full bg-[#4D8061]" style={{ width: `${concept.score}%` }} />
                  </div>
                </div>
                <button type="button" onClick={() => study(concept.conceptId)} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-[#285443] hover:bg-[#EDF4EE]">
                  Review
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => navigate('/assessment')} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#68736C] hover:bg-white hover:text-[#285443]">
            <RotateCcw className="h-4 w-4" /> Retake check
          </button>
          <button type="button" onClick={() => navigate('/learn')} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#285443] hover:bg-white">
            Back to learning path <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </LearningShell>
  );
};
