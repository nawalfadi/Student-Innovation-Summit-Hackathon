import { cn } from "@/lib/utils";

type SprayTone = "sky" | "mid" | "deep";

/**
 * One soft blue mist wash for a section corner.
 * Uses the shared `.blue-spray` gradient system (no live blur).
 */
export function SectionSpray({
  tone = "sky",
  className,
}: {
  tone?: SprayTone;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "blue-spray blue-spray-soft pointer-events-none absolute hidden sm:block",
        tone === "sky" && "spray-sky",
        tone === "mid" && "spray-mid",
        tone === "deep" && "spray-deep",
        className
      )}
    />
  );
}
