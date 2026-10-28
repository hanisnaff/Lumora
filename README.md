# MindPath AI — Adaptive Learning Platform (Hackathon MVP)

MindPath AI is an adaptive-learning hackathon demo that identifies a student's concept-level knowledge gaps through a diagnostic quiz and updates a personalized learning path using deterministic local scoring. It does not call an external AI API.

This application includes both the **editorial homepage** and the complete **end-to-end adaptive learning workspace MVP**.

---

## 🧭 Application Routes & Screens

| Route | Screen | Purpose |
| :--- | :--- | :--- |
| `/` | **Home / Welcome** | The full, premium MindPath AI homepage with product preview, interactive step inspection, and value pillars. |
| `/learn` | **Learning Setup & Path** | Subject picker (C++ featured demo), topic selection, difficulty setting, and adaptive module overview. |
| `/assessment` | **Diagnostic Assessment** | 5-question baseline quiz analyzing conceptual understanding, memory addresses, declaration, dereferencing, and safety. |
| `/results` | **Knowledge Gap Results** | Live calculation of assessment scores, concept-level mastery bars, prerequisite warnings, and primary gap identification. |
| `/lesson` | **Personalized Lesson** | Guided remediation with plain-language breakdown, toggleable intuitive analogy, worked code, memory diagram, and comprehension check. |
| `/practice` | **Targeted Practice** | Focused drills on identified gap concepts with immediate feedback, adaptive guidance for consecutive mistakes, and dynamic mastery recalibration. |
| `/progress` | **Learning Progress** | Comprehensive student telemetry dashboard showing learning streaks, session score history, concept status breakdown, and next steps. |

---

## 🧠 The Adaptive Learning Loop

The application operates as one interconnected, state-driven feedback loop:

```
[1. Select Subject & Topic: C++ Pointers]
                   │
                   ▼
[2. Complete 5-Question Diagnostic Assessment]
                   │
                   ▼
[3. Local Assessment Engine Evaluates Answers & Gaps]
     ├── ≥80%: Provisionally Mastered
     ├── 50–79%: Targeted Practice Needed
     └── <50%: Prerequisite Review Required
                   │
                   ▼
[4. Knowledge Gap Analysis Identifies Weakest Concept]
                   │
                   ▼
[5. Personalized Lesson on Weakest Concept (*ptr / &var)]
     ├── Plain-Language Breakdown
     ├── Toggleable Intuitive Analogy
     ├── Interactive Memory Stack Diagram
     └── Common Misconceptions
                   │
                   ▼
[6. Targeted Practice Drills with Immediate Feedback]
     ├── Adaptive intervention on consecutive mistakes
     └── Live mastery score recalibration (blended score)
                   │
                   ▼
[7. Learning Path & Progress Dashboard Dynamically Update]
```

---

## 🎨 Visual Identity & Design System

- **Main Background**: `#E8EBE9` (cool grey)
- **Cards & Elevated Surfaces**: `#F8FAF9` (soft off-white)
- **Headings & Primary Text**: `#242A27` (dark charcoal)
- **Secondary Text**: `#68716C` (warm muted gray-brown)
- **Borders**: `#D6DDD8` (fine, soft sand border)
- **Accent**: `#C6F36B` (muted warm tan)
- **Headings Font**: **Plus Jakarta Sans** (Google Fonts)
- **Body & UI Font**: **Inter** (Google Fonts)

---

## 🛠️ Architecture & Services

The featured, fully interactive curriculum is **C++ Pointers**. Other subjects and topics are marked as previews until their matching assessments and lessons are implemented. The progress dashboard uses real local demo state, starts with an empty state, and does not fabricate historical scores or a learning streak. Targeted practice includes at least three concept-specific questions for each pointer concept.

A GitHub Actions workflow runs `npm ci` and `npm run build` on pushes and pull requests to `main`.

```text
src/
├── types/
│   └── learning.ts             # TypeScript interfaces for concepts, masteries, & questions
├── data/
│   └── demoQuestions.ts        # Diagnostic questions, lessons, analogies, & practice pool
├── services/
│   ├── assessmentService.ts    # Answer grading, concept scoring, & gap identification
│   ├── masteryService.ts       # Mastery recalibration after practice drills
│   └── learningPathService.ts  # Dynamic module states and next-action recommendation
├── context/
│   └── LearningContext.tsx     # Global React Context with localStorage persistence
├── components/
│   ├── LearningShell.tsx       # Desktop sidebar, mobile drawer, & navigation layout
│   ├── Logo.tsx                # Geometric path logo & wordmark
│   ├── Navbar.tsx              # Sticky header with in-page smooth scrolling
│   ├── Hero.tsx                # Hero section with balanced 55/45 layout
│   ├── LearningPathPreview.tsx # Interactive product interface simulation
│   ├── ValueStrip.tsx          # 3-part understated value proposition strip
│   ├── HowItWorks.tsx          # 3-stage adaptive cycle grid
│   ├── LearningApproach.tsx    # Knowledge graph comparison section
│   ├── ForStudents.tsx         # Disciplines & study contexts
│   ├── CTASection.tsx          # Restrained charcoal closing banner
│   ├── Footer.tsx              # Minimal footer
│   └── QuickStartModal.tsx     # Diagnostic launch & sign-in modal
└── pages/
    ├── HomePage.tsx            # Homepage composition
    ├── LearningSetupPage.tsx   # Subject/topic picker & learning path overview
    ├── DiagnosticAssessmentPage.tsx # 5-question baseline assessment
    ├── KnowledgeGapResultsPage.tsx  # Dynamic gap analysis & breakdown
    ├── PersonalizedLessonPage.tsx   # Digital tutor lesson with memory diagram
    ├── TargetedPracticePage.tsx     # Immediate-feedback drill exercises
    └── LearningProgressPage.tsx     # Student progress dashboard
```

---

## 🚀 How to Run Locally

1. **Install dependencies**:
   ```powershell
   npm install
   ```

2. **Start the development server**:
   ```powershell
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production**:
   ```powershell
   npm run build
   ```

4. **Type-check without errors**:
   ```powershell
   npx tsc --noEmit
   ```
