"use client";

import { useEffect, useState } from "react";
import { DEVICE_EVENT, readDevice, type DevicePreferences } from "@/lib/device/preferences";

export function useDevice() {
  const [device, setDevice] = useState<DevicePreferences | null>(null);

  useEffect(() => {
    const sync = () => setDevice(readDevice());
    sync();
    window.addEventListener(DEVICE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(DEVICE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return device;
}
