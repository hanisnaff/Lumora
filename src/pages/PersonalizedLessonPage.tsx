import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { DEMO_LESSONS } from '../data/demoQuestions';
import { MemoryStackVisualizer } from '../components/illustrations/MemoryStackVisualizer';
import {
  BookOpen,
  ArrowRight,
  Code2,
  Lightbulb,
  AlertOctagon,
  CheckCircle2,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export const PersonalizedLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeLessonConcept,
    markLessonCompleted,
    selectedSubject,
  } = useLearning();

  const [useAlternateExplanation, setUseAlternateExplanation] = useState(false);
  const [checkAnswerSelected, setCheckAnswerSelected] = useState<number | null>(null);
  const [checkAnswerSubmitted, setCheckAnswerSubmitted] = useState(false);

  const lesson = DEMO_LESSONS[activeLessonConcept] || DEMO_LESSONS['dereferencing'];

  const handleUnderstand = () => {
    markLessonCompleted(activeLessonConcept);
    navigate('/practice');
  };

  const handlePracticeConcept = () => {
    navigate('/practice');
  };

  const handleCheckAnswerSubmit = () => {
    if (checkAnswerSelected !== null) {
      setCheckAnswerSubmitted(true);
    }
  };

  const isCheckCorrect =
    checkAnswerSelected !== null && checkAnswerSelected === lesson.checkQuestion.correctIndex;

  return (
    <LearningShell
      title={`Personalized Lesson: ${lesson.conceptName}`}
      subtitle={`${selectedSubject} &bull; Targeted Remediation Module &bull; ~${lesson.estimatedMinutes} mins`}
    >
      <div className="max-w-[840px] mx-auto space-y-8">
        
        {/* Lesson Header Card */}
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D9CCBA]/70">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3628] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C8E348]" />
                CURRENT GAP STUDY
              </span>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1A3628] text-[#C8E348]">
                {lesson.badge}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#5C675F]">
              <BookOpen className="w-3.5 h-3.5 text-[#1A3628]" />
              <span>Step 1 of 2: Guided Remediation</span>
            </div>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A3628] tracking-tight mt-5">
            {lesson.title}
          </h2>

          <p className="text-[15.5px] text-[#5C675F] mt-2 leading-relaxed">
            {lesson.subtitle}
          </p>

          {/* Primary / Alternate Explanation Box */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#F3EBDD]/70 border border-[#D9CCBA] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3628] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#1A3628]" />
                {useAlternateExplanation ? 'Alternate Plain-Language Explanation' : 'Core Concept Explanation'}
              </span>
              <button
                type="button"
                onClick={() => setUseAlternateExplanation(!useAlternateExplanation)}
                className="text-xs font-bold text-[#1A3628] hover:text-[#254636] flex items-center gap-1.5 transition-colors bg-[#FAF8F3] px-3 py-1 rounded-lg border border-[#D9CCBA]"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{useAlternateExplanation ? 'View Technical Explanation' : 'Switch to Intuitive Analogy'}</span>
              </button>
            </div>

            <p className="text-[15px] text-[#28302B] leading-relaxed">
              {useAlternateExplanation ? lesson.alternateExplanation : lesson.primaryExplanation}
            </p>
          </div>

          {/* Intuitive Analogy Section */}
          <div className="mt-6 p-5 rounded-2xl border border-[#D9CCBA] bg-[#FAF8F3] flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-[#1A3628] text-[#C8E348] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#1A3628]">
                {lesson.analogy.title}
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#5C675F] mt-1 leading-relaxed">
                {lesson.analogy.text}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Worked Code Example */}
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#1A3628]" />
              <h3 className="font-heading font-bold text-lg text-[#1A3628]">
                Worked C++ Code Example
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#5C675F]">std=c++17</span>
          </div>

          {/* Code block */}
          <div className="rounded-2xl bg-[#1A3628] border border-[#254636] p-5 text-[#FAF8F3] font-mono text-xs sm:text-[13.5px] overflow-x-auto shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[10px] text-[#C8E348] uppercase tracking-widest font-sans">
              <span>Memory Pointer Operations</span>
              <span>Stack Execution</span>
            </div>
            <pre className="leading-relaxed">
              <code>{lesson.codeExample.code}</code>
            </pre>
          </div>

          {/* Step-by-Step Breakdown */}
          <div className="space-y-2 pt-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#5C675F]">
              Step-by-step execution:
            </span>
            <div className="space-y-2">
              {lesson.codeExample.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#F3EBDD]/50 border border-[#D9CCBA]/70 text-xs sm:text-[13px]"
                >
                  <span className="w-5 h-5 rounded-md bg-[#1A3628] text-[#C8E348] flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                    {st.line}
                  </span>
                  <span className="text-[#28302B] leading-relaxed">
                    {st.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated Memory Stack Visualizer Component */}
        <MemoryStackVisualizer
          variableName={lesson.memoryDiagram.variableName}
          variableValue={lesson.memoryDiagram.value}
          variableAddress={lesson.memoryDiagram.address}
          pointerName={lesson.memoryDiagram.pointerName}
          pointerValue={lesson.memoryDiagram.pointerValue}
          pointerAddress={lesson.memoryDiagram.pointerAddress}
        />

        {/* Common Mistakes Section */}
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-[#A85B53]" />
            <h3 className="font-heading font-bold text-lg text-[#1A3628]">
              Common Misconceptions &amp; Traps
            </h3>
          </div>

          <div className="space-y-3">
            {lesson.commonMistakes.map((cm, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9CCBA] bg-[#F3EBDD]/40 space-y-1.5">
                <div className="text-xs font-bold text-[#A85B53] uppercase tracking-wide">
                  Trap: {cm.mistake}
                </div>
                <div className="text-xs sm:text-[13.5px] font-medium text-[#1A3628]">
                  Correction: <code className="bg-[#FAF8F3] px-1.5 py-0.5 rounded border border-[#D9CCBA] font-mono">{cm.correction}</code>
                </div>
                <p className="text-xs text-[#5C675F] leading-relaxed pt-1">
                  Why: {cm.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Check Your Understanding */}
        <div className="bg-[#FAF8F3] border border-[#D9CCBA] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9CCBA]/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1A3628]" />
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#1A3628]">
                Check Your Understanding
              </h3>
            </div>
            <span className="text-xs font-mono text-[#5C675F]">Quick comprehension check</span>
          </div>

          <p className="text-sm sm:text-[15px] font-semibold text-[#1A3628]">
            {lesson.checkQuestion.question}
          </p>

          <div className="space-y-2.5 pt-1">
            {lesson.checkQuestion.options.map((opt, optIdx) => {
              const isSelected = checkAnswerSelected === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => {
                    setCheckAnswerSelected(optIdx);
                    setCheckAnswerSubmitted(false);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all duration-180 flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#F4F8E4] border-[#1A3628] ring-1 ring-[#1A3628]'
                      : 'bg-[#FAF8F3] border-[#D9CCBA] hover:bg-[#F3EBDD]/50'
                  }`}
                >
                  <span className={isSelected ? 'font-bold text-[#1A3628]' : 'text-[#5C675F]'}>
                    {opt}
                  </span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    isSelected ? 'bg-[#1A3628] text-[#C8E348]' : 'bg-[#FAF8F3] text-[#5C675F]'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleCheckAnswerSubmit}
              disabled={checkAnswerSelected === null}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${
                checkAnswerSelected === null
                  ? 'bg-[#D9CCBA]/60 text-[#5C675F] cursor-not-allowed'
                  : 'bg-[#1A3628] text-[#FAF8F3] hover:bg-[#254636]'
              }`}
            >
              Verify Answer
            </button>

            {checkAnswerSubmitted && (
              <span className={`text-xs font-bold ${isCheckCorrect ? 'text-[#1A3628]' : 'text-[#A85B53]'}`}>
                {isCheckCorrect ? '✓ Correct! Concept is clicking.' : 'Review explanation below:'}
              </span>
            )}
          </div>

          {checkAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-[#F3EBDD] border border-[#D9CCBA] text-xs text-[#28302B] leading-relaxed">
              {lesson.checkQuestion.explanation}
            </div>
          )}
        </div>

        {/* Bottom Three Functional Action Buttons */}
        <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#D9CCBA] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-center sm:text-left">
            <h4 className="font-heading font-bold text-sm text-[#1A3628]">
              Ready for the next step?
            </h4>
            <p className="text-xs text-[#5C675F] mt-0.5">
              Confirm your understanding to advance to targeted practice drills.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setUseAlternateExplanation(!useAlternateExplanation)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#D9CCBA] bg-[#FAF8F3] text-[#1A3628] hover:bg-[#F3EBDD] transition-colors"
            >
              I need another explanation
            </button>

            <button
              type="button"
              onClick={handlePracticeConcept}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#1A3628] bg-[#FAF8F3] text-[#1A3628] hover:bg-[#F3EBDD] transition-colors"
            >
              Practice this concept
            </button>

            <button
              type="button"
              onClick={handleUnderstand}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1A3628] text-[#FAF8F3] hover:bg-[#254636] transition-colors shadow-xs"
            >
              <span>I understand</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8E348]" />
            </button>
          </div>
        </div>

      </div>
    </LearningShell>
  );
};
