import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={selectId}
        className="block text-sm font-semibold text-navy"
      >
        {label}
        {props.required && (
          <span className="ms-0.5 text-red-500" aria-hidden>
            *
          </span>
        )}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-full rounded-2xl border bg-white/80 px-4 py-3 text-navy outline-none transition-colors focus:border-cyan focus:ring-2 focus:ring-cyan/20",
          error ? "border-red-400" : "border-navy/15",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
