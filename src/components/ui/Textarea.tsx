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
  const errorId = error ? `${textareaId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-white/85"
      >
        {label}
        {props.required && (
          <span className="ms-0.5 text-red-400" aria-hidden>
            *
          </span>
        )}
      </label>
      <textarea
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "min-h-28 w-full resize-y rounded-2xl border bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-cyan focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan/20",
          error ? "border-red-400/70" : "border-white/12 hover:border-white/20",
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
