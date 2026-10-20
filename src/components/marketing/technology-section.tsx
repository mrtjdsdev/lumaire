const points = [
  {
    title: "It reflects light",
    copy: "An e-paper surface is read with the light already in the room, instead of shining light toward you.",
  },
  {
    title: "A still image can rest",
    copy: "Once an image is on the panel, e-paper can hold it without continuously illuminating the display.",
  },
  {
    title: "A physical panel is not connected",
    copy: "This site explains the display Lumaire is developing. It does not send an image to hardware.",
  },
];

const pipeline = [
  { step: "01", title: "Image", copy: "A placement is chosen. Fit, fill, and crop travel with the job." },
  { step: "02", title: "Frame service", copy: "Resize, dither, and pack bytes for the panel. The browser preview stops at an 800 × 480 PNG." },
  { step: "03", title: "ESP32-S3", copy: "Planned: download the payload, check the hash, and drive the panel over its bus. Not connected here." },
  { step: "04", title: "Acknowledgement", copy: "The interface can say the image is on a Lumaire display only after the controller agrees." },
];

const firmware = [
  { title: "Bus", copy: "Firmware would own SPI, or the board’s actual bus, to the e-paper controller." },
  { title: "Refresh", copy: "Full refresh is the baseline. Partial refresh only if that exact panel supports it cleanly." },
  { title: "Sleep", copy: "Between updates the controller is planned to sleep, then report state when it wakes. No battery life is claimed." },
  { title: "Reject", copy: "A payload whose size or checksum does not match should be refused." },
];

export function TechnologySection() {
  return (
    <section id="technology" className="scroll-mt-24 border-b border-[#242424] bg-[#090909] text-[#f4f4f0]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="reveal max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
            <span className="mr-3 text-[#f4f4f0]">02</span>
            Technology
          </p>
          <h2 className="mt-4 max-w-[18ch] text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            Engineered for a different kind of screen.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#c8c8c2]">
            E-paper is a reflective display. It differs from a conventional screen because it uses ambient light, and it can retain a static image without keeping the panel lit.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal bg-[#111] p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">How the surface is read</p>
            <svg viewBox="0 0 360 280" className="mt-6 h-auto w-full" role="img" aria-label="Diagram of ambient light reflecting from an e-paper surface">
              <rect x="40" y="168" width="280" height="18" fill="#f4f3ef" stroke="#d7d7d1" />
              <path d="M70 48 L150 168" fill="none" stroke="#f4f4f0" strokeWidth="1" />
              <path d="M150 168 L250 56" fill="none" stroke="#f4f4f0" strokeWidth="1" />
              <circle cx="70" cy="48" r="3" fill="#f4f4f0" />
              <circle cx="250" cy="56" r="3" fill="#f4f4f0" />
              <text x="48" y="36" fill="#c8c8c2" fontSize="11" fontFamily="ui-monospace, monospace">
                Ambient light
              </text>
              <text x="196" y="40" fill="#c8c8c2" fontSize="11" fontFamily="ui-monospace, monospace">
                To the eye
              </text>
              <text x="40" y="220" fill="#c8c8c2" fontSize="11" fontFamily="ui-monospace, monospace">
                Reflective surface
              </text>
              <g fill="#231F1D">
                <rect x="48" y="246" width="6" height="6" />
                <rect x="60" y="246" width="6" height="6" opacity="0.55" />
                <rect x="72" y="246" width="6" height="6" opacity="0.28" />
              </g>
            </svg>
          </div>
          <ol className="bg-[#101010]">
            {points.map((point, index) => (
              <li key={point.title} className="reveal border-b border-[#2a2a2a] p-6 last:border-b-0 sm:p-8">
                <p className="font-mono text-[11px] text-[#9a9a94]">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-medium tracking-[-0.03em]">{point.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-[#c8c8c2]">{point.copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] md:grid-cols-4">
          {pipeline.map((item) => (
            <article key={item.step} className="reveal bg-[#101010] p-5 sm:p-6">
              <p className="font-mono text-[11px] text-[#9a9a94]">{item.step}</p>
              <h3 className="mt-3 text-lg font-medium tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#b7b7b1]">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Planned on the controller</p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] sm:grid-cols-2">
            {firmware.map((item) => (
              <div key={item.title} className="bg-[#0c0c0c] px-5 py-5 sm:px-6">
                <dt className="text-sm font-medium text-[#f4f4f0]">{item.title}</dt>
                <dd className="mt-2 text-sm leading-6 text-[#b7b7b1]">{item.copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
