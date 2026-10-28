import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LearningProvider } from './context/LearningContext';
import { HomePage } from './pages/HomePage';
import { LearningSetupPage } from './pages/LearningSetupPage';
import { DiagnosticAssessmentPage } from './pages/DiagnosticAssessmentPage';
import { KnowledgeGapResultsPage } from './pages/KnowledgeGapResultsPage';
import { PersonalizedLessonPage } from './pages/PersonalizedLessonPage';
import { TargetedPracticePage } from './pages/TargetedPracticePage';
import { LearningProgressPage } from './pages/LearningProgressPage';
import { ConnectedWorkspacePage } from './pages/ConnectedWorkspacePage';

export default function App() {
  return (
    <LearningProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<ConnectedWorkspacePage />} />
          <Route path="/learn" element={<LearningSetupPage />} />
          <Route path="/assessment" element={<DiagnosticAssessmentPage />} />
          <Route path="/results" element={<KnowledgeGapResultsPage />} />
          <Route path="/lesson" element={<PersonalizedLessonPage />} />
          <Route path="/practice" element={<TargetedPracticePage />} />
          <Route path="/progress" element={<LearningProgressPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LearningProvider>
  );
}
