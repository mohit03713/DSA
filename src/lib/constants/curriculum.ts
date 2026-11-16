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
  dip: [
    {
      id: 'dip-u1', number: 1, title: 'Fundamentals of Digital Image Processing',
      topics: [
        { id: 'intro-to-dip', title: 'Introduction to Digital Image Processing', difficulty: 'Easy', duration: '25 min' },
        { id: 'dip-components-systems', title: 'Components of Image Processing Systems', difficulty: 'Easy', duration: '30 min' },
        { id: 'human-visual-system-perception', title: 'Human Visual System and Image Perception', difficulty: 'Medium', duration: '35 min' },
        { id: 'image-sensing-acquisition', title: 'Image Sensing and Acquisition', difficulty: 'Medium', duration: '35 min' },
        { id: 'sampling-quantization', title: 'Image Sampling and Quantization (with Numericals)', difficulty: 'Hard', duration: '50 min' },
        { id: 'pixel-relationships', title: 'Pixel Relationships: Adjacency, Connectivity & Distance Metrics (with Numericals)', difficulty: 'Hard', duration: '45 min' },
        { id: 'color-models-rgb-hsi', title: 'Color Models: RGB, CMYK, HSI & Conversions', difficulty: 'Medium', duration: '40 min' },
        { id: '2d-mathematical-preliminaries', title: 'Two-Dimensional Mathematical Preliminaries', difficulty: 'Medium', duration: '40 min' },
        { id: 'discrete-time-signals-systems-2d', title: '2D Discrete-Time Signals and Systems (LTI, Separability)', difficulty: 'Hard', duration: '45 min' },
        { id: 'linear-circular-convolution-2d', title: 'Linear and Circular Convolution (with Solved Numericals)', difficulty: 'Hard', duration: '50 min' },
        { id: 'linear-via-circular-convolution', title: 'Linear Convolution using Circular Convolution (Zero Padding)', difficulty: 'Hard', duration: '45 min' },
        { id: 'autocorrelation-crosscorrelation-2d', title: 'Auto-correlation and Cross-correlation (Template Matching)', difficulty: 'Medium', duration: '40 min' },
      ],
    },
    {
      id: 'dip-u2', number: 2, title: 'Image Enhancement (Spatial & Frequency Domain)',
      topics: [
        { id: 'gray-level-transformations', title: 'Spatial: Gray Level Transformations (Linear, Log, Power Law / Gamma)', difficulty: 'Medium', duration: '40 min' },
        { id: 'histogram-processing-equalization', title: 'Spatial: Histogram Equalization & Specification (Step-by-Step Numericals)', difficulty: 'Hard', duration: '55 min' },
        { id: 'neighborhood-processing', title: 'Spatial: Neighborhood Processing & Mask Operations', difficulty: 'Easy', duration: '30 min' },
        { id: 'spatial-filtering-fundamentals', title: 'Spatial: Spatial Filtering Mechanics & Border Handling', difficulty: 'Medium', duration: '35 min' },
        { id: 'spatial-smoothing-filters', title: 'Spatial: Smoothing Filters (Linear Box, Weighted Average, Gaussian)', difficulty: 'Medium', duration: '40 min' },
        { id: 'spatial-sharpening-filters', title: 'Spatial: Sharpening Filters (1st & 2nd Derivative, Laplacian, Unsharp Masking)', difficulty: 'Hard', duration: '45 min' },
        { id: 'median-filtering-order-statistics', title: 'Spatial: Median Filter & Order-Statistic Non-linear Filters', difficulty: 'Medium', duration: '35 min' },
        { id: 'fourier-transform-fundamentals', title: 'Frequency: 1D & 2D Continuous & Discrete Fourier Transform', difficulty: 'Medium', duration: '40 min' },
        { id: 'frequency-domain-enhancement', title: 'Frequency: Image Enhancement in Frequency Domain Steps', difficulty: 'Medium', duration: '35 min' },
        { id: 'ideal-frequency-filters', title: 'Frequency: Ideal Lowpass (ILPF) & Highpass (IHPF) Filters (Ringing Effect)', difficulty: 'Medium', duration: '40 min' },
        { id: 'butterworth-frequency-filters', title: 'Frequency: Butterworth Lowpass (BLPF) & Highpass (BHPF) Filters', difficulty: 'Hard', duration: '45 min' },
        { id: 'gaussian-frequency-filters', title: 'Frequency: Gaussian Lowpass (GLPF) & Highpass (GHPF) Filters', difficulty: 'Medium', duration: '40 min' },
        { id: 'freq-smoothing-sharpening', title: 'Frequency: Frequency Domain Smoothing, Sharpening & Homomorphic Filtering', difficulty: 'Hard', duration: '50 min' },
      ],
    },
    {
      id: 'dip-u3', number: 3, title: 'Image Transforms',
      topics: [
        { id: '2d-fft-transform', title: 'Two-Dimensional Fast Fourier Transform (2-D FFT Algorithm & Butterfly)', difficulty: 'Hard', duration: '50 min' },
        { id: 'properties-of-fft', title: 'Properties of 2D-FFT (Separability, Translation, Periodicity, Parseval)', difficulty: 'Medium', duration: '40 min' },
        { id: 'walsh-transform', title: 'Walsh Transform (Sequency Order, Basis Functions & Numericals)', difficulty: 'Hard', duration: '45 min' },
        { id: 'hadamard-transform', title: 'Hadamard Transform (Recursive Matrix Generation & Computation)', difficulty: 'Hard', duration: '45 min' },
        { id: 'discrete-cosine-transform-dct', title: 'Discrete Cosine Transform (DCT Type-II, Energy Compaction & Solved Problem)', difficulty: 'Hard', duration: '50 min' },
        { id: 'haar-transform', title: 'Haar Transform (Multi-resolution, Wavelet Basis & Matrix Synthesis)', difficulty: 'Hard', duration: '50 min' },
        { id: 'slant-transform', title: 'Slant Transform (Linear Gray-Level Slope Modeling & Matrix Construction)', difficulty: 'Medium', duration: '40 min' },
      ],
    },
    {
      id: 'dip-u4', number: 4, title: 'Image Restoration',
      topics: [
        { id: 'image-degradation-model', title: 'Image Degradation & Observation Model (Continuous & Discrete)', difficulty: 'Medium', duration: '35 min' },
        { id: 'noise-models-probability-distributions', title: 'Noise Probability Density Functions (Gaussian, Rayleigh, Erlang, Salt-and-Pepper)', difficulty: 'Medium', duration: '45 min' },
        { id: 'mean-filters-restoration', title: 'Restoration: Arithmetic, Geometric, Harmonic & Contraharmonic Mean Filters', difficulty: 'Medium', duration: '40 min' },
        { id: 'adaptive-filters-local-noise-reduction', title: 'Restoration: Adaptive Local Noise Reduction Filter & Adaptive Median Filter', difficulty: 'Hard', duration: '50 min' },
        { id: 'notch-reject-filters', title: 'Restoration: Periodic Noise Reduction using Bandreject & Notch Filters', difficulty: 'Medium', duration: '40 min' },
        { id: 'inverse-filtering-restoration', title: 'Direct Inverse Filtering & Ill-Posed Noise Amplification', difficulty: 'Hard', duration: '45 min' },
        { id: 'wiener-minimum-mean-square-filter', title: 'Wiener Filtering (Minimum Mean Square Error / MMSE Restoration & Numericals)', difficulty: 'Hard', duration: '55 min' },
        { id: 'least-mean-square-lms-filtering', title: 'Least Mean Square (LMS) Adaptive Filtering Algorithm', difficulty: 'Hard', duration: '45 min' },
        { id: 'constrained-least-squares-restoration', title: 'Constrained Least Squares (CLS) Restoration & Regularization Parameter', difficulty: 'Hard', duration: '50 min' },
      ],
    },
    {
      id: 'dip-u5', number: 5, title: 'Image Compression',
      topics: [
        { id: 'fundamentals-of-image-compression', title: 'Fundamentals of Image Compression & Shannon Information Theory', difficulty: 'Easy', duration: '30 min' },
        { id: 'image-redundancies-coding-interpixel-psychovisual', title: 'Image Redundancies: Coding, Interpixel (Spatial/Temporal) & Psychovisual', difficulty: 'Medium', duration: '40 min' },
        { id: 'redundancy-removal-techniques', title: 'Redundancy Removal: Mapping, Quantization & Variable-Length Coding', difficulty: 'Medium', duration: '35 min' },
        { id: 'fidelity-criteria-objective-subjective', title: 'Fidelity Criteria: Objective (MSE, RMSE, PSNR) vs Subjective (MOS)', difficulty: 'Medium', duration: '35 min' },
        { id: 'image-compression-models', title: 'Image Compression Models: Channel Source Encoder/Decoder Architecture', difficulty: 'Easy', duration: '30 min' },
        { id: 'source-encoder-and-decoder', title: 'Source Encoder (Mapper, Quantizer, Symbol Coder) & Decoder', difficulty: 'Medium', duration: '35 min' },
        { id: 'lossless-compression-huffman-rle-lzw', title: 'Lossless Compression: Huffman Coding, Arithmetic Coding, RLE & LZW (Solved Numericals)', difficulty: 'Hard', duration: '60 min' },
        { id: 'lossy-compression-transform-coding', title: 'Lossy Compression: Transform Coding, Bit Allocation & Quantization Tables', difficulty: 'Hard', duration: '50 min' },
        { id: 'vector-quantization', title: 'Vector Quantization & LBG Codebook Generation Algorithm', difficulty: 'Hard', duration: '45 min' },
        { id: 'hybrid-coding-techniques', title: 'Hybrid Coding: Combining DPCM Spatial Prediction with DCT Transform Coding', difficulty: 'Hard', duration: '45 min' },
        { id: 'image-compression-standards-jpeg-jpeg2000', title: 'Image Compression Standards: JPEG (8x8 DCT Pipeline) vs JPEG2000 (DWT Wavelet)', difficulty: 'Hard', duration: '55 min' },
      ],
    },
  ],
}
