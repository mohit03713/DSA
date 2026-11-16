import type { TopicPageData } from './topicsData'

export interface SolvedNumerical {
  question: string
  givenData: string[]
  formulaUsed: string
  steps: { stepNumber: number; title: string; calculation: string; explanation: string }[]
  finalAnswer: string
}

export interface ExtendedTopicPageData extends TopicPageData {
  numericals?: SolvedNumerical[]
}

export const DIP_TOPICS_DATA: Record<string, ExtendedTopicPageData> = {
  'sampling-quantization': {
    title: 'Image Sampling and Quantization',
    subject: 'Digital Image Processing',
    unit: 'Unit 1: Fundamentals of DIP',
    difficulty: 'Hard',
    tags: ['Sampling', 'Quantization', 'Nyquist Rate', 'Bit Depth', 'Aliasing', 'Numericals'],
    estimatedMinutes: 50,
    introduction: `A continuous real-world optical image is an analog signal continuous in both spatial coordinates (x, y) and optical amplitude/intensity f(x, y). To process this image digitally inside a computer or microprocessor, it must undergo two discrete transformations: Sampling (digitization of coordinate values) and Quantization (digitization of intensity amplitude values).`,
    definition: `Sampling is the process of digitizing continuous spatial coordinates (x, y) into a discrete grid of M rows and N columns. Quantization is the process of mapping continuous optical intensity values into discrete integer gray levels from 0 to L-1 (where L = 2^k and k is the bit depth).`,
    explanation: `### The Nyquist-Shannon Sampling Theorem in 2D
To reconstruct an analog image without spatial aliasing (Moiré patterns), the spatial sampling frequency f_s must be at least twice the highest spatial frequency component f_max present in the optical scene:
f_s ≥ 2 · f_max

### Quantization & False Contouring
- If an insufficient number of discrete gray levels are used (e.g. k ≤ 4 bits, or L ≤ 16 levels), smooth intensity gradients in the image degrade into prominent artificial ridges known as **False Contouring**.
- Modern standard grayscale images use 8-bit depth (L = 256 gray levels), which matches the human visual system's brightness discrimination limit (~60–100 perceptible levels).

### Image Memory Storage Formula:
Total uncompressed storage bits:
b = M × N × k
Total uncompressed storage Bytes:
Bytes = (M × N × k) / 8`,
    examples: [
      { title: 'Digital Camera Sensor (CMOS/CCD)', description: 'Array of photo-diodes samples light spatially; ADC chips quantize charges to 8-bit or 14-bit RAW integers.', icon: '📷' },
      { title: 'CT Scan & MRI Medical Scanners', description: 'Sample X-ray attenuation at high 12-bit/16-bit depth (4096 gray levels / Hounsfield units) to detect fine tumors.', icon: '🩻' },
      { title: 'Smart Phone Screen (Retina Displays)', description: 'Sub-sampling and pixel density (PPI) configured above human eye resolving power to eliminate pixelation.', icon: '📱' },
    ],
    terminology: [
      { term: 'Spatial Resolution', definition: 'The smallest discernible detail in an image; determined by pixel density (pixels per inch / dots per inch).' },
      { term: 'Intensity Resolution (Bit Depth)', definition: 'The number of bits (k) used to represent each pixel; defines dynamic range L = 2^k.' },
      { term: 'Aliasing', definition: 'High spatial frequencies masquerading as lower spatial frequencies due to under-sampling.' },
      { term: 'False Contouring', definition: 'Banding artifacts caused by coarse quantization where smooth gradients appear as discrete steps.' },
    ],
    algorithm: `1. Receive analog optical signal f(x, y) through optical lens
2. Choose spatial sampling intervals Δx and Δy satisfying Nyquist criteria (f_s ≥ 2 f_max)
3. Grid the continuous image into M discrete rows and N discrete columns
4. Measure average photon charge per sensor element
5. Quantize analog voltage through an Analog-to-Digital Converter (ADC) into 2^k discrete gray levels [0, 2^k - 1]
6. Output 2D integer matrix of size M × N with k bits per pixel`,
    pseudocode: `function digitizeImage(continuousSignal, M, N, bitDepth):
    L = 2^bitDepth
    matrix = 2D array of size M x N
    dx = width / N
    dy = height / M
    for row = 0 to M - 1:
        for col = 0 to N - 1:
            analogVoltage = sampleOpticalIntensity(col * dx, row * dy)
            normalized = clamp(analogVoltage / maxVoltage, 0.0, 1.0)
            discreteLevel = floor(normalized * (L - 1))
            matrix[row][col] = discreteLevel
    return matrix`,
    cCode: `#include <stdio.h>
#include <math.h>

// Calculate uncompressed memory required for image storage
void calculateImageStorage(int width, int height, int bitDepth) {
    long long totalPixels = (long long)width * height;
    long long totalBits = totalPixels * bitDepth;
    double bytes = totalBits / 8.0;
    double kilobytes = bytes / 1024.0;
    double megabytes = kilobytes / 1024.0;
    long long grayLevels = (long long)pow(2, bitDepth);

    printf("=== Image Storage & Quantization Report ===\\n");
    printf("Resolution       : %d x %d (%lld total pixels)\\n", width, height, totalPixels);
    printf("Bit Depth (k)    : %d bits/pixel (bpp)\\n", bitDepth);
    printf("Gray Levels (L)  : %lld discrete levels [0 to %lld]\\n", grayLevels, grayLevels - 1);
    printf("Total Size (Bits): %lld bits\\n", totalBits);
    printf("Total Size (KB)  : %.2f KB\\n", kilobytes);
    printf("Total Size (MB)  : %.2f MB\\n", megabytes);
}

int main() {
    // Standard 1024x1024 8-bit medical imaging scan
    calculateImageStorage(1024, 1024, 8);
    // 4K Ultra-HD 10-bit HDR frame
    calculateImageStorage(3840, 2160, 10);
    return 0;
}`,
    cppCode: `#include <iostream>
#include <vector>
#include <cmath>

class ImageDigitizer {
public:
    static double calculateTransmissionTime(int width, int height, int bitDepth, double modemBps) {
        double totalBits = static_cast<double>(width) * height * bitDepth;
        return totalBits / modemBps; // seconds
    }
};

int main() {
    int W = 512, H = 512, k = 8;
    double modem56k = 56000.0;     // 56 kbps dialup
    double modem100M = 100e6;      // 100 Mbps fiber

    double time56k = ImageDigitizer::calculateTransmissionTime(W, H, k, modem56k);
    double time100M = ImageDigitizer::calculateTransmissionTime(W, H, k, modem100M);

    std::cout << "512x512 8-bit image transmission times:\\n";
    std::cout << "Over 56 kbps modem : " << time56k << " seconds (~" << time56k/60.0 << " minutes)\\n";
    std::cout << "Over 100 Mbps line : " << time100M * 1000.0 << " milliseconds\\n";
    return 0;
}`,
    timeComplexity: {
      best: 'O(M × N)',
      average: 'O(M × N)',
      worst: 'O(M × N)',
      explanation: 'Sampling raster matrix visits each pixel cell exactly once.',
    },
    spaceComplexity: {
      value: 'O(M × N)',
      explanation: 'Storage matrix requires (M × N × k)/8 Bytes in volatile buffer.',
    },
    sampleIO: [
      {
        input: 'Resolution: 1024 x 1024, Gray Levels: 256',
        output: 'Bits: 8,388,608 bits | Bytes: 1,048,576 Bytes | Size: 1,024 KB = 1.00 MB',
        explanation: 'Each pixel consumes log2(256) = 8 bits = 1 Byte.',
      },
    ],
    advantages: [
      'Enables digital manipulation, filtering, encryption, and loss-free transmission',
      'Eliminates analog degradation and thermal noise accumulation over copies',
      'Facilitates computer vision, machine learning, and automated diagnostics',
    ],
    disadvantages: [
      'Under-sampling creates permanent irreversible spatial aliasing',
      'High resolutions and bit depths demand substantial transmission bandwidth and RAM',
    ],
    commonMistakes: [
      'Confusing bits and bytes: dividing by 8 is required to get byte count',
      'Using 1000 instead of 1024 when computing digital memory prefixes (KB, MB)',
      'Forgetting that L = 2^k, not 2k or k^2',
    ],
    practiceQuestions: [
      'A 2048 × 2048 satellite sensor operates at 12 bits per pixel. Calculate the storage requirement in Megabytes (MB).',
      'Calculate the transmission time required to transmit thirty 512 × 512 images at 8 bpp across a 1.544 Mbps T1 telecommunication line.',
      'Explain the Nyquist criterion for 2D image sampling. What physical optical filtering is applied before sampling to prevent aliasing?',
    ],
    vivaQuestions: [
      'What is the fundamental difference between sampling and quantization?',
      'What is false contouring and under what conditions does it occur?',
      'Why does human visual perception allow us to use 8 bits (256 gray levels) for most display applications?',
      'What is the difference between spatial resolution and gray-level resolution?',
    ],
    relatedTopics: ['Pixel Relationships', 'Color Models (RGB, HSI)', 'Discrete-Time Signals and Systems', '2D-FFT'],
    numericals: [
      {
        question: 'A high-resolution dental X-ray sensor produces an uncompressed digital image of size 1024 × 1024 pixels with 256 gray levels. Calculate: (a) The bit depth k, (b) Total number of bits required to store the image, (c) File size in Kilobytes (KB) and Megabytes (MB), (d) Time taken to transmit this uncompressed image over a 2 Mbps internet connection.',
        givenData: [
          'Height M = 1024 pixels',
          'Width N = 1024 pixels',
          'Number of gray levels L = 256',
          'Transmission channel speed = 2 Mbps = 2 × 10⁶ bits/sec',
        ],
        formulaUsed: 'k = log₂(L),  b = M × N × k,  Bytes = b / 8,  KB = Bytes / 1024,  MB = KB / 1024,  Time = b / Bandwidth',
        steps: [
          {
            stepNumber: 1,
            title: 'Determine the Bit Depth (k)',
            calculation: 'L = 256 = 2^k  ==>  k = log₂(256) = 8 bits per pixel (bpp)',
            explanation: 'Each pixel requires 8 bits to represent one of the 256 unique gray level values (from 0 to 255).',
          },
          {
            stepNumber: 2,
            title: 'Calculate Total Bits (b)',
            calculation: 'b = M × N × k = 1024 × 1024 × 8 = 1,048,576 × 8 = 8,388,608 bits',
            explanation: 'Multiplying total raster cells by the bits per pixel yields total raw storage bits.',
          },
          {
            stepNumber: 3,
            title: 'Convert to Bytes, KB, and MB',
            calculation: 'Bytes = 8,388,608 / 8 = 1,048,576 Bytes\nKB = 1,048,576 / 1024 = 1,024 KB\nMB = 1,024 / 1024 = 1.0 MB',
            explanation: '1 Byte = 8 bits, 1 KB = 1024 Bytes, 1 MB = 1024 KB.',
          },
          {
            stepNumber: 4,
            title: 'Compute Transmission Time over 2 Mbps channel',
            calculation: 'Time = Total Bits / Speed = 8,388,608 / (2 × 10⁶) = 4.1943 seconds',
            explanation: 'Dividing total bits by channel bandwidth in bits per second gives total transmission duration.',
          },
        ],
        finalAnswer: 'k = 8 bpp; Total Bits = 8,388,608 bits; File Size = 1.00 MB; Transmission Time = 4.19 seconds',
      },
    ],
  },

  'pixel-relationships': {
    title: 'Pixel Relationships: Adjacency, Connectivity & Distance Metrics',
    subject: 'Digital Image Processing',
    unit: 'Unit 1: Fundamentals of DIP',
    difficulty: 'Hard',
    tags: ['Adjacency', '4-Neighbors', '8-Neighbors', 'm-Connectivity', 'Euclidean Distance', 'City-Block D4', 'Chessboard D8', 'Numericals'],
    estimatedMinutes: 45,
    introduction: `Digital images are treated as a topological discrete space where the relationship between a pixel and its surrounding neighbors governs image segmentation, boundary tracking, morphological operations, and object recognition.`,
    definition: `Pixel neighborhood consists of 4-neighbors N_4(p), diagonal neighbors N_D(p), and 8-neighbors N_8(p). Connectivity defines whether two neighboring pixels can form a connected path based on both coordinate adjacency and gray-level value similarity from a designated subset V.`,
    explanation: `### 1. Neighborhood Definitions for Pixel p at (x, y):
- **4-Neighbors N_4(p)**: Coordinates $(x+1, y), (x-1, y), (x, y+1), (x, y-1)$ at unit distance 1.
- **Diagonal Neighbors N_D(p)**: Coordinates $(x+1, y+1), (x+1, y-1), (x-1, y+1), (x-1, y-1)$ at distance $\\sqrt{2}$.
- **8-Neighbors N_8(p)**: Union of 4-neighbors and diagonal neighbors: $N_8(p) = N_4(p) \\cup N_D(p)$.

### 2. Types of Connectivity (V = set of allowable gray levels, e.g. V = {1}):
1. **4-Connectivity**: Pixels $p$ and $q$ are 4-connected if both have values from $V$ and $q \\in N_4(p)$.
2. **8-Connectivity**: Pixels $p$ and $q$ are 8-connected if both have values from $V$ and $q \\in N_8(p)$.
3. **m-Connectivity (Mixed Connectivity)**: Designed to eliminate multiple ambiguous paths caused by 8-connectivity! Two pixels $p$ and $q$ with values from $V$ are m-connected if:
   - (i) $q \\in N_4(p)$, OR
   - (ii) $q \\in N_D(p)$ AND the intersection set $N_4(p) \\cap N_4(q)$ contains **no pixels with values from V**.

### 3. Distance Metrics:
- **Euclidean Distance $D_e(p, q)$**: $\\sqrt{(x-s)^2 + (y-t)^2}$
- **City-Block / Manhattan Distance $D_4(p, q)$**: $|x-s| + |y-t|$
- **Chessboard Distance $D_8(p, q)$**: $\\max(|x-s|, |y-t|)$
- Property: $D_8(p, q) \\le D_e(p, q) \\le D_4(p, q)$`,
    examples: [
      { title: 'Blob Extraction & Object Counting', description: 'Connected-component labeling algorithm uses 4 or 8 connectivity to group foreground pixels into isolated objects.', icon: '🔍' },
      { title: 'Path Planning for Robotics', description: 'Manhattan distance D4 calculates grid robot movements without diagonal traversal; Chessboard D8 allows 8-way navigation.', icon: '🤖' },
      { title: 'Boundary Tracing / Bug-Following', description: 'Tracks outer boundary contours of segmented organs or cells without crossing back over ambiguous paths.', icon: '📐' },
    ],
    terminology: [
      { term: 'Adjacency', definition: 'Spatial proximity between two pixels regardless of pixel values.' },
      { term: 'Path', definition: 'A sequence of distinct pixels from p to q such that each consecutive pair is connected.' },
      { term: 'm-Connectivity', definition: 'Mixed connectivity that prevents multiple ambiguous paths in 8-connected binary skeletons.' },
    ],
    algorithm: `1. Define target set V of gray-level intensities (e.g. V = {1} for binary object)
2. To test m-connectivity between p and q:
3. If q is in N_4(p) and value(p), value(q) in V -> m-connected
4. If q is in N_D(p) and value(p), value(q) in V:
5.    Inspect the two shared neighbors N_4(p) ∩ N_4(q)
6.    If NONE of the shared neighbors have values in V -> m-connected
7.    Else -> NOT m-connected (path would create ambiguity)`,
    pseudocode: `function is_m_connected(p, q, V, image):
    if image[p.x][p.y] not in V or image[q.x][q.y] not in V:
        return false
    if q in N4(p):
        return true
    if q in ND(p):
        shared_neighbors = intersection(N4(p), N4(q))
        for neighbor in shared_neighbors:
            if image[neighbor.x][neighbor.y] in V:
                return false
        return true
    return false`,
    cCode: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void calculateDistances(int x1, int y1, int x2, int y2) {
    int dx = abs(x1 - x2);
    int dy = abs(y1 - y2);

    double De = sqrt(dx * dx + dy * dy);
    int D4 = dx + dy;
    int D8 = (dx > dy) ? dx : dy;

    printf("Points: p(%d, %d) and q(%d, %d)\\n", x1, y1, x2, y2);
    printf("Euclidean Distance (De)  : %.4f\\n", De);
    printf("City-Block Distance (D4) : %d\\n", D4);
    printf("Chessboard Distance (D8) : %d\\n", D8);
    printf("Verification (D8 <= De <= D4): %d <= %.2f <= %d\\n\\n", D8, De, D4);
}

int main() {
    calculateDistances(1, 2, 5, 6);
    calculateDistances(0, 0, 4, 3);
    return 0;
}`,
    cppCode: `#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

struct Point { int x, y; };

int main() {
    Point p{2, 3};
    Point q{7, 9};

    int dx = std::abs(p.x - q.x);
    int dy = std::abs(p.y - q.y);

    double de = std::hypot(dx, dy);
    int d4 = dx + dy;
    int d8 = std::max(dx, dy);

    std::cout << "Distance from (" << p.x << "," << p.y << ") to (" << q.x << "," << q.y << "):\\n";
    std::cout << "De = " << de << "\\n";
    std::cout << "D4 = " << d4 << "\\n";
    std::cout << "D8 = " << d8 << "\\n";
    return 0;
}`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      explanation: 'Distance evaluation between two coordinates executes in constant time.',
    },
    spaceComplexity: {
      value: 'O(1)',
      explanation: 'Auxiliary variables for coordinate differences.',
    },
    sampleIO: [
      {
        input: 'p = (2, 3), q = (6, 7)',
        output: 'De = 5.657, D4 = 8, D8 = 4',
        explanation: 'dx = 4, dy = 4. De = sqrt(32) ≈ 5.657, D4 = 4+4 = 8, D8 = max(4,4) = 4.',
      },
    ],
    advantages: [
      'Provides geometric and topological foundation for computer vision algorithms',
      'm-connectivity prevents topological holes and ambiguous boundary loops',
    ],
    disadvantages: [
      'Standard 8-connectivity causes boundary tracking paradoxes with shared diagonal vertices',
    ],
    commonMistakes: [
      'Confusing D4 with D8: remember D4 is Manhattan (|Δx| + |Δy|) and D8 is Chessboard (max(|Δx|, |Δy|))',
      'Forgetting the condition on shared neighbors when evaluating m-connectivity',
    ],
    practiceQuestions: [
      'Given a 3×3 binary array, identify all 4-connected, 8-connected, and m-connected components for V={1}.',
      'Prove mathematically that for any two pixel coordinates p and q, D8(p,q) ≤ De(p,q) ≤ D4(p,q).',
      'Why is m-connectivity termed "mixed connectivity"? Illustrate with a path ambiguity diagram.',
    ],
    vivaQuestions: [
      'Define N4(p), ND(p), and N8(p) neighbors.',
      'Why does 8-connectivity lead to multiple ambiguous paths, and how does m-connectivity resolve this?',
      'Which distance metric corresponds to King moves in a game of chess?',
    ],
    relatedTopics: ['Sampling and Quantization', 'Linear and Circular Convolution', 'Image Segmentation'],
    numericals: [
      {
        question: 'Given two pixel coordinates p = (2, 3) and q = (6, 7) on a discrete digital image grid. (a) Calculate Euclidean distance De(p, q), (b) Calculate City-Block distance D4(p, q), (c) Calculate Chessboard distance D8(p, q), (d) Verify the fundamental inequality relationship between these distances.',
        givenData: [
          'Pixel p: (x, y) = (2, 3)',
          'Pixel q: (s, t) = (6, 7)',
          'Horizontal displacement Δx = |x - s| = |2 - 6| = 4',
          'Vertical displacement Δy = |y - t| = |3 - 7| = 4',
        ],
        formulaUsed: 'De = √((Δx)² + (Δy)²),  D4 = Δx + Δy,  D8 = max(Δx, Δy)',
        steps: [
          {
            stepNumber: 1,
            title: 'Compute Coordinate Differences',
            calculation: 'Δx = |2 - 6| = 4\nΔy = |3 - 7| = 4',
            explanation: 'Find absolute horizontal and vertical coordinate separations.',
          },
          {
            stepNumber: 2,
            title: 'Calculate Euclidean Distance (De)',
            calculation: 'De(p, q) = √((4)² + (4)²) = √(16 + 16) = √32 ≈ 5.6568',
            explanation: 'Direct straight-line Pythagorean geometric distance.',
          },
          {
            stepNumber: 3,
            title: 'Calculate City-Block Distance (D4)',
            calculation: 'D4(p, q) = |Δx| + |Δy| = 4 + 4 = 8',
            explanation: 'Shortest path when only horizontal and vertical unit steps are allowed.',
          },
          {
            stepNumber: 4,
            title: 'Calculate Chessboard Distance (D8)',
            calculation: 'D8(p, q) = max(|Δx|, |Δy|) = max(4, 4) = 4',
            explanation: 'Shortest path when horizontal, vertical, and diagonal unit steps are allowed.',
          },
          {
            stepNumber: 5,
            title: 'Verify the Distance Inequality',
            calculation: 'D8 ≤ De ≤ D4  ==>  4 ≤ 5.657 ≤ 8  (Inequality verified and satisfied!)',
            explanation: 'Confirms theoretical bounds: Chessboard ≤ Euclidean ≤ Manhattan.',
          },
        ],
        finalAnswer: 'De ≈ 5.66; D4 = 8; D8 = 4. Verified: D8 ≤ De ≤ D4 (4 ≤ 5.66 ≤ 8)',
      },
    ],
  },

  'histogram-processing-equalization': {
    title: 'Histogram Processing and Histogram Equalization',
    subject: 'Digital Image Processing',
    unit: 'Unit 2: Image Enhancement',
    difficulty: 'Hard',
    tags: ['Histogram Equalization', 'Contrast Enhancement', 'Probability Density Function', 'CDF', 'Solved Numericals'],
    estimatedMinutes: 55,
    introduction: `The histogram of a digital image with gray levels in the range [0, L-1] is a discrete function h(r_k) = n_k, where r_k is the k-th gray level and n_k is the number of pixels having that gray level. Histogram Equalization is an automatic global transformation technique that flattens and stretches the probability density function (PDF) across the entire dynamic range, dramatically boosting contrast.`,
    definition: `Histogram equalization is a transformation s = T(r) based on the continuous cumulative distribution function (CDF) of the input image, mapped into discrete integer levels: s_k = round[ (L - 1) × ∑_{j=0}^{k} p_r(r_j) ], producing a uniform output probability distribution.`,
    explanation: `### Mathematical Derivation of Histogram Equalization
Let the continuous gray levels be normalized to $0 \\le r \\le 1$. The transformation $s = T(r)$ must satisfy:
1. $T(r)$ is strictly monotonically increasing for $0 \\le r \\le 1$ (preserves relative gray-level ordering and prevents negative contrast).
2. $0 \\le T(r) \\le 1$ for $0 \\le r \\le 1$ (maps within the valid display intensity range).

Using the continuous probability density function (PDF) and the cumulative distribution function (CDF):
$$s = T(r) = \\int_{0}^{r} p_r(w) dw$$

By the fundamental theorem of calculus, $\\frac{ds}{dr} = p_r(r)$.
Using the transformation of random variables:
$$p_s(s) = p_r(r) \\cdot \\left| \\frac{dr}{ds} \\right| = p_r(r) \\cdot \\frac{1}{\\frac{ds}{dr}} = \\frac{p_r(r)}{p_r(r)} = 1$$
Hence, the output probability density $p_s(s)$ is **completely flat (uniform)** across the interval $[0, 1]$!

### Discrete Histogram Equalization Formula:
$$s_k = \\text{round}\\left[ (L - 1) \\sum_{j=0}^{k} \\frac{n_j}{M \\times N} \\right]$$
where $L$ is the number of gray levels (e.g. $L = 8$ for 3-bit, $L = 256$ for 8-bit), and $M \\times N$ is the total pixel count.`,
    examples: [
      { title: 'Medical Radiography (X-Ray & Mammography)', description: 'Stretches low-contrast soft tissue differences across 256 gray levels to highlight microcalcifications.', icon: '🩻' },
      { title: 'Night Vision & Surveillance Feeds', description: 'Expands dark compressed pixel clusters in nighttime cameras into distinct visible shapes.', icon: '🌃' },
      { title: 'Satellite & Aerial Photography', description: 'Removes atmospheric haze and cloud wash-out by distributing terrain reflectance evenly.', icon: '🛰️' },
    ],
    terminology: [
      { term: 'Histogram', definition: 'Frequency distribution plot showing number of pixels at each gray level.' },
      { term: 'Probability Density Function (PDF)', definition: 'Normalized histogram: p(r_k) = n_k / total_pixels where sum equals 1.0.' },
      { term: 'Cumulative Distribution Function (CDF)', definition: 'Running cumulative sum of the PDF values from 0 up to level k.' },
      { term: 'Histogram Specification (Matching)', definition: 'Transforming an image to match a specifically targeted custom histogram shape rather than flat uniform.' },
    ],
    algorithm: `1. Calculate total pixel count MN = rows × cols
2. Count frequency n_k of each gray level r_k (k = 0 to L-1)
3. Compute normalized probability p(r_k) = n_k / MN
4. Compute cumulative probability CDF_k = sum_{j=0}^{k} p(r_j)
5. Calculate equalized values: s_k = round( (L - 1) × CDF_k )
6. Map all original pixels with intensity r_k to new intensity s_k
7. Sum pixel frequencies mapped to identical s_k levels to produce the equalized histogram`,
    pseudocode: `function histogramEqualize(image, M, N, L):
    hist = array of size L initialized to 0
    for each pixel in image:
        hist[pixel]++
    
    total = M * N
    cdf = 0.0
    mapping = array of size L
    for k = 0 to L - 1:
        prob = hist[k] / total
        cdf += prob
        mapping[k] = round((L - 1) * cdf)
    
    output = 2D array of size M x N
    for r = 0 to M - 1:
        for c = 0 to N - 1:
            output[r][c] = mapping[image[r][c]]
    return output`,
    cCode: `#include <stdio.h>
#include <math.h>

#define L 8 // 3-bit image gray levels

void equalizeHistogram(int n[L], int totalPixels) {
    float p[L];
    float cdf[L];
    int s[L];
    float runningSum = 0.0f;

    printf("k | r_k | n_k  | p(r_k) | CDF_k  | (L-1)*CDF | s_k = round()\\n");
    printf("------------------------------------------------------------\\n");

    for (int k = 0; k < L; k++) {
        p[k] = (float)n[k] / totalPixels;
        runningSum += p[k];
        cdf[k] = runningSum;
        float scaled = (L - 1) * cdf[k];
        s[k] = (int)(scaled + 0.5f); // round to nearest integer

        printf("%d | %d   | %-4d | %.4f | %.4f | %-9.3f | %d\\n",
               k, k, n[k], p[k], cdf[k], scaled, s[k]);
    }
}

int main() {
    // 64x64 image = 4096 pixels
    int pixelCounts[L] = {790, 1023, 850, 656, 329, 245, 122, 81};
    equalizeHistogram(pixelCounts, 4096);
    return 0;
}`,
    cppCode: `#include <iostream>
#include <vector>
#include <numeric>
#include <cmath>
#include <iomanip>

int main() {
    const int L = 8;
    std::vector<int> n = {790, 1023, 850, 656, 329, 245, 122, 81};
    int total = std::accumulate(n.begin(), n.end(), 0);

    double cdf = 0.0;
    std::cout << std::fixed << std::setprecision(4);
    std::cout << "r_k -> s_k mapping:\\n";
    for (int k = 0; k < L; ++k) {
        cdf += static_cast<double>(n[k]) / total;
        int sk = std::round((L - 1) * cdf);
        std::cout << "r" << k << " (" << n[k] << " px) --> s" << sk << " (CDF=" << cdf << ")\\n";
    }
    return 0;
}`,
    timeComplexity: {
      best: 'O(M × N + L)',
      average: 'O(M × N + L)',
      worst: 'O(M × N + L)',
      explanation: 'First pass computes histogram in O(MN), CDF and mapping in O(L), second pass remaps pixels in O(MN).',
    },
    spaceComplexity: {
      value: 'O(L)',
      explanation: 'Histogram and transformation lookup table of size L.',
    },
    sampleIO: [
      {
        input: '4096 pixel 3-bit image with dark bias',
        output: 'r0->s1, r1->s3, r2->s5, r3->s6, r4->s6, r5->s7, r6->s7, r7->s7',
        explanation: 'Dynamic range expanded from low intensities across full spectrum [0 to 7].',
      },
    ],
    advantages: [
      'Fully automatic and parameter-free global contrast optimization',
      'Computationally trivial: uses simple 1D cumulative addition and integer lookup table',
      'Mathematically invertible if continuous CDF is strictly monotonic',
    ],
    disadvantages: [
      'Can over-amplify background noise in regions with high histogram spikes',
      'Cannot preserve specific local brightness relationships (solved by Adaptive Histogram Equalization / CLAHE)',
    ],
    commonMistakes: [
      'Forgetting to multiply CDF by (L - 1): in an 8-bit image, multiply by 255 (not 256)',
      'Rounding truncation errors: round to nearest integer, not floor',
      'Failing to group identical output levels s_k when forming the final equalized histogram',
    ],
    practiceQuestions: [
      'Given an 8-level image with pixel counts n = [100, 200, 300, 400, 200, 100, 50, 20], compute the complete histogram equalization table and plot the new histogram.',
      'Explain why discrete histogram equalization does not yield a perfectly flat output histogram unlike continuous equalization.',
      'Differentiate between global histogram equalization and Contrast Limited Adaptive Histogram Equalization (CLAHE).',
    ],
    vivaQuestions: [
      'Why is the transformation function in histogram equalization chosen as the cumulative distribution function (CDF)?',
      'Does histogram equalization increase or decrease image entropy? Explain.',
      'Can histogram equalization be applied twice consecutively to improve an image further? Why or why not?',
    ],
    relatedTopics: ['Gray Level Transformations', 'Spatial Filtering', 'Noise Models'],
    numericals: [
      {
        question: 'A 3-bit digital image of size 64 × 64 pixels (total pixels = 4096) has gray levels r₀ to r₇ with the following frequency distribution: n₀=790, n₁=1023, n₂=850, n₃=656, n₄=329, n₅=245, n₆=122, n₇=81. Perform histogram equalization and calculate: (a) Normalized probabilities p(r_k), (b) Cumulative distribution CDF_k, (c) The transformation mapping s_k, (d) The final histogram distribution of the equalized image.',
        givenData: [
          'Size: 64 × 64 pixels ==> Total pixels MN = 4096',
          'Bit depth: 3 bits ==> Total gray levels L = 2³ = 8 (levels 0 to 7)',
          'Multiplier factor: (L - 1) = 8 - 1 = 7',
          'Pixel counts: [790, 1023, 850, 656, 329, 245, 122, 81]',
        ],
        formulaUsed: 'p(r_k) = n_k / MN,  CDF_k = ∑_{j=0}^{k} p(r_j),  s_k = round[ (L - 1) × CDF_k ]',
        steps: [
          {
            stepNumber: 1,
            title: 'Level r₀ (Value = 0, n₀ = 790)',
            calculation: 'p(r₀) = 790 / 4096 = 0.1929\nCDF₀ = 0.1929\n(L-1) × CDF₀ = 7 × 0.1929 = 1.3503\ns₀ = round(1.3503) = 1',
            explanation: 'All pixels with original gray level 0 are mapped to gray level 1.',
          },
          {
            stepNumber: 2,
            title: 'Level r₁ (Value = 1, n₁ = 1023)',
            calculation: 'p(r₁) = 1023 / 4096 = 0.2498\nCDF₁ = 0.1929 + 0.2498 = 0.4427\n(L-1) × CDF₁ = 7 × 0.4427 = 3.0989\ns₁ = round(3.0989) = 3',
            explanation: 'All pixels with original gray level 1 are mapped to gray level 3.',
          },
          {
            stepNumber: 3,
            title: 'Level r₂ (Value = 2, n₂ = 850)',
            calculation: 'p(r₂) = 850 / 4096 = 0.2075\nCDF₂ = 0.4427 + 0.2075 = 0.6502\n(L-1) × CDF₂ = 7 × 0.6502 = 4.5514\ns₂ = round(4.5514) = 5',
            explanation: 'All pixels with original gray level 2 are mapped to gray level 5.',
          },
          {
            stepNumber: 4,
            title: 'Level r₃ (Value = 3, n₃ = 656)',
            calculation: 'p(r₃) = 656 / 4096 = 0.1602\nCDF₃ = 0.6502 + 0.1602 = 0.8104\n(L-1) × CDF₃ = 7 × 0.8104 = 5.6728\ns₃ = round(5.6728) = 6',
            explanation: 'Mapped to gray level 6.',
          },
          {
            stepNumber: 5,
            title: 'Levels r₄, r₅, r₆, r₇ Mapping Calculations',
            calculation: 'r₄ (n=329): CDF₄ = 0.8907 ==> 7 × 0.8907 = 6.2349 ==> s₄ = 6\nr₅ (n=245): CDF₅ = 0.9505 ==> 7 × 0.9505 = 6.6535 ==> s₅ = 7\nr₆ (n=122): CDF₆ = 0.9803 ==> 7 × 0.9803 = 6.8621 ==> s₆ = 7\nr₇ (n=81) : CDF₇ = 1.0000 ==> 7 × 1.0000 = 7.0000 ==> s₇ = 7',
            explanation: 'Notice that levels 3 & 4 both map to s=6; levels 5, 6 & 7 merge into s=7.',
          },
          {
            stepNumber: 6,
            title: 'Construct the Final Output Equalized Histogram',
            calculation: 's = 0: 0 pixels\ns = 1: n₀ = 790 pixels\ns = 2: 0 pixels\ns = 3: n₁ = 1023 pixels\ns = 4: 0 pixels\ns = 5: n₂ = 850 pixels\ns = 6: n₃ + n₄ = 656 + 329 = 985 pixels\ns = 7: n₅ + n₆ + n₇ = 245 + 122 + 81 = 448 pixels',
            explanation: 'Total equalized pixels = 790 + 1023 + 850 + 985 + 448 = 4096. Full conservation of pixels.',
          },
        ],
        finalAnswer: 'Mapping: r₀→1, r₁→3, r₂→5, r₃→6, r₄→6, r₅→7, r₆→7, r₇→7. Equalized histogram counts: s₁=790, s₃=1023, s₅=850, s₆=985, s₇=448.',
      },
    ],
  },

  'linear-circular-convolution-2d': {
    title: 'Linear and Circular Convolution in 2D',
    subject: 'Digital Image Processing',
    unit: 'Unit 1: Fundamentals of DIP',
    difficulty: 'Hard',
    tags: ['Linear Convolution', 'Circular Convolution', 'Zero Padding', 'Wrap-around Error', 'Numericals'],
    estimatedMinutes: 50,
    introduction: `Convolution is the mathematical bedrock of image filtering, blurring, sharpening, edge detection, and system response modeling. In digital hardware and frequency domain processing, periodic discrete transforms (FFT) compute circular convolution rather than linear convolution, necessitating zero padding to prevent boundary distortion.`,
    definition: `2D Linear Convolution sums products of an image matrix with a spatially flipped filter kernel shifted across all coordinates: y(m, n) = ∑∑ x(k, l) h(m-k, n-l). Circular convolution computes the same summation with indices evaluated modulo the period: (m-k) mod P, (n-l) mod Q.`,
    explanation: `### Output Dimensions Formula:
If input image $x(m, n)$ has size $M_1 \\times N_1$ and filter mask $h(m, n)$ has size $M_2 \\times N_2$:
- The resulting **Linear Convolution output size** is:
  $$(M_1 + M_2 - 1) \\times (N_1 + N_2 - 1)$$
- To obtain identical results using Circular Convolution (or via 2D FFT multiplication $Y = X \\cdot H$), both input matrices must be zero-padded to dimensions $P \\times Q$ where:
  $$P \\ge M_1 + M_2 - 1, \\quad Q \\ge N_1 + N_2 - 1$$

### If Padding is NOT Performed:
The circular periodicity creates **wrap-around error (aliasing in space domain)**, where pixels from the right border bleed into the left border and bottom pixels bleed into the top!`,
    examples: [
      { title: 'Gaussian Blurring & De-noising', description: 'Convolving image with 2D Gaussian kernel dampens high-frequency noise.', icon: '🌫️' },
      { title: 'Sobel & Prewitt Edge Detection', description: 'Convolving with 3x3 derivative filters highlights abrupt intensity transitions.', icon: '📐' },
      { title: 'Fast FFT Filtering', description: 'O(N^2 log N) frequency domain multiplication replaces O(N^4) direct spatial convolution.', icon: '⚡' },
    ],
    terminology: [
      { term: 'Kernel (Mask / PSF)', definition: 'Small 2D matrix containing weight coefficients applied over neighborhood.' },
      { term: 'Zero-Padding', definition: 'Appending rows and columns of zeros to avoid boundary truncation and wrap-around artifacts.' },
      { term: 'Correlation vs Convolution', definition: 'Convolution flips the mask 180 degrees before sliding dot-product; correlation does not flip.' },
    ],
    algorithm: `1. For linear convolution of image X (M1 x N1) and kernel H (M2 x N2):
2. Rotate kernel H by 180 degrees
3. Pad output matrix to size (M1 + M2 - 1) x (N1 + N2 - 1)
4. Slide rotated kernel over each coordinate (m, n)
5. Multiply overlapping elements and sum: y(m, n) = sum_k sum_l x(k, l) * h(m-k, n-l)
6. For circular convolution: zero-pad both to P x Q, compute 2D FFT, multiply pointwise, compute 2D IFFT`,
    pseudocode: `function linearConv2D(X, H):
    M1, N1 = size(X)
    M2, N2 = size(H)
    P = M1 + M2 - 1
    Q = N1 + N2 - 1
    Y = zeros(P, Q)
    for m = 0 to P - 1:
        for n = 0 to Q - 1:
            sum = 0
            for k = 0 to M1 - 1:
                for l = 0 to N1 - 1:
                    if (m - k >= 0 and m - k < M2 and n - l >= 0 and n - l < N2):
                        sum += X[k][l] * H[m - k][n - l]
            Y[m][n] = sum
    return Y`,
    cCode: `#include <stdio.h>

void convolve2D(int X[2][2], int H[2][2]) {
    int Y[3][3] = {0};
    int M1 = 2, N1 = 2;
    int M2 = 2, N2 = 2;
    int P = M1 + M2 - 1; // 3
    int Q = N1 + N2 - 1; // 3

    for (int m = 0; m < P; m++) {
        for (int n = 0; n < Q; n++) {
            int sum = 0;
            for (int k = 0; k < M1; k++) {
                for (int l = 0; l < N1; l++) {
                    int h_r = m - k;
                    int h_c = n - l;
                    if (h_r >= 0 && h_r < M2 && h_c >= 0 && h_c < N2) {
                        sum += X[k][l] * H[h_r][h_c];
                    }
                }
            }
            Y[m][n] = sum;
            printf("%3d ", Y[m][n]);
        }
        printf("\\n");
    }
}

int main() {
    int X[2][2] = {{1, 2}, {3, 4}};
    int H[2][2] = {{5, 6}, {7, 8}};
    printf("Linear Convolution of two 2x2 matrices (Output 3x3):\\n");
    convolve2D(X, H);
    return 0;
}`,
    cppCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> X = {{1, 2}, {3, 4}};
    std::vector<std::vector<int>> H = {{5, 6}, {7, 8}};
    std::vector<std::vector<int>> Y(3, std::vector<int>(3, 0));

    for (int m = 0; m < 3; ++m) {
        for (int n = 0; n < 3; ++n) {
            for (int k = 0; k < 2; ++k) {
                for (int l = 0; l < 2; ++l) {
                    int r = m - k, c = n - l;
                    if (r >= 0 && r < 2 && c >= 0 && c < 2) {
                        Y[m][n] += X[k][l] * H[r][c];
                    }
                }
            }
            std::cout << Y[m][n] << "\\t";
        }
        std::cout << "\\n";
    }
    return 0;
}`,
    timeComplexity: {
      best: 'O(M1 · N1 · M2 · N2)',
      average: 'O(M1 · N1 · M2 · N2)',
      worst: 'O(M1 · N1 · M2 · N2)',
      explanation: 'Spatial domain 2D convolution requires 4 nested loops. FFT reduces to O(P·Q log(P·Q)).',
    },
    spaceComplexity: {
      value: 'O((M1+M2-1)(N1+N2-1))',
      explanation: 'Memory needed to store the fully expanded output matrix.',
    },
    sampleIO: [
      {
        input: 'X = [[1, 2], [3, 4]], H = [[5, 6], [7, 8]]',
        output: 'Y = [[5, 16, 12], [22, 60, 40], [21, 52, 32]]',
        explanation: '3x3 resulting matrix from linear convolution.',
      },
    ],
    advantages: [
      'Fundamental operation for all linear shift-invariant (LSI) filtering',
      'Associative, commutative, and distributive properties simplify cascade system analysis',
    ],
    disadvantages: [
      'Direct spatial convolution is computationally expensive for large kernels without FFT',
    ],
    commonMistakes: [
      'Forgetting that convolution requires 180° kernel rotation (correlation does not)',
      'Calculating wrong output dimensions: output is (M1+M2-1) x (N1+N2-1), not M1 x N1',
    ],
    practiceQuestions: [
      'Compute the 2D linear convolution of a 3×3 image with a 3×3 Laplacian filter.',
      'Show that linear convolution using circular convolution produces wrap-around error if zero-padding is smaller than (M1+M2-1).',
    ],
    vivaQuestions: [
      'What is the difference between 2D convolution and 2D cross-correlation?',
      'Why must matrices be zero-padded before performing circular convolution via FFT?',
    ],
    relatedTopics: ['Discrete-Time Signals and Systems', '2D-FFT', 'Spatial Filtering'],
    numericals: [
      {
        question: 'Perform 2D linear convolution between the 2 × 2 image matrix X and the 2 × 2 filter matrix H:\nX = [[1, 2], [3, 4]]\nH = [[5, 6], [7, 8]]\n(a) Determine the dimensions of the output matrix Y,\n(b) Calculate each element of Y step-by-step.',
        givenData: [
          'Matrix X dimensions: M₁ = 2, N₁ = 2',
          'Matrix H dimensions: M₂ = 2, N₂ = 2',
          'Output dimensions: P = M₁ + M₂ - 1 = 3, Q = N₁ + N₂ - 1 = 3',
        ],
        formulaUsed: 'Y(m, n) = ∑_{k} ∑_{l} X(k, l) · H(m-k, n-l)',
        steps: [
          {
            stepNumber: 1,
            title: 'Output Size Determination',
            calculation: 'Rows P = 2 + 2 - 1 = 3; Columns Q = 2 + 2 - 1 = 3 ==> Matrix Y is of size 3 × 3',
            explanation: 'Linear convolution of two 2x2 matrices produces a 3x3 matrix.',
          },
          {
            stepNumber: 2,
            title: 'Calculate Row 0 Elements: Y(0,0), Y(0,1), Y(0,2)',
            calculation: 'Y(0,0) = X(0,0)H(0,0) = 1 × 5 = 5\nY(0,1) = X(0,0)H(0,1) + X(0,1)H(0,0) = (1×6) + (2×5) = 6 + 10 = 16\nY(0,2) = X(0,1)H(0,1) = 2 × 6 = 12',
            explanation: 'First row boundary multiplications.',
          },
          {
            stepNumber: 3,
            title: 'Calculate Row 1 Elements: Y(1,0), Y(1,1), Y(1,2)',
            calculation: 'Y(1,0) = X(0,0)H(1,0) + X(1,0)H(0,0) = (1×7) + (3×5) = 7 + 15 = 22\nY(1,1) = X(0,0)H(1,1) + X(0,1)H(1,0) + X(1,0)H(0,1) + X(1,1)H(0,0) = (1×8) + (2×7) + (3×6) + (4×5) = 8 + 14 + 18 + 20 = 60\nY(1,2) = X(0,1)H(1,1) + X(1,1)H(0,1) = (2×8) + (4×6) = 16 + 24 = 40',
            explanation: 'Center row with full overlap on Y(1,1).',
          },
          {
            stepNumber: 4,
            title: 'Calculate Row 2 Elements: Y(2,0), Y(2,1), Y(2,2)',
            calculation: 'Y(2,0) = X(1,0)H(1,0) = 3 × 7 = 21\nY(2,1) = X(1,0)H(1,1) + X(1,1)H(1,0) = (3×8) + (4×7) = 24 + 28 = 52\nY(2,2) = X(1,1)H(1,1) = 4 × 8 = 32',
            explanation: 'Bottom boundary multiplications.',
          },
        ],
        finalAnswer: 'Output Matrix Y (3×3):\n[  5, 16, 12 ]\n[ 22, 60, 40 ]\n[ 21, 52, 32 ]',
      },
    ],
  },

  'hadamard-transform': {
    title: 'Hadamard Transform',
    subject: 'Digital Image Processing',
    unit: 'Unit 3: Image Transforms',
    difficulty: 'Hard',
    tags: ['Hadamard Transform', 'Sylvester Construction', 'Orthogonal Transforms', 'Walsh Transform', 'Numericals'],
    estimatedMinutes: 45,
    introduction: `The Hadamard Transform is a discrete orthogonal transform whose transformation matrix entries consist exclusively of binary polarities (+1 and -1). Because it requires zero multiplications during forward and inverse transforms (only additions and subtractions), it is extraordinarily efficient to implement in digital hardware, FPGAs, and ASICs.`,
    definition: `The Hadamard matrix H_N of order N = 2^n is a symmetric, orthogonal matrix with entries ±1 satisfying H_N · H_N^T = N · I_N. The 2D Hadamard transform of an N × N image matrix F is given by T = (1/N) · H_N · F · H_N.`,
    explanation: `### Sylvester\'s Recursive Construction:
The lowest order Hadamard matrix is:
$$H_1 = [1]$$
The order-2 Hadamard matrix is:
$$H_2 = \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}$$
For any order $2N$ where $N = 2^n$, Sylvester\'s recursive formula is:
$$H_{2N} = \\begin{bmatrix} H_N & H_N \\\\ H_N & -H_N \\end{bmatrix}$$

### Properties of Hadamard Matrices:
1. **Symmetric**: $H_N = H_N^T$
2. **Orthogonal**: $H_N \\cdot H_N^T = N \\cdot I_N$ (hence $H_N^{-1} = \\frac{1}{N} H_N$)
3. **Multiplication-Free**: Requires only $N^2$ additions and subtractions. Fast Hadamard Transform (FHT) further reduces complexity to $O(N \\log_2 N)$.
4. **Relationship to Walsh Transform**: Walsh matrices are simply Hadamard matrices whose rows have been sorted in increasing order of sign changes (sequency order).`,
    examples: [
      { title: 'Hardware Image Processors (FPGA / DSP)', description: 'Addition-only transform eliminates expensive multiplier silicon area on satellite sensors.', icon: '⚡' },
      { title: 'CDMA Telecommunications', description: 'Orthogonal Hadamard-Walsh codes separate cellular channels without cross-talk interference.', icon: '📡' },
      { title: 'Lossless & Lossy Image Compression', description: 'Decomposes spatial correlation into sequency components for bit allocation.', icon: '🗜️' },
    ],
    terminology: [
      { term: 'Sequency', definition: 'The number of zero-crossings (sign changes) per unit interval in a discrete waveform.' },
      { term: 'Orthogonal Matrix', definition: 'A square matrix whose transpose is equal to its inverse scaled by a constant factor.' },
      { term: 'Fast Hadamard Transform (FHT)', definition: 'Divide-and-conquer butterfly algorithm reducing operations to O(N log N).' },
    ],
    algorithm: `1. Construct H_2 = [[1, 1], [1, -1]]
2. Apply Sylvester recursion to generate H_4 = [[H_2, H_2], [H_2, -H_2]]
3. For an N x N image matrix F:
4. Perform 1D row transform: R = F · H_N
5. Perform 1D column transform: T = (1/N) · H_N · R
6. Inverse Transform: F = (1/N) · H_N · T · H_N`,
    pseudocode: `function generateHadamard(order):
    if order == 1:
        return [[1]]
    prev = generateHadamard(order / 2)
    half = order / 2
    H = 2D array of size order x order
    for r = 0 to half - 1:
        for c = 0 to half - 1:
            H[r][c] = prev[r][c]
            H[r][c + half] = prev[r][c]
            H[r + half][c] = prev[r][c]
            H[r + half][c + half] = -prev[r][c]
    return H`,
    cCode: `#include <stdio.h>

void printMatrix(const char* name, int M[4][4]) {
    printf("%s:\\n", name);
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%3d ", M[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    // 4x4 Hadamard Matrix
    int H4[4][4] = {
        { 1,  1,  1,  1 },
        { 1, -1,  1, -1 },
        { 1,  1, -1, -1 },
        { 1, -1, -1,  1 }
    };

    printMatrix("Hadamard Matrix H4", H4);
    return 0;
}`,
    cppCode: `#include <iostream>
#include <vector>

std::vector<std::vector<int>> getHadamard(int n) {
    if (n == 1) return {{1}};
    auto prev = getHadamard(n / 2);
    int half = n / 2;
    std::vector<std::vector<int>> H(n, std::vector<int>(n));
    for (int i = 0; i < half; i++) {
        for (int j = 0; j < half; j++) {
            H[i][j] = prev[i][j];
            H[i][j + half] = prev[i][j];
            H[i + half][j] = prev[i][j];
            H[i + half][j + half] = -prev[i][j];
        }
    }
    return H;
}

int main() {
    auto H = getHadamard(4);
    std::cout << "Generated H4 via Sylvester Recursion:\\n";
    for (const auto& row : H) {
        for (int v : row) std::cout << (v > 0 ? " +" : " ") << v << " ";
        std::cout << "\\n";
    }
    return 0;
}`,
    timeComplexity: {
      best: 'O(N²)',
      average: 'O(N²)',
      worst: 'O(N²)',
      explanation: 'Matrix multiplication without multipliers; Fast Hadamard Transform operates in O(N log N).',
    },
    spaceComplexity: {
      value: 'O(N²)',
      explanation: 'Storage for N × N transformed coefficients.',
    },
    sampleIO: [
      {
        input: 'Order N = 4',
        output: 'H4 with rows [1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, 1]',
        explanation: 'All elements are ±1 and mutually orthogonal.',
      },
    ],
    advantages: [
      'Requires ZERO hardware multipliers: implementable with simple add/subtract accumulators',
      'Orthogonal and symmetric: forward and inverse transforms use identical matrices',
    ],
    disadvantages: [
      'Lower energy compaction efficiency compared to DCT and KLT for natural photographic images',
    ],
    commonMistakes: [
      'Confusing Hadamard with Walsh: Hadamard is naturally ordered; Walsh is sequency ordered',
      'Forgetting the normalization factor (1/N) in 2D forward and inverse transform formulas',
    ],
    practiceQuestions: [
      'Construct the 8×8 Hadamard matrix H_8 using Sylvester\'s construction.',
      'Count the number of zero-crossings (sequency) for each row of H_4 and rearrange into a Walsh matrix.',
    ],
    vivaQuestions: [
      'Why is the Hadamard transform called a multiplication-free transform?',
      'What is the relation between a Hadamard matrix and its inverse?',
    ],
    relatedTopics: ['Walsh Transform', 'Discrete Cosine Transform (DCT)', '2D-FFT'],
    numericals: [
      {
        question: 'Given the 2 × 2 image matrix F = [[4, 2], [1, 3]]. (a) Construct the 2 × 2 Hadamard matrix H₂, (b) Compute the 2D Hadamard Transform matrix T of F, (c) Verify that the original image F can be reconstructed using the inverse Hadamard transform.',
        givenData: [
          'Image F = [[4, 2], [1, 3]]',
          'Matrix dimension N = 2',
          'Normalization constant = 1 / N = 1 / 2',
        ],
        formulaUsed: 'T = (1/2) · H₂ · F · H₂,  F = (1/2) · H₂ · T · H₂,  H₂ = [[1, 1], [1, -1]]',
        steps: [
          {
            stepNumber: 1,
            title: 'Hadamard Matrix Definition (H₂)',
            calculation: 'H₂ = [\n  [ 1,  1 ],\n  [ 1, -1 ]\n]',
            explanation: 'Standard order-2 Hadamard kernel.',
          },
          {
            stepNumber: 2,
            title: 'Compute First Matrix Multiplication: A = H₂ · F',
            calculation: 'A = [[1, 1], [1, -1]] × [[4, 2], [1, 3]]\nA(0,0) = (1)(4) + (1)(1) = 5\nA(0,1) = (1)(2) + (1)(3) = 5\nA(1,0) = (1)(4) + (-1)(1) = 3\nA(1,1) = (1)(2) + (-1)(3) = -1\n==> A = [[5, 5], [3, -1]]',
            explanation: 'Row transform of the image.',
          },
          {
            stepNumber: 3,
            title: 'Compute Column Multiplication: B = A · H₂',
            calculation: 'B = [[5, 5], [3, -1]] × [[1, 1], [1, -1]]\nB(0,0) = (5)(1) + (5)(1) = 10\nB(0,1) = (5)(1) + (5)(-1) = 0\nB(1,0) = (3)(1) + (-1)(1) = 2\nB(1,1) = (3)(1) + (-1)(-1) = 4\n==> B = [[10, 0], [2, 4]]',
            explanation: 'Column transform applied to intermediate matrix.',
          },
          {
            stepNumber: 4,
            title: 'Apply Scaling Factor (1/N = 1/2) to find T',
            calculation: 'T = (1/2) · B = (1/2) · [[10, 0], [2, 4]] = [\n  [ 5, 0 ],\n  [ 1, 2 ]\n]',
            explanation: 'The DC coefficient T(0,0) = 5 contains the average sum: (4+2+1+3)/2 = 5.',
          },
          {
            stepNumber: 5,
            title: 'Verify Inverse Transform Reconstruction',
            calculation: 'F = (1/2) · H₂ · T · H₂\nH₂ · T = [[1, 1], [1, -1]] × [[5, 0], [1, 2]] = [[6, 2], [4, -2]]\n[[6, 2], [4, -2]] × [[1, 1], [1, -1]] = [[8, 4], [2, 6]]\nScaled by 1/2 ==> [[4, 2], [1, 3]] = Original F!',
            explanation: 'Exact reconstruction verifies mathematical correctness.',
          },
        ],
        finalAnswer: 'Transformed Hadamard Matrix T = [[5, 0], [1, 2]]; Reconstructed F = [[4, 2], [1, 3]] (Exact match).',
      },
    ],
  },

  'lossless-compression-huffman-rle-lzw': {
    title: 'Lossless Compression: Huffman Coding, RLE & LZW',
    subject: 'Digital Image Processing',
    unit: 'Unit 5: Image Compression',
    difficulty: 'Hard',
    tags: ['Huffman Coding', 'Run Length Encoding', 'Shannon Entropy', 'Compression Ratio', 'Lossless', 'Numericals'],
    estimatedMinutes: 60,
    introduction: `Image compression addresses the problem of reducing the volume of digital data required to represent an image without sacrificing essential diagnostic or visual content. Lossless compression guarantees exact mathematical reconstruction of the original pixel values upon decompression, which is mandatory in medical imaging, archiving, and astronomical observations.`,
    definition: `Huffman Coding is an optimal prefix variable-length statistical coding algorithm that assigns shorter binary codewords to frequently occurring gray levels and longer codewords to rarely occurring levels, achieving average codeword length approaching source entropy.`,
    explanation: `### Key Information Theory Metrics:
1. **Source Entropy (Shannon\'s Fundamental Theoretical Minimum)**:
   $$H = -\\sum_{k=0}^{L-1} p_k \\log_2(p_k) \\quad \\text{(bits/symbol)}$$
2. **Average Codeword Length**:
   $$L_{\\text{avg}} = \\sum_{k=0}^{L-1} l_k \\cdot p_k \\quad \\text{(bits/symbol)}$$
   where $l_k$ is the length in bits of the codeword assigned to symbol $k$.
3. **Coding Efficiency**:
   $$\\eta = \\frac{H}{L_{\\text{avg}}} \\times 100\\%$$
4. **Compression Ratio**:
   $$C_R = \\frac{\\text{Original Bits per Pixel}}{\\text{Compressed Average Length}} = \\frac{k}{L_{\\text{avg}}}$$

### Types of Data Redundancy:
- **Coding Redundancy**: Arises when fixed-length codes (e.g. 8 bpp) are used for symbols that do not have equal probabilities. Removed via Huffman/Arithmetic coding.
- **Interpixel (Spatial) Redundancy**: Arises from strong correlation between neighboring pixels. Removed via DPCM, Run-Length Encoding (RLE), or 2D transforms.
- **Psychovisual Redundancy**: Arises because the human eye cannot perceive subtle luminance and chrominance variations. Removed via Quantization (Lossy).`,
    examples: [
      { title: 'PNG & GIF Image Formats', description: 'Uses Deflate / LZW lossless algorithms to compress graphics without losing crisp line edges.', icon: '🖼️' },
      { title: 'Medical DICOM Standards', description: 'Legal and diagnostic regulations require lossless compression for patient X-rays and MRI scans.', icon: '🏥' },
      { title: 'Facsimile (Fax) Transmission', description: 'Run-Length Encoding (RLE) compresses long horizontal runs of white background pixels.', icon: '📠' },
    ],
    terminology: [
      { term: 'Prefix-Free Code', definition: 'No codeword is a prefix of any other codeword, allowing instantaneous decoding without delimiters.' },
      { term: 'Run-Length Encoding (RLE)', definition: 'Represents repeating sequences of identical values as count-value pairs.' },
      { term: 'Dictionary-Based Coding (LZW)', definition: 'Replaces repeated multi-symbol substrings with dynamic integer codes.' },
    ],
    algorithm: `1. List all source symbols in descending order of probabilities
2. Combine the two least probable symbols into a single composite symbol with sum probability
3. Re-sort the reduced list in descending order
4. Repeat steps 2-3 until only two composite symbols remain
5. Assign binary 0 to one branch and binary 1 to the other branch at each step
6. Backtrack from the root to each original symbol to read out the unique binary codeword
7. Calculate average length L_avg and compare against source entropy H`,
    pseudocode: `function buildHuffmanTree(symbols, probabilities):
    priorityQueue = MinHeap()
    for each (sym, p) in (symbols, probabilities):
        priorityQueue.push(Node(sym, p))
    
    while priorityQueue.size() > 1:
        left = priorityQueue.pop()
        right = priorityQueue.pop()
        parent = Node(prob = left.p + right.p, leftChild = left, rightChild = right)
        priorityQueue.push(parent)
    
    return priorityQueue.pop() // Root of Huffman Tree`,
    cCode: `#include <stdio.h>
#include <math.h>

void calculateEntropyAndEfficiency() {
    // 6 symbols with probabilities
    double p[] = {0.40, 0.30, 0.10, 0.10, 0.06, 0.04};
    int lengths[] = {1, 2, 3, 4, 5, 5}; // typical Huffman lengths
    int n = 6;

    double H = 0.0;
    double Lavg = 0.0;

    for (int i = 0; i < n; i++) {
        H += -p[i] * (log(p[i]) / log(2.0));
        Lavg += p[i] * lengths[i];
    }

    double efficiency = (H / Lavg) * 100.0;
    double CR = 8.0 / Lavg; // against 8-bit uncompressed

    printf("=== Information Theory Metrics ===\\n");
    printf("Source Entropy (H)       : %.4f bits/symbol\\n", H);
    printf("Average Length (L_avg)   : %.4f bits/symbol\\n", Lavg);
    printf("Coding Efficiency (eta)  : %.2f%%\\n", efficiency);
    printf("Compression Ratio (CR)   : %.2f : 1\\n", CR);
}

int main() {
    calculateEntropyAndEfficiency();
    return 0;
}`,
    cppCode: `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>

int main() {
    std::vector<double> p = {0.40, 0.30, 0.10, 0.10, 0.06, 0.04};
    std::vector<int> len = {1, 2, 3, 4, 5, 5};

    double H = 0.0, Lavg = 0.0;
    for (size_t i = 0; i < p.size(); ++i) {
        H -= p[i] * std::log2(p[i]);
        Lavg += p[i] * len[i];
    }

    std::cout << std::fixed << std::setprecision(4);
    std::cout << "Shannon Entropy H    = " << H << " bits/symbol\\n";
    std::cout << "Average Code Length  = " << Lavg << " bits/symbol\\n";
    std::cout << "Coding Efficiency    = " << (H / Lavg) * 100.0 << "%\\n";
    std::cout << "Redundancy Removed   = " << (1.0 - (H / Lavg)) * 100.0 << "%\\n";
    return 0;
}`,
    timeComplexity: {
      best: 'O(N log N)',
      average: 'O(N log N)',
      worst: 'O(N log N)',
      explanation: 'Building Huffman tree with priority queue requires N-1 merges in O(N log N).',
    },
    spaceComplexity: {
      value: 'O(N)',
      explanation: 'Binary tree storage for N leaves and N-1 internal nodes.',
    },
    sampleIO: [
      {
        input: 'Symbols: a1(0.4), a2(0.3), a3(0.1), a4(0.1), a5(0.06), a6(0.04)',
        output: 'Entropy H = 2.1435 bits/symbol, Lavg = 2.2000 bits/symbol, Efficiency = 97.43%',
        explanation: 'Very high coding efficiency approaching Shannon limit.',
      },
    ],
    advantages: [
      'Guarantees optimal code length among all symbol-by-symbol prefix codes',
      'Completely lossless: 100% exact mathematical recovery of original image',
    ],
    disadvantages: [
      'Cannot exploit inter-pixel spatial correlations on its own without pre-transformation (like DPCM or DCT)',
      'Single bit error in compressed stream can corrupt all subsequent decoded pixels',
    ],
    commonMistakes: [
      'Using natural log instead of base-2 logarithm when computing Shannon entropy',
      'Forgetting that compression ratio CR = uncompressed_bits / compressed_bits',
    ],
    practiceQuestions: [
      'Given symbols with probabilities [0.35, 0.25, 0.20, 0.15, 0.05], build the complete Huffman tree, assign codewords, and calculate redundancy.',
      'Explain how Run-Length Encoding (RLE) is combined with Huffman coding in the JPEG baseline standard.',
    ],
    vivaQuestions: [
      'What is Shannon\'s Source Coding Theorem?',
      'Why are Huffman codes termed "prefix-free codes"?',
      'What are the three fundamental data redundancies in digital images?',
    ],
    relatedTopics: ['Fundamentals of Image Compression', 'Image Redundancies', 'JPEG / JPEG2000 Standards'],
    numericals: [
      {
        question: 'An image source produces 6 discrete gray level symbols with the following probabilities of occurrence:\np(a₁) = 0.40, p(a₂) = 0.30, p(a₃) = 0.10, p(a₄) = 0.10, p(a₅) = 0.06, p(a₆) = 0.04.\n(a) Calculate the Shannon Entropy H of the source,\n(b) Construct the Huffman coding tree and assign binary codewords,\n(c) Calculate the average codeword length L_avg,\n(d) Calculate the coding efficiency η and redundancy R,\n(e) Calculate the compression ratio C_R if the original uncompressed image uses 3 bits per pixel.',
        givenData: [
          'Probabilities: [0.40, 0.30, 0.10, 0.10, 0.06, 0.04]',
          'Sum of probabilities = 0.40 + 0.30 + 0.10 + 0.10 + 0.06 + 0.04 = 1.00',
          'Uncompressed bit depth k = 3 bits/pixel (since 6 symbols requires 3 bits)',
        ],
        formulaUsed: 'H = -∑ p_i log₂(p_i),  L_avg = ∑ l_i p_i,  η = (H / L_avg) × 100%,  C_R = k / L_avg',
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Shannon Source Entropy (H)',
            calculation: 'H = - [ 0.40 log₂(0.40) + 0.30 log₂(0.30) + 0.10 log₂(0.10) + 0.10 log₂(0.10) + 0.06 log₂(0.06) + 0.04 log₂(0.04) ]\n= - [ 0.40(-1.3219) + 0.30(-1.7370) + 0.10(-3.3219) + 0.10(-3.3219) + 0.06(-4.0589) + 0.04(-4.6439) ]\n= - [ -0.5288 - 0.5211 - 0.3322 - 0.3322 - 0.2435 - 0.1858 ]\n= 2.1436 bits/symbol',
            explanation: 'The theoretical minimum average bits required without loss.',
          },
          {
            stepNumber: 2,
            title: 'Construct Huffman Tree via Successive Merging',
            calculation: 'Iteration 1: Merge lowest two: a5(0.06) + a6(0.04) = c1(0.10)\nRemaining: [0.40, 0.30, 0.10, 0.10, c1(0.10)]\nIteration 2: Merge lowest two: a4(0.10) + c1(0.10) = c2(0.20)\nRemaining: [0.40, 0.30, c2(0.20), a3(0.10)]\nIteration 3: Merge lowest two: c2(0.20) + a3(0.10) = c3(0.30)\nRemaining: [0.40, a2(0.30), c3(0.30)]\nIteration 4: Merge lowest two: a2(0.30) + c3(0.30) = c4(0.60)\nRemaining: [c4(0.60), a1(0.40)]\nIteration 5: Final merge: 0.60 + 0.40 = 1.00 (Root)',
            explanation: 'Repeatedly combining lowest probability nodes until reaching the single root.',
          },
          {
            stepNumber: 3,
            title: 'Assign Codewords and Determine Lengths',
            calculation: 'a₁ (0.40) ==> Code: 0       ==> Length l₁ = 1 bit\na₂ (0.30) ==> Code: 10      ==> Length l₂ = 2 bits\na₃ (0.10) ==> Code: 110     ==> Length l₃ = 3 bits\na₄ (0.10) ==> Code: 1110    ==> Length l₄ = 4 bits\na₅ (0.06) ==> Code: 11110   ==> Length l₅ = 5 bits\na₆ (0.04) ==> Code: 11111   ==> Length l₆ = 5 bits',
            explanation: 'All codewords are prefix-free: no codeword starts another codeword.',
          },
          {
            stepNumber: 4,
            title: 'Calculate Average Codeword Length (L_avg)',
            calculation: 'L_avg = (0.40 × 1) + (0.30 × 2) + (0.10 × 3) + (0.10 × 4) + (0.06 × 5) + (0.04 × 5)\n= 0.40 + 0.60 + 0.30 + 0.40 + 0.30 + 0.20\n= 2.2000 bits/symbol',
            explanation: 'Average code length is 2.2 bits/symbol, remarkably close to entropy 2.1436.',
          },
          {
            stepNumber: 5,
            title: 'Calculate Coding Efficiency (η) and Compression Ratio (C_R)',
            calculation: 'Efficiency η = (H / L_avg) × 100% = (2.1436 / 2.2000) × 100% = 97.44%\nRedundancy R = 1 - η = 2.56%\nCompression Ratio C_R = 3.0 / 2.20 = 1.364 : 1 (or 27.27% reduction)',
            explanation: 'Compression ratio compares against fixed 3 bpp uncompressed storage.',
          },
        ],
        finalAnswer: 'Entropy H = 2.144 bits/sym; L_avg = 2.200 bits/sym; Coding Efficiency = 97.44%; Compression Ratio = 1.36:1',
      },
    ],
  },
}
