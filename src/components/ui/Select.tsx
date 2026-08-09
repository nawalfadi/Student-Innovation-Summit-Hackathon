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
        className="block text-sm font-semibold text-fg/85"
      >
        {label}
        {props.required && (
          <span className="ms-0.5 text-red-400" aria-hidden>
            *
          </span>
        )}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-full appearance-none rounded-2xl border px-4 py-3 text-fg outline-none transition-colors focus:border-cyan focus:ring-2 focus:ring-cyan/20",
          "border-[color:var(--input-border)] bg-[var(--input-bg)] focus:bg-[var(--card-bg-hover)]",
          error ? "border-red-400/70" : "hover:border-cyan/40",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value || "__empty"}
            value={option.value}
            className="bg-white text-[#0b1f44]"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
