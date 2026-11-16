'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Sparkles, Layers, Sliders, Play, RotateCcw,
  Grid, BarChart2, Eye, Cpu, HelpCircle, ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DIPVisualizerStudio() {
  const [activeTab, setActiveTab] = useState<'convolution' | 'histogram' | 'sampling' | 'distance'>('convolution')

  // ─── 1. CONVOLUTION STATE ─────────────────────────────────────────
  const [convGrid, setConvGrid] = useState<number[][]>([
    [10, 10, 10, 80, 80],
    [10, 20, 20, 80, 80],
    [10, 20, 50, 80, 80],
    [10, 10, 20, 80, 80],
    [10, 10, 10, 80, 80],
  ])
  const [maskCenter, setMaskCenter] = useState<{ r: number; c: number }>({ r: 2, c: 2 })
  const [selectedKernel, setSelectedKernel] = useState<'box' | 'gaussian' | 'laplacian' | 'sobelX'>('box')

  const kernels = {
    box: {
      name: 'Box Average Blur (1/9)',
      weights: [
        [1 / 9, 1 / 9, 1 / 9],
        [1 / 9, 1 / 9, 1 / 9],
        [1 / 9, 1 / 9, 1 / 9],
      ],
      desc: 'Uniform smoothing filter. Dampens high-frequency noise by replacing center pixel with average of 3x3 neighborhood.',
    },
    gaussian: {
      name: 'Gaussian Weighted Blur (1/16)',
      weights: [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16],
      ],
      desc: 'Isotropic Gaussian kernel. Gives highest weight to center pixel, preventing excessive edge blurring.',
    },
    laplacian: {
      name: 'Laplacian 2nd Derivative Sharpening',
      weights: [
        [0, 1, 0],
        [1, -4, 1],
        [0, 1, 0],
      ],
      desc: 'Second-order isotropic derivative. Detects discontinuities in all directions with center negative weight.',
    },
    sobelX: {
      name: 'Sobel Horizontal Gradient (Gx)',
      weights: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
      ],
      desc: 'First-order differential operator for vertical edge detection with smoothing effect.',
    },
  }

  const currentKernel = kernels[selectedKernel]

  // Calculate convolution at current mask center
  const convCalculation = useMemo(() => {
    let sum = 0
    const terms: { w: number; p: number; prod: number }[] = []
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = maskCenter.r + dr
        const c = maskCenter.c + dc
        const w = currentKernel.weights[dr + 1][dc + 1]
        const p = convGrid[r]?.[c] ?? 0
        const prod = w * p
        sum += prod
        terms.push({ w, p, prod })
      }
    }
    return { sum: Math.round(sum), terms }
  }, [convGrid, maskCenter, currentKernel])

  // ─── 2. HISTOGRAM EQUALIZATION STATE ─────────────────────────────
  const [counts, setCounts] = useState<number[]>([790, 1023, 850, 656, 329, 245, 122, 81])
  const totalPixels = useMemo(() => counts.reduce((a, b) => a + b, 0), [counts])

  const histResults = useMemo(() => {
    let runningSum = 0
    const rows = counts.map((n, k) => {
      const p = n / totalPixels
      runningSum += p
      const cdf = runningSum
      const sk = Math.round(7 * cdf)
      return { k, n, p, cdf, sk }
    })

    const eqCounts = new Array(8).fill(0)
    rows.forEach((r) => {
      eqCounts[r.sk] += r.n
    })

    return { rows, eqCounts }
  }, [counts, totalPixels])

  // ─── 3. SAMPLING & STORAGE STATE ──────────────────────────────────
  const [resPreset, setResPreset] = useState<number>(512)
  const [bitDepth, setBitDepth] = useState<number>(8)

  const storageStats = useMemo(() => {
    const pixels = resPreset * resPreset
    const bits = pixels * bitDepth
    const bytes = bits / 8
    const kb = bytes / 1024
    const mb = kb / 1024
    const grayLevels = Math.pow(2, bitDepth)
    const time56k = bits / 56000
    const time10M = bits / 10e6
    return { pixels, bits, bytes, kb, mb, grayLevels, time56k, time10M }
  }, [resPreset, bitDepth])

  // ─── 4. PIXEL DISTANCE STATE ──────────────────────────────────────
  const [pointP, setPointP] = useState<{ x: number; y: number }>({ x: 1, y: 1 })
  const [pointQ, setPointQ] = useState<{ x: number; y: number }>({ x: 5, y: 5 })

  const distanceStats = useMemo(() => {
    const dx = Math.abs(pointP.x - pointQ.x)
    const dy = Math.abs(pointP.y - pointQ.y)
    const de = Math.sqrt(dx * dx + dy * dy)
    const d4 = dx + dy
    const d8 = Math.max(dx, dy)
    return { dx, dy, de, d4, d8 }
  }, [pointP, pointQ])

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/subjects" className="hover:text-foreground">Subjects</Link>
            <span>/</span>
            <Link href="/subjects/dip" className="hover:text-foreground">Digital Image Processing</Link>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">Interactive Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                DIP Interactive Studio & Visualizers
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Explore real-time 2D spatial convolution, histogram equalization, sampling bitrates & distance metrics
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/subjects/dip/formulas"
            className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-2 transition-all shadow-sm"
          >
            ∑ Formula Sheet
          </Link>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-card border border-border">
        <button
          onClick={() => setActiveTab('convolution')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'convolution'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
          }`}
        >
          <Grid className="w-4 h-4" />
          1. 2D Spatial Convolution & Filters
        </button>
        <button
          onClick={() => setActiveTab('histogram')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'histogram'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          2. Histogram Equalization Simulator
        </button>
        <button
          onClick={() => setActiveTab('sampling')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'sampling'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
          }`}
        >
          <Cpu className="w-4 h-4" />
          3. Sampling & Memory Calculator
        </button>
        <button
          onClick={() => setActiveTab('distance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'distance'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
          }`}
        >
          <Sliders className="w-4 h-4" />
          4. Pixel Distance Metrics (De, D4, D8)
        </button>
      </div>

      {/* ─── TAB 1: 2D CONVOLUTION VISUALIZER ─────────────────────── */}
      {activeTab === 'convolution' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Interactive Simulator
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  2D Spatial Convolution & Kernel Mask Sliding
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click on any internal pixel of the 5x5 image grid to position the 3x3 filter mask and watch the real-time dot product!
                </p>
              </div>

              {/* Kernel Selector */}
              <div className="flex flex-wrap gap-1.5">
                {(['box', 'gaussian', 'laplacian', 'sobelX'] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setSelectedKernel(k)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedKernel === k
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                        : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    {k === 'box' && 'Box Blur 1/9'}
                    {k === 'gaussian' && 'Gaussian 1/16'}
                    {k === 'laplacian' && 'Laplacian'}
                    {k === 'sobelX' && 'Sobel X'}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic bg-secondary/40 p-3 rounded-xl border border-border/60">
              💡 <span className="font-semibold text-foreground">{currentKernel.name}:</span> {currentKernel.desc}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Left: Interactive 5x5 Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Input Image Matrix (5×5)
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Mask Center: ({maskCenter.r}, {maskCenter.c})
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto p-3 bg-black/40 rounded-2xl border border-border/80">
                  {convGrid.map((row, r) =>
                    row.map((val, c) => {
                      const isCenter = r === maskCenter.r && c === maskCenter.c
                      const isInsideMask =
                        Math.abs(r - maskCenter.r) <= 1 && Math.abs(c - maskCenter.c) <= 1
                      const isBorder = r === 0 || r === 4 || c === 0 || c === 4

                      return (
                        <button
                          key={`${r}-${c}`}
                          disabled={isBorder}
                          onClick={() => setMaskCenter({ r, c })}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-mono font-bold transition-all relative ${
                            isCenter
                              ? 'bg-cyan-500 text-black scale-105 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-300'
                              : isInsideMask
                              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40'
                              : isBorder
                              ? 'bg-secondary/30 text-muted-foreground/50 border border-border/40 cursor-not-allowed'
                              : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border'
                          }`}
                        >
                          <span className="text-xs">{val}</span>
                          <span className="text-[9px] opacity-60">({r},{c})</span>
                        </button>
                      )
                    })
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground text-center">
                  Outer border pixels cannot center a 3×3 mask without padding.
                </p>
              </div>

              {/* Right: Live Mathematical Computation */}
              <div className="space-y-4 bg-secondary/30 rounded-2xl p-5 border border-border/80">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                  Live Convolution Calculation:
                </span>

                <div className="bg-background/90 rounded-xl p-3.5 border border-border/60 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Sum of products: <span className="font-mono text-cyan-300 font-bold">g(x,y) = ∑∑ w(s,t) · f(x+s, y+t)</span>
                  </p>
                  <div className="max-h-44 overflow-y-auto space-y-1 text-[11px] font-mono pr-2">
                    {convCalculation.terms.map((t, idx) => (
                      <div key={idx} className="flex justify-between py-0.5 border-b border-border/30">
                        <span className="text-muted-foreground">
                          Weight ({t.w.toFixed(2)}) × Pixel ({t.p})
                        </span>
                        <span className="text-emerald-400 font-bold">= {t.prod.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                      Output Convolved Value:
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Target cell g({maskCenter.r}, {maskCenter.c})
                    </span>
                  </div>
                  <span className="text-2xl font-mono font-extrabold text-foreground bg-background px-4 py-1.5 rounded-xl border border-cyan-500/40">
                    {convCalculation.sum}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: HISTOGRAM EQUALIZATION SIMULATOR ───────────────── */}
      {activeTab === 'histogram' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <div className="border-b border-border/80 pb-4">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Interactive Simulator
              </span>
              <h3 className="text-xl font-bold text-foreground">
                3-Bit Histogram Equalization Live Engine
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Adjust input pixel frequencies across levels 0–7 and watch the cumulative distribution function (CDF) equalize contrast!
              </p>
            </div>

            {/* Input Sliders */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-secondary/20 p-4 rounded-2xl border border-border/60">
              {counts.map((cnt, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono font-bold text-cyan-400">Level r_{i}</span>
                    <span className="font-mono text-muted-foreground">{cnt} px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1500"
                    step="10"
                    value={cnt}
                    onChange={(e) => {
                      const newCounts = [...counts]
                      newCounts[i] = parseInt(e.target.value) || 0
                      setCounts(newCounts)
                    }}
                    className="w-full accent-cyan-400"
                  />
                </div>
              ))}
            </div>

            {/* Side-by-Side Histograms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Original Histogram */}
              <div className="bg-black/30 rounded-2xl p-4 border border-border/80 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-foreground">Input Histogram (Raw)</span>
                  <span className="text-muted-foreground font-mono">Total: {totalPixels} px</span>
                </div>
                <div className="h-44 flex items-end gap-2 pt-4 px-2 border-b border-border/60">
                  {counts.map((n, k) => {
                    const maxCount = Math.max(...counts, 1)
                    const heightPct = (n / maxCount) * 100

                    return (
                      <div key={k} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="w-full bg-blue-500/60 rounded-t group-hover:bg-blue-400 transition-all relative" style={{ height: `${heightPct}%` }}>
                          <span className="hidden group-hover:block absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-black px-1 rounded text-white">
                            {n}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">r{k}</span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[11px] text-muted-foreground text-center">Concentrated / Low contrast</p>
              </div>

              {/* Equalized Histogram */}
              <div className="bg-black/30 rounded-2xl p-4 border border-cyan-500/30 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-cyan-300">Equalized Histogram (Output)</span>
                  <span className="text-cyan-400 font-mono">Stretched Range</span>
                </div>
                <div className="h-44 flex items-end gap-2 pt-4 px-2 border-b border-border/60">
                  {histResults.eqCounts.map((n, s) => {
                    const maxCount = Math.max(...histResults.eqCounts, 1)
                    const heightPct = (n / maxCount) * 100

                    return (
                      <div key={s} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="w-full bg-cyan-400 rounded-t group-hover:bg-cyan-300 transition-all relative shadow-sm" style={{ height: `${heightPct}%` }}>
                          <span className="hidden group-hover:block absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-black px-1 rounded text-white">
                            {n}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">s{s}</span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[11px] text-cyan-400/90 text-center">Spanned across all 8 dynamic levels</p>
              </div>
            </div>

            {/* Generated Transformation Table */}
            <div className="overflow-x-auto border border-border/80 rounded-xl">
              <table className="w-full text-xs font-mono">
                <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-3 py-2 text-left">Level (k)</th>
                    <th className="px-3 py-2 text-left">Input r_k</th>
                    <th className="px-3 py-2 text-left">Pixel Count (n_k)</th>
                    <th className="px-3 py-2 text-left">Probability p(r_k)</th>
                    <th className="px-3 py-2 text-left">CDF_k</th>
                    <th className="px-3 py-2 text-left">7 × CDF</th>
                    <th className="px-3 py-2 text-left text-cyan-400">Equalized s_k</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {histResults.rows.map((r) => (
                    <tr key={r.k} className="hover:bg-secondary/30">
                      <td className="px-3 py-2 font-bold">{r.k}</td>
                      <td className="px-3 py-2">r_{r.k}</td>
                      <td className="px-3 py-2 text-foreground font-semibold">{r.n}</td>
                      <td className="px-3 py-2">{r.p.toFixed(4)}</td>
                      <td className="px-3 py-2">{r.cdf.toFixed(4)}</td>
                      <td className="px-3 py-2">{(7 * r.cdf).toFixed(2)}</td>
                      <td className="px-3 py-2 font-bold text-cyan-400 bg-cyan-500/10">s_{r.sk} ({r.sk})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: SAMPLING & STORAGE CALCULATOR ──────────────────── */}
      {activeTab === 'sampling' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="border-b border-border/80 pb-4">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Interactive Tool
              </span>
              <h3 className="text-xl font-bold text-foreground">
                Image Sampling, Bit Depth & Storage Bandwidth Calculator
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Simulate raster matrix scaling, uncompressed byte footprints, and telecommunication download times
              </p>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-secondary/30 p-5 rounded-2xl border border-border/80">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-foreground">Spatial Resolution (M × N):</span>
                  <span className="font-mono text-cyan-400 font-bold">{resPreset} × {resPreset} pixels</span>
                </div>
                <input
                  type="range"
                  min="64"
                  max="4096"
                  step="64"
                  value={resPreset}
                  onChange={(e) => setResPreset(parseInt(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>64 (Thumbnail)</span>
                  <span>512 (Standard)</span>
                  <span>1024 (HD)</span>
                  <span>4096 (4K)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-foreground">Intensity Bit Depth (k):</span>
                  <span className="font-mono text-cyan-400 font-bold">{bitDepth} bpp ({storageStats.grayLevels} gray levels)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={bitDepth}
                  onChange={(e) => setBitDepth(parseInt(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>1 (Binary)</span>
                  <span>8 (Grayscale)</span>
                  <span>16 (Medical)</span>
                  <span>24 (True Color RGB)</span>
                </div>
              </div>
            </div>

            {/* Real-time Calculation Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-background border border-border">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Total Pixels (MN)</p>
                <p className="text-lg font-mono font-bold text-foreground mt-1">
                  {storageStats.pixels.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{resPreset} rows × {resPreset} cols</p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Discrete Levels (L)</p>
                <p className="text-lg font-mono font-bold text-cyan-400 mt-1">
                  {storageStats.grayLevels.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">2^{bitDepth} shades</p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">File Size in KB</p>
                <p className="text-lg font-mono font-bold text-emerald-400 mt-1">
                  {storageStats.kb >= 1024 ? `${storageStats.mb.toFixed(2)} MB` : `${storageStats.kb.toFixed(1)} KB`}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{storageStats.bytes.toLocaleString()} Bytes</p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Total Raw Bits</p>
                <p className="text-lg font-mono font-bold text-purple-400 mt-1">
                  {(storageStats.bits / 1e6).toFixed(2)} Mbits
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{storageStats.bits.toLocaleString()} bits</p>
              </div>
            </div>

            {/* Transmission Timings */}
            <div className="bg-secondary/30 rounded-xl p-4 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <p className="text-xs font-bold text-foreground">Estimated Uncompressed Transmission Times:</p>
                <p className="text-[11px] text-muted-foreground">Based on raw uncompressed bitstream over standard network mediums</p>
              </div>
              <div className="flex gap-4 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-background border border-border">
                  <span className="text-muted-foreground mr-1.5">56 kbps:</span>
                  <span className="text-amber-400 font-bold">{storageStats.time56k.toFixed(1)}s</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-background border border-border">
                  <span className="text-muted-foreground mr-1.5">100 Mbps:</span>
                  <span className="text-emerald-400 font-bold">{(storageStats.time10M * 1000).toFixed(1)}ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: PIXEL DISTANCE METRICS ──────────────────────────── */}
      {activeTab === 'distance' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="border-b border-border/80 pb-4">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Interactive Grid
              </span>
              <h3 className="text-xl font-bold text-foreground">
                Pixel Distance Metrics (Euclidean, City-Block D4, Chessboard D8)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click any cell on the 7×7 coordinate grid to set Point P (cyan) and Point Q (emerald) and observe geometric distances!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 7x7 Grid */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-cyan-400">Point P: ({pointP.x}, {pointP.y})</span>
                  <span className="font-bold text-emerald-400">Point Q: ({pointQ.x}, {pointQ.y})</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 p-3 bg-black/40 rounded-2xl border border-border/80 max-w-sm mx-auto">
                  {Array.from({ length: 7 }).map((_, r) =>
                    Array.from({ length: 7 }).map((_, c) => {
                      const isP = pointP.x === c && pointP.y === r
                      const isQ = pointQ.x === c && pointQ.y === r

                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => {
                            if (!isP) {
                              setPointQ({ x: c, y: r })
                            }
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault()
                            setPointP({ x: c, y: r })
                          }}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                            isP
                              ? 'bg-cyan-500 text-black shadow-md ring-2 ring-cyan-300 scale-105'
                              : isQ
                              ? 'bg-emerald-500 text-black shadow-md ring-2 ring-emerald-300 scale-105'
                              : 'bg-secondary/40 text-muted-foreground/60 hover:bg-secondary hover:text-foreground border border-border/40'
                          }`}
                        >
                          {isP ? 'P' : isQ ? 'Q' : ''}
                        </button>
                      )
                    })
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground text-center">
                  Left-click to move Point Q; Right-click to move Point P.
                </p>
              </div>

              {/* Distances Output */}
              <div className="space-y-4 bg-secondary/30 rounded-2xl p-5 border border-border/80">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">
                  Computed Distance Comparisons:
                </span>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-background/90 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">Euclidean Distance (De)</p>
                      <p className="text-[10px] font-mono text-muted-foreground">√((Δx)² + (Δy)²)</p>
                    </div>
                    <span className="text-lg font-mono font-bold text-cyan-400">
                      {distanceStats.de.toFixed(3)}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-background/90 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">City-Block Distance (D4)</p>
                      <p className="text-[10px] font-mono text-muted-foreground">|Δx| + |Δy| (Manhattan)</p>
                    </div>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      {distanceStats.d4}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-background/90 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">Chessboard Distance (D8)</p>
                      <p className="text-[10px] font-mono text-muted-foreground">max(|Δx|, |Δy|)</p>
                    </div>
                    <span className="text-lg font-mono font-bold text-purple-400">
                      {distanceStats.d8}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs">
                  <p className="font-bold text-cyan-300">
                    Fundamental Distance Inequality:
                  </p>
                  <p className="font-mono text-foreground mt-1">
                    D8 ({distanceStats.d8}) ≤ De ({distanceStats.de.toFixed(2)}) ≤ D4 ({distanceStats.d4})
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Relation is always mathematically guaranteed for any discrete grid coordinates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
