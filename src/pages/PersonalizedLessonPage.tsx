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
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D6DDD8]/70">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#244B3C] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
                CURRENT GAP STUDY
              </span>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#244B3C] text-[#C6F36B]">
                {lesson.badge}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#68716C]">
              <BookOpen className="w-3.5 h-3.5 text-[#244B3C]" />
              <span>Step 1 of 2: Guided Remediation</span>
            </div>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#244B3C] tracking-tight mt-5">
            {lesson.title}
          </h2>

          <p className="text-[15.5px] text-[#68716C] mt-2 leading-relaxed">
            {lesson.subtitle}
          </p>

          {/* Primary / Alternate Explanation Box */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#E8EBE9]/70 border border-[#D6DDD8] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#244B3C] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#244B3C]" />
                {useAlternateExplanation ? 'Alternate Plain-Language Explanation' : 'Core Concept Explanation'}
              </span>
              <button
                type="button"
                onClick={() => setUseAlternateExplanation(!useAlternateExplanation)}
                className="text-xs font-bold text-[#244B3C] hover:text-[#1D3D31] flex items-center gap-1.5 transition-colors bg-[#F8FAF9] px-3 py-1 rounded-lg border border-[#D6DDD8]"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{useAlternateExplanation ? 'View Technical Explanation' : 'Switch to Intuitive Analogy'}</span>
              </button>
            </div>

            <p className="text-[15px] text-[#242A27] leading-relaxed">
              {useAlternateExplanation ? lesson.alternateExplanation : lesson.primaryExplanation}
            </p>
          </div>

          {/* Intuitive Analogy Section */}
          <div className="mt-6 p-5 rounded-2xl border border-[#D6DDD8] bg-[#F8FAF9] flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-[#244B3C] text-[#C6F36B] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#244B3C]">
                {lesson.analogy.title}
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#68716C] mt-1 leading-relaxed">
                {lesson.analogy.text}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Worked Code Example */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#244B3C]" />
              <h3 className="font-heading font-bold text-lg text-[#244B3C]">
                Worked C++ Code Example
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#68716C]">std=c++17</span>
          </div>

          {/* Code block */}
          <div className="rounded-2xl bg-[#244B3C] border border-[#1D3D31] p-5 text-[#F8FAF9] font-mono text-xs sm:text-[13.5px] overflow-x-auto shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[10px] text-[#C6F36B] uppercase tracking-widest font-sans">
              <span>Memory Pointer Operations</span>
              <span>Stack Execution</span>
            </div>
            <pre className="leading-relaxed">
              <code>{lesson.codeExample.code}</code>
            </pre>
          </div>

          {/* Step-by-Step Breakdown */}
          <div className="space-y-2 pt-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#68716C]">
              Step-by-step execution:
            </span>
            <div className="space-y-2">
              {lesson.codeExample.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#E8EBE9]/50 border border-[#D6DDD8]/70 text-xs sm:text-[13px]"
                >
                  <span className="w-5 h-5 rounded-md bg-[#244B3C] text-[#C6F36B] flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                    {st.line}
                  </span>
                  <span className="text-[#242A27] leading-relaxed">
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
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-[#A85B53]" />
            <h3 className="font-heading font-bold text-lg text-[#244B3C]">
              Common Misconceptions &amp; Traps
            </h3>
          </div>

          <div className="space-y-3">
            {lesson.commonMistakes.map((cm, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D6DDD8] bg-[#E8EBE9]/40 space-y-1.5">
                <div className="text-xs font-bold text-[#A85B53] uppercase tracking-wide">
                  Trap: {cm.mistake}
                </div>
                <div className="text-xs sm:text-[13.5px] font-medium text-[#244B3C]">
                  Correction: <code className="bg-[#F8FAF9] px-1.5 py-0.5 rounded border border-[#D6DDD8] font-mono">{cm.correction}</code>
                </div>
                <p className="text-xs text-[#68716C] leading-relaxed pt-1">
                  Why: {cm.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Check Your Understanding */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D6DDD8]/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#244B3C]" />
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#244B3C]">
                Check Your Understanding
              </h3>
            </div>
            <span className="text-xs font-mono text-[#68716C]">Quick comprehension check</span>
          </div>

          <p className="text-sm sm:text-[15px] font-semibold text-[#244B3C]">
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
                      ? 'bg-[#F4F8E4] border-[#244B3C] ring-1 ring-[#244B3C]'
                      : 'bg-[#F8FAF9] border-[#D6DDD8] hover:bg-[#E8EBE9]/50'
                  }`}
                >
                  <span className={isSelected ? 'font-bold text-[#244B3C]' : 'text-[#68716C]'}>
                    {opt}
                  </span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    isSelected ? 'bg-[#244B3C] text-[#C6F36B]' : 'bg-[#F8FAF9] text-[#68716C]'
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
                  ? 'bg-[#D6DDD8]/60 text-[#68716C] cursor-not-allowed'
                  : 'bg-[#244B3C] text-[#F8FAF9] hover:bg-[#1D3D31]'
              }`}
            >
              Verify Answer
            </button>

            {checkAnswerSubmitted && (
              <span className={`text-xs font-bold ${isCheckCorrect ? 'text-[#244B3C]' : 'text-[#A85B53]'}`}>
                {isCheckCorrect ? '✓ Correct! Concept is clicking.' : 'Review explanation below:'}
              </span>
            )}
          </div>

          {checkAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-[#E8EBE9] border border-[#D6DDD8] text-xs text-[#242A27] leading-relaxed">
              {lesson.checkQuestion.explanation}
            </div>
          )}
        </div>

        {/* Bottom Three Functional Action Buttons */}
        <div className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#D6DDD8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-center sm:text-left">
            <h4 className="font-heading font-bold text-sm text-[#244B3C]">
              Ready for the next step?
            </h4>
            <p className="text-xs text-[#68716C] mt-0.5">
              Confirm your understanding to advance to targeted practice drills.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setUseAlternateExplanation(!useAlternateExplanation)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#D6DDD8] bg-[#F8FAF9] text-[#244B3C] hover:bg-[#E8EBE9] transition-colors"
            >
              I need another explanation
            </button>

            <button
              type="button"
              onClick={handlePracticeConcept}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#244B3C] bg-[#F8FAF9] text-[#244B3C] hover:bg-[#E8EBE9] transition-colors"
            >
              Practice this concept
            </button>

            <button
              type="button"
              onClick={handleUnderstand}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#244B3C] text-[#F8FAF9] hover:bg-[#1D3D31] transition-colors shadow-xs"
            >
              <span>I understand</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
            </button>
          </div>
        </div>

      </div>
    </LearningShell>
  );
};
