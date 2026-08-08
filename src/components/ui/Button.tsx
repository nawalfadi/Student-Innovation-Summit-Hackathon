"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Pointer-follow magnetic pull, on by default for primary/secondary CTAs. */
  magnetic?: boolean;
  children?: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(120deg,var(--color-violet)_0%,var(--color-indigo)_35%,var(--color-blue)_70%,var(--color-cyan)_100%)] text-white shadow-[0_8px_28px_rgba(90,56,255,0.35)] hover:shadow-[0_14px_40px_rgba(0,212,255,0.4)] hover:brightness-[1.08]",
  secondary:
    "border border-white/20 bg-white/[0.06] text-white backdrop-blur-sm hover:border-cyan/40 hover:bg-white/[0.1]",
  outline:
    "border-2 border-white/15 bg-transparent text-white hover:border-white/35 hover:bg-white/5",
  ghost: "text-white/80 hover:text-white hover:bg-white/5",
  glass:
    "border border-white/10 bg-white/[0.04] text-white backdrop-blur-xl hover:bg-white/[0.08] shadow-sm",
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
  magnetic = true,
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Spring-damped magnetic pull — smoother and more "alive" than a raw
  // state offset, echoes the pointer-follow feel of Apple product pages.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magnetic ? { x: springX, y: springY } : undefined}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.955 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={cn(
        "btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-bold transition-[background-color,border-color,box-shadow,filter] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:cursor-not-allowed disabled:opacity-60",
        "[&_svg:last-child]:transition-transform [&_svg:last-child]:duration-300 group-hover:ltr:[&_svg:last-child]:translate-x-1 group-hover:rtl:[&_svg:last-child]:-translate-x-1",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="btn-shine__sweep" aria-hidden />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
