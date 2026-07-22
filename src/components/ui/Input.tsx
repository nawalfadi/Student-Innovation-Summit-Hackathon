import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-navy"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full rounded-2xl border bg-white/80 px-4 py-3 text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-cyan focus:ring-2 focus:ring-cyan/20",
          error ? "border-red-400" : "border-navy/15",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
