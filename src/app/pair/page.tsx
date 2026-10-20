import type { Metadata } from "next";
import { PairingPanel } from "@/components/device/pairing-panel";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Pair",
  description: "Pair a simulated Lumaire display with a one-time demo code stored in this browser.",
};

export default function PairPage() {
  return (
    <Reveal y={12}>
      <PairingPanel />
    </Reveal>
  );
}
