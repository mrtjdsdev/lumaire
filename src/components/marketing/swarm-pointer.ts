export type SwarmPointer = {
  x: number;
  y: number;
  inside: boolean;
};

let wake = () => {};

export function wakeParticleSwarm() {
  wake();
}

export function bindParticleSwarmWake(next: () => void) {
  wake = next;
}
