export function FrameScene() {
  return (
    <figure className="rise rise-delay mx-auto w-full max-w-xl">
      <div className="rounded-[2rem] bg-forest-950 p-3.5 shadow-[0_40px_80px_-48px_rgba(12,31,26,0.85)] sm:p-4">
        <div className="rounded-[1.35rem] bg-[#d9d0c2] p-2.5 sm:p-3">
          <div className="relative aspect-[800/480] overflow-hidden rounded-md bg-[#efe4d4]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#f0e2cc_0%,#e4d0b0_34%,#c9b48a_46%,#8ea56d_47%,#6f8656_70%,#44523c_100%)]" />
            <div className="absolute left-[8%] top-[14%] h-[28%] w-[34%] rounded-sm bg-[#f7f1e6]/80 shadow-sm" />
            <div className="absolute left-[12%] top-[20%] h-[16%] w-[10%] bg-[#d7e7a4]/70" />
            <div className="absolute left-[24%] top-[20%] h-[16%] w-[12%] bg-[#8eafbf]/50" />
            <div className="absolute bottom-[8%] left-[16%] h-[38%] w-[4%] rounded-full bg-forest-950/80" />
            <div className="absolute bottom-[28%] left-[10%] h-[18%] w-[16%] rounded-full bg-[#243528]/55" />
            <div className="absolute right-[12%] top-[42%] h-[22%] w-[18%] rounded-t-full bg-[#f4efe4]/75" />
            <div className="absolute right-[18%] bottom-[12%] h-[16%] w-[8%] bg-forest-900/70" />
          </div>
        </div>
        <figcaption className="flex items-center justify-between px-3 py-3 text-[11px] uppercase tracking-[0.18em] text-lime-300">
          <span>Lumaire</span>
          <span>Simulated preview</span>
        </figcaption>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted">
        A software rendering of the frame. No panel is connected.
      </figcaption>
    </figure>
  );
}
