"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";

const models = [
  { id: 'Wall Hub (10.0")', detail: "10.0 inch · black and white · dashboards & room control" },
  { id: 'Kitchen Display (7.5")', detail: "7.5 inch · tri-color · calendars & lists" },
  { id: 'Gallery Frame (13.3")', detail: "13.3 inch · full color · art & photography" },
] as const;

type Status = { type: "success" | "error"; text: string } | null;

export function WaitlistSection() {
  const baseId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  function toggle(id: string) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    setStatus(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const nextNameError = trimmedName ? null : "Enter your name.";
    const nextEmailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) ? null : "Enter a valid email address.";
    setNameError(nextNameError);
    setEmailError(nextEmailError);
    setStatus(null);
    if (nextNameError || nextEmailError) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, selectedProducts: selected }),
      });
      let payload: { message?: string; error?: string } = {};
      try {
        payload = (await response.json()) as { message?: string; error?: string };
      } catch {
        payload = {};
      }
      if (!response.ok) {
        setStatus({ type: "error", text: payload.error || "Could not join the waitlist. Please try again." });
        return;
      }
      setStatus({
        type: "success",
        text: payload.message || "The waitlist accepted this submission.",
      });
      setName("");
      setEmail("");
      setSelected([]);
    } catch {
      setStatus({
        type: "error",
        text: "The waitlist service is unreachable. Email founders@lumaire.io.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-24 bg-[#f7f7f4] text-[#151511]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#77776e]">
            <span className="mr-3 text-[#151511]">04</span>
            Waitlist
          </p>
          <h2 className="mt-4 max-w-[12ch] text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <HoverText effect="wave">{"Be part of what's next."}</HoverText>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-[#45453f]">
            Lumaire is in development. Join the waitlist for progress updates, launch news, and early access
            opportunities as displays become ready.
          </p>
          <p className="mt-6 max-w-md text-sm leading-6 text-[#55554f]">
            Choosing a model records interest only. It is not an order, no payment is taken, and final
            specifications will be shared as they are confirmed.
          </p>
          <p className="accent-serif mt-8 max-w-md text-[1.35rem] leading-snug text-[#1c1c18]">
            The first step toward a calmer home is a wall that doesn&rsquo;t shout.
          </p>
        </Reveal>

        <Reveal as="form" delay={0.1} className="rounded-[1.75rem] border border-[#e0e0d6] bg-white bg-[radial-gradient(120%_140%_at_50%_0%,#ffffff_0%,#fbfbF8_55%)] p-6 shadow-[0_24px_60px_rgba(17,17,17,0.08)] sm:p-8" onSubmit={onSubmit} noValidate aria-busy={submitting}>
          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#77776e]">Models you want to hear about</legend>
            <div className="mt-4 grid gap-2">
              {models.map((model) => {
                const pressed = selected.includes(model.id);
                return (
                  <motion.button
                    key={model.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => toggle(model.id)}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.18 }}
                    className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left ${
                      pressed ? "border-[#151511] bg-[#151511] text-white" : "border-[#d8d8ce] text-[#151511] hover:border-[#8a8a80]"
                    }`}
                  >
                    <span>
                      <span className="block text-sm">{model.id}</span>
                      <span className={`mt-1 block text-xs ${pressed ? "text-[#c8c8c0]" : "text-[#77776e]"}`}>{model.detail}</span>
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ scale: pressed ? 1 : 0.5, opacity: pressed ? 1 : 0.45 }}
                      transition={{ type: "spring", stiffness: 500, damping: 24 }}
                      className={`h-3.5 w-3.5 rounded-full border ${pressed ? "border-white bg-white" : "border-[#8a8a80]"}`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${baseId}-name`} className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#77776e]">
                Name
              </label>
              <input
                id={`${baseId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                maxLength={80}
                required
                aria-invalid={nameError ? true : undefined}
                aria-describedby={nameError ? `${baseId}-name-error` : undefined}
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError(null);
                  setStatus(null);
                }}
                className="mt-2 h-12 w-full rounded-lg border border-[#d8d8ce] bg-white px-3.5 text-base text-[#151511] outline-none transition-colors placeholder:text-[#9a9a90] focus-visible:border-[#151511]"
              />
              {nameError ? (
                <p id={`${baseId}-name-error`} className="mt-2 text-sm text-[#a33b32]">
                  {nameError}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor={`${baseId}-email`} className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#77776e]">
                Email
              </label>
              <input
                id={`${baseId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                maxLength={160}
                required
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? `${baseId}-email-error` : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError(null);
                  setStatus(null);
                }}
                className="mt-2 h-12 w-full rounded-lg border border-[#d8d8ce] bg-white px-3.5 text-base text-[#151511] outline-none transition-colors placeholder:text-[#9a9a90] focus-visible:border-[#151511]"
              />
              {emailError ? (
                <p id={`${baseId}-email-error`} className="mt-2 text-sm text-[#a33b32]">
                  {emailError}
                </p>
              ) : null}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={submitting ? undefined : { scale: 0.98 }}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#151511] text-sm font-medium text-white hover:bg-black disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Joining…" : "Join the waitlist"}
          </motion.button>

          <div className="mt-4 min-h-6" aria-live="polite">
            <AnimatePresence initial={false} mode="wait">
              {status ? (
                <motion.p
                  key={status.text}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-lg border px-3.5 py-3 text-sm leading-6 ${
                    status.type === "success" ? "border-[#cfd8cf] bg-[#eef4ee] text-[#1d3a24]" : "border-[#e3b7b0] bg-[#f8ebe7] text-[#8d3a32]"
                  }`}
                >
                  {status.text}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
