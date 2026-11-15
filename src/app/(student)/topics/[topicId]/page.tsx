import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, Clock, Tag, Lightbulb, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'
import { ComplexityBadge } from '@/components/shared/ComplexityBadge'
import { BookmarkButton } from '@/components/shared/BookmarkButton'
import { CodeBlock } from '@/components/shared/CodeBlock'

export const metadata: Metadata = { title: 'Topic Detail' }

// Demo content for Bubble Sort
const TOPIC = {
  title: 'Bubble Sort',
  subject: 'Data Structures',
  unit: 'Unit 5: Sorting & Searching',
  difficulty: 'Easy' as const,
  tags: ['Sorting', 'Comparison', 'In-place', 'Stable'],
  estimatedMinutes: 30,
  introduction: `Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they're in the wrong order. The pass through the list is repeated until the list is sorted.`,
  definition: `Bubble Sort is a comparison-based sorting algorithm where each pair of adjacent elements is compared and swapped if they are in the wrong order. This process is repeated until the array is completely sorted.`,
  explanation: `The algorithm gets its name because smaller elements "bubble" to the top of the list (beginning of the array) with each iteration, while larger elements sink to the bottom (end of the array). After each complete pass through the array, the largest unsorted element moves to its correct position.

The basic idea is:
1. Start from the first element and compare it with the next.
2. If the first is greater than the second, swap them.
3. Move to the next pair and repeat.
4. After one pass, the largest element is at the end.
5. Repeat for the remaining unsorted portion.`,
  examples: [
    { title: 'Playing Cards', description: 'Sorting a hand of cards by repeatedly swapping adjacent out-of-order cards.', icon: '🃏' },
    { title: 'Sorting Names', description: 'Alphabetically sorting a list of student names by comparing adjacent names.', icon: '📋' },
    { title: 'Bubbles Rising', description: 'Like air bubbles in water, smaller values rise to the top through repeated comparisons.', icon: '🫧' },
  ],
  terminology: [
    { term: 'Pass', definition: 'One complete traversal through the entire array.' },
    { term: 'Comparison', definition: 'Checking if two adjacent elements are in the correct order.' },
    { term: 'Swap', definition: 'Exchanging the positions of two elements in the array.' },
    { term: 'Stable Sort', definition: 'Elements with equal values maintain their relative order after sorting.' },
    { term: 'In-place Sort', definition: 'Sorting is done within the original array without extra space.' },
  ],
  algorithm: `1. Start with the first element of the array
2. Compare the current element with the next element
3. If current element > next element, swap them
4. Move to the next element and repeat step 2-3
5. After one complete pass, the largest element is at the end
6. Repeat steps 1-5 for n-1 passes (n = array length)
7. Optimization: If no swaps occur in a pass, the array is sorted — stop early`,
  pseudocode: `procedure bubbleSort(A: array of items)
  n = length(A)
  for i = 0 to n-2 do
    swapped = false
    for j = 0 to n-2-i do
      if A[j] > A[j+1] then
        swap(A[j], A[j+1])
        swapped = true
      end if
    end for
    if not swapped then
      break  // Array is already sorted
    end if
  end for
end procedure`,
  cCode: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    int swapped;
    
    for (i = 0; i < n - 1; i++) {
        swapped = 0;
        
        // Last i elements are already in place
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (swapped == 0)
            break;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    printArray(arr, n);
    
    bubbleSort(arr, n);
    
    printf("Sorted array:   ");
    printArray(arr, n);
    
    return 0;
}`,
  cppCode: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        
        // Last i elements are already sorted
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // Early termination if no swaps
        if (!swapped) break;
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    bubbleSort(arr);
    
    cout << "Sorted:   ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
  codeExplanation: [
    { line: 'int swapped;', explanation: 'Flag to track if any swap occurred in the current pass' },
    { line: 'for (i = 0; i < n-1; i++)', explanation: 'Outer loop runs n-1 times (n-1 passes needed)' },
    { line: 'swapped = 0;', explanation: 'Reset swap flag at the start of each pass' },
    { line: 'for (j = 0; j < n-i-1; j++)', explanation: 'Inner loop: last i elements are sorted, skip them' },
    { line: 'if (arr[j] > arr[j+1])', explanation: 'Compare adjacent elements' },
    { line: 'temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;', explanation: 'Swap the elements using a temporary variable' },
    { line: 'swapped = 1;', explanation: 'Set flag to indicate a swap happened' },
    { line: 'if (swapped == 0) break;', explanation: 'Optimization: if no swap in a pass, array is sorted, exit early' },
  ],
  dryRun: [
    { step: 1, state: '[64, 34, 25, 12, 22, 11, 90]', explanation: 'Initial array' },
    { step: 2, state: '[34, 25, 12, 22, 11, 64, 90]', explanation: 'Pass 1: 64 bubbles to position 5' },
    { step: 3, state: '[25, 12, 22, 11, 34, 64, 90]', explanation: 'Pass 2: 34 bubbles to position 4' },
    { step: 4, state: '[12, 22, 11, 25, 34, 64, 90]', explanation: 'Pass 3: 25 bubbles to position 3' },
    { step: 5, state: '[12, 11, 22, 25, 34, 64, 90]', explanation: 'Pass 4: 22 bubbles to position 2' },
    { step: 6, state: '[11, 12, 22, 25, 34, 64, 90]', explanation: 'Pass 5: Array sorted!' },
  ],
  sampleIO: [
    { input: 'n=7\narr = [64, 34, 25, 12, 22, 11, 90]', output: '[11, 12, 22, 25, 34, 64, 90]', explanation: 'Standard case' },
    { input: 'n=5\narr = [1, 2, 3, 4, 5]', output: '[1, 2, 3, 4, 5]', explanation: 'Already sorted — exits in 1 pass (optimized)' },
    { input: 'n=4\narr = [5, 4, 3, 2]', output: '[2, 3, 4, 5]', explanation: 'Reverse sorted — worst case' },
  ],
  advantages: [
    'Simple to understand and implement',
    'Stable sorting algorithm (preserves relative order of equal elements)',
    'In-place sorting (O(1) extra space)',
    'Can detect sorted array in O(n) with optimization',
    'No complex data structures required',
  ],
  disadvantages: [
    'O(n²) time complexity — very slow for large datasets',
    'Not suitable for production use on large data',
    'More swaps compared to Insertion Sort',
    'Performs poorly on reverse sorted arrays',
  ],
  commonMistakes: [
    'Forgetting that inner loop should run up to n-i-1 (not n-1)',
    'Not using the "swapped" optimization flag for early termination',
    'Off-by-one errors in loop bounds',
    'Modifying the array size variable inside the loop',
    'Confusing Bubble Sort with Selection Sort (which makes fewer swaps)',
  ],
  practiceQuestions: [
    'Sort the array [29, 10, 14, 37, 13] using Bubble Sort. Show all passes.',
    'What is the best-case time complexity of Bubble Sort with optimization?',
    'Write Bubble Sort for strings in alphabetical order.',
    'Count the total number of swaps for array [5, 4, 3, 2, 1].',
  ],
  vivaQuestions: [
    'What is Bubble Sort and why is it called so?',
    'What is the time complexity of Bubble Sort in best, average, and worst cases?',
    'Is Bubble Sort stable? Explain.',
    'How can you optimize Bubble Sort? Explain with example.',
    'Compare Bubble Sort and Selection Sort.',
  ],
  relatedTopics: ['Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
}

import { TOPICS_REGISTRY } from '@/lib/constants/topicsData'

export default function TopicDetailPage({ params }: { params: { topicId: string } }) {
  const dynamicTopic = TOPICS_REGISTRY[params.topicId]
  const topicData = dynamicTopic || {
    ...TOPIC,
    title: params.topicId
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  }
  const currentTopic = topicData
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/subjects" className="hover:text-foreground">Subjects</Link>
            <span>/</span>
            <Link href="/subjects/ds" className="hover:text-foreground">{currentTopic.subject}</Link>
            <span>/</span>
            <span className="text-foreground">{currentTopic.unit}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{currentTopic.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <DifficultyBadge difficulty={currentTopic.difficulty} />
            {currentTopic.tags.map(tag => (
              <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> ~{currentTopic.estimatedMinutes} min
            </span>
          </div>
        </div>
        <BookmarkButton itemId={params.topicId} itemType="topic" />
      </div>

      {/* 1. Introduction */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
          Introduction
        </h2>
        <p className="text-muted-foreground leading-relaxed">{currentTopic.introduction}</p>
      </section>

      {/* 2. Definition */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Definition</h2>
        </div>
        <p className="text-foreground leading-relaxed font-medium">{currentTopic.definition}</p>
      </section>

      {/* 3. Detailed Explanation */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
          Detailed Explanation
        </h2>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{currentTopic.explanation}</div>
      </section>

      {/* 4. Real-world Examples */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Real-World Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentTopic.examples.map((ex) => (
            <div key={ex.title} className="p-4 rounded-xl bg-secondary/40 text-center">
              <div className="text-3xl mb-2">{ex.icon}</div>
              <p className="font-semibold text-sm text-foreground mb-1">{ex.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{ex.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Terminology */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Important Terminology</h2>
        <div className="space-y-2">
          {currentTopic.terminology.map((term) => (
            <div key={term.term} className="flex gap-3 p-3 rounded-xl bg-secondary/40">
              <span className="font-mono font-semibold text-primary text-sm w-28 flex-shrink-0">{term.term}</span>
              <span className="text-sm text-muted-foreground">{term.definition}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Algorithm */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Step-by-Step Algorithm</h2>
        <div className="space-y-2">
          {currentTopic.algorithm.split('\n').map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center flex-shrink-0 font-semibold mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground">{step.replace(/^\d+\.\s*/, '')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Pseudocode */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Pseudocode</h2>
        <CodeBlock code={currentTopic.pseudocode} language="text" title="Pseudocode" showLineNumbers={false} />
      </section>

      {/* 8. C Code */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Implementation in C</h2>
        <CodeBlock code={currentTopic.cCode} language="c" title="bubble_sort.c" />
      </section>

      {/* 9. C++ Code */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Implementation in C++</h2>
        <CodeBlock code={currentTopic.cppCode} language="cpp" title="bubble_sort.cpp" />
      </section>

      {/* 10. Line-by-line explanation */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Line-by-Line Explanation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/60">
                <th className="text-left px-4 py-2.5 font-semibold text-foreground rounded-tl-lg w-1/2">Code</th>
                <th className="text-left px-4 py-2.5 font-semibold text-foreground rounded-tr-lg">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {(currentTopic.codeExplanation || TOPIC.codeExplanation).map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-secondary/20' : ''}>
                  <td className="px-4 py-2.5">
                    <code className="text-xs font-mono text-primary">{row.line}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 11. Dry Run */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Dry Run</h2>
        <p className="text-sm text-muted-foreground mb-3">Input: [64, 34, 25, 12, 22, 11, 90]</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/60">
                <th className="text-left px-4 py-2 font-semibold text-foreground">Pass</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Array State</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {(currentTopic.dryRun || TOPIC.dryRun).map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-secondary/20' : ''}>
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{row.step}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.state}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. Sample I/O */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Sample Input / Output</h2>
        <div className="space-y-3">
          {currentTopic.sampleIO.map((io, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border">
              <div className="bg-secondary/60 px-4 py-2 text-xs font-semibold text-muted-foreground">
                Test Case {i + 1} — {io.explanation}
              </div>
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">Input</p>
                  <pre className="text-xs font-mono text-foreground">{io.input}</pre>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">Output</p>
                  <pre className="text-xs font-mono text-primary font-semibold">{io.output}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. Complexity */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Complexity Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Time Complexity</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Best Case:</span><ComplexityBadge value="O(n)" type="time" /></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Average Case:</span><ComplexityBadge value="O(n²)" type="time" /></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Worst Case:</span><ComplexityBadge value="O(n²)" type="time" /></div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Best case O(n) when array is already sorted (with optimization flag). Worst and average cases O(n²) due to nested loops.</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Space Complexity</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Auxiliary Space:</span>
              <ComplexityBadge value="O(1)" type="space" />
            </div>
            <p className="text-xs text-muted-foreground">In-place sorting algorithm. Only uses a constant amount of extra memory (temp variable for swapping).</p>
          </div>
        </div>
      </section>

      {/* 14. Advantages & Disadvantages */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Advantages & Disadvantages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-green-500 mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Advantages
            </h3>
            <ul className="space-y-1.5">
              {currentTopic.advantages.map((adv, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  {adv}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> Disadvantages
            </h3>
            <ul className="space-y-1.5">
              {currentTopic.disadvantages.map((dis, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                  {dis}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 15. Common Mistakes */}
      <section className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          Common Mistakes to Avoid
        </h2>
        <ul className="space-y-2">
          {currentTopic.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-yellow-500 font-semibold flex-shrink-0">⚠</span>
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      {/* 16. Practice & Viva Questions */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Practice & Viva Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Practice Questions</h3>
            <ol className="space-y-2">
              {currentTopic.practiceQuestions.map((q, i) => (
                <li key={i} className="text-sm text-foreground bg-secondary/40 rounded-xl px-4 py-3">
                  <span className="text-primary font-semibold mr-2">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Viva Questions</h3>
            <ol className="space-y-2">
              {currentTopic.vivaQuestions.map((q, i) => (
                <li key={i} className="text-sm text-foreground bg-secondary/40 rounded-xl px-4 py-3">
                  <span className="text-accent font-semibold mr-2">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 17. Related Topics */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Related Topics</h2>
        <div className="flex flex-wrap gap-2">
          {currentTopic.relatedTopics.map((topic) => (
            <Link
              key={topic}
              href={`/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary text-sm text-foreground transition-colors border border-border hover:border-primary/30"
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

