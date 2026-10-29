import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningShell } from '../components/LearningShell';
import { useLearning } from '../context/LearningContext';
import { TARGETED_PRACTICE_QUESTIONS } from '../data/demoQuestions';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const TargetedPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeLessonConcept,
    conceptMasteries,
    recordPracticeSession,
    selectedSubject,
  } = useLearning();

  // Filter questions for the active concept; fallback to dereferencing or all practice questions
  const conceptQuestions = TARGETED_PRACTICE_QUESTIONS.filter(
    (q) => q.conceptId === activeLessonConcept
  );
  const questions = conceptQuestions.length >= 3 ? conceptQuestions : TARGETED_PRACTICE_QUESTIONS.slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [sessionResults, setSessionResults] = useState<{
    correctCount: number;
    totalAnswered: number;
    finished: boolean;
  }>({
    correctCount: 0,
    totalAnswered: 0,
    finished: false,
  });

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isCorrect =
    selectedOption !== null && selectedOption === currentQuestion.correctOptionIndex;

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const correct = selectedOption === currentQuestion.correctOptionIndex;

    if (correct) {
      setConsecutiveErrors(0);
    } else {
      setConsecutiveErrors((prev) => prev + 1);
    }

    setSessionResults((prev) => ({
      ...prev,
      correctCount: correct ? prev.correctCount + 1 : prev.correctCount,
      totalAnswered: prev.totalAnswered + 1,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed practice session!
      const finalCorrect = isCorrect
        ? sessionResults.correctCount
        : sessionResults.correctCount;
      const finalTotal = sessionResults.totalAnswered;

      recordPracticeSession(activeLessonConcept, finalTotal, finalCorrect);
      setSessionResults((prev) => ({ ...prev, finished: true }));
    }
  };

  // End of Practice View
  if (sessionResults.finished) {
    const accuracy = Math.round((sessionResults.correctCount / totalQuestions) * 100);
    const updatedScore = conceptMasteries[activeLessonConcept]?.score || accuracy;

    return (
      <LearningShell
        title="Practice Session Complete"
        subtitle={`${selectedSubject} &bull; Targeted Drill Summary`}
      >
        <div className="max-w-[700px] mx-auto bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#244B3C] text-[#C6F36B] flex items-center justify-center mx-auto shadow-md">
            <TrendingUp className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#244B3C]">
              ADAPTIVE RECALIBRATION
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#244B3C] mt-1">
              {accuracy >= 80 ? 'Mastery Milestone Reached!' : 'Practice Progress Recorded'}
            </h2>
            <p className="text-sm text-[#68716C] mt-2 max-w-md mx-auto leading-relaxed">
              {accuracy >= 80
                ? 'Your drill results demonstrate solid command of this concept. Lumora has elevated your mastery status.'
                : 'Good effort! Repetition on targeted drills creates durable memory hooks. Review the recommendation below.'}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 rounded-xl bg-[#E8EBE9] border border-[#D6DDD8]">
            <div>
              <span className="text-[11px] font-bold uppercase text-[#68716C]">Session Accuracy</span>
              <div className="font-heading font-extrabold text-2xl text-[#244B3C] mt-0.5">
                {sessionResults.correctCount} / {totalQuestions}
              </div>
              <span className="text-xs text-[#68716C] font-mono">({accuracy}%)</span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase text-[#68716C]">Updated Mastery</span>
              <div className="font-heading font-extrabold text-2xl text-[#244B3C] mt-0.5">
                {updatedScore}%
              </div>
              <span className={`text-xs font-bold ${updatedScore >= 80 ? 'text-[#244B3C]' : 'text-[#A85B53]'}`}>
                {updatedScore >= 80 ? 'Provisionally Mastered' : 'Needs Reinforcement'}
              </span>
            </div>
          </div>

          {/* Adaptive Next Action */}
          <div className="p-4 rounded-2xl border border-[#D6DDD8] bg-[#F8FAF9] text-left flex items-start gap-3.5 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#244B3C] text-[#C6F36B] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase text-[#244B3C]">
                Next Adaptive Recommendation:
              </span>
              <p className="text-xs text-[#68716C] mt-0.5 leading-relaxed">
                {accuracy >= 80
                  ? 'Advance to the next module in your learning path: Pointer Reassignment and Null Pointer Safety.'
                  : 'Revisit the alternative visual analogy in the lesson to strengthen mental models before the next check.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSessionResults({ correctCount: 0, totalAnswered: 0, finished: false });
                setCurrentIndex(0);
                setSelectedOption(null);
                setIsAnswerSubmitted(false);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold border border-[#D6DDD8] bg-[#F8FAF9] text-[#244B3C] hover:bg-[#E8EBE9] flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Practice Drills</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/learn')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#244B3C] text-[#F8FAF9] px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1D3D31] transition-colors"
            >
              <span>Return to Learning Path</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
            </button>
          </div>
        </div>
      </LearningShell>
    );
  }

  // Active Practice Question View
  return (
    <LearningShell
      title={`Targeted Practice: ${currentQuestion.conceptName}`}
      subtitle={`${selectedSubject} &bull; Question ${currentIndex + 1} of ${totalQuestions} &bull; Difficulty: ${currentQuestion.difficulty}`}
    >
      <div className="max-w-[780px] mx-auto space-y-6">
        
        {/* Progress Bar & Current Concept Pill */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6F36B] border border-[#244B3C]" />
            <span className="text-xs font-bold text-[#244B3C] uppercase tracking-wide">
              {currentQuestion.conceptName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#68716C] font-mono">
              Drill: {currentIndex + 1} / {totalQuestions}
            </span>
            <div className="w-24 h-2.5 bg-[#E7DECf] rounded-full overflow-hidden border border-[#D6DDD8]/50">
              <div
                className="h-full bg-[#244B3C] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#F8FAF9] border border-[#D6DDD8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#D6DDD8]/60">
            <span className="text-xs font-semibold text-[#68716C]">
              Practice Exercise #{currentIndex + 1}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#244B3C] text-[#C6F36B] font-bold">
              {currentQuestion.difficulty}
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#244B3C] leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Code Snippet if present */}
          {currentQuestion.codeSnippet && (
            <div className="rounded-2xl bg-[#244B3C] border border-[#1D3D31] p-4 text-[#F8FAF9] font-mono text-xs sm:text-sm overflow-x-auto shadow-sm">
              <pre className="leading-relaxed">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isSubmittedOption = isAnswerSubmitted && isSelected;
              const isCorrectOption = isAnswerSubmitted && optIdx === currentQuestion.correctOptionIndex;

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedOption(optIdx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-180 flex items-start gap-3.5 focus:outline-none ${
                    isAnswerSubmitted
                      ? isCorrectOption
                        ? 'bg-[#F4F8E4] border-[#244B3C] text-[#244B3C] font-bold'
                        : isSubmittedOption
                        ? 'bg-[#F9ECEB] border-[#A85B53] text-[#6A2E28]'
                        : 'bg-[#F8FAF9] border-[#D6DDD8] opacity-60'
                      : isSelected
                      ? 'bg-[#F4F8E4] border-[#244B3C] ring-1 ring-[#244B3C]'
                      : 'bg-[#F8FAF9] border-[#D6DDD8] hover:bg-[#E8EBE9]/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border ${
                    isSelected
                      ? 'bg-[#244B3C] text-[#C6F36B] border-[#244B3C]'
                      : 'bg-[#F8FAF9] text-[#68716C] border-[#D6DDD8]'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-sm leading-relaxed flex-1">
                    {option}
                  </span>
                  {isAnswerSubmitted && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-[#244B3C] shrink-0" />
                  )}
                  {isAnswerSubmitted && isSubmittedOption && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-[#A85B53] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Box */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-2xl border space-y-2 animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-[#F4F8E4] border-[#C6F36B] text-[#244B3C]'
                : 'bg-[#F9ECEB] border-[#A85B53]/40 text-[#6A2E28]'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#244B3C]" />
                    <span>Correct Reasoning!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-[#A85B53]" />
                    <span>Misconception Detected</span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Adaptive Support Box for Consecutive Errors */}
          {consecutiveErrors >= 2 && (
            <div className="p-4 rounded-2xl bg-[#E8EBE9] border border-[#244B3C] flex items-start gap-3 text-xs text-[#242A27]">
              <AlertTriangle className="w-4 h-4 text-[#A85B53] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#244B3C]">Need a step back?</span>
                <p className="mt-0.5 text-[#68716C]">
                  Pointers can be tricky when visualizing memory addresses for the first time. We recommend reviewing the visual memory diagram before trying more drills.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/lesson')}
                  className="mt-2 inline-flex items-center gap-1 font-bold text-[#244B3C] hover:underline"
                >
                  <span>Re-open lesson &amp; memory diagram</span>
                  <ArrowRight className="w-3 h-3 text-[#C6F36B]" />
                </button>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-[#D6DDD8]/70 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/learn')}
              className="text-xs text-[#68716C] hover:text-[#244B3C] transition-colors"
            >
              Exit to learning path
            </button>

            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedOption === null
                    ? 'bg-[#D6DDD8]/50 text-[#68716C] cursor-not-allowed'
                    : 'bg-[#244B3C] text-[#F8FAF9] hover:bg-[#1D3D31]'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-1.5 bg-[#244B3C] text-[#F8FAF9] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1D3D31] transition-colors shadow-xs"
              >
                <span>{currentIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Practice'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6F36B]" />
              </button>
            )}
          </div>

        </div>

      </div>
    </LearningShell>
  );
};
