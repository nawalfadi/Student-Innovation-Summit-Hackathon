"use client";

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

/** Fades + slides a single element in as it enters the viewport. */
export function Reveal({
  delay = 0,
  y = 28,
  amount = 0.2,
  once = true,
  duration = 0.7,
  className,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
      {...props}
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
  amount = 0.15,
  once = true,
  stagger = 0.1,
  className,
  children,
  ...props
}: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.04 },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** A single staggered child of <RevealGroup>. */
export function RevealItem({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
