import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LearningProvider } from './context/LearningContext';
import { HomePage } from './pages/HomePage';
import { LearningSetupPage } from './pages/LearningSetupPage';
import { DiagnosticAssessmentPage } from './pages/DiagnosticAssessmentPage';
import { KnowledgeGapResultsPage } from './pages/KnowledgeGapResultsPage';
import { PersonalizedLessonPage } from './pages/PersonalizedLessonPage';
import { TargetedPracticePage } from './pages/TargetedPracticePage';
import { LearningProgressPage } from './pages/LearningProgressPage';

export default function App() {
  return (
    <LearningProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* 2. Learning Setup & Learning Path Overview */}
          <Route path="/learn" element={<LearningSetupPage />} />

          {/* 3. Diagnostic Assessment */}
          <Route path="/assessment" element={<DiagnosticAssessmentPage />} />

          {/* 4. Knowledge Gap Analysis Results */}
          <Route path="/results" element={<KnowledgeGapResultsPage />} />

          {/* 5. Personalized Lesson */}
          <Route path="/lesson" element={<PersonalizedLessonPage />} />

          {/* 6. Targeted Practice */}
          <Route path="/practice" element={<TargetedPracticePage />} />

          {/* 7. Learning Progress Dashboard */}
          <Route path="/progress" element={<LearningProgressPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LearningProvider>
  );
}
