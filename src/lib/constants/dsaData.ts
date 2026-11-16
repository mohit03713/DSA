import type { DSAProblem, Approach } from '@/types'

export interface DetailedDSAProblem extends DSAProblem {
  description: string
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  constraints: string[]
  approaches: Approach[]
}

export const DSA_PROBLEMS: DetailedDSAProblem[] = [
  {
    id: 'two-sum',
    categoryId: 'arrays',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    solveCount: 1250,
    isSolved: true,
    isBookmarked: true,
    relatedTopicId: 'arrays-1d-basics',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, so we return [1, 2].',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    approaches: [
      {
        id: 'two-sum-brute',
        name: 'Approach 1: Brute Force',
        description: 'Check every possible pair in the array and see if their sum matches the target value.',
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        algorithm: '1. Iterate through array from i = 0 to n-1\n2. For each i, iterate j from i+1 to n-1\n3. If nums[i] + nums[j] == target, return indices [i, j]\n4. If no pair found, return empty array',
        pseudocode: `function twoSum(nums, target):
  n = length(nums)
  for i from 0 to n-1:
    for j from i+1 to n-1:
      if nums[i] + nums[j] == target:
        return [i, j]
  return []`,
        cCode: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`,
        cppCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};`,
        dryRun: [
          { step: 1, state: 'i = 0 (val = 2), j = 1 (val = 7)', explanation: 'nums[0] + nums[1] = 2 + 7 = 9. Equals target! Return [0, 1].' },
        ],
        pros: ['Very straightforward to understand and code', 'Uses O(1) auxiliary space'],
        cons: ['Slow performance for large arrays: O(N²) time complexity'],
      },
      {
        id: 'two-sum-optimal',
        name: 'Approach 2: Hash Map (One-Pass)',
        description: 'As we iterate through the array, check if complement (target - current) exists in hash map. If not, insert current value and index.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        algorithm: '1. Create an empty hash map (value -> index)\n2. For index i, compute complement = target - nums[i]\n3. If complement is in hash map, return [map[complement], i]\n4. Otherwise, put nums[i] in map with index i\n5. Return empty if not found',
        pseudocode: `function twoSum(nums, target):
  map = empty hash table
  for i from 0 to length(nums)-1:
    complement = target - nums[i]
    if complement in map:
      return [map[complement], i]
    map[nums[i]] = i
  return []`,
        cCode: `#include <stdio.h>
#include <stdlib.h>

// Using a simple hash table structure for C
typedef struct HashNode {
    int key;
    int val;
    struct HashNode* next;
} HashNode;

#define HASH_SIZE 10007

int hash(int key) {
    int r = key % HASH_SIZE;
    return r < 0 ? r + HASH_SIZE : r;
}

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    HashNode* table[HASH_SIZE] = {0};
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    
    for (int i = 0; i < numsSize; i++) {
        int comp = target - nums[i];
        int h = hash(comp);
        HashNode* node = table[h];
        while (node) {
            if (node->key == comp) {
                result[0] = node->val;
                result[1] = i;
                return result;
            }
            node = node->next;
        }
        
        int currH = hash(nums[i]);
        HashNode* newNode = (HashNode*)malloc(sizeof(HashNode));
        newNode->key = nums[i];
        newNode->val = i;
        newNode->next = table[currH];
        table[currH] = newNode;
    }
    *returnSize = 0;
    return NULL;
}`,
        cppCode: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
        dryRun: [
          { step: 1, state: 'i=0, num=2, comp=7. Map: {}', explanation: '7 not in map. Store 2 -> 0.' },
          { step: 2, state: 'i=1, num=7, comp=2. Map: {2: 0}', explanation: '2 found in map with index 0! Return [0, 1].' },
        ],
        pros: ['Linear time complexity O(N)', 'Single pass through array'],
        cons: ['Requires O(N) additional space for the hash table'],
      },
    ],
  },
  {
    id: 'valid-parentheses',
    categoryId: 'stack-queue',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    solveCount: 2100,
    isSolved: true,
    isBookmarked: false,
    relatedTopicId: 'stacks-infix-postfix',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    approaches: [
      {
        id: 'valid-paren-stack',
        name: 'Optimal: Stack Based Matching',
        description: 'Push opening brackets to stack. When encountering a closing bracket, verify that the top of stack has the matching opening bracket.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        algorithm: '1. Create a character stack\n2. For each character c in s:\n   - If c is \'(\', \'{\', or \'[\', push matching closing bracket or push c\n   - Else if stack is empty or top does not match c, return false\n3. Return true if stack is empty, false otherwise',
        pseudocode: `function isValid(s):
  stack = empty stack
  for c in s:
    if c == '(': stack.push(')')
    else if c == '{': stack.push('}')
    else if c == '[': stack.push(']')
    else if stack is empty or stack.pop() != c:
      return false
  return stack is empty`,
        cCode: `#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

bool isValid(char* s) {
    int len = strlen(s);
    char* stack = (char*)malloc(len * sizeof(char));
    int top = -1;
    
    for (int i = 0; i < len; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            if (top == -1) { free(stack); return false; }
            char open = stack[top--];
            if (c == ')' && open != '(') { free(stack); return false; }
            if (c == '}' && open != '{') { free(stack); return false; }
            if (c == ']' && open != '[') { free(stack); return false; }
        }
    }
    bool valid = (top == -1);
    free(stack);
    return valid;
}`,
        cppCode: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
        dryRun: [
          { step: 1, state: 'c = \'(\', push \')\' to stack. Stack: [\')\']', explanation: 'Opening bracket matched with its expected closing character.' },
          { step: 2, state: 'c = \')\', stack top is \')\', pop it. Stack: []', explanation: 'Closing character matches top. Stack is now empty.' },
        ],
        pros: ['O(N) time and handles any nested balanced expression', 'Idiomatic use of LIFO stack'],
        cons: ['O(N) stack memory in worst case'],
      },
    ],
  },
  {
    id: 'reverse-linked-list',
    categoryId: 'linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    solveCount: 1800,
    isSolved: false,
    isBookmarked: true,
    relatedTopicId: 'singly-linked-list',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    approaches: [
      {
        id: 'reverse-ll-iterative',
        name: 'Iterative (Three Pointers)',
        description: 'Maintain prev, curr, and next pointers to redirect each node’s next pointer in place.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        algorithm: '1. Initialize prev = NULL, curr = head\n2. While curr is not NULL:\n   a. next = curr->next\n   b. curr->next = prev\n   c. prev = curr\n   d. curr = next\n3. Return prev as the new head',
        pseudocode: `function reverseList(head):
  prev = null
  curr = head
  while curr != null:
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  return prev`,
        cCode: `struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode *prev = NULL;
    struct ListNode *curr = head;
    struct ListNode *next = NULL;
    
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
        cppCode: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
};`,
        dryRun: [
          { step: 1, state: 'curr = 1, prev = NULL', explanation: '1->next points to NULL, prev becomes 1, curr moves to 2.' },
          { step: 2, state: 'curr = 2, prev = 1', explanation: '2->next points to 1, prev becomes 2, curr moves to 3.' },
        ],
        pros: ['In-place O(1) space', 'Single pass O(N) time'],
        cons: ['Mutates original pointer connections'],
      },
    ],
  },
  {
    id: 'binary-tree-inorder',
    categoryId: 'trees',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'Binary Tree'],
    solveCount: 950,
    isSolved: false,
    isBookmarked: false,
    relatedTopicId: 'binary-tree',
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values (Left -> Root -> Right).`,
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,3,2]' },
      { input: 'root = []', output: '[]' },
      { input: 'root = [1]', output: '[1]' },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100',
    ],
    approaches: [
      {
        id: 'inorder-recursive',
        name: 'Recursive DFS',
        description: 'Recursively visit left subtree, process root node, then recursively visit right subtree.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H) where H is tree height',
        algorithm: '1. Base case: if root is NULL, return\n2. Call inorder(root->left)\n3. Append root->val to result\n4. Call inorder(root->right)',
        pseudocode: `function inorder(root, res):
  if root is null: return
  inorder(root.left, res)
  res.add(root.val)
  inorder(root.right, res)`,
        cCode: `#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

void helper(struct TreeNode* root, int* res, int* size) {
    if (!root) return;
    helper(root->left, res, size);
    res[(*size)++] = root->val;
    helper(root->right, res, size);
}

int* inorderTraversal(struct TreeNode* root, int* returnSize) {
    int* res = (int*)malloc(100 * sizeof(int));
    *returnSize = 0;
    helper(root, res, returnSize);
    return res;
}`,
        cppCode: `#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
};

class Solution {
public:
    void dfs(TreeNode* root, vector<int>& res) {
        if (!root) return;
        dfs(root->left, res);
        res.push_back(root->val);
        dfs(root->right, res);
    }
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        dfs(root, res);
        return res;
    }
};`,
        dryRun: [
          { step: 1, state: 'Visit left child', explanation: 'Recurse until null is reached on the leftmost node.' },
          { step: 2, state: 'Add node val to res', explanation: 'Process the current root value.' },
          { step: 3, state: 'Visit right child', explanation: 'Recurse into the right subtree.' },
        ],
        pros: ['Extremely concise and clear', 'Matches mathematical definition of inorder'],
        cons: ['Call stack overhead for skewed tree: O(N)'],
      },
    ],
  },
  {
    id: 'dijkstra-shortest-path',
    categoryId: 'graphs',
    title: 'Dijkstra\'s Shortest Path Algorithm',
    difficulty: 'Hard',
    tags: ['Graph', 'Shortest Path', 'Heap (Priority Queue)'],
    solveCount: 420,
    isSolved: false,
    isBookmarked: true,
    relatedTopicId: 'dijkstra',
    description: `Given a weighted connected graph with non-negative edge weights and a source vertex S, find the shortest path from S to all other vertices.`,
    examples: [
      {
        input: 'V = 4, edges = [[0,1,4],[0,2,8],[1,2,2],[1,3,5],[2,3,5]], source = 0',
        output: 'distances = [0, 4, 6, 9]',
        explanation: 'Shortest path to 0 is 0. To 1 is 0->1 (4). To 2 is 0->1->2 (4+2=6). To 3 is 0->1->3 (4+5=9).',
      },
    ],
    constraints: [
      '1 <= V <= 10^4',
      '0 <= E <= 10^5',
      'All edge weights are non-negative integers',
    ],
    approaches: [
      {
        id: 'dijkstra-pq',
        name: 'Min-Heap Priority Queue',
        description: 'Use a priority queue (min-heap) to greedily expand the vertex with the currently smallest known distance.',
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V + E)',
        algorithm: '1. Initialize dist array of size V with infinity, dist[S] = 0\n2. Push {0, S} to min-priority queue\n3. While pq is not empty:\n   a. Pop {d, u}\n   b. If d > dist[u], continue\n   c. For each neighbor {v, weight} of u:\n      If dist[u] + weight < dist[v]:\n         dist[v] = dist[u] + weight\n         push {dist[v], v} to pq\n4. Return dist array',
        pseudocode: `function dijkstra(V, adj, S):
  dist = array of size V with infinity
  dist[S] = 0
  pq = min_priority_queue()
  pq.push((0, S))
  while not pq.empty():
    d, u = pq.pop()
    if d > dist[u]: continue
    for v, w in adj[u]:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        pq.push((dist[v], v))
  return dist`,
        cCode: `#include <stdio.h>
#include <limits.h>
#define V 4

int minDistance(int dist[], int sptSet[]) {
    int min = INT_MAX, min_index = -1;
    for (int v = 0; v < V; v++)
        if (sptSet[v] == 0 && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    int sptSet[V];
    for (int i = 0; i < V; i++) {
        dist[i] = INT_MAX;
        sptSet[i] = 0;
    }
    dist[src] = 0;
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        if (u == -1) break;
        sptSet[u] = 1;
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`,
        cppCode: `#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii;

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int S) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, 1e9);
    
    dist[S] = 0;
    pq.push({0, S});
    
    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        dryRun: [
          { step: 1, state: 'Init dist=[0, inf, inf, inf], push (0, 0)', explanation: 'Source distance is 0, rest are infinity.' },
          { step: 2, state: 'Pop (0, 0), relax neighbors 1 and 2', explanation: 'dist[1]=4, dist[2]=8. Push both.' },
          { step: 3, state: 'Pop (4, 1), relax neighbor 2: 4+2=6 < 8', explanation: 'dist[2] improved to 6! Relax neighbor 3: 4+5=9.' },
        ],
        pros: ['Optimal greedy solution for non-negative graphs', 'O((V + E) log V) with min-heap'],
        cons: ['Fails on negative weight edges (requires Bellman-Ford)'],
      },
    ],
  },
]

