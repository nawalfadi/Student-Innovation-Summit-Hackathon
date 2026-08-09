"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

/** Matches the site's existing `fade-up` cubic-bezier so scroll reveals feel
 *  consistent with the hero's entrance animation. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
  duration?: number;
}

/**
 * Fades + slides in on scroll.
 * Renders a plain div until after mount so SSR HTML matches the client's
 * first paint (avoids hydration mismatches from motion initial styles).
 */
export function Reveal({
  delay = 0,
  y = 14,
  amount = 0.12,
  once = true,
  duration = 0.35,
  className,
  children,
}: RevealProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className}>{children as ReactNode}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -24px 0px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps extends HTMLMotionProps<"div"> {
  amount?: number;
  once?: boolean;
  stagger?: number;
}

/** Stagger container — pair with <RevealItem> children for a cascading
 *  card-by-card reveal (tracks grid, timeline days, university list...). */
export function RevealGroup({
  amount = 0.12,
  once = true,
  stagger = 0.06,
  className,
  children,
}: RevealGroupProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className}>{children as ReactNode}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.02 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE_OUT },
  },
};

/** A single staggered child of <RevealGroup>. */
export function RevealItem({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className}>{children as ReactNode}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
