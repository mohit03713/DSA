import type { Subject } from '@/types'

export const SUBJECTS_DATA: Subject[] = [
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
  },
]
