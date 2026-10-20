"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { issueDemoPairingCode, pairWithDemoCode, unpairDemoDevice } from "@/lib/device/preferences";
import { useDevice } from "@/lib/device/use-device";
import { formatPairingCode, formatWhen } from "@/lib/format";

export function PairingPanel() {
  const device = useDevice();
  const [entered, setEntered] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!device) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-sm text-muted">Opening pairing…</p>
      </div>
    );
  }

  const paired = device.pairingStatus === "demo-paired";
  const codeReady = Boolean(device.pairingCode && device.pairingCodeExpiresAt);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Pair</p>
      <h1 className="mt-3 text-4xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">Pair a display</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        On a finished Lumaire display, the frame shows a one-time code and this app claims it. Today both sides live in this
        browser.
      </p>

      <p className="mt-6 rounded-2xl border border-line bg-card/80 px-4 py-3 text-sm leading-6 text-muted">
        <span className="mr-2 inline-flex rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper">
          Demo
        </span>
        This pairing does not register a physical device, create an account, or leave this browser. It is not a
        security check.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-[#0e0e0e] shadow-[0_20px_50px_rgba(17,17,17,0.18)] p-5 text-paper sm:p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-lime-300">Simulated device</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em]">{device.displayName}</h2>
          <div className="mt-6 rounded-xl bg-[#f5f5f3] px-4 py-8 text-center text-ink">
            {paired ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Demo paired</p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.02em]">Ready for previews</p>
              </>
            ) : codeReady ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">One-time code</p>
                <p className="mt-3 font-mono text-5xl tracking-[0.18em]">{formatPairingCode(device.pairingCode ?? "")}</p>
                <p className="mt-3 text-xs text-forest-800">
                  Valid until {device.pairingCodeExpiresAt ? formatWhen(device.pairingCodeExpiresAt) : "—"}
                </p>
              </>
            ) : (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Waiting</p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.02em]">No code yet</p>
              </>
            )}
          </div>
          <p className="mt-4 text-sm leading-6 text-paper/70">
            A real frame would show this code on the e-paper panel during setup. Generating a new code replaces the
            previous one and clears a demo pairing.
          </p>
          <button
            type="button"
            className={buttonClass("secondary", "md", "mt-5")}
            onClick={() => {
              try {
                issueDemoPairingCode();
                setEntered("");
                setError(null);
                setMessage("A new demo code is showing on the simulated device.");
              } catch (caught) {
                setMessage(null);
                setError(caught instanceof Error ? caught.message : "Could not create a demo code.");
              }
            }}
          >
            {codeReady ? "Generate another code" : "Show a demo code"}
          </button>
        </section>

        <section className="rounded-2xl border border-line bg-card shadow-[0_10px_30px_rgba(17,17,17,0.04)] p-5 sm:p-6">
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-ink">Enter the code</h2>
          {paired ? (
            <div className="mt-4">
              <p className="text-sm leading-6 text-muted">
                {device.displayName} is demo paired
                {device.pairedAt ? ` as of ${formatWhen(device.pairedAt)}` : ""}. This pairing stays in this browser
                and does not connect to hardware.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={buttonClass("secondary")}
                  onClick={() => {
                    unpairDemoDevice();
                    setMessage("Demo pairing removed from this browser.");
                    setError(null);
                  }}
                >
                  Unpair
                </button>
              </div>
            </div>
          ) : (
            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const result = pairWithDemoCode(entered);
                if (!result.ok) {
                  setMessage(null);
                  setError(result.message);
                  return;
                }
                setError(null);
                setMessage(`Demo paired “${result.device.displayName}”. This still is not a physical Lumaire display.`);
                setEntered("");
              }}
            >
              <label className="block text-sm font-medium text-ink" htmlFor="pair-code">
                Six-digit code
                <input
                  id="pair-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={formatPairingCode(entered)}
                  onChange={(event) => {
                    setEntered(event.target.value.replace(/\D/g, "").slice(0, 6));
                    setError(null);
                    setMessage(null);
                  }}
                  placeholder="000 000"
                  className="mt-2 h-14 w-full rounded-2xl border border-line bg-paper px-4 text-center font-mono text-3xl tracking-[0.2em] outline-none transition-colors focus:border-ink"
                />
              </label>
              <button type="submit" className={buttonClass("primary", "lg", "w-full")} disabled={entered.length !== 6}>
                Pair demo device
              </button>
            </form>
          )}
          {message ? <p className="mt-4 text-sm leading-6 text-muted">{message}</p> : null}
          {error ? (
            <p role="alert" className="mt-4 rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger">
              {error}
            </p>
          ) : null}
          <p className="mt-6 text-sm text-muted">
            <Link href="/device" className="nav-link font-medium text-ink">
              Device settings
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
