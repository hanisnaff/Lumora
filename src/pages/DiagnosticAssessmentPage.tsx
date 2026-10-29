import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { DIAGNOSTIC_QUESTIONS } from '../data/demoQuestions';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Code2,
} from 'lucide-react';

export const DiagnosticAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedSubject,
    selectedTopic,
    assessmentAnswers,
    saveAssessmentAnswer,
    submitAssessment,
  } = useLearning();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const questions = DIAGNOSTIC_QUESTIONS;
  const currentQuestion = questions[currentIndex];
  const selectedOptionIndex = assessmentAnswers[currentQuestion.id];

  const totalQuestions = questions.length;
  const answeredCount = questions.filter((question) => assessmentAnswers[question.id] !== undefined).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex: number) => {
    saveAssessmentAnswer(currentQuestion.id, optionIndex);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleConfirmSubmit = () => {
    submitAssessment();
    setShowConfirmModal(false);
    navigate('/results');
  };

  return (
    <LearningShell>
      <div className="max-w-[780px] mx-auto space-y-6">
        
        {/* Top Assessment Header */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/learn')}
              className="p-2 rounded-xl border border-[#D6DDD8] text-[#68716C] hover:text-[#244B3C] hover:bg-[#E8EBE9]/60 transition-colors"
              aria-label="Exit assessment to learning path"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#244B3C]">
                  DIAGNOSTIC ASSESSMENT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#244B3C] text-[#C6F36B] font-bold">
                  {selectedSubject} &bull; {selectedTopic}
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#244B3C] mt-0.5">
                Concept Gap Baseline Check
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold font-mono text-[#244B3C]">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="block text-[11px] text-[#68716C]">
              {answeredCount} answered
            </span>
          </div>
        </div>

        {/* Polished Question Selector & Progress Indicators */}
        <div className="flex items-center gap-2 px-1">
          {questions.map((q, idx) => {
            const isAnswered = assessmentAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`flex-1 h-2.5 rounded-full transition-all duration-200 focus:outline-none ${
                  isCurrent
                    ? 'bg-[#244B3C] ring-2 ring-[#C6F36B] ring-offset-1 ring-offset-[#E8EBE9]'
                    : isAnswered
                    ? 'bg-[#C6F36B] border border-[#244B3C]'
                    : 'bg-[#D6DDD8]/60'
                }`}
                title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
              />
            );
          })}
        </div>

        {/* Main Question Card */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Concept Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D6DDD8]/60">
            <span className="text-xs font-bold text-[#244B3C] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6F36B]" />
              Target Concept: {currentQuestion.conceptName}
            </span>
            <span className="text-[11px] font-mono text-[#68716C]">
              Question {currentIndex + 1}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#244B3C] leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Code Snippet (if present) */}
          {currentQuestion.codeSnippet && (
            <div className="rounded-2xl bg-[#244B3C] border border-[#1D3D31] p-4 sm:p-5 text-[#F8FAF9] font-mono text-xs sm:text-sm overflow-x-auto shadow-sm">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-[#C6F36B] uppercase tracking-widest font-sans">
                <span className="flex items-center gap-1.5 font-bold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>C++ Code Inspection</span>
                </span>
                <span>std=c++17</span>
              </div>
              <pre className="leading-relaxed">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Answer Options */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#244B3C]">
              Select the best answer:
            </label>

            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedOptionIndex === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-180 flex items-start gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B3C] ${
                    isSelected
                      ? 'bg-[#F4F8E4] border-[#244B3C] shadow-xs ring-1 ring-[#244B3C]'
                      : 'bg-[#F8FAF9] border-[#D6DDD8] hover:bg-[#E8EBE9]/50 hover:border-[#244B3C]/40'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border transition-colors ${
                    isSelected
                      ? 'bg-[#244B3C] text-[#C6F36B] border-[#244B3C]'
                      : 'bg-[#F8FAF9] text-[#68716C] border-[#D6DDD8]'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className={`text-sm sm:text-[15px] leading-relaxed ${
                    isSelected ? 'text-[#244B3C] font-bold' : 'text-[#242A27]'
                  }`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-[#D6DDD8]/70 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[#68716C]'
                  : 'bg-[#F8FAF9] border-[#D6DDD8] text-[#244B3C] hover:bg-[#E8EBE9]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="inline-flex items-center gap-2 bg-[#244B3C] text-[#F8FAF9] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1D3D31] transition-colors shadow-xs"
              >
                <span>Submit &amp; View Gaps</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6F36B]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 bg-[#244B3C] text-[#F8FAF9] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1D3D31] transition-colors shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
              </button>
            )}
          </div>
        </div>

        {/* Demonstration Disclaimer Note */}
        <p className="text-center text-xs text-[#68716C]/90">
          Answers are graded locally using the sample diagnostic key to calculate your concept scores in real-time.
        </p>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244B3C]/40 backdrop-blur-xs">
          <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <h3 className="font-heading font-extrabold text-lg text-[#244B3C]">
              Submit Diagnostic Assessment?
            </h3>

            <p className="text-sm text-[#68716C] mt-2 leading-relaxed">
              You have answered {answeredCount} of {totalQuestions} questions. Lumora will analyze your reasoning, isolate any concept-level gaps, and craft your targeted learning path.
            </p>

            {answeredCount < totalQuestions && (
              <div className="mt-3.5 p-3 rounded-xl bg-[#E8EBE9] border border-[#D6DDD8] flex items-center gap-2 text-xs text-[#244B3C]">
                <AlertCircle className="w-4 h-4 text-[#A85B53] shrink-0" />
                <span>You have {totalQuestions - answeredCount} unanswered questions. Unanswered questions will be scored as 0%.</span>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#68716C] hover:text-[#244B3C] rounded-xl border border-[#D6DDD8]"
              >
                Review Answers
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-4 py-2 text-xs font-bold bg-[#244B3C] text-[#F8FAF9] rounded-xl hover:bg-[#1D3D31]"
              >
                Confirm &amp; Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </LearningShell>
  );
};
