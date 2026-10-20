import type { Esp32TransportStatus } from "@/lib/hardware/transport";

/**
 * Placeholder for a future ESP32-S3 controller.
 * This function must not report a successful hardware refresh.
 * Wire a real endpoint here only when the device can acknowledge a frame.
 */
export function inspectEsp32Transport(): Esp32TransportStatus {
  return {
    configured: false,
    hardwareConfirmed: false,
    channel: "esp32",
    message: "No ESP32-S3 endpoint is configured. Lumaire will not report a physical refresh.",
  };
}
