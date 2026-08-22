import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  /** Timeline's gradient "keynote" section reads slightly richer than the
   *  flatter default sections — a touch more opacity on the accents. */
  dark?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "mx-auto max-w-3xl text-center")}>
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-fg"
        )}
      >
        {title}
      </h2>
      <div className={cn("accent-line mt-5", centered && "mx-auto")} />
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-3xl text-base leading-8 sm:text-lg",
            dark ? "text-white/70" : "text-fg/65"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
