import type { CompositionMode, PaperTone } from "@/lib/display/geometry";

export type DeliveryRequest = {
  frame: Blob;
  photoId: string;
  photoName: string;
  mode: CompositionMode;
  tone: PaperTone;
  signature: string;
};

/**
 * hardwareConfirmed stays false until a physical controller acknowledges the frame.
 * The simulated channel is allowed to succeed without that acknowledgement.
 */
export type DeliveryResult = {
  hardwareConfirmed: false;
  channel: "simulated";
  completedAt: string;
  message: string;
};

export type Esp32TransportStatus = {
  configured: boolean;
  hardwareConfirmed: false;
  channel: "esp32";
  message: string;
};
