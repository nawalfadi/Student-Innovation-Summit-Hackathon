import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-light shadow-[0_8px_24px_rgba(27,54,93,0.25)] hover:shadow-[0_12px_32px_rgba(27,54,93,0.3)]",
  secondary:
    "bg-gold text-navy-dark hover:bg-gold-light shadow-[0_8px_24px_rgba(201,162,39,0.3)]",
  outline:
    "border-2 border-navy/20 bg-white/40 text-navy hover:border-navy/40 hover:bg-white/70 backdrop-blur-sm",
  ghost: "text-navy hover:bg-navy/5",
  glass:
    "border border-white/70 bg-white/50 text-navy backdrop-blur-xl hover:bg-white/80 shadow-sm",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
