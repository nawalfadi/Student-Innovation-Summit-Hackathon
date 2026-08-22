import Image from "next/image";
import { cn } from "@/lib/utils";

interface UniversityMarkProps {
  className?: string;
  showText?: boolean;
  /** Dark surfaces (e.g. the footer) get the real white wordmark instead
   *  of the full-color logo boxed in a cream chip. */
  onDark?: boolean;
}

export function UniversityMark({
  className,
  showText = false,
  onDark = false,
}: UniversityMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} dir="ltr">
      <Image
        src={onDark ? "/alyamamah-logo-white.png" : "/alyamamah-logo-v2.png"}
        alt="جامعة اليمامة — Al Yamamah University"
        width={onDark ? 340 : 320}
        height={onDark ? 68 : 84}
        className="h-8 w-auto sm:h-9"
        priority
      />
      {showText && (
        <div className="hidden leading-tight sm:block" dir="rtl">
          <p
            className={cn(
              "text-xs font-bold",
              onDark ? "text-white" : "text-white"
            )}
          >
            جامعة اليمامة
          </p>
          <p
            className={cn(
              "text-[10px]",
              onDark ? "text-white/60" : "text-white/55"
            )}
          >
            Al Yamamah University
          </p>
        </div>
      )}
    </div>
  );
}
