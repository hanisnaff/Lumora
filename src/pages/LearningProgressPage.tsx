import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { getRecommendedAction } from '../services/learningPathService';
import type { ConceptId } from '../types/learning';
import { ArrowRight, BookOpen, CheckCircle2, TrendingUp } from 'lucide-react';

export const LearningProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    conceptMasteries,
    assessmentResult,
    completedLessons,
    practiceAttempts,
    selectedSubject,
    selectedTopic,
    setActiveLessonConcept,
  } = useLearning();

  const concepts = Object.values(conceptMasteries);
  const averageMastery = concepts.length
    ? Math.round(concepts.reduce((sum, concept) => sum + concept.score, 0) / concepts.length)
    : 0;
  const questionsCompleted =
    (assessmentResult ? Object.keys(assessmentResult.answers).length : 0) +
    practiceAttempts.reduce((sum, attempt) => sum + (attempt.totalQuestions ?? 0), 0);

  const recommended = getRecommendedAction(
    Boolean(assessmentResult),
    assessmentResult?.weakestConceptId ?? null,
    conceptMasteries
  );
  const recommendedConcept = recommended.conceptId ?? assessmentResult?.weakestConceptId;

  const openConcept = (conceptId: ConceptId) => {
    setActiveLessonConcept(conceptId);
    navigate('/lesson');
  };

  const sessions = [
    ...(assessmentResult ? [{
      label: 'Starting check',
      score: assessmentResult.percentage,
      date: assessmentResult.submittedAt,
    }] : []),
    ...practiceAttempts.map((attempt) => ({
      label: `Practice · ${conceptMasteries[attempt.conceptId ?? 'dereferencing']?.conceptName ?? 'Concept review'}`,
      score: attempt.totalQuestions
        ? Math.round(((attempt.correctAnswers ?? 0) / attempt.totalQuestions) * 100)
        : attempt.isCorrect ? 100 : 0,
      date: attempt.timestamp,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  return (
    <LearningShell
      title="Your progress"
      subtitle={`${selectedSubject} · ${selectedTopic}`}
    >
      {!assessmentResult ? (
        <section className="mx-auto max-w-2xl rounded-2xl border border-[#D6DDD8] bg-white p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-wider text-[#244B3C]">Start here</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-[#242A27]">Your progress starts with a short check.</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[#68716C]">Answer five C++ pointer questions. We’ll show which concept to study first.</p>
          <button type="button" onClick={() => navigate('/assessment')} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#244B3C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1D3D31]">
            Start the check <ArrowRight className="h-4 w-4 text-[#C6F36B]" />
          </button>
        </section>
      ) : (
        <div className="mx-auto max-w-4xl space-y-6">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-[#D6DDD8] bg-white p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#68716C]"><CheckCircle2 className="h-4 w-4 text-[#244B3C]" /> Questions answered</div>
              <p className="mt-2 font-heading text-3xl font-extrabold text-[#244B3C]">{questionsCompleted}</p>
            </article>
            <article className="rounded-2xl border border-[#D6DDD8] bg-white p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#68716C]"><TrendingUp className="h-4 w-4 text-[#244B3C]" /> Average concept score</div>
              <p className="mt-2 font-heading text-3xl font-extrabold text-[#244B3C]">{averageMastery}%</p>
            </article>
            <article className="rounded-2xl border border-[#D6DDD8] bg-white p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#68716C]"><BookOpen className="h-4 w-4 text-[#244B3C]" /> Lessons completed</div>
              <p className="mt-2 font-heading text-3xl font-extrabold text-[#244B3C]">{completedLessons.length}</p>
            </article>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl bg-[#244B3C] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C6F36B]">Your next step</p>
              <h2 className="mt-1 font-heading text-xl font-bold">{recommended.title}</h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-white/75">{recommended.description}</p>
            </div>
            <button type="button" onClick={() => {
              if (recommendedConcept) setActiveLessonConcept(recommendedConcept);
              navigate(recommended.targetRoute);
            }} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C6F36B] px-5 py-3 text-sm font-bold text-[#244B3C] hover:bg-[#B7E85C]">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <section className="rounded-2xl border border-[#D6DDD8] bg-white p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="font-heading text-lg font-bold text-[#244B3C]">Concept progress</h2>
              <p className="mt-1 text-sm text-[#68716C]">Choose a concept to review its lesson.</p>
            </div>
            <div className="space-y-4">
              {concepts.sort((a, b) => a.score - b.score).map((concept) => (
                <button key={concept.conceptId} type="button" onClick={() => openConcept(concept.conceptId)} className="w-full rounded-xl p-2 text-left transition hover:bg-[#F3F6F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#244B3C]">
                  <span className="mb-2 flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-semibold text-[#242A27]">{concept.conceptName}</span>
                    <span className="shrink-0 text-xs font-bold tabular-nums text-[#244B3C]">{concept.score}%</span>
                  </span>
                  <span className="block h-2 overflow-hidden rounded-full bg-[#E8EBE9]">
                    <span className="block h-full rounded-full bg-[#4D8061]" style={{ width: `${concept.score}%` }} />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#D6DDD8] bg-white p-5 sm:p-6">
            <h2 className="font-heading text-lg font-bold text-[#244B3C]">Recent activity</h2>
            {sessions.length ? (
              <ul className="mt-3 divide-y divide-[#E8EBE9]">
                {sessions.map((session, index) => (
                  <li key={`${session.date}-${index}`} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#242A27]">{session.label}</p>
                      <p className="mt-0.5 text-xs text-[#68716C]">{new Date(session.date).toLocaleDateString()}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold tabular-nums text-[#244B3C]">{session.score}%</span>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-2 text-sm text-[#68716C]">Complete a practice set to see your activity here.</p>}
          </section>
        </div>
      )}
    </LearningShell>
  );
};
