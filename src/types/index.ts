// Core domain types for StudySphere AI

export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// ─── Subject & Curriculum ───────────────────────────────────────────────────

export interface Subject {
  id: string
  name: string
  code: string
  semester: Semester
  description: string
  iconName: string
  color: string
  unitCount: number
  topicCount: number
  difficulty: Difficulty
  progress: number
  lastStudied?: string
}

export interface Unit {
  id: string
  subjectId: string
  number: number
  title: string
  description: string
  topicCount: number
  progress: number
}

export interface Topic {
  id: string
  unitId: string
  subjectId: string
  title: string
  description: string
  difficulty: Difficulty
  tags: string[]
  estimatedMinutes: number
  isBookmarked: boolean
  progress: number
  lastStudied?: string
}

export interface TopicContent {
  topicId: string
  introduction: string
  definition: string
  explanation: string
  realWorldExamples: RealWorldExample[]
  terminology: GlossaryTerm[]
  algorithm: string
  pseudocode: string
  cCode: string
  cppCode: string
  codeExplanation: CodeExplanationLine[]
  dryRun: DryRunStep[]
  sampleIO: SampleIO[]
  timeComplexity: ComplexityInfo
  spaceComplexity: ComplexityInfo
  advantages: string[]
  disadvantages: string[]
  commonMistakes: string[]
  practiceQuestions: string[]
  vivaQuestions: string[]
  relatedTopics: string[]
  approaches: Approach[]
}

export interface RealWorldExample {
  title: string
  description: string
  icon: string
}

export interface GlossaryTerm {
  term: string
  definition: string
}

export interface CodeExplanationLine {
  line: string
  explanation: string
}

export interface DryRunStep {
  step: number
  state: string
  explanation: string
}

export interface SampleIO {
  input: string
  output: string
  explanation: string
}

export interface ComplexityInfo {
  value: string
  explanation: string
}

export interface Approach {
  id: string
  name: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  algorithm: string
  pseudocode: string
  cCode: string
  cppCode: string
  dryRun: DryRunStep[]
  pros: string[]
  cons: string[]
}

// ─── DSA ─────────────────────────────────────────────────────────────────────

export interface DSACategory {
  id: string
  name: string
  icon: string
  color: string
  problemCount: number
  solvedCount: number
}

export interface DSAProblem {
  id: string
  categoryId: string
  title: string
  difficulty: Difficulty
  tags: string[]
  solveCount: number
  isSolved: boolean
  isBookmarked: boolean
  relatedTopicId?: string
}

export interface DSASolution {
  problemId: string
  approaches: Approach[]
}

// ─── Labs ─────────────────────────────────────────────────────────────────────

export interface Lab {
  id: string
  subjectId: string
  number: number
  title: string
  questionCount: number
  completedCount: number
  dueDate?: string
}

export interface LabQuestion {
  id: string
  labId: string
  number: number
  statement: string
  explanation: string
  relatedTopicId?: string
  requiredConcepts: string[]
  algorithm: string
  cCode: string
  cppCode: string
  codeExplanation: CodeExplanationLine[]
  sampleIO: SampleIO[]
  dryRun: DryRunStep[]
  timeComplexity: ComplexityInfo
  spaceComplexity: ComplexityInfo
  commonMistakes: string[]
  edgeCases: string[]
}

export interface LabSolution {
  questionId: string
  code: string
  language: 'c' | 'cpp'
  isCorrect: boolean
  submittedAt: string
}

// ─── Documents & AI ──────────────────────────────────────────────────────────

export interface Document {
  id: string
  name: string
  size: number
  uploadedAt: string
  status: 'processing' | 'ready' | 'error'
}

export interface ExamPrediction {
  id: string
  documentId: string
  topicName: string
  confidence: number
  frequency: number
  unit: string
  difficulty: Difficulty
  evidence: string[]
}

// ─── User & Progress ─────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: 'student' | 'admin'
  semester: Semester
  createdAt: string
}

export interface UserProgress {
  userId: string
  subjectId: string
  topicsCompleted: number
  totalTopics: number
  labsCompleted: number
  totalLabs: number
  dsaSolved: number
  lastActivity: string
}

export interface StudyActivity {
  date: string
  minutes: number
  topicsStudied: number
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatSession {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  contextTopicId?: string
  contextLabId?: string
  messageCount: number
}

export interface ChatMessage {
  id: string
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  isLoading?: boolean
}

// ─── Notes & Bookmarks ────────────────────────────────────────────────────────

export interface Note {
  id: string
  title: string
  content: string
  subjectId?: string
  topicId?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Bookmark {
  id: string
  type: 'topic' | 'dsa' | 'lab'
  referenceId: string
  title: string
  subjectName?: string
  savedAt: string
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: string | number
  children?: NavItem[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

