export interface FormulaItem {
  id: string
  unit: number
  unitTitle: string
  title: string
  formula: string
  latex: string
  variables: { symbol: string; meaning: string; unit?: string }[]
  explanation: string
  examTip: string
  exampleProblem: {
    question: string
    given: string
    solution: string
    answer: string
  }
}

export const DIP_FORMULA_SHEET: FormulaItem[] = [
  // ─── UNIT 1: FUNDAMENTALS ──────────────────────────────────────────
  {
    id: 'f-storage-size',
    unit: 1,
    unitTitle: 'Unit I: Fundamentals of DIP',
    title: 'Image Storage / Uncompressed Size',
    formula: 'b = M × N × k (bits) = (M × N × k) / 8 (Bytes)',
    latex: 'b = M \\times N \\times k \\text{ bits} = \\frac{M \\times N \\times k}{8} \\text{ Bytes}',
    variables: [
      { symbol: 'M', meaning: 'Number of rows (height in pixels)' },
      { symbol: 'N', meaning: 'Number of columns (width in pixels)' },
      { symbol: 'k', meaning: 'Bit depth (bits per pixel, bpp)' },
      { symbol: 'L', meaning: 'Number of discrete gray levels, L = 2^k' },
    ],
    explanation: 'Calculates the raw uncompressed digital memory required to store a raster matrix of dimensions M × N with k bits per pixel.',
    examTip: 'Remember to divide by 8 to convert bits to Bytes, and by 1024 to convert Bytes to KB.',
    exampleProblem: {
      question: 'Calculate the memory required in KB to store an uncompressed 512 × 512 grayscale image with 256 gray levels.',
      given: 'M = 512, N = 512, L = 256 → k = log₂(256) = 8 bits/pixel.',
      solution: 'b = 512 × 512 × 8 bits = 2,097,152 bits.\nBytes = 2,097,152 / 8 = 262,144 Bytes.\nKilobytes (KB) = 262,144 / 1024 = 256 KB.',
      answer: '256 KB (or 0.25 MB)',
    },
  },
  {
    id: 'f-pixel-distances',
    unit: 1,
    unitTitle: 'Unit I: Fundamentals of DIP',
    title: 'Pixel Distance Metrics (Euclidean, D4, D8)',
    formula: 'De = √((x-s)² + (y-t)²),  D4 = |x-s| + |y-t|,  D8 = max(|x-s|, |y-t|)',
    latex: 'D_e(p,q) = \\sqrt{(x-s)^2 + (y-t)^2}, \\quad D_4(p,q) = |x-s| + |y-t|, \\quad D_8(p,q) = \\max(|x-s|, |y-t|)',
    variables: [
      { symbol: 'p(x, y)', meaning: 'Coordinates of first pixel' },
      { symbol: 'q(s, t)', meaning: 'Coordinates of second pixel' },
      { symbol: 'D_e', meaning: 'Euclidean distance (straight line distance)' },
      { symbol: 'D_4', meaning: 'City-Block / Manhattan distance (moves horizontally & vertically)' },
      { symbol: 'D_8', meaning: 'Chessboard distance (moves horizontally, vertically & diagonally)' },
    ],
    explanation: 'Geometric distance metrics measuring spatial separation between pixels. D4 defines a diamond shape equidistant contour; D8 defines a square shape equidistant contour.',
    examTip: 'For any two points: D_8 ≤ D_e ≤ D_4 always holds.',
    exampleProblem: {
      question: 'Compute Euclidean, D4, and D8 distances between pixel p(2, 3) and pixel q(6, 7).',
      given: 'p = (2, 3), q = (6, 7). Δx = |2 - 6| = 4, Δy = |3 - 7| = 4.',
      solution: 'De = √(4² + 4²) = √(16 + 16) = √32 ≈ 5.657\nD4 = 4 + 4 = 8\nD8 = max(4, 4) = 4',
      answer: 'De ≈ 5.66, D4 = 8, D8 = 4',
    },
  },
  {
    id: 'f-circular-convolution-padding',
    unit: 1,
    unitTitle: 'Unit I: Fundamentals of DIP',
    title: 'Zero Padding for Linear via Circular Convolution',
    formula: 'P ≥ A + C - 1,  Q ≥ B + D - 1',
    latex: 'P \\ge A + C - 1, \\quad Q \\ge B + D - 1',
    variables: [
      { symbol: 'A × B', meaning: 'Dimensions of first 2D matrix f(x, y)' },
      { symbol: 'C × D', meaning: 'Dimensions of second 2D matrix h(x, y)' },
      { symbol: 'P × Q', meaning: 'Padded dimensions required to avoid wrap-around / aliasing error' },
    ],
    explanation: 'Circular convolution inherently wraps around boundaries (periodic extension). To perform exact linear convolution using circular convolution (or 2D-FFT), both matrices must be zero-padded to at least P × Q.',
    examTip: 'If asked: "What is the size of the linear convolution output of a 256×256 image with a 7×7 filter?", use: (256+7-1) × (256+7-1) = 262 × 262.',
    exampleProblem: {
      question: 'Find the minimum padded matrix dimensions to convolve a 3×3 matrix with a 2×2 filter using circular convolution without wrap-around error.',
      given: 'A=3, B=3; C=2, D=2.',
      solution: 'P = A + C - 1 = 3 + 2 - 1 = 4.\nQ = B + D - 1 = 3 + 2 - 1 = 4.\nBoth matrices must be zero-padded to size 4 × 4.',
      answer: '4 × 4 matrix',
    },
  },

  // ─── UNIT 2: IMAGE ENHANCEMENT ─────────────────────────────────────
  {
    id: 'f-gamma-correction',
    unit: 2,
    unitTitle: 'Unit II: Image Enhancement',
    title: 'Power-Law (Gamma) Transformation',
    formula: 's = c · r^γ',
    latex: 's = c \\cdot r^\\gamma',
    variables: [
      { symbol: 'r', meaning: 'Input pixel gray-level value normalized to [0, 1]' },
      { symbol: 's', meaning: 'Output transformed pixel gray-level value' },
      { symbol: 'c', meaning: 'Positive constant (typically c = 1)' },
      { symbol: 'γ (gamma)', meaning: 'Power-law exponent; γ < 1 brightens shadows, γ > 1 enhances highlights' },
    ],
    explanation: 'Used for monitor display calibration (CRT/OLED response correction) and contrast manipulation. When γ < 1, narrow range of dark input values is mapped into a wider range of output values (brightens dark images).',
    examTip: 'If an underexposed medical X-ray is too dark, choose γ < 1 (e.g. 0.4 or 0.6) to brighten details.',
    exampleProblem: {
      question: 'An input pixel has normalized intensity r = 0.25. If c = 1 and gamma γ = 0.5, what is the output intensity s?',
      given: 'r = 0.25, c = 1, γ = 0.5.',
      solution: 's = 1 × (0.25)^(0.5) = √0.25 = 0.5.',
      answer: 's = 0.5 (scaled up from 0.25, significantly brightened)',
    },
  },
  {
    id: 'f-histogram-equalization',
    unit: 2,
    unitTitle: 'Unit II: Image Enhancement',
    title: 'Discrete Histogram Equalization Transformation',
    formula: 's_k = T(r_k) = round[ (L - 1) × ∑_{j=0}^{k} p_r(r_j) ] = round[ ((L-1)/MN) × ∑_{j=0}^{k} n_j ]',
    latex: 's_k = T(r_k) = \\text{round}\\left[ (L - 1) \\sum_{j=0}^{k} p_r(r_j) \\right] = \\text{round}\\left[ \\frac{L-1}{MN} \\sum_{j=0}^{k} n_j \\right]',
    variables: [
      { symbol: 'r_k', meaning: 'Input gray level (k = 0, 1, ..., L-1)' },
      { symbol: 's_k', meaning: 'Output equalized gray level' },
      { symbol: 'p_r(r_j)', meaning: 'Normalized probability: n_j / (M × N)' },
      { symbol: 'L', meaning: 'Total number of gray levels (e.g. 8 for 3-bit, 256 for 8-bit)' },
      { symbol: 'MN', meaning: 'Total number of pixels in the image' },
    ],
    explanation: 'Finds a monotonic mapping that yields a uniform output histogram, maximizing image entropy and global contrast over the entire dynamic range.',
    examTip: 'Always construct a table: Column 1: r_k, Col 2: n_k, Col 3: p(r_k), Col 4: Cumulative CDF, Col 5: (L-1)*CDF, Col 6: round to s_k.',
    exampleProblem: {
      question: 'A 64×64 3-bit image (L=8) has gray levels r0 to r7 with pixel counts: n0=790, n1=1023, n2=850, n3=656, n4=329, n5=245, n6=122, n7=81. Find equalized level s0 and s1.',
      given: 'MN = 64×64 = 4096. L-1 = 7.',
      solution: 'For k=0: CDF_0 = 790/4096 = 0.1928 → s0 = round(7 × 0.1928) = round(1.35) = 1.\nFor k=1: CDF_1 = (790 + 1023)/4096 = 1813/4096 = 0.4426 → s1 = round(7 × 0.4426) = round(3.09) = 3.',
      answer: 's0 = 1, s1 = 3',
    },
  },
  {
    id: 'f-laplacian-mask',
    unit: 2,
    unitTitle: 'Unit II: Image Enhancement',
    title: 'Laplacian Second-Derivative Sharpening Mask',
    formula: '∇²f(x,y) = f(x+1,y) + f(x-1,y) + f(x,y+1) + f(x,y-1) - 4f(x,y)',
    latex: '\\nabla^2 f(x,y) = f(x+1,y) + f(x-1,y) + f(x,y+1) + f(x,y-1) - 4f(x,y)',
    variables: [
      { symbol: '∇²f', meaning: 'Second-order isotropic derivative' },
      { symbol: 'g(x,y)', meaning: 'Sharpened image: g(x,y) = f(x,y) - ∇²f(x,y) (when center is negative)' },
    ],
    explanation: 'The Laplacian highlights gray-level discontinuities and deemphasizes slowly varying regions. Adding back the scaled Laplacian enhances subtle edges and fine details.',
    examTip: 'If center coefficient is -4 (cross) or -8 (with diagonals), subtract Laplacian: g = f - ∇²f. If center is +4 or +8, add Laplacian: g = f + ∇²f.',
    exampleProblem: {
      question: 'Calculate Laplacian ∇²f at center pixel (value 5) with 4-neighbors: top=2, bottom=3, left=4, right=6 using center weight -4.',
      given: 'Center f(x,y) = 5. Neighbors: f(x+1,y)=6, f(x-1,y)=4, f(x,y+1)=3, f(x,y-1)=2.',
      solution: '∇²f = (6 + 4 + 3 + 2) - 4(5) = 15 - 20 = -5.\nSharpened pixel = f - ∇²f = 5 - (-5) = 10.',
      answer: '∇²f = -5; Sharpened value = 10',
    },
  },
  {
    id: 'f-butterworth-filter',
    unit: 2,
    unitTitle: 'Unit II: Image Enhancement',
    title: 'Butterworth Lowpass Filter (BLPF) Transfer Function',
    formula: 'H(u,v) = 1 / [1 + (D(u,v) / D₀)^(2n)]',
    latex: 'H(u,v) = \\frac{1}{1 + \\left[\\frac{D(u,v)}{D_0}\\right]^{2n}}',
    variables: [
      { symbol: 'D(u,v)', meaning: 'Distance from point (u,v) to frequency center (M/2, N/2)' },
      { symbol: 'D₀', meaning: 'Cutoff frequency radius' },
      { symbol: 'n', meaning: 'Filter order (n=1 smooth transition; n ≥ 20 approaches ideal filter with ringing)' },
    ],
    explanation: 'Butterworth filters provide a smooth transition between passband and stopband without the severe ringing artifacts caused by the sharp cutoff of Ideal filters.',
    examTip: 'At D(u,v) = D₀, the filter amplitude H(u,v) is always exactly 1 / (1 + 1) = 0.5 (or 50% power).',
    exampleProblem: {
      question: 'For a 2nd-order Butterworth LPF with D₀ = 50, calculate the filter response H(u,v) at a frequency point where D(u,v) = 25.',
      given: 'D = 25, D₀ = 50, n = 2 → 2n = 4.',
      solution: 'H(u,v) = 1 / [1 + (25/50)⁴] = 1 / [1 + (0.5)⁴] = 1 / [1 + 0.0625] = 1 / 1.0625 ≈ 0.9412.',
      answer: 'H(u,v) ≈ 0.941 (94.1% transmission)',
    },
  },

  // ─── UNIT 3: IMAGE TRANSFORMS ──────────────────────────────────────
  {
    id: 'f-hadamard-matrix',
    unit: 3,
    unitTitle: 'Unit III: Image Transforms',
    title: 'Sylvester Construction for Hadamard Matrix',
    formula: 'H₁ = [1],  H₂ = [[1, 1], [1, -1]],  H_{2N} = [[H_N, H_N], [H_N, -H_N]]',
    latex: 'H_{2N} = \\begin{bmatrix} H_N & H_N \\\\ H_N & -H_N \\end{bmatrix}, \\quad H_2 = \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix}',
    variables: [
      { symbol: 'H_N', meaning: 'Hadamard matrix of order N = 2^n' },
      { symbol: 'H_N · H_N^T', meaning: 'Orthogonality condition: H_N · H_N^T = N · I_N' },
    ],
    explanation: 'Hadamard matrices consist exclusively of values +1 and -1, making transform computation addition- and subtraction-only (no multiplication needed, high hardware efficiency).',
    examTip: 'Hadamard rows are ordered by natural index. To convert Hadamard to Walsh, reorder rows in increasing order of sign changes (sequency order).',
    exampleProblem: {
      question: 'Construct the 4×4 Hadamard matrix H₄ using H₂.',
      given: 'H₂ = [[1, 1], [1, -1]].',
      solution: 'H₄ = [[H₂, H₂], [H₂, -H₂]] =\n[ 1,  1,  1,  1]\n[ 1, -1,  1, -1]\n[ 1,  1, -1, -1]\n[ 1, -1, -1,  1]',
      answer: '4×4 symmetric orthogonal matrix with elements ±1',
    },
  },
  {
    id: 'f-2d-dct',
    unit: 3,
    unitTitle: 'Unit III: Image Transforms',
    title: '2D Discrete Cosine Transform (DCT Type-II)',
    formula: 'C(u,v) = α(u)α(v) ∑_{x=0}^{N-1} ∑_{y=0}^{N-1} f(x,y) cos[((2x+1)uπ)/(2N)] cos[((2y+1)vπ)/(2N)]',
    latex: 'C(u,v) = \\alpha(u)\\alpha(v) \\sum_{x=0}^{N-1}\\sum_{y=0}^{N-1} f(x,y) \\cos\\left[\\frac{(2x+1)u\\pi}{2N}\\right] \\cos\\left[\\frac{(2y+1)v\\pi}{2N}\\right]',
    variables: [
      { symbol: 'α(0)', meaning: '√(1/N) for DC coefficient (u = 0 or v = 0)' },
      { symbol: 'α(u)', meaning: '√(2/N) for AC coefficients (u, v > 0)' },
      { symbol: 'C(0,0)', meaning: 'DC coefficient = average energy of the entire block' },
    ],
    explanation: 'DCT has superior energy compaction capability (near-optimal approximation to Karhunen-Loève Transform KLT). It concentrates the bulk of image information into a few low-frequency coefficients at the top-left.',
    examTip: 'Used in JPEG compression for 8×8 pixel blocks.',
    exampleProblem: {
      question: 'Calculate the DC coefficient C(0,0) of a 2×2 image with pixel values [[10, 20], [30, 40]].',
      given: 'N = 2, f(x,y) matrix, α(0) = √(1/2).',
      solution: 'C(0,0) = (1/√2)(1/√2) ∑∑ f(x,y) = (1/2) × (10 + 20 + 30 + 40) = (1/2) × 100 = 50.',
      answer: 'C(0,0) = 50',
    },
  },

  // ─── UNIT 4: IMAGE RESTORATION ─────────────────────────────────────
  {
    id: 'f-wiener-filter',
    unit: 4,
    unitTitle: 'Unit IV: Image Restoration',
    title: 'Wiener (Minimum Mean Square Error) Restoration Filter',
    formula: 'H_w(u,v) = (1 / H(u,v)) × [ |H(u,v)|² / (|H(u,v)|² + K) ]',
    latex: '\\hat{F}(u,v) = \\left[ \\frac{1}{H(u,v)} \\frac{|H(u,v)|^2}{|H(u,v)|^2 + K} \\right] G(u,v)',
    variables: [
      { symbol: 'H(u,v)', meaning: 'Degradation / Point Spread Function (PSF) transfer function' },
      { symbol: '|H(u,v)|²', meaning: 'H*(u,v) · H(u,v) (magnitude squared)' },
      { symbol: 'K', meaning: 'Noise-to-Signal Power Ratio: S_η(u,v) / S_f(u,v) (often approximated as a constant)' },
      { symbol: 'G(u,v)', meaning: 'Fourier transform of degraded, noisy image' },
    ],
    explanation: 'Balances direct inverse filtering with noise de-amplification. When |H(u,v)| is large (low frequencies), it acts as an inverse filter. When |H(u,v)| approaches zero (high frequencies), it attenuates noise rather than dividing by zero.',
    examTip: 'When K = 0 (zero noise), Wiener filter reduces identically to the Inverse Filter: 1/H(u,v).',
    exampleProblem: {
      question: 'At a frequency (u,v), degradation H = 0.2 and noise-to-signal ratio K = 0.01. Calculate the Wiener filter gain.',
      given: 'H = 0.2 → |H|² = 0.04. K = 0.01.',
      solution: 'Gain = (1 / 0.2) × [ 0.04 / (0.04 + 0.01) ] = 5 × [ 0.04 / 0.05 ] = 5 × 0.8 = 4.0.\n(Direct inverse filter would have given 1/0.2 = 5.0, so Wiener gently dampens the noise spike).',
      answer: 'Wiener Filter Gain = 4.0',
    },
  },

  // ─── UNIT 5: IMAGE COMPRESSION ─────────────────────────────────────
  {
    id: 'f-compression-ratio-redundancy',
    unit: 5,
    unitTitle: 'Unit V: Image Compression',
    title: 'Compression Ratio and Relative Data Redundancy',
    formula: 'C_R = n₁ / n₂,  R_D = 1 - (1 / C_R)',
    latex: 'C_R = \\frac{n_1}{n_2}, \\quad R_D = 1 - \\frac{1}{C_R}',
    variables: [
      { symbol: 'n₁', meaning: 'Data volume (bytes/bits) of original uncompressed dataset' },
      { symbol: 'n₂', meaning: 'Data volume (bytes/bits) of compressed dataset' },
      { symbol: 'C_R', meaning: 'Compression Ratio (e.g. 10:1 or 10)' },
      { symbol: 'R_D', meaning: 'Relative Data Redundancy (percentage of redundant data removed)' },
    ],
    explanation: 'Defines how effectively redundant bits have been removed. If C_R = 1, R_D = 0 (no redundancy). If C_R = 4, R_D = 0.75 (75% of original data was redundant).',
    examTip: 'When C_R → ∞, R_D → 1 (100% redundancy). Negative redundancy means compressed file is larger than original.',
    exampleProblem: {
      question: 'An original 2 MB image is compressed to 400 KB. Calculate the Compression Ratio C_R and Relative Data Redundancy R_D.',
      given: 'n₁ = 2 MB = 2048 KB, n₂ = 400 KB.',
      solution: 'C_R = 2048 / 400 = 5.12 (or 5.12:1).\nR_D = 1 - (1 / 5.12) = 1 - 0.1953 = 0.8047 = 80.47%.',
      answer: 'C_R = 5.12:1, R_D = 80.47%',
    },
  },
  {
    id: 'f-shannon-entropy',
    unit: 5,
    unitTitle: 'Unit V: Image Compression',
    title: 'Shannon Information Entropy & Coding Efficiency',
    formula: 'H = - ∑_{k=0}^{L-1} p_k log₂(p_k),  L_{avg} = ∑_{k=0}^{L-1} l_k p_k,  η = H / L_{avg}',
    latex: 'H = -\\sum_{k=0}^{L-1} p_k \\log_2(p_k), \\quad L_{avg} = \\sum_{k=0}^{L-1} l_k p_k, \\quad \\eta = \\frac{H}{L_{avg}} \\times 100\\%',
    variables: [
      { symbol: 'H', meaning: 'Entropy in bits/symbol (theoretical minimum limit for lossless compression)' },
      { symbol: 'p_k', meaning: 'Probability of occurrence of symbol k' },
      { symbol: 'l_k', meaning: 'Code word length assigned to symbol k' },
      { symbol: 'L_avg', meaning: 'Average code word length in bits/symbol' },
      { symbol: 'η', meaning: 'Coding efficiency (closer to 100% is optimal)' },
    ],
    explanation: 'Shannon\'s Noiseless Source Coding Theorem states that no lossless code can encode symbols with an average length less than the source entropy H.',
    examTip: 'Use log₂(x) = ln(x) / ln(2) = log₁₀(x) / 0.30103 on standard calculators.',
    exampleProblem: {
      question: 'A source emits 4 symbols with probabilities: p(a)=0.5, p(b)=0.25, p(c)=0.125, p(d)=0.125. Find source entropy H.',
      given: 'p = [0.5, 0.25, 0.125, 0.125].',
      solution: 'H = - [ 0.5 log₂(0.5) + 0.25 log₂(0.25) + 0.125 log₂(0.125) + 0.125 log₂(0.125) ]\n= - [ 0.5(-1) + 0.25(-2) + 0.125(-3) + 0.125(-3) ]\n= - [ -0.5 - 0.5 - 0.375 - 0.375 ] = - [-1.75] = 1.75 bits/symbol.',
      answer: 'H = 1.75 bits/symbol',
    },
  },
  {
    id: 'f-psnr-mse',
    unit: 5,
    unitTitle: 'Unit V: Image Compression',
    title: 'Objective Fidelity: Mean Square Error (MSE) and PSNR',
    formula: 'MSE = (1/MN) ∑_{x=0}^{M-1} ∑_{y=0}^{N-1} [f(x,y) - f̂(x,y)]²,  PSNR = 10 log₁₀( (L-1)² / MSE ) dB',
    latex: '\\text{MSE} = \\frac{1}{MN} \\sum_{x=0}^{M-1} \\sum_{y=0}^{N-1} [f(x,y) - \\hat{f}(x,y)]^2, \\quad \\text{PSNR} = 10 \\log_{10}\\left( \\frac{(L-1)^2}{\\text{MSE}} \\right) \\text{ dB}',
    variables: [
      { symbol: 'f(x,y)', meaning: 'Original image pixel value' },
      { symbol: 'f̂(x,y)', meaning: 'Reconstructed / decompressed image pixel value' },
      { symbol: 'MSE', meaning: 'Mean Square Error between original and reconstructed' },
      { symbol: 'PSNR', meaning: 'Peak Signal-to-Noise Ratio in decibels (dB)' },
      { symbol: 'L-1', meaning: 'Maximum possible pixel value (e.g. 255 for 8-bit image)' },
    ],
    explanation: 'Standard objective mathematical measure of reconstructed image quality. Typical good reconstructed images have PSNR between 30 dB and 50 dB (higher is better).',
    examTip: 'For 8-bit images, (L-1)² = 255² = 65,025.',
    exampleProblem: {
      question: 'For an 8-bit image, the reconstructed image has MSE = 6.5025. Calculate the PSNR in dB.',
      given: 'L-1 = 255 → (255)² = 65,025. MSE = 6.5025.',
      solution: 'PSNR = 10 × log₁₀(65,025 / 6.5025) = 10 × log₁₀(10,000) = 10 × 4 = 40 dB.',
      answer: 'PSNR = 40.0 dB (High fidelity reconstruction)',
    },
  },
]
