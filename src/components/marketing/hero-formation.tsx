"use client";

import dynamic from "next/dynamic";
import { Component, useRef, type PointerEvent, type ReactNode } from "react";
import { wakeParticleSwarm, type SwarmPointer } from "@/components/marketing/swarm-pointer";

const ParticleSwarm = dynamic(
  () => import("@/components/marketing/particle-swarm").then((mod) => mod.ParticleSwarm),
  { ssr: false },
);

class SwarmBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <div className="absolute inset-0 bg-[#070707]" />;
    return this.props.children;
  }
}

export function HeroFormation({ children }: { children: ReactNode }) {
  const pointer = useRef<SwarmPointer>({ x: 0, y: 0, inside: false });

  function track(event: PointerEvent<HTMLElement>) {
    pointer.current.x = event.clientX;
    pointer.current.y = event.clientY;
    pointer.current.inside = true;
    wakeParticleSwarm();
  }

  function release() {
    pointer.current.inside = false;
    wakeParticleSwarm();
  }

  return (
    <section
      className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-[#1c1c1c] bg-[#070707] text-[#f4f4f0]"
      onPointerMove={track}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      <SwarmBoundary>
        <div className="absolute inset-0" aria-hidden="true">
          <ParticleSwarm pointer={pointer} />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(7,7,7,0.78)_0%,rgba(7,7,7,0.42)_46%,rgba(7,7,7,0.2)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,7,7,0.78)_0%,rgba(7,7,7,0.5)_28%,rgba(7,7,7,0.16)_58%,rgba(7,7,7,0)_100%)]"
          aria-hidden="true"
        />
      </SwarmBoundary>
      {children}
    </section>
  );
}
