import { AssessmentQuestion, AssessmentResult, ConceptId, ConceptMastery, MasteryStatus } from '../types/learning';
import { DIAGNOSTIC_QUESTIONS, INITIAL_CONCEPTS } from '../data/demoQuestions';

export function calculateAssessmentResult(
  userAnswers: Record<number, number>, // questionId -> selectedOptionIndex
  questions: AssessmentQuestion[] = DIAGNOSTIC_QUESTIONS
): AssessmentResult {
  let totalCorrect = 0;

  // Initialize concept tracking
  const conceptStats: Record<
    ConceptId,
    { tested: number; correct: number; name: string }
  > = {
    'memory-addresses': { tested: 0, correct: 0, name: 'Memory Addresses (&)' },
    'pointer-declaration': { tested: 0, correct: 0, name: 'Pointer Declaration (Type*)' },
    'dereferencing': { tested: 0, correct: 0, name: 'Dereferencing (*ptr)' },
    'pointer-assignment': { tested: 0, correct: 0, name: 'Pointer Assignment & Mutation' },
    'pointer-safety': { tested: 0, correct: 0, name: 'Null Pointers & Safety' },
  };

  questions.forEach((q) => {
    const selected = userAnswers[q.id];
    const isCorrect = selected !== undefined && selected === q.correctOptionIndex;

    conceptStats[q.conceptId].tested += 1;
    if (isCorrect) {
      totalCorrect += 1;
      conceptStats[q.conceptId].correct += 1;
    }
  });

  const conceptMastery: Record<ConceptId, ConceptMastery> = { ...INITIAL_CONCEPTS };

  // Calculate percentage and status for each concept based on demonstration rules:
  // - Below 50%: Revisit prerequisite concepts ('needs-review')
  // - 50% - 79%: Continue targeted practice ('practising')
  // - 80% or above: Provisionally mark as mastered ('mastered')
  Object.keys(conceptStats).forEach((key) => {
    const cId = key as ConceptId;
    const stat = conceptStats[cId];
    const score = stat.tested > 0 ? Math.round((stat.correct / stat.tested) * 100) : 0;

    let status: MasteryStatus = 'needs-review';
    if (score >= 80) {
      status = 'mastered';
    } else if (score >= 50) {
      status = 'practising';
    } else {
      status = 'needs-review';
    }

    conceptMastery[cId] = {
      conceptId: cId,
      conceptName: stat.name,
      score,
      status,
      questionsTested: stat.tested,
      correctAnswers: stat.correct,
      lastPracticed: new Date().toISOString(),
    };
  });

  // Identify weakest and strongest concepts
  const sortedConcepts = Object.values(conceptMastery).sort((a, b) => {
    // If tested > 0, compare scores; if tied, prioritize core concepts
    return a.score - b.score;
  });

  // Filter only tested concepts for weakest calculation
  const testedConcepts = sortedConcepts.filter((c) => c.questionsTested > 0);
  const weakest = testedConcepts.length > 0 ? testedConcepts[0] : sortedConcepts[0];
  const strongest = testedConcepts.length > 0 ? testedConcepts[testedConcepts.length - 1] : sortedConcepts[sortedConcepts.length - 1];

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return {
    totalQuestions,
    correctAnswers: totalCorrect,
    percentage,
    conceptMastery,
    weakestConceptId: weakest.conceptId,
    strongestConceptId: strongest.conceptId,
    recommendedLessonId: weakest.conceptId,
    submittedAt: new Date().toISOString(),
    answers: userAnswers,
  };
}
