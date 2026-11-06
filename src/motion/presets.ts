import type { Transition, Variants } from 'motion/react';

/** Snappy ease-out for UI feedback (accordion, modal, hero words). */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Curve for scroll reveals. Same as the original site's CSS transitions
 * (Tailwind's default `cubic-bezier(0.4, 0, 0.2, 1)`), so the movement stays visible.
 */
export const EASE_REVEAL: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** Section headers: fire once, when ~20% of the block is visible. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Individual items: fire once each item is a little inside the viewport, so the user sees it move. */
export const VIEWPORT_ITEM = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' } as const;

/**
 * Builds a reveal transition. `delay` is only set when given: an explicit delay
 * would override the parent's stagger delay.
 */
const reveal = (duration: number, delay?: number): Transition =>
  delay ? { duration, ease: EASE_REVEAL, delay } : { duration, ease: EASE_REVEAL };

/* Every "show" variant accepts an optional delay through the `custom` prop. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay?: number) => ({ opacity: 1, y: 0, transition: reveal(0.7, delay) }),
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay?: number) => ({ opacity: 1, y: 0, transition: reveal(0.6, delay) }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay?: number) => ({ opacity: 1, transition: reveal(0.6, delay) }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (delay?: number) => ({ opacity: 1, scale: 1, transition: reveal(0.7, delay) }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: (delay?: number) => ({ opacity: 1, x: 0, transition: reveal(0.7, delay) }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: (delay?: number) => ({ opacity: 1, x: 0, transition: reveal(0.7, delay) }),
};

/** Parent container that staggers its children's variants. */
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/**
 * Props for an item that reveals on its own when it scrolls into view
 * (instead of all items firing together when the list's top appears).
 * Spread onto a motion element together with `variants`.
 */
export const revealItem = (delay = 0) =>
  ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: VIEWPORT_ITEM,
    custom: delay,
  }) as const;

/** Hover lift for cards (use with whileHover). */
export const hoverLift = {
  y: -6,
  transition: { type: 'spring', stiffness: 420, damping: 30 },
} as const;

export const tapShrink = { scale: 0.97 } as const;
