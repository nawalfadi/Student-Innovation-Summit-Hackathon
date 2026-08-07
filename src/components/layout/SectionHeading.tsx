import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  /** For sections that break from the cool-white background (e.g. Timeline's
   *  dark "keynote" treatment) — swaps text colors for a navy surface. */
  dark?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "mx-auto max-w-3xl text-center")}>
      {badge && (
        <span
          className={cn(
            "mb-4 inline-flex items-center rounded-2xl border px-4 py-1.5 text-sm font-bold",
            dark
              ? "border-cyan/30 bg-cyan/10 text-cyan"
              : "border-cyan/25 bg-cyan/10 text-navy"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      <div className={cn("gold-line mt-5", centered && "mx-auto")} />
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-3xl text-base leading-8 sm:text-lg",
            dark ? "text-white/70" : "text-navy/65"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
