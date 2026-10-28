export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ConceptId =
  | 'pointer-declaration'
  | 'memory-addresses'
  | 'dereferencing'
  | 'pointer-assignment'
  | 'pointer-safety';

export type MasteryStatus = 'needs-review' | 'practising' | 'mastered';

export interface ConceptMastery {
  conceptId: ConceptId;
  conceptName: string;
  score: number; // 0 - 100
  status: MasteryStatus;
  questionsTested: number;
  correctAnswers: number;
  lastPracticed?: string;
}

export interface AssessmentQuestion {
  id: number;
  conceptId: ConceptId;
  conceptName: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface AssessmentResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  conceptMastery: Record<ConceptId, ConceptMastery>;
  weakestConceptId: ConceptId;
  strongestConceptId: ConceptId;
  recommendedLessonId: ConceptId;
  submittedAt: string;
  answers: Record<number, number>; // questionId -> optionIndex
}

export interface LessonContent {
  conceptId: ConceptId;
  conceptName: string;
  title: string;
  subtitle: string;
  badge: string;
  estimatedMinutes: number;
  primaryExplanation: string;
  alternateExplanation: string;
  analogy: {
    title: string;
    text: string;
  };
  codeExample: {
    code: string;
    steps: { line: number; explanation: string }[];
  };
  memoryDiagram: {
    variableName: string;
    value: string;
    address: string;
    pointerName: string;
    pointerValue: string;
    pointerAddress: string;
  };
  commonMistakes: {
    mistake: string;
    correction: string;
    why: string;
  }[];
  checkQuestion: {
    question: string;
    codeSnippet?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface PracticeQuestion {
  id: number;
  conceptId: ConceptId;
  conceptName: string;
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface PracticeAttempt {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  timestamp: string;
}

export interface LearningPathModule {
  id: string;
  title: string;
  conceptId: ConceptId;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  estimatedMinutes: number;
  masteryScore: number;
}
