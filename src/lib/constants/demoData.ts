import type { Subject, StudyActivity, DSAProblem, DSACategory, Lab, ChatSession } from '@/types'

export const DEMO_USER = {
  id: 'user-1',
  name: 'Mohit Sharma',
  email: 'mohit@university.edu',
  avatarUrl: undefined,
  role: 'student' as const,
  semester: 4 as const,
  createdAt: '2024-07-01',
}

export const DEMO_SUBJECTS: Subject[] = [
  {
    id: 'ds',
    name: 'Data Structures',
    code: 'CS301',
    semester: 4,
    description: 'Fundamental data organization, management, and storage formats that enable efficient access and modification.',
    iconName: 'Binary',
    color: '#5b7fff',
    unitCount: 5,
    topicCount: 42,
    difficulty: 'Hard',
    progress: 68,
    lastStudied: '2024-11-12T16:00:00Z',
  },
  {
    id: 'os',
    name: 'Operating Systems',
    code: 'CS302',
    semester: 4,
    description: 'Study of OS concepts including process management, memory management, file systems, and I/O management.',
    iconName: 'Cpu',
    color: '#8b5cf6',
    unitCount: 5,
    topicCount: 38,
    difficulty: 'Medium',
    progress: 45,
    lastStudied: '2024-11-11T12:00:00Z',
  },
  {
    id: 'dbms',
    name: 'DBMS',
    code: 'CS303',
    semester: 4,
    description: 'Database management systems, SQL, normalization, transactions, and concurrency control.',
    iconName: 'Database',
    color: '#10b981',
    unitCount: 5,
    topicCount: 35,
    difficulty: 'Medium',
    progress: 72,
    lastStudied: '2024-11-10T09:30:00Z',
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    code: 'CS304',
    semester: 4,
    description: 'Network protocols, OSI model, TCP/IP, routing algorithms, and network security basics.',
    iconName: 'Network',
    color: '#f59e0b',
    unitCount: 5,
    topicCount: 40,
    difficulty: 'Hard',
    progress: 30,
    lastStudied: '2024-11-08T14:15:00Z',
  },
  {
    id: 'dip',
    name: 'Digital Image Processing',
    code: 'CS405',
    semester: 4,
    description: '2D signals & systems, spatial and frequency enhancement, image transforms, restoration models, and compression standards.',
    iconName: 'Image',
    color: '#06b6d4',
    unitCount: 5,
    topicCount: 52,
    difficulty: 'Hard',
    progress: 40,
    lastStudied: '2024-11-15T18:00:00Z',
  },
]

export const DEMO_CONTINUE_LEARNING = [
  {
    id: 't1',
    title: 'Binary Search Trees',
    subject: 'Data Structures',
    subjectId: 'ds',
    unit: 'Unit 3: Trees',
    progress: 65,
    difficulty: 'Medium' as const,
    lastStudied: '2024-11-12T16:00:00Z',
    estimatedMinutes: 25,
    topicId: 'binary-search-tree',
  },
  {
    id: 't2',
    title: 'Process Scheduling',
    subject: 'Operating Systems',
    subjectId: 'os',
    unit: 'Unit 2: Process Management',
    progress: 40,
    difficulty: 'Hard' as const,
    lastStudied: '2024-11-11T12:00:00Z',
    estimatedMinutes: 35,
    topicId: 'process-scheduling',
  },
  {
    id: 't3',
    title: 'SQL Joins & Subqueries',
    subject: 'DBMS',
    subjectId: 'dbms',
    unit: 'Unit 2: SQL',
    progress: 80,
    difficulty: 'Easy' as const,
    lastStudied: '2024-11-10T09:30:00Z',
    estimatedMinutes: 15,
    topicId: 'sql-joins',
  },
]

export const DEMO_WEAK_TOPICS = [
  { id: 'w1', title: 'Graph Algorithms (Dijkstra)', subject: 'Data Structures', difficulty: 'Hard' as const, score: 32 },
  { id: 'w2', title: 'Deadlock Detection', subject: 'Operating Systems', difficulty: 'Hard' as const, score: 38 },
  { id: 'w3', title: 'B+ Trees', subject: 'DBMS', difficulty: 'Medium' as const, score: 45 },
  { id: 'w4', title: 'TCP Congestion Control', subject: 'Computer Networks', difficulty: 'Hard' as const, score: 28 },
  { id: 'w5', title: 'Red-Black Trees', subject: 'Data Structures', difficulty: 'Hard' as const, score: 35 },
]

export const DEMO_UPCOMING_EXAMS = [
  { id: 'e1', name: 'Data Structures Mid-Sem', date: '2024-11-25', formattedDate: '25 Nov', daysLeft: 12, subject: 'DS', type: 'Mid-Semester' },
  { id: 'e2', name: 'OS Unit Test 3', date: '2024-11-18', formattedDate: '18 Nov', daysLeft: 5, subject: 'OS', type: 'Unit Test' },
  { id: 'e3', name: 'DBMS End-Sem', date: '2024-12-10', formattedDate: '10 Dec', daysLeft: 27, subject: 'DBMS', type: 'End-Semester' },
]

export const DEMO_PENDING_LABS = [
  { id: 'l1', title: 'Lab 1: Basic 1D-Array Operations', subject: 'Data Structures', dueDate: '2024-11-20', daysLeft: 7, questionsTotal: 7, questionsDone: 7 },
  { id: 'l2', title: 'Lab 2: Array Manipulations & Palindrome', subject: 'Data Structures', dueDate: '2024-11-25', daysLeft: 12, questionsTotal: 6, questionsDone: 6 },
  { id: 'l3', title: 'Lab 3: Linear & Binary Search', subject: 'Data Structures', dueDate: '2024-11-28', daysLeft: 15, questionsTotal: 7, questionsDone: 5 },
  { id: 'l4', title: 'Lab 4: 2D/3D Array & Selection Sort', subject: 'Data Structures', dueDate: '2024-12-05', daysLeft: 22, questionsTotal: 6, questionsDone: 3 },
  { id: 'l5', title: 'Lab 5: Bubble, Merge & Quick Sort', subject: 'Data Structures', dueDate: '2024-12-10', daysLeft: 27, questionsTotal: 3, questionsDone: 2 },
  { id: 'l6', title: 'Lab 6: Singly Linked List', subject: 'Data Structures', dueDate: '2024-12-15', daysLeft: 32, questionsTotal: 3, questionsDone: 1 },
  { id: 'l7', title: 'Lab 7: Josephus & Doubly Linked List', subject: 'Data Structures', dueDate: '2024-12-18', daysLeft: 35, questionsTotal: 2, questionsDone: 0 },
  { id: 'l10', title: 'Lab 10: Infix to Postfix/Prefix Stack', subject: 'Data Structures', dueDate: '2024-12-22', daysLeft: 39, questionsTotal: 2, questionsDone: 0 },
]

export const DEMO_AI_RECOMMENDATIONS = [
  {
    id: 'r1',
    title: 'Graph Algorithms — Dijkstra\'s SSSP',
    reason: 'You have an exam in 13 days and this topic appears frequently in past papers (8 times)',
    subject: 'Data Structures',
    priority: 'high' as const,
    estimatedMinutes: 45,
    topicId: 'dijkstra',
  },
  {
    id: 'r2',
    title: 'Deadlock — Detection & Recovery',
    reason: 'Your quiz score was 38% — this topic needs immediate attention',
    subject: 'Operating Systems',
    priority: 'high' as const,
    estimatedMinutes: 30,
    topicId: 'deadlock',
  },
  {
    id: 'r3',
    title: 'Normal Forms (1NF, 2NF, 3NF, BCNF)',
    reason: 'Trending in DBMS end-sem papers; builds on your recent SQL progress',
    subject: 'DBMS',
    priority: 'medium' as const,
    estimatedMinutes: 40,
    topicId: 'normalization',
  },
]

export const DEMO_IMPORTANT_QUESTIONS = [
  { id: 'q1', question: 'Explain Dijkstra\'s algorithm with example. Find shortest path from given graph.', subject: 'Data Structures', frequency: 8, marks: 10 },
  { id: 'q2', question: 'What is deadlock? Explain Banker\'s algorithm for deadlock avoidance.', subject: 'Operating Systems', frequency: 7, marks: 10 },
  { id: 'q3', question: 'Explain different types of joins with examples. Write SQL queries.', subject: 'DBMS', frequency: 6, marks: 8 },
  { id: 'q4', question: 'Compare TCP and UDP. Explain TCP three-way handshake.', subject: 'Computer Networks', frequency: 5, marks: 8 },
  { id: 'q5', question: 'Write and explain QuickSort algorithm. What is its worst-case time complexity?', subject: 'Data Structures', frequency: 6, marks: 6 },
]

export const DEMO_RECENT_TOPICS = [
  { id: 'rt1', title: 'Binary Search Trees', subject: 'Data Structures', visitedAt: '2024-11-12T16:00:00Z', timeAgo: '2h ago' },
  { id: 'rt2', title: 'Bubble Sort', subject: 'Data Structures', visitedAt: '2024-11-12T13:00:00Z', timeAgo: '5h ago' },
  { id: 'rt3', title: 'Process Scheduling', subject: 'Operating Systems', visitedAt: '2024-11-11T12:00:00Z', timeAgo: '1d ago' },
  { id: 'rt4', title: 'SQL Joins', subject: 'DBMS', visitedAt: '2024-11-10T10:00:00Z', timeAgo: '2d ago' },
  { id: 'rt5', title: 'ER Diagram', subject: 'DBMS', visitedAt: '2024-11-09T08:00:00Z', timeAgo: '3d ago' },
]

// Generate 84 days of study activity (12 weeks) deterministically (zero random numbers)
export const DEMO_STUDY_ACTIVITY: StudyActivity[] = Array.from({ length: 84 }, (_, i) => {
  // Deterministic date calculation starting from fixed anchor
  const year = 2024
  const month = 10 // November (0-indexed)
  const day = 20 - (83 - i)
  const dateObj = new Date(Date.UTC(year, month, day))
  const dateStr = dateObj.toISOString().split('T')[0]
  
  // Deterministic seed based on day index
  const seed = (i * 9301 + 49297) % 233280
  const pseudoRand = seed / 233280.0
  const isWeekend = i % 7 === 0 || i % 7 === 6
  const minutes = isWeekend
    ? (pseudoRand > 0.55 ? Math.floor(pseudoRand * 90) : 0)
    : (pseudoRand > 0.25 ? Math.floor(45 + pseudoRand * 135) : 0)
  const topicsStudied = minutes > 0 ? (1 + (i % 3)) : 0

  return {
    date: dateStr,
    minutes,
    topicsStudied,
  }
})

export const DEMO_DSA_CATEGORIES: DSACategory[] = [
  { id: 'arrays', name: 'Arrays', icon: 'LayoutGrid', color: '#5b7fff', problemCount: 45, solvedCount: 28 },
  { id: 'strings', name: 'Strings', icon: 'Type', color: '#10b981', problemCount: 30, solvedCount: 15 },
  { id: 'linked-list', name: 'Linked List', icon: 'Link2', color: '#f59e0b', problemCount: 25, solvedCount: 18 },
  { id: 'trees', name: 'Trees', icon: 'GitBranch', color: '#8b5cf6', problemCount: 40, solvedCount: 20 },
  { id: 'graphs', name: 'Graphs', icon: 'Network', color: '#ef4444', problemCount: 35, solvedCount: 10 },
  { id: 'dp', name: 'Dynamic Programming', icon: 'Layers', color: '#06b6d4', problemCount: 50, solvedCount: 12 },
  { id: 'sorting', name: 'Sorting', icon: 'ArrowUpDown', color: '#ec4899', problemCount: 15, solvedCount: 14 },
  { id: 'searching', name: 'Searching', icon: 'Search', color: '#14b8a6', problemCount: 12, solvedCount: 10 },
  { id: 'stack-queue', name: 'Stack & Queue', icon: 'Layers2', color: '#f97316', problemCount: 20, solvedCount: 16 },
  { id: 'hashing', name: 'Hashing', icon: 'Hash', color: '#a855f7', problemCount: 18, solvedCount: 8 },
  { id: 'greedy', name: 'Greedy', icon: 'Zap', color: '#eab308', problemCount: 22, solvedCount: 9 },
  { id: 'backtracking', name: 'Backtracking', icon: 'RotateCcw', color: '#6366f1', problemCount: 16, solvedCount: 5 },
]

export const DEMO_CHAT_SESSIONS: ChatSession[] = [
  { id: 's1', title: 'Binary Search Tree Doubts', createdAt: '2024-11-12T16:00:00Z', updatedAt: '2024-11-12T16:00:00Z', messageCount: 8, contextTopicId: 'bst' },
  { id: 's2', title: 'Deadlock Avoidance — Banker\'s Algo', createdAt: '2024-11-11T12:00:00Z', updatedAt: '2024-11-11T12:00:00Z', messageCount: 12, contextTopicId: 'deadlock' },
  { id: 's3', title: 'SQL Joins Confusion', createdAt: '2024-11-10T09:30:00Z', updatedAt: '2024-11-10T09:30:00Z', messageCount: 6 },
]

