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
    "bg-gradient-to-br from-navy to-blue text-white hover:brightness-110 shadow-[0_8px_24px_rgba(11,31,68,0.28)] hover:shadow-[0_12px_32px_rgba(45,107,255,0.3)]",
  secondary:
    "bg-gold text-navy-dark hover:bg-gold-light shadow-[0_8px_24px_rgba(212,160,23,0.3)]",
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
        "btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-bold transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60",
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
