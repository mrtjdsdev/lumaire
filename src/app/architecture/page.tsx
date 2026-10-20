import type { Metadata } from "next";
import Link from "next/link";
import { HardwareVisualizer } from "@/components/hardware/hardware-visualizer";
import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hardware",
  description: "How Lumaire will talk to a physical ESP32-S3 e-paper controller.",
};

const steps = [
  { title: "Image", copy: "Choose an image and a placement. Fit, fill, and crop travel with the job." },
  { title: "Frame service", copy: "Resize, dither, and pack bytes for the panel’s native buffer." },
  { title: "ESP32-S3", copy: "Download the payload, verify it, and drive the panel over its bus." },
  { title: "Acknowledgement", copy: "The app says it arrived only after the controller agrees." },
];

const firmware = [
  { title: "Wi-Fi", copy: "Setup is separate from the demo pairing screen on this site." },
  { title: "Bus", copy: "SPI, or the board’s actual bus, to the e-paper controller." },
  { title: "Refresh", copy: "Full refresh is the baseline. Partial only if that panel supports it cleanly." },
  { title: "Sleep", copy: "Deep sleep between updates, with battery state reported on wake." },
  { title: "Reject", copy: "Refuse a payload whose size or checksum does not match." },
];

const today = [
  "Photographs and prepared frames live in IndexedDB through `mediaStore`.",
  "Display name, demo pairing, and refresh history live in localStorage.",
  "`deliverToActiveDisplay` calls only `refreshSimulatedDisplay`.",
  "`inspectEsp32Transport` always reports that no controller endpoint is configured.",
  "Every simulated result has `hardwareConfirmed: false`.",
];

export default function ArchitecturePage() {
  return (
    <article className="bg-[#090909] text-[#f4f4f0]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
        <Reveal as="header" className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
            <span className="mr-3 text-[#f4f4f0]">HW</span>
            Architecture
          </p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            <HoverText effect="explode">From this browser to a real frame.</HoverText>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#c8c8c2]">
            A physical Lumaire display is an ESP32-S3 on the back of an e-paper panel. The software boundary for that
            controller exists here. It is not wired to a device.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <HardwareVisualizer />
        </Reveal>

        <Reveal as="section" className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] lg:grid-cols-2">
          <div className="bg-[#101010] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">What works today</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#b7b7b1]">
              {today.map((item) => (
                <li key={item} className="border-l border-[#2a2a2a] pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0c0c0c] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">Image pipeline</h2>
            <p className="mt-4 text-sm leading-7 text-[#b7b7b1]">
              The simulator draws an 800 × 480 PNG, which matches a common 7.5 inch landscape panel. Before a real
              refresh, a server-side composer should turn placement into the panel’s native buffer: color or 4-bit gray,
              dithered for that panel, packed, and hashed. The device downloads the payload, checks the hash, refreshes,
              and posts an acknowledgement.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6a]">
              Dithering and waveform stay in the hardware path
            </p>
          </div>
        </Reveal>

        <Reveal as="section" className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">The path a photograph will take</p>
          <ol className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-[#101010] p-5 sm:p-6">
                <p className="font-mono text-[11px] text-[#9a9a94]">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#b7b7b1]">{step.copy}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[#101010] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">Replace the transport</h2>
            <p className="mt-4 text-sm leading-7 text-[#b7b7b1]">
              A future app should ask a small interface to deliver a prepared frame. Today that interface is the
              simulated transport in `src/lib/hardware/simulated-transport.ts`. The ESP32 module in
              `src/lib/hardware/esp32-transport.ts` is where a real endpoint belongs. `src/lib/hardware/gateway.ts` is
              the only switch between them.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#b7b7b1]">
              Photo storage is the same kind of boundary: `MediaStore` in `src/lib/photos/types.ts` can later use object
              storage instead of IndexedDB.
            </p>
          </div>
          <div className="bg-[#0c0c0c] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">Pairing, for real</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-[#b7b7b1]">
              <li>The ESP32-S3 boots, joins Wi-Fi, and shows a one-time code on the panel.</li>
              <li>The owner enters that code in an account they control. The demo code here is not that step.</li>
              <li>A backend binds the account to the device id and issues a device credential.</li>
              <li>The credential stays on the device, not in frontend code.</li>
              <li>The app shows online only after a heartbeat from that controller.</li>
            </ol>
          </div>
        </Reveal>

        <Reveal as="section" className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Firmware owns</p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] sm:grid-cols-2 lg:grid-cols-5">
            {firmware.map((item) => (
              <div key={item.title} className="bg-[#0c0c0c] px-5 py-5">
                <dt className="text-sm font-medium text-[#f4f4f0]">{item.title}</dt>
                <dd className="mt-2 text-sm leading-6 text-[#b7b7b1]">{item.copy}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal as="section" className="mt-8 rounded-2xl border border-[#2a2a2a] bg-[#101010] p-6 sm:p-8">
          <h2 className="text-xl font-medium tracking-[-0.03em]">A small API, when a backend exists</h2>
          <ul className="mt-4 space-y-2 font-mono text-[12px] leading-6 text-[#9a9a94]">
            <li>POST /api/pairings</li>
            <li>GET /api/devices/:id</li>
            <li>PUT /api/devices/:id/frame</li>
            <li>POST /api/devices/:id/acks</li>
          </ul>
          <p className="mt-4 text-sm leading-7 text-[#b7b7b1]">
            These routes are not implemented. No device secret, API key, or credential belongs in this frontend.
          </p>
        </Reveal>

        <Reveal as="section" className="mt-8 rounded-2xl border border-[#2a2a2a] bg-[#050505] p-6 sm:p-8">
          <h2 className="text-xl font-medium tracking-[-0.03em]">Before a panel can be connected</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#b7b7b1]">
            <li>Choose the e-paper module and confirm its resolution, bus, and refresh time.</li>
            <li>Build ESP32-S3 firmware that can fetch a payload, verify it, refresh, and acknowledge.</li>
            <li>Add an authenticated backend for accounts, pairing, storage, and the refresh queue.</li>
            <li>Move composition of the final buffer server-side, including dithering for that panel.</li>
            <li>Change the gateway so a hardware success is impossible without an acknowledgement.</li>
          </ul>
          <Link
            href="/"
            className={buttonClass(
              "secondary",
              "md",
              "mt-6 border-[#2a2a2a] bg-transparent text-[#f4f4f0] hover:bg-[#f4f4f0]/10",
            )}
          >
            Back home
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
