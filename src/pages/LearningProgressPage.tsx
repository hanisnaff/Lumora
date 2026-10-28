import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { getRecommendedAction } from '../services/learningPathService';
import { EmptyProgressVisual } from '../components/illustrations/EmptyProgressVisual';
import { ConceptGraphVisual } from '../components/illustrations/ConceptGraphVisual';
import {
  TrendingUp,
  Flame,
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
    streakDays,
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

  // Simulated session trend for visual graph (integrating current actual score)
  const sessionHistory = [
    { session: 'Baseline Check', score: 35, date: 'Oct 24', isHistorical: true },
    { session: 'Unit Calibration', score: 48, date: 'Oct 26', isHistorical: true },
    {
      session: 'Active Diagnostic',
      score: assessmentResult ? assessmentResult.percentage : 60,
      date: 'Today',
      isHistorical: false,
    },
    {
      session: 'Post-Drill Mastery',
      score: averageMastery > 0 ? averageMastery : 68,
      date: 'Current',
      isHistorical: false,
    },
  ];

  const handleStudyConcept = (conceptId: any) => {
    setActiveLessonConcept(conceptId);
    navigate('/lesson');
  };

  return (
    <LearningShell
      title="Learning Progress & Mastery Dashboard"
      subtitle={`${selectedSubject} &bull; ${selectedTopic} Track &bull; Real-time Session Telemetry`}
    >
      <div className="space-y-8">
        
        {/* Top 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Streak */}
          <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#5C675F]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3628]">Learning Streak</span>
              <Flame className="w-4 h-4 text-[#1A3628]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#1A3628]">
                {streakDays} Days
              </span>
              <span className="text-[10px] text-[#5C675F] font-mono">(simulated demo)</span>
            </div>
            <p className="text-xs text-[#5C675F] mt-1">
              Active study recorded for 3 consecutive days.
            </p>
          </div>

          {/* Card 2: Average Mastery */}
          <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#5C675F]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3628]">Unit Mastery</span>
              <TrendingUp className="w-4 h-4 text-[#1A3628]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#1A3628]">
                {averageMastery}%
              </span>
              <span className="text-[10px] text-[#5C675F] font-mono">5 concepts</span>
            </div>
            <p className="text-xs text-[#5C675F] mt-1">
              Calculated dynamically from your assessments and drills.
            </p>
          </div>

          {/* Card 3: Mastered Concepts */}
          <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#5C675F]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3628]">Provisionally Mastered</span>
              <CheckCircle2 className="w-4 h-4 text-[#C8E348]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#1A3628]">
                {masteredCount} / {totalConcepts}
              </span>
            </div>
            <p className="text-xs text-[#5C675F] mt-1">
              {practisingCount} practicing &bull; {reviewCount} needing review
            </p>
          </div>

          {/* Card 4: Completed Modules */}
          <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#5C675F]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3628]">Lessons Completed</span>
              <BookOpen className="w-4 h-4 text-[#1A3628]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#1A3628]">
                {completedLessons.length}
              </span>
              <span className="text-[10px] text-[#5C675F] font-mono">modules</span>
            </div>
            <p className="text-xs text-[#5C675F] mt-1">
              {practiceAttempts.length} interactive practice attempts logged.
            </p>
          </div>

        </div>

        {/* Recommended Next Action Banner */}
        <div className="bg-[#1A3628] text-[#FAF8F3] border border-[#254636] rounded-2xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#254636] text-[#C8E348] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8E348]">
                  Recommended Next Activity
                </span>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-[#FAF8F3]">
                  Adaptive Engine
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#FAF8F3] mt-0.5">
                {recommended.title}
              </h3>
              <p className="text-xs text-[#FAF8F3]/80 mt-0.5 max-w-lg leading-relaxed">
                {recommended.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(recommended.targetRoute)}
            className="inline-flex items-center gap-2 bg-[#C8E348] text-[#1A3628] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#BBD83B] transition-colors shrink-0 shadow-xs"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1A3628]" />
          </button>
        </div>

        {/* Connected Concept Network Visualization on Progress */}
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/60">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#1A3628]" />
              <h3 className="font-heading font-bold text-base text-[#1A3628]">
                Concept Network Map &bull; Live Telemetry
              </h3>
            </div>
            <span className="text-xs font-mono text-[#5C675F]">Interactive Prerequisite Graph</span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#F3EBDD]/40 border border-[#D9CCBA]/60">
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
          <div className="lg:col-span-5 bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1A3628]" />
                  <h3 className="font-heading font-bold text-base text-[#1A3628]">
                    Assessment Score History
                  </h3>
                </div>
                <span className="text-[10px] text-[#5C675F] font-mono">Session Trend</span>
              </div>

              <p className="text-xs text-[#5C675F] mt-3 leading-relaxed">
                Tracks mastery evolution over time. Shows simulated past checks alongside your current session's live data.
              </p>

              {/* Accessible Minimal Bar Chart */}
              <div className="mt-6 space-y-4">
                {sessionHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#28302B] flex items-center gap-1.5">
                        <span>{item.session}</span>
                        {item.isHistorical ? (
                          <span className="text-[9px] text-[#5C675F] font-mono">(simulated)</span>
                        ) : (
                          <span className="text-[9px] bg-[#C8E348] text-[#1A3628] px-1.5 py-0.2 rounded font-mono font-bold">Live</span>
                        )}
                      </span>
                      <span className="font-mono font-bold text-[#1A3628]">
                        {item.score}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-[#F3EBDD] rounded-full overflow-hidden border border-[#D9CCBA]/50">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.score >= 80
                            ? 'bg-[#1A3628]'
                            : item.score >= 50
                            ? 'bg-[#C8E348]'
                            : 'bg-[#A85B53]'
                        }`}
                        style={{ width: `${Math.max(item.score, 6)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D9CCBA]/40 text-[11px] text-[#5C675F]">
              Historical checkpoints clearly distinguished from active in-browser assessment telemetry.
            </div>
          </div>

          {/* Right Column (7 cols): Concept Mastery Status Table */}
          <div className="lg:col-span-7 bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/60">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1A3628]" />
                <h3 className="font-heading font-bold text-base text-[#1A3628]">
                  Concept Mastery Overview
                </h3>
              </div>
              <span className="text-xs font-mono text-[#5C675F]">Topic: {selectedTopic}</span>
            </div>

            <div className="divide-y divide-[#D9CCBA]/50 mt-2">
              {conceptsList.map((c) => {
                const isMastered = c.status === 'mastered';
                const isPractising = c.status === 'practising';

                return (
                  <div
                    key={c.conceptId}
                    onClick={() => handleStudyConcept(c.conceptId)}
                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#F3EBDD]/50 px-2 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-sm text-[#1A3628] truncate">
                          {c.conceptName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                            isMastered
                              ? 'bg-[#1A3628]/10 text-[#1A3628]'
                              : isPractising
                              ? 'bg-[#C8E348]/40 text-[#1A3628]'
                              : 'bg-[#D9CCBA]/50 text-[#5C675F]'
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
                      <div className="w-full max-w-xs h-2 bg-[#D9CCBA]/50 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isMastered
                              ? 'bg-[#1A3628]'
                              : isPractising
                              ? 'bg-[#C8E348]'
                              : 'bg-[#A85B53]'
                          }`}
                          style={{ width: `${Math.max(c.score, 4)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-sm font-bold text-[#1A3628]">
                        {c.score}%
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5C675F]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Empty Trail Visual if no assessments taken yet */}
        {!assessmentResult && (
          <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 text-center space-y-2">
            <h4 className="font-heading font-bold text-base text-[#1A3628]">
              Uncharted Concept Trail
            </h4>
            <p className="text-xs text-[#5C675F] max-w-md mx-auto">
              You haven't run a diagnostic assessment yet. Take the 5-question baseline to chart your knowledge trail.
            </p>
            <EmptyProgressVisual />
            <button
              type="button"
              onClick={() => navigate('/assessment')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A3628] text-[#FAF8F3] rounded-xl text-xs font-bold hover:bg-[#254636]"
            >
              <span>Take Diagnostic Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8E348]" />
            </button>
          </div>
        )}

        {/* Bottom Bar with Reset Progress */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C675F]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8E348]" />
            <span>Progress telemetry automatically persisted across browser reloads.</span>
          </div>

          <button
            type="button"
            onClick={resetProgress}
            className="inline-flex items-center gap-1.5 text-xs text-[#5C675F] hover:text-[#1A3628] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear demo session progress</span>
          </button>
        </div>

      </div>
    </LearningShell>
  );
};
