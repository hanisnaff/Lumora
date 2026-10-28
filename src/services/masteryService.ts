import { ConceptMastery, MasteryStatus } from '../types/learning';

export function updateMasteryAfterPractice(
  currentMastery: ConceptMastery,
  totalPracticed: number,
  correctCount: number
): ConceptMastery {
  const updatedTested = (currentMastery.questionsTested || 0) + totalPracticed;
  const updatedCorrect = (currentMastery.correctAnswers || 0) + correctCount;

  // Blended mastery score: weighted 40% diagnostic + 60% recent practice
  const practicePercentage = totalPracticed > 0 ? (correctCount / totalPracticed) * 100 : 0;
  
  let newScore = Math.round(
    currentMastery.questionsTested > 0
      ? currentMastery.score * 0.35 + practicePercentage * 0.65
      : practicePercentage
  );

  // Clamp 0 - 100
  newScore = Math.max(0, Math.min(100, newScore));

  let status: MasteryStatus = 'needs-review';
  if (newScore >= 80) {
    status = 'mastered';
  } else if (newScore >= 50) {
    status = 'practising';
  } else {
    status = 'needs-review';
  }

  return {
    ...currentMastery,
    score: newScore,
    status,
    questionsTested: updatedTested,
    correctAnswers: updatedCorrect,
    lastPracticed: new Date().toISOString(),
  };
}
