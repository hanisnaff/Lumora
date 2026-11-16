import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
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
import { isRemoteProgressConfigured, loadRemoteProgress, saveRemoteProgress, deleteRemoteProgress } from '../services/remoteProgress';

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
  resetAssessmentAnswers: () => void;
  submitAssessment: () => AssessmentResult;
  setActiveLessonConcept: (conceptId: ConceptId) => void;
  markLessonCompleted: (conceptId: ConceptId) => void;
  recordPracticeSession: (conceptId: ConceptId, total: number, correct: number) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'lumora_learning_state_v1';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isConceptId = (value: unknown): value is ConceptId =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(INITIAL_CONCEPTS, value);

const safeCount = (value: unknown, maximum = Number.MAX_SAFE_INTEGER): number =>
  typeof value === 'number' && Number.isSafeInteger(value)
    ? Math.max(0, Math.min(maximum, value))
    : 0;

function normaliseMasteries(value: unknown): Record<ConceptId, ConceptMastery> {
  const result: Record<ConceptId, ConceptMastery> = { ...INITIAL_CONCEPTS };
  if (!isRecord(value)) return result;

  for (const [key, candidate] of Object.entries(value)) {
    if (!isConceptId(key) || !isRecord(candidate)) continue;
    const score = typeof candidate.score === 'number' && Number.isFinite(candidate.score)
      ? Math.max(0, Math.min(100, Math.round(candidate.score)))
      : 0;
    const questionsTested = safeCount(candidate.questionsTested);
    const correctAnswers = Math.min(safeCount(candidate.correctAnswers), questionsTested);
    result[key] = {
      conceptId: key,
      conceptName: INITIAL_CONCEPTS[key].conceptName,
      score,
      status: score >= 80 ? 'mastered' : score >= 50 ? 'practising' : 'needs-review',
      questionsTested,
      correctAnswers,
      ...(typeof candidate.lastPracticed === 'string' ? { lastPracticed: candidate.lastPracticed } : {}),
    };
  }
  return result;
}

function normaliseAnswers(value: unknown): Record<number, number> {
  if (!isRecord(value)) return {};
  const answers: Record<number, number> = {};
  for (const question of DIAGNOSTIC_QUESTIONS) {
    const selected = value[question.id];
    if (typeof selected === 'number' && Number.isInteger(selected)
      && selected >= 0 && selected < question.options.length) {
      answers[question.id] = selected;
    }
  }
  return answers;
}

function normalisePracticeAttempts(value: unknown): PracticeAttempt[] {
  if (!Array.isArray(value)) return [];
  return value.slice(-500).flatMap((candidate): PracticeAttempt[] => {
    if (!isRecord(candidate)
      || !Number.isSafeInteger(candidate.questionId)
      || typeof candidate.isCorrect !== 'boolean'
      || typeof candidate.timestamp !== 'string'
      || !Number.isInteger(candidate.selectedOption)
      || (candidate.selectedOption as number) < -1) return [];

    const totalQuestions = safeCount(candidate.totalQuestions, 100);
    const correctAnswers = Math.min(safeCount(candidate.correctAnswers, totalQuestions), totalQuestions);
    return [{
      questionId: candidate.questionId as number,
      selectedOption: candidate.selectedOption as number,
      isCorrect: candidate.isCorrect,
      timestamp: candidate.timestamp,
      ...(isConceptId(candidate.conceptId) ? { conceptId: candidate.conceptId } : {}),
      ...(totalQuestions > 0 ? { totalQuestions, correctAnswers } : {}),
    }];
  });
}

function normaliseAssessmentResult(value: unknown): AssessmentResult | null {
  if (!isRecord(value)
    || !isConceptId(value.weakestConceptId)
    || !isConceptId(value.strongestConceptId)
    || !isConceptId(value.recommendedLessonId)
    || typeof value.submittedAt !== 'string') return null;

  const totalQuestions = safeCount(value.totalQuestions, DIAGNOSTIC_QUESTIONS.length);
  const correctAnswers = Math.min(safeCount(value.correctAnswers, totalQuestions), totalQuestions);
  const percentage = totalQuestions > 0
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0;

  return {
    totalQuestions,
    correctAnswers,
    percentage,
    conceptMastery: normaliseMasteries(value.conceptMastery),
    weakestConceptId: value.weakestConceptId,
    strongestConceptId: value.strongestConceptId,
    recommendedLessonId: value.recommendedLessonId,
    submittedAt: value.submittedAt,
    answers: normaliseAnswers(value.answers),
  };
}

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
  const [remoteIdentityResolved, setRemoteIdentityResolved] = useState(false);
  const [localPersistenceReady, setLocalPersistenceReady] = useState(!isRemoteProgressConfigured);
  const skipNextRemoteSync = useRef(false);

  // Resolve the active cloud identity before reusing any browser-cached progress.
  useEffect(() => {
    let cancelled = false;

    const applySavedState = (parsed: unknown) => {
      if (!isRecord(parsed)) return;
      if (parsed.selectedSubject === 'C++') setSubject('C++');
      if (parsed.selectedTopic === 'Pointers') setTopic('Pointers');
      if (typeof parsed.difficulty === 'string' && ['Beginner', 'Intermediate', 'Advanced'].includes(parsed.difficulty)) {
        setDifficulty(parsed.difficulty as Difficulty);
      }
      setAssessmentAnswers(normaliseAnswers(parsed.assessmentAnswers));
      setAssessmentResult(normaliseAssessmentResult(parsed.assessmentResult));
      setConceptMasteries(normaliseMasteries(parsed.conceptMasteries));
      setPracticeAttempts(normalisePracticeAttempts(parsed.practiceAttempts));
      setCompletedLessons(Array.isArray(parsed.completedLessons)
        ? [...new Set(parsed.completedLessons.filter(isConceptId))]
        : []);
      setActiveLessonConcept(isConceptId(parsed.activeLessonConcept) ? parsed.activeLessonConcept : 'dereferencing');
    };

    const hydrate = async () => {
      let localState: Record<string, unknown> | null = null;
      let previousOwner: { userId?: string | null; isAnonymous?: boolean } | null = null;

      try {
        const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('mindpath_ai_state_v1');
        if (saved) localState = JSON.parse(saved) as Record<string, unknown>;
        const ownerRaw = localStorage.getItem('lumora_progress_owner_v1');
        if (ownerRaw) previousOwner = JSON.parse(ownerRaw) as { userId?: string | null; isAnonymous?: boolean };
      } catch (error) {
        console.warn('Could not parse saved Lumora state or ownership:', error);
      }

      if (!isRemoteProgressConfigured) {
        if (localState) applySavedState(localState);
        if (!cancelled) {
          setRemoteIdentityResolved(true);
          setLocalPersistenceReady(true);
          setHydrated(true);
        }
        return;
      }

      try {
        const remote = await loadRemoteProgress();
        if (cancelled) return;

        if (remote) {
          applySavedState(remote);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
        } else if (localState) {
          const ownerRaw = localStorage.getItem('lumora_progress_owner_v1');
          const currentOwner = ownerRaw
            ? JSON.parse(ownerRaw) as { userId?: string | null; isAnonymous?: boolean }
            : null;
          const sameOwner = Boolean(
            previousOwner
            && currentOwner
            && previousOwner.userId
            && previousOwner.userId === currentOwner.userId
            && previousOwner.isAnonymous === currentOwner.isAnonymous
          );
          const anonymousProgressCanBeClaimed = previousOwner?.isAnonymous === true;
          const firstAnonymousSession = !previousOwner && currentOwner?.isAnonymous === true;

          // Anonymous demo progress may be claimed by the account the learner
          // signs into. A cache owned by a different signed-in account is never reused.
          if (sameOwner || anonymousProgressCanBeClaimed || firstAnonymousSession) {
            applySavedState(localState);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(localState));
          }
        }

        setRemoteIdentityResolved(true);
        setLocalPersistenceReady(true);
      } catch (error) {
        console.warn('Lumora could not load cloud progress; keeping eligible local progress offline:', error);
        // A signed-in account's cache is not displayed until its identity is verified.
        if (localState && previousOwner?.isAnonymous === true) applySavedState(localState);
        // Preserve an unverified signed-in cache instead of overwriting it with defaults.
        // A new browser or a positively identified anonymous demo can still work offline.
        setLocalPersistenceReady(!localState || previousOwner?.isAnonymous === true);
        // Keep cloud writes paused until the current account identity is verified.
      }

      if (!cancelled) setHydrated(true);
    };

    void hydrate();
    return () => { cancelled = true; };
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    // Do not overwrite saved progress with defaults before the initial read completes.
    if (!hydrated || !localPersistenceReady) return;
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
    localPersistenceReady,
  ]);

  // Debounce cloud writes to avoid sending a request for every individual state update.
  useEffect(() => {
    if (!hydrated || !remoteIdentityResolved || !isRemoteProgressConfigured) return;
    if (skipNextRemoteSync.current) {
      skipNextRemoteSync.current = false;
      return;
    }

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
    remoteIdentityResolved,
  ]);

  const saveAssessmentAnswer = (questionId: number, optionIndex: number) => {
    setAssessmentAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const resetAssessmentAnswers = () => {
    setAssessmentAnswers({});
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
    if (!Number.isSafeInteger(total) || total <= 0
      || !Number.isSafeInteger(correct) || correct < 0 || correct > total) {
      console.warn('Ignoring invalid practice-session results.');
      return;
    }

    // Derive mastery from the latest state so rapid consecutive sessions
    // cannot overwrite one another using a stale render's value.
    setConceptMasteries((prev) => {
      const current = prev[conceptId] || INITIAL_CONCEPTS[conceptId];
      return {
        ...prev,
        [conceptId]: updateMasteryAfterPractice(current, total, correct),
      };
    });

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
    skipNextRemoteSync.current = true;
    localStorage.removeItem(STORAGE_KEY);
    void deleteRemoteProgress().catch((error) => {
      console.warn('Lumora could not delete cloud progress:', error);
    });
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
        resetAssessmentAnswers,
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
