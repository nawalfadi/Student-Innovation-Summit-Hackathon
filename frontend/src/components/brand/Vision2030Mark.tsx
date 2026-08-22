import Image from "next/image";
import { cn } from "@/lib/utils";

interface Vision2030MarkProps {
  className?: string;
  compact?: boolean;
  /** `dark` = cream surfaces (navy logo). `light` = navy/black surfaces (silver logo). */
  variant?: "dark" | "light";
}

export function Vision2030Mark({
  className,
  compact,
  variant = "dark",
}: Vision2030MarkProps) {
  const src =
    variant === "light"
      ? "/vision-2030-logo.png"
      : "/vision-2030-logo-light.png";

  return (
    <div className={cn("flex items-center", className)} dir="ltr">
      <Image
        src={src}
        alt="رؤية السعودية 2030 — Vision 2030"
        width={compact ? 120 : 148}
        height={compact ? 80 : 100}
        className={cn(
          "h-auto w-auto",
          compact ? "h-10 sm:h-11" : "h-12 sm:h-14"
        )}
        priority
      />
    </div>
  );
}
