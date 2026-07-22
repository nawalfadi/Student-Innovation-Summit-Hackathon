import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "mx-auto max-w-3xl text-center")}>
      {badge && (
        <span className="mb-4 inline-flex items-center rounded-2xl border border-cyan/20 bg-cyan/10 px-4 py-1.5 text-sm font-bold text-navy">
          {badge}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      <div className={cn("gold-line mt-5", centered && "mx-auto")} />
      {subtitle && <p className="section-subtitle mx-auto">{subtitle}</p>}
    </div>
  );
}
