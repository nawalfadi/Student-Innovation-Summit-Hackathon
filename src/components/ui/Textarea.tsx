import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-navy"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "min-h-28 w-full resize-y rounded-2xl border bg-white/80 px-4 py-3 text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-cyan focus:ring-2 focus:ring-cyan/20",
          error ? "border-red-400" : "border-navy/15",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
