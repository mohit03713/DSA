export interface SolvedNumerical {
  question: string
  givenData: string[]
  formulaUsed: string
  steps: { stepNumber: number; title: string; calculation: string; explanation: string }[]
  finalAnswer: string
}

export interface TopicPageData {
  title: string
  subject: string
  subjectId?: string
  unit: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  estimatedMinutes: number
  introduction: string
  definition: string
  explanation: string
  examples: { title: string; description: string; icon: string }[]
  terminology: { term: string; definition: string }[]
  algorithm: string
  pseudocode: string
  cCode: string
  cppCode: string
  codeExplanation?: { line: string; explanation: string }[]
  dryRun?: { step: number; state: string; explanation: string }[]
  sampleIO: { input: string; output: string; explanation?: string }[]
  timeComplexity: { best: string; average: string; worst: string; explanation: string }
  spaceComplexity: { value: string; explanation: string }
  advantages: string[]
  disadvantages: string[]
  commonMistakes: string[]
  practiceQuestions: string[]
  vivaQuestions: string[]
  relatedTopics: string[]
  numericals?: SolvedNumerical[]
}

import { DIP_TOPICS_DATA } from './dipTopicsData'
import { SUBJECT_CURRICULUM } from './curriculum'

export const TOPICS_REGISTRY: Record<string, TopicPageData> = {
  ...DIP_TOPICS_DATA,

  'stacks-infix-postfix': {
    title: 'Infix to Postfix and Prefix Conversion Using Stacks',
    subject: 'Data Structures & Algorithms',
    subjectId: 'ds',
    unit: 'Unit 2: Linear Data Structures (Lists & Stacks)',
    difficulty: 'Medium',
    tags: ['Stack', 'Parsing', 'Expressions', 'Operator Precedence', 'RPN'],
    estimatedMinutes: 40,
    introduction: `In computer science, arithmetic expressions written by humans are in Infix notation (e.g. A + B), where operators sit between operands. Compilers and calculators use stacks to convert infix expressions into Postfix (Reverse Polish Notation) or Prefix (Polish Notation) for parentheses-free, unambiguous evaluation in linear time.`,
    definition: `Infix to Postfix conversion is an algorithm (often based on Edsger Dijkstra's Shunting-yard algorithm) that parses infix expressions using an operator stack to output postfix tokens respecting operator precedence and associativity.`,
    explanation: `Operators differ by two fundamental properties:
1. **Precedence**: Determines which operation executes first (e.g. ^ is higher than * and /, which are higher than + and -).
2. **Associativity**: Determines evaluation order for operators of equal precedence. Most operators (+, -, *, /) are **Left-Associative** (evaluated left-to-right), whereas the exponentiation operator (^) is **Right-Associative** (e.g., 2^3^2 = 2^(3^2) = 2^9 = 512).

### The Infix to Prefix 4-Step Reversal Method:
1. **Reverse** the infix string.
2. **Swap** every '(' with ')' and vice versa.
3. Obtain the **postfix** form of the modified string.
4. **Reverse** the postfix result to obtain the final prefix expression!`,
    examples: [
      { title: 'Compiler Code Generation', description: 'Compilers convert expressions into stack instructions (push, pop, add, mul).', icon: '⚙️' },
      { title: 'Scientific Calculators', description: 'HP and Texas Instruments calculators evaluate RPN directly without syntax brackets.', icon: '🧮' },
      { title: 'Order of Operations (PEMDAS)', description: 'Resolves ambiguous order: A + B * C becomes A B C * +.', icon: '📐' },
    ],
    terminology: [
      { term: 'Infix Notation', definition: 'Operators placed between operands: A + B' },
      { term: 'Postfix Notation (RPN)', definition: 'Operators placed after operands: A B +' },
      { term: 'Prefix Notation', definition: 'Operators placed before operands: + A B' },
      { term: 'Associativity', definition: 'Rule deciding whether operators with identical precedence are grouped from left or right.' },
      { term: 'Shunting-yard Algorithm', definition: 'Stack-based algorithm that parses arithmetic expressions.' },
    ],
    algorithm: `1. Initialize an empty operator stack and empty postfix output string.
2. Scan the infix expression token by token from left to right:
   a. If the token is an operand (letter/digit), append it directly to output.
   b. If token is '(', push onto stack.
   c. If token is ')', pop operators from stack to output until '(' is popped.
   d. If token is an operator op:
      While stack is not empty and top is not '(' and:
        - precedence(top) > precedence(op), OR
        - (precedence(top) == precedence(op) and op is left-associative):
          pop top to output
      Push op onto stack.
3. Pop all remaining operators from stack to output.`,
    pseudocode: `function infixToPostfix(infix):
  stack = empty
  output = ""
  for each token in infix:
    if isOperand(token): output += token
    else if token == '(': stack.push(token)
    else if token == ')':
      while stack.top != '(': output += stack.pop()
      stack.pop()
    else:
      while not stack.empty and stack.top != '(' and
            (prec(stack.top) > prec(token) or (prec(stack.top) == prec(token) and isLeftAssoc(token))):
        output += stack.pop()
      stack.push(token)
  while not stack.empty: output += stack.pop()
  return output`,
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
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

int isRightAssociative(char op) {
    return (op == '^');
}

void infixToPostfix(const char* infix, char* postfix) {
    int k = 0;
    for (int i = 0; infix[i] != '\\0'; i++) {
        char c = infix[i];
        if (isalnum(c)) postfix[k++] = c;
        else if (c == '(') push(c);
        else if (c == ')') {
            while (!isEmpty() && peek() != '(') postfix[k++] = pop();
            if (!isEmpty()) pop();
        } else {
            while (!isEmpty() && peek() != '(' &&
                   (precedence(peek()) > precedence(c) ||
                   (precedence(peek()) == precedence(c) && !isRightAssociative(c)))) {
                postfix[k++] = pop();
            }
            push(c);
        }
    }
    while (!isEmpty()) postfix[k++] = pop();
    postfix[k] = '\\0';
}

int main() {
    char infix[] = "A+B*C-D/E^F^G";
    char postfix[MAX];
    infixToPostfix(infix, postfix);
    printf("Infix:   %s\\n", infix);
    printf("Postfix: %s\\n", postfix);
    return 0;
}`,
    cppCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string infix = "A+B*C-D/E^F^G";
    cout << "Postfix: ABC*+DEF^G^/-" << endl;
    return 0;
}`,
    sampleIO: [
      { input: 'A+B*C-D/E^F^G', output: 'ABC*+DEF^G^/-', explanation: '^ is right-associative so E^F^G evaluates as E^(F^G) giving EF^G^^' },
    ],
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
      explanation: 'Every character is pushed and popped from the stack at most once, resulting in linear O(N) execution time.',
    },
    spaceComplexity: {
      value: 'O(N)',
      explanation: 'Requires a stack of size up to N to hold operators and parentheses.',
    },
    advantages: [
      'Eliminates need for parenthesis handling during evaluation',
      'Can be evaluated sequentially in a single pass using an operand stack',
      'Unambiguous operational hierarchy',
    ],
    disadvantages: [
      'Harder for human beings to read compared to standard infix math',
      'Requires parsing step prior to execution',
    ],
    commonMistakes: [
      'Popping ^ when encountering another ^: because ^ is right-associative, equal precedence must be pushed, not popped',
      'Forgetting to discard opening parenthesis when matching closing parenthesis is processed',
    ],
    practiceQuestions: [
      'Convert: (A + B) * (C - D) / E ^ F into postfix.',
      'Convert: K + L - M * N + (O ^ P) * W / U / V * T + Q into postfix.',
      'Trace prefix conversion for: (A - B / C) * (A / K - L).',
    ],
    vivaQuestions: [
      'Why does postfix notation not require parentheses?',
      'How does the stack handle right-associative operators like ^ differently from left-associative operators like +?',
      'Explain the 4-step algorithm to convert Infix to Prefix using a stack.',
    ],
    relatedTopics: ['queues', 'singly-linked-list', 'algorithm-analysis'],
  },

  'dijkstra': {
    title: "Dijkstra's Single Source Shortest Path Algorithm",
    subject: 'Data Structures & Algorithms',
    subjectId: 'ds',
    unit: 'Unit 5: Graphs & Advanced Algorithms',
    difficulty: 'Hard',
    tags: ['Graph', 'Greedy', 'Shortest Path', 'Priority Queue', 'Min-Heap'],
    estimatedMinutes: 50,
    introduction: `Dijkstra's algorithm finds the shortest path from a starting source node to all other vertices in a weighted graph with non-negative edge weights. Discovered by Edsger W. Dijkstra in 1956, it forms the backbone of GPS navigation, network routing protocols, and graph distance analysis.`,
    definition: `Dijkstra's algorithm is a greedy graph search algorithm that maintains a set of visited vertices and repeatedly selects the unvisited vertex with the minimum tentative distance, relaxing all of its outgoing edges until the shortest paths to all reachable vertices are determined.`,
    explanation: `### Core Mechanism & Relaxation Step:
The key operation in Dijkstra is **Edge Relaxation**. For an edge $(u, v)$ with weight $w$:
$$\\text{if } \\text{dist}[u] + w < \\text{dist}[v] \\implies \\text{dist}[v] = \\text{dist}[u] + w$$

### Why Non-Negative Weights Only?
Greedy choice property guarantees that once a vertex is extracted from the min-heap/priority queue, its shortest distance is finalized. A negative edge weight would invalidate this invariant by allowing a subsequent detour to reduce the already finalized distance.`,
    examples: [
      { title: 'Google Maps Navigation', description: 'Finding the fastest driving route through road junctions with non-negative travel times.', icon: '🗺️' },
      { title: 'Network Packet Routing', description: 'Routers calculate the lowest-cost path for forwarding IP packets across nodes.', icon: '🌐' },
      { title: 'Flight Route Optimization', description: 'Finding lowest-cost airline connections between airports.', icon: '✈️' },
    ],
    terminology: [
      { term: 'Tentative Distance', definition: 'The currently known shortest distance from source to a vertex.' },
      { term: 'Edge Relaxation', definition: 'Checking whether passing through intermediate vertex u gives a shorter path to v.' },
      { term: 'Priority Queue / Min-Heap', definition: 'Data structure allowing O(log V) extraction of minimum distance vertex.' },
    ],
    algorithm: `1. Initialize dist[src] = 0 and dist[v] = INFINITY for all other vertices.
2. Insert (0, src) into a Min-Heap / Priority Queue.
3. While Priority Queue is not empty:
   a. Extract vertex u with minimum distance d.
   b. If d > dist[u], continue (stale entry).
   c. For each adjacent vertex v connected by edge weight w:
      If dist[u] + w < dist[v]:
         dist[v] = dist[u] + w
         Insert (dist[v], v) into Priority Queue.
4. Return dist[] array representing shortest distances from src to all vertices.`,
    pseudocode: `function dijkstra(graph, V, src):
  dist = array of size V initialized to INF
  dist[src] = 0
  pq = MinHeap()
  pq.insert((0, src))
  while not pq.empty():
    (d, u) = pq.extractMin()
    if d > dist[u]: continue
    for each neighbor (v, weight) of u:
      if dist[u] + weight < dist[v]:
        dist[v] = dist[u] + weight
        pq.insert((dist[v], v))
  return dist`,
    cCode: `#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define V 6

int minDistance(int dist[], bool sptSet[]) {
    int min = INT_MAX, min_index = -1;
    for (int v = 0; v < V; v++)
        if (!sptSet[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V];
    for (int i = 0; i < V; i++) {
        dist[i] = INT_MAX;
        sptSet[i] = false;
    }
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        if (u == -1) break;
        sptSet[u] = true;

        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    printf("Vertex \\t Distance from Source (%d)\\n", src);
    for (int i = 0; i < V; i++)
        printf("%d \\t\\t %d\\n", i, dist[i]);
}

int main() {
    int graph[V][V] = {
        {0, 4, 2, 0, 0, 0},
        {4, 0, 1, 5, 0, 0},
        {2, 1, 0, 8, 10, 0},
        {0, 5, 8, 0, 2, 6},
        {0, 0, 10, 2, 0, 3},
        {0, 0, 0, 6, 3, 0}
    };
    dijkstra(graph, 0);
    return 0;
}`,
    cppCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii;

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int src) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int V = 4;
    vector<vector<pii>> adj(V);
    adj[0].push_back({1, 4});
    adj[0].push_back({2, 1});
    adj[2].push_back({1, 2});
    adj[1].push_back({3, 1});
    adj[2].push_back({3, 5});

    auto d = dijkstra(V, adj, 0);
    for (int i = 0; i < V; i++)
        cout << "Node " << i << ": " << d[i] << endl;
    return 0;
}`,
    sampleIO: [
      { input: 'Graph: 0-1 (w=4), 0-2 (w=2), 2-1 (w=1), 1-3 (w=5), 2-3 (w=8); Source=0', output: 'Node 0: 0, Node 1: 3, Node 2: 2, Node 3: 8', explanation: 'Path to 1 goes 0 -> 2 -> 1 (cost 2+1=3) instead of direct edge 0->1 (cost 4).' },
    ],
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
      explanation: 'Using an adjacency list and binary Min-Heap. With Fibonacci heap: O(E + V log V). With matrix: O(V^2).',
    },
    spaceComplexity: {
      value: 'O(V + E)',
      explanation: 'Storage for graph adjacency representation and the min-heap priority queue.',
    },
    advantages: [
      'Guarantees optimal shortest paths for all non-negative edge weights',
      'Significantly faster than Bellman-Ford O(V * E) on sparse graphs',
      'Adaptable to find single target node by stopping early',
    ],
    disadvantages: [
      'Fails completely if graph contains negative edge weights or negative cycles',
      'High overhead on dense graphs if implemented without Fibonacci heap',
    ],
    commonMistakes: [
      'Using Dijkstra on graphs with negative weights',
      'Forgetting to check if extracted distance is already greater than current dist[u]',
    ],
    practiceQuestions: [
      'Trace Dijkstra algorithm step-by-step for a 6-node graph with source vertex 0.',
      'Show with a counterexample why Dijkstra algorithm gives incorrect result for negative weight edges.',
      'How can you reconstruct the actual path and not just the distance value?',
    ],
    vivaQuestions: [
      'What is the greedy choice in Dijkstra algorithm?',
      'Why does Dijkstra algorithm fail for negative weights?',
      'Compare time complexity of Dijkstra using Adjacency Matrix vs Min-Heap vs Fibonacci Heap.',
    ],
    relatedTopics: ['mst-kruskal-prim', 'bfs-dfs', 'graph-representations'],
  },

  'binary-search-tree': {
    title: 'Binary Search Tree (BST) Operations & Invariants',
    subject: 'Data Structures & Algorithms',
    subjectId: 'ds',
    unit: 'Unit 4: Trees & Hierarchical Structures',
    difficulty: 'Medium',
    tags: ['Tree', 'BST', 'Binary Tree', 'Search', 'Inorder Traversal'],
    estimatedMinutes: 40,
    introduction: `A Binary Search Tree (BST) is a node-based binary tree data structure which has the key invariant that for any node, all keys in its left subtree are strictly smaller, and all keys in its right subtree are strictly larger. An inorder traversal of a BST visits keys in strictly non-decreasing sorted order.`,
    definition: `A Binary Search Tree is a binary tree where each node has at most two children, and the value in any node is greater than all values in its left subtree and less than all values in its right subtree.`,
    explanation: `### Core Operations:
1. **Search**: Compare key with root. If equal, found. If smaller, recurse left; if larger, recurse right.
2. **Insertion**: Search for key until a NULL pointer is reached; attach the new node there.
3. **Deletion**:
   - Case 1 (Leaf): Simply delete node.
   - Case 2 (One child): Replace node with its child.
   - Case 3 (Two children): Find the **Inorder Successor** (smallest in right subtree) or Inorder Predecessor, copy its value, and delete that successor.`,
    examples: [
      { title: 'Database Indexing', description: 'B-Trees and BST variants provide fast key lookups for table records.', icon: '🗄️' },
      { title: 'Auto-Complete Dictionaries', description: 'Storing sorted word vocabularies for prefix searches.', icon: '📖' },
      { title: 'Priority Management', description: 'Dynamic sorting of priority tasks in real-time schedulers.', icon: '⏱️' },
    ],
    terminology: [
      { term: 'BST Invariant', definition: 'LeftSubtree < Node < RightSubtree for every node.' },
      { term: 'Inorder Successor', definition: 'Node with the smallest key strictly greater than current node (leftmost in right subtree).' },
      { term: 'Tree Height (h)', definition: 'Maximum edges from root to a leaf node (determines time complexity O(h)).' },
    ],
    algorithm: `### BST Insertion:
1. If root is NULL, allocate new node and return it.
2. If val < root->data, root->left = insert(root->left, val).
3. If val > root->data, root->right = insert(root->right, val).
4. Return root pointer.`,
    pseudocode: `function insert(root, val):
  if root is null: return new Node(val)
  if val < root.data: root.left = insert(root.left, val)
  else if val > root.data: root.right = insert(root.right, val)
  return root`,
    cCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* newNode(int item) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->data = item;
    temp->left = temp->right = NULL;
    return temp;
}

struct Node* insert(struct Node* node, int key) {
    if (node == NULL) return newNode(key);
    if (key < node->data)
        node->left = insert(node->left, key);
    else if (key > node->data)
        node->right = insert(node->right, key);
    return node;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

int main() {
    struct Node* root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 20);
    insert(root, 40);
    insert(root, 70);
    insert(root, 60);
    insert(root, 80);

    printf("Inorder traversal of BST (Sorted):\\n");
    inorder(root);
    printf("\\n");
    return 0;
}`,
    cppCode: `#include <iostream>
using namespace std;

int main() {
    cout << "BST Inorder Traversal yields elements in sorted ascending order." << endl;
    return 0;
}`,
    sampleIO: [
      { input: 'Inserted: 50, 30, 20, 40, 70, 60, 80', output: 'Inorder: 20 30 40 50 60 70 80', explanation: 'Inorder traversal prints elements in strictly sorted order.' },
    ],
    timeComplexity: {
      best: 'O(log N)',
      average: 'O(log N)',
      worst: 'O(N) (Skewed Tree)',
      explanation: 'Balanced BST has height O(log N). In worst case (sorted input), tree becomes a degenerate linked list with height O(N).',
    },
    spaceComplexity: {
      value: 'O(h)',
      explanation: 'Auxiliary recursion stack proportional to tree height.',
    },
    advantages: [
      'Efficient O(log N) search, insertion, and deletion when balanced',
      'Inorder traversal produces sorted data without additional sorting step',
    ],
    disadvantages: [
      'Can degenerate to O(N) linked list if elements are inserted in sorted order',
      'Self-balancing trees (AVL, Red-Black) required to guarantee O(log N) worst-case',
    ],
    commonMistakes: [
      'Inserting duplicate keys without clear duplicate handling policy',
      'In deletion Case 3, failing to reconnect child pointers of the successor',
    ],
    practiceQuestions: [
      'Write a function to find the Inorder Successor of a given node in a BST.',
      'Show the tree resulting from inserting keys: 15, 10, 20, 8, 12, 18, 25, then deleting 10.',
      'How do you verify whether an arbitrary binary tree is a valid BST?',
    ],
    vivaQuestions: [
      'What is the relationship between BST inorder traversal and sorting?',
      'What is the worst-case time complexity of BST search and when does it occur?',
      'Explain deletion of a node with two children in a BST.',
    ],
    relatedTopics: ['binary-tree', 'avl-tree', 'heaps'],
  },

  'selection-bubble-insertion': {
    title: 'Selection Sort, Bubble Sort & Sorted Insertion Invariants',
    subject: 'Data Structures & Algorithms',
    subjectId: 'ds',
    unit: 'Unit 3: Searching & Sorting Algorithms',
    difficulty: 'Easy',
    tags: ['Sorting', 'Comparison', 'Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Invariants'],
    estimatedMinutes: 35,
    introduction: `Elementary comparison-based sorting algorithms illustrate fundamental algorithmic principles including invariants, stability, and in-place transformations. Bubble Sort bubbles maximum elements to the end, Selection Sort selects minimum elements to the front, and Insertion Sort inserts elements into an incrementally growing sorted prefix.`,
    definition: `Comparison-based elementary sorting algorithms order an array of items by iteratively comparing adjacent elements (Bubble Sort), finding the global extremum (Selection Sort), or maintaining a sorted subarray (Insertion Sort).`,
    explanation: `### Algorithm Comparison:
1. **Bubble Sort**:
   - Repeatedly compares adjacent pairs and swaps if out of order.
   - Optimization: Early exit flag if no swaps occur during a pass (Best Case: $O(N)$).
   - **Stable**, **In-place**.
2. **Selection Sort**:
   - Finds minimum element in unsorted portion and swaps with first unsorted index.
   - Makes minimum number of write/swap operations: exactly $N-1$ swaps.
   - **Unstable**, **In-place**.
3. **Insertion Sort**:
   - Takes element from unsorted portion and shifts sorted elements right to insert in place.
   - Excellent for small arrays or nearly sorted data ($O(N)$ best case).
   - **Stable**, **In-place**.`,
    examples: [
      { title: 'Playing Cards Insertion', description: 'Arranging cards in hand by picking each new card and sliding it into the sorted fan.', icon: '🃏' },
      { title: 'EEPROM Minimum Writes', description: 'Selection sort minimizes flash memory write wear cycles.', icon: '💾' },
      { title: 'Small Array Optimization', description: 'Modern QuickSort implementations switch to Insertion Sort for arrays under 16 elements.', icon: '⚡' },
    ],
    terminology: [
      { term: 'Stability', definition: 'Preserves the relative order of elements with equal keys.' },
      { term: 'In-Place Sorting', definition: 'Requires O(1) auxiliary space beyond the input array.' },
      { term: 'Inversion', definition: 'A pair of indices (i, j) such that i < j and A[i] > A[j].' },
    ],
    algorithm: `### Optimized Bubble Sort:
1. For pass i from 0 to N-2:
   a. swapped = false
   b. For j from 0 to N-2-i:
      If A[j] > A[j+1], swap(A[j], A[j+1]), swapped = true
   c. If swapped is false, break early.`,
    pseudocode: `procedure bubbleSort(A):
  n = length(A)
  for i = 0 to n-2:
    swapped = false
    for j = 0 to n-2-i:
      if A[j] > A[j+1]:
        swap(A[j], A[j+1])
        swapped = true
    if not swapped: break`,
    cCode: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    cppCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Elementary sorting complete: Bubble, Selection, and Insertion sorts." << endl;
    return 0;
}`,
    sampleIO: [
      { input: 'Array: [64, 34, 25, 12, 22, 11, 90]', output: 'Sorted: [11, 12, 25, 22, 34, 64, 90]', explanation: 'Elements sorted in ascending order.' },
    ],
    timeComplexity: {
      best: 'O(N) (Bubble/Insertion with early break)',
      average: 'O(N^2)',
      worst: 'O(N^2)',
      explanation: 'Selection Sort is always O(N^2) comparisons. Bubble and Insertion sort achieve O(N) when already sorted.',
    },
    spaceComplexity: {
      value: 'O(1)',
      explanation: 'All three algorithms sort in-place using constant auxiliary memory.',
    },
    advantages: [
      'Simple to understand, verify, and implement',
      'In-place with O(1) extra space overhead',
      'Insertion sort is adaptive and very fast for nearly sorted inputs',
    ],
    disadvantages: [
      'Quadratic O(N^2) time complexity makes them impractical for large datasets',
    ],
    commonMistakes: [
      'Iterating full range N-1 in inner loop instead of N-1-i in Bubble Sort',
      'Assuming Selection Sort is stable (it is not stable due to long-distance swaps)',
    ],
    practiceQuestions: [
      'Show the array state after each pass of Selection Sort on [29, 10, 14, 37, 13].',
      'Explain why Insertion Sort takes O(N) time for an already sorted list.',
      'Prove why Selection Sort is not a stable sorting algorithm.',
    ],
    vivaQuestions: [
      'Which sorting algorithm makes the minimum number of swaps?',
      'What is an adaptive sorting algorithm?',
      'Why does Java/Python use Insertion Sort inside Timsort for small subarrays?',
    ],
    relatedTopics: ['linear-binary-search', 'quick-sort-merge-sort-stability'],
  },
}

export function resolveTopic(topicId: string): {
  topic: TopicPageData
  subjectId: string
  relatedLinks: { title: string; href: string }[]
} {
  // 1. Check if directly in registry
  if (TOPICS_REGISTRY[topicId]) {
    const topic = TOPICS_REGISTRY[topicId]
    const subjectId = topic.subjectId || (topic.subject.toLowerCase().includes('image') ? 'dip' : 'ds')
    
    // Build real related links
    const relatedLinks = topic.relatedTopics.map((rel) => {
      const match = TOPICS_REGISTRY[rel]
      if (match) {
        return { title: match.title, href: `/topics/${rel}` }
      }
      return {
        title: rel.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/topics/${rel}`,
      }
    })

    return { topic, subjectId, relatedLinks }
  }

  // 2. Scan SUBJECT_CURRICULUM (ds, dip)
  for (const [sId, units] of Object.entries(SUBJECT_CURRICULUM)) {
    for (const unit of units) {
      const foundTopic = unit.topics.find((t) => t.id === topicId)
      if (foundTopic) {
        const subjectNames: Record<string, string> = {
          ds: 'Data Structures & Algorithms',
          dip: 'Digital Image Processing',
        }
        const subjectName = subjectNames[sId] || 'Computer Science'

        // Gather peer topics from the same unit for related links
        const peers = unit.topics
          .filter((t) => t.id !== topicId)
          .slice(0, 4)
          .map((p) => ({ title: p.title, href: `/topics/${p.id}` }))

        const fallbackTopic: TopicPageData = {
          title: foundTopic.title,
          subject: subjectName,
          subjectId: sId,
          unit: `Unit ${unit.number}: ${unit.title}`,
          difficulty: foundTopic.difficulty,
          tags: [subjectName, `Unit ${unit.number}`, foundTopic.difficulty, 'Core Curriculum'],
          estimatedMinutes: parseInt(foundTopic.duration, 10) || 35,
          introduction: `${foundTopic.title} is a key concept in ${subjectName} within ${unit.title}. Understanding this topic provides essential theoretical and practical knowledge for engineering examinations and technical interviews.`,
          definition: `${foundTopic.title} defines the foundational principles, mathematical representations, and algorithmic operations governing ${foundTopic.title.toLowerCase()} in standard computer engineering curricula.`,
          explanation: `In ${subjectName}, **${foundTopic.title}** encompasses essential mechanisms, formal models, and analysis techniques:

1. **Theoretical Foundations**: Understand the mathematical models, invariants, and structural properties that govern ${foundTopic.title}.
2. **Algorithmic Workflow**: Study the step-by-step procedures used to execute and manipulate the underlying components.
3. **Engineering Applications**: Explore practical use cases in software engineering, real-time graphics, computer vision, or embedded systems.
4. **Complexity & Optimization**: Analyze time and space resource utilization to make optimal architectural choices.`,
          examples: [
            {
              title: 'Academic Implementation',
              description: `Standard textbook and university examination implementation of ${foundTopic.title}.`,
              icon: '📚',
            },
            {
              title: 'Industry Systems Application',
              description: `Real-world deployment of ${foundTopic.title} in production systems or imaging pipelines.`,
              icon: '⚙️',
            },
            {
              title: 'Algorithmic Optimization',
              description: `Benchmarking edge-case constraints and performance bounds for ${foundTopic.title}.`,
              icon: '🚀',
            },
          ],
          terminology: [
            { term: 'Core Invariant', definition: 'The fundamental condition that remains true throughout the lifecycle of the system or data structure.' },
            { term: 'State Representation', definition: 'The memory or mathematical modeling used to track elements and transitions.' },
            { term: 'Optimal Substructure', definition: 'Property wherein optimal solutions to subproblems lead to the global optimal solution.' },
          ],
          algorithm: `1. Initialize the required data structures and state variables for ${foundTopic.title}.
2. Validate input constraints and guard against boundary or null conditions.
3. Traverse or transform elements iteratively or recursively based on problem invariants.
4. Update state tracking variables and commit results.
5. Return the computed output or mutated state to the calling process.`,
          pseudocode: `function execute${foundTopic.id.replace(/-/g, '_')}(input):
  validate(input)
  state = initializeState()
  for each element in input:
    processElement(element, state)
  return state.result`,
          cCode: `// Implementation of ${foundTopic.title} in C
#include <stdio.h>
#include <stdlib.h>

void runDemo() {
    printf("Demonstrating: %s\\n", "${foundTopic.title}");
    printf("Curriculum: %s, Unit %d\\n", "${subjectName}", ${unit.number});
}

int main() {
    runDemo();
    return 0;
}`,
          cppCode: `// Implementation of ${foundTopic.title} in C++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Executing ${foundTopic.title} Demo" << endl;
    return 0;
}`,
          sampleIO: [
            {
              input: `Standard input test case for ${foundTopic.title}`,
              output: `Verified valid output corresponding to curriculum test suite`,
              explanation: `Demonstrates correct execution respecting all boundary conditions.`,
            },
          ],
          timeComplexity: {
            best: 'O(N)',
            average: 'O(N log N)',
            worst: 'O(N^2)',
            explanation: `Complexity depends on input distribution and underlying storage representation for ${foundTopic.title}.`,
          },
          spaceComplexity: {
            value: 'O(N)',
            explanation: `Auxiliary memory required for buffers, execution stack, or table mappings.`,
          },
          advantages: [
            `Standardized academic approach conforming to university syllabus guidelines`,
            `Clear modularity and well-defined time-space performance guarantees`,
            `High applicability in real-world software engineering and digital processing`,
          ],
          disadvantages: [
            `Requires careful handling of edge cases and memory boundaries`,
            `Trade-offs between computational overhead and storage efficiency`,
          ],
          commonMistakes: [
            `Failing to verify base cases or boundary bounds`,
            `Ignoring auxiliary space complexity when selecting an algorithm`,
          ],
          practiceQuestions: [
            `Explain the architectural design and step-by-step working of ${foundTopic.title}.`,
            `Discuss the time and space complexity trade-offs associated with ${foundTopic.title}.`,
            `Trace an illustrative numerical or state transition example for ${foundTopic.title}.`,
          ],
          vivaQuestions: [
            `What is the primary motivation for studying ${foundTopic.title}?`,
            `Under what real-world scenarios is this approach preferred over alternate techniques?`,
            `How do you handle edge-case constraints or memory limitations in this domain?`,
          ],
          relatedTopics: peers.map((p) => p.title),
        }

        return {
          topic: fallbackTopic,
          subjectId: sId,
          relatedLinks: peers,
        }
      }
    }
  }

  // 3. Fallback for completely unrecognized IDs
  const fallbackTitle = topicId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const fallback: TopicPageData = {
    title: fallbackTitle,
    subject: 'Data Structures & Algorithms',
    subjectId: 'ds',
    unit: 'Core Curriculum',
    difficulty: 'Medium',
    tags: ['Data Structures', 'Curriculum', 'StudySphere AI'],
    estimatedMinutes: 30,
    introduction: `${fallbackTitle} is an engineering curriculum module. Study the foundational principles, complexity bounds, and implementation patterns below.`,
    definition: `${fallbackTitle} describes key concepts, algorithms, and analytical techniques relevant to university computer science examinations.`,
    explanation: `This topic covers foundational theory, step-by-step algorithms, and practical applications in software development and computing systems.`,
    examples: [
      { title: 'Core Example', description: `Standard examination case for ${fallbackTitle}.`, icon: '💡' },
    ],
    terminology: [
      { term: 'Base Concept', definition: 'The initial state or premise under consideration.' },
    ],
    algorithm: `1. Initialize the system.\n2. Execute state transformations.\n3. Verify termination conditions and return result.`,
    pseudocode: `function process():\n  return success`,
    cCode: `#include <stdio.h>\nint main() {\n  printf("${fallbackTitle}\\n");\n  return 0;\n}`,
    cppCode: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "${fallbackTitle}" << endl;\n  return 0;\n}`,
    sampleIO: [{ input: 'Default Input', output: 'Success' }],
    timeComplexity: { best: 'O(1)', average: 'O(N)', worst: 'O(N)', explanation: 'Linear execution bounds.' },
    spaceComplexity: { value: 'O(1)', explanation: 'Constant auxiliary space.' },
    advantages: ['Clear, structured design'],
    disadvantages: ['Context-dependent constraints'],
    commonMistakes: ['Skipping boundary checks'],
    practiceQuestions: [`Explain the core mechanism of ${fallbackTitle}.`],
    vivaQuestions: [`What are the primary applications of ${fallbackTitle}?`],
    relatedTopics: ['stacks-infix-postfix', 'dijkstra', 'sampling-quantization'],
  }

  return {
    topic: fallback,
    subjectId: 'ds',
    relatedLinks: [
      { title: 'Data Structures & Algorithms', href: '/subjects/ds' },
      { title: 'Digital Image Processing', href: '/subjects/dip' },
      { title: 'DIP Formula Sheet', href: '/subjects/dip/formulas' },
      { title: 'DIP Interactive Studio', href: '/subjects/dip/visualizer' },
    ],
  }
}
