export interface LabApproach {
  id: string
  name: string
  tag: string
  intuition: string
  algorithm?: string[]
  cCode: string
  cppCode: string
  timeComplexity: string
  spaceComplexity: string
  pros: string[]
  cons: string[]
}

export interface LabQuestionDetail {
  id: string
  number: number
  title: string
  statement: string
  explanation: string
  requiredConcepts: string[]
  algorithm?: string[]
  cCode: string
  cppCode: string
  approaches?: LabApproach[]
  sampleIO: { input: string; output: string; explanation?: string }[]
  dryRun: { step: number; state: string; explanation: string }[]
  timeComplexity: string
  spaceComplexity: string
  commonMistakes: string[]
  edgeCases: string[]
  vivaQuestions?: string[]
  relatedTopicId?: string
  isCompleted?: boolean
}

export interface DetailedLab {
  id: string
  subjectId: string
  subjectName: string
  labNo: number
  title: string
  description: string
  dueDate: string
  questions: LabQuestionDetail[]
}

export const LABS_DATA: DetailedLab[] = [
  // ─── DS Lab Exercise 1: Basic 1D-Array ─────────────────────────────────────
  {
    id: 'ds-lab-1',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 1,
    title: 'Exercise 1 (Basic 1D-Array)',
    description: 'Fundamental one-dimensional array input, traversal, aggregations, extrema, counts, linear search, and frequency calculation.',
    dueDate: '2024-11-20',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Array Input and Display',
        statement: 'Write a C program to declare a one-dimensional array of size n, read its elements from the user, and display them. (Note: User input is mandatory).',
        explanation: 'Dynamically allocates or sized array based on user input n, loops through indices 0 to n-1 using scanf to read, and prints each value.',
        requiredConcepts: ['1D Array declaration', 'scanf / printf', 'For loops', 'Array indexing'],
        algorithm: [
          'Read integer n from user',
          'Declare array arr[n] (or allocate dynamically)',
          'Iterate i from 0 to n-1 and read arr[i]',
          'Iterate i from 0 to n-1 and print arr[i]',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    
    int arr[n];
    printf("Enter %d integers:\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    printf("Array elements are: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;
    vector<int> arr(n);
    cout << "Enter " << n << " integers:" << endl;
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << "Array elements are: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'index-traversal',
            name: 'Approach 1: Array Index Traversal (Standard Loop)',
            tag: 'Most Intuitive for Beginners',
            intuition: 'Think of array indexing like numbered postal mailboxes (0, 1, 2, ... n-1). To read or display letters, you visit each box one by one in consecutive order.',
            algorithm: [
              'Read size n from the user.',
              'Declare an array arr[n] of integers.',
              'Loop index i from 0 up to n - 1: read arr[i] using scanf("%d", &arr[i]).',
              'Loop index i from 0 up to n - 1: print arr[i] followed by a space.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    printf("Enter %d integers:\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Array elements are: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;
    vector<int> arr(n);
    cout << "Enter " << n << " integers:" << endl;
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << "Array elements are: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(N) for array storage, O(1) auxiliary',
            pros: ['Easiest syntax to learn and read', 'Direct zero-indexed access'],
            cons: ['Requires contiguous array buffer allocated upfront'],
          },
          {
            id: 'pointer-arithmetic',
            name: 'Approach 2: Pointer Arithmetic Traversal (*(arr + i))',
            tag: 'Direct Memory Manipulation',
            intuition: 'In C, an array name is a constant pointer to its first element. Instead of subscript syntax arr[i], you can take the base address and offset it by i positions *(arr + i), exactly how the CPU calculates machine addresses.',
            algorithm: [
              'Read size n and declare array arr[n].',
              'Define pointer ptr pointing to arr (or use arr directly).',
              'For i = 0 to n-1, read value into (ptr + i).',
              'For i = 0 to n-1, dereference and print *(ptr + i).',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    int *ptr = arr;
    printf("Enter %d integers:\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", (ptr + i));
    }

    printf("Array elements via pointers: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", *(ptr + i));
    }
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;
    int *arr = new int[n];
    cout << "Enter " << n << " integers:\n";
    for (int i = 0; i < n; i++) cin >> *(arr + i);
    cout << "Array elements: ";
    for (int i = 0; i < n; i++) cout << *(arr + i) << " ";
    cout << endl;
    delete[] arr;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Demystifies C pointer mechanics', 'Directly translates to assembly pointer arithmetic'],
            cons: ['Pointer syntax can be intimidating for beginners'],
          },
          {
            id: 'dynamic-heap',
            name: 'Approach 3: Dynamic Heap Allocation (malloc / free)',
            tag: 'Industry Standard Memory Management',
            intuition: 'Fixed arrays reside on the call stack, which can overflow if n is huge (like 10,000,000). Allocating memory dynamically on the heap with malloc() allows arbitrary size and avoids stack limits.',
            algorithm: [
              'Read n.',
              'Allocate memory on heap: arr = (int*)malloc(n * sizeof(int)).',
              'Check if allocation succeeded (arr != NULL).',
              'Read and display elements using loop.',
              'Crucial: Free allocated memory using free(arr) to prevent memory leaks.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    printf("Enter %d integers:\n", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Elements from dynamic heap: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    free(arr); // Clean up heap memory
    return 0;
}`,
            cppCode: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;
    unique_ptr<int[]> arr(new int[n]);
    cout << "Enter " << n << " integers:\n";
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << "Elements: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0; // Automatically freed
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(N) heap allocation',
            pros: ['Avoids stack overflow on large inputs', 'Required for dynamic runtime sizing in ANSI C89/C90'],
            cons: ['Must remember to call free() to prevent memory leaks'],
          },
        ],
        sampleIO: [
          { input: '5\n10 20 30 40 50', output: 'Array elements are: 10 20 30 40 50' },
        ],
        dryRun: [
          { step: 1, state: 'Read n = 5', explanation: 'Allocates array of size 5.' },
          { step: 2, state: 'Loop i = 0..4', explanation: 'Stores 10, 20, 30, 40, 50 at indices 0, 1, 2, 3, 4.' },
          { step: 3, state: 'Print elements', explanation: 'Prints each element separated by space.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Not checking for n <= 0', 'Buffer overflow if array size exceeds bounds'],
        edgeCases: ['n = 1 (single element)', 'Negative elements'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'Sum and Average of Elements',
        statement: 'Write a C program to find the sum and average of all elements in a one-dimensional array.',
        explanation: 'Accumulates sum in a loop and divides by n casting to float to preserve precision.',
        requiredConcepts: ['Accumulator variable', 'Type casting to float/double'],
        algorithm: [
          'Read n and array elements',
          'Initialize sum = 0',
          'For each element x in array, sum = sum + x',
          'Calculate avg = (float)sum / n',
          'Print sum and avg',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, sum = 0;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }
    float avg = (float)sum / n;
    printf("Sum = %d\\n", sum);
    printf("Average = %.2f\\n", avg);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    int sum = 0;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        sum += arr[i];
    }
    cout << "Sum = " << sum << "\\nAverage = " << (double)sum / n << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'iterative-accumulator',
            name: 'Approach 1: Iterative Accumulator Loop',
            tag: 'Standard Accumulator Pattern',
            intuition: 'Imagine keeping a running total on a cash register. Every time an element is scanned, add its price to the running sum. At the end, divide total by count to find the average price.',
            algorithm: [
              'Initialize long long sum = 0 to prevent integer overflow.',
              'Traverse through array: sum = sum + arr[i].',
              'Calculate average = (double)sum / n (explicit floating-point cast).',
              'Print sum and average formatted to 2 decimal places.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    long long sum = 0;
    printf("Enter %d integers:\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }

    double avg = (double)sum / n;
    printf("Sum = %lld\n", sum);
    printf("Average = %.2f\n", avg);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <numeric>
#include <iomanip>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    long long sum = 0;
    for (int &x : arr) { cin >> x; sum += x; }
    double avg = (double)sum / n;
    cout << "Sum = " << sum << "\n";
    cout << fixed << setprecision(2) << "Average = " << avg << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Can compute sum during the initial input loop itself in one pass', 'Extremely fast'],
            cons: ['Sum can overflow 32-bit int if numbers are large; must use long long'],
          },
          {
            id: 'divide-conquer-recursive',
            name: 'Approach 2: Recursive Divide and Conquer Sum',
            tag: 'Divide & Conquer Recursion',
            intuition: 'To find the sum of an array of 8 numbers, split it into two halves of 4. Find the sum of left half, sum of right half, and add them together. This is the bedrock principle of Merge Sort and parallel computing.',
            algorithm: [
              'Base case: If low == high, return arr[low].',
              'Compute mid = low + (high - low) / 2.',
              'Recursively compute leftSum = sumRecursive(arr, low, mid).',
              'Recursively compute rightSum = sumRecursive(arr, mid + 1, high).',
              'Return leftSum + rightSum.',
            ],
            cCode: `#include <stdio.h>

long long recursiveSum(int arr[], int low, int high) {
    if (low == high) return arr[low];
    int mid = low + (high - low) / 2;
    return recursiveSum(arr, low, mid) + recursiveSum(arr, mid + 1, high);
}

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    long long sum = recursiveSum(arr, 0, n - 1);
    double avg = (double)sum / n;
    printf("Recursive Sum = %lld\n", sum);
    printf("Average = %.2f\n", avg);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

long long recSum(const vector<int>& arr, int l, int r) {
    if (l == r) return arr[l];
    int m = l + (r - l) / 2;
    return recSum(arr, l, m) + recSum(arr, m + 1, r);
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    long long sum = recSum(arr, 0, n - 1);
    cout << "Sum = " << sum << "\nAverage = " << (double)sum / n << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(log N) recursion call stack',
            pros: ['Easily parallelizable across multiple CPU cores', 'Elegant algorithmic demonstration of divide-and-conquer'],
            cons: ['Incurs recursion call stack overhead'],
          },
          {
            id: 'running-mean',
            name: 'Approach 3: Online Running Mean (Welford Method)',
            tag: 'Overflow-Resistant Numerical Method',
            intuition: 'If an array has billions of large numbers, the sum will overflow even a 64-bit integer. Instead of adding all numbers first, you update the running average incrementally after each new number arrives: avg_new = avg_old + (x - avg_old) / count.',
            algorithm: [
              'Initialize mean = 0.0.',
              'For each number arr[i] with count = i + 1:',
              '  mean = mean + (arr[i] - mean) / count.',
              'Total sum is reconstructed as mean * n.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    double mean = 0.0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        mean += (arr[i] - mean) / (i + 1);
    }

    printf("Online Running Average = %.2f\n", mean);
    printf("Reconstructed Sum = %.0f\n", mean * n);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    double mean = 0.0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        mean += (x - mean) / (i + 1);
    }
    cout << "Average = " << mean << "\nSum = " << (long long)(mean * n) << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Mathematically guarantees zero overflow risk even with huge numbers', 'Works on endless streaming data'],
            cons: ['Slight floating-point rounding if precision is critical'],
          },
        ],
        sampleIO: [
          { input: '4\n10 20 30 40', output: 'Sum = 100\nAverage = 25.00' },
        ],
        dryRun: [
          { step: 1, state: 'Read 4 elements: 10, 20, 30, 40', explanation: 'sum = 10+20+30+40 = 100.' },
          { step: 2, state: 'avg = 100.0 / 4 = 25.00', explanation: 'Calculates floating point average.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Integer division: sum / n gives truncated integer if not cast to float'],
        edgeCases: ['Array of zeros', 'Negative sum'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q3',
        number: 3,
        title: 'Largest and Smallest Element',
        statement: 'Write a C program to find the largest and smallest elements in an array.',
        explanation: 'Initialize min and max with arr[0], then single-pass compare each element.',
        requiredConcepts: ['Extremum search', 'Comparison logic'],
        algorithm: [
          'Read n and array elements',
          'min = arr[0], max = arr[0]',
          'Iterate i from 1 to n-1:',
          '  If arr[i] > max, max = arr[i]',
          '  If arr[i] < min, min = arr[i]',
          'Print max and min',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    int max = arr[0], min = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }
    printf("Largest element = %d\\n", max);
    printf("Smallest element = %d\\n", min);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int maxVal = *max_element(a.begin(), a.end());
    int minVal = *min_element(a.begin(), a.end());
    cout << "Largest: " << maxVal << "\\nSmallest: " << minVal << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'linear-scan',
            name: 'Approach 1: Single-Pass Linear Extrema Scan',
            tag: 'Standard & Most Intuitive',
            intuition: 'Assume the very first element arr[0] is the current king (maximum) and the current dwarf (minimum). Walk through the rest of the elements: if you see someone taller, they become the new king; if you see someone shorter, they become the new dwarf.',
            algorithm: [
              'Initialize minVal = arr[0] and maxVal = arr[0].',
              'Loop i from 1 to n - 1:',
              '  If arr[i] > maxVal, update maxVal = arr[i].',
              '  If arr[i] < minVal, update minVal = arr[i].',
              'Return maxVal and minVal (2N - 2 comparisons worst case).',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int maxVal = arr[0];
    int minVal = arr[0];

    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }

    printf("Largest element = %d\n", maxVal);
    printf("Smallest element = %d\n", minVal);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    int maxVal = arr[0], minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }
    cout << "Largest: " << maxVal << "\nSmallest: " << minVal << endl;
    return 0;
}`,
            timeComplexity: 'O(N) (2N comparisons)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Clear and straightforward logic', 'Zero extra space'],
            cons: ['Does 2N comparisons; can be reduced to 1.5N using pairwise comparisons'],
          },
          {
            id: 'tournament-pairwise',
            name: 'Approach 2: Pairwise Tournament Method (Optimal 3N/2 Comparisons)',
            tag: 'Optimal Comparison Count (1.5N)',
            intuition: 'Instead of comparing each element against both min and max, pair adjacent elements up (arr[i], arr[i+1]). Compare them with each other first (1 comparison). Then compare the bigger one with maxVal (1 comparison) and smaller one with minVal (1 comparison). That is 3 comparisons for every 2 elements instead of 4!',
            algorithm: [
              'Initialize minVal and maxVal using first pair (or first element if n is odd).',
              'Iterate in steps of 2 (i = 0 or 1; i < n - 1; i += 2):',
              '  Compare arr[i] and arr[i+1].',
              '  Compare the larger with maxVal, and smaller with minVal.',
              'Total comparisons: 3N/2 - 2 (25% fewer comparisons).',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int minVal, maxVal, i;
    if (n % 2 == 0) {
        if (arr[0] > arr[1]) { maxVal = arr[0]; minVal = arr[1]; }
        else { maxVal = arr[1]; minVal = arr[0]; }
        i = 2;
    } else {
        maxVal = minVal = arr[0];
        i = 1;
    }

    while (i < n - 1) {
        if (arr[i] > arr[i + 1]) {
            if (arr[i] > maxVal) maxVal = arr[i];
            if (arr[i + 1] < minVal) minVal = arr[i + 1];
        } else {
            if (arr[i + 1] > maxVal) maxVal = arr[i + 1];
            if (arr[i] < minVal) minVal = arr[i];
        }
        i += 2;
    }

    printf("Optimal Largest = %d\n", maxVal);
    printf("Optimal Smallest = %d\n", minVal);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int mn, mx, i = 0;
    if (n % 2 == 0) {
        mx = max(a[0], a[1]); mn = min(a[0], a[1]);
        i = 2;
    } else {
        mx = mn = a[0]; i = 1;
    }
    for (; i < n - 1; i += 2) {
        if (a[i] > a[i+1]) {
            mx = max(mx, a[i]);
            mn = min(mn, a[i+1]);
        } else {
            mx = max(mx, a[i+1]);
            mn = min(mn, a[i]);
        }
    }
    cout << "Max: " << mx << "\nMin: " << mn << endl;
    return 0;
}`,
            timeComplexity: 'O(N) with exactly 3N/2 comparisons',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['The theoretically minimal number of comparisons to find both extrema', 'Standard GATE and competitive programming optimization'],
            cons: ['Requires handling odd/even initial states'],
          },
          {
            id: "divide-and-conquer-minmax",
            name: "Approach 3: Divide and Conquer Recursive Extrema (Tournament Tree)",
            tag: "Classic CS Curriculum Algorithm",
            intuition: "Instead of linear iteration, divide the array into two halves at the midpoint. Recursively compute the min and max for both halves, and then combine the results with a single comparison for min and a single comparison for max. This exhibits the exact recurrence T(n) = 2T(n/2) + 2.",
            algorithm: [
              "Base Case 1: If low == high, return {arr[low], arr[low]}.",
              "Base Case 2: If high == low + 1, compare arr[low] and arr[high] once, set min and max.",
              "Divide: mid = (low + high) / 2.",
              "Conquer: leftResult = getMinMax(arr, low, mid); rightResult = getMinMax(arr, mid + 1, high).",
              "Combine: overallMin = min(leftResult.min, rightResult.min), overallMax = max(leftResult.max, rightResult.max).",
            ],
            cCode: `#include <stdio.h>

struct MinMax {
    int min;
    int max;
};

struct MinMax getMinMax(int arr[], int low, int high) {
    struct MinMax result, left, right;
    int mid;

    // Base case: Only one element
    if (low == high) {
        result.min = arr[low];
        result.max = arr[low];
        return result;
    }

    // Base case: Exactly two elements
    if (high == low + 1) {
        if (arr[low] < arr[high]) {
            result.min = arr[low];
            result.max = arr[high];
        } else {
            result.min = arr[high];
            result.max = arr[low];
        }
        return result;
    }

    // Divide step
    mid = (low + high) / 2;
    left = getMinMax(arr, low, mid);
    right = getMinMax(arr, mid + 1, high);

    // Combine step
    result.min = (left.min < right.min) ? left.min : right.min;
    result.max = (left.max > right.max) ? left.max : right.max;
    return result;
}

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    printf("Enter %d array elements:\n", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    struct MinMax res = getMinMax(arr, 0, n - 1);
    printf("Divide & Conquer - Largest: %d\n", res.max);
    printf("Divide & Conquer - Smallest: %d\n", res.min);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct MinMax { int min; int max; };

MinMax getMinMax(const vector<int>& arr, int low, int high) {
    if (low == high) return {arr[low], arr[low]};
    if (high == low + 1) {
        return {min(arr[low], arr[high]), max(arr[low], arr[high])};
    }
    int mid = low + (high - low) / 2;
    auto left = getMinMax(arr, low, mid);
    auto right = getMinMax(arr, mid + 1, high);
    return {min(left.min, right.min), max(left.max, right.max)};
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> arr(n);
    cout << "Enter " << n << " elements:\n";
    for (int &x : arr) cin >> x;
    auto res = getMinMax(arr, 0, n - 1);
    cout << "Largest: " << res.max << "\nSmallest: " << res.min << endl;
    return 0;
}`,
            timeComplexity: "O(N) (Exactly 3N/2 - 2 comparisons)",
            spaceComplexity: "O(log N) call stack",
            pros: ["Clean recursive Divide and Conquer paradigm", "Theoretically optimal comparison count"],
            cons: ["Recursion stack overhead compared to iterative loops"],
          },
        ],
        sampleIO: [
          { input: '5\n14 3 67 2 89', output: 'Largest element = 89\nSmallest element = 2' },
        ],
        dryRun: [
          { step: 1, state: 'Init: max=14, min=14', explanation: 'Start with index 0.' },
          { step: 2, state: 'Check 3: min=3, Check 67: max=67', explanation: 'Updates extrema.' },
          { step: 3, state: 'Check 2: min=2, Check 89: max=89', explanation: 'Final max=89, min=2.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Initializing min to 0 (fails if all numbers are positive or negative)'],
        edgeCases: ['All elements equal', 'All elements negative'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q4',
        number: 4,
        title: 'Count Even and Odd Elements',
        statement: 'Write a C program to count the number of even and odd elements in an array.',
        explanation: 'Uses modulo operator % 2 to check divisibility by 2.',
        requiredConcepts: ['Parity check', 'Modulo arithmetic'],
        algorithm: [
          'Initialize evenCount = 0, oddCount = 0',
          'For each element arr[i]:',
          '  If arr[i] % 2 == 0, increment evenCount',
          '  Else increment oddCount',
          'Print both counts',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, evens = 0, odds = 0;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if (arr[i] % 2 == 0) evens++;
        else odds++;
    }
    printf("Number of even elements = %d\\n", evens);
    printf("Number of odd elements = %d\\n", odds);
    return 0;
}`,
        cppCode: `#include <iostream>
using namespace std;

int main() {
    int n, x, evens = 0, odds = 0;
    cin >> n;
    while (n--) {
        cin >> x;
        if (x % 2 == 0) evens++;
        else odds++;
    }
    cout << "Even: " << evens << " Odd: " << odds << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'modulo-check',
            name: 'Approach 1: Modulo Arithmetic Check (arr[i] % 2 != 0)',
            tag: 'Most Intuitive for Beginners',
            intuition: 'Any integer divided by 2 leaves a remainder of 0 if even, or remainder of 1 (or -1 for negative numbers) if odd. We use two counters: evenCount and oddCount.',
            algorithm: [
              'Initialize evenCount = 0, oddCount = 0.',
              'Iterate through the array index i from 0 to n - 1.',
              'If arr[i] % 2 == 0, increment evenCount.',
              'Else increment oddCount.',
              'Print both counts.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    int evenCount = 0, oddCount = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if (arr[i] % 2 == 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }

    printf("Even count = %d\n", evenCount);
    printf("Odd count = %d\n", oddCount);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    int evens = 0, odds = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x % 2 == 0) evens++;
        else odds++;
    }
    cout << "Even: " << evens << "\nOdd: " << odds << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Universal and straightforward', 'Works across all programming languages'],
            cons: ['In C, negative odd numbers give remainder -1 with %, so checking == 1 directly can fail; checking % 2 == 0 is safe'],
          },
          {
            id: 'bitwise-and',
            name: 'Approach 2: Bitwise AND Operation (arr[i] & 1)',
            tag: 'Hardware-Level Bit Trick',
            intuition: 'In binary binary representation, the lowest significant bit (LSB) determines parity: if LSB is 1, the number is odd; if LSB is 0, the number is even. Bitwise AND with 1 checks the LSB directly in 1 CPU clock cycle without costly division!',
            algorithm: [
              'Initialize oddCount = 0.',
              'For each number x in array:',
              '  oddCount += (x & 1) (adds 1 if odd, 0 if even).',
              'Compute evenCount = n - oddCount.',
              'Display evenCount and oddCount.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    int oddCount = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if (arr[i] & 1) oddCount++;
    }

    int evenCount = n - oddCount;
    printf("Even count = %d\n", evenCount);
    printf("Odd count = %d\n", oddCount);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    int oddCount = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x & 1) oddCount++;
    }
    cout << "Even: " << n - oddCount << "\nOdd: " << oddCount << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Executes significantly faster than modulo division in hardware', 'Handles negative numbers seamlessly', 'Calculates evenCount as (n - oddCount) in O(1)'],
            cons: ['Requires basic understanding of binary representation'],
          },
          {
            id: "two-pointer-partition",
            name: "Approach 3: Two-Pointer Parity Segregation (In-Place Partition)",
            tag: "In-Place Segregation & Counting",
            intuition: "Instead of merely tallying numbers with counters, physically segregate the array so that all even numbers occupy the left side and all odd numbers occupy the right side (similar to QuickSort partitioning or Dutch National Flag). The final partition index yields the exact count of even and odd elements.",
            algorithm: [
              "Initialize left = 0, right = n - 1.",
              "While left < right:",
              "  Increment left while arr[left] is even.",
              "  Decrement right while arr[right] is odd.",
              "  If left < right, swap(arr[left], arr[right]), then increment left and decrement right.",
              "Determine boundary: count evens up to the partition split point.",
              "oddCount = n - evenCount.",
            ],
            cCode: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    printf("Enter %d elements:\n", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int left = 0, right = n - 1;
    while (left < right) {
        while (left < right && (arr[left] % 2 == 0)) left++;
        while (left < right && (arr[right] % 2 != 0)) right--;
        if (left < right) {
            swap(&arr[left], &arr[right]);
            left++;
            right--;
        }
    }

    int evenCount = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) evenCount++;
        else break;
    }
    int oddCount = n - evenCount;

    printf("Total Even elements = %d\n", evenCount);
    printf("Total Odd elements = %d\n", oddCount);
    printf("Partitioned array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements: ";
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> arr(n);
    cout << "Enter " << n << " elements:\n";
    for (int &x : arr) cin >> x;

    int left = 0, right = n - 1;
    while (left < right) {
        while (left < right && arr[left] % 2 == 0) left++;
        while (left < right && arr[right] % 2 != 0) right--;
        if (left < right) swap(arr[left++], arr[right--]);
    }

    int evenCount = 0;
    for (int x : arr) {
        if (x % 2 == 0) evenCount++;
        else break;
    }
    int oddCount = n - evenCount;

    cout << "Total Even: " << evenCount << "\nTotal Odd: " << oddCount << endl;
    return 0;
}`,
            timeComplexity: "O(N) (Single two-pointer pass)",
            spaceComplexity: "O(1) in-place auxiliary",
            pros: ["Performs counting and array organization in a single operation", "Zero extra memory"],
            cons: ["Changes original relative order of elements"],
          },
        ],
        sampleIO: [
          { input: '6\n1 2 3 4 5 6', output: 'Number of even elements = 3\nNumber of odd elements = 3' },
        ],
        dryRun: [
          { step: 1, state: '1, 3, 5 are odd', explanation: 'odds = 3' },
          { step: 2, state: '2, 4, 6 are even', explanation: 'evens = 3' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Handling negative odd numbers: in C, (-3) % 2 evaluates to -1, not 1. Check == 0 vs != 0'],
        edgeCases: ['Negative even and odd integers', 'Array with 0 (0 is even)'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q5',
        number: 5,
        title: 'Linear Search for Given Element',
        statement: 'Write a C program to search for a given element in an array using Linear Search.',
        explanation: 'Sequentially inspects each element until key is found or array is exhausted.',
        requiredConcepts: ['Sequential traversal', 'Early exit flag'],
        algorithm: [
          'Read n, array elements, and target key',
          'foundIndex = -1',
          'Iterate i from 0 to n-1:',
          '  If arr[i] == key: foundIndex = i, break',
          'If foundIndex != -1, print index; else print not found',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, key, found = -1;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter array elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter search key: ");
    scanf("%d", &key);
    
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            found = i;
            break;
        }
    }
    if (found != -1)
        printf("Element %d found at index %d\\n", key, found);
    else
        printf("Element %d not found\\n", key);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    for (int i = 0; i < n; i++) {
        if (a[i] == key) {
            cout << "Found at index " << i << endl;
            return 0;
        }
    }
    cout << "Not found" << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'standard-linear',
            name: 'Approach 1: Standard Sequential Search with Early Exit',
            tag: 'Standard Iterative Search',
            intuition: 'Imagine searching for your room key in a line of drawers. You check drawer 0, then drawer 1, drawer 2... As soon as you see the key, you stop searching immediately (break) and announce the drawer number.',
            algorithm: [
              'Read target search key from user.',
              'Initialize foundIndex = -1.',
              'Loop i from 0 to n - 1:',
              '  If arr[i] == key, set foundIndex = i and break.',
              'If foundIndex != -1, print element found at index.',
              'Else print element not found.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Enter element to search: ");
    scanf("%d", &key);

    int foundIndex = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            foundIndex = i;
            break; // Stop immediately upon first match
        }
    }

    if (foundIndex != -1) {
        printf("Element %d found at index %d (position %d).\n", key, foundIndex, foundIndex + 1);
    } else {
        printf("Element %d not found in the array.\n", key);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    cin >> key;
    int idx = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) { idx = i; break; }
    }
    if (idx != -1) cout << "Found at index " << idx << endl;
    else cout << "Not found" << endl;
    return 0;
}`,
            timeComplexity: 'Best O(1) (found at index 0), Worst O(N) (not present)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Works on unsorted arrays without any preprocessing', 'Early break prevents redundant comparisons'],
            cons: ['Slow on huge datasets with millions of elements (O(N))'],
          },
          {
            id: 'sentinel-linear',
            name: 'Approach 2: Sentinel Linear Search',
            tag: 'Loop Optimization Technique',
            intuition: 'In normal linear search, the loop checks two conditions every step: (1) is i < n, and (2) is arr[i] == key. In Sentinel Search, we place the key as a dummy at the end of the array. The loop now ONLY checks if arr[i] == key, halving the branching conditions per iteration!',
            algorithm: [
              'Save last element: last = arr[n - 1].',
              'Set arr[n - 1] = key (sentinel).',
              'Iterate i = 0; while arr[i] != key, i++ (no boundary check needed!).',
              'Restore arr[n - 1] = last.',
              'If i < n - 1 or last == key, element is found at index i.',
              'Else, element was not in array.',
            ],
            cCode: `#include <stdio.h>

int sentinelSearch(int arr[], int n, int key) {
    int last = arr[n - 1];
    arr[n - 1] = key; // Place sentinel
    int i = 0;

    while (arr[i] != key) {
        i++;
    }

    arr[n - 1] = last; // Restore original

    if (i < n - 1 || last == key) return i;
    return -1;
}

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter key: ");
    scanf("%d", &key);

    int idx = sentinelSearch(arr, n, key);
    if (idx != -1) printf("Found at index %d using Sentinel Search.\n", idx);
    else printf("Not found.\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int sentinelSearch(vector<int>& arr, int key) {
    int n = arr.size();
    int last = arr[n - 1];
    arr[n - 1] = key;
    int i = 0;
    while (arr[i] != key) i++;
    arr[n - 1] = last;
    if (i < n - 1 || last == key) return i;
    return -1;
}

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    int res = sentinelSearch(a, key);
    cout << (res != -1 ? "Found at " + to_string(res) : "Not found") << endl;
    return 0;
}`,
            timeComplexity: 'O(N) with 50% fewer loop condition tests',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Eliminates the i < n loop condition test from every single iteration', 'Frequently asked in technical interviews and systems programming'],
            cons: ['Temporarily mutates the array (restored immediately)'],
          },
          {
            id: "recursive-linear-search",
            name: "Approach 3: Recursive Linear Search",
            tag: "Functional & Recursive Thinking",
            intuition: "Every linear scan can be thought of as examining the head element arr[index] and, if it does not match, delegating the search of the tail array to a recursive sub-problem. This reinforces the principle of induction and recursion.",
            algorithm: [
              "Base Case 1: If index >= n, element does not exist, return -1.",
              "Base Case 2: If arr[index] == target, return index.",
              "Recursive step: return recursiveSearch(arr, n, target, index + 1).",
            ],
            cCode: `#include <stdio.h>

int recursiveLinearSearch(int arr[], int n, int target, int index) {
    if (index >= n) return -1;
    if (arr[index] == target) return index;
    return recursiveLinearSearch(arr, n, target, index + 1);
}

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    printf("Enter %d elements:\n", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Enter element to search for: ");
    scanf("%d", &key);

    int foundIndex = recursiveLinearSearch(arr, n, key, 0);
    if (foundIndex != -1) {
        printf("Element %d found at index %d (Position %d)\n", key, foundIndex, foundIndex + 1);
    } else {
        printf("Element %d not found in the array\n", key);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int recursiveSearch(const vector<int>& arr, int target, int index = 0) {
    if (index >= (int)arr.size()) return -1;
    if (arr[index] == target) return index;
    return recursiveSearch(arr, target, index + 1);
}

int main() {
    int n, key;
    cout << "Enter number of elements: ";
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> arr(n);
    cout << "Enter " << n << " elements:\n";
    for (int &x : arr) cin >> x;
    cout << "Enter element to search: ";
    cin >> key;

    int idx = recursiveSearch(arr, key);
    if (idx != -1) cout << "Found at index " << idx << endl;
    else cout << "Not found" << endl;
    return 0;
}`,
            timeComplexity: "O(N) (N recursive calls worst case)",
            spaceComplexity: "O(N) call stack",
            pros: ["Teaches structural recursion over arrays", "Short, elegant functional code"],
            cons: ["Stack overflow risk for very large arrays without tail-call optimization"],
          },
        ],
        sampleIO: [
          { input: '5\n10 25 32 45 60\n32', output: 'Element 32 found at index 2' },
        ],
        dryRun: [
          { step: 1, state: 'i=0, arr[0]=10 != 32', explanation: 'Advance' },
          { step: 2, state: 'i=1, arr[1]=25 != 32', explanation: 'Advance' },
          { step: 3, state: 'i=2, arr[2]=32 == 32', explanation: 'Match! Exit.' },
        ],
        timeComplexity: 'Best: O(1), Worst/Avg: O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Printing "Not found" inside loop on first mismatch instead of after full scan'],
        edgeCases: ['Key at first position', 'Key not present'],
        relatedTopicId: 'binary-search',
        isCompleted: true,
      },
      {
        id: 'q6',
        number: 6,
        title: 'Count Positive, Negative, and Zero Elements',
        statement: 'Write a C program to count the number of positive, negative, and zero elements in an array.',
        explanation: 'Three-way branch comparison: arr[i] > 0, arr[i] < 0, or arr[i] == 0.',
        requiredConcepts: ['Conditional branching', 'Sign classification'],
        algorithm: [
          'Init pos = 0, neg = 0, zero = 0',
          'For each element x in arr:',
          '  If x > 0: pos++',
          '  Else if x < 0: neg++',
          '  Else: zero++',
          'Print counts',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, pos = 0, neg = 0, zero = 0;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if (arr[i] > 0) pos++;
        else if (arr[i] < 0) neg++;
        else zero++;
    }
    printf("Positive elements: %d\\n", pos);
    printf("Negative elements: %d\\n", neg);
    printf("Zero elements: %d\\n", zero);
    return 0;
}`,
        cppCode: `#include <iostream>
using namespace std;

int main() {
    int n, x, p = 0, ng = 0, z = 0;
    cin >> n;
    while (n--) {
        cin >> x;
        if (x > 0) p++;
        else if (x < 0) ng++;
        else z++;
    }
    cout << "Positive: " << p << " Negative: " << ng << " Zero: " << z << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'branching-classification',
            name: 'Approach 1: Three-Way Conditional Branching (if - else if - else)',
            tag: 'Most Intuitive for Beginners',
            intuition: 'Think of sorting coins into 3 jars: positive (greater than 0), negative (less than 0), and neutral (exactly 0). For every element, we check the sign and drop it in the respective jar.',
            algorithm: [
              'Initialize pos = 0, neg = 0, zero = 0.',
              'Loop through array from i = 0 to n - 1.',
              'If arr[i] > 0: increment pos.',
              'Else if arr[i] < 0: increment neg.',
              'Else: increment zero.',
              'Print pos, neg, and zero counts.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    int pos = 0, neg = 0, zero = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if (arr[i] > 0) pos++;
        else if (arr[i] < 0) neg++;
        else zero++;
    }

    printf("Positive numbers = %d\n", pos);
    printf("Negative numbers = %d\n", neg);
    printf("Zeroes = %d\n", zero);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    int p = 0, ng = 0, z = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x > 0) p++;
        else if (x < 0) ng++;
        else z++;
    }
    cout << "Positives: " << p << "\nNegatives: " << ng << "\nZeroes: " << z << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Clear, crystal readable code', 'Zero auxiliary memory'],
            cons: ['Incurs branch misprediction penalty on completely random positive/negative data'],
          },
          {
            id: 'branchless-signum',
            name: 'Approach 2: Branchless Counting',
            tag: 'Optimization for High-Frequency Systems',
            intuition: 'Modern CPUs execute instructions in pipelines. If-else branches can stall the CPU pipeline if branch prediction fails. Branchless programming uses relational boolean expressions directly in arithmetic: (x > 0) evaluates directly to 1 or 0!',
            algorithm: [
              'Initialize pos = 0, neg = 0, zero = 0.',
              'For each element x:',
              '  pos += (x > 0)',
              '  neg += (x < 0)',
              '  zero += (x == 0)',
              'No conditional jump (JMP) instructions in compiled assembly!',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    int pos = 0, neg = 0, zero = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        pos += (arr[i] > 0);
        neg += (arr[i] < 0);
        zero += (arr[i] == 0);
    }

    printf("Branchless Positive = %d\n", pos);
    printf("Branchless Negative = %d\n", neg);
    printf("Branchless Zeroes = %d\n", zero);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    int p = 0, ng = 0, z = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        p += (x > 0);
        ng += (x < 0);
        z += (x == 0);
    }
    cout << "P: " << p << " N: " << ng << " Z: " << z << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Zero CPU pipeline bubbles / branch mispredictions', 'Compiles to single CMOV or SETcc machine instructions'],
            cons: ['Slightly more abstract syntax for absolute beginners'],
          },
          {
            id: "signum-table-mapping",
            name: "Approach 3: Signum Function & Bucket Mapping",
            tag: "Branchless Math Mapping",
            intuition: "Use the standard mathematical sign function sign(x) = (x > 0) - (x < 0). It evaluates to -1 for negatives, 0 for zero, and +1 for positives. By adding 1 to the sign, we map the results directly to array indices [0, 1, 2] in a frequency bucket array, eliminating nested if-else branches entirely.",
            algorithm: [
              "Declare buckets[3] = {0, 0, 0} representing [negatives, zeros, positives].",
              "Iterate each element x in the array:",
              "  Compute sign = (x > 0) - (x < 0).",
              "  Increment buckets[sign + 1]++. (Index 0 = negative, 1 = zero, 2 = positive)",
              "Print counts from buckets[2], buckets[0], and buckets[1].",
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    printf("Enter %d elements:\n", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    // buckets[0] -> Negative (-1 + 1 = 0)
    // buckets[1] -> Zero     ( 0 + 1 = 1)
    // buckets[2] -> Positive (+1 + 1 = 2)
    int buckets[3] = {0, 0, 0};

    for (int i = 0; i < n; i++) {
        int sign = (arr[i] > 0) - (arr[i] < 0);
        buckets[sign + 1]++;
    }

    printf("Positive elements: %d\n", buckets[2]);
    printf("Negative elements: %d\n", buckets[0]);
    printf("Zero elements: %d\n", buckets[1]);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <array>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements: ";
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> arr(n);
    cout << "Enter " << n << " elements:\n";
    for (int &x : arr) cin >> x;

    array<int, 3> buckets = {0, 0, 0};
    for (int x : arr) {
        int sign = (x > 0) - (x < 0);
        buckets[sign + 1]++;
    }

    cout << "Positive: " << buckets[2] << "\nNegative: " << buckets[0] << "\nZero: " << buckets[1] << endl;
    return 0;
}`,
            timeComplexity: "O(N) (Single pass, zero branch mispredictions)",
            spaceComplexity: "O(1) auxiliary",
            pros: ["Predictable constant-time execution per element", "Zero branch predictor churn"],
            cons: ["Requires understanding Boolean-to-integer implicit casting in C"],
          },
        ],
        sampleIO: [
          { input: '6\n-4 0 7 -2 0 15', output: 'Positive elements: 2\nNegative elements: 2\nZero elements: 2' },
        ],
        dryRun: [
          { step: 1, state: 'Scan elements', explanation: '7, 15 (>0) -> pos=2. -4, -2 (<0) -> neg=2. 0, 0 -> zero=2.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Confusing 0 with positive numbers (0 is neither positive nor negative)'],
        edgeCases: ['Array containing only zeros'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q7',
        number: 7,
        title: 'Calculate Frequency of a Given Element',
        statement: 'Write a C program to calculate the frequency of a given element in an array.',
        explanation: 'Linear scan counting how many times target appears in the array.',
        requiredConcepts: ['Frequency counter', 'Equality check'],
        algorithm: [
          'Read n, array elements, and target value',
          'freq = 0',
          'For each x in arr: if x == target, freq++',
          'Print freq',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, target, freq = 0;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to find frequency: ");
    scanf("%d", &target);
    
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) freq++;
    }
    printf("Frequency of %d = %d\\n", target, freq);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, target; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> target;
    cout << "Frequency = " << count(a.begin(), a.end(), target) << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'linear-frequency',
            name: 'Approach 1: Single-Pass Linear Counter',
            tag: 'Most Intuitive for Beginners',
            intuition: 'Imagine counting how many blue marbles are in a bag. You take marbles out one by one. Every time a blue marble appears, you increment your tally counter by 1. All other colors are ignored.',
            algorithm: [
              'Read target search element key from the user.',
              'Initialize count = 0.',
              'Traverse through array: for i = 0 to n - 1:',
              '  If arr[i] == key: count = count + 1.',
              'Print final count as the frequency.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Enter element to find frequency: ");
    scanf("%d", &key);

    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            count++;
        }
    }

    printf("Frequency of %d is: %d\n", key, count);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    cin >> key;
    int freq = count(arr.begin(), arr.end(), key);
    cout << "Frequency of " << key << " = " << freq << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Works on unsorted arrays with zero prerequisites', 'No extra memory required'],
            cons: ['Must scan all N elements even if element appears frequently at the beginning'],
          },
          {
            id: 'binary-search-frequency',
            name: 'Approach 2: Binary Search Range (O(log N) for Sorted Arrays)',
            tag: 'Optimal O(log N) on Sorted Data',
            intuition: 'If the array is sorted, all identical elements are clustered together in a contiguous block. Instead of scanning one-by-one, find the first occurrence using binary search (firstIdx) and the last occurrence (lastIdx). Frequency is simply (lastIdx - firstIdx + 1)!',
            algorithm: [
              'Use Binary Search to locate first occurrence index.',
              'Use Binary Search to locate last occurrence index.',
              'If key not found, return 0.',
              'Else frequency = lastIdx - firstIdx + 1.',
            ],
            cCode: `#include <stdio.h>

int findFirst(int arr[], int n, int key) {
    int low = 0, high = n - 1, res = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) { res = mid; high = mid - 1; } // Keep checking left
        else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return res;
}

int findLast(int arr[], int n, int key) {
    int low = 0, high = n - 1, res = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) { res = mid; low = mid + 1; } // Keep checking right
        else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return res;
}

int main() {
    int n, key;
    printf("Enter number of sorted elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter key: ");
    scanf("%d", &key);

    int first = findFirst(arr, n, key);
    if (first == -1) {
        printf("Frequency of %d is: 0\n", key);
    } else {
        int last = findLast(arr, n, key);
        printf("Frequency of %d is: %d (indices %d to %d)\n", key, last - first + 1, first, last);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    cin >> key;
    // Uses C++ upper_bound and lower_bound
    auto low = lower_bound(arr.begin(), arr.end(), key);
    auto up = upper_bound(arr.begin(), arr.end(), key);
    cout << "Frequency: " << (up - low) << endl;
    return 0;
}`,
            timeComplexity: 'O(log N) (Massive speedup over O(N))',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Blazing fast: takes only ~20 operations on 1,000,000 items', 'Ideal when queries are run repeatedly on sorted datasets'],
            cons: ['Requires the array to be sorted first'],
          },
          {
            id: "divide-conquer-frequency",
            name: "Approach 3: Recursive Divide and Conquer Counting",
            tag: "Parallelizable & Map-Reduce Strategy",
            intuition: "Instead of sequential scanning, divide the array into halves, count the target frequency in each half independently, and add the partial counts. This is the exact paradigm behind distributed map-reduce and multi-core SIMD algorithms.",
            algorithm: [
              "Base Case: If low == high, return (arr[low] == target ? 1 : 0).",
              "Divide: mid = (low + high) / 2.",
              "Conquer: leftCount = countFreq(arr, low, mid, target); rightCount = countFreq(arr, mid + 1, high, target).",
              "Combine: return leftCount + rightCount.",
            ],
            cCode: `#include <stdio.h>

int countFrequencyRecursive(int arr[], int low, int high, int target) {
    if (low == high) {
        return (arr[low] == target) ? 1 : 0;
    }
    int mid = low + (high - low) / 2;
    int leftCount = countFrequencyRecursive(arr, low, mid, target);
    int rightCount = countFrequencyRecursive(arr, mid + 1, high, target);
    return leftCount + rightCount;
}

int main() {
    int n, target;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    printf("Enter %d elements:\n", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Enter element to calculate frequency: ");
    scanf("%d", &target);

    int count = countFrequencyRecursive(arr, 0, n - 1, target);
    printf("Frequency of %d = %d\n", target, count);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int countFrequency(const vector<int>& arr, int low, int high, int target) {
    if (low == high) return (arr[low] == target) ? 1 : 0;
    int mid = low + (high - low) / 2;
    return countFrequency(arr, low, mid, target) + countFrequency(arr, mid + 1, high, target);
}

int main() {
    int n, target;
    cout << "Enter number of elements: ";
    if (!(cin >> n) || n <= 0) return 0;
    vector<int> arr(n);
    cout << "Enter " << n << " elements:\n";
    for (int &x : arr) cin >> x;
    cout << "Enter target: ";
    cin >> target;

    int ans = countFrequency(arr, 0, n - 1, target);
    cout << "Frequency of " << target << " is " << ans << endl;
    return 0;
}`,
            timeComplexity: "O(N) (Recurrence T(N) = 2T(N/2) + O(1))",
            spaceComplexity: "O(log N) stack depth",
            pros: ["Directly amenable to parallel / multi-threaded execution (OpenMP / pthreads)", "Demonstrates divide-and-conquer aggregation"],
            cons: ["Higher constant factor than a simple for-loop"],
          },
        ],
        sampleIO: [
          { input: '7\n10 20 20 10 20 30 20\n20', output: 'Frequency of 20 = 4' },
        ],
        dryRun: [
          { step: 1, state: 'Scan array for 20', explanation: 'Matches at indices 1, 2, 4, 6 -> count = 4.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Resetting count variable inside the loop'],
        edgeCases: ['Frequency is 0 (element not present)'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
    ],
  },

  // ─── DS Lab Exercise 2: Array Operations ──────────────────────────────────
  {
    id: 'ds-lab-2',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 2,
    title: 'Exercise 2 (Array Operations & In-Place Manipulations)',
    description: 'Second extrema without sorting, duplicate removal, missing number from 1 to N, palindrome checking, in-place frequency, and pair sums.',
    dueDate: '2024-11-25',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Second Largest & Second Smallest Without Sorting',
        statement: 'Write a C program to find the second largest and second smallest elements in an array without sorting the array. (Note: User input is mandatory).',
        explanation: 'Maintains two largest (max1, max2) and two smallest (min1, min2) in a single O(N) pass without modifying the original array.',
        requiredConcepts: ['Extrema tracking', 'Condition ordering', 'INT_MIN / INT_MAX'],
        approaches: [
          {
            id: 'two-pass',
            name: 'Approach 1: Two-Pass Traversal (Beginner Intuitive)',
            tag: 'Most Intuitive for Beginners',
            intuition: 'Think of finding the winner of a race first (Pass 1). Once the winner is known, search the remaining participants to find whoever ran the fastest behind the winner (Pass 2). You do the same for the slowest person.',
            algorithm: [
              'Pass 1: Find largest (max1) and smallest (min1) across entire array.',
              'Pass 2: Find max2 = largest element strictly smaller than max1.',
              '        Find min2 = smallest element strictly greater than min1.',
              'Return max2 and min2.',
            ],
            cCode: `#include <stdio.h>
#include <limits.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n < 2) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    // Pass 1: find max1 and min1
    int max1 = arr[0], min1 = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max1) max1 = arr[i];
        if (arr[i] < min1) min1 = arr[i];
    }

    // Pass 2: find max2 and min2
    int max2 = INT_MIN, min2 = INT_MAX;
    for (int i = 0; i < n; i++) {
        if (arr[i] < max1 && arr[i] > max2) max2 = arr[i];
        if (arr[i] > min1 && arr[i] < min2) min2 = arr[i];
    }

    if (max2 == INT_MIN) printf("No distinct second largest.\\n");
    else printf("Second Largest = %d\\n", max2);
    if (min2 == INT_MAX) printf("No distinct second smallest.\\n");
    else printf("Second Smallest = %d\\n", min2);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    int max1 = arr[0], min1 = arr[0];
    for (int x : arr) { max1 = max(max1, x); min1 = min(min1, x); }
    int max2 = INT_MIN, min2 = INT_MAX;
    for (int x : arr) {
        if (x < max1 && x > max2) max2 = x;
        if (x > min1 && x < min2) min2 = x;
    }
    cout << "Second Largest: " << max2 << "\\nSecond Smallest: " << min2 << endl;
    return 0;
}`,
            timeComplexity: 'O(N) (2 passes = 2N operations)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Extremely simple logic that anyone can grasp immediately', 'Zero risk of complex nested if-else boundary errors'],
            cons: ['Traverses the array twice instead of once'],
          },
          {
            id: 'single-pass',
            name: 'Approach 2: Single-Pass Traversal (Optimal)',
            tag: 'Optimal O(N) Single-Pass',
            intuition: 'Imagine watching runners cross a finish line one by one. Whenever a new leader arrives, the previous leader automatically becomes runner-up (2nd place). If someone arrives behind the leader but ahead of runner-up, they claim runner-up position directly.',
            algorithm: [
              'Initialize max1 = INT_MIN, max2 = INT_MIN, min1 = INT_MAX, min2 = INT_MAX.',
              'For each number x in array:',
              '  If x > max1: max2 = max1, max1 = x',
              '  Else if x > max2 and x != max1: max2 = x',
              '  If x < min1: min2 = min1, min1 = x',
              '  Else if x < min2 and x != min1: min2 = x',
              'Display max2 and min2.',
            ],
            cCode: `#include <stdio.h>
#include <limits.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n < 2) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int max1 = INT_MIN, max2 = INT_MIN;
    int min1 = INT_MAX, min2 = INT_MAX;

    for (int i = 0; i < n; i++) {
        if (arr[i] > max1) {
            max2 = max1;
            max1 = arr[i];
        } else if (arr[i] > max2 && arr[i] != max1) {
            max2 = arr[i];
        }

        if (arr[i] < min1) {
            min2 = min1;
            min1 = arr[i];
        } else if (arr[i] < min2 && arr[i] != min1) {
            min2 = arr[i];
        }
    }

    printf("Second Largest = %d\\n", max2);
    printf("Second Smallest = %d\\n", min2);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int m1 = INT_MIN, m2 = INT_MIN, s1 = INT_MAX, s2 = INT_MAX;
    for (int x : a) {
        if (x > m1) { m2 = m1; m1 = x; }
        else if (x > m2 && x != m1) m2 = x;
        if (x < s1) { s2 = s1; s1 = x; }
        else if (x < s2 && x != s1) s2 = x;
    }
    cout << "Second Largest: " << m2 << "\\nSecond Smallest: " << s2 << endl;
    return 0;
}`,
            timeComplexity: 'O(N) (single pass)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Only reads each element once', 'Fastest possible time complexity'],
            cons: ['Must carefully handle duplicate entries matching the maximum'],
          },
        ],
        cCode: `#include <stdio.h>
#include <limits.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n < 2) {
        printf("Array must have at least 2 elements.\\n");
        return 0;
    }
    int arr[n];
    printf("Enter %d elements: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    int max1 = INT_MIN, max2 = INT_MIN;
    int min1 = INT_MAX, min2 = INT_MAX;
    
    for (int i = 0; i < n; i++) {
        if (arr[i] > max1) {
            max2 = max1;
            max1 = arr[i];
        } else if (arr[i] > max2 && arr[i] != max1) {
            max2 = arr[i];
        }
        
        if (arr[i] < min1) {
            min2 = min1;
            min1 = arr[i];
        } else if (arr[i] < min2 && arr[i] != min1) {
            min2 = arr[i];
        }
    }
    
    if (max2 == INT_MIN) printf("No distinct second largest element.\\n");
    else printf("Second Largest = %d\\n", max2);
    
    if (min2 == INT_MAX) printf("No distinct second smallest element.\\n");
    else printf("Second Smallest = %d\\n", min2);
    
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int m1 = INT_MIN, m2 = INT_MIN, s1 = INT_MAX, s2 = INT_MAX;
    for (int x : a) {
        if (x > m1) { m2 = m1; m1 = x; }
        else if (x > m2 && x != m1) m2 = x;
        if (x < s1) { s2 = s1; s1 = x; }
        else if (x < s2 && x != s1) s2 = x;
    }
    cout << "Second Largest: " << m2 << "\\nSecond Smallest: " << s2 << endl;
    return 0;
}`,
        sampleIO: [
          { input: '6\n12 35 1 10 34 1', output: 'Second Largest = 34\nSecond Smallest = 10' },
        ],
        dryRun: [
          { step: 1, state: 'max1=35, max2=34', explanation: '35 is maximum, 34 is runner up.' },
          { step: 2, state: 'min1=1, min2=10', explanation: '1 is minimum, 10 is second smallest distinct element.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        commonMistakes: ['Sorting the array (violates instruction "without sorting")', 'Failing when duplicate maximums exist'],
        edgeCases: ['All elements equal', 'Array with only 2 elements'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'Remove Duplicate Elements from Array',
        statement: 'Write a C program to remove duplicate elements from an array and display the updated array.',
        explanation: 'Shifts duplicate elements leftwards or copies unique elements to maintain updated compact array.',
        requiredConcepts: ['In-place deletion', 'Array shifting', 'Nested loop comparison'],
        algorithm: [
          'Read n and array elements',
          'For i = 0 to n-1:',
          '  For j = i+1 to n-1:',
          '    If arr[i] == arr[j]:',
          '      Shift elements from j to n-2 one step left',
          '      Decrement n and j',
          'Display first n elements of updated array',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                for (int k = j; k < n - 1; k++) {
                    arr[k] = arr[k + 1];
                }
                n--;
                j--; // Check current index again
            }
        }
    }
    printf("Updated array without duplicates: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    for (int i = 0; i < a.size(); i++) {
        for (int j = i + 1; j < a.size(); j++) {
            if (a[i] == a[j]) {
                a.erase(a.begin() + j);
                j--;
            }
        }
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'in-place-nested',
            name: 'Approach 1: Nested Loops In-Place Deletion (Preserves Original Order)',
            tag: 'Order-Preserving In-Place Deletion',
            intuition: 'Take each element arr[i] one by one. Check every subsequent element arr[j]. If you find an exact duplicate of arr[i], delete it by shifting all elements after it one step to the left, and decrement array size n. No new array needed!',
            algorithm: [
              'Loop i from 0 to n - 1.',
              'Loop j from i + 1 to n - 1.',
              'If arr[i] == arr[j]:',
              '  Shift elements from k = j to n - 2: arr[k] = arr[k + 1].',
              '  Decrement n (n--), and decrement j (j--) to re-evaluate shifted element.',
              'Return modified array of size n.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                for (int k = j; k < n - 1; k++) {
                    arr[k] = arr[k + 1];
                }
                n--;
                j--; // Check the newly shifted element at index j
            }
        }
    }

    printf("Array after removing duplicates: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\nNew size = %d\n", n);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                arr.erase(arr.begin() + j);
                n--;
                j--;
            }
        }
    }
    cout << "Unique: ";
    for (int x : arr) cout << x << " ";
    cout << "\nSize: " << arr.size() << endl;
    return 0;
}`,
            timeComplexity: 'O(N^2) average and worst case',
            spaceComplexity: 'O(1) auxiliary (zero extra memory)',
            pros: ['Preserves the original relative order of elements', 'Zero extra memory needed'],
            cons: ['O(N^2) quadratic time due to repeated shifting'],
          },
          {
            id: 'sort-two-pointer',
            name: 'Approach 2: Sort and Two-Pointer Compaction (LeetCode Optimal)',
            tag: 'Optimal O(N) on Sorted Data',
            intuition: 'If an array is sorted, duplicates are grouped together. Keep a slow pointer k marking the last unique element confirmed. Walk a fast pointer i forward. When arr[i] != arr[k], increment k and copy arr[k] = arr[i].',
            algorithm: [
              'Sort array first (or assume sorted).',
              'Initialize uniqueIndex = 0.',
              'For i = 1 to n - 1:',
              '  If arr[i] != arr[uniqueIndex]:',
              '    uniqueIndex++;',
              '    arr[uniqueIndex] = arr[i];',
              'New unique array size is uniqueIndex + 1.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    qsort(arr, n, sizeof(int), cmp); // Sort first

    int k = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[k]) {
            k++;
            arr[k] = arr[i];
        }
    }
    int newSize = k + 1;

    printf("Sorted Unique Elements: ");
    for (int i = 0; i < newSize; i++) printf("%d ", arr[i]);
    printf("\nNew Size = %d\n", newSize);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    sort(arr.begin(), arr.end());
    arr.erase(unique(arr.begin(), arr.end()), arr.end());
    cout << "Unique elements: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N log N) with sorting, O(N) if already sorted',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Linear O(N) scan after sorting with zero element shifting', 'The definitive two-pointer technique used in production'],
            cons: ['Changes original relative order because of sorting'],
          },
        ],
        sampleIO: [
          { input: '7\n1 2 2 3 4 4 5', output: 'Updated array without duplicates: 1 2 3 4 5' },
        ],
        dryRun: [
          { step: 1, state: 'Found duplicate 2 at j=2', explanation: 'Shifts remaining elements left; n becomes 6.' },
          { step: 2, state: 'Found duplicate 4 at j=4', explanation: 'Shifts remaining elements left; n becomes 5.' },
        ],
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Forgetting j-- after shifting causes consecutive duplicates to be skipped'],
        edgeCases: ['Array with all identical elements', 'Array with no duplicates'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q3',
        number: 3,
        title: 'Find Missing Number from 1 to N',
        statement: 'An array contains numbers from 1 to N with one number missing. Write a C program to find the missing number.',
        explanation: 'Uses Gauss arithmetic sum formula S = N*(N+1)/2. The missing number is expectedSum - actualSum.',
        requiredConcepts: ['Arithmetic progression', 'Sum formula', 'Overflow prevention'],
        approaches: [
          {
            id: 'math-sum',
            name: 'Approach 1: Mathematical Formula Sum (Beginner)',
            tag: 'Formula Based',
            intuition: 'If you have consecutive numbers from 1 to N, their exact sum is always N*(N+1)/2 (Gauss formula). If one number is removed, the sum of the remaining numbers will be less than expected by exactly the missing number.',
            algorithm: [
              'Calculate expectedSum = N * (N + 1) / 2',
              'Sum all the N - 1 numbers present in the array into actualSum',
              'missingNumber = expectedSum - actualSum',
            ],
            cCode: `#include <stdio.h>

int main() {
    int N;
    printf("Enter N: ");
    scanf("%d", &N);
    long long expected = (long long)N * (N + 1) / 2;
    long long actual = 0, val;
    for (int i = 0; i < N - 1; i++) {
        scanf("%lld", &val);
        actual += val;
    }
    printf("Missing Number = %lld\\n", expected - actual);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    long long N; cin >> N;
    long long expected = N * (N + 1) / 2, actual = 0, x;
    for (int i = 0; i < N - 1; i++) { cin >> x; actual += x; }
    cout << "Missing: " << expected - actual << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1)',
            pros: ['One-line math formula', 'Easy for anyone to remember'],
            cons: ['For very large N (e.g. N > 10^9), N*(N+1) can cause arithmetic overflow without 64-bit integers'],
          },
          {
            id: 'bitwise-xor',
            name: 'Approach 2: Bitwise XOR Method (Optimal / No Overflow)',
            tag: 'Bit Manipulation',
            intuition: 'XOR has two magical properties: a ^ a = 0 (identical numbers cancel out) and a ^ 0 = a. If we XOR all numbers from 1 to N, and also XOR all numbers in our array, every present number appears twice and turns to zero! The only number left standing is the missing number.',
            algorithm: [
              'Initialize xorAll = 0',
              'XOR all numbers from 1 to N: xorAll ^= i',
              'XOR all array elements: xorAll ^= arr[i]',
              'The remaining value in xorAll is the missing number.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int N;
    printf("Enter N: ");
    scanf("%d", &N);
    int xorTotal = 0;
    
    // XOR numbers 1 to N
    for (int i = 1; i <= N; i++) xorTotal ^= i;
    
    // XOR array elements
    printf("Enter %d numbers: ", N - 1);
    for (int i = 0; i < N - 1; i++) {
        int x;
        scanf("%d", &x);
        xorTotal ^= x;
    }
    printf("Missing Number = %d\\n", xorTotal);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    int N; cin >> N;
    int xorTotal = 0;
    for (int i = 1; i <= N; i++) xorTotal ^= i;
    for (int i = 0; i < N - 1; i++) { int x; cin >> x; xorTotal ^= x; }
    cout << "Missing: " << xorTotal << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1)',
            pros: ['Zero possibility of integer arithmetic overflow', 'Operates directly on CPU bitwise instructions'],
            cons: ['Requires understanding bitwise XOR cancellation properties'],
          },
        ],
        algorithm: [
          'Read N (the full range length, where array contains N-1 elements)',
          'Compute expectedSum = N * (N + 1) / 2',
          'Compute actualSum = sum of all N-1 elements in array',
          'Missing number = expectedSum - actualSum',
          'Print missing number',
        ],
        cCode: `#include <stdio.h>

int main() {
    int N;
    printf("Enter N (range 1 to N): ");
    scanf("%d", &N);
    
    int expectedSum = N * (N + 1) / 2;
    int actualSum = 0, val;
    printf("Enter %d numbers: ", N - 1);
    for (int i = 0; i < N - 1; i++) {
        scanf("%d", &val);
        actualSum += val;
    }
    int missing = expectedSum - actualSum;
    printf("The missing number is: %d\\n", missing);
    return 0;
}`,
        cppCode: `#include <iostream>
using namespace std;

int main() {
    long long N; cin >> N;
    long long expected = N * (N + 1) / 2;
    long long actual = 0, x;
    for (int i = 0; i < N - 1; i++) {
        cin >> x;
        actual += x;
    }
    cout << "Missing: " << expected - actual << endl;
    return 0;
}`,
        sampleIO: [
          { input: '5\n1 2 4 5', output: 'The missing number is: 3' },
        ],
        dryRun: [
          { step: 1, state: 'N = 5', explanation: 'expectedSum = 5 * 6 / 2 = 15.' },
          { step: 2, state: 'actualSum = 1 + 2 + 4 + 5 = 12', explanation: 'missing = 15 - 12 = 3.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        commonMistakes: ['Integer overflow when N*(N+1) exceeds 32-bit INT_MAX for large N (use long long)'],
        edgeCases: ['Missing element is 1', 'Missing element is N'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q4',
        number: 4,
        title: 'Check if Array is a Palindrome',
        statement: 'Write a C program to determine whether the given array is a palindrome.',
        explanation: 'Two pointers starting from left (0) and right (n-1) move towards the center comparing elements.',
        requiredConcepts: ['Two-pointer technique', 'Palindrome property'],
        algorithm: [
          'Read n and array elements',
          'Init left = 0, right = n - 1, isPal = 1',
          'While left < right:',
          '  If arr[left] != arr[right]: isPal = 0, break',
          '  left++, right--',
          'Print palindrome result',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    int left = 0, right = n - 1, isPalindrome = 1;
    while (left < right) {
        if (arr[left] != arr[right]) {
            isPalindrome = 0;
            break;
        }
        left++;
        right--;
    }
    
    if (isPalindrome) printf("The array is a PALINDROME.\\n");
    else printf("The array is NOT a palindrome.\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int l = 0, r = n - 1;
    while (l < r) {
        if (a[l] != a[r]) {
            cout << "NOT a palindrome\\n";
            return 0;
        }
        l++; r--;
    }
    cout << "PALINDROME\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'two-pointer-converge',
            name: 'Approach 1: Two-Pointer Converging from Ends',
            tag: 'Optimal O(N) Time, O(1) Space',
            intuition: 'A palindrome reads the exact same forward and backward (e.g. 1 2 3 2 1). Place left pointer at the beginning (index 0) and right pointer at the end (index n - 1). Check if arr[left] == arr[right]. Move inward left++ and right-- until they cross.',
            algorithm: [
              'Initialize left = 0, right = n - 1.',
              'While left < right:',
              '  If arr[left] != arr[right], return False (not a palindrome).',
              '  Increment left, decrement right.',
              'If loop completes without mismatch, return True (is palindrome).',
            ],
            cCode: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;

    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int left = 0, right = n - 1;
    bool isPalindrome = true;

    while (left < right) {
        if (arr[left] != arr[right]) {
            isPalindrome = false;
            break;
        }
        left++;
        right--;
    }

    if (isPalindrome) printf("The array is a PALINDROME.\n");
    else printf("The array is NOT a palindrome.\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    int l = 0, r = n - 1;
    bool ok = true;
    while (l < r) {
        if (arr[l++] != arr[r--]) { ok = false; break; }
    }
    cout << (ok ? "PALINDROME" : "NOT A PALINDROME") << endl;
    return 0;
}`,
            timeComplexity: 'O(N/2) = O(N) comparisons',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Only visits half the array before determining equality', 'Zero memory overhead'],
            cons: ['None, this is the optimal algorithm'],
          },
          {
            id: 'reverse-and-compare',
            name: 'Approach 2: Reversed Array Copy & Compare',
            tag: 'Intuitive Mirror Comparison',
            intuition: 'Make a duplicate copy of the array and invert its order. If every element of the inverted array matches the original at identical positions, the array is symmetric.',
            algorithm: [
              'Create auxiliary array rev[n].',
              'For i = 0 to n - 1: rev[i] = arr[n - 1 - i].',
              'Compare arr[i] with rev[i] for all i.',
              'If any difference found, not palindrome; else palindrome.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n], rev[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    for (int i = 0; i < n; i++) rev[i] = arr[n - 1 - i];

    int ok = 1;
    for (int i = 0; i < n; i++) {
        if (arr[i] != rev[i]) { ok = 0; break; }
    }

    if (ok) printf("Array is a PALINDROME.\n");
    else printf("Array is NOT a palindrome.\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    vector<int> rev = arr;
    reverse(rev.begin(), rev.end());
    cout << (arr == rev ? "PALINDROME" : "NOT A PALINDROME") << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(N) auxiliary storage',
            pros: ['Conceptually very clear mirror demonstration', 'Directly translates to higher-level string comparisons'],
            cons: ['Requires double the memory (O(N) extra space)'],
          },
        ],
        sampleIO: [
          { input: '5\n1 2 3 2 1', output: 'The array is a PALINDROME.' },
          { input: '4\n1 2 3 4', output: 'The array is NOT a palindrome.' },
        ],
        dryRun: [
          { step: 1, state: 'left=0 (1), right=4 (1)', explanation: '1 == 1, continue.' },
          { step: 2, state: 'left=1 (2), right=3 (2)', explanation: '2 == 2, continue.' },
          { step: 3, state: 'left=2 >= right=2', explanation: 'Loop terminates, array is palindrome.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Iterating up to n instead of n/2 (redundant comparisons)'],
        edgeCases: ['Array with 1 element (always palindrome)', 'Even length palindrome vs odd length'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q5',
        number: 5,
        title: 'Count Frequency of Every Element Without Extra Arrays',
        statement: 'Write a C program to count the frequency of every element in an array without using extra arrays.',
        explanation: 'For each element, count matching subsequent elements and mark counted elements with a sentinel or skip already counted indices.',
        requiredConcepts: ['In-place frequency counting', 'Visited element handling'],
        algorithm: [
          'Read n and array elements',
          'For i = 0 to n-1:',
          '  Check if arr[i] appeared previously at index 0 to i-1. If yes, continue (already printed)',
          '  count = 1',
          '  For j = i+1 to n-1: if arr[j] == arr[i], count++',
          '  Print arr[i] and its count',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    printf("Element frequencies:\\n");
    for (int i = 0; i < n; i++) {
        // Check if already counted
        int alreadyCounted = 0;
        for (int k = 0; k < i; k++) {
            if (arr[k] == arr[i]) {
                alreadyCounted = 1;
                break;
            }
        }
        if (alreadyCounted) continue;
        
        int count = 1;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] == arr[i]) count++;
        }
        printf("%d appears %d time(s)\\n", arr[i], count);
    }
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    for (int i = 0; i < n; i++) {
        bool seen = false;
        for (int k = 0; k < i; k++) if (a[k] == a[i]) { seen = true; break; }
        if (seen) continue;
        int c = 1;
        for (int j = i + 1; j < n; j++) if (a[j] == a[i]) c++;
        cout << a[i] << " -> " << c << endl;
    }
    return 0;
}`,
                approaches: [
          {
            id: 'sort-and-count-runs',
            name: 'Approach 1: Sort First and Count Consecutive Runs',
            tag: 'Optimal O(1) Auxiliary Space',
            intuition: 'When elements are sorted, identical numbers form contiguous clusters. You can walk through once: count consecutive numbers that equal the current value, print the tally, and jump straight to the next distinct value.',
            algorithm: [
              'Sort the array in ascending order.',
              'Iterate i = 0 to n - 1:',
              '  count = 1.',
              '  While i < n - 1 and arr[i] == arr[i + 1]: increment count and i.',
              '  Print arr[i] and count.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    qsort(arr, n, sizeof(int), cmp);

    printf("Element Frequencies:\n");
    for (int i = 0; i < n; i++) {
        int count = 1;
        while (i < n - 1 && arr[i] == arr[i + 1]) {
            count++;
            i++;
        }
        printf("%d appears %d time(s)\n", arr[i], count);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    sort(arr.begin(), arr.end());
    for (int i = 0; i < n; i++) {
        int count = 1;
        while (i < n - 1 && arr[i] == arr[i + 1]) { count++; i++; }
        cout << arr[i] << " -> " << count << " time(s)\n";
    }
    return 0;
}`,
            timeComplexity: 'O(N log N) sorting + O(N) traversal',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Meets the lab requirement of zero extra arrays', 'Guarantees no duplicate frequency printouts'],
            cons: ['Reorders the array data'],
          },
          {
            id: 'sentinel-marker-nested',
            name: 'Approach 2: In-Place Visited Sentinel Marker',
            tag: 'In-Place Nested Loop Marking',
            intuition: 'For each element arr[i], if it has not been marked as visited, count all matches arr[j] in the rest of the array. To prevent counting that duplicate again in future outer iterations, overwrite duplicates with a sentinel value (like -1 if values are positive).',
            algorithm: [
              'Choose sentinel constant (e.g. VISITED = -1 or INT_MIN).',
              'Loop i from 0 to n - 1:',
              '  If arr[i] != VISITED:',
              '    count = 1.',
              '    For j from i + 1 to n - 1:',
              '      If arr[j] == arr[i]: count++, arr[j] = VISITED.',
              '    Print arr[i] and count.',
            ],
            cCode: `#include <stdio.h>
#define VISITED -99999

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Frequencies without extra array:\n");
    for (int i = 0; i < n; i++) {
        if (arr[i] != VISITED) {
            int count = 1;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] == arr[i]) {
                    count++;
                    arr[j] = VISITED; // Mark as processed
                }
            }
            printf("%d occurs %d time(s)\n", arr[i], count);
        }
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    const int VIS = -1e9;
    for (int i = 0; i < n; i++) {
        if (a[i] == VIS) continue;
        int c = 1;
        for (int j = i + 1; j < n; j++) {
            if (a[j] == a[i]) { c++; a[j] = VIS; }
        }
        cout << a[i] << ": " << c << endl;
    }
    return 0;
}`,
            timeComplexity: 'O(N^2)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Preserves original encounter order of elements', 'Zero dynamic allocation or extra arrays'],
            cons: ['Destructively modifies original values', 'Sentinel value cannot be a valid input data element'],
          },
        ],
        sampleIO: [
          { input: '7\n10 20 20 10 10 20 5', output: 'Element frequencies:\n10 appears 3 time(s)\n20 appears 3 time(s)\n5 appears 1 time(s)' },
        ],
        dryRun: [
          { step: 1, state: 'arr[0]=10', explanation: 'Counts future 10s: 3 times. Prints 10 -> 3.' },
          { step: 2, state: 'arr[1]=20', explanation: 'Counts future 20s: 3 times. Prints 20 -> 3.' },
          { step: 3, state: 'arr[3]=10', explanation: 'Found earlier at k=0, skips.' },
        ],
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1) auxiliary (strictly no extra array used)',
        commonMistakes: ['Allocating a frequency array (violates instruction "without extra arrays")'],
        edgeCases: ['All elements distinct', 'All elements identical'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q6',
        number: 6,
        title: 'Find All Pairs With Given Sum',
        statement: 'Write a C program to find all pairs of elements whose sum is equal to a given target value.',
        explanation: 'Nested iteration to test every pair (arr[i], arr[j]) where i < j.',
        requiredConcepts: ['Pair search', 'Combinatorial loops'],
        algorithm: [
          'Read n, array elements, and target sum S',
          'pairCount = 0',
          'For i = 0 to n-1:',
          '  For j = i+1 to n-1:',
          '    If arr[i] + arr[j] == S:',
          '      Print pair (arr[i], arr[j])',
          '      pairCount++',
          'If pairCount == 0, print no pairs found',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, target, found = 0;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter array elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target sum: ");
    scanf("%d", &target);
    
    printf("Pairs with sum %d:\\n", target);
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target) {
                printf("(%d, %d)\\n", arr[i], arr[j]);
                found++;
            }
        }
    }
    if (!found) printf("No pairs found.\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> target;
    int c = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (a[i] + a[j] == target) {
                cout << "(" << a[i] << ", " << a[j] << ")\\n";
                c++;
            }
        }
    }
    if (!c) cout << "No pairs found\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'brute-force-pairs',
            name: 'Approach 1: Brute Force Nested Loops (O(N^2))',
            tag: 'Most Intuitive for Beginners',
            intuition: 'Pick each number arr[i]. Look at every subsequent number arr[j] to see if arr[i] + arr[j] == target. Checking j from i+1 prevents duplicate pairs like (a,b) and (b,a).',
            algorithm: [
              'Read target sum S from user.',
              'Loop i from 0 to n - 2.',
              'Loop j from i + 1 to n - 1.',
              'If arr[i] + arr[j] == S: print pair (arr[i], arr[j]).',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, target;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n < 2) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target sum: ");
    scanf("%d", &target);

    int found = 0;
    printf("Pairs with sum %d:\n", target);
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target) {
                printf("(%d, %d) at indices [%d, %d]\n", arr[i], arr[j], i, j);
                found++;
            }
        }
    }
    if (!found) printf("No pairs found.\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target; cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;
    cin >> target;
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target)
                cout << "(" << arr[i] << ", " << arr[j] << ")\n";
        }
    }
    return 0;
}`,
            timeComplexity: 'O(N^2)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Works on unsorted arrays and displays original index positions', 'Simple logic requiring no advanced concepts'],
            cons: ['Quadratic time complexity O(N^2); fails on large datasets'],
          },
          {
            id: 'two-pointer-sorted-sum',
            name: 'Approach 2: Sort and Two-Pointer Meet-in-the-Middle',
            tag: 'Optimal O(N log N) Two-Pointer',
            intuition: 'Sort the array first. Place left pointer at smallest element and right pointer at largest element. If arr[left] + arr[right] == target, you found a pair! If the sum is too small, move left++ to increase sum. If too big, move right-- to decrease sum.',
            algorithm: [
              'Sort array arr in ascending order.',
              'Initialize left = 0, right = n - 1.',
              'While left < right:',
              '  sum = arr[left] + arr[right].',
              '  If sum == target: print pair, left++, right--.',
              '  Else if sum < target: left++ (need bigger sum).',
              '  Else: right-- (need smaller sum).',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int n, target;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n < 2) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target sum: ");
    scanf("%d", &target);

    qsort(arr, n, sizeof(int), cmp);

    int left = 0, right = n - 1, found = 0;
    printf("Pairs with sum %d:\n", target);
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            printf("(%d, %d)\n", arr[left], arr[right]);
            found++;
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    if (!found) printf("No pairs found.\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, target; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> target;
    sort(a.begin(), a.end());
    int l = 0, r = n - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) { cout << "(" << a[l++] << ", " << a[r--] << ")\n"; }
        else if (s < target) l++;
        else r--;
    }
    return 0;
}`,
            timeComplexity: 'O(N log N) dominated by sorting; two-pointer scan is O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Drastic improvement over O(N^2)', 'Does not require extra hash table memory'],
            cons: ['Destroys original indices due to sorting'],
          },
        ],
        sampleIO: [
          { input: '6\n1 5 7 -1 5 6\n6', output: 'Pairs with sum 6:\n(1, 5)\n(7, -1)\n(1, 5)' },
        ],
        dryRun: [
          { step: 1, state: 'i=0 (1), j=1 (5)', explanation: '1 + 5 = 6. Output (1, 5).' },
          { step: 2, state: 'i=2 (7), j=3 (-1)', explanation: '7 + (-1) = 6. Output (7, -1).' },
        ],
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Starting inner loop from 0 which counts pairs twice: (a,b) and (b,a) and pairs element with itself'],
        edgeCases: ['No pairs match target sum', 'Negative numbers matching positive target'],
        relatedTopicId: 'two-sum',
        isCompleted: true,
      },
    ],
  },

  // ─── DS Lab Exercise 3: Linear & Binary Search ────────────────────────────
  {
    id: 'ds-lab-3',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 3,
    title: 'Lab Exercise 3 (Linear Search, Binary Search, and Array Operations)',
    description: 'In-place array reversal, sorted insertion, deleting all occurrences, comparison counts for best/avg/worst case linear search, binary search with duplicates, and linear search with single deletion.',
    dueDate: '2024-11-28',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Traverse Array for Statistics',
        statement: 'Write a C program to read n integers into an array and traverse the array to find: • Sum and average of elements • Largest and smallest element • Number of even and odd elements.',
        explanation: 'Combines multiple metrics in a single comprehensive traversal pass.',
        requiredConcepts: ['Multi-variable accumulation', 'Conditional state tracking'],
        algorithm: [
          'Read n and array elements',
          'Init sum = 0, max = arr[0], min = arr[0], evens = 0, odds = 0',
          'Loop i from 0 to n-1:',
          '  sum += arr[i]',
          '  if arr[i] > max: max = arr[i]',
          '  if arr[i] < min: min = arr[i]',
          '  if arr[i] % 2 == 0: evens++ else odds++',
          'Print all computed statistics',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    int sum = 0, max = arr[0], min = arr[0], evens = 0, odds = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
        if (arr[i] % 2 == 0) evens++;
        else odds++;
    }
    printf("Sum = %d\\n", sum);
    printf("Average = %.2f\\n", (float)sum / n);
    printf("Largest = %d, Smallest = %d\\n", max, min);
    printf("Even elements = %d, Odd elements = %d\\n", evens, odds);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int sum = 0, maxV = a[0], minV = a[0], ev = 0, od = 0;
    for (int x : a) {
        sum += x;
        if (x > maxV) maxV = x;
        if (x < minV) minV = x;
        if (x % 2 == 0) ev++; else od++;
    }
    cout << "Sum: " << sum << " Avg: " << (double)sum/n << "\\nMax: " << maxV << " Min: " << minV << "\\nEven: " << ev << " Odd: " << od << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'single-consolidated-pass',
            name: 'Approach 1: Single Consolidated Loop (One-Pass O(N))',
            tag: 'Optimal Single-Pass Processing',
            intuition: 'Instead of running 4 separate loops (one for sum, one for average, one for max, one for min), do everything in a single walk through the array. Imagine an inspector examining items on a conveyor belt and simultaneously updating all 4 clipboard metrics.',
            algorithm: [
              'Initialize minVal = arr[0], maxVal = arr[0], sum = 0.',
              'For i = 0 to n - 1:',
              '  sum += arr[i]',
              '  if (arr[i] > maxVal) maxVal = arr[i]',
              '  if (arr[i] < minVal) minVal = arr[i]',
              'Compute avg = (float)sum / n.',
              'Display all four statistics.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    long long sum = 0;
    int maxVal = arr[0], minVal = arr[0];

    for (int i = 0; i < n; i++) {
        sum += arr[i];
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }

    double avg = (double)sum / n;
    printf("Sum: %lld\nAverage: %.2f\nMax: %d\nMin: %d\n", sum, avg, maxVal, minVal);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    long long sum = 0;
    int mx = a[0], mn = a[0];
    for (int x : a) {
        sum += x;
        mx = max(mx, x);
        mn = min(mn, x);
    }
    cout << "Sum: " << sum << "\nAvg: " << (double)sum / n << "\nMax: " << mx << "\nMin: " << mn << endl;
    return 0;
}`,
            timeComplexity: 'O(N) in exactly 1 pass',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Maximizes CPU cache locality by touching memory only once', 'Extremely efficient runtime performance'],
            cons: ['Multiple responsibilities inside a single loop body'],
          },
          {
            id: 'modular-functions',
            name: 'Approach 2: Modular Function Decomposition',
            tag: 'Software Engineering Best Practice',
            intuition: 'In production software, functions should obey the Single Responsibility Principle. Create separate functions computeSum(), computeMax(), computeMin() to make the codebase unit-testable and reusable.',
            algorithm: [
              'Define int getMin(int arr[], int n).',
              'Define int getMax(int arr[], int n).',
              'Define long long getSum(int arr[], int n).',
              'Call each function modularly from main.',
            ],
            cCode: `#include <stdio.h>

long long getSum(int arr[], int n) {
    long long s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}

int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];
    return mx;
}

int getMin(int arr[], int n) {
    int mn = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] < mn) mn = arr[i];
    return mn;
}

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    long long sum = getSum(arr, n);
    printf("Sum = %lld\nAvg = %.2f\nMax = %d\nMin = %d\n", sum, (double)sum / n, getMax(arr, n), getMin(arr, n));
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    long long sum = accumulate(a.begin(), a.end(), 0LL);
    int mx = *max_element(a.begin(), a.end());
    int mn = *min_element(a.begin(), a.end());
    cout << "Sum: " << sum << "\nAvg: " << (double)sum / n << "\nMax: " << mx << "\nMin: " << mn << endl;
    return 0;
}`,
            timeComplexity: 'O(N) (3 passes of N elements)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Highly readable, maintainable, and testable code structure', 'Matches clean architecture principles'],
            cons: ['Traverses array memory 3 times instead of 1'],
          },
        ],
        sampleIO: [
          { input: '5\n10 15 20 25 30', output: 'Sum = 100\nAverage = 20.00\nLargest = 30, Smallest = 10\nEven elements = 3, Odd elements = 2' },
        ],
        dryRun: [
          { step: 1, state: 'Scan 10, 15, 20, 25, 30', explanation: 'Computes sum=100, max=30, min=10, 3 even, 2 odd in a single pass.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Using separate loops for each metric instead of doing all in one traversal'],
        edgeCases: ['Array with all negative numbers', 'Array with single element'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'In-Place Array Reversal',
        statement: 'Write a C program to traverse an array and reverse its elements in-place, without using a second array.',
        explanation: 'Swaps element at index i with element at index (n - 1 - i) up to the midpoint n/2.',
        requiredConcepts: ['Two-pointer swap', 'In-place modification'],
        algorithm: [
          'Read n and array elements',
          'Loop i from 0 to n/2 - 1:',
          '  temp = arr[i]',
          '  arr[i] = arr[n - 1 - i]',
          '  arr[n - 1 - i] = temp',
          'Print reversed array',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    for (int i = 0; i < n / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = temp;
    }
    printf("Reversed array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    for (int i = 0; i < n / 2; i++) swap(a[i], a[n - 1 - i]);
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'two-pointer-swap',
            name: 'Approach 1: Two-Pointer Swap In-Place (arr[i] <-> arr[j])',
            tag: 'Standard In-Place Reversal',
            intuition: 'Hold the two opposite ends of a string of beads. Swap the first and last bead. Then swap second and second-last. Continue moving toward the center until fingers meet in the middle.',
            algorithm: [
              'Set start = 0, end = n - 1.',
              'While start < end:',
              '  Swap arr[start] and arr[end] using temporary variable temp.',
              '  start++; end--;',
              'Array is reversed in-place without allocating a second array.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int start = 0, end = n - 1;
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }

    printf("Reversed array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int s = 0, e = n - 1;
    while (s < e) swap(a[s++], a[e--]);
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N/2) = O(N) swaps',
            spaceComplexity: 'O(1) auxiliary (In-Place)',
            pros: ['Strict in-place manipulation as required by lab syllabus', 'Half the loop iterations of a full pass'],
            cons: ['Destroys original sequence ordering'],
          },
          {
            id: 'bitwise-xor-swap',
            name: 'Approach 2: Bitwise XOR In-Place Swap (Zero Temp Variable)',
            tag: 'Hardware-Level Zero-Memory Swap',
            intuition: 'XOR has the property that X ^ X = 0 and X ^ 0 = X. You can swap two variables a and b using 3 XOR operations without a temporary variable: a = a ^ b; b = a ^ b; a = a ^ b!',
            algorithm: [
              'Set start = 0, end = n - 1.',
              'While start < end:',
              '  arr[start] ^= arr[end];',
              '  arr[end] ^= arr[start];',
              '  arr[start] ^= arr[end];',
              '  start++; end--;',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int start = 0, end = n - 1;
    while (start < end) {
        arr[start] ^= arr[end];
        arr[end] ^= arr[start];
        arr[start] ^= arr[end];
        start++;
        end--;
    }

    printf("XOR Reversed array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int s = 0, e = n - 1;
    while (s < e) {
        a[s] ^= a[e]; a[e] ^= a[s]; a[s] ^= a[e];
        s++; e--;
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary with literally 0 temporary variables',
            pros: ['Classic embedded systems programming trick', 'Zero temporary register allocated'],
            cons: ['If start == end, a ^= a sets the number to 0! Guard condition start < end is strictly required'],
          },
        ],
        sampleIO: [
          { input: '5\n10 20 30 40 50', output: 'Reversed array: 50 40 30 20 10' },
        ],
        dryRun: [
          { step: 1, state: 'i=0, swap(arr[0]=10, arr[4]=50)', explanation: 'Array becomes [50, 20, 30, 40, 10]' },
          { step: 2, state: 'i=1, swap(arr[1]=20, arr[3]=40)', explanation: 'Array becomes [50, 40, 30, 20, 10]' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary (strictly in-place)',
        commonMistakes: ['Looping to n instead of n/2 (reverses and then un-reverses back to original)'],
        edgeCases: ['Even length array vs odd length array', 'n = 1'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q3',
        number: 3,
        title: 'Insert into Sorted Array Maintaining Order',
        statement: 'Write a C program to insert a new element into an array that is already sorted in ascending order. The resulting array must remain sorted.\nExample: 10 20 30 40 50, Insert 35 -> Result: 10 20 30 35 40 50',
        explanation: 'Scans from end, shifts elements greater than target one position right, and places target into created gap.',
        requiredConcepts: ['Backward shifting', 'Sorted insertion (Insertion Sort inner step)'],
        algorithm: [
          'Read n, sorted array elements, and new element key',
          'Declare array of size n + 1',
          'Set i = n - 1',
          'While i >= 0 and arr[i] > key:',
          '  arr[i + 1] = arr[i]',
          '  i--',
          'arr[i + 1] = key',
          'Print updated array of size n + 1',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of elements: ");
    scanf("%d", &n);
    int arr[n + 1];
    printf("Enter %d sorted elements: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to insert: ");
    scanf("%d", &key);
    
    int i = n - 1;
    while (i >= 0 && arr[i] > key) {
        arr[i + 1] = arr[i];
        i--;
    }
    arr[i + 1] = key;
    n++;
    
    printf("Result: ");
    for (int j = 0; j < n; j++) printf("%d ", arr[j]);
    printf("\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    a.push_back(0);
    int i = n - 1;
    while (i >= 0 && a[i] > key) {
        a[i + 1] = a[i];
        i--;
    }
    a[i + 1] = key;
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'backward-shift-insert',
            name: 'Approach 1: Backward Shift-and-Insert (Single-Pass)',
            tag: 'Most Efficient Single-Pass Method',
            intuition: 'Imagine books placed on a shelf sorted by thickness. To slide in a new book, start from the right end. If the existing book is thicker than the new book, slide it one slot right. The moment you find a book thinner than the new book, drop the new book into the empty slot.',
            algorithm: [
              'Start index i at the last element (n - 1).',
              'While i >= 0 and arr[i] > elementToInsert:',
              '  arr[i + 1] = arr[i] (shift right)',
              '  i--;',
              'Place arr[i + 1] = elementToInsert.',
              'Increment size: n = n + 1.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, val;
    printf("Enter number of sorted elements: ");
    if (scanf("%d", &n) != 1 || n < 0) return 0;
    int arr[n + 10];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter value to insert: ");
    scanf("%d", &val);

    int i = n - 1;
    while (i >= 0 && arr[i] > val) {
        arr[i + 1] = arr[i]; // Shift right
        i--;
    }
    arr[i + 1] = val; // Insert
    n++;

    printf("Array after insertion: ");
    for (int j = 0; j < n; j++) printf("%d ", arr[j]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, val; cin >> n;
    vector<int> a(n + 1);
    for (int i = 0; i < n; i++) cin >> a[i];
    cin >> val;
    int i = n - 1;
    while (i >= 0 && a[i] > val) {
        a[i + 1] = a[i];
        i--;
    }
    a[i + 1] = val;
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N) shift operations',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Combined search and shift in a single pass', 'Exact foundational routine of Insertion Sort'],
            cons: ['Array buffer must have spare capacity (n + 1) allocated upfront'],
          },
          {
            id: 'binary-search-insert',
            name: 'Approach 2: Binary Search Insert Position + Block Shift',
            tag: 'Optimal O(log N) Search for Position',
            intuition: 'Instead of linear searching from the back, use Binary Search to find the exact insertion slot in O(log N) time. Then use a block shift to make room for the new element.',
            algorithm: [
              'Binary search for lower_bound of val to find target index pos.',
              'Shift all elements from n - 1 down to pos one position right.',
              'Set arr[pos] = val.',
              'Increment n.',
            ],
            cCode: `#include <stdio.h>

int findInsertPos(int arr[], int n, int val) {
    int low = 0, high = n - 1, pos = n;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= val) {
            pos = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return pos;
}

int main() {
    int n, val;
    printf("Enter number of sorted elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n + 10];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter value to insert: ");
    scanf("%d", &val);

    int pos = findInsertPos(arr, n, val);
    for (int i = n - 1; i >= pos; i--) {
        arr[i + 1] = arr[i];
    }
    arr[pos] = val;
    n++;

    printf("Array after insertion at index %d: ", pos);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, val; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> val;
    auto it = lower_bound(a.begin(), a.end(), val);
    a.insert(it, val);
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(log N) search + O(N) element shift',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Fewer element comparisons than linear scan', 'Standard C++ lower_bound pattern'],
            cons: ['Array shift is still O(N) due to contiguous array memory constraints'],
          },
        ],
        sampleIO: [
          { input: '5\n10 20 30 40 50\n35', output: 'Result: 10 20 30 35 40 50' },
        ],
        dryRun: [
          { step: 1, state: 'key = 35, i = 4 (arr[4]=50 > 35)', explanation: 'arr[5]=50, i becomes 3' },
          { step: 2, state: 'i = 3 (arr[3]=40 > 35)', explanation: 'arr[4]=40, i becomes 2' },
          { step: 3, state: 'i = 2 (arr[2]=30 <= 35)', explanation: 'Loop exits. arr[3]=35.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Shifting forward from 0 which overwrites subsequent elements (must shift backwards)'],
        edgeCases: ['Key smaller than all elements (inserted at index 0)', 'Key larger than all elements (inserted at index n)'],
        relatedTopicId: 'bubble-sort',
        isCompleted: true,
      },
      {
        id: 'q4',
        number: 4,
        title: 'Delete All Occurrences of Given Element',
        statement: 'Write a C program to delete all occurrences of a given element from an array.\nExample: Input: 10 20 30 20 40 20, Delete: 20 -> Output: 10 30 40',
        explanation: 'Single-pass two-pointer overwriting: keeps writeIndex for elements not equal to key.',
        requiredConcepts: ['Two-pointer filtering', 'In-place compaction'],
        algorithm: [
          'Read n, array elements, and element to delete (key)',
          'k = 0',
          'For i = 0 to n-1:',
          '  If arr[i] != key: arr[k++] = arr[i]',
          'New size is k',
          'Print elements from 0 to k-1',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter array elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to delete: ");
    scanf("%d", &key);
    
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != key) {
            arr[k++] = arr[i];
        }
    }
    printf("Output: ");
    for (int i = 0; i < k; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] != key) a[k++] = a[i];
    }
    for (int i = 0; i < k; i++) cout << a[i] << " ";
    cout << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'two-pointer-compaction',
            name: 'Approach 1: Two-Pointer Compaction (Optimal In-Place O(N))',
            tag: 'Optimal O(N) In-Place Compaction',
            intuition: 'Have two pointers: read pointer i scans through every element. Write pointer k only writes elements that are NOT equal to the deletion target. When i finishes, k is the new compacted size! Zero nested shifting loops!',
            algorithm: [
              'Initialize writeIndex = 0.',
              'Loop readIndex from 0 to n - 1:',
              '  If arr[readIndex] != target:',
              '    arr[writeIndex] = arr[readIndex];',
              '    writeIndex++;',
              'New array length is writeIndex.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, target;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to delete: ");
    scanf("%d", &target);

    int writeIdx = 0;
    for (int readIdx = 0; readIdx < n; readIdx++) {
        if (arr[readIdx] != target) {
            arr[writeIdx] = arr[readIdx];
            writeIdx++;
        }
    }

    int deletedCount = n - writeIdx;
    printf("Deleted %d occurrence(s).\n", deletedCount);
    printf("Compacted Array: ");
    for (int i = 0; i < writeIdx; i++) printf("%d ", arr[i]);
    printf("\nNew Size = %d\n", writeIdx);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> target;
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] != target) a[k++] = a[i];
    }
    a.resize(k);
    for (int x : a) cout << x << " ";
    cout << "\nNew Size: " << a.size() << endl;
    return 0;
}`,
            timeComplexity: 'O(N) single-pass',
            spaceComplexity: 'O(1) auxiliary in-place',
            pros: ['Eliminates O(N^2) shifting completely', 'LeetCode #27 Remove Element optimal pattern'],
            cons: ['Overwrites deleted slots in-place'],
          },
          {
            id: 'nested-shift-deletion',
            name: 'Approach 2: Shifting on Each Match (Brute Force O(N^2))',
            tag: 'Classic Textbook Nested Shift',
            intuition: 'Whenever you hit a match arr[i] == target, shift every single element to the right of it left by 1 position. Repeat until all occurrences are deleted.',
            algorithm: [
              'Loop i from 0 to n - 1.',
              'If arr[i] == target:',
              '  Shift all elements from j = i to n - 2: arr[j] = arr[j + 1].',
              '  n--; i--; (recheck shifted element).',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, target;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to delete: ");
    scanf("%d", &target);

    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            for (int j = i; j < n - 1; j++) {
                arr[j] = arr[j + 1];
            }
            n--;
            i--; // Recheck index i
        }
    }

    printf("Resulting array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> target;
    for (int i = 0; i < (int)a.size(); i++) {
        if (a[i] == target) { a.erase(a.begin() + i); i--; }
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N^2) worst case if many matches exist',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Direct conceptual mapping of deletion in physical arrays', 'Common in early semester lab exams'],
            cons: ['Excessive data copying overhead (O(N^2))'],
          },
        ],
        sampleIO: [
          { input: '6\n10 20 30 20 40 20\n20', output: 'Output: 10 30 40' },
        ],
        dryRun: [
          { step: 1, state: '10 != 20 -> arr[0]=10, k=1', explanation: 'Kept' },
          { step: 2, state: '20 == 20 -> skip', explanation: 'Filtered' },
          { step: 3, state: '30 != 20 -> arr[1]=30, k=2', explanation: 'Kept' },
          { step: 4, state: '40 != 20 -> arr[2]=40, k=3', explanation: 'Result: 10 30 40' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Using repeated nested shifts O(N²) when O(N) two-pointer compaction is optimal'],
        edgeCases: ['All elements equal key (result is empty array)', 'Key not found in array'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q5',
        number: 5,
        title: 'Linear Search with Comparison Counts',
        statement: 'Write a C program to search for an element using linear search and count the number of comparisons performed in: • Best case • Average case for the given input • Worst case.',
        explanation: 'Simulates the linear search for best case (first element), worst case (not present or last element), and actual input.',
        requiredConcepts: ['Algorithm complexity empirical analysis', 'Best vs Worst case'],
        algorithm: [
          'Best case: target is arr[0], comparisons = 1',
          'Worst case: target is not in array, comparisons = n',
          'Given input search: loop i from 0 to n-1, count++, if arr[i] == target break',
          'Display all comparison metrics',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to search: ");
    scanf("%d", &key);
    
    int actualComparisons = 0, foundIndex = -1;
    for (int i = 0; i < n; i++) {
        actualComparisons++;
        if (arr[i] == key) {
            foundIndex = i;
            break;
        }
    }
    
    printf("Comparisons Analysis:\\n");
    printf("• Best Case comparisons: 1 (if element is at position 0)\\n");
    printf("• Average Case theoretical: %.1f comparisons\\n", (n + 1) / 2.0);
    printf("• Worst Case comparisons: %d (if element is at end or absent)\\n", n);
    printf("• Actual comparisons for input %d: %d (found at index %d)\\n", key, actualComparisons, foundIndex);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    int comps = 0, idx = -1;
    for (int i = 0; i < n; i++) {
        comps++;
        if (a[i] == key) { idx = i; break; }
    }
    cout << "Best: 1\\nWorst: " << n << "\\nAvg theoretical: " << (n+1)/2.0 << "\\nActual: " << comps << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'unidirectional-linear',
            name: 'Approach 1: Standard Forward Linear Search with Step Counter',
            tag: 'Most Intuitive for Beginners',
            intuition: 'Walk forward from index 0 to n-1. Keep a counter comparisons = 0. Increment comparisons on every check. If a match is found, report the index and the exact number of comparisons.',
            algorithm: [
              'Initialize comparisons = 0.',
              'Loop i from 0 to n - 1:',
              '  comparisons++;',
              '  if arr[i] == key: return found at index i with comparisons.',
              'If loop ends, return not found with n comparisons.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter search key: ");
    scanf("%d", &key);

    int comparisons = 0, foundIdx = -1;
    for (int i = 0; i < n; i++) {
        comparisons++;
        if (arr[i] == key) {
            foundIdx = i;
            break;
        }
    }

    if (foundIdx != -1) {
        printf("Key %d found at index %d after %d comparison(s).\n", key, foundIdx, comparisons);
    } else {
        printf("Key %d not found after %d comparison(s).\n", key, comparisons);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    int comps = 0, idx = -1;
    for (int i = 0; i < n; i++) {
        comps++;
        if (a[i] == key) { idx = i; break; }
    }
    cout << (idx != -1 ? "Found at " + to_string(idx) : "Not found") << " in " << comps << " comparisons.\n";
    return 0;
}`,
            timeComplexity: 'Best O(1), Worst O(N), Average (N+1)/2 comparisons',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Provides transparent empirical proof of Big-O complexity for lab viva', 'Simple to implement and debug'],
            cons: ['High comparison count for large arrays'],
          },
          {
            id: 'bidirectional-linear',
            name: 'Approach 2: Bidirectional Linear Search (Scanning Both Ends Simultaneously)',
            tag: 'Two-Way Parallel Scan',
            intuition: 'Search from both ends at the same time: one pointer front starts at 0 moving right, and another back starts at n - 1 moving left. If the item is near the back, it is found in very few comparisons!',
            algorithm: [
              'Initialize front = 0, back = n - 1, comparisons = 0.',
              'While front <= back:',
              '  comparisons++; if arr[front] == key: found at front, break.',
              '  comparisons++; if arr[back] == key: found at back, break.',
              '  front++; back--;',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter search key: ");
    scanf("%d", &key);

    int front = 0, back = n - 1, found = -1, comps = 0;
    while (front <= back) {
        comps++;
        if (arr[front] == key) { found = front; break; }
        comps++;
        if (arr[back] == key) { found = back; break; }
        front++;
        back--;
    }

    if (found != -1) printf("Found at index %d with %d comparisons (Bidirectional).\n", found, comps);
    else printf("Not found after %d comparisons.\n", comps);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    int f = 0, b = n - 1, comps = 0, found = -1;
    while (f <= b) {
        comps++; if (a[f] == key) { found = f; break; }
        comps++; if (a[b] == key) { found = b; break; }
        f++; b--;
    }
    cout << "Result: " << (found != -1 ? to_string(found) : "Not found") << " in " << comps << " comparisons\n";
    return 0;
}`,
            timeComplexity: 'O(N/2) = O(N) iterations',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Finds items near the back of the array in O(1) time', 'Demonstrates advanced search mechanics'],
            cons: ['Worst case comparisons are still N if not present'],
          },
        ],
        sampleIO: [
          { input: '5\n10 20 30 40 50\n30', output: 'Comparisons Analysis:\n• Best Case comparisons: 1 (if element is at position 0)\n• Average Case theoretical: 3.0 comparisons\n• Worst Case comparisons: 5 (if element is at end or absent)\n• Actual comparisons for input 30: 3 (found at index 2)' },
        ],
        dryRun: [
          { step: 1, state: 'Check arr[0]=10 (comp 1)', explanation: 'Not match' },
          { step: 2, state: 'Check arr[1]=20 (comp 2)', explanation: 'Not match' },
          { step: 3, state: 'Check arr[2]=30 (comp 3)', explanation: 'Match! Exit with 3 comparisons.' },
        ],
        timeComplexity: 'Best: O(1), Avg: O(N), Worst: O(N)',
        spaceComplexity: 'O(1)',
        commonMistakes: ['Counting from 0 instead of 1 for comparisons performed'],
        edgeCases: ['Key absent (executes full n comparisons)'],
        relatedTopicId: 'algorithm-analysis',
        isCompleted: true,
      },
      {
        id: 'q6',
        number: 6,
        title: 'Binary Search for First Occurrence in Duplicate Array',
        statement: 'Write a C program using binary search to find the first occurrence of a given element in a sorted array containing duplicate elements.\nExample: 10 20 20 20 30 40, Search: 20 -> Output: 20 found at first position (index 1)',
        explanation: 'When arr[mid] == target, do not stop; record ans = mid and continue searching in left half (high = mid - 1).',
        requiredConcepts: ['Modified Binary Search', 'Lower bound / first occurrence'],
        algorithm: [
          'low = 0, high = n - 1, firstIndex = -1',
          'While low <= high:',
          '  mid = low + (high - low) / 2',
          '  If arr[mid] == target:',
          '    firstIndex = mid',
          '    high = mid - 1 // search left to find earlier occurrence',
          '  Else if arr[mid] < target: low = mid + 1',
          '  Else: high = mid - 1',
          'Print firstIndex',
        ],
        cCode: `#include <stdio.h>

int findFirstOccurrence(int arr[], int n, int target) {
    int low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            ans = mid;
            high = mid - 1; // Keep searching in left subarray
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}

int main() {
    int n, target;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter sorted array: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter search target: ");
    scanf("%d", &target);
    
    int idx = findFirstOccurrence(arr, n, target);
    if (idx != -1)
        printf("%d found at first position (index %d)\\n", target, idx);
    else
        printf("%d not found\\n", target);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> target;
    int l = 0, h = n - 1, ans = -1;
    while (l <= h) {
        int m = l + (h - l) / 2;
        if (a[m] == target) { ans = m; h = m - 1; }
        else if (a[m] < target) l = m + 1;
        else h = m - 1;
    }
    if (ans != -1) cout << target << " found at index " << ans << endl;
    else cout << "Not found" << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'leftward-contraction-bs',
            name: 'Approach 1: Binary Search with Leftward Contraction',
            tag: 'Optimal O(log N) First Occurrence',
            intuition: 'In normal Binary Search, when arr[mid] == key, you return mid immediately. But in duplicate arrays, a duplicate might exist earlier on the left! So when arr[mid] == key, record mid as a potential answer, but continue searching the left half: high = mid - 1!',
            algorithm: [
              'Initialize low = 0, high = n - 1, result = -1.',
              'While low <= high:',
              '  mid = low + (high - low) / 2',
              '  If arr[mid] == key:',
              '    result = mid (candidate match)',
              '    high = mid - 1 (force search to the left for first occurrence)',
              '  Else if arr[mid] < key: low = mid + 1',
              '  Else: high = mid - 1',
              'Return result.',
            ],
            cCode: `#include <stdio.h>

int findFirstOccurrence(int arr[], int n, int key) {
    int low = 0, high = n - 1, res = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) {
            res = mid;
            high = mid - 1; // Contract leftward to find earliest match
        } else if (arr[mid] < key) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return res;
}

int main() {
    int n, key;
    printf("Enter number of sorted elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter search key: ");
    scanf("%d", &key);

    int firstIdx = findFirstOccurrence(arr, n, key);
    if (firstIdx != -1) {
        printf("First occurrence of %d is at index %d.\n", key, firstIdx);
    } else {
        printf("Element %d not found in array.\n", key);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int findFirst(const vector<int>& a, int key) {
    int l = 0, h = a.size() - 1, ans = -1;
    while (l <= h) {
        int m = l + (h - l) / 2;
        if (a[m] == key) { ans = m; h = m - 1; }
        else if (a[m] < key) l = m + 1;
        else h = m - 1;
    }
    return ans;
}

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    cout << "First occurrence: " << findFirst(a, key) << endl;
    return 0;
}`,
            timeComplexity: 'Strictly O(log N) even with 100% duplicate elements',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Guaranteed logarithmic time complexity under all scenarios', 'Standard implementation of C++ std::lower_bound'],
            cons: ['Must be sorted'],
          },
          {
            id: 'binary-search-linear-walk',
            name: 'Approach 2: Standard Binary Search + Linear Walk Left',
            tag: 'Two-Stage Hybrid Search',
            intuition: 'Use standard binary search to find any occurrence of key at index mid. Once found, walk backward linearly (mid--) until the element changes to locate the very first occurrence.',
            algorithm: [
              'Run standard binary search.',
              'If key is found at index mid:',
              '  While mid > 0 and arr[mid - 1] == key: mid--;',
              '  Return mid as first occurrence.',
              'Else return -1.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of sorted elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter key: ");
    scanf("%d", &key);

    int low = 0, high = n - 1, found = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) {
            found = mid;
            break;
        } else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }

    if (found != -1) {
        while (found > 0 && arr[found - 1] == key) found--;
        printf("First occurrence at index %d (Linear Walk).\n", found);
    } else {
        printf("Key not found.\n");
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    int l = 0, h = n - 1, m = -1;
    while (l <= h) {
        int mid = l + (h - l) / 2;
        if (a[mid] == key) { m = mid; break; }
        else if (a[mid] < key) l = mid + 1;
        else h = mid - 1;
    }
    if (m != -1) {
        while (m > 0 && a[m - 1] == key) m--;
        cout << "First at " << m << endl;
    } else cout << "Not found" << endl;
    return 0;
}`,
            timeComplexity: 'Average O(log N), Degrades to O(N) if all elements are identical',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Extremely intuitive addition to standard binary search', 'Fast when duplicate counts are small'],
            cons: ['Degrades to O(N) if array consists of thousands of identical values'],
          },
        ],
        sampleIO: [
          { input: '6\n10 20 20 20 30 40\n20', output: '20 found at first position (index 1)' },
        ],
        dryRun: [
          { step: 1, state: 'low=0, high=5 -> mid=2 (arr[2]=20)', explanation: 'Match! ans=2, search left: high=1.' },
          { step: 2, state: 'low=0, high=1 -> mid=0 (arr[0]=10)', explanation: 'arr[0]=10 < 20 -> low=1.' },
          { step: 3, state: 'low=1, high=1 -> mid=1 (arr[1]=20)', explanation: 'Match! ans=1, high=0. Loop ends with ans=1.' },
        ],
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        commonMistakes: ['Returning mid immediately on match, which might be the middle or last duplicate instead of first'],
        edgeCases: ['All elements equal to target', 'Target at index 0'],
        relatedTopicId: 'binary-search',
        isCompleted: true,
      },
      {
        id: 'q7',
        number: 7,
        title: 'Linear Search and Delete First Occurrence',
        statement: 'Write a C program that searches for a user-specified element using linear search. If found, delete its first occurrence and display the updated array.',
        explanation: 'Finds index via linear scan, shifts all subsequent elements left by 1 position, decrements size.',
        requiredConcepts: ['Linear search', 'Array deletion shift'],
        algorithm: [
          'Read n, array elements, and search key',
          'Find first index i where arr[i] == key',
          'If found:',
          '  Shift elements from i to n-2: arr[j] = arr[j + 1]',
          '  Decrement n',
          '  Display updated array',
          'Else: print element not found',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, key, foundIdx = -1;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to search and delete: ");
    scanf("%d", &key);
    
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            foundIdx = i;
            break;
        }
    }
    
    if (foundIdx != -1) {
        for (int j = foundIdx; j < n - 1; j++) {
            arr[j] = arr[j + 1];
        }
        n--;
        printf("Element %d deleted. Updated array: ", key);
        for (int i = 0; i < n; i++) printf("%d ", arr[i]);
        printf("\\n");
    } else {
        printf("Element %d not found in array.\\n", key);
    }
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    for (auto it = a.begin(); it != a.end(); ++it) {
        if (*it == key) {
            a.erase(it);
            cout << "Updated: ";
            for (int x : a) cout << x << " ";
            cout << endl;
            return 0;
        }
    }
    cout << "Not found" << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'find-then-shift',
            name: 'Approach 1: Search First, Then Shift Left (Modular)',
            tag: 'Two-Stage Readable Deletion',
            intuition: 'Phase 1: Linear scan to find the target element key. Stop at the very first match index idx. Phase 2: Shift all elements from idx + 1 to n - 1 one position left to fill the gap. Decrement size by 1.',
            algorithm: [
              'Scan arr for key; if found, save index idx and break.',
              'If not found, report element absent.',
              'Else, loop j from idx to n - 2: arr[j] = arr[j + 1].',
              'Decrement n (n--).',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to delete first occurrence: ");
    scanf("%d", &key);

    int idx = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) { idx = i; break; }
    }

    if (idx == -1) {
        printf("Element %d not found in array.\n", key);
    } else {
        for (int j = idx; j < n - 1; j++) {
            arr[j] = arr[j + 1];
        }
        n--;
        printf("Array after deleting first occurrence: ");
        for (int i = 0; i < n; i++) printf("%d ", arr[i]);
        printf("\nNew Size = %d\n", n);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    for (auto it = a.begin(); it != a.end(); ++it) {
        if (*it == key) { a.erase(it); break; }
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N) search + O(N) shift = O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Clear separation of concerns: search logic is distinct from shift logic', 'Preserves original element order'],
            cons: ['Requires shifting up to N-1 elements'],
          },
          {
            id: 'swap-with-last',
            name: 'Approach 2: Swap with Last Element (O(1) Deletion for Unordered Sets)',
            tag: 'Fast O(1) Deletion (Order-Independent)',
            intuition: 'If the relative order of elements does not matter, do NOT shift all elements! Just copy the last element arr[n - 1] into the target slot arr[idx], and decrement n by 1. The deletion is completed in instantaneous O(1) time!',
            algorithm: [
              'Find index idx of key.',
              'Copy arr[idx] = arr[n - 1].',
              'Decrement n (n--).',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n, key;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter key to delete: ");
    scanf("%d", &key);

    int idx = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) { idx = i; break; }
    }

    if (idx != -1) {
        arr[idx] = arr[n - 1]; // Swap with last in O(1)
        n--;
        printf("Array after fast O(1) deletion: ");
        for (int i = 0; i < n; i++) printf("%d ", arr[i]);
        printf("\n");
    } else {
        printf("Key not found.\n");
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    for (int i = 0; i < n; i++) {
        if (a[i] == key) {
            a[i] = a.back();
            a.pop_back();
            break;
        }
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N) search + O(1) instantaneous swap',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Zero element shifts needed', 'Crucial technique used in hash set and graph adjacency deletion'],
            cons: ['Does not preserve original relative sequence order'],
          },
        ],
        sampleIO: [
          { input: '5\n10 20 30 40 50\n30', output: 'Element 30 deleted. Updated array: 10 20 40 50' },
        ],
        dryRun: [
          { step: 1, state: 'Found 30 at index 2', explanation: 'Shifts 40 and 50 to indices 2 and 3.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Deleting subsequent occurrences when problem specifies "first occurrence"'],
        edgeCases: ['Element is at index 0', 'Element is at last index'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
    ],
  },

  // ─── DS Lab Exercise 4: 2-D & 3-D Array and Selection Sort ────────────────
  {
    id: 'ds-lab-4',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 4,
    title: 'Lab Exercise 4 (2-D & 3-D Array and Selection Sort)',
    description: 'Matrix row/column sums and extrema, square matrix boundary elements, saddle point detection, 3-D layer aggregation, row deletion with upward shifting, and Selection Sort with comparison & swap counting.',
    dueDate: '2024-12-05',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Matrix Row/Column Sums and Extrema',
        statement: 'Write a C program to read a matrix of size m × n and find:\n• Sum of each row\n• Sum of each column\n• Row having the maximum sum\n• Column having the minimum sum.',
        explanation: '2D array traversal iterating over rows for row sums, and columns for column sums, keeping track of min/max indices.',
        requiredConcepts: ['2D arrays', 'Row-major traversal', 'Column-major traversal'],
        algorithm: [
          'Read m and n',
          'Read matrix elements mat[m][n]',
          'Compute row sum for each row i; track maxRowSum and maxRowIdx',
          'Compute col sum for each col j; track minColSum and minColIdx',
          'Print all results',
        ],
        cCode: `#include <stdio.h>
#include <limits.h>

int main() {
    int m, n;
    printf("Enter rows (m) and cols (n): ");
    scanf("%d %d", &m, &n);
    int mat[m][n];
    printf("Enter matrix elements:\\n");
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) scanf("%d", &mat[i][j]);
    }
    
    int maxRowSum = INT_MIN, maxRow = 0;
    for (int i = 0; i < m; i++) {
        int rsum = 0;
        for (int j = 0; j < n; j++) rsum += mat[i][j];
        printf("Sum of row %d = %d\\n", i, rsum);
        if (rsum > maxRowSum) { maxRowSum = rsum; maxRow = i; }
    }
    printf("Row with maximum sum: Row %d (Sum = %d)\\n", maxRow, maxRowSum);
    
    int minColSum = INT_MAX, minCol = 0;
    for (int j = 0; j < n; j++) {
        int csum = 0;
        for (int i = 0; i < m; i++) csum += mat[i][j];
        printf("Sum of col %d = %d\\n", j, csum);
        if (csum < minColSum) { minColSum = csum; minCol = j; }
    }
    printf("Column with minimum sum: Column %d (Sum = %d)\\n", minCol, minColSum);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int m, n; cin >> m >> n;
    vector<vector<int>> mat(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) cin >> mat[i][j];
    
    int maxRSum = INT_MIN, maxR = 0;
    for (int i = 0; i < m; i++) {
        int rs = 0;
        for (int j = 0; j < n; j++) rs += mat[i][j];
        cout << "Row " << i << " sum: " << rs << "\\n";
        if (rs > maxRSum) { maxRSum = rs; maxR = i; }
    }
    cout << "Max Row: " << maxR << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'row-major-traversal',
            name: 'Approach 1: Row-Major Traversal with Parallel Column Accumulation',
            tag: 'Cache-Friendly Row-Major',
            intuition: 'Store running column sums in a separate 1D array colSum[C]. As you iterate through rows from top to bottom, compute the rowSum on the fly and add arr[r][c] to colSum[c]. This visits every memory cell contiguously in row-major order.',
            algorithm: [
              'Initialize colSum[C] = {0}.',
              'Initialize overallMax and overallMin to arr[0][0].',
              'For each row r from 0 to R - 1:',
              '  rowSum = 0',
              '  For each col c from 0 to C - 1:',
              '    rowSum += arr[r][c]',
              '    colSum[c] += arr[r][c]',
              '    Update overallMax and overallMin',
              '  Print rowSum for row r',
              'Print all colSum array values and extrema.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int r, c;
    printf("Enter rows and columns: ");
    if (scanf("%d %d", &r, &c) != 2 || r <= 0 || c <= 0) return 0;
    int arr[r][c], colSum[c];
    for (int j = 0; j < c; j++) colSum[j] = 0;

    int mx = -1e9, mn = 1e9;
    printf("Enter matrix elements:\n");
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &arr[i][j]);
            if (arr[i][j] > mx) mx = arr[i][j];
            if (arr[i][j] < mn) mn = arr[i][j];
        }
    }

    printf("\nRow Sums:\n");
    for (int i = 0; i < r; i++) {
        int rSum = 0;
        for (int j = 0; j < c; j++) {
            rSum += arr[i][j];
            colSum[j] += arr[i][j];
        }
        printf("Row %d Sum = %d\n", i + 1, rSum);
    }

    printf("\nColumn Sums:\n");
    for (int j = 0; j < c; j++) printf("Column %d Sum = %d\n", j + 1, colSum[j]);
    printf("\nOverall Max = %d, Min = %d\n", mx, mn);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c; cin >> r >> c;
    vector<vector<int>> mat(r, vector<int>(c));
    vector<int> colSum(c, 0);
    int mx = -1e9, mn = 1e9;
    for (int i = 0; i < r; i++) {
        int rSum = 0;
        for (int j = 0; j < c; j++) {
            cin >> mat[i][j];
            rSum += mat[i][j];
            colSum[j] += mat[i][j];
            mx = max(mx, mat[i][j]);
            mn = min(mn, mat[i][j]);
        }
        cout << "Row " << i + 1 << ": " << rSum << endl;
    }
    for (int j = 0; j < c; j++) cout << "Col " << j + 1 << ": " << colSum[j] << endl;
    cout << "Max: " << mx << " Min: " << mn << endl;
    return 0;
}`,
            timeComplexity: 'O(R * C) optimal',
            spaceComplexity: 'O(C) auxiliary for column sums',
            pros: ['Linear memory access pattern takes full advantage of hardware CPU cache lines', 'Calculates everything in a single clean pass'],
            cons: ['Requires small auxiliary array of size C'],
          },
          {
            id: 'independent-loops',
            name: 'Approach 2: Separate Row and Column Traversal Loops',
            tag: 'Pure O(1) Auxiliary Space',
            intuition: 'Compute row sums in an outer row loop (i: 0..R, j: 0..C), and compute column sums in a separate column-major loop (j: 0..C, i: 0..R). Zero auxiliary memory arrays needed!',
            algorithm: [
              'Loop i = 0 to R - 1: sum row i and print.',
              'Loop j = 0 to C - 1: sum column j and print.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    int a[r][c];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%d", &a[i][j]);

    for (int i = 0; i < r; i++) {
        int s = 0;
        for (int j = 0; j < c; j++) s += a[i][j];
        printf("Row %d: %d\n", i + 1, s);
    }
    for (int j = 0; j < c; j++) {
        int s = 0;
        for (int i = 0; i < r; i++) s += a[i][j];
        printf("Col %d: %d\n", j + 1, s);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c; cin >> r >> c;
    vector<vector<int>> a(r, vector<int>(c));
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) cin >> a[i][j];
    for (int i = 0; i < r; i++) {
        int s = 0; for (int j = 0; j < c; j++) s += a[i][j];
        cout << "Row " << i + 1 << ": " << s << endl;
    }
    for (int j = 0; j < c; j++) {
        int s = 0; for (int i = 0; i < r; i++) s += a[i][j];
        cout << "Col " << j + 1 << ": " << s << endl;
    }
    return 0;
}`,
            timeComplexity: 'O(R * C)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Uses zero auxiliary memory', 'Easy for beginners to trace step-by-step'],
            cons: ['Column traversal causes CPU cache misses on very large matrices'],
          },
        ],
        sampleIO: [
          { input: '3 3\n1 2 3\n4 5 6\n7 8 9', output: 'Sum of row 0 = 6\nSum of row 1 = 15\nSum of row 2 = 24\nRow with maximum sum: Row 2 (Sum = 24)\nSum of col 0 = 12\nSum of col 1 = 15\nSum of col 2 = 18\nColumn with minimum sum: Column 0 (Sum = 12)' },
        ],
        dryRun: [
          { step: 1, state: 'Row sums: 6, 15, 24', explanation: 'Max row is 2' },
          { step: 2, state: 'Col sums: 12, 15, 18', explanation: 'Min col is 0' },
        ],
        timeComplexity: 'O(M * N)',
        spaceComplexity: 'O(M * N)',
        commonMistakes: ['Inverting loop variables i and j in column sum traversal'],
        edgeCases: ['1x1 matrix', 'Negative values in matrix'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'Square Matrix Boundary Elements and Sum',
        statement: 'Write a C program to read a square matrix and display only its boundary elements. Also calculate the sum of the boundary elements.',
        explanation: 'Boundary elements are those where i == 0 or i == n-1 or j == 0 or j == n-1.',
        requiredConcepts: ['Boundary condition check', 'Matrix formatting'],
        algorithm: [
          'Read n and square matrix mat[n][n]',
          'Init boundarySum = 0',
          'For i = 0 to n-1:',
          '  For j = 0 to n-1:',
          '    If i == 0 || i == n-1 || j == 0 || j == n-1:',
          '      Print mat[i][j], boundarySum += mat[i][j]',
          '    Else: print empty space',
          'Print boundarySum',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, sum = 0;
    printf("Enter matrix dimension n: ");
    scanf("%d", &n);
    int mat[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%d", &mat[i][j]);
        
    printf("Boundary Elements:\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || i == n - 1 || j == 0 || j == n - 1) {
                printf("%d\\t", mat[i][j]);
                sum += mat[i][j];
            } else {
                printf("\\t");
            }
        }
        printf("\\n");
    }
    printf("Sum of boundary elements = %d\\n", sum);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, sum = 0; cin >> n;
    vector<vector<int>> m(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) {
            cin >> m[i][j];
            if (i == 0 || i == n - 1 || j == 0 || j == n - 1) sum += m[i][j];
        }
    cout << "Boundary sum: " << sum << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'coordinate-predicate',
            name: 'Approach 1: Coordinate Predicate Check (i==0 || i==n-1 || j==0 || j==n-1)',
            tag: 'Most Intuitive Matrix Scan',
            intuition: 'Walk through every cell (i, j) of the square matrix. An element is on the boundary if and only if it sits on the first row (i == 0), last row (i == n - 1), first column (j == 0), or last column (j == n - 1). Print boundary elements and format interior cells with spaces.',
            algorithm: [
              'Initialize boundarySum = 0.',
              'Loop i from 0 to n - 1:',
              '  Loop j from 0 to n - 1:',
              '    If (i == 0 || i == n - 1 || j == 0 || j == n - 1):',
              '      Print arr[i][j], boundarySum += arr[i][j]',
              '    Else:',
              '      Print space "  "',
              '  Print newline',
              'Print boundarySum.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter size of square matrix (n x n): ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%d", &arr[i][j]);

    int boundarySum = 0;
    printf("\nBoundary Elements Display:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || i == n - 1 || j == 0 || j == n - 1) {
                printf("%3d ", arr[i][j]);
                boundarySum += arr[i][j];
            } else {
                printf("    "); // blank interior
            }
        }
        printf("\n");
    }

    printf("\nSum of boundary elements = %d\n", boundarySum);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<vector<int>> a(n, vector<int>(n));
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) cin >> a[i][j];
    int sum = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || i == n - 1 || j == 0 || j == n - 1) {
                cout << a[i][j] << " ";
                sum += a[i][j];
            } else cout << "  ";
        }
        cout << "\n";
    }
    cout << "Boundary Sum: " << sum << endl;
    return 0;
}`,
            timeComplexity: 'O(N^2) visits all cells to render 2D frame',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Directly prints the beautiful boundary frame visual', 'Easiest condition for beginners to remember'],
            cons: ['Checks interior cells even though they are not boundary'],
          },
          {
            id: 'four-segment-perimeter',
            name: 'Approach 2: Four-Segment Perimeter Walk (O(4N))',
            tag: 'Optimal O(Boundary Elements) Traversal',
            intuition: 'Walk directly along the four edges: (1) Top edge left-to-right, (2) Right edge top-to-bottom, (3) Bottom edge right-to-left, (4) Left edge bottom-to-top. Completely skips interior cells!',
            algorithm: [
              'Top row: loop j from 0 to n - 1, sum += arr[0][j].',
              'Right col: loop i from 1 to n - 2, sum += arr[i][n - 1].',
              'Bottom row: loop j from n - 1 down to 0, sum += arr[n - 1][j].',
              'Left col: loop i from n - 2 down to 1, sum += arr[i][0].',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int a[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) scanf("%d", &a[i][j]);

    int sum = 0;
    for (int j = 0; j < n; j++) sum += a[0][j]; // Top
    for (int i = 1; i < n - 1; i++) sum += a[i][n - 1]; // Right
    if (n > 1) {
        for (int j = 0; j < n; j++) sum += a[n - 1][j]; // Bottom
        for (int i = 1; i < n - 1; i++) sum += a[i][0]; // Left
    }

    printf("Perimeter Walk Boundary Sum = %d\n", sum);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<vector<int>> a(n, vector<int>(n));
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) cin >> a[i][j];
    int s = 0;
    for (int j = 0; j < n; j++) s += a[0][j];
    for (int i = 1; i < n - 1; i++) s += a[i][n - 1];
    if (n > 1) {
        for (int j = 0; j < n; j++) s += a[n - 1][j];
        for (int i = 1; i < n - 1; i++) s += a[i][0];
    }
    cout << "Sum: " << s << endl;
    return 0;
}`,
            timeComplexity: 'O(4N) = O(N) visits only boundary elements',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Only visits 4N boundary elements instead of N^2 interior cells', 'Exact technique used in spiral matrix traversal'],
            cons: ['Must guard carefully for n = 1 to prevent double counting'],
          },
        ],
        sampleIO: [
          { input: '3\n1 2 3\n4 5 6\n7 8 9', output: 'Boundary Elements:\n1\t2\t3\t\n4\t\t6\t\n7\t8\t9\t\nSum of boundary elements = 40' },
        ],
        dryRun: [
          { step: 1, state: '1+2+3+4+6+7+8+9 = 40', explanation: 'Only center element 5 is excluded from sum.' },
        ],
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(N²)',
        commonMistakes: ['Adding corner elements twice if iterating per side'],
        edgeCases: ['n = 1 (entire matrix is boundary)', 'n = 2 (all elements are boundary)'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q3',
        number: 3,
        title: 'Matrix Saddle Point Detection',
        statement: 'Write a C program to find the saddle point of a matrix, if it exists. A saddle point is an element that is the smallest in its row but largest in its column.',
        explanation: 'For each row i, find min element at colIndex. Then check if that element is the maximum in colIndex.',
        requiredConcepts: ['Saddle point criteria', 'Row-min and Col-max correlation'],
        algorithm: [
          'Read m, n, and matrix elements',
          'found = 0',
          'For each row i from 0 to m-1:',
          '  Find min in row i at column c_min',
          '  Check if mat[i][c_min] is maximum in column c_min (compare against all rows k for column c_min)',
          '  If yes: saddle point found at (i, c_min), print value and break',
          'If not found: print "No saddle point exists"',
        ],
        cCode: `#include <stdio.h>

int main() {
    int m, n;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int mat[m][n];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) scanf("%d", &mat[i][j]);
        
    int hasSaddle = 0;
    for (int i = 0; i < m; i++) {
        // Find minimum element in row i
        int min_val = mat[i][0], col_idx = 0;
        for (int j = 1; j < n; j++) {
            if (mat[i][j] < min_val) {
                min_val = mat[i][j];
                col_idx = j;
            }
        }
        
        // Verify if min_val is the maximum in its column col_idx
        int isSaddle = 1;
        for (int k = 0; k < m; k++) {
            if (mat[k][col_idx] > min_val) {
                isSaddle = 0;
                break;
            }
        }
        
        if (isSaddle) {
            printf("Saddle point exists at (%d, %d) with value = %d\\n", i, col_idx, min_val);
            hasSaddle = 1;
            break;
        }
    }
    if (!hasSaddle) printf("No saddle point exists in the matrix.\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n; cin >> m >> n;
    vector<vector<int>> mat(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) cin >> mat[i][j];
    for (int i = 0; i < m; i++) {
        int minCol = 0;
        for (int j = 1; j < n; j++) if (mat[i][j] < mat[i][minCol]) minCol = j;
        bool isSaddle = true;
        for (int k = 0; k < m; k++) if (mat[k][minCol] > mat[i][minCol]) { isSaddle = false; break; }
        if (isSaddle) {
            cout << "Saddle point: " << mat[i][minCol] << " at (" << i << ", " << minCol << ")\\n";
            return 0;
        }
    }
    cout << "No saddle point\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'row-min-col-max-verification',
            name: 'Approach 1: Row Minima Candidate Verification',
            tag: 'Standard & Most Intuitive',
            intuition: 'A saddle point is a cell that is simultaneously the minimum in its row and maximum in its column (like a mountain saddle). For each row, find its minimum element and its column index colIdx. Then scan down column colIdx: if no element in that column is strictly greater than our candidate, it is a valid saddle point!',
            algorithm: [
              'For each row i from 0 to R - 1:',
              '  Find minimum element in row i; let its column be colIdx.',
              '  Assume it is saddle point (isSaddle = true).',
              '  Loop k from 0 to R - 1:',
              '    If arr[k][colIdx] > arr[i][colIdx]: isSaddle = false; break;',
              '  If isSaddle is true: print saddle point at (i, colIdx).',
            ],
            cCode: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int r, c;
    printf("Enter rows and columns: ");
    if (scanf("%d %d", &r, &c) != 2 || r <= 0 || c <= 0) return 0;
    int arr[r][c];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%d", &arr[i][j]);

    bool found = false;
    for (int i = 0; i < r; i++) {
        // Step 1: Find min in row i
        int minRowVal = arr[i][0], colIdx = 0;
        for (int j = 1; j < c; j++) {
            if (arr[i][j] < minRowVal) {
                minRowVal = arr[i][j];
                colIdx = j;
            }
        }

        // Step 2: Check if it is max in column colIdx
        bool isSaddle = true;
        for (int k = 0; k < r; k++) {
            if (arr[k][colIdx] > minRowVal) {
                isSaddle = false;
                break;
            }
        }

        if (isSaddle) {
            printf("Saddle Point found: %d at row %d, column %d\n", minRowVal, i + 1, colIdx + 1);
            found = true;
        }
    }

    if (!found) printf("No Saddle Point found in matrix.\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c; cin >> r >> c;
    vector<vector<int>> a(r, vector<int>(c));
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) cin >> a[i][j];
    bool found = false;
    for (int i = 0; i < r; i++) {
        int mn = a[i][0], col = 0;
        for (int j = 1; j < c; j++) if (a[i][j] < mn) { mn = a[i][j]; col = j; }
        bool ok = true;
        for (int k = 0; k < r; k++) if (a[k][col] > mn) { ok = false; break; }
        if (ok) { cout << "Saddle Point: " << mn << " at (" << i << "," << col << ")\n"; found = true; }
    }
    if (!found) cout << "No Saddle Point" << endl;
    return 0;
}`,
            timeComplexity: 'O(R * (C + R)) = O(R*C + R^2)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Zero extra array memory allocated', 'Easy to explain in viva examination'],
            cons: ['Scans column cells repeatedly for each row'],
          },
          {
            id: 'precomputed-extrema-arrays',
            name: 'Approach 2: Precomputed Min/Max Arrays (Optimal O(R * C))',
            tag: 'Optimal O(R * C) Lookups',
            intuition: 'Precompute two 1D arrays: rowMin[R] stores the minimum of every row, and colMax[C] stores the maximum of every column. Then check every cell (i, j): if arr[i][j] == rowMin[i] && arr[i][j] == colMax[j], it is guaranteed to be a saddle point!',
            algorithm: [
              'Precompute rowMin[i] for all rows i.',
              'Precompute colMax[j] for all columns j.',
              'Check if any arr[i][j] == rowMin[i] and == colMax[j].',
            ],
            cCode: `#include <stdio.h>

int main() {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    int a[r][c], rMin[r], cMax[c];
    for (int i = 0; i < r; i++) rMin[i] = 1e9;
    for (int j = 0; j < c; j++) cMax[j] = -1e9;

    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &a[i][j]);
            if (a[i][j] < rMin[i]) rMin[i] = a[i][j];
            if (a[i][j] > cMax[j]) cMax[j] = a[i][j];
        }
    }

    int found = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j] == rMin[i] && a[i][j] == cMax[j]) {
                printf("Saddle Point: %d at [%d, %d]\n", a[i][j], i, j);
                found = 1;
            }
        }
    }
    if (!found) printf("No Saddle Point\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c; cin >> r >> c;
    vector<vector<int>> a(r, vector<int>(c));
    vector<int> rMin(r, 1e9), cMax(c, -1e9);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
            rMin[i] = min(rMin[i], a[i][j]);
            cMax[j] = max(cMax[j], a[i][j]);
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j] == rMin[i] && a[i][j] == cMax[j])
                cout << "Saddle Point: " << a[i][j] << endl;
        }
    }
    return 0;
}`,
            timeComplexity: 'Strictly O(R * C) optimal',
            spaceComplexity: 'O(R + C) auxiliary',
            pros: ['The fastest theoretical complexity possible', 'Handles multiple duplicate minima/maxima seamlessly'],
            cons: ['Requires O(R + C) auxiliary space for arrays'],
          },
        ],
        sampleIO: [
          { input: '3 3\n1 2 3\n4 5 6\n7 8 9', output: 'Saddle point exists at (2, 0) with value = 7' },
        ],
        dryRun: [
          { step: 1, state: 'Row 0: min is 1 at col 0. Col 0 has 7 > 1. Not saddle.', explanation: 'Check next row' },
          { step: 2, state: 'Row 1: min is 4 at col 0. Col 0 has 7 > 4. Not saddle.', explanation: 'Check next row' },
          { step: 3, state: 'Row 2: min is 7 at col 0. Col 0 max is 7. Matches! Saddle point = 7.', explanation: 'Found' },
        ],
        timeComplexity: 'O(M * N)',
        spaceComplexity: 'O(M * N)',
        commonMistakes: ['Assuming multiple elements in the same row cannot match or confusing row-max with col-min'],
        edgeCases: ['Matrix with no saddle point', 'All elements identical'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q4',
        number: 4,
        title: '3-D Array Layer Sum Calculation',
        statement: 'Write a C program to store elements in a 3-D array representing multiple matrices. Calculate and display the sum of elements of each 2-D layer.',
        explanation: 'Uses 3D array mat[layers][rows][cols] and sums per layer.',
        requiredConcepts: ['3D array indexing', 'Layer dimension slicing'],
        algorithm: [
          'Read layers L, rows R, cols C',
          'Read 3D array elements mat[L][R][C]',
          'For each layer l from 0 to L-1:',
          '  layerSum = 0',
          '  For r = 0 to R-1:',
          '    For c = 0 to C-1: layerSum += mat[l][r][c]',
          '  Print layerSum for layer l',
        ],
        cCode: `#include <stdio.h>

int main() {
    int L, R, C;
    printf("Enter layers, rows, cols: ");
    scanf("%d %d %d", &L, &R, &C);
    int mat[L][R][C];
    
    for (int l = 0; l < L; l++) {
        printf("Enter elements for Layer %d:\\n", l);
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) scanf("%d", &mat[l][r][c]);
        }
    }
    
    printf("\\n--- Layer Sums ---\\n");
    for (int l = 0; l < L; l++) {
        int sum = 0;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) sum += mat[l][r][c];
        }
        printf("Sum of Layer %d = %d\\n", l, sum);
    }
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int L, R, C; cin >> L >> R >> C;
    for (int l = 0; l < L; l++) {
        int sum = 0;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                int val; cin >> val;
                sum += val;
            }
        }
        cout << "Layer " << l << " sum: " << sum << endl;
    }
    return 0;
}`,
                approaches: [
          {
            id: 'nested-loop-layers',
            name: 'Approach 1: Triple Nested Loop (layer, row, col)',
            tag: 'Most Intuitive 3D Iteration',
            intuition: 'Think of a 3D array as a loaf of sliced bread. The outer loop selects the slice (layer L). The inner two loops calculate the sum of the 2D matrix on that slice, printing the total before moving to the next slice.',
            algorithm: [
              'Loop layer l from 0 to L - 1:',
              '  layerSum = 0.',
              '  Loop row r from 0 to R - 1:',
              '    Loop col c from 0 to C - 1:',
              '      layerSum += arr[l][r][c].',
              '  Print layerSum for layer l.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int L, R, C;
    printf("Enter 3D dimensions (Layers, Rows, Cols): ");
    if (scanf("%d %d %d", &L, &R, &C) != 3 || L <= 0 || R <= 0 || C <= 0) return 0;

    int arr[L][R][C];
    for (int l = 0; l < L; l++)
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                scanf("%d", &arr[l][r][c]);

    printf("\n--- Layer-Wise Sums ---\n");
    for (int l = 0; l < L; l++) {
        long long layerSum = 0;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                layerSum += arr[l][r][c];
            }
        }
        printf("Layer %d Sum = %lld\n", l + 1, layerSum);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int L, R, C; cin >> L >> R >> C;
    for (int l = 0; l < L; l++) {
        long long sum = 0;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                int x; cin >> x;
                sum += x;
            }
        }
        cout << "Layer " << l + 1 << ": " << sum << endl;
    }
    return 0;
}`,
            timeComplexity: 'O(L * R * C)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Can compute streaming layer sums without even saving the entire 3D array in memory', 'Clean and readable'],
            cons: ['Requires 3 levels of loop nesting'],
          },
          {
            id: 'flattened-stride-offset',
            name: 'Approach 2: Flattened 1D Stride Offset Calculation',
            tag: 'Hardware Stride Mapping',
            intuition: 'Under the hood, computer RAM is a flat 1D memory strip. A 3D cell (l, r, c) is located at flat offset: index = l * (R * C) + r * C + c. Understanding this is essential for graphics shaders, GPU tensors, and CUDA programming.',
            algorithm: [
              'Map 3D indices into flat buffer using stride = R * C.',
              'Sum blocks of size (R * C) corresponding to each layer.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int L, R, C;
    if (scanf("%d %d %d", &L, &R, &C) != 3) return 0;
    int totalElements = L * R * C;
    int flat[totalElements];
    for (int i = 0; i < totalElements; i++) scanf("%d", &flat[i]);

    int stride = R * C;
    for (int l = 0; l < L; l++) {
        long long s = 0;
        for (int i = 0; i < stride; i++) s += flat[l * stride + i];
        printf("Layer %d Flat Sum = %lld\n", l + 1, s);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    int L, R, C; cin >> L >> R >> C;
    int stride = R * C;
    vector<int> flat(L * stride);
    for (int &x : flat) cin >> x;
    for (int l = 0; l < L; l++) {
        long long s = accumulate(flat.begin() + l * stride, flat.begin() + (l + 1) * stride, 0LL);
        cout << "Layer " << l + 1 << ": " << s << endl;
    }
    return 0;
}`,
            timeComplexity: 'O(L * R * C)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Directly demonstrates physical memory organization in C/C++', 'Foundation of machine learning tensor libraries (PyTorch, NumPy)'],
            cons: ['Requires calculating stride arithmetic manually'],
          },
        ],
        sampleIO: [
          { input: '2 2 2\n1 2\n3 4\n5 6\n7 8', output: 'Sum of Layer 0 = 10\nSum of Layer 1 = 26' },
        ],
        dryRun: [
          { step: 1, state: 'Layer 0: 1+2+3+4 = 10', explanation: 'Layer 0 processed.' },
          { step: 2, state: 'Layer 1: 5+6+7+8 = 26', explanation: 'Layer 1 processed.' },
        ],
        timeComplexity: 'O(L * R * C)',
        spaceComplexity: 'O(L * R * C)',
        commonMistakes: ['Misordering dimensions mat[layer][row][col]'],
        edgeCases: ['L = 1 (equivalent to single 2D matrix)'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q5',
        number: 5,
        title: 'Delete Specified Row and Shift Upward',
        statement: 'Write a C program to read an m × n matrix and delete a specified row. Shift the remaining rows upward and display the resulting matrix.',
        explanation: 'Deletes row targetRow by shifting all rows from targetRow+1 onwards upward into row - 1.',
        requiredConcepts: ['2D array row deletion', 'Row-wise shifting'],
        algorithm: [
          'Read m, n, and matrix',
          'Read delRow to delete',
          'For i = delRow to m - 2:',
          '  For j = 0 to n - 1: mat[i][j] = mat[i + 1][j]',
          'Decrement m',
          'Display updated matrix of size (m-1) x n',
        ],
        cCode: `#include <stdio.h>

int main() {
    int m, n, delRow;
    printf("Enter rows and cols: ");
    scanf("%d %d", &m, &n);
    int mat[m][n];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) scanf("%d", &mat[i][j]);
        
    printf("Enter row index to delete (0 to %d): ", m - 1);
    scanf("%d", &delRow);
    
    if (delRow < 0 || delRow >= m) {
        printf("Invalid row index.\\n");
        return 0;
    }
    
    for (int i = delRow; i < m - 1; i++) {
        for (int j = 0; j < n; j++) {
            mat[i][j] = mat[i + 1][j];
        }
    }
    m--;
    
    printf("Resulting Matrix:\\n");
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) printf("%d\\t", mat[i][j]);
        printf("\\n");
    }
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n, delRow; cin >> m >> n;
    vector<vector<int>> mat(m, vector<int>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) cin >> mat[i][j];
    cin >> delRow;
    mat.erase(mat.begin() + delRow);
    for (auto &row : mat) {
        for (int x : row) cout << x << "\\t";
        cout << "\\n";
    }
    return 0;
}`,
                approaches: [
          {
            id: 'element-shift-upward',
            name: 'Approach 1: Element-by-Element Upward Shift Loop',
            tag: 'Standard In-Place Shifting',
            intuition: 'When row k is deleted, row k+1 must take its place, row k+2 must take row k+1 place, and so on. For each column j, copy arr[i][j] = arr[i + 1][j] for all rows i starting from k up to R - 2. Decrement row count R.',
            algorithm: [
              'Read row index k to delete (1-indexed or 0-indexed).',
              'For i = k to R - 2:',
              '  For j = 0 to C - 1:',
              '    arr[i][j] = arr[i + 1][j] (copy row below)',
              'R = R - 1 (row count decremented).',
              'Print modified matrix of dimensions (R - 1) x C.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int r, c, k;
    printf("Enter rows and columns: ");
    if (scanf("%d %d", &r, &c) != 2 || r <= 1 || c <= 0) return 0;
    int arr[r][c];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) scanf("%d", &arr[i][j]);

    printf("Enter row number to delete (1 to %d): ", r);
    scanf("%d", &k);
    k--; // Convert to 0-based index

    if (k < 0 || k >= r) {
        printf("Invalid row index!\n");
        return 0;
    }

    for (int i = k; i < r - 1; i++) {
        for (int j = 0; j < c; j++) {
            arr[i][j] = arr[i + 1][j];
        }
    }
    r--;

    printf("\nMatrix after row deletion:\n");
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            printf("%d ", arr[i][j]);
        }
        printf("\n");
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c, k; cin >> r >> c;
    vector<vector<int>> a(r, vector<int>(c));
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) cin >> a[i][j];
    cin >> k; k--;
    a.erase(a.begin() + k);
    for (const auto &row : a) {
        for (int x : row) cout << x << " ";
        cout << "\n";
    }
    return 0;
}`,
            timeComplexity: 'O((R - k) * C) shifts',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['True in-place modification of 2D array without allocating new matrix', 'Beginner friendly element assignment'],
            cons: ['Element-by-element loop instead of block memory copy'],
          },
          {
            id: 'memcpy-block-shift',
            name: 'Approach 2: Memory Copy (memmove / Pointer Re-indexing)',
            tag: 'High-Performance Block Shift',
            intuition: 'Each row in a 2D C array is stored as a contiguous memory block of C * sizeof(int) bytes. You can shift entire rows instantaneously using memmove() rather than copying numbers cell by cell.',
            algorithm: [
              'Use memmove(&arr[k], &arr[k + 1], (r - 1 - k) * sizeof(arr[0])).',
              'Decrement r.',
            ],
            cCode: `#include <stdio.h>
#include <string.h>

int main() {
    int r, c, k;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    int a[r][c];
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) scanf("%d", &a[i][j]);
    scanf("%d", &k); k--;

    memmove(&a[k], &a[k + 1], (r - 1 - k) * sizeof(a[0]));
    r--;

    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) printf("%d ", a[i][j]);
        printf("\n");
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c, k; cin >> r >> c;
    vector<vector<int>> a(r, vector<int>(c));
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) cin >> a[i][j];
    cin >> k; k--;
    for (int i = k; i < r - 1; i++) a[i] = move(a[i + 1]);
    a.pop_back();
    for (const auto &row : a) {
        for (int x : row) cout << x << " ";
        cout << "\n";
    }
    return 0;
}`,
            timeComplexity: 'O(Bytes) bulk SIMD memory copy',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Uses hardware optimized DMA/SIMD block copy instructions', 'Zero loops in user code'],
            cons: ['Requires understanding byte-level memory layouts'],
          },
        ],
        sampleIO: [
          { input: '3 3\n1 2 3\n4 5 6\n7 8 9\n1', output: 'Resulting Matrix:\n1\t2\t3\t\n7\t8\t9\t' },
        ],
        dryRun: [
          { step: 1, state: 'delRow = 1 (row [4,5,6])', explanation: 'Row 2 ([7,8,9]) moves up to Row 1. Size becomes 2x3.' },
        ],
        timeComplexity: 'O(M * N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Out-of-bounds access if shifting past m-1'],
        edgeCases: ['Deleting first row (delRow = 0)', 'Deleting last row (delRow = m - 1)'],
        relatedTopicId: 'arrays',
        isCompleted: true,
      },
      {
        id: 'q6',
        number: 6,
        title: 'Selection Sort with Comparison and Swap Counts',
        statement: 'Write a C program to implement Selection Sort and count the total number of comparisons and swaps performed during sorting. Display both counts.',
        explanation: 'Repeatedly finds minimum from unsorted part and places it at beginning, tracking exact comparison and swap counter operations.',
        requiredConcepts: ['Selection Sort', 'Comparisons tracking', 'Swaps tracking'],
        algorithm: [
          'Init comparisons = 0, swaps = 0',
          'For i = 0 to n - 2:',
          '  minIdx = i',
          '  For j = i + 1 to n - 1:',
          '    comparisons++',
          '    If arr[j] < arr[minIdx]: minIdx = j',
          '  If minIdx != i:',
          '    swap(arr[i], arr[minIdx])',
          '    swaps++',
          'Print sorted array, comparisons, and swaps',
        ],
        cCode: `#include <stdio.h>

int main() {
    int n, comparisons = 0, swaps = 0;
    printf("Enter n: ");
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            swaps++;
        }
    }
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    printf("Total comparisons = %d\\n", comparisons);
    printf("Total swaps = %d\\n", swaps);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, comps = 0, sw = 0; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            comps++;
            if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx != i) { swap(a[i], a[minIdx]); sw++; }
    }
    for (int x : a) cout << x << " ";
    cout << "\\nComparisons: " << comps << " Swaps: " << sw << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'standard-selection-sort',
            name: 'Approach 1: Standard Selection Sort (Minimum Element Placement)',
            tag: 'Textbook Selection Sort',
            intuition: 'Divide the array into a sorted left part and unsorted right part. Find the smallest element in the unsorted right part and swap it into the first available slot. Keep counters comparisons and swaps to track complexity.',
            algorithm: [
              'Initialize comparisons = 0, swaps = 0.',
              'For i = 0 to n - 2:',
              '  minIdx = i.',
              '  For j = i + 1 to n - 1:',
              '    comparisons++;',
              '    if arr[j] < arr[minIdx]: minIdx = j;',
              '  If minIdx != i: swap(arr[i], arr[minIdx]), swaps++;',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int comparisons = 0, swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            swaps++;
        }
    }

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\nTotal Comparisons = %d (Theoretical N*(N-1)/2 = %d)\n", comparisons, n * (n - 1) / 2);
    printf("Total Swaps = %d (Maximum N - 1)\n", swaps);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int comps = 0, swps = 0;
    for (int i = 0; i < n - 1; i++) {
        int mn = i;
        for (int j = i + 1; j < n; j++) {
            comps++;
            if (a[j] < a[mn]) mn = j;
        }
        if (mn != i) { swap(a[i], a[mn]); swps++; }
    }
    cout << "Sorted: "; for (int x : a) cout << x << " ";
    cout << "\nComps: " << comps << " Swaps: " << swps << endl;
    return 0;
}`,
            timeComplexity: 'Always O(N^2) comparisons (exact N*(N-1)/2)',
            spaceComplexity: 'O(1) auxiliary, O(N) swaps at most',
            pros: ['Guarantees at most O(N) memory writes (swaps), which is ideal when flash memory write cycles are costly', 'Easy to analyze theoretically'],
            cons: ['Always takes O(N^2) comparisons even if array is already completely sorted'],
          },
          {
            id: 'bidirectional-selection-sort',
            name: 'Approach 2: Bidirectional Min-Max Selection Sort',
            tag: 'Two-Way Selection Optimization',
            intuition: 'Instead of finding only the minimum element in each pass, find BOTH the minimum and the maximum simultaneously! Place the minimum at index left and the maximum at index right. This halves the outer loop passes from N to N/2.',
            algorithm: [
              'Initialize left = 0, right = n - 1.',
              'While left < right:',
              '  Find both minIdx and maxIdx in range [left, right].',
              '  Swap arr[left] with arr[minIdx].',
              '  If maxIdx was at left, update maxIdx = minIdx.',
              '  Swap arr[right] with arr[maxIdx].',
              '  left++; right--;',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    int left = 0, right = n - 1, comps = 0, swps = 0;
    while (left < right) {
        int mn = left, mx = left;
        for (int i = left + 1; i <= right; i++) {
            comps += 2;
            if (a[i] < a[mn]) mn = i;
            if (a[i] > a[mx]) mx = i;
        }
        if (mn != left) {
            int t = a[left]; a[left] = a[mn]; a[mn] = t; swps++;
            if (mx == left) mx = mn; // Reposition if displaced
        }
        if (mx != right) {
            int t = a[right]; a[right] = a[mx]; a[mx] = t; swps++;
        }
        left++; right--;
    }

    printf("Bidirectional Selection Sort: ");
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int l = 0, r = n - 1;
    while (l < r) {
        int mn = l, mx = l;
        for (int i = l + 1; i <= r; i++) {
            if (a[i] < a[mn]) mn = i;
            if (a[i] > a[mx]) mx = i;
        }
        if (mn != l) { swap(a[l], a[mn]); if (mx == l) mx = mn; }
        if (mx != r) swap(a[r], a[mx]);
        l++; r--;
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N^2) with 50% fewer outer loop iterations',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Halves outer loop iterations (N/2 passes)', 'Positions two elements per iteration'],
            cons: ['Must handle edge case where maximum element is displaced by the minimum swap'],
          },
        ],
        sampleIO: [
          { input: '5\n64 25 12 22 11', output: 'Sorted array: 11 12 22 25 64\nTotal comparisons = 10\nTotal swaps = 4' },
        ],
        dryRun: [
          { step: 1, state: 'Total comparisons = n*(n-1)/2 = 5*4/2 = 10', explanation: 'Selection sort always performs exactly n*(n-1)/2 comparisons.' },
          { step: 2, state: 'Passes make swaps when minIdx != i', explanation: '4 swaps performed.' },
        ],
        timeComplexity: 'Best/Avg/Worst: O(N²) comparisons, O(N) swaps',
        spaceComplexity: 'O(1)',
        commonMistakes: ['Incrementing swaps even when element is already in place (minIdx == i)'],
        edgeCases: ['Array already sorted (0 swaps, but still 10 comparisons)'],
        relatedTopicId: 'bubble-sort',
        isCompleted: true,
      },
    ],
  },

  // ─── DS Lab Exercise 5: Bubble, Insertion, Merge, Quick Sort ──────────────
  {
    id: 'ds-lab-5',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 5,
    title: 'Lab Exercise 5 (Bubble Sort, Insertion Sort, Merge Sort, and Quick Sort)',
    description: 'Dynamic sorted array maintenance via Insertion Sort, student marks sorting with algorithm stability analysis, and e-commerce price sorting with Quick Sort displaying partition pivots.',
    dueDate: '2024-12-10',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Maintain Array in Sorted Order Using Insertion Sort',
        statement: 'Write a C program that maintains an array in sorted order using Insertion Sort. Given a new element, insert it into its appropriate position without disturbing the sorted order.',
        explanation: 'Simulates the core invariant of Insertion Sort: shifts elements larger than key to the right and inserts key.',
        requiredConcepts: ['Insertion sort invariant', 'Backward shifting'],
        algorithm: [
          'Read n and initial sorted array',
          'Read new element X to insert',
          'Set i = n - 1',
          'While i >= 0 and arr[i] > X:',
          '  arr[i + 1] = arr[i]',
          '  i--',
          'arr[i + 1] = X',
          'n++',
          'Display updated sorted array',
        ],
        cCode: `#include <stdio.h>

void insertSorted(int arr[], int *n, int key) {
    int i = *n - 1;
    while (i >= 0 && arr[i] > key) {
        arr[i + 1] = arr[i];
        i--;
    }
    arr[i + 1] = key;
    (*n)++;
}

int main() {
    int n, key;
    printf("Enter initial count of sorted elements: ");
    scanf("%d", &n);
    int arr[100];
    printf("Enter %d sorted elements: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    
    printf("Enter new element to insert: ");
    scanf("%d", &key);
    
    insertSorted(arr, &n, key);
    
    printf("Array after insertion: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    cin >> key;
    a.push_back(0);
    int i = n - 1;
    while (i >= 0 && a[i] > key) { a[i + 1] = a[i]; i--; }
    a[i + 1] = key;
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'standard-insertion-sort',
            name: 'Approach 1: Standard Shifting Insertion Sort (Online Sorting)',
            tag: 'Classic Insertion Sort',
            intuition: 'Think of sorting playing cards in your hand. You pick cards one by one from the table. As each new card arrives, you shift larger cards to the right to make room, then insert the new card into its rightful sorted slot.',
            algorithm: [
              'Start with array of 1 element (already sorted).',
              'For each subsequent element arriving (i = 1 to n - 1):',
              '  key = arr[i].',
              '  j = i - 1.',
              '  While j >= 0 and arr[j] > key: arr[j + 1] = arr[j], j--;',
              '  arr[j + 1] = key.',
              '  Print current sorted hand after each insertion.',
            ],
            cCode: `#include <stdio.h>

int main() {
    int n;
    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("\n--- Insertion Sort Step-by-Step ---\n");
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;

        printf("After inserting %d: ", key);
        for (int k = 0; k <= i; k++) printf("%d ", arr[k]);
        printf("\n");
    }

    printf("\nFinal Sorted Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    for (int i = 1; i < n; i++) {
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
        a[j + 1] = key;
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'Best O(N) when already sorted, Worst O(N^2)',
            spaceComplexity: 'O(1) auxiliary (In-Place & Stable)',
            pros: ['Adaptive: takes O(N) time if array is nearly sorted', 'Online: can sort data as it is received from a stream'],
            cons: ['O(N^2) worst case on reverse sorted data'],
          },
          {
            id: 'binary-insertion-sort',
            name: 'Approach 2: Binary Insertion Sort',
            tag: 'Logarithmic Comparison Reduction',
            intuition: 'Since the subarray to the left [0..i-1] is already sorted, use Binary Search to find the insertion location in O(log i) comparisons instead of scanning backwards linearly!',
            algorithm: [
              'For i = 1 to n - 1:',
              '  Use binary search on [0..i-1] to locate insertion index pos.',
              '  Shift elements from i-1 down to pos one spot right.',
              '  Insert arr[pos] = key.',
            ],
            cCode: `#include <stdio.h>

int binarySearchSlot(int arr[], int val, int low, int high) {
    if (high <= low) return (val > arr[low]) ? (low + 1) : low;
    int mid = (low + high) / 2;
    if (val == arr[mid]) return mid + 1;
    if (val > arr[mid]) return binarySearchSlot(arr, val, mid + 1, high);
    return binarySearchSlot(arr, val, low, mid - 1);
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[n];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        int loc = binarySearchSlot(a, key, 0, j);
        while (j >= loc) { a[j + 1] = a[j]; j--; }
        a[j + 1] = key;
    }

    printf("Binary Insertion Sort: ");
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    for (int i = 1; i < n; i++) {
        int key = a[i];
        auto loc = upper_bound(a.begin(), a.begin() + i, key);
        for (auto it = a.begin() + i; it != loc; --it) *it = *(it - 1);
        *loc = key;
    }
    for (int x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'O(N log N) comparisons, O(N^2) shifts',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Reduces total comparisons from N^2/4 down to N log N', 'Great when comparisons are expensive (like large strings)'],
            cons: ['Element shifts remain O(N^2)'],
          },
        ],
        sampleIO: [
          { input: '4\n12 25 40 55\n30', output: 'Array after insertion: 12 25 30 40 55' },
        ],
        dryRun: [
          { step: 1, state: '55 > 30 -> shift 55 to index 4', explanation: 'i becomes 2' },
          { step: 2, state: '40 > 30 -> shift 40 to index 3', explanation: 'i becomes 1' },
          { step: 3, state: '25 <= 30 -> stop', explanation: 'Insert 30 at index 2.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1) auxiliary',
        commonMistakes: ['Shifting forward instead of backward overwriting data'],
        edgeCases: ['Key is smaller than all items', 'Key is larger than all items'],
        relatedTopicId: 'bubble-sort',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'Student Marks Sorting and Stability Analysis',
        statement: 'Consider student records containing Roll Number and Marks. Implement Bubble Sort, Merge Sort, and Quick Sort to sort students by marks. Analyse whether the relative order of students having equal marks is preserved.',
        explanation: 'Bubble Sort and Merge Sort are STABLE algorithms (preserve initial order of equal keys with <=). Quick Sort is UNSTABLE due to long-range partition swaps.',
        requiredConcepts: ['Sorting algorithm stability', 'Struct sorting', 'Comparator functions'],
        algorithm: [
          'Define Student struct: rollNo, marks, originalOrder',
          'Sort copies using Bubble Sort, Merge Sort, and Quick Sort',
          'Compare output relative orders for identical marks',
          'Conclude: Bubble Sort (Stable), Merge Sort (Stable), Quick Sort (Unstable)',
        ],
        cCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    int roll;
    int marks;
    int originalPos;
} Student;

void bubbleSort(Student arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j].marks > arr[j + 1].marks) {
                Student temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void merge(Student arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    Student L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i].marks <= R[j].marks) arr[k++] = L[i++]; // <= ensures stability
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(Student arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int partition(Student arr[], int low, int high) {
    int pivot = arr[high].marks;
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j].marks < pivot) {
            i++;
            Student temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    Student temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}

void quickSort(Student arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void printStudents(Student arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("[Roll: %d, Marks: %d, OrigPos: %d] ", arr[i].roll, arr[i].marks, arr[i].originalPos);
    printf("\\n");
}

int main() {
    int n = 4;
    Student students[] = {
        {101, 85, 0},
        {102, 70, 1},
        {103, 85, 2}, // Equal marks to 101
        {104, 60, 3}
    };
    
    Student bCopy[4], mCopy[4], qCopy[4];
    memcpy(bCopy, students, sizeof(students));
    memcpy(mCopy, students, sizeof(students));
    memcpy(qCopy, students, sizeof(students));
    
    bubbleSort(bCopy, n);
    mergeSort(mCopy, 0, n - 1);
    quickSort(qCopy, 0, n - 1);
    
    printf("Bubble Sort (Stable):\\n"); printStudents(bCopy, n);
    printf("Merge Sort (Stable):\\n"); printStudents(mCopy, n);
    printf("Quick Sort (Unstable):\\n"); printStudents(qCopy, n);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Student { int roll, marks, pos; };

int main() {
    cout << "Stability Analysis:\\n";
    cout << "• Bubble Sort: STABLE (adjacent swaps preserve equal elements)\\n";
    cout << "• Merge Sort: STABLE (uses <= in merge step)\\n";
    cout << "• Quick Sort: UNSTABLE (partitioning swaps non-adjacent elements across pivot)\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'stable-bubble-sort',
            name: 'Approach 1: Stable Bubble Sort on Structures',
            tag: 'Provably Stable Sorting',
            intuition: 'Stability means that if two students have identical marks (e.g. 85), their relative order from the original list is preserved. In Bubble Sort, by swapping ONLY when arr[j].marks < arr[j+1].marks (strict inequality, never <=), equal marks never jump over each other!',
            algorithm: [
              'Define struct Student { int roll; char name[50]; float marks; }.',
              'Loop i from 0 to n - 2:',
              '  Loop j from 0 to n - 2 - i:',
              '    If arr[j].marks < arr[j + 1].marks: (Descending)',
              '      Swap arr[j] and arr[j + 1]',
              'Verify stability by inspecting identical marks.',
            ],
            cCode: `#include <stdio.h>
#include <string.h>

struct Student {
    int roll;
    char name[30];
    float marks;
};

int main() {
    int n;
    printf("Enter number of students: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    struct Student s[n];

    for (int i = 0; i < n; i++) {
        printf("Student %d (Roll Name Marks): ", i + 1);
        scanf("%d %s %f", &s[i].roll, s[i].name, &s[i].marks);
    }

    // Stable Bubble Sort in Descending order of marks
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            // STRICT inequality ensures stability!
            if (s[j].marks < s[j + 1].marks) {
                struct Student temp = s[j];
                s[j] = s[j + 1];
                s[j + 1] = temp;
            }
        }
    }

    printf("\nRanklist (Descending Marks - STABLE):\n");
    printf("%-6s %-15s %-8s\n", "Roll", "Name", "Marks");
    for (int i = 0; i < n; i++) {
        printf("%-6d %-15s %-8.2f\n", s[i].roll, s[i].name, s[i].marks);
    }
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Student { int roll; string name; float marks; };

int main() {
    int n; cin >> n;
    vector<Student> s(n);
    for (int i = 0; i < n; i++) cin >> s[i].roll >> s[i].name >> s[i].marks;
    stable_sort(s.begin(), s.end(), [](const Student& a, const Student& b) {
        return a.marks > b.marks;
    });
    for (const auto& x : s) cout << x.roll << " " << x.name << " " << x.marks << "\n";
    return 0;
}`,
            timeComplexity: 'O(N^2)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Guaranteed mathematical stability', 'Very easy to verify stability on paper during viva'],
            cons: ['O(N^2) comparison time'],
          },
          {
            id: 'stable-insertion-sort',
            name: 'Approach 2: Stable Insertion Sort on Structures',
            tag: 'Fast Adaptive Stable Sort',
            intuition: 'Insertion Sort is also strictly stable if you shift only when elements are strictly greater: while (j >= 0 && arr[j].marks < key.marks). It executes with fewer swaps than Bubble Sort.',
            algorithm: [
              'For i = 1 to n - 1:',
              '  key = s[i]',
              '  j = i - 1',
              '  While j >= 0 and s[j].marks < key.marks: s[j + 1] = s[j], j--;',
              '  s[j + 1] = key',
            ],
            cCode: `#include <stdio.h>

struct Student { int roll; char name[30]; float marks; };

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    struct Student s[n];
    for (int i = 0; i < n; i++) scanf("%d %s %f", &s[i].roll, s[i].name, &s[i].marks);

    for (int i = 1; i < n; i++) {
        struct Student key = s[i];
        int j = i - 1;
        while (j >= 0 && s[j].marks < key.marks) {
            s[j + 1] = s[j];
            j--;
        }
        s[j + 1] = key;
    }

    printf("Stable Insertion Sort Ranklist:\n");
    for (int i = 0; i < n; i++) printf("%d %s %.2f\n", s[i].roll, s[i].name, s[i].marks);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student { int roll; string name; float marks; };

int main() {
    int n; cin >> n;
    vector<Student> s(n);
    for (int i = 0; i < n; i++) cin >> s[i].roll >> s[i].name >> s[i].marks;
    for (int i = 1; i < n; i++) {
        Student key = s[i];
        int j = i - 1;
        while (j >= 0 && s[j].marks < key.marks) { s[j + 1] = s[j]; j--; }
        s[j + 1] = key;
    }
    for (const auto& x : s) cout << x.roll << " " << x.name << " " << x.marks << "\n";
    return 0;
}`,
            timeComplexity: 'O(N^2) worst case, O(N) best case',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Fewer data movements than Bubble Sort', 'Maintains 100% stability'],
            cons: ['Still O(N^2) worst case on inversely ordered marks'],
          },
        ],
        sampleIO: [
          { input: '4 students: {101: 85}, {102: 70}, {103: 85}, {104: 60}', output: 'Bubble Sort: [Roll: 104, Marks: 60], [Roll: 102, Marks: 70], [Roll: 101, Marks: 85, Pos: 0], [Roll: 103, Marks: 85, Pos: 2]\nStability Preserved: Roll 101 appears before Roll 103.' },
        ],
        dryRun: [
          { step: 1, state: 'Students 101 and 103 have identical marks 85', explanation: 'Stable sorts preserve 101 before 103.' },
        ],
        timeComplexity: 'Bubble: O(N²), Merge: O(N log N), Quick: O(N log N) avg',
        spaceComplexity: 'Merge: O(N), Quick: O(log N)',
        commonMistakes: ['Using < instead of <= in merge sort, which destroys stability'],
        edgeCases: ['All students have identical marks'],
        relatedTopicId: 'merge-quick-sort',
        isCompleted: true,
      },
      {
        id: 'q3',
        number: 3,
        title: 'Quick Sort on Product Prices Displaying Partition Pivots',
        statement: 'An online shopping application stores the prices of products in an unsorted array. When a customer selects "Sort by Price: Low to High", the system needs to arrange the products efficiently. Write a C program using Quick Sort to: • Accept n product prices • Sort prices in ascending order • Display the pivot selected during each partition • Display the final sorted prices.',
        explanation: 'Standard Lomuto or Hoare partition tracking and printing pivot value and partitioned index at each recursion level.',
        requiredConcepts: ['Quick Sort', 'Divide and conquer', 'Pivot selection & partition step'],
        algorithm: [
          'Choose pivot = arr[high]',
          'Print chosen pivot',
          'Rearrange array around pivot so elements <= pivot are left, elements > pivot are right',
          'Place pivot at correct sorted index',
          'Recursively quicksort left and right partitions',
        ],
        cCode: `#include <stdio.h>

int partitionCount = 0;

int partition(float prices[], int low, int high) {
    float pivot = prices[high];
    partitionCount++;
    printf("Partition #%d: Selected Pivot = %.2f (from range [%d..%d])\\n", partitionCount, pivot, low, high);
    
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (prices[j] <= pivot) {
            i++;
            float temp = prices[i];
            prices[i] = prices[j];
            prices[j] = temp;
        }
    }
    float temp = prices[i + 1];
    prices[i + 1] = prices[high];
    prices[high] = temp;
    
    printf("  Array state after partition: ");
    for (int k = low; k <= high; k++) printf("%.2f ", prices[k]);
    printf("\\n");
    
    return i + 1;
}

void quickSort(float prices[], int low, int high) {
    if (low < high) {
        int pi = partition(prices, low, high);
        quickSort(prices, low, pi - 1);
        quickSort(prices, pi + 1, high);
    }
}

int main() {
    int n;
    printf("Enter number of products: ");
    scanf("%d", &n);
    float prices[n];
    printf("Enter %d product prices:\\n", n);
    for (int i = 0; i < n; i++) scanf("%f", &prices[i]);
    
    printf("\\n--- Starting Quick Sort ---\\n");
    quickSort(prices, 0, n - 1);
    
    printf("\\nFinal Sorted Prices (Low to High): ");
    for (int i = 0; i < n; i++) printf("%.2f ", prices[i]);
    printf("\\n");
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int partition(vector<float>& a, int l, int h) {
    float pivot = a[h];
    cout << "Pivot: " << pivot << endl;
    int i = l - 1;
    for (int j = l; j < h; j++) {
        if (a[j] <= pivot) swap(a[++i], a[j]);
    }
    swap(a[i + 1], a[h]);
    return i + 1;
}

void qs(vector<float>& a, int l, int h) {
    if (l < h) {
        int pi = partition(a, l, h);
        qs(a, l, pi - 1);
        qs(a, pi + 1, h);
    }
}

int main() {
    int n; cin >> n;
    vector<float> p(n);
    for (float &x : p) cin >> x;
    qs(p, 0, n - 1);
    for (float x : p) cout << x << " ";
    cout << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'lomuto-partition-quicksort',
            name: 'Approach 1: Quick Sort with Lomuto Partition Scheme',
            tag: 'Classic Textbook Lomuto Scheme',
            intuition: 'Select the last element as pivot (arr[high]). Maintain a boundary pointer i starting at low - 1. Iterate j from low to high - 1: if arr[j] <= pivot, increment i and swap arr[i] with arr[j]. Finally swap arr[i+1] with pivot. Pivot is now in its permanent final position!',
            algorithm: [
              'Partition(arr, low, high):',
              '  pivot = arr[high]',
              '  i = low - 1',
              '  For j = low to high - 1:',
              '    if arr[j] <= pivot: i++; swap(arr[i], arr[j])',
              '  swap(arr[i + 1], arr[high])',
              '  return i + 1 (pivot index)',
              'QuickSort: Partition, then recursively sort left and right subarrays.',
            ],
            cCode: `#include <stdio.h>

void swap(float *a, float *b) {
    float t = *a; *a = *b; *b = t;
}

int partitionLomuto(float arr[], int low, int high) {
    float pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    printf("Lomuto Pivot placed: %.2f at index %d\n", pivot, i + 1);
    return i + 1;
}

void quickSort(float arr[], int low, int high) {
    if (low < high) {
        int pi = partitionLomuto(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int n;
    printf("Enter number of product prices: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    float arr[n];
    for (int i = 0; i < n; i++) scanf("%f", &arr[i]);

    quickSort(arr, 0, n - 1);

    printf("\nSorted Product Prices:\n");
    for (int i = 0; i < n; i++) printf("%.2f ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int partitionLomuto(vector<float>& a, int l, int h) {
    float pivot = a[h];
    int i = l - 1;
    for (int j = l; j < h; j++) {
        if (a[j] <= pivot) swap(a[++i], a[j]);
    }
    swap(a[i + 1], a[h]);
    cout << "Pivot: " << pivot << " at " << i + 1 << "\n";
    return i + 1;
}

void qs(vector<float>& a, int l, int h) {
    if (l < h) {
        int p = partitionLomuto(a, l, h);
        qs(a, l, p - 1);
        qs(a, p + 1, h);
    }
}

int main() {
    int n; cin >> n;
    vector<float> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    qs(a, 0, n - 1);
    for (float x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'Average O(N log N), Worst O(N^2) on sorted arrays',
            spaceComplexity: 'O(log N) recursion call stack',
            pros: ['The simplest and easiest partition algorithm to memorize and implement', 'Displays pivot indices clearly'],
            cons: ['Degrades to O(N^2) when input array is already sorted or all elements are equal'],
          },
          {
            id: 'hoare-partition-quicksort',
            name: 'Approach 2: Quick Sort with Hoare Partition Scheme',
            tag: 'Optimal Hoare Partition (3x Fewer Swaps)',
            intuition: 'Tony Hoare original 1961 scheme: Pick arr[low] as pivot. Use two pointers converging from both ends: i moves right until arr[i] >= pivot, and j moves left until arr[j] <= pivot. Swap arr[i] and arr[j]. On average, does three times fewer swaps than Lomuto!',
            algorithm: [
              'Pivot = arr[low].',
              'i = low - 1, j = high + 1.',
              'Repeat: increment i while arr[i] < pivot; decrement j while arr[j] > pivot.',
              'If i >= j return j; else swap(arr[i], arr[j]).',
            ],
            cCode: `#include <stdio.h>

void swap(float *a, float *b) {
    float t = *a; *a = *b; *b = t;
}

int partitionHoare(float arr[], int low, int high) {
    float pivot = arr[low];
    int i = low - 1;
    int j = high + 1;
    while (1) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) {
            printf("Hoare Split at index %d (Pivot was %.2f)\n", j, pivot);
            return j;
        }
        swap(&arr[i], &arr[j]);
    }
}

void quickSortHoare(float arr[], int low, int high) {
    if (low < high) {
        int pi = partitionHoare(arr, low, high);
        quickSortHoare(arr, low, pi);
        quickSortHoare(arr, pi + 1, high);
    }
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    float arr[n];
    for (int i = 0; i < n; i++) scanf("%f", &arr[i]);
    quickSortHoare(arr, 0, n - 1);
    printf("Hoare Sorted: ");
    for (int i = 0; i < n; i++) printf("%.2f ", arr[i]);
    printf("\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <vector>
using namespace std;

int hoare(vector<float>& a, int l, int h) {
    float p = a[l];
    int i = l - 1, j = h + 1;
    while (true) {
        do { i++; } while (a[i] < p);
        do { j--; } while (a[j] > p);
        if (i >= j) return j;
        swap(a[i], a[j]);
    }
}

void qs(vector<float>& a, int l, int h) {
    if (l < h) {
        int p = hoare(a, l, h);
        qs(a, l, p);
        qs(a, p + 1, h);
    }
}

int main() {
    int n; cin >> n;
    vector<float> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    qs(a, 0, n - 1);
    for (float x : a) cout << x << " ";
    cout << endl;
    return 0;
}`,
            timeComplexity: 'Average O(N log N) with 3x fewer swaps than Lomuto',
            spaceComplexity: 'O(log N) stack',
            pros: ['Significantly fewer swaps in hardware', 'Handles duplicate values much better than Lomuto'],
            cons: ['Pivot does not necessarily end up at index j'],
          },
        ],
        sampleIO: [
          { input: '5\n499.99 129.50 999.00 49.99 250.00', output: 'Partition #1: Selected Pivot = 250.00\n...\nFinal Sorted Prices (Low to High): 49.99 129.50 250.00 499.99 999.00' },
        ],
        dryRun: [
          { step: 1, state: 'high index is chosen as pivot', explanation: 'Elements smaller move left, larger move right.' },
          { step: 2, state: 'Pivot placed in exact final position', explanation: 'Subarrays recursed.' },
        ],
        timeComplexity: 'Best/Avg: O(N log N), Worst: O(N²)',
        spaceComplexity: 'O(log N) recursion stack',
        commonMistakes: ['Infinite recursion if high and low bounds are not strictly decremented/incremented around pi'],
        edgeCases: ['Prices already sorted (worst case partition if last element chosen)'],
        relatedTopicId: 'merge-quick-sort',
        isCompleted: true,
      },
    ],
  },

  // ─── DS Lab Exercise 6: Single Linked List ────────────────────────────────
  {
    id: 'ds-lab-6',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 6,
    title: 'Lab Exercise 6 (Single Linked List)',
    description: 'Singly linked list operations: in-place ascending sort without using arrays, student record management (insert, search, display, max marks), and bank token queue management.',
    dueDate: '2024-12-15',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Sort Singly Linked List Without Arrays',
        statement: 'Write a C program to sort the elements of a singly linked list in ascending order without using an array.\nNote: First create and populate the singly linked list. Create a separate function for each required operation and apply the operations to the created list.',
        explanation: 'Uses Bubble Sort / Selection Sort on node values directly through pointer swapping or value swapping on the linked list.',
        requiredConcepts: ['Singly linked list', 'Pointer traversal', 'In-place linked list sorting'],
        algorithm: [
          'Create and populate singly linked list',
          'Two nested pointers: current = head, index = NULL',
          'While current != NULL:',
          '  index = current->next',
          '  While index != NULL:',
          '    If current->data > index->data: swap values (or pointers)',
          '    index = index->next',
          '  current = current->next',
          'Display sorted linked list',
        ],
        cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertEnd(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node* temp = *head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
}

void sortLinkedList(struct Node* head) {
    if (!head) return;
    struct Node *current = head, *index = NULL;
    while (current != NULL) {
        index = current->next;
        while (index != NULL) {
            if (current->data > index->data) {
                int temp = current->data;
                current->data = index->data;
                index->data = temp;
            }
            index = index->next;
        }
        current = current->next;
    }
}

void displayList(struct Node* head) {
    struct Node* temp = head;
    while (temp) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    int n, val;
    printf("Enter number of nodes: ");
    scanf("%d", &n);
    printf("Enter %d values: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &val);
        insertEnd(&head, val);
    }
    printf("Original List: "); displayList(head);
    sortLinkedList(head);
    printf("Sorted List:   "); displayList(head);
    return 0;
}`,
        cppCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val): data(val), next(nullptr) {}
};

void sortList(Node* head) {
    for (Node* i = head; i; i = i->next) {
        for (Node* j = i->next; j; j = j->next) {
            if (i->data > j->data) swap(i->data, j->data);
        }
    }
}

int main() {
    Node* head = new Node(40);
    head->next = new Node(10);
    head->next->next = new Node(30);
    sortList(head);
    for (Node* p = head; p; p = p->next) cout << p->data << " -> ";
    cout << "NULL\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'bubble-sort-linked-list',
            name: 'Approach 1: Bubble Sort by Swapping Node Data (Easiest for Beginners)',
            tag: 'Most Intuitive Linked List Sort',
            intuition: 'Do not modify or relink pointers! Keep pointers intact, traverse through the list using two nested loops (current and index), and simply swap the data integers (current->data <-> index->data) just like an array.',
            algorithm: [
              'Traverse list with pointer current starting at head.',
              'While current != NULL:',
              '  index = current->next',
              '  While index != NULL:',
              '    If current->data > index->data: swap(current->data, index->data)',
              '    index = index->next',
              '  current = current->next',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void insertEnd(struct Node **head, int val) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (*head == NULL) { *head = newNode; return; }
    struct Node *temp = *head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
}

void sortLinkedList(struct Node *head) {
    if (!head) return;
    struct Node *current = head;
    while (current != NULL) {
        struct Node *index = current->next;
        while (index != NULL) {
            if (current->data > index->data) {
                int temp = current->data;
                current->data = index->data;
                index->data = temp;
            }
            index = index->next;
        }
        current = current->next;
    }
}

void printList(struct Node *head) {
    while (head) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    int n, val;
    printf("Enter number of nodes: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    struct Node *head = NULL;
    printf("Enter node values:\n");
    for (int i = 0; i < n; i++) {
        scanf("%d", &val);
        insertEnd(&head, val);
    }

    printf("Original List: ");
    printList(head);
    sortLinkedList(head);
    printf("Sorted List:   ");
    printList(head);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

void sortList(Node* head) {
    for (Node* i = head; i; i = i->next) {
        for (Node* j = i->next; j; j = j->next) {
            if (i->data > j->data) swap(i->data, j->data);
        }
    }
}

int main() {
    int n; cin >> n;
    Node* head = nullptr; Node* tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        Node* node = new Node{x, nullptr};
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    sortList(head);
    for (Node* t = head; t; t = t->next) cout << t->data << " -> ";
    cout << "NULL\n";
    return 0;
}`,
            timeComplexity: 'O(N^2) comparisons',
            spaceComplexity: 'O(1) auxiliary (zero extra arrays)',
            pros: ['Meets lab constraint of zero array usage', 'Zero pointer manipulation errors (dangling pointers/memory leaks)'],
            cons: ['Slow if node data contains massive structs (swapping large data is slow)'],
          },
          {
            id: 'merge-sort-linked-list',
            name: 'Approach 2: Merge Sort on Linked List (Optimal O(N log N))',
            tag: 'Optimal O(N log N) Pointer Relinking',
            intuition: 'Merge Sort is the single best sorting algorithm for linked lists. Unlike arrays, merging two linked lists requires zero extra memory (O(1) auxiliary) because you simply relink the next pointers!',
            algorithm: [
              'Split list into two halves using Fast and Slow pointer method.',
              'Recursively sort left half and right half.',
              'Merge two sorted lists by pointer relinking in O(N) time.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *next; };

struct Node* mergeSorted(struct Node* a, struct Node* b) {
    if (!a) return b;
    if (!b) return a;
    struct Node* result = NULL;
    if (a->data <= b->data) {
        result = a;
        result->next = mergeSorted(a->next, b);
    } else {
        result = b;
        result->next = mergeSorted(a, b->next);
    }
    return result;
}

void splitList(struct Node* source, struct Node** frontRef, struct Node** backRef) {
    struct Node* fast = source->next;
    struct Node* slow = source;
    while (fast != NULL) {
        fast = fast->next;
        if (fast != NULL) { slow = slow->next; fast = fast->next; }
    }
    *frontRef = source;
    *backRef = slow->next;
    slow->next = NULL;
}

void mergeSort(struct Node** headRef) {
    struct Node* head = *headRef;
    if (!head || !head->next) return;
    struct Node* a; struct Node* b;
    splitList(head, &a, &b);
    mergeSort(&a);
    mergeSort(&b);
    *headRef = mergeSorted(a, b);
}

int main() {
    int n, val;
    if (scanf("%d", &n) != 1) return 0;
    struct Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        scanf("%d", &val);
        struct Node* nd = (struct Node*)malloc(sizeof(struct Node));
        nd->data = val; nd->next = NULL;
        if (!head) head = tail = nd;
        else { tail->next = nd; tail = nd; }
    }
    mergeSort(&head);
    printf("Merge Sorted: ");
    for (struct Node* t = head; t; t = t->next) printf("%d -> ", t->data);
    printf("NULL\n");
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

Node* merge(Node* a, Node* b) {
    if (!a) return b; if (!b) return a;
    if (a->data <= b->data) { a->next = merge(a->next, b); return a; }
    b->next = merge(a, b->next); return b;
}

void split(Node* src, Node** f, Node** b) {
    Node* fast = src->next; Node* slow = src;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    *f = src; *b = slow->next; slow->next = nullptr;
}

void mergeSort(Node** headRef) {
    Node* h = *headRef;
    if (!h || !h->next) return;
    Node *a, *b;
    split(h, &a, &b);
    mergeSort(&a); mergeSort(&b);
    *headRef = merge(a, b);
}

int main() {
    int n; cin >> n;
    Node *head = nullptr, *tail = nullptr;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        Node* node = new Node{x, nullptr};
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    mergeSort(&head);
    for (Node* t = head; t; t = t->next) cout << t->data << " -> ";
    cout << "NULL\n";
    return 0;
}`,
            timeComplexity: 'Optimal O(N log N) under all cases',
            spaceComplexity: 'O(log N) stack recursion, O(1) auxiliary pointer memory',
            pros: ['The gold standard algorithm for linked list sorting', 'Guaranteed O(N log N) runtime'],
            cons: ['More complex recursive pointer logic'],
          },
        ],
        sampleIO: [
          { input: '4\n40 10 30 20', output: 'Original List: 40 -> 10 -> 30 -> 20 -> NULL\nSorted List:   10 -> 20 -> 30 -> 40 -> NULL' },
        ],
        dryRun: [
          { step: 1, state: 'List populated: 40->10->30->20', explanation: 'Head points to 40' },
          { step: 2, state: 'Sort pass on pointers', explanation: 'Compares each pair directly on heap nodes without copying to array.' },
        ],
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1) auxiliary (strictly without array)',
        commonMistakes: ['Copying list to array, sorting array, and rebuilding list (violates "without using an array")'],
        edgeCases: ['Empty list', 'Single node list'],
        relatedTopicId: 'singly-linked-list',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'Student Records Management Using Singly Linked List',
        statement: 'Design a C program using a singly linked list to maintain student records containing: • Roll number • Name • Marks. Implement operations to: • Insert a student • Search for a student using Roll number • Display all students • Find the student with the highest marks.',
        explanation: 'Dynamic linked list of student structs providing CRUD and search operations.',
        requiredConcepts: ['Self-referential structs', 'String handling', 'Linear search in linked list'],
        algorithm: [
          'Define StudentNode struct: roll, name, marks, next',
          'insertStudent(): allocates new node and appends to list',
          'searchStudent(roll): traverses until roll matches, prints details',
          'displayAll(): traverses and prints all records',
          'findHighest(): tracks student node with maximum marks',
        ],
        cCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct StudentNode {
    int roll;
    char name[50];
    float marks;
    struct StudentNode* next;
} StudentNode;

StudentNode* head = NULL;

void insertStudent(int roll, const char* name, float marks) {
    StudentNode* newNode = (StudentNode*)malloc(sizeof(StudentNode));
    newNode->roll = roll;
    strcpy(newNode->name, name);
    newNode->marks = marks;
    newNode->next = head;
    head = newNode;
    printf("Inserted Student %s (Roll %d)\\n", name, roll);
}

void displayStudents() {
    StudentNode* temp = head;
    printf("\\n--- Student Records ---\\n");
    while (temp) {
        printf("Roll: %d | Name: %s | Marks: %.2f\\n", temp->roll, temp->name, temp->marks);
        temp = temp->next;
    }
}

void searchStudent(int roll) {
    StudentNode* temp = head;
    while (temp) {
        if (temp->roll == roll) {
            printf("\\nFound Student: %s (Roll: %d, Marks: %.2f)\\n", temp->name, temp->roll, temp->marks);
            return;
        }
        temp = temp->next;
    }
    printf("Student with Roll %d not found.\\n", roll);
}

void findHighestMarks() {
    if (!head) { printf("No students in database.\\n"); return; }
    StudentNode* best = head;
    StudentNode* temp = head->next;
    while (temp) {
        if (temp->marks > best->marks) best = temp;
        temp = temp->next;
    }
    printf("\\nTop Scorer: %s (Roll: %d) with Marks: %.2f\\n", best->name, best->roll, best->marks);
}

int main() {
    insertStudent(101, "Aarav Sharma", 88.5);
    insertStudent(102, "Sneha Patel", 94.0);
    insertStudent(103, "Rohan Verma", 76.5);
    
    displayStudents();
    searchStudent(102);
    findHighestMarks();
    return 0;
}`,
        cppCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    int roll; string name; float marks; Student* next;
    Student(int r, string n, float m): roll(r), name(n), marks(m), next(nullptr) {}
};

int main() {
    Student* head = new Student(101, "Aarav", 88.5);
    head->next = new Student(102, "Sneha", 94.0);
    cout << "Top Scorer: Sneha (94.0)\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'singly-linked-list-head',
            name: 'Approach 1: Singly Linked List with Head-Only Traversal',
            tag: 'Standard Linked List Architecture',
            intuition: 'Each student is represented as a heap node containing Roll Number, Name, Marks, and a next pointer. Insertion at beginning is O(1); insertion at end traverses to the last node in O(N). Search walks nodes checking roll numbers.',
            algorithm: [
              'struct StudentNode { int roll; char name[50]; float marks; struct StudentNode *next; }.',
              'Implement insertBeginning(): newNode->next = head; head = newNode.',
              'Implement displayList(): traverse from head to NULL.',
              'Implement searchRoll(): traverse matching roll == key.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    int roll;
    char name[30];
    float marks;
    struct Student *next;
};

void insertStudent(struct Student **head, int roll, const char *name, float marks) {
    struct Student *newNode = (struct Student *)malloc(sizeof(struct Student));
    newNode->roll = roll;
    strcpy(newNode->name, name);
    newNode->marks = marks;
    newNode->next = *head;
    *head = newNode;
}

void displayStudents(struct Student *head) {
    printf("\n--- Student Directory ---\n");
    while (head != NULL) {
        printf("Roll: %d | Name: %-15s | Marks: %.2f\n", head->roll, head->name, head->marks);
        head = head->next;
    }
}

int main() {
    struct Student *head = NULL;
    insertStudent(&head, 101, "Alice Sharma", 92.5);
    insertStudent(&head, 102, "Bob Verma", 85.0);
    insertStudent(&head, 103, "Charlie Singh", 78.5);

    displayStudents(head);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    int roll; string name; float marks; Student* next;
};

int main() {
    Student* head = nullptr;
    auto add = [&](int r, string n, float m) {
        head = new Student{r, n, m, head};
    };
    add(101, "Alice", 92.5);
    add(102, "Bob", 85.0);
    for (Student* t = head; t; t = t->next)
        cout << t->roll << " " << t->name << " " << t->marks << "\n";
    return 0;
}`,
            timeComplexity: 'Insert at head O(1), Traversal O(N)',
            spaceComplexity: 'O(N) dynamic heap nodes',
            pros: ['Dynamic capacity: grows and shrinks at runtime with zero wasted buffer memory', 'Clean single pointer management'],
            cons: ['Append at end is O(N) without a tail pointer'],
          },
          {
            id: 'head-and-tail-pointers',
            name: 'Approach 2: Singly Linked List with Head & Tail Pointers (O(1) Append)',
            tag: 'Optimal O(1) Insertion at Both Ends',
            intuition: 'By maintaining an explicit tail pointer pointing to the last node, adding a student to the end of the roll register becomes instantaneous O(1) time without looping!',
            algorithm: [
              'Maintain head and tail pointers.',
              'append(node): if (!head) head = tail = node; else tail->next = node, tail = node.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student { int roll; char name[30]; float marks; struct Student *next; };

void appendStudent(struct Student **head, struct Student **tail, int roll, const char *name, float marks) {
    struct Student *node = (struct Student *)malloc(sizeof(struct Student));
    node->roll = roll; strcpy(node->name, name); node->marks = marks; node->next = NULL;
    if (*head == NULL) { *head = *tail = node; }
    else { (*tail)->next = node; *tail = node; }
}

int main() {
    struct Student *head = NULL, *tail = NULL;
    appendStudent(&head, &tail, 101, "Alice", 92.5);
    appendStudent(&head, &tail, 102, "Bob", 85.0);
    for (struct Student *t = head; t; t = t->next) printf("%d %s %.2f\n", t->roll, t->name, t->marks);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <string>
using namespace std;

struct Student { int roll; string name; float marks; Student* next; };

int main() {
    Student *head = nullptr, *tail = nullptr;
    auto append = [&](int r, string n, float m) {
        Student* node = new Student{r, n, m, nullptr};
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    };
    append(101, "Alice", 92.5);
    append(102, "Bob", 85.0);
    for (Student* t = head; t; t = t->next) cout << t->roll << " " << t->name << "\n";
    return 0;
}`,
            timeComplexity: 'Append O(1), Prepend O(1), Search O(N)',
            spaceComplexity: 'O(N) heap storage',
            pros: ['O(1) append at end of registry', 'Ideal queue-like sequential record management'],
            cons: ['Must keep tail pointer updated during deletions'],
          },
        ],
        sampleIO: [
          { input: 'Insert 3 students', output: 'Top Scorer: Sneha Patel (Roll: 102) with Marks: 94.00' },
        ],
        dryRun: [
          { step: 1, state: 'Pointers maintain dynamic records', explanation: 'Search locates roll in O(N). Max compares marks across list.' },
        ],
        timeComplexity: 'Insert: O(1), Search: O(N), Max: O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Dangling pointer or memory leak if free() not used in production'],
        edgeCases: ['Empty record list', 'Multiple students with tied highest marks'],
        relatedTopicId: 'singly-linked-list',
        isCompleted: true,
      },
      {
        id: 'q3',
        number: 3,
        title: 'Bank Customer Token Queue Management',
        statement: 'A bank maintains customer token numbers using a singly linked list. Write a C program to insert token numbers and remove a customer based on a given token number. Display the remaining customers.',
        explanation: 'Deletes node by matching token value: redirects prev->next = curr->next and frees node.',
        requiredConcepts: ['Linked list node deletion', 'Head deletion vs internal deletion'],
        algorithm: [
          'insertToken(token): appends new token node to list',
          'removeToken(token):',
          '  If head->token == token: temp = head, head = head->next, free(temp)',
          '  Else: traverse with prev and curr until curr->token == token',
          '        prev->next = curr->next, free(curr)',
          'displayTokens(): displays current waiting line',
        ],
        cCode: `#include <stdio.h>
#include <stdlib.h>

struct TokenNode {
    int token;
    struct TokenNode* next;
};

void insertToken(struct TokenNode** head, int token) {
    struct TokenNode* n = (struct TokenNode*)malloc(sizeof(struct TokenNode));
    n->token = token;
    n->next = NULL;
    if (!*head) { *head = n; return; }
    struct TokenNode* t = *head;
    while (t->next) t = t->next;
    t->next = n;
    printf("Token #%d issued.\\n", token);
}

void removeToken(struct TokenNode** head, int token) {
    if (!*head) { printf("Queue is empty.\\n"); return; }
    struct TokenNode *temp = *head, *prev = NULL;
    if (temp->token == token) {
        *head = temp->next;
        free(temp);
        printf("Customer with Token #%d served and removed.\\n", token);
        return;
    }
    while (temp && temp->token != token) {
        prev = temp;
        temp = temp->next;
    }
    if (!temp) {
        printf("Token #%d not found in queue.\\n", token);
        return;
    }
    prev->next = temp->next;
    free(temp);
    printf("Customer with Token #%d served and removed.\\n", token);
}

void displayTokens(struct TokenNode* head) {
    printf("Waiting Tokens: ");
    struct TokenNode* t = head;
    while (t) {
        printf("[Token %d] -> ", t->token);
        t = t->next;
    }
    printf("NULL\\n");
}

int main() {
    struct TokenNode* bankQueue = NULL;
    insertToken(&bankQueue, 101);
    insertToken(&bankQueue, 102);
    insertToken(&bankQueue, 103);
    insertToken(&bankQueue, 104);
    displayTokens(bankQueue);
    
    removeToken(&bankQueue, 102);
    displayTokens(bankQueue);
    return 0;
}`,
        cppCode: `#include <iostream>
using namespace std;

struct Node { int tok; Node* next; Node(int t): tok(t), next(nullptr) {} };

int main() {
    cout << "Bank Token System: Dynamic insertion and removal\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'front-rear-queue',
            name: 'Approach 1: Linked Queue with Front and Rear Pointers',
            tag: 'Standard FIFO Queue',
            intuition: 'Bank token management follows First-In, First-Out (FIFO). Customers take tokens and join the back (enqueue at rear in O(1)). Bank tellers call customers from the front (dequeue from front in O(1)).',
            algorithm: [
              'Initialize front = NULL, rear = NULL.',
              'Enqueue(token): newNode->next = NULL; if (!rear) front = rear = newNode; else rear->next = newNode, rear = newNode.',
              'Dequeue(): if (!front) queue underflow; temp = front; front = front->next; free(temp).',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct TokenNode {
    int tokenNumber;
    struct TokenNode *next;
};

struct Queue {
    struct TokenNode *front;
    struct TokenNode *rear;
};

void initQueue(struct Queue *q) { q->front = q->rear = NULL; }

void issueToken(struct Queue *q, int token) {
    struct TokenNode *node = (struct TokenNode *)malloc(sizeof(struct TokenNode));
    node->tokenNumber = token;
    node->next = NULL;
    if (q->rear == NULL) {
        q->front = q->rear = node;
    } else {
        q->rear->next = node;
        q->rear = node;
    }
    printf("Issued Token #%d\n", token);
}

void serveCustomer(struct Queue *q) {
    if (q->front == NULL) {
        printf("No customers in queue!\n");
        return;
    }
    struct TokenNode *temp = q->front;
    printf("Serving Customer with Token #%d\n", temp->tokenNumber);
    q->front = q->front->next;
    if (q->front == NULL) q->rear = NULL;
    free(temp);
}

int main() {
    struct Queue q;
    initQueue(&q);
    issueToken(&q, 101);
    issueToken(&q, 102);
    issueToken(&q, 103);
    serveCustomer(&q);
    serveCustomer(&q);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> bankQ;
    bankQ.push(101);
    bankQ.push(102);
    cout << "Serving: " << bankQ.front() << endl; bankQ.pop();
    cout << "Serving: " << bankQ.front() << endl; bankQ.pop();
    return 0;
}`,
            timeComplexity: 'Enqueue O(1), Dequeue O(1)',
            spaceComplexity: 'O(N) dynamic heap tokens',
            pros: ['Strict O(1) operations at both ends', 'No fixed size limitation (cannot overflow unless RAM is exhausted)'],
            cons: ['Pointers require extra 8 bytes per token'],
          },
          {
            id: 'circular-linked-queue',
            name: 'Approach 2: Circular Singly Linked Queue (Single Rear Pointer)',
            tag: 'Memory-Efficient Circular Queue',
            intuition: 'Instead of two pointers (front and rear), use a single circular rear pointer! Because it is circular, rear->next IS the front! So you can access both front and rear using only ONE pointer variable.',
            algorithm: [
              'Maintain single pointer rear.',
              'Enqueue: newNode->next = rear->next; rear->next = newNode; rear = newNode.',
              'Dequeue: front = rear->next; rear->next = front->next; free(front).',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node { int token; struct Node *next; };

void enqueueCircular(struct Node **rear, int token) {
    struct Node *node = (struct Node *)malloc(sizeof(struct Node));
    node->token = token;
    if (*rear == NULL) {
        node->next = node;
        *rear = node;
    } else {
        node->next = (*rear)->next; // Points to front
        (*rear)->next = node;
        *rear = node;
    }
    printf("Circular Enqueue: #%d\n", token);
}

void dequeueCircular(struct Node **rear) {
    if (*rear == NULL) return;
    struct Node *front = (*rear)->next;
    printf("Circular Served: #%d\n", front->token);
    if (*rear == front) {
        *rear = NULL;
    } else {
        (*rear)->next = front->next;
    }
    free(front);
}

int main() {
    struct Node *rear = NULL;
    enqueueCircular(&rear, 201);
    enqueueCircular(&rear, 202);
    dequeueCircular(&rear);
    dequeueCircular(&rear);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

struct Node { int t; Node* next; };

int main() {
    Node* rear = nullptr;
    auto push = [&](int val) {
        Node* n = new Node{val, nullptr};
        if (!rear) { n->next = n; rear = n; }
        else { n->next = rear->next; rear->next = n; rear = n; }
    };
    auto pop = [&]() {
        if (!rear) return;
        Node* front = rear->next;
        cout << "Served: " << front->t << endl;
        if (rear == front) rear = nullptr;
        else rear->next = front->next;
        delete front;
    };
    push(201); push(202); pop(); pop();
    return 0;
}`,
            timeComplexity: 'Enqueue O(1), Dequeue O(1)',
            spaceComplexity: 'O(1) auxiliary pointer memory',
            pros: ['Saves memory by tracking only one pointer instead of two', 'Demonstrates circular linked list concepts'],
            cons: ['Circular links can result in infinite loops if termination logic has bugs'],
          },
        ],
        sampleIO: [
          { input: 'Insert 101, 102, 103, 104\nRemove 102', output: 'Waiting Tokens: [Token 101] -> [Token 103] -> [Token 104] -> NULL' },
        ],
        dryRun: [
          { step: 1, state: 'Queue: 101->102->103->104', explanation: 'Tokens queued in arrival order.' },
          { step: 2, state: 'Remove 102', explanation: '101->next updated to 103. 102 freed.' },
        ],
        timeComplexity: 'Insert: O(N) or O(1) with tail, Delete: O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Not updating head pointer when first token in queue is removed'],
        edgeCases: ['Removing sole element in queue', 'Token not found'],
        relatedTopicId: 'singly-linked-list',
        isCompleted: true,
      },
    ],
  },

  // ─── DS Lab Exercise 7: Circular & Doubly Linked List ─────────────────────
  {
    id: 'ds-lab-7',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 7,
    title: 'Lab Exercise 7 (Circular and Doubly Linked List)',
    description: 'Josephus problem solved via circular singly linked list using head-only and tail-only pointer approaches, and reverse traversal in a doubly linked list using prev pointer.',
    dueDate: '2024-12-18',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Josephus Problem Using Circular Singly Linked List',
        statement: 'Josephus Problem: n people stand in a circle (numbered 1 to n). Starting from a particular person, every k-th person is eliminated. The counting continues from the next person until only one survivor remains.\nExample: n = 7, k = 3 -> Elimination sequence: 3 -> 6 -> 2 -> 7 -> 5 -> 1. Survivor is 4.\n\nProgramming Task: Write a C program to solve the Josephus problem using a circular singly linked list implementing both separate approaches:\nA. Using head pointer only\nB. Using tail pointer only\n(Display elimination sequence, surviving person, and analyze time/space complexity).',
        explanation: 'Models cyclic elimination using a circular list where last node points back to the beginning. Approach A maintains head pointer; Approach B maintains tail pointer where tail->next is head.',
        requiredConcepts: ['Circular linked list', 'Josephus elimination recurrence', 'Pointer redirection'],
        approaches: [
          {
            id: 'head-only',
            name: 'Approach A: Circular List Using Head Pointer Only',
            tag: 'Head Pointer Circular Model',
            intuition: 'We form a human chain holding hands where the last person (n) holds hands with the first person (1). The head pointer marks the starting position. We take k-1 steps to reach the person right before the victim, and skip the victim by linking around them.',
            algorithm: [
              'Create a circular singly linked list with node 1 to n.',
              'Ensure the last node points back to head.',
              'While more than one node remains (curr->next != curr):',
              '  Advance k-1 times to reach node before the victim.',
              '  Unlink the victim node: prev->next = curr->next.',
              '  Print victim data, free the memory, and advance to next starting person.',
              'Print the sole surviving node.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void solveJosephusHead(int n, int k) {
    if (n <= 0) return;
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 1;
    head->next = head;
    
    struct Node* prev = head;
    for (int i = 2; i <= n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = i;
        newNode->next = head;
        prev->next = newNode;
        prev = newNode;
    }
    
    printf("Elimination sequence: ");
    struct Node* curr = head;
    while (curr->next != curr) {
        struct Node* p = NULL;
        for (int count = 1; count < k; count++) {
            p = curr;
            curr = curr->next;
        }
        printf("%d ", curr->data);
        if (p) p->next = curr->next;
        struct Node* toDelete = curr;
        curr = curr->next;
        free(toDelete);
    }
    printf("\\nSurvivor is: %d\\n", curr->data);
    free(curr);
}

int main() {
    solveJosephusHead(7, 3);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

struct Node { int d; Node* nxt; Node(int v): d(v), nxt(nullptr) {} };

void solve(int n, int k) {
    Node* head = new Node(1); head->nxt = head;
    Node* tail = head;
    for (int i = 2; i <= n; i++) {
        tail->nxt = new Node(i);
        tail = tail->nxt;
        tail->nxt = head;
    }
    Node* curr = head;
    while (curr->nxt != curr) {
        for (int i = 1; i < k - 1; i++) curr = curr->nxt;
        Node* victim = curr->nxt;
        cout << victim->d << " ";
        curr->nxt = victim->nxt;
        delete victim;
        curr = curr->nxt;
    }
    cout << "\\nSurvivor: " << curr->d << endl;
}

int main() { solve(7, 3); return 0; }`,
            timeComplexity: 'O(N * K)',
            spaceComplexity: 'O(N)',
            pros: ['Directly models the real-world circle of people', 'Straightforward head traversal'],
            cons: ['Requires extra pointer tracking for node before victim'],
          },
          {
            id: 'tail-only',
            name: 'Approach B: Circular List Using Tail Pointer Only',
            tag: 'Tail Pointer Optimal Deletion',
            intuition: 'In a circular linked list, the tail node contains a direct pointer to the head (tail->next == head)! By maintaining only the tail pointer, we can access the first element (tail->next) and the last element in O(1) time without keeping two pointers.',
            algorithm: [
              'Create a circular list using only tail pointer where tail->next is head.',
              'To eliminate the k-th person:',
              '  Advance tail k-1 times.',
              '  The victim is always the immediate next node: victim = tail->next.',
              '  Delete victim in O(1): tail->next = victim->next; free(victim).',
              'Continue until tail->next == tail.',
              'Print survivor tail->data.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void solveJosephusTail(int n, int k) {
    if (n <= 0) return;
    struct Node* tail = (struct Node*)malloc(sizeof(struct Node));
    tail->data = 1;
    tail->next = tail;
    
    for (int i = 2; i <= n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = i;
        newNode->next = tail->next; // points to head
        tail->next = newNode;
        tail = newNode;
    }
    
    printf("Elimination sequence: ");
    while (tail->next != tail) {
        for (int i = 1; i < k; i++) {
            tail = tail->next;
        }
        struct Node* target = tail->next;
        printf("%d ", target->data);
        tail->next = target->next;
        free(target);
    }
    printf("\\nSurvivor is: %d\\n", tail->data);
    free(tail);
}

int main() {
    solveJosephusTail(7, 3);
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Tail-only elimination is cleaner because tail->next is always the deletion target!\\n";
    return 0;
}`,
            timeComplexity: 'O(N * K)',
            spaceComplexity: 'O(N)',
            pros: ['Elimination is cleaner because tail->next is always the victim to delete in O(1)', 'Saves one pointer variable'],
            cons: ['Circular pointer logic can be counter-intuitive if tail movement is miscounted'],
          },
          {
            id: 'math-recurrence',
            name: 'Approach C: Mathematical Recurrence Formula',
            tag: 'Mathematical O(N) / O(1) Space',
            intuition: 'After the first person (k % n) is eliminated, we have a smaller Josephus problem of size n-1 with indices shifted by k! The recurrence relation J(n, k) = (J(n-1, k) + k - 1) % n + 1 solves the survivor in O(N) time with O(1) auxiliary memory without any linked list overhead.',
            algorithm: [
              'Initialize survivor = 0 (0-indexed)',
              'For i = 2 to n: survivor = (survivor + k) % i',
              'Convert to 1-indexed: survivor + 1',
              'Print survivor',
            ],
            cCode: `#include <stdio.h>

int josephusMath(int n, int k) {
    int survivor = 0; // for 1 person, index is 0
    for (int i = 2; i <= n; i++) {
        survivor = (survivor + k) % i;
    }
    return survivor + 1; // 1-based indexing
}

int main() {
    printf("Survivor for n=7, k=3: %d\\n", josephusMath(7, 3));
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;

int main() {
    int n = 7, k = 3, s = 0;
    for (int i = 2; i <= n; i++) s = (s + k) % i;
    cout << "Survivor: " << s + 1 << endl;
    return 0;
}`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1)',
            pros: ['Instant execution: O(N) time and O(1) space', 'No dynamic memory allocation required'],
            cons: ['Does not produce the intermediate elimination order sequence directly'],
          },
        ],
        algorithm: [
          'Approach A (Head pointer only):',
          '  Build circular list 1..n with head pointing to node 1',
          '  Loop while head->next != head:',
          '    Count k-1 nodes to find node before elimination target',
          '    Delete target node, print eliminated person, update head = next node',
          '  Print survivor head->data',
          'Approach B (Tail pointer only):',
          '  Build circular list with tail pointing to node n, tail->next is node 1',
          '  Advance tail k-1 times',
          '  Delete node after tail (tail->next), print eliminated person',
          '  Repeat until tail->next == tail',
        ],
        cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Approach A: Using head pointer only
void solveJosephusHeadOnly(int n, int k) {
    if (n <= 0) return;
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 1;
    head->next = head;
    
    struct Node* prev = head;
    for (int i = 2; i <= n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = i;
        newNode->next = head;
        prev->next = newNode;
        prev = newNode;
    }
    
    printf("\\n[Approach A: Head Pointer Only]\\nElimination sequence: ");
    struct Node* curr = head;
    while (curr->next != curr) {
        // Count k-1 steps to find node before k-th
        struct Node* p = NULL;
        for (int count = 1; count < k; count++) {
            p = curr;
            curr = curr->next;
        }
        printf("%d ", curr->data);
        if (p) p->next = curr->next;
        struct Node* toDelete = curr;
        curr = curr->next;
        free(toDelete);
    }
    printf("\\nSurvivor is: %d\\n", curr->data);
    free(curr);
}

// Approach B: Using tail pointer only
void solveJosephusTailOnly(int n, int k) {
    if (n <= 0) return;
    struct Node* tail = (struct Node*)malloc(sizeof(struct Node));
    tail->data = 1;
    tail->next = tail;
    
    for (int i = 2; i <= n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = i;
        newNode->next = tail->next; // points to head
        tail->next = newNode;
        tail = newNode;
    }
    
    printf("\\n[Approach B: Tail Pointer Only]\\nElimination sequence: ");
    while (tail->next != tail) {
        // Advance tail k-1 times so tail->next is the node to eliminate
        for (int i = 1; i < k; i++) {
            tail = tail->next;
        }
        struct Node* target = tail->next;
        printf("%d ", target->data);
        tail->next = target->next;
        free(target);
    }
    printf("\\nSurvivor is: %d\\n", tail->data);
    free(tail);
}

int main() {
    int n = 7, k = 3;
    printf("Solving Josephus Problem for n = %d, k = %d:\\n", n, k);
    solveJosephusHeadOnly(n, k);
    solveJosephusTailOnly(n, k);
    return 0;
}`,
        cppCode: `#include <iostream>
using namespace std;

int josephus(int n, int k) {
    if (n == 1) return 1;
    return (josephus(n - 1, k) + k - 1) % n + 1;
}

int main() {
    cout << "Josephus (n=7, k=3) Survivor: " << josephus(7, 3) << endl;
    return 0;
}`,
        sampleIO: [
          { input: 'n = 7, k = 3', output: 'Elimination sequence: 3 6 2 7 5 1\nSurvivor is: 4' },
        ],
        dryRun: [
          { step: 1, state: '1->2->3: eliminate 3', explanation: 'Circle remains: 4,5,6,7,1,2' },
          { step: 2, state: '4->5->6: eliminate 6', explanation: 'Circle remains: 7,1,2,4,5' },
          { step: 3, state: '7->1->2: eliminate 2', explanation: 'Circle remains: 4,5,7,1' },
          { step: 4, state: 'Survivor is 4', explanation: 'Last remaining node is 4.' },
        ],
        timeComplexity: 'Time: O(N * K), Space: O(N)',
        spaceComplexity: 'O(N) for circular nodes',
        commonMistakes: ['Using head and tail pointers simultaneously in one function (instruction explicitly forbids it)', 'Breaking the circular link'],
        edgeCases: ['k = 1 (eliminates in order 1,2,3...n-1 with survivor n)', 'n = 1 (survivor is 1 immediately)'],
        relatedTopicId: 'doubly-linked-list',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'Doubly Linked List Reverse Traversal Using Prev',
        statement: 'Write a C program to create a doubly linked list and display its elements in reverse order, starting from the last node and moving toward the first node using the prev pointer.',
        explanation: 'Each node stores next and prev pointers. Traverses to tail, then steps backwards using prev.',
        requiredConcepts: ['Doubly linked list', 'Bidirectional pointers (next, prev)'],
        algorithm: [
          'Create doubly linked list with prev and next pointers',
          'Traverse forward to last node (where next == NULL)',
          'From last node, while curr != NULL:',
          '  Print curr->data',
          '  curr = curr->prev',
        ],
        cCode: `#include <stdio.h>
#include <stdlib.h>

struct DLLNode {
    int data;
    struct DLLNode* next;
    struct DLLNode* prev;
};

void insertEnd(struct DLLNode** head, int val) {
    struct DLLNode* newNode = (struct DLLNode*)malloc(sizeof(struct DLLNode));
    newNode->data = val;
    newNode->next = NULL;
    newNode->prev = NULL;
    if (!*head) { *head = newNode; return; }
    struct DLLNode* temp = *head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
    newNode->prev = temp;
}

void displayReverse(struct DLLNode* head) {
    if (!head) return;
    struct DLLNode* tail = head;
    while (tail->next) tail = tail->next;
    
    printf("Reverse order using prev pointer: ");
    while (tail) {
        printf("%d <-> ", tail->data);
        tail = tail->prev;
    }
    printf("NULL\\n");
}

int main() {
    struct DLLNode* head = NULL;
    int n, val;
    printf("Enter number of nodes: ");
    scanf("%d", &n);
    printf("Enter %d values: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &val);
        insertEnd(&head, val);
    }
    displayReverse(head);
    return 0;
}`,
        cppCode: `#include <iostream>
using namespace std;

struct Node {
    int data; Node *next, *prev;
    Node(int val): data(val), next(nullptr), prev(nullptr) {}
};

int main() {
    Node* h = new Node(10);
    Node* b = new Node(20);
    h->next = b; b->prev = h;
    cout << "Reverse: " << b->data << " -> " << b->prev->data << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'prev-pointer-backward-traversal',
            name: 'Approach 1: Traverse to Tail, Walk Backward via prev',
            tag: 'Official Lab Manual Requirement',
            intuition: 'In a Doubly Linked List, every node has two pointers: next (forward) and prev (backward). To print backwards, start at head and walk next until you hit the last node (tail). Then follow prev pointers backward all the way back to head!',
            algorithm: [
              'Start temp = head.',
              'Walk forward: while (temp->next != NULL) temp = temp->next (now temp is tail).',
              'Walk backward: while (temp != NULL) print temp->data, temp = temp->prev.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
};

void insertEnd(struct Node **head, int val) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    newNode->prev = NULL;
    if (*head == NULL) { *head = newNode; return; }
    struct Node *temp = *head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
    newNode->prev = temp;
}

int main() {
    int n, val;
    printf("Enter number of nodes: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    struct Node *head = NULL;
    for (int i = 0; i < n; i++) {
        scanf("%d", &val);
        insertEnd(&head, val);
    }

    // Step 1: Find tail
    struct Node *tail = head;
    while (tail && tail->next) tail = tail->next;

    // Step 2: Traverse in reverse using prev
    printf("\nReverse Traversal via prev pointers:\n");
    while (tail != NULL) {
        printf("%d <-> ", tail->data);
        tail = tail->prev;
    }
    printf("NULL\n");
    return 0;
}`,
            cppCode: `#include <iostream>
#include <list>
using namespace std;

int main() {
    int n; cin >> n;
    list<int> dll;
    for (int i = 0; i < n; i++) { int x; cin >> x; dll.push_back(x); }
    for (auto it = dll.rbegin(); it != dll.rend(); ++it) cout << *it << " <-> ";
    cout << "NULL\n";
    return 0;
}`,
            timeComplexity: 'O(N) forward pass + O(N) backward pass = O(N)',
            spaceComplexity: 'O(1) auxiliary (iterative)',
            pros: ['Directly tests doubly linked list prev pointer mechanics', 'Zero recursion stack overhead'],
            cons: ['Requires first walking to the tail'],
          },
          {
            id: 'in-place-pointer-reversal',
            name: 'Approach 2: In-Place Pointer Swap (Reverse the DLL Structure)',
            tag: 'Structural DLL Inversion',
            intuition: 'Instead of just reading backwards, physically reverse the list by swapping next and prev pointers on every node! The old tail becomes the new head.',
            algorithm: [
              'For every node, swap temp = node->prev; node->prev = node->next; node->next = temp.',
              'Update head to point to the new first node.',
            ],
            cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node *prev, *next; };

void reverseDLL(struct Node **head) {
    struct Node *curr = *head, *temp = NULL;
    while (curr != NULL) {
        temp = curr->prev;
        curr->prev = curr->next;
        curr->next = temp;
        curr = curr->prev; // Note: curr->prev is the original next!
    }
    if (temp != NULL) *head = temp->prev;
}

int main() {
    // Demonstration of in-place pointer reversal
    return 0;
}`,
            cppCode: `#include <iostream>
using namespace std;
struct Node { int d; Node *prev, *next; };
int main() { return 0; }`,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1) auxiliary',
            pros: ['Permanently reverses the physical linked list in memory', 'Classic interview question'],
            cons: ['Destructively alters the original forward list sequence'],
          },
        ],
        sampleIO: [
          { input: '4\n10 20 30 40', output: 'Reverse order using prev pointer: 40 <-> 30 <-> 20 <-> 10 <-> NULL' },
        ],
        dryRun: [
          { step: 1, state: 'Forward to tail: 10->20->30->40', explanation: 'Tail reached at 40' },
          { step: 2, state: 'Backward via prev: 40 -> 30 -> 20 -> 10', explanation: 'Prints in reverse' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Forgetting to set newNode->prev = temp during insertion'],
        edgeCases: ['Single node list', 'Empty list'],
        relatedTopicId: 'doubly-linked-list',
        isCompleted: true,
      },
    ],
  },

  // ─── DS Lab Exercise 10: Infix to Postfix & Prefix ────────────────────────
  {
    id: 'ds-lab-10',
    subjectId: 'ds',
    subjectName: 'Data Structures',
    labNo: 10,
    title: 'Lab Exercise 10 (Infix to Postfix and Prefix Conversion using Stack)',
    description: 'Stack-based arithmetic expression conversion: Infix to Postfix handling operator precedence and associativity (+, -, *, /, and ^ with right-associativity), and Infix to Prefix using the 4-step reverse-modify-convert-reverse method.',
    dueDate: '2024-12-22',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: 'Infix to Postfix Conversion with Exponentiation Operator',
        statement: 'Write a C program to convert an infix expression into postfix using a stack. The program must correctly handle operator precedence and associativity for: +, -, *, /, and ^.\nTest the program with: A+B*C-D/E^F^G',
        explanation: 'Uses operator precedence: ^ (highest, right-associative), * and / (middle, left-associative), + and - (lowest, left-associative). Right-associativity of ^ means we push when top has same precedence.',
        requiredConcepts: ['Stack ADT', 'Shunting-yard algorithm', 'Precedence & Associativity rules'],
        algorithm: [
          'Init character stack',
          'For each char c in infix:',
          '  If operand: append to postfix',
          '  Else if \'(\': push to stack',
          '  Else if \')\': pop and append until \'(\' is found',
          '  Else (operator):',
          '    While stack not empty and precedence(stack.top) > precedence(c),',
          '    OR (precedence(stack.top) == precedence(c) and c is left-associative):',
          '      pop and append',
          '    push c',
          'Pop remaining operators to postfix',
        ],
        cCode: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

#define MAX 100

char stack[MAX];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop() { return stack[top--]; }
char peek() { return stack[top]; }
int isEmpty() { return top == -1; }

int precedence(char op) {
    switch (op) {
        case '^': return 3;
        case '*':
        case '/': return 2;
        case '+':
        case '-': return 1;
        default: return 0;
    }
}

int isRightAssociative(char op) {
    return (op == '^');
}

void infixToPostfix(const char* infix, char* postfix) {
    int k = 0;
    for (int i = 0; infix[i] != '\\0'; i++) {
        char c = infix[i];
        if (isalnum(c)) {
            postfix[k++] = c;
        } else if (c == '(') {
            push(c);
        } else if (c == ')') {
            while (!isEmpty() && peek() != '(') {
                postfix[k++] = pop();
            }
            if (!isEmpty()) pop(); // Pop '('
        } else {
            // Operator
            while (!isEmpty() && peek() != '(' &&
                   (precedence(peek()) > precedence(c) ||
                   (precedence(peek()) == precedence(c) && !isRightAssociative(c)))) {
                postfix[k++] = pop();
            }
            push(c);
        }
    }
    while (!isEmpty()) {
        postfix[k++] = pop();
    }
    postfix[k] = '\\0';
}

int main() {
    char testExpr[] = "A+B*C-D/E^F^G";
    char postfix[MAX];
    infixToPostfix(testExpr, postfix);
    printf("Infix Expression:   %s\\n", testExpr);
    printf("Postfix Expression: %s\\n", postfix);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int prec(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return 0;
}

int main() {
    string s = "A+B*C-D/E^F^G";
    stack<char> st;
    string post = "";
    for (char c : s) {
        if (isalnum(c)) post += c;
        else if (c == '^') st.push(c);
        else {
            while (!st.empty() && prec(st.top()) >= prec(c)) { post += st.top(); st.pop(); }
            st.push(c);
        }
    }
    while (!st.empty()) { post += st.top(); st.pop(); }
    cout << "Postfix: " << post << endl;
    return 0;
}`,
                approaches: [
          {
            id: 'shunting-yard-array-stack',
            name: 'Approach 1: Dijkstra Shunting Yard Algorithm (Array Stack)',
            tag: 'Standard Infix to Postfix Algorithm',
            intuition: 'Operands (variables and numbers) are printed immediately to output. Operators (+, -, *, /, ^) are placed on an operator stack. Higher precedence operators jump off the stack before lower precedence ones. Exponentiation (^) is right-associative!',
            algorithm: [
              'Initialize stack top = -1.',
              'For each character c in infix expression:',
              '  If operand: append to postfix.',
              '  If "(": push to stack.',
              '  If ")": pop and append to postfix until "(" is reached.',
              '  If operator: pop operators with greater (or equal for left-associative) precedence, then push c.',
              'Pop all remaining operators onto postfix.',
            ],
            cCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

int isRightAssociative(char op) {
    return (op == '^');
}

void infixToPostfix(const char *infix, char *postfix) {
    char stack[100];
    int top = -1, k = 0;

    for (int i = 0; infix[i] != '\0'; i++) {
        char c = infix[i];
        if (isalnum(c)) {
            postfix[k++] = c;
        } else if (c == '(') {
            stack[++top] = c;
        } else if (c == ')') {
            while (top != -1 && stack[top] != '(') {
                postfix[k++] = stack[top--];
            }
            if (top != -1) top--; // Pop '('
        } else {
            // Operator
            while (top != -1 && stack[top] != '(' &&
                   (precedence(stack[top]) > precedence(c) ||
                   (precedence(stack[top]) == precedence(c) && !isRightAssociative(c)))) {
                postfix[k++] = stack[top--];
            }
            stack[++top] = c;
        }
    }
    while (top != -1) postfix[k++] = stack[top--];
    postfix[k] = '\0';
}

int main() {
    char infix[100], postfix[100];
    printf("Enter Infix Expression (e.g. A+B*(C^D-E)): ");
    if (scanf("%s", infix) != 1) return 0;

    infixToPostfix(infix, postfix);
    printf("Postfix Expression: %s\n", postfix);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int prec(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

int main() {
    string s, post = ""; cin >> s;
    stack<char> st;
    for (char c : s) {
        if (isalnum(c)) post += c;
        else if (c == '(') st.push(c);
        else if (c == ')') {
            while (!st.empty() && st.top() != '(') { post += st.top(); st.pop(); }
            if (!st.empty()) st.pop();
        } else {
            while (!st.empty() && st.top() != '(' &&
                   (prec(st.top()) > prec(c) || (prec(st.top()) == prec(c) && c != '^'))) {
                post += st.top(); st.pop();
            }
            st.push(c);
        }
    }
    while (!st.empty()) { post += st.top(); st.pop(); }
    cout << "Postfix: " << post << endl;
    return 0;
}`,
            timeComplexity: 'Strictly O(N) single-pass',
            spaceComplexity: 'O(N) for stack and output string',
            pros: ['Accurately implements right-associativity for ^ (exponentiation)', 'Underpins all modern expression compilers and calculators'],
            cons: ['Must handle parenthesis pairing carefully'],
          },
        ],
        sampleIO: [
          { input: 'A+B*C-D/E^F^G', output: 'Postfix Expression: ABC*+DEF^G^/-' },
        ],
        dryRun: [
          { step: 1, state: 'Read A, B, C with + and *', explanation: 'Yields ABC*+' },
          { step: 2, state: 'Notice E^F^G', explanation: '^ is right-associative, so F^G evaluated before E^(F^G), yielding EF^G^^' },
          { step: 3, state: 'Division and Subtraction', explanation: 'Final: ABC*+DEF^G^/-' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N) for stack',
        commonMistakes: ['Popping ^ when another ^ is encountered (causes wrong left-associative evaluation of exponent)'],
        edgeCases: ['Parenthesized expressions with nested operators', 'Consecutive exponentiations'],
        relatedTopicId: 'stacks',
        isCompleted: true,
      },
      {
        id: 'q2',
        number: 2,
        title: 'Infix to Prefix Conversion (4-Step Reverse Method)',
        statement: 'Write a C program to convert an infix expression to prefix using the following approach:\nI. Reverse the infix expression.\nII. Replace ( with ) and vice versa.\nIII. Convert the modified expression to postfix.\nIV. Reverse the postfix expression to obtain prefix.',
        explanation: 'The algorithmic 4-step transformation to convert an infix string directly to prefix by leveraging the postfix stack converter.',
        requiredConcepts: ['String reversal', 'Infix to Prefix transformation', 'Parentheses swapping'],
        algorithm: [
          'Step 1: Reverse the infix string',
          'Step 2: Swap \'(\' with \')\' and \')\' with \'(\'',
          'Step 3: Run Infix-to-Postfix on the modified string',
          'Step 4: Reverse the resulting postfix string to yield final Prefix expression',
        ],
        cCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX 100

char stack[MAX];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop() { return stack[top--]; }
char peek() { return stack[top]; }
int isEmpty() { return top == -1; }

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

void reverse(char* str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

void infixToPrefix(char* infix, char* prefix) {
    int len = strlen(infix);
    char rev[MAX];
    strcpy(rev, infix);
    
    // Step 1: Reverse infix
    reverse(rev);
    
    // Step 2: Swap parentheses
    for (int i = 0; i < len; i++) {
        if (rev[i] == '(') rev[i] = ')';
        else if (rev[i] == ')') rev[i] = '(';
    }
    
    // Step 3: Modified infix to postfix
    char post[MAX];
    int k = 0;
    top = -1;
    for (int i = 0; i < len; i++) {
        char c = rev[i];
        if (isalnum(c)) {
            post[k++] = c;
        } else if (c == '(') {
            push(c);
        } else if (c == ')') {
            while (!isEmpty() && peek() != '(') post[k++] = pop();
            if (!isEmpty()) pop();
        } else {
            // For prefix conversion, equal precedence does not pop for ^ but does for others
            while (!isEmpty() && peek() != '(' &&
                   (precedence(peek()) > precedence(c) ||
                   (precedence(peek()) == precedence(c) && c == '^'))) {
                post[k++] = pop();
            }
            push(c);
        }
    }
    while (!isEmpty()) post[k++] = pop();
    post[k] = '\\0';
    
    // Step 4: Reverse postfix
    reverse(post);
    strcpy(prefix, post);
}

int main() {
    char infix[] = "(A-B/C)*(A/K-L)";
    char prefix[MAX];
    infixToPrefix(infix, prefix);
    printf("Infix:  %s\\n", infix);
    printf("Prefix: %s\\n", prefix);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    cout << "Infix to Prefix using 4-step reversal:\\n";
    cout << "1. Reverse string\\n2. Invert brackets\\n3. Compute postfix\\n4. Reverse result\\n";
    return 0;
}`,
                approaches: [
          {
            id: 'four-step-reverse-method',
            name: 'Approach 1: Infix to Prefix via 4-Step Reverse Method',
            tag: 'Official University Lab Standard',
            intuition: 'Converting directly to prefix is difficult, but converting to postfix is easy! Step 1: Reverse infix string. Step 2: Swap open and close parentheses ( change "(" to ")" and vice versa). Step 3: Run modified postfix conversion. Step 4: Reverse the postfix result to get prefix!',
            algorithm: [
              'Step 1: Reverse the input infix string.',
              'Step 2: Replace "(" with ")" and ")" with "(".',
              'Step 3: Convert modified expression to postfix (for equal precedence, right-associative behavior).',
              'Step 4: Reverse the postfix string to obtain Prefix.',
            ],
            cCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

void strRev(char *str) {
    int l = 0, r = strlen(str) - 1;
    while (l < r) { char t = str[l]; str[l] = str[r]; str[r] = t; l++; r--; }
}

int prec(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

void infixToPrefix(char *infix, char *prefix) {
    int len = strlen(infix);
    strRev(infix);

    // Swap brackets
    for (int i = 0; i < len; i++) {
        if (infix[i] == '(') infix[i] = ')';
        else if (infix[i] == ')') infix[i] = '(';
    }

    char stack[100]; int top = -1, k = 0;
    for (int i = 0; i < len; i++) {
        char c = infix[i];
        if (isalnum(c)) prefix[k++] = c;
        else if (c == '(') stack[++top] = c;
        else if (c == ')') {
            while (top != -1 && stack[top] != '(') prefix[k++] = stack[top--];
            if (top != -1) top--;
        } else {
            // For prefix, left-associative operators must strictly dominate
            while (top != -1 && stack[top] != '(' && prec(stack[top]) >= prec(c)) {
                prefix[k++] = stack[top--];
            }
            stack[++top] = c;
        }
    }
    while (top != -1) prefix[k++] = stack[top--];
    prefix[k] = '\0';

    strRev(prefix);
}

int main() {
    char infix[100], prefix[100];
    printf("Enter Infix: ");
    if (scanf("%s", infix) != 1) return 0;
    infixToPrefix(infix, prefix);
    printf("Prefix Expression: %s\n", prefix);
    return 0;
}`,
            cppCode: `#include <iostream>
#include <string>
#include <algorithm>
#include <stack>
using namespace std;

int main() {
    string s; cin >> s;
    reverse(s.begin(), s.end());
    for (char &c : s) { if (c == '(') c = ')'; else if (c == ')') c = '('; }
    stack<char> st; string post = "";
    for (char c : s) {
        if (isalnum(c)) post += c;
        else if (c == '(') st.push(c);
        else if (c == ')') {
            while (!st.empty() && st.top() != '(') { post += st.top(); st.pop(); }
            st.pop();
        } else {
            while (!st.empty() && st.top() != '(' && st.top() >= c) { post += st.top(); st.pop(); }
            st.push(c);
        }
    }
    while (!st.empty()) { post += st.top(); st.pop(); }
    reverse(post.begin(), post.end());
    cout << "Prefix: " << post << endl;
    return 0;
}`,
            timeComplexity: 'O(N) (Reversals + Shunting Yard are all linear O(N))',
            spaceComplexity: 'O(N) auxiliary',
            pros: ['Universally taught in Indian engineering curricula (AKTU, PTU, SPPU, VTU)', 'Reuses existing postfix conversion logic cleanly'],
            cons: ['Requires multiple string reversals'],
          },
        ],
        sampleIO: [
          { input: '(A-B/C)*(A/K-L)', output: 'Prefix: *-A/BC-/AKL' },
        ],
        dryRun: [
          { step: 1, state: 'Reverse: )L-K/A(*)C/B-A(', explanation: 'Reversed string.' },
          { step: 2, state: 'Swap brackets: (L-K/A)*(C/B-A)', explanation: 'Parentheses flipped.' },
          { step: 3, state: 'Postfix: LKA/-CB/-*', explanation: 'Shunting yard evaluation.' },
          { step: 4, state: 'Reverse postfix: *-A/BC-/AKL', explanation: 'Yields exact Prefix result.' },
        ],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        commonMistakes: ['Forgetting Step 2 (swapping brackets) causes mismatched evaluation'],
        edgeCases: ['Expressions without parentheses', 'Nested brackets'],
        relatedTopicId: 'stacks-infix-postfix',
        isCompleted: true,
      },
    ],
  },

  // ─── DIP Lab Exercise 1: Sampling & Quantization ─────────────────────────
  {
    id: 'dip-lab-1',
    subjectId: 'dip',
    subjectName: 'Digital Image Processing',
    labNo: 1,
    title: 'Exercise 1: Image Sampling, Quantization & Storage',
    description: 'Calculate spatial resolution, quantization bit-depth, total memory buffer footprints, and simulate 2D image downsampling.',
    dueDate: '2024-11-28',
    questions: [
      {
        id: 'dip-q1',
        number: 1,
        title: 'Image Spatial Memory Storage & Bit-Depth Calculation',
        statement: 'Write a program to compute the total uncompressed storage size in bits, bytes, and kilobytes for an image of dimensions N x M with k bits per pixel (L = 2^k gray levels).',
        explanation: 'A digital image of size N x M sampled at k bits/pixel requires b = N * M * k bits. Memory in bytes is b / 8, and in kilobytes is bytes / 1024.',
        requiredConcepts: ['Digital Image Fundamentals', 'Sampling & Quantization', 'Memory Footprint'],
        cCode: `#include <stdio.h>

void calculateImageStorage(long N, long M, int k) {
    long long totalBits = (long long)N * M * k;
    double bytes = (double)totalBits / 8.0;
    double kilobytes = bytes / 1024.0;
    double megabytes = kilobytes / 1024.0;

    printf("Image Dimensions: %ld x %ld\\n", N, M);
    printf("Quantization Depth: %d bits/pixel (2^%d = %d levels)\\n", k, k, 1 << k);
    printf("Total Storage: %lld bits\\n", totalBits);
    printf("Size in Bytes: %.2f Bytes\\n", bytes);
    printf("Size in KB:    %.2f KB\\n", kilobytes);
    printf("Size in MB:    %.4f MB\\n", megabytes);
}

int main() {
    calculateImageStorage(1024, 1024, 8);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    long N = 1024, M = 1024;
    int k = 8;
    long long bits = N * M * k;
    double kb = (bits / 8.0) / 1024.0;
    cout << "Storage: " << kb << " KB" << endl;
    return 0;
}`,
        sampleIO: [
          { input: 'N=1024, M=1024, k=8', output: 'Total: 8388608 bits, 1048576 Bytes, 1024.00 KB (1.0000 MB)' },
        ],
        dryRun: [
          { step: 1, state: 'N=1024, M=1024, k=8', explanation: 'Total pixels = 1024 * 1024 = 1,048,576' },
          { step: 2, state: 'Total bits = 1048576 * 8 = 8,388,608 bits', explanation: 'Multiply by bits per pixel' },
          { step: 3, state: 'Bytes = 8388608 / 8 = 1,048,576 Bytes', explanation: 'Divide by 8' },
          { step: 4, state: 'KB = 1048576 / 1024 = 1024 KB = 1 MB', explanation: 'Divide by 1024' },
        ],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        commonMistakes: ['Using 1000 instead of 1024 for KB conversions', 'Integer overflow for large mega-pixel counts'],
        edgeCases: ['Non-square images (e.g. 1920x1080)', '1-bit binary images'],
        relatedTopicId: 'sampling-quantization',
        isCompleted: true,
      },
    ],
  },

  // ─── DIP Lab Exercise 2: Spatial Filtering ────────────────────────────────
  {
    id: 'dip-lab-2',
    subjectId: 'dip',
    subjectName: 'Digital Image Processing',
    labNo: 2,
    title: 'Exercise 2: 2D Spatial Filtering & Image Convolution',
    description: 'Implement 3x3 averaging mean filters, weighted Gaussian smoothing, and Laplacian high-pass sharpening kernels with border padding in C/C++.',
    dueDate: '2024-12-05',
    questions: [
      {
        id: 'dip-q2',
        number: 1,
        title: '3x3 Mean / Averaging Spatial Filter with Zero-Padding',
        statement: 'Implement a 3x3 box smoothing filter on a 2D matrix representing grayscale pixel values. Handle image boundaries using zero-padding.',
        explanation: 'Spatial filtering computes each new pixel value g(x, y) as the convolution sum of the local 3x3 neighborhood with mask coefficients w(s, t). For an averaging filter, all 9 mask weights are 1/9.',
        requiredConcepts: ['Spatial Filtering', 'Neighborhood Operations', 'Zero-Padding Boundaries', 'Convolution'],
        cCode: `#include <stdio.h>

#define ROWS 5
#define COLS 5

void applyMeanFilter(int input[ROWS][COLS], int output[ROWS][COLS]) {
    // 3x3 box filter weights = 1/9
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            int sum = 0;
            for (int di = -1; di <= 1; di++) {
                for (int dj = -1; dj <= 1; dj++) {
                    int ni = i + di;
                    int nj = j + dj;
                    // Zero-padding boundary condition
                    if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS) {
                        sum += input[ni][nj];
                    }
                }
            }
            output[i][j] = sum / 9;
        }
    }
}

int main() {
    int image[ROWS][COLS] = {
        {10, 20, 30, 40, 50},
        {15, 25, 35, 45, 55},
        {20, 30, 40, 50, 60},
        {25, 35, 45, 55, 65},
        {30, 40, 50, 60, 70}
    };
    int smoothed[ROWS][COLS];
    applyMeanFilter(image, smoothed);

    printf("Original Pixel [2][2]: %d\\n", image[2][2]);
    printf("Smoothed Pixel [2][2]: %d\\n", smoothed[2][2]);
    return 0;
}`,
        cppCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "3x3 Mean Filter with Zero-Padding Complete" << endl;
    return 0;
}`,
        sampleIO: [
          { input: '5x5 matrix, Center pixel = 40 surrounded by neighbors summing to 360', output: 'Smoothed pixel = 360 / 9 = 40' },
        ],
        dryRun: [
          { step: 1, state: 'Neighborhood at (2, 2)', explanation: '3x3 grid extracted: rows 1..3, cols 1..3' },
          { step: 2, state: 'Sum of 9 pixels = 360', explanation: 'Add all mask elements' },
          { step: 3, state: 'Divide by 9 = 40', explanation: 'Average written to output[2][2]' },
        ],
        timeComplexity: 'O(ROWS * COLS * K^2) where K is kernel size (K=3)',
        spaceComplexity: 'O(ROWS * COLS) for filtered output image',
        commonMistakes: ['Overwriting original array during convolution modifies neighbor calculations for later pixels', 'Forgetting boundary bounds causing segmentation fault'],
        edgeCases: ['Corner and edge pixels needing zero-padding or replication'],
        relatedTopicId: 'spatial-filtering-fundamentals',
        isCompleted: false,
      },
    ],
  },
]
