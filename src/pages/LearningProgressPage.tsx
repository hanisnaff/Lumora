import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { getRecommendedAction } from '../services/learningPathService';
import { EmptyProgressVisual } from '../components/illustrations/EmptyProgressVisual';
import { ConceptGraphVisual } from '../components/illustrations/ConceptGraphVisual';
import {
  TrendingUp,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Layers,
  Calendar,
  Network,
} from 'lucide-react';

export const LearningProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    conceptMasteries,
    assessmentResult,
    completedLessons,
    practiceAttempts,
    resetProgress,
    selectedSubject,
    selectedTopic,
    setActiveLessonConcept,
  } = useLearning();

  const conceptsList = Object.values(conceptMasteries);
  const totalConcepts = conceptsList.length;
  const masteredCount = conceptsList.filter((c) => c.status === 'mastered').length;
  const practisingCount = conceptsList.filter((c) => c.status === 'practising').length;
  const reviewCount = conceptsList.filter((c) => c.status === 'needs-review').length;

  // Average mastery calculation from session data
  const averageMastery = Math.round(
    conceptsList.reduce((acc, curr) => acc + curr.score, 0) / totalConcepts
  );

  const recommended = getRecommendedAction(
    !!assessmentResult,
    assessmentResult ? assessmentResult.weakestConceptId : null,
    conceptMasteries
  );

  // Only show sessions actually completed in this browser.
  const sessionHistory = [
    ...(assessmentResult ? [{
      session: 'Diagnostic assessment',
      score: assessmentResult.percentage,
      date: new Date(assessmentResult.submittedAt).toLocaleDateString(),
      timestamp: assessmentResult.submittedAt,
    }] : []),
    ...practiceAttempts.map((attempt) => ({
      session: `Practice · ${attempt.conceptId ? conceptMasteries[attempt.conceptId]?.conceptName ?? 'Concept review' : 'Concept review'}`,
      score: attempt.totalQuestions
        ? Math.round(((attempt.correctAnswers ?? 0) / attempt.totalQuestions) * 100)
        : (attempt.isCorrect ? 100 : 0),
      date: new Date(attempt.timestamp).toLocaleDateString(),
      timestamp: attempt.timestamp,
    })),
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const questionsCompleted = (assessmentResult ? Object.keys(assessmentResult.answers).length : 0) + practiceAttempts.reduce((total, attempt) => total + (attempt.totalQuestions ?? 0), 0);

  const handleStudyConcept = (conceptId: any) => {
    setActiveLessonConcept(conceptId);
    navigate('/lesson');
  };

  return (
    <LearningShell
      title="Your learning progress"
      subtitle={`${selectedSubject} &bull; ${selectedTopic} Track &bull; Your study progress`}
    >
      <div className="space-y-8">
        {!assessmentResult && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#D6DDD8] bg-[#F8FAF9] p-5 sm:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#244B3C]">Your next step</p>
              <h2 className="mt-1 font-heading text-lg font-bold text-[#242A27]">Start with a quick check-in.</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#68716C]">Take the five-question C++ pointer diagnostic to create your first mastery profile. Scores and history will appear here after you submit it.</p>
            </div>
            <button type="button" onClick={() => navigate('/assessment')} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#244B3C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1D3D31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244B3C]">
              Start diagnostic <ArrowRight className="h-4 w-4 text-[#C6F36B]" />
            </button>
          </div>
        )}
        
        {/* Top 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Completed questions */}
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#68716C]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#244B3C]">Questions completed</span>
              <CheckCircle2 className="w-4 h-4 text-[#244B3C]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#244B3C]">{questionsCompleted}</span>
              <span className="text-[10px] text-[#68716C] font-mono">answered</span>
            </div>
            <p className="text-xs text-[#68716C] mt-1">Counts diagnostic and targeted-practice questions.</p>
          </div>

          {/* Card 2: Average Mastery */}
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#68716C]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#244B3C]">Unit Mastery</span>
              <TrendingUp className="w-4 h-4 text-[#244B3C]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#244B3C]">
                {averageMastery}%
              </span>
              <span className="text-[10px] text-[#68716C] font-mono">5 concepts</span>
            </div>
            <p className="text-xs text-[#68716C] mt-1">
              Calculated dynamically from your assessments and drills.
            </p>
          </div>

          {/* Card 3: Mastered Concepts */}
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#68716C]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#244B3C]">Provisionally Mastered</span>
              <CheckCircle2 className="w-4 h-4 text-[#C6F36B]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#244B3C]">
                {masteredCount} / {totalConcepts}
              </span>
            </div>
            <p className="text-xs text-[#68716C] mt-1">
              {practisingCount} practicing &bull; {reviewCount} needing review
            </p>
          </div>

          {/* Card 4: Completed Modules */}
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#68716C]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#244B3C]">Lessons Completed</span>
              <BookOpen className="w-4 h-4 text-[#244B3C]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#244B3C]">
                {completedLessons.length}
              </span>
              <span className="text-[10px] text-[#68716C] font-mono">modules</span>
            </div>
            <p className="text-xs text-[#68716C] mt-1">
              {practiceAttempts.length} practice sessions completed.
            </p>
          </div>

        </div>

        {/* Recommended Next Action Banner */}
        <div className="bg-[#244B3C] text-[#F8FAF9] border border-[#1D3D31] rounded-2xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1D3D31] text-[#C6F36B] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C6F36B]">
                  Recommended Next Activity
                </span>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-[#F8FAF9]">
                  Adaptive Engine
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#F8FAF9] mt-0.5">
                {recommended.title}
              </h3>
              <p className="text-xs text-[#F8FAF9]/80 mt-0.5 max-w-lg leading-relaxed">
                {recommended.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(recommended.targetRoute)}
            className="inline-flex items-center gap-2 bg-[#C6F36B] text-[#244B3C] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#BBD83B] transition-colors shrink-0 shadow-xs"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#244B3C]" />
          </button>
        </div>

        {/* Connected Concept Network Visualization on Progress */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D6DDD8]/60">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#244B3C]" />
              <h3 className="font-heading font-bold text-base text-[#244B3C]">
                Concept Network Map &bull; Live Telemetry
              </h3>
            </div>
            <span className="text-xs font-mono text-[#68716C]">Interactive Prerequisite Graph</span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#E8EBE9]/40 border border-[#D6DDD8]/60">
            <ConceptGraphVisual
              activeConceptName={
                assessmentResult
                  ? assessmentResult.conceptMastery[assessmentResult.weakestConceptId]?.conceptName
                  : 'Dereferencing (*ptr)'
              }
            />
          </div>
        </div>

        {/* Two-Column Middle Section: Session Trend Graph + Concept Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5 cols): Assessment History Trend Chart */}
          <div className="lg:col-span-5 bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D6DDD8]/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#244B3C]" />
                  <h3 className="font-heading font-bold text-base text-[#244B3C]">
                    Assessment Score History
                  </h3>
                </div>
                <span className="text-[10px] text-[#68716C] font-mono">Session Trend</span>
              </div>

              <p className="text-xs text-[#68716C] mt-3 leading-relaxed">
                Your completed diagnostic and practice sessions, in chronological order.
              </p>

              {/* Actual session history or a clear empty state */}
              {sessionHistory.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {sessionHistory.slice(-6).reverse().map((item, idx) => (
                    <div key={`${item.timestamp}-${idx}`} className="space-y-1">
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="font-medium text-[#242A27]">{item.session}</span>
                        <span className="font-mono font-bold text-[#244B3C]">{item.score}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-[10px] text-[#68716C]">
                        <span>{item.date}</span><span>{item.score >= 80 ? 'Strong result' : item.score >= 50 ? 'Keep practising' : 'Review recommended'}</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#E8EBE9] rounded-full overflow-hidden border border-[#D6DDD8]/50">
                        <div className={`h-full rounded-full transition-all duration-500 ${item.score >= 80 ? 'bg-[#244B3C]' : item.score >= 50 ? 'bg-[#C6F36B]' : 'bg-[#D76B5B]'}`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-dashed border-[#D6DDD8] bg-[#E8EBE9]/60 p-5 text-center">
                  <p className="font-semibold text-sm text-[#244B3C]">Your history starts here</p>
                  <p className="mt-1 text-xs text-[#68716C]">Complete the diagnostic to record your first real score.</p>
                  <button type="button" onClick={() => navigate('/assessment')} className="mt-3 rounded-lg bg-[#244B3C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D3D31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244B3C]">Start diagnostic</button>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#D6DDD8]/40 text-[11px] text-[#68716C]">
              History is stored locally in this browser and reflects completed sessions only.
            </div>
          </div>

          {/* Right Column (7 cols): Concept Mastery Status Table */}
          <div className="lg:col-span-7 bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6DDD8]/60">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#244B3C]" />
                <h3 className="font-heading font-bold text-base text-[#244B3C]">
                  Concept Mastery Overview
                </h3>
              </div>
              <span className="text-xs font-mono text-[#68716C]">Topic: {selectedTopic}</span>
            </div>

            <div className="divide-y divide-[#D6DDD8]/50 mt-2">
              {conceptsList.map((c) => {
                const isMastered = c.status === 'mastered';
                const isPractising = c.status === 'practising';

                return (
                  <div
                    key={c.conceptId}
                    onClick={() => handleStudyConcept(c.conceptId)}
                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#E8EBE9]/50 px-2 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-sm text-[#244B3C] truncate">
                          {c.conceptName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                            isMastered
                              ? 'bg-[#244B3C]/10 text-[#244B3C]'
                              : isPractising
                              ? 'bg-[#C6F36B]/40 text-[#244B3C]'
                              : 'bg-[#D6DDD8]/50 text-[#68716C]'
                          }`}
                        >
                          {isMastered
                            ? 'Provisionally Mastered'
                            : isPractising
                            ? 'Practising'
                            : 'Needs Review'}
                        </span>
                      </div>

                      {/* Mini progress bar */}
                      <div className="w-full max-w-xs h-2 bg-[#D6DDD8]/50 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isMastered
                              ? 'bg-[#244B3C]'
                              : isPractising
                              ? 'bg-[#C6F36B]'
                              : 'bg-[#A85B53]'
                          }`}
                          style={{ width: `${Math.max(c.score, 4)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-sm font-bold text-[#244B3C]">
                        {c.score}%
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#68716C]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Empty Trail Visual if no assessments taken yet */}
        {!assessmentResult && (
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 text-center space-y-2">
            <h4 className="font-heading font-bold text-base text-[#244B3C]">
              Uncharted Concept Trail
            </h4>
            <p className="text-xs text-[#68716C] max-w-md mx-auto">
              You haven't run a diagnostic assessment yet. Take the 5-question baseline to chart your knowledge trail.
            </p>
            <EmptyProgressVisual />
            <button
              type="button"
              onClick={() => navigate('/assessment')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#244B3C] text-[#F8FAF9] rounded-xl text-xs font-bold hover:bg-[#1D3D31]"
            >
              <span>Take Diagnostic Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
            </button>
          </div>
        )}

        {/* Bottom Bar with Reset Progress */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#68716C]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6F36B]" />
            <span>Progress telemetry automatically persisted across browser reloads.</span>
          </div>

          <button
            type="button"
            onClick={resetProgress}
            className="inline-flex items-center gap-1.5 text-xs text-[#68716C] hover:text-[#244B3C] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear demo session progress</span>
          </button>
        </div>

      </div>
    </LearningShell>
  );
};
