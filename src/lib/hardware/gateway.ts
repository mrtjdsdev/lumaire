import { inspectEsp32Transport } from "@/lib/hardware/esp32-transport";
import { refreshSimulatedDisplay } from "@/lib/hardware/simulated-transport";
import type { DeliveryRequest, DeliveryResult } from "@/lib/hardware/transport";

/**
 * Active delivery stays on the simulated transport.
 * inspectEsp32Transport() is read so the unused hardware path stays explicit.
 * If a controller is configured later, send through that transport and return
 * hardwareConfirmed: true only after the device acknowledgement arrives.
 */
export async function deliverToActiveDisplay(request: DeliveryRequest): Promise<DeliveryResult> {
  const hardware = inspectEsp32Transport();
  if (hardware.configured) {
    throw new Error("ESP32-S3 transport is marked configured, but sending is not implemented.");
  }
  return refreshSimulatedDisplay(request);
}
