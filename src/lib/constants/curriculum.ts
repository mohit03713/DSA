export interface CurriculumUnit {
  id: string
  number: number
  title: string
  topics: {
    id: string
    title: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    duration: string
  }[]
}

export const SUBJECT_CURRICULUM: Record<string, CurriculumUnit[]> = {
  ds: [
    {
      id: 'ds-u1', number: 1, title: 'Introduction, Arrays & Asymptotic Analysis',
      topics: [
        { id: 'asymptotic-notations', title: 'Asymptotic Notations (Big O, Omega, Theta)', difficulty: 'Easy', duration: '25 min' },
        { id: 'algorithm-analysis', title: 'Algorithm Complexity & Recurrence Relations', difficulty: 'Medium', duration: '35 min' },
        { id: 'arrays-1d-basics', title: 'Basic 1D Arrays: Input, Traversal, Extrema & Frequencies', difficulty: 'Easy', duration: '30 min' },
        { id: 'arrays-2d-3d-matrices', title: '2D & 3D Matrices: Boundary Elements, Saddle Points & Row Ops', difficulty: 'Medium', duration: '40 min' },
      ],
    },
    {
      id: 'ds-u2', number: 2, title: 'Linear Data Structures (Lists & Stacks)',
      topics: [
        { id: 'singly-linked-list', title: 'Singly Linked List: Insertion, Deletion, Sorting & Record Systems', difficulty: 'Medium', duration: '45 min' },
        { id: 'doubly-linked-list', title: 'Circular & Doubly Linked Lists: Reverse Traversal & Josephus Problem', difficulty: 'Hard', duration: '50 min' },
        { id: 'stacks-infix-postfix', title: 'Stacks: Infix to Postfix & Prefix Conversion with Associativity', difficulty: 'Medium', duration: '40 min' },
        { id: 'queues', title: 'Queue, Circular Queue & Token Management Applications', difficulty: 'Medium', duration: '35 min' },
      ],
    },
    {
      id: 'ds-u3', number: 3, title: 'Searching & Sorting Algorithms',
      topics: [
        { id: 'linear-binary-search', title: 'Linear vs Binary Search: Duplicate Handling & Empirical Comparison Counts', difficulty: 'Easy', duration: '30 min' },
        { id: 'selection-bubble-insertion', title: 'Selection Sort, Bubble Sort & Sorted Insertion Invariants', difficulty: 'Easy', duration: '35 min' },
        { id: 'quick-sort-merge-sort-stability', title: 'Merge Sort vs QuickSort: Partition Pivot Selection & Stability Analysis', difficulty: 'Medium', duration: '45 min' },
      ],
    },
    {
      id: 'ds-u4', number: 4, title: 'Trees & Hierarchical Structures',
      topics: [
        { id: 'binary-tree', title: 'Binary Trees & Traversals (Inorder, Preorder, Postorder)', difficulty: 'Medium', duration: '45 min' },
        { id: 'binary-search-tree', title: 'Binary Search Tree (BST) Operations', difficulty: 'Medium', duration: '40 min' },
        { id: 'avl-tree', title: 'AVL Trees & Self-Balancing Rotations', difficulty: 'Hard', duration: '50 min' },
        { id: 'heaps', title: 'Binary Min/Max Heap & HeapSort', difficulty: 'Medium', duration: '35 min' },
      ],
    },
    {
      id: 'ds-u5', number: 5, title: 'Graphs & Advanced Algorithms',
      topics: [
        { id: 'graph-representations', title: 'Adjacency Matrix & Adjacency List', difficulty: 'Easy', duration: '25 min' },
        { id: 'bfs-dfs', title: 'Graph Traversals (BFS and DFS)', difficulty: 'Medium', duration: '40 min' },
        { id: 'dijkstra', title: 'Dijkstra Shortest Path Algorithm', difficulty: 'Hard', duration: '50 min' },
        { id: 'mst-kruskal-prim', title: 'Minimum Spanning Tree (Kruskal & Prim)', difficulty: 'Hard', duration: '45 min' },
        { id: 'hash-tables', title: 'Hash Functions, Collision Resolution & Chaining', difficulty: 'Medium', duration: '40 min' },
      ],
    },
  ],
  os: [
    {
      id: 'os-u1', number: 1, title: 'OS Overview & System Structures',
      topics: [
        { id: 'os-architecture', title: 'Dual-Mode Operation & System Calls', difficulty: 'Easy', duration: '30 min' },
        { id: 'kernel-types', title: 'Monolithic vs Microkernel Architectures', difficulty: 'Easy', duration: '25 min' },
      ],
    },
    {
      id: 'os-u2', number: 2, title: 'Process Management & Scheduling',
      topics: [
        { id: 'pcb-context-switch', title: 'Process Control Block (PCB) & Context Switching', difficulty: 'Medium', duration: '35 min' },
        { id: 'cpu-scheduling', title: 'CPU Scheduling Algorithms (FCFS, SJF, Round Robin, Priority)', difficulty: 'Medium', duration: '50 min' },
        { id: 'interprocess-communication', title: 'Inter-Process Communication (Pipes, Shared Memory)', difficulty: 'Hard', duration: '40 min' },
      ],
    },
    {
      id: 'os-u3', number: 3, title: 'Process Synchronization & Deadlocks',
      topics: [
        { id: 'critical-section', title: 'Critical Section Problem & Peterson\'s Solution', difficulty: 'Medium', duration: '35 min' },
        { id: 'semaphores-mutex', title: 'Semaphores, Mutex & Classic Synchronization Problems', difficulty: 'Hard', duration: '55 min' },
        { id: 'deadlock-banker', title: 'Deadlock Characterization & Banker\'s Algorithm', difficulty: 'Hard', duration: '45 min' },
      ],
    },
    {
      id: 'os-u4', number: 4, title: 'Memory Management & Virtual Memory',
      topics: [
        { id: 'paging-segmentation', title: 'Paging, TLB, Segmentation & Address Translation', difficulty: 'Medium', duration: '45 min' },
        { id: 'page-replacement', title: 'Virtual Memory & Page Replacement (FIFO, LRU, Optimal)', difficulty: 'Medium', duration: '40 min' },
      ],
    },
    {
      id: 'os-u5', number: 5, title: 'File Systems & Storage Management',
      topics: [
        { id: 'file-allocation', title: 'File Allocation Methods (Contiguous, Linked, Indexed)', difficulty: 'Easy', duration: '30 min' },
        { id: 'disk-scheduling', title: 'Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN)', difficulty: 'Easy', duration: '35 min' },
      ],
    },
  ],
  dbms: [
    {
      id: 'dbms-u1', number: 1, title: 'Database Architecture & ER Modeling',
      topics: [
        { id: 'three-schema-architecture', title: 'Three-Schema Architecture & Data Independence', difficulty: 'Easy', duration: '25 min' },
        { id: 'er-diagrams', title: 'Entity-Relationship (ER) Modeling & Crow\'s Foot Notation', difficulty: 'Medium', duration: '40 min' },
      ],
    },
    {
      id: 'dbms-u2', number: 2, title: 'Relational Model & Relational Algebra',
      topics: [
        { id: 'relational-algebra', title: 'Relational Algebra Operators (Select, Project, Join)', difficulty: 'Medium', duration: '45 min' },
        { id: 'integrity-constraints', title: 'Primary Key, Foreign Key & Integrity Constraints', difficulty: 'Easy', duration: '25 min' },
      ],
    },
    {
      id: 'dbms-u3', number: 3, title: 'SQL & Normalization',
      topics: [
        { id: 'sql-queries-joins', title: 'Advanced SQL: Inner/Outer Joins, Aggregation & Group By', difficulty: 'Medium', duration: '45 min' },
        { id: 'normalization-123-bcnf', title: 'Functional Dependencies, 1NF, 2NF, 3NF & BCNF', difficulty: 'Hard', duration: '60 min' },
      ],
    },
    {
      id: 'dbms-u4', number: 4, title: 'Transaction Processing & Concurrency',
      topics: [
        { id: 'acid-properties', title: 'ACID Properties & Transaction States', difficulty: 'Easy', duration: '30 min' },
        { id: 'serializability', title: 'Conflict & View Serializability Testing', difficulty: 'Hard', duration: '40 min' },
        { id: 'two-phase-locking', title: 'Concurrency Control: Two-Phase Locking (2PL) & Timestamping', difficulty: 'Hard', duration: '50 min' },
      ],
    },
    {
      id: 'dbms-u5', number: 5, title: 'Indexing & B/B+ Trees',
      topics: [
        { id: 'indexing-b-trees', title: 'Dense vs Sparse Indexes & B+ Tree File Organization', difficulty: 'Hard', duration: '45 min' },
        { id: 'query-optimization', title: 'Query Execution Plans & Cost-Based Optimization', difficulty: 'Medium', duration: '35 min' },
      ],
    },
  ],
  cn: [
    {
      id: 'cn-u1', number: 1, title: 'Network Fundamentals & Physical Layer',
      topics: [
        { id: 'osi-tcpip-models', title: 'OSI 7-Layer vs TCP/IP Protocol Architectures', difficulty: 'Easy', duration: '35 min' },
        { id: 'transmission-media', title: 'Guided & Unguided Media, Bandwidth & Delay', difficulty: 'Easy', duration: '25 min' },
      ],
    },
    {
      id: 'cn-u2', number: 2, title: 'Data Link Layer & MAC Sublayer',
      topics: [
        { id: 'framing-error-detection', title: 'Framing, CRC & Hamming Code Error Correction', difficulty: 'Medium', duration: '45 min' },
        { id: 'sliding-window-protocols', title: 'Sliding Window: Stop & Wait, Go-Back-N, Selective Repeat', difficulty: 'Hard', duration: '55 min' },
        { id: 'csma-cd-ca', title: 'Medium Access Control: CSMA/CD and Ethernet 802.3', difficulty: 'Medium', duration: '35 min' },
      ],
    },
    {
      id: 'cn-u3', number: 3, title: 'Network Layer & IP Routing',
      topics: [
        { id: 'ipv4-subnetting', title: 'IPv4 Addressing, Subnetting & CIDR Calculation', difficulty: 'Medium', duration: '45 min' },
        { id: 'routing-algorithms', title: 'Distance Vector (Bellman-Ford) vs Link State (OSPF)', difficulty: 'Hard', duration: '50 min' },
      ],
    },
    {
      id: 'cn-u4', number: 4, title: 'Transport Layer Protocols',
      topics: [
        { id: 'tcp-vs-udp', title: 'TCP vs UDP, Three-Way Handshake & Connection Teardown', difficulty: 'Medium', duration: '40 min' },
        { id: 'tcp-congestion-control', title: 'TCP Congestion Control (Slow Start, Congestion Avoidance)', difficulty: 'Hard', duration: '45 min' },
      ],
    },
    {
      id: 'cn-u5', number: 5, title: 'Application Layer & Network Security',
      topics: [
        { id: 'application-protocols', title: 'DNS, HTTP/1.1 vs HTTP/2, SMTP, and DHCP', difficulty: 'Easy', duration: '35 min' },
        { id: 'cryptography-tls', title: 'Symmetric/Asymmetric Encryption & TLS Handshake', difficulty: 'Medium', duration: '40 min' },
      ],
    },
  ],
}
