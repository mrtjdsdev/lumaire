import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-ink text-paper shadow-[0_1px_2px_rgba(17,17,17,0.18)] hover:bg-[#2a2a2a]",
  secondary: "border border-line bg-card text-ink hover:border-[#111111]/35 hover:bg-white",
  ghost: "text-ink hover:bg-ink/5",
  danger: "bg-danger-soft text-danger hover:bg-[#f4ddd8]",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export function buttonClass(
  variant: keyof typeof variants = "primary",
  size: keyof typeof sizes = "md",
  className?: string,
) {
  return cn(
    "press inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45",
    variants[variant],
    sizes[size],
    className,
  );
}
