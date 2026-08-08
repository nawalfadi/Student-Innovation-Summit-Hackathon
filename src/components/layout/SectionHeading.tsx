import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  /** Timeline's gradient "keynote" section reads slightly richer than the
   *  flatter default sections — a touch more opacity on the accents. */
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
            "mb-4 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-bold uppercase tracking-wide",
            dark
              ? "border-cyan/35 bg-cyan/10 text-cyan"
              : "border-cyan/25 bg-cyan/[0.07] text-cyan"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,var(--color-violet),var(--color-cyan))]" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <div className={cn("accent-line mt-5", centered && "mx-auto")} />
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-3xl text-base leading-8 sm:text-lg",
            dark ? "text-white/70" : "text-white/65"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
