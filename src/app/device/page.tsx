import type { Metadata } from "next";
import { DeviceSettings } from "@/components/device/device-settings";

export const metadata: Metadata = {
  title: "Device",
  description: "Name, demo pairing, simulated connection, and refresh history for this browser’s Lumaire display.",
};

export default function DevicePage() {
  return <DeviceSettings />;
}
