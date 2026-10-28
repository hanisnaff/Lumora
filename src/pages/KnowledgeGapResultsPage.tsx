import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { ConceptId } from '../types/learning';
import { ConceptGraphVisual } from '../components/illustrations/ConceptGraphVisual';
import {
  ArrowRight,
  Compass,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  RotateCcw,
  Info,
  Network,
} from 'lucide-react';

export const KnowledgeGapResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    assessmentResult,
    selectedSubject,
    selectedTopic,
    setActiveLessonConcept,
  } = useLearning();

  // If no assessment has been taken yet, show graceful fallback prompt
  if (!assessmentResult) {
    return (
      <LearningShell title="Diagnostic Results">
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-8 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F3EBDD] border border-[#D9CCBA] flex items-center justify-center mx-auto text-[#1A3628]">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-extrabold text-xl text-[#1A3628]">
            No Diagnostic Results Found
          </h2>
          <p className="text-sm text-[#5C675F] leading-relaxed">
            Please complete the 5-question baseline assessment to generate your personalized knowledge gap profile.
          </p>
          <button
            type="button"
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center gap-2 bg-[#1A3628] text-[#FAF8F3] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#254636]"
          >
            <span>Take Diagnostic</span>
            <ArrowRight className="w-4 h-4 text-[#C8E348]" />
          </button>
        </div>
      </LearningShell>
    );
  }

  const {
    percentage,
    correctAnswers,
    totalQuestions,
    conceptMastery,
    weakestConceptId,
  } = assessmentResult;

  const conceptsList = Object.values(conceptMastery);

  // Group concepts into 3 pedagogical tiers based on demo rules:
  // - Strong: >= 80% (provisionally mastered)
  // - Practice: 50% - 79% (targeted practice)
  // - Prerequisite: < 50% (revisit prerequisite)
  const strongConcepts = conceptsList.filter((c) => c.score >= 80);
  const practiceConcepts = conceptsList.filter((c) => c.score >= 50 && c.score < 80);
  const reviewConcepts = conceptsList.filter((c) => c.score < 50);

  const weakestConcept = conceptMastery[weakestConceptId];

  const handleStudyWeakConcept = () => {
    setActiveLessonConcept(weakestConceptId);
    navigate('/lesson');
  };

  const handleStudySpecificConcept = (cId: ConceptId) => {
    setActiveLessonConcept(cId);
    navigate('/lesson');
  };

  return (
    <LearningShell
      title="Knowledge Gap Analysis"
      subtitle={`${selectedSubject} &bull; ${selectedTopic} &bull; Dynamic Diagnostic Profile`}
    >
      <div className="space-y-8">
        
        {/* Top Hero Banner */}
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Score Summary */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3628]">
                <span className="w-2 h-2 rounded-full bg-[#C8E348]" />
                <span>DIAGNOSTIC TELEMETRY REPORT</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A3628] tracking-tight">
                Here's what to focus on next.
              </h2>
              <p className="text-[15px] text-[#5C675F] max-w-xl leading-relaxed">
                MindPath analyzed your diagnostic reasoning. Rather than re-reading the entire unit, focus on the specific concepts below to accelerate your mastery.
              </p>
            </div>

            {/* Right Score Pill */}
            <div className="bg-[#1A3628] text-[#FAF8F3] border border-[#254636] rounded-2xl p-6 flex items-center gap-6 shrink-0 shadow-md">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C8E348] block">
                  Diagnostic Score
                </span>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#FAF8F3]">
                  {percentage}%
                </span>
                <span className="text-xs text-[#FAF8F3]/70 block mt-0.5">
                  {correctAnswers} of {totalQuestions} questions correct
                </span>
              </div>

              {/* Minimal Circle / Status Badge */}
              <div className="w-16 h-16 rounded-full border-4 border-[#254636] flex items-center justify-center bg-[#254636]">
                <span className="text-xs font-bold font-mono text-[#C8E348]">
                  {percentage >= 80 ? 'Mastered' : percentage >= 50 ? 'Active' : 'Gaps'}
                </span>
              </div>
            </div>

          </div>

          {/* Primary Recommendation Banner */}
          <div className="mt-8 pt-6 border-t border-[#D9CCBA]/70 bg-[#F4F8E4] border border-[#C8E348]/60 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1A3628] text-[#C8E348] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1A3628] uppercase tracking-wide">
                    Primary Knowledge Gap Detected
                  </span>
                  <span className="text-[10px] bg-[#1A3628] text-[#C8E348] px-2 py-0.5 rounded font-mono font-bold">
                    {weakestConcept.score}% Mastery
                  </span>
                </div>
                <h4 className="font-heading font-extrabold text-base text-[#1A3628] mt-0.5">
                  {weakestConcept.conceptName}
                </h4>
                <p className="text-xs text-[#5C675F] mt-0.5">
                  We identified confusion around memory dereferencing vs pointer re-aiming. A 5-minute visual lesson is ready.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleStudyWeakConcept}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A3628] text-[#FAF8F3] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#254636] transition-colors shadow-xs"
              >
                <span>Study my weak concepts</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8E348]" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/learn')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FAF8F3] border border-[#D9CCBA] text-[#1A3628] hover:bg-[#F3EBDD] transition-colors"
              >
                View learning path
              </button>
            </div>
          </div>
        </div>

        {/* Concept Network Map with isolated gap */}
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/60">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#1A3628]" />
              <h3 className="font-heading font-bold text-base text-[#1A3628]">
                Adaptive Concept Graph Mapping
              </h3>
            </div>
            <span className="text-xs font-mono text-[#5C675F]">Gap highlighted in green/lime</span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#F3EBDD]/40 border border-[#D9CCBA]/60">
            <ConceptGraphVisual activeConceptName={weakestConcept.conceptName} />
          </div>
        </div>

        {/* Concept Mastery Visualizations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-xl text-[#1A3628] tracking-tight">
              Concept-Level Breakdown
            </h3>
            
            {/* Pedagogical Rule Tag */}
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#5C675F]">
              <Info className="w-3.5 h-3.5" />
              <span>Demo thresholds: &lt;50% Review &bull; 50–79% Practice &bull; 80%+ Mastered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Concepts Requiring Prerequisite Review (<50%) */}
            <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/60">
                <span className="text-xs font-bold text-[#A85B53] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#A85B53]" />
                  Needs Review (&lt;50%)
                </span>
                <span className="font-mono text-xs text-[#5C675F] font-bold">
                  {reviewConcepts.length}
                </span>
              </div>

              {reviewConcepts.length === 0 ? (
                <p className="text-xs text-[#5C675F] italic py-4 text-center">
                  None! No major foundational blockers detected.
                </p>
              ) : (
                <div className="space-y-3">
                  {reviewConcepts.map((c) => (
                    <div
                      key={c.conceptId}
                      onClick={() => handleStudySpecificConcept(c.conceptId)}
                      className="p-3.5 rounded-xl bg-[#F3EBDD]/70 border border-[#D9CCBA] hover:border-[#1A3628] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-semibold text-xs text-[#1A3628]">
                          {c.conceptName}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#A85B53]">
                          {c.score}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#D9CCBA]/60 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-[#A85B53] rounded-full"
                          style={{ width: `${Math.max(c.score, 6)}%` }}
                        />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#1A3628] font-bold mt-2 hover:underline">
                        <BookOpen className="w-3 h-3" />
                        <span>Start review lesson</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Concepts Needing Practice (50-79%) */}
            <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/60">
                <span className="text-xs font-bold text-[#1A3628] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C8E348] border border-[#1A3628]" />
                  Targeted Practice (50–79%)
                </span>
                <span className="font-mono text-xs text-[#5C675F] font-bold">
                  {practiceConcepts.length}
                </span>
              </div>

              {practiceConcepts.length === 0 ? (
                <p className="text-xs text-[#5C675F] italic py-4 text-center">
                  No concepts in the intermediate practice band.
                </p>
              ) : (
                <div className="space-y-3">
                  {practiceConcepts.map((c) => (
                    <div
                      key={c.conceptId}
                      onClick={() => handleStudySpecificConcept(c.conceptId)}
                      className="p-3.5 rounded-xl bg-[#F3EBDD]/70 border border-[#D9CCBA] hover:border-[#1A3628] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-semibold text-xs text-[#1A3628]">
                          {c.conceptName}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#1A3628]">
                          {c.score}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#D9CCBA]/60 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-[#C8E348] rounded-full"
                          style={{ width: `${c.score}%` }}
                        />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#1A3628] font-bold mt-2 hover:underline">
                        <BookOpen className="w-3 h-3" />
                        <span>Continue drill exercises</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Column 3: Strong Concepts (80%+) */}
            <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/60">
                <span className="text-xs font-bold text-[#1A3628] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8E348]" />
                  Mastered (80%+)
                </span>
                <span className="font-mono text-xs text-[#5C675F] font-bold">
                  {strongConcepts.length}
                </span>
              </div>

              {strongConcepts.length === 0 ? (
                <p className="text-xs text-[#5C675F] italic py-4 text-center">
                  None yet. Solidify weaker concepts to elevate mastery.
                </p>
              ) : (
                <div className="space-y-3">
                  {strongConcepts.map((c) => (
                    <div
                      key={c.conceptId}
                      className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#D9CCBA]/80"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-semibold text-xs text-[#1A3628]">
                          {c.conceptName}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#1A3628]">
                          {c.score}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#D9CCBA]/60 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-[#1A3628] rounded-full"
                          style={{ width: `${c.score}%` }}
                        />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#5C675F] mt-2">
                        <span>Provisionally mastered</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Retake or Return CTA */}
        <div className="pt-4 flex items-center justify-between text-xs text-[#5C675F]">
          <button
            type="button"
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center gap-1.5 hover:text-[#1A3628] transition-colors font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake diagnostic assessment with alternate answers</span>
          </button>
          <span className="font-mono">MindPath Adaptive Evaluator v2.4</span>
        </div>

      </div>
    </LearningShell>
  );
};
