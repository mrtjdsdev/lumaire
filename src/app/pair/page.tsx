import type { Metadata } from "next";
import { PairingPanel } from "@/components/device/pairing-panel";

export const metadata: Metadata = {
  title: "Pair",
  description: "Pair a simulated Lumaire display with a one-time demo code stored in this browser.",
};

export default function PairPage() {
  return <PairingPanel />;
}
