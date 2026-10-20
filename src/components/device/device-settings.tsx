"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { cleanDisplayName, clearRefreshHistory, unpairDemoDevice, updateDevice } from "@/lib/device/preferences";
import { useDevice } from "@/lib/device/use-device";
import { formatWhen } from "@/lib/format";
import { inspectEsp32Transport } from "@/lib/hardware/esp32-transport";
import { mediaStore } from "@/lib/photos/repository";

const hardware = inspectEsp32Transport();

function modeLabel(mode: string) {
  if (mode === "fit") return "Fit";
  if (mode === "fill") return "Fill";
  if (mode === "crop") return "Crop";
  return mode;
}

export function DeviceSettings() {
  const device = useDevice();
  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const [nameMessage, setNameMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const name = nameDraft ?? device?.displayName ?? "";
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [frameError, setFrameError] = useState<string | null>(null);
  const [confirmUnpair, setConfirmUnpair] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    let committed = false;
    (async () => {
      try {
        const blob = await mediaStore.getCurrentFrame();
        if (cancelled) return;
        if (!blob) {
          setFrameUrl((current) => {
            if (current) URL.revokeObjectURL(current);
            return null;
          });
          return;
        }
        objectUrl = URL.createObjectURL(blob);
        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          return;
        }
        committed = true;
        const nextUrl = objectUrl;
        setFrameUrl((current) => {
          if (current && current !== nextUrl) URL.revokeObjectURL(current);
          return nextUrl;
        });
      } catch (caught) {
        if (!cancelled) {
          setFrameError(caught instanceof Error ? caught.message : "Could not open the last simulated frame.");
        }
      }
    })();
    return () => {
      cancelled = true;
      if (objectUrl && !committed) URL.revokeObjectURL(objectUrl);
    };
  }, [device?.lastRefreshAt]);

  if (!device) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm text-muted">Opening device settings…</p>
      </div>
    );
  }

  const paired = device.pairingStatus === "demo-paired";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Device</p>
      <h1 className="mt-3 text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">{device.displayName}</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Settings for the demo device in this browser. Nothing here talks to a physical frame.
      </p>

      <p className="mt-6 rounded-2xl border border-line bg-card/80 px-4 py-3 text-sm leading-6 text-muted">
        <span className="mr-2 inline-flex rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper">
          Demo
        </span>
        Pairing status and refresh history are stored locally. Connection stays simulated.
      </p>

      <section className="mt-8 rounded-2xl border border-line bg-card shadow-[0_10px_30px_rgba(17,17,17,0.04)] p-5 sm:p-6">
        <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Display name</h2>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            const cleaned = cleanDisplayName(name);
            if (!cleaned) {
              setNameError("Use a name between 1 and 40 characters.");
              setNameMessage(null);
              return;
            }
            try {
              updateDevice({ displayName: cleaned });
              setNameDraft(null);
              setNameError(null);
              setNameMessage("Name saved in this browser.");
            } catch (caught) {
              setNameMessage(null);
              setNameError(caught instanceof Error ? caught.message : "Could not save the name.");
            }
          }}
        >
          <label className="sr-only" htmlFor="display-name">
            Display name
          </label>
          <input
            id="display-name"
            value={name}
            onChange={(event) => {
              setNameDraft(event.target.value);
              setNameMessage(null);
              setNameError(null);
            }}
            maxLength={40}
            className="h-11 flex-1 rounded-full border border-line bg-paper px-4 text-sm outline-none transition-colors focus:border-ink"
          />
          <button type="submit" className={buttonClass("primary")}>
            Save name
          </button>
        </form>
        {nameMessage ? <p className="mt-3 text-sm text-muted">{nameMessage}</p> : null}
        {nameError ? (
          <p role="alert" className="mt-3 text-sm text-danger">
            {nameError}
          </p>
        ) : null}
      </section>

      <section className="mt-5 grid gap-5 sm:grid-cols-2">
        <article className="rounded-2xl border border-line bg-card shadow-[0_10px_30px_rgba(17,17,17,0.04)] p-5">
          <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Pairing</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{paired ? "Demo paired in this browser." : "Not paired."}</p>
          {paired && device.pairedAt ? <p className="mt-1 text-xs text-muted">Since {formatWhen(device.pairedAt)}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/pair" className={buttonClass("secondary", "sm")}>
              {paired ? "Pairing details" : "Pair demo device"}
            </Link>
            {paired && !confirmUnpair ? (
              <button type="button" className={buttonClass("ghost", "sm")} onClick={() => setConfirmUnpair(true)}>
                Unpair
              </button>
            ) : null}
          </div>
          {confirmUnpair ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-ink">Remove the demo pairing from this browser?</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={buttonClass("danger", "sm")}
                  onClick={() => {
                    unpairDemoDevice();
                    setConfirmUnpair(false);
                  }}
                >
                  Unpair
                </button>
                <button type="button" className={buttonClass("secondary", "sm")} onClick={() => setConfirmUnpair(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </article>

        <article className="rounded-2xl border border-line bg-card shadow-[0_10px_30px_rgba(17,17,17,0.04)] p-5">
          <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Connection</h2>
          <p className="mt-3 text-sm font-medium text-ink">Simulated</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            This browser can remember a simulated pairing. It will not read as connected to hardware.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">{hardware.message}</p>
        </article>
      </section>

      <section className="mt-5 rounded-2xl border border-line bg-card shadow-[0_10px_30px_rgba(17,17,17,0.04)] p-5 sm:p-6">
        <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Last simulated frame</h2>
        {frameError ? (
          <p role="alert" className="mt-4 text-sm text-danger">
            {frameError}
          </p>
        ) : frameUrl ? (
          // Local blob from the last simulated refresh.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={frameUrl} alt="Last image placed on the simulated display" className="mt-4 w-full rounded-xl bg-[#ecece8]" />
        ) : (
          <p className="mt-4 text-sm leading-6 text-muted">No simulated refresh yet.</p>
        )}
        {device.lastRefreshAt ? <p className="mt-3 text-xs text-muted">Last refresh {formatWhen(device.lastRefreshAt)}</p> : null}
      </section>

      <section className="mt-5 rounded-2xl border border-line bg-card shadow-[0_10px_30px_rgba(17,17,17,0.04)] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Refresh history</h2>
          {device.history.length && !confirmClear ? (
            <button type="button" className={buttonClass("ghost", "sm")} onClick={() => setConfirmClear(true)}>
              Clear history
            </button>
          ) : null}
        </div>
        {confirmClear ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <p className="text-sm">Clear the simulated refresh history?</p>
            <button
              type="button"
              className={buttonClass("danger", "sm")}
              onClick={() => {
                clearRefreshHistory();
                setConfirmClear(false);
              }}
            >
              Clear
            </button>
            <button type="button" className={buttonClass("secondary", "sm")} onClick={() => setConfirmClear(false)}>
              Cancel
            </button>
          </div>
        ) : null}
        {device.history.length ? (
          <ol className="mt-5 space-y-3">
            {device.history.map((entry) => (
              <li key={entry.id} className="rounded-2xl border border-line px-4 py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-ink">{entry.photoName}</p>
                  <p className="text-xs text-muted">{formatWhen(entry.at)}</p>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {modeLabel(entry.mode)} · {entry.tone} · Simulated
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">{entry.summary}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-sm leading-6 text-muted">No refreshes yet. A sent photograph will be listed here as a simulated refresh.</p>
        )}
      </section>

      <p className="mt-8 text-sm text-muted">
        <Link href="/architecture" className="nav-link font-medium text-ink">
          Read how a real ESP32-S3 controller will connect
        </Link>
      </p>
    </div>
  );
}
