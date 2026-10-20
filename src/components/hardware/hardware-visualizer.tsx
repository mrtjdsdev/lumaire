"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

const HardwareParticleDisplay = dynamic(
  () => import("@/components/hardware/hardware-particle-display").then((mod) => mod.HardwareParticleDisplay),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050505]" aria-hidden="true" />,
  },
);

class VisualizerBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full min-h-[22rem] items-center justify-center bg-[#050505] px-6 text-center">
          <p className="max-w-sm font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">
            Particle visualizer unavailable on this device
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function HardwareVisualizer() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#050505] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a9a94]">Panel formation</p>
          <p className="mt-1 text-sm text-[#f4f4f0]">49,432 tetrahedrons · 296 × 167 sample grid</p>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[#6f6f6a] sm:block">
          Video Project → particle field
        </p>
      </div>
      <VisualizerBoundary>
        <div className="relative h-[min(68vh,34rem)] w-full sm:h-[min(72vh,38rem)]" aria-hidden="true">
          <HardwareParticleDisplay />
        </div>
      </VisualizerBoundary>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 border-t border-[#2a2a2a] bg-[#050505]/85 px-4 py-3 backdrop-blur-[2px] sm:px-5">
        <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-[#9a9a94]">
          A study, not a product render: every frame of a source video is downsampled to a 296 × 167 grid, and each point takes its color, size, and depth from a single pixel.
        </p>
      </div>
    </section>
  );
}
