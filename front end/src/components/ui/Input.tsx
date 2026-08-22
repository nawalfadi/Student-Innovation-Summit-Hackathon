import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-fg/85"
      >
        {label}
        {props.required && (
          <span className="ms-0.5 text-red-400" aria-hidden>
            *
          </span>
        )}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-full rounded-2xl border px-4 py-3 text-fg outline-none transition-colors placeholder:text-fg/35 focus:border-cyan focus:ring-2 focus:ring-cyan/20",
          "border-[color:var(--input-border)] bg-[var(--input-bg)] focus:bg-[var(--card-bg-hover)]",
          error ? "border-red-400/70" : "hover:border-cyan/40",
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
