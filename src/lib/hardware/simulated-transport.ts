import { readDevice, recordSimulatedRefresh } from "@/lib/device/preferences";
import { mediaStore } from "@/lib/photos/repository";
import type { DeliveryRequest, DeliveryResult } from "@/lib/hardware/transport";

const SIMULATED_REFRESH_MS = 1100;

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function refreshSimulatedDisplay(request: DeliveryRequest): Promise<DeliveryResult> {
  await wait(SIMULATED_REFRESH_MS);
  await mediaStore.saveCurrentFrame(request.frame);
  const device = readDevice();
  const message =
    device.pairingStatus === "demo-paired"
      ? `Updated the simulated display “${device.displayName}”. No physical Lumaire display received this image.`
      : "Updated the simulated display. No physical Lumaire display received this image.";
  const completedAt = new Date().toISOString();
  recordSimulatedRefresh({
    photoId: request.photoId,
    photoName: request.photoName,
    mode: request.mode,
    tone: request.tone,
    signature: request.signature,
    summary: message,
  });
  return {
    hardwareConfirmed: false,
    channel: "simulated",
    completedAt,
    message,
  };
}
