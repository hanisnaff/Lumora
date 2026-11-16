import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import type { ConceptId } from '../types/learning';
import { DIAGNOSTIC_QUESTIONS } from '../data/demoQuestions';
import { ArrowRight, ChevronDown, RotateCcw } from 'lucide-react';

export const KnowledgeGapResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { assessmentResult, selectedSubject, setActiveLessonConcept, resetAssessmentAnswers } = useLearning();

  if (!assessmentResult) {
    return (
      <LearningShell title="Your results">
        <section className="mx-auto max-w-lg rounded-2xl border border-[#E2E8E2] bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-[#202923]">No results yet</h2>
          <p className="mt-2 text-sm leading-6 text-[#68736C]">Take the short starting check first. Lumora will then show you what to focus on.</p>
          <button type="button" onClick={() => { resetAssessmentAnswers(); navigate('/assessment'); }} className="mt-5 rounded-xl bg-[#285443] px-5 py-3 text-sm font-semibold text-white">Start the check</button>
        </section>
      </LearningShell>
    );
  }

  const concepts = Object.values(assessmentResult.conceptMastery).sort((a, b) => a.score - b.score);
  const reviewedQuestions = DIAGNOSTIC_QUESTIONS.map((question) => ({
    question,
    selectedOption: assessmentResult.answers[question.id],
    isCorrect: assessmentResult.answers[question.id] === question.correctOptionIndex,
  }));
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
            <h3 className="font-bold text-[#202923]">Review your answers</h3>
            <p className="mt-1 text-sm text-[#68736C]">Open a question to see the correct answer and why it is correct. Questions you skipped are included too.</p>
          </div>
          <div className="space-y-3">
            {reviewedQuestions.map(({ question, selectedOption, isCorrect }, index) => (
              <details key={question.id} open={!isCorrect} className="rounded-xl border border-[#E2E8E2] bg-[#FAFCFA]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-[#202923]">
                  <span>Question {index + 1}</span>
                  <span className={selectedOption === undefined ? 'text-xs font-semibold text-[#68736C]' : isCorrect ? 'text-xs font-semibold text-[#285443]' : 'text-xs font-semibold text-[#A85B53]'}>
                    {selectedOption === undefined ? 'Not answered' : isCorrect ? 'Correct' : 'Review'}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#68736C]" />
                </summary>
                <div className="space-y-3 border-t border-[#E2E8E2] px-4 py-4">
                  <p className="text-sm font-medium leading-6 text-[#202923]">{question.question}</p>
                  {question.codeSnippet && (
                    <pre className="overflow-x-auto rounded-lg bg-[#202923] p-3 text-xs leading-5 text-white"><code>{question.codeSnippet}</code></pre>
                  )}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#68736C]">Your answer</p>
                      <p className="mt-1 text-sm text-[#202923]">{selectedOption === undefined ? 'Not answered' : question.options[selectedOption]}</p>
                    </div>
                    <div className="rounded-lg bg-[#F0F5F0] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#54715F]">Correct answer</p>
                      <p className="mt-1 text-sm font-semibold text-[#285443]">{question.options[question.correctOptionIndex]}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-6 text-[#68736C]">{question.explanation}</p>
                </div>
              </details>
            ))}
          </div>
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
          <button type="button" onClick={() => { resetAssessmentAnswers(); navigate('/assessment'); }} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#68736C] hover:bg-white hover:text-[#285443]">
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
