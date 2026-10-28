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

  // Always recalculate from current mastery so the recommendation evolves after practice.
  const concepts = Object.values(masteries).filter(Boolean);
  const weakest = concepts.reduce((low, concept) => concept.score < low.score ? concept : low);
  const candidate = masteries[weakestConceptId || weakest.conceptId];
  const target = candidate && candidate.score < 80 && candidate.score <= weakest.score
    ? candidate
    : weakest;

  if (target.score < 50) {
    return {
      type: 'lesson',
      title: `Revisit the basics: ${target.conceptName}`,
      description: `${target.conceptName} is at ${target.score}%. Try the alternate explanation and review the prerequisite before another drill.`,
      targetRoute: '/lesson',
      conceptId: target.conceptId,
    };
  }

  if (target.score < 80) {
    return {
      type: target.questionsTested > 0 ? 'practice' : 'lesson',
      title: target.questionsTested > 0
        ? `Practise: ${target.conceptName}`
        : `Study gap: ${target.conceptName}`,
      description: target.questionsTested > 0
        ? `Your current mastery is ${target.score}%. Try another short practice set to reinforce this concept.`
        : `Your diagnostic identified ${target.conceptName} as a learning gap (${target.score}%).`,
      targetRoute: target.questionsTested > 0 ? '/practice' : '/lesson',
      conceptId: target.conceptId,
    };
  }

  const untested = concepts.find((concept) => concept.questionsTested === 0);
  if (untested) {
    return {
      type: 'lesson',
      title: `Explore next: ${untested.conceptName}`,
      description: 'Your assessed concepts are looking solid. Build coverage by learning this concept next.',
      targetRoute: '/lesson',
      conceptId: untested.conceptId,
    };
  }

  return {
    type: 'advance',
    title: 'Ready for the next topic',
    description: 'All core pointer concepts meet the 80% demonstration mastery threshold. Continue to the next learning module.',
    targetRoute: '/learn',
  };
}
