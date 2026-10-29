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
import { isRemoteProgressConfigured, loadRemoteProgress, saveRemoteProgress } from '../services/remoteProgress';

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

const STORAGE_KEY = 'lumora_learning_state_v1';

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
  const [hydrated, setHydrated] = useState(false);

  // Restore local progress first, then let the database copy take precedence when configured.
  useEffect(() => {
    let cancelled = false;

    const applySavedState = (parsed: Record<string, unknown>) => {
      if (parsed.selectedSubject === 'C++') setSubject('C++');
      if (parsed.selectedTopic === 'Pointers') setTopic('Pointers');
      if (typeof parsed.difficulty === 'string' && ['Beginner', 'Intermediate', 'Advanced'].includes(parsed.difficulty)) {
        setDifficulty(parsed.difficulty as Difficulty);
      }
      if (parsed.assessmentAnswers && typeof parsed.assessmentAnswers === 'object') setAssessmentAnswers(parsed.assessmentAnswers as Record<number, number>);
      if (parsed.assessmentResult) setAssessmentResult(parsed.assessmentResult as AssessmentResult);
      if (parsed.conceptMasteries && typeof parsed.conceptMasteries === 'object') setConceptMasteries(parsed.conceptMasteries as Record<ConceptId, ConceptMastery>);
      if (Array.isArray(parsed.practiceAttempts)) setPracticeAttempts(parsed.practiceAttempts as PracticeAttempt[]);
      if (Array.isArray(parsed.completedLessons)) setCompletedLessons(parsed.completedLessons as string[]);
      if (typeof parsed.activeLessonConcept === 'string') setActiveLessonConcept(parsed.activeLessonConcept as ConceptId);
    };

    const hydrate = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('mindpath_ai_state_v1');
        if (saved) {
          applySavedState(JSON.parse(saved) as Record<string, unknown>);
          localStorage.setItem(STORAGE_KEY, saved);
        }
      } catch (error) {
        console.warn('Could not parse saved Lumora state:', error);
      }

      if (isRemoteProgressConfigured) {
        try {
          const remote = await loadRemoteProgress();
          if (!cancelled && remote) {
            applySavedState(remote);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
          }
        } catch (error) {
          console.warn('Lumora could not load cloud progress; keeping local progress:', error);
        }
      }

      if (!cancelled) setHydrated(true);
    };

    void hydrate();
    return () => { cancelled = true; };
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
      console.warn('Could not save Lumora demo state to localStorage:', e);
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

  // Debounce cloud writes to avoid sending a request for every individual state update.
  useEffect(() => {
    if (!hydrated || !isRemoteProgressConfigured) return;

    const stateToSync = {
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

    const timeoutId = window.setTimeout(() => {
      void saveRemoteProgress(stateToSync).catch((error) => {
        console.warn('Lumora cloud sync failed; local progress is still available:', error);
      });
    }, 700);

    return () => window.clearTimeout(timeoutId);
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
        selectedOption: -1,
        isCorrect: correct === total,
        timestamp: new Date().toISOString(),
        conceptId,
        totalQuestions: total,
        correctAnswers: correct,
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
