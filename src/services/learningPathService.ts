import { ConceptId, ConceptMastery, LearningPathModule } from '../types/learning';

export function getLearningPathModules(
  masteries: Record<ConceptId, ConceptMastery>,
  completedLessons: string[] = []
): LearningPathModule[] {
  const modules: LearningPathModule[] = [
    {
      id: 'mod-1',
      title: 'Memory Addresses & the & Operator',
      conceptId: 'memory-addresses',
      description: 'Understanding how variables map to RAM slots and querying addresses.',
      status: 'not-started',
      estimatedMinutes: 5,
      masteryScore: masteries['memory-addresses']?.score || 0,
    },
    {
      id: 'mod-2',
      title: 'Pointer Declaration & Type Safety',
      conceptId: 'pointer-declaration',
      description: 'Declaring pointer variables, understanding Type*, and safe initialization.',
      status: 'not-started',
      estimatedMinutes: 5,
      masteryScore: masteries['pointer-declaration']?.score || 0,
    },
    {
      id: 'mod-3',
      title: 'Dereferencing (*ptr) Mastery',
      conceptId: 'dereferencing',
      description: 'Reading, modifying, and passing pointer references to alter memory.',
      status: 'not-started',
      estimatedMinutes: 6,
      masteryScore: masteries['dereferencing']?.score || 0,
    },
    {
      id: 'mod-4',
      title: 'Pointer Reassignment & Mutation',
      conceptId: 'pointer-assignment',
      description: 'Distinguishing between re-aiming pointers and mutating underlying data.',
      status: 'not-started',
      estimatedMinutes: 6,
      masteryScore: masteries['pointer-assignment']?.score || 0,
    },
    {
      id: 'mod-5',
      title: 'Null Pointers & Defensive Coding',
      conceptId: 'pointer-safety',
      description: 'Using nullptr and defensive guards to eliminate segmentation faults.',
      status: 'not-started',
      estimatedMinutes: 5,
      masteryScore: masteries['pointer-safety']?.score || 0,
    },
  ];

  return modules.map((mod) => {
    const isLessonCompleted = completedLessons.includes(mod.conceptId);
    const score = masteries[mod.conceptId]?.score || 0;

    let status: 'not-started' | 'in-progress' | 'completed' = 'not-started';
    if (score >= 80 || isLessonCompleted) {
      status = 'completed';
    } else if (score > 0 || masteries[mod.conceptId]?.questionsTested > 0) {
      status = 'in-progress';
    }

    return {
      ...mod,
      status,
      masteryScore: score,
    };
  });
}

export function getRecommendedAction(
  assessmentTaken: boolean,
  weakestConceptId: ConceptId | null,
  masteries: Record<ConceptId, ConceptMastery>
): {
  type: 'assessment' | 'lesson' | 'practice' | 'advance';
  title: string;
  description: string;
  targetRoute: string;
  conceptId?: ConceptId;
} {
  if (!assessmentTaken) {
    return {
      type: 'assessment',
      title: 'Take Initial Diagnostic',
      description: 'Complete the 5-question baseline assessment to identify your concept gaps.',
      targetRoute: '/assessment',
    };
  }

  if (weakestConceptId && masteries[weakestConceptId]?.score < 80) {
    const conceptName = masteries[weakestConceptId]?.conceptName || 'Pointers';
    return {
      type: 'lesson',
      title: `Study Gap: ${conceptName}`,
      description: `Your diagnostic identified ${conceptName} as your lowest mastery area (${masteries[weakestConceptId]?.score}%).`,
      targetRoute: '/lesson',
      conceptId: weakestConceptId,
    };
  }

  // Find any other concept needing practice
  const needsPractice = Object.values(masteries).find((c) => c.score < 80 && c.questionsTested > 0);
  if (needsPractice) {
    return {
      type: 'practice',
      title: `Targeted Practice: ${needsPractice.conceptName}`,
      description: `Solidify your understanding of ${needsPractice.conceptName} through interactive problem drills.`,
      targetRoute: '/practice',
      conceptId: needsPractice.conceptId,
    };
  }

  return {
    type: 'advance',
    title: 'Ready for Unit Synthesis',
    description: 'All core pointer concepts meet the 80% demonstration mastery threshold. Proceed to Dynamic Memory & Heap.',
    targetRoute: '/learn',
  };
}
