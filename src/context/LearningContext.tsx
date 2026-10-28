import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Difficulty,
  ConceptId,
  ConceptMastery,
  AssessmentResult,
  PracticeAttempt,
} from '../types/learning';
import { INITIAL_CONCEPTS, DIAGNOSTIC_QUESTIONS } from '../data/demoQuestions';
import { calculateAssessmentResult } from '../services/assessmentService';
import { updateMasteryAfterPractice } from '../services/masteryService';

interface LearningContextType {
  selectedSubject: string;
  selectedTopic: string;
  difficulty: Difficulty;
  assessmentAnswers: Record<number, number>;
  assessmentResult: AssessmentResult | null;
  conceptMasteries: Record<ConceptId, ConceptMastery>;
  practiceAttempts: PracticeAttempt[];
  completedLessons: string[];
  activeLessonConcept: ConceptId;
  streakDays: number;

  setSubject: (subject: string) => void;
  setTopic: (topic: string) => void;
  setDifficulty: (diff: Difficulty) => void;
  saveAssessmentAnswer: (questionId: number, optionIndex: number) => void;
  submitAssessment: () => AssessmentResult;
  setActiveLessonConcept: (conceptId: ConceptId) => void;
  markLessonCompleted: (conceptId: ConceptId) => void;
  recordPracticeSession: (conceptId: ConceptId, total: number, correct: number) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'mindpath_ai_state_v1';

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSubject, setSubject] = useState<string>('C++');
  const [selectedTopic, setTopic] = useState<string>('Pointers');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [conceptMasteries, setConceptMasteries] = useState<Record<ConceptId, ConceptMastery>>(INITIAL_CONCEPTS);
  const [practiceAttempts, setPracticeAttempts] = useState<PracticeAttempt[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeLessonConcept, setActiveLessonConcept] = useState<ConceptId>('dereferencing');
  const [streakDays] = useState<number>(3); // Explicitly labeled as demo data
  const [hydrated, setHydrated] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedSubject) setSubject(parsed.selectedSubject);
        if (parsed.selectedTopic) setTopic(parsed.selectedTopic);
        if (parsed.difficulty) setDifficulty(parsed.difficulty);
        if (parsed.assessmentAnswers) setAssessmentAnswers(parsed.assessmentAnswers);
        if (parsed.assessmentResult) setAssessmentResult(parsed.assessmentResult);
        if (parsed.conceptMasteries) setConceptMasteries(parsed.conceptMasteries);
        if (parsed.practiceAttempts) setPracticeAttempts(parsed.practiceAttempts);
        if (parsed.completedLessons) setCompletedLessons(parsed.completedLessons);
        if (parsed.activeLessonConcept) setActiveLessonConcept(parsed.activeLessonConcept);
      }
    } catch (e) {
      console.warn('Could not parse saved MindPath demo state:', e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    // Do not overwrite saved progress with defaults before the initial read completes.
    if (!hydrated) return;
    try {
      const stateToSave = {
        selectedSubject,
        selectedTopic,
        difficulty,
        assessmentAnswers,
        assessmentResult,
        conceptMasteries,
        practiceAttempts,
        completedLessons,
        activeLessonConcept,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save MindPath demo state to localStorage:', e);
    }
  }, [
    selectedSubject,
    selectedTopic,
    difficulty,
    assessmentAnswers,
    assessmentResult,
    conceptMasteries,
    practiceAttempts,
    completedLessons,
    activeLessonConcept,
    hydrated,
  ]);

  const saveAssessmentAnswer = (questionId: number, optionIndex: number) => {
    setAssessmentAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const submitAssessment = (): AssessmentResult => {
    const result = calculateAssessmentResult(assessmentAnswers, DIAGNOSTIC_QUESTIONS);
    setAssessmentResult(result);
    setConceptMasteries(result.conceptMastery);
    setActiveLessonConcept(result.weakestConceptId);
    return result;
  };

  const markLessonCompleted = (conceptId: ConceptId) => {
    setCompletedLessons((prev) => {
      if (prev.includes(conceptId)) return prev;
      return [...prev, conceptId];
    });
  };

  const recordPracticeSession = (conceptId: ConceptId, total: number, correct: number) => {
    // Update mastery
    const current = conceptMasteries[conceptId] || INITIAL_CONCEPTS[conceptId];
    const updated = updateMasteryAfterPractice(current, total, correct);

    setConceptMasteries((prev) => ({
      ...prev,
      [conceptId]: updated,
    }));

    // Record attempt
    setPracticeAttempts((prev) => [
      ...prev,
      {
        questionId: Date.now(),
        selectedOption: 0,
        isCorrect: correct > 0,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSubject('C++');
    setTopic('Pointers');
    setDifficulty('Beginner');
    setAssessmentAnswers({});
    setAssessmentResult(null);
    setConceptMasteries(INITIAL_CONCEPTS);
    setPracticeAttempts([]);
    setCompletedLessons([]);
    setActiveLessonConcept('dereferencing');
  };

  return (
    <LearningContext.Provider
      value={{
        selectedSubject,
        selectedTopic,
        difficulty,
        assessmentAnswers,
        assessmentResult,
        conceptMasteries,
        practiceAttempts,
        completedLessons,
        activeLessonConcept,
        streakDays,
        setSubject,
        setTopic,
        setDifficulty,
        saveAssessmentAnswer,
        submitAssessment,
        setActiveLessonConcept,
        markLessonCompleted,
        recordPracticeSession,
        resetProgress,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
