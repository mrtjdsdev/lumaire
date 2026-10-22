import type { Metadata } from "next";
import Link from "next/link";
import { HardwareVisualizer } from "@/components/hardware/hardware-visualizer";
import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "The planned architecture behind Lumaire's e-paper displays — prepared frames, a simple microcontroller, and honest development status.",
};

const steps = [
  {
    title: "Image",
    copy: "You choose or compose the content — a photograph, a piece of art, or the information a room needs at a glance.",
  },
  {
    title: "Frame service",
    copy: "Software prepares the exact frame for the specific panel: resized, colors mapped to its pigments, dithered, and packed.",
  },
  {
    title: "Controller",
    copy: "The microcontroller wakes, downloads the finished frame, verifies it, and drives the panel. It never renders a web page.",
  },
  {
    title: "Acknowledgement",
    copy: "Only after the controller confirms the refresh does the system call the image displayed. No confirmation, no claim.",
  },
];

const firmware = [
  { title: "Wi-Fi", copy: "Join the home network, fetch prepared frames, and report state when awake." },
  { title: "Bus", copy: "Drive the e-paper controller over the panel's actual bus, with its actual timing." },
  { title: "Refresh", copy: "Full refresh is the baseline. Partial refresh only where a chosen panel supports it cleanly." },
  { title: "Sleep", copy: "Deep sleep between updates. Battery figures will be published when they are measured, not estimated." },
  { title: "Reject", copy: "Refuse any payload whose size or checksum does not match. A bad frame never reaches the panel." },
];

const standing = [
  "The product is in development. No Lumaire hardware exists yet that you can buy, and nothing on this website is connected to a device.",
  "Panel modules are being evaluated. Resolutions, dimensions, materials, and refresh figures will be published when a module is chosen — not before.",
  "Firmware, the delivery backend, and pairing are design work in progress. This page describes them as the plans they are.",
  "The waitlist is open, and it is how we learn which of the three intended sizes people want first.",
];

const tradeoffs = [
  {
    title: "Refresh takes seconds",
    copy: "That is the honest cost of a surface that holds an image for free. Lumaire is not for video, games, or anything that must move — it is for information that changes a few times a day.",
  },
  {
    title: "Simple compute, on purpose",
    copy: "A single-board computer could render web dashboards — and would need power, cooling, and updates to do it. A simple microcontroller receiving finished frames needs almost none of that.",
  },
  {
    title: "Power goes to change, not presence",
    copy: "The panel spends nothing to keep showing you the calendar. Energy is spent in brief moments: waking, receiving, refreshing. The rest of the time, the display is simply there.",
  },
  {
    title: "Pigment, not light",
    copy: "E-paper color will never be as saturated as a backlit screen, and we will not pretend otherwise. What it offers instead is a surface that looks at home under a lamp, in daylight, and in a dark hallway at night.",
  },
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
            <HoverText effect="explode">The hardware, honestly.</HoverText>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#c8c8c2]">
            A Lumaire display is a reflective e-paper panel driven by a simple microcontroller — an
            ESP32-S3-class controller is our current plan — receiving finished images wirelessly. This page
            describes the architecture we are building and, just as plainly, what does not exist yet.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <HardwareVisualizer />
        </Reveal>

        <Reveal as="nav" delay={0.05} className="mt-8 flex flex-wrap items-center gap-2" aria-label="On this page">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">On this page</span>
          {[
            { href: "#standing", label: "Where it stands" },
            { href: "#image-path", label: "Image path" },
            { href: "#delivery", label: "Delivery" },
            { href: "#tradeoffs", label: "Trade-offs" },
            { href: "#before", label: "What remains" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-[#2e2e2e] bg-[#111] px-3.5 py-1.5 text-sm text-[#d6d6d0] transition-colors hover:border-[#8a8a84] hover:text-[#f4f4f0]"
            >
              {item.label}
            </a>
          ))}
        </Reveal>

        <Reveal as="section" id="standing" className="mt-14 scroll-mt-28 grid gap-px overflow-hidden rounded-3xl border border-[#2a2a2a] bg-[#2a2a2a] lg:grid-cols-2">
          <div className="bg-[#101010] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">Where development stands</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#b7b7b1]">
              {standing.map((item) => (
                <li key={item} className="border-l border-[#2a2a2a] pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0c0c0c] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">The idea in one paragraph</h2>
            <p className="mt-4 text-sm leading-7 text-[#b7b7b1]">
              Conventional smart displays put a small computer behind glass and keep it awake so the picture
              stays on. We invert that. Software off the device turns whatever you choose — a photograph, a
              calendar, a dashboard — into the exact frame a specific e-paper panel can show. The display
              itself only has to receive that frame, put it up, and go back to sleep. The image stays because
              the surface holds it, not because anything keeps powering it.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6f6f6a]">
              Do the work once, upstream — not forever, on the wall
            </p>
          </div>
        </Reveal>

        <Reveal as="section" id="image-path" className="mt-8 scroll-mt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">The path an image will take</p>
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

        <Reveal as="section" id="delivery" className="mt-8 scroll-mt-28 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[#101010] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">Delivery, kept simple</h2>
            <p className="mt-4 text-sm leading-7 text-[#b7b7b1]">
              Because the frame arrives finished, the device never renders layouts, fonts, or live feeds. Its
              whole job is to fetch a prepared image, check that it arrived intact, refresh the panel, and
              confirm. Anything that fails the check is refused. That smallness is the point: it is what lets
              the controller be simple, inexpensive to run, and asleep almost all of the time.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#b7b7b1]">
              It also means image quality is decided once, upstream, where there is power and time to do the
              conversion carefully — resizing, mapping colors to the panel&rsquo;s pigments, and dithering for
              that specific surface.
            </p>
          </div>
          <div className="bg-[#0c0c0c] p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-[-0.03em]">Pairing and ownership, as planned</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-[#b7b7b1]">
              <li>The controller boots, joins Wi-Fi, and shows a one-time code on the panel itself.</li>
              <li>The owner enters that code in their own account — the display and the account are bound together.</li>
              <li>A backend issues a credential that lives on the device, never in a web page.</li>
              <li>The display is shown as online only after the controller itself checks in.</li>
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

        <Reveal as="section" id="tradeoffs" className="mt-8 scroll-mt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Trade-offs, stated plainly</p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] sm:grid-cols-2">
            {tradeoffs.map((item) => (
              <div key={item.title} className="bg-[#0c0c0c] px-5 py-5 sm:px-6">
                <dt className="text-sm font-medium text-[#f4f4f0]">{item.title}</dt>
                <dd className="mt-2 text-sm leading-6 text-[#b7b7b1]">{item.copy}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal as="section" id="before" className="mt-8 scroll-mt-28 rounded-3xl border border-[#2a2a2a] bg-[#050505] p-6 sm:p-8">
          <h2 className="text-xl font-medium tracking-[-0.03em]">Before anyone can hang one up</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#b7b7b1]">
            <li>Choose the e-paper modules and confirm — then publish — their resolutions, dimensions, and refresh behavior.</li>
            <li>Build the controller firmware: fetch, verify, refresh, acknowledge, sleep.</li>
            <li>Build the authenticated backend for accounts, pairing, storage, and delivery.</li>
            <li>Find the manufacturing partners who can build a frame people want in their homes, and put early units in real rooms.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#waitlist" className={buttonClass("primary", "md")}>
              Join the waitlist
            </Link>
            <Link
              href="/"
              className={buttonClass(
                "secondary",
                "md",
                "border-[#2a2a2a] bg-transparent text-[#f4f4f0] hover:bg-[#f4f4f0]/10",
              )}
            >
              Back home
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
