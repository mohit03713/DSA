export interface TopicPageData {
  title: string
  subject: string
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
}

export const TOPICS_REGISTRY: Record<string, TopicPageData> = {
  'stacks-infix-postfix': {
    title: 'Infix to Postfix and Prefix Conversion Using Stacks',
    subject: 'Data Structures',
    unit: 'Unit 2: Linear Data Structures',
    difficulty: 'Medium',
    tags: ['Stack', 'Parsing', 'Expressions', 'Operator Precedence'],
    estimatedMinutes: 40,
    introduction: `In computer science, arithmetic expressions written by humans are in Infix notation (e.g. A + B), where operators sit between operands. Compilers and calculators use stacks to convert infix expressions into Postfix (Reverse Polish Notation) or Prefix (Polish Notation) for parentheses-free, unambiguous evaluation in linear time.`,
    definition: `Infix to Postfix conversion is an algorithm (often based on Edsger Dijkstra\'s Shunting-yard algorithm) that parses infix expressions using an operator stack to output postfix tokens respecting operator precedence and associativity.`,
    explanation: `Operators differ by two fundamental properties:
1. **Precedence**: Determines which operation executes first (e.g. ^ is higher than * and /, which are higher than + and -).
2. **Associativity**: Determines evaluation order for operators of equal precedence. Most operators (+, -, *, /) are **Left-Associative** (evaluated left-to-right), whereas the exponentiation operator (^) is **Right-Associative** (e.g., 2^3^2 = 2^(3^2) = 2^9 = 512).

### The Infix to Prefix 4-Step Reversal Method:
1. **Reverse** the infix string.
2. **Swap** every '(' with ')' and vice versa.
3. Obtain the **postfix** form of the modified string.
4. **Reverse** the postfix result to obtain the final prefix expression!`,
    examples: [
      { title: 'Compiler Evaluation', description: 'Compilers convert expressions into stack instructions (push, pop, add, mul).', icon: '⚙️' },
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
    relatedTopics: ['stacks', 'queues', 'algorithm-analysis'],
  },
}
