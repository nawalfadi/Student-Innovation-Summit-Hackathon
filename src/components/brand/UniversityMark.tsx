import Image from "next/image";
import { cn } from "@/lib/utils";

interface UniversityMarkProps {
  className?: string;
  showText?: boolean;
  /** Use a light chip behind the logo on dark surfaces (e.g. footer). */
  onDark?: boolean;
}

export function UniversityMark({
  className,
  showText = false,
  onDark = false,
}: UniversityMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} dir="ltr">
      <div
        className={cn(
          onDark && "rounded-xl bg-cream px-2.5 py-1.5"
        )}
      >
        <Image
          src="/alyamamah-logo-v2.png"
          alt="جامعة اليمامة — Al Yamamah University"
          width={320}
          height={84}
          className="h-8 w-auto sm:h-9"
          priority
          unoptimized
        />
      </div>
      {showText && (
        <div className="hidden leading-tight sm:block" dir="rtl">
          <p className="text-xs font-bold text-navy">جامعة اليمامة</p>
          <p className="text-[10px] text-navy/55">Al Yamamah University</p>
        </div>
      )}
    </div>
  );
}
