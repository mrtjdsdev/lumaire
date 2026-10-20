import type { CompositionMode, PaperTone } from "@/lib/display/geometry";

export type PairingStatus = "unpaired" | "demo-paired";

export type RefreshRecord = {
  id: string;
  at: string;
  photoId: string;
  photoName: string;
  mode: CompositionMode;
  tone: PaperTone;
  outcome: "simulated";
  summary: string;
};

export type DevicePreferences = {
  version: 1;
  displayName: string;
  pairingStatus: PairingStatus;
  pairingCode: string | null;
  pairingCodeExpiresAt: string | null;
  pairedAt: string | null;
  lastRefreshAt: string | null;
  lastSent: { photoId: string; signature: string } | null;
  history: RefreshRecord[];
};

const KEY = "elink.device.v1";
export const DEVICE_EVENT = "elink:device";
const HISTORY_LIMIT = 24;
const CODE_TTL_MS = 10 * 60 * 1000;

export function defaultDevice(): DevicePreferences {
  return {
    version: 1,
    displayName: "Living room",
    pairingStatus: "unpaired",
    pairingCode: null,
    pairingCodeExpiresAt: null,
    pairedAt: null,
    lastRefreshAt: null,
    lastSent: null,
    history: [],
  };
}

function isRecord(value: unknown): value is Partial<DevicePreferences> {
  return Boolean(value) && typeof value === "object";
}

export function readDevice(): DevicePreferences {
  const defaults = defaultDevice();
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return defaults;
    const displayName =
      typeof parsed.displayName === "string" ? cleanDisplayName(parsed.displayName) ?? defaults.displayName : defaults.displayName;
    const pairingCode = typeof parsed.pairingCode === "string" && /^\d{6}$/.test(parsed.pairingCode) ? parsed.pairingCode : null;
    return {
      ...defaults,
      displayName,
      pairingStatus: parsed.pairingStatus === "demo-paired" ? "demo-paired" : "unpaired",
      pairingCode,
      pairingCodeExpiresAt: typeof parsed.pairingCodeExpiresAt === "string" ? parsed.pairingCodeExpiresAt : null,
      pairedAt: typeof parsed.pairedAt === "string" ? parsed.pairedAt : null,
      lastRefreshAt: typeof parsed.lastRefreshAt === "string" ? parsed.lastRefreshAt : null,
      history: Array.isArray(parsed.history) ? parsed.history.filter(isRefreshRecord).slice(0, HISTORY_LIMIT) : [],
      lastSent:
        parsed.lastSent &&
        typeof parsed.lastSent === "object" &&
        typeof parsed.lastSent.photoId === "string" &&
        typeof parsed.lastSent.signature === "string"
          ? { photoId: parsed.lastSent.photoId, signature: parsed.lastSent.signature }
          : null,
    };
  } catch {
    return defaults;
  }
}

function isRefreshRecord(value: unknown): value is RefreshRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<RefreshRecord>;
  return (
    typeof record.id === "string" &&
    typeof record.at === "string" &&
    typeof record.photoName === "string" &&
    record.outcome === "simulated"
  );
}

export function writeDevice(next: DevicePreferences) {
  if (typeof window === "undefined") return next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    throw new Error("This browser could not save device settings.");
  }
  window.dispatchEvent(new Event(DEVICE_EVENT));
  return next;
}

export function updateDevice(
  patch: Partial<DevicePreferences> | ((current: DevicePreferences) => DevicePreferences),
) {
  const current = readDevice();
  const next = typeof patch === "function" ? patch(current) : { ...current, ...patch, version: 1 as const };
  return writeDevice(next);
}

export function cleanDisplayName(value: string) {
  const name = value.replace(/[\u0000-\u001F]/g, "").trim().replace(/\s+/g, " ");
  if (name.length < 1 || name.length > 40) return null;
  return name;
}

export function createPairingCode() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return (bytes[0] % 1_000_000).toString().padStart(6, "0");
}

export function issueDemoPairingCode() {
  const pairingCode = createPairingCode();
  const pairingCodeExpiresAt = new Date(Date.now() + CODE_TTL_MS).toISOString();
  return updateDevice({
    pairingStatus: "unpaired",
    pairingCode,
    pairingCodeExpiresAt,
    pairedAt: null,
  });
}

export function pairWithDemoCode(entered: string) {
  const device = readDevice();
  const code = entered.replace(/\D/g, "");
  if (!device.pairingCode || !device.pairingCodeExpiresAt) {
    return { ok: false as const, message: "Generate a demo code on the simulated device first." };
  }
  if (new Date(device.pairingCodeExpiresAt).getTime() < Date.now()) {
    return { ok: false as const, message: "That demo code has expired. Generate another one." };
  }
  if (code !== device.pairingCode) {
    return { ok: false as const, message: "That code does not match the simulated device." };
  }
  const next = updateDevice({
    pairingStatus: "demo-paired",
    pairingCode: null,
    pairingCodeExpiresAt: null,
    pairedAt: new Date().toISOString(),
  });
  return { ok: true as const, device: next };
}

export function unpairDemoDevice() {
  return updateDevice({
    pairingStatus: "unpaired",
    pairingCode: null,
    pairingCodeExpiresAt: null,
    pairedAt: null,
  });
}

export function clearRefreshHistory() {
  return updateDevice({ history: [] });
}

export function recordSimulatedRefresh(input: {
  photoId: string;
  photoName: string;
  mode: CompositionMode;
  tone: PaperTone;
  signature: string;
  summary: string;
}) {
  const at = new Date().toISOString();
  return updateDevice((current) => ({
    ...current,
    lastRefreshAt: at,
    lastSent: { photoId: input.photoId, signature: input.signature },
    history: [
      {
        id: crypto.randomUUID(),
        at,
        photoId: input.photoId,
        photoName: input.photoName,
        mode: input.mode,
        tone: input.tone,
        outcome: "simulated" as const,
        summary: input.summary,
      },
      ...current.history,
    ].slice(0, HISTORY_LIMIT),
  }));
}
