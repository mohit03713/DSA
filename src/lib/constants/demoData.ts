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
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    semester: 4,
    description: 'Core data organization, dynamic memory, trees, graphs, sorting, searching, and algorithmic complexity analysis.',
    iconName: 'Binary',
    color: '#5b7fff',
    unitCount: 5,
    topicCount: 42,
    difficulty: 'Hard',
    progress: 68,
    lastStudied: '2024-11-12T16:00:00Z',
  },
  {
    id: 'dip',
    name: 'Digital Image Processing',
    code: 'CS405',
    semester: 4,
    description: '2D signals & systems, spatial and frequency enhancement, image transforms (FFT, DCT, Walsh), restoration models, and compression standards.',
    iconName: 'Image',
    color: '#06b6d4',
    unitCount: 5,
    topicCount: 52,
    difficulty: 'Hard',
    progress: 45,
    lastStudied: '2024-11-16T18:00:00Z',
  },
]

export const DEMO_CONTINUE_LEARNING = [
  {
    id: 't1',
    title: 'Binary Search Trees',
    subject: 'Data Structures & Algorithms',
    subjectId: 'ds',
    unit: 'Unit 4: Trees',
    progress: 65,
    difficulty: 'Medium' as const,
    lastStudied: '2024-11-12T16:00:00Z',
    estimatedMinutes: 25,
    topicId: 'binary-search-tree',
  },
  {
    id: 't2',
    title: 'Image Sampling & Quantization',
    subject: 'Digital Image Processing',
    subjectId: 'dip',
    unit: 'Unit 1: Fundamentals of DIP',
    progress: 40,
    difficulty: 'Hard' as const,
    lastStudied: '2024-11-16T17:00:00Z',
    estimatedMinutes: 35,
    topicId: 'sampling-quantization',
  },
  {
    id: 't3',
    title: 'Dijkstra Shortest Path Algorithm',
    subject: 'Data Structures & Algorithms',
    subjectId: 'ds',
    unit: 'Unit 5: Graphs & Advanced Algorithms',
    progress: 80,
    difficulty: 'Hard' as const,
    lastStudied: '2024-11-10T09:30:00Z',
    estimatedMinutes: 40,
    topicId: 'dijkstra',
  },
  {
    id: 't4',
    title: '2D Spatial Convolution & Filtering',
    subject: 'Digital Image Processing',
    subjectId: 'dip',
    unit: 'Unit 1: Fundamentals of DIP',
    progress: 55,
    difficulty: 'Hard' as const,
    lastStudied: '2024-11-16T15:00:00Z',
    estimatedMinutes: 40,
    topicId: 'linear-circular-convolution-2d',
  },
]

export const DEMO_WEAK_TOPICS = [
  { id: 'w1', topicId: 'dijkstra', title: 'Graph Algorithms (Dijkstra)', subject: 'Data Structures & Algorithms', difficulty: 'Hard' as const, score: 32 },
  { id: 'w2', topicId: 'sampling-quantization', title: 'Image Sampling & Quantization', subject: 'Digital Image Processing', difficulty: 'Hard' as const, score: 35 },
  { id: 'w3', topicId: 'avl-tree', title: 'AVL Trees & Rotations', subject: 'Data Structures & Algorithms', difficulty: 'Hard' as const, score: 42 },
  { id: 'w4', topicId: 'histogram-processing-equalization', title: 'Histogram Equalization Calculation', subject: 'Digital Image Processing', difficulty: 'Hard' as const, score: 38 },
  { id: 'w5', topicId: 'discrete-cosine-transform-dct', title: 'Discrete Cosine Transform (DCT)', subject: 'Digital Image Processing', difficulty: 'Hard' as const, score: 40 },
]

export const DEMO_UPCOMING_EXAMS = [
  { id: 'e1', name: 'Data Structures Mid-Sem', date: '2024-11-25', formattedDate: '25 Nov', daysLeft: 12, subject: 'DS', type: 'Mid-Semester' },
  { id: 'e2', name: 'Digital Image Processing Mid-Sem', date: '2024-11-28', formattedDate: '28 Nov', daysLeft: 15, subject: 'DIP', type: 'Mid-Semester' },
  { id: 'e3', name: 'Data Structures End-Sem', date: '2024-12-10', formattedDate: '10 Dec', daysLeft: 27, subject: 'DS', type: 'End-Semester' },
  { id: 'e4', name: 'Digital Image Processing End-Sem', date: '2024-12-15', formattedDate: '15 Dec', daysLeft: 32, subject: 'DIP', type: 'End-Semester' },
]

export const DEMO_PENDING_LABS = [
  { id: 'l1', labNo: 1, title: 'Lab 1: Basic 1D-Array Operations', subject: 'Data Structures & Algorithms', subjectId: 'ds', dueDate: '2024-11-20', daysLeft: 7, questionsTotal: 7, questionsDone: 7 },
  { id: 'l2', labNo: 1, title: 'DIP Lab 1: Image Sampling & Storage', subject: 'Digital Image Processing', subjectId: 'dip', dueDate: '2024-11-28', daysLeft: 15, questionsTotal: 1, questionsDone: 1 },
  { id: 'l3', labNo: 3, title: 'Lab 3: Linear & Binary Search', subject: 'Data Structures & Algorithms', subjectId: 'ds', dueDate: '2024-11-28', daysLeft: 15, questionsTotal: 7, questionsDone: 5 },
  { id: 'l4', labNo: 2, title: 'DIP Lab 2: 2D Spatial Filtering', subject: 'Digital Image Processing', subjectId: 'dip', dueDate: '2024-12-05', daysLeft: 22, questionsTotal: 1, questionsDone: 0 },
  { id: 'l5', labNo: 5, title: 'Lab 5: Bubble, Merge & Quick Sort', subject: 'Data Structures & Algorithms', subjectId: 'ds', dueDate: '2024-12-10', daysLeft: 27, questionsTotal: 3, questionsDone: 2 },
  { id: 'l6', labNo: 6, title: 'Lab 6: Singly Linked List', subject: 'Data Structures & Algorithms', subjectId: 'ds', dueDate: '2024-12-15', daysLeft: 32, questionsTotal: 3, questionsDone: 1 },
  { id: 'l7', labNo: 10, title: 'Lab 10: Infix to Postfix/Prefix Stack', subject: 'Data Structures & Algorithms', subjectId: 'ds', dueDate: '2024-12-22', daysLeft: 39, questionsTotal: 2, questionsDone: 0 },
]

export const DEMO_AI_RECOMMENDATIONS = [
  {
    id: 'r1',
    title: 'Graph Algorithms — Dijkstra\'s SSSP',
    reason: 'You have an exam in 12 days and this topic appears frequently in university papers (8 times)',
    subject: 'Data Structures & Algorithms',
    priority: 'high' as const,
    estimatedMinutes: 45,
    topicId: 'dijkstra',
  },
  {
    id: 'r2',
    title: 'Discrete Histogram Equalization & CDF Mapping',
    reason: 'High-frequency exam numerical with 10 marks guaranteed in DIP Unit 2',
    subject: 'Digital Image Processing',
    priority: 'high' as const,
    estimatedMinutes: 45,
    topicId: 'histogram-processing-equalization',
  },
  {
    id: 'r3',
    title: 'Infix to Postfix & Prefix Conversion with Stacks',
    reason: 'Essential linear data structure topic tested in both mid-sem exams and coding rounds',
    subject: 'Data Structures & Algorithms',
    priority: 'medium' as const,
    estimatedMinutes: 40,
    topicId: 'stacks-infix-postfix',
  },
  {
    id: 'r4',
    title: 'Image Sampling, Quantization & Memory Formula',
    reason: 'Standard 5-mark numerical calculating spatial memory buffer size for N x M x k bits',
    subject: 'Digital Image Processing',
    priority: 'high' as const,
    estimatedMinutes: 35,
    topicId: 'sampling-quantization',
  },
]

export const DEMO_IMPORTANT_QUESTIONS = [
  { id: 'q1', question: 'Explain Dijkstra\'s algorithm with example. Find shortest path from given graph.', subject: 'Data Structures & Algorithms', frequency: 8, marks: 10 },
  { id: 'q2', question: 'Perform Histogram Equalization on a 3-bit 64x64 image. Calculate CDF and final gray level mapping.', subject: 'Digital Image Processing', frequency: 9, marks: 10 },
  { id: 'q3', question: 'Convert infix expression A+B*C-D/E^F^G to postfix and prefix using stack evaluation.', subject: 'Data Structures & Algorithms', frequency: 7, marks: 8 },
  { id: 'q4', question: 'Explain 2D Spatial Filtering & Smoothing. Apply a 3x3 averaging mask with zero-padding border.', subject: 'Digital Image Processing', frequency: 8, marks: 10 },
  { id: 'q5', question: 'Write and explain QuickSort algorithm. What is its worst-case time complexity and partition choice?', subject: 'Data Structures & Algorithms', frequency: 6, marks: 6 },
  { id: 'q6', question: 'Derive 2D Discrete Cosine Transform (DCT) matrix and explain energy compaction for image compression.', subject: 'Digital Image Processing', frequency: 8, marks: 10 },
]

export const DEMO_RECENT_TOPICS = [
  { id: 'rt1', topicId: 'binary-search-tree', title: 'Binary Search Trees', subject: 'Data Structures & Algorithms', visitedAt: '2024-11-12T16:00:00Z', timeAgo: '2h ago' },
  { id: 'rt2', topicId: 'sampling-quantization', title: 'Image Sampling & Quantization', subject: 'Digital Image Processing', visitedAt: '2024-11-16T18:00:00Z', timeAgo: '3h ago' },
  { id: 'rt3', topicId: 'selection-bubble-insertion', title: 'Bubble & Selection Sort', subject: 'Data Structures & Algorithms', visitedAt: '2024-11-12T13:00:00Z', timeAgo: '5h ago' },
  { id: 'rt4', topicId: 'linear-circular-convolution-2d', title: '2D Spatial Convolution', subject: 'Digital Image Processing', visitedAt: '2024-11-16T15:00:00Z', timeAgo: '1d ago' },
  { id: 'rt5', topicId: 'stacks-infix-postfix', title: 'Infix to Postfix Conversion', subject: 'Data Structures & Algorithms', visitedAt: '2024-11-10T10:00:00Z', timeAgo: '2d ago' },
  { id: 'rt6', topicId: 'color-models-rgb-hsi', title: 'RGB & HSI Color Models', subject: 'Digital Image Processing', visitedAt: '2024-11-15T12:00:00Z', timeAgo: '3d ago' },
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
  { id: 's1', title: 'Binary Search Tree Doubts', createdAt: '2024-11-12T16:00:00Z', updatedAt: '2024-11-12T16:00:00Z', messageCount: 8, contextTopicId: 'binary-search-tree' },
  { id: 's2', title: '2D Spatial Convolution & Masks', createdAt: '2024-11-16T15:00:00Z', updatedAt: '2024-11-16T15:00:00Z', messageCount: 12, contextTopicId: 'linear-circular-convolution-2d' },
  { id: 's3', title: 'Dijkstra SSSP Algorithm', createdAt: '2024-11-10T09:30:00Z', updatedAt: '2024-11-10T09:30:00Z', messageCount: 6, contextTopicId: 'dijkstra' },
  { id: 's4', title: 'Histogram Equalization Calculation', createdAt: '2024-11-16T18:00:00Z', updatedAt: '2024-11-16T18:00:00Z', messageCount: 10, contextTopicId: 'histogram-processing-equalization' },
]
