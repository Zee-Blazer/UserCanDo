/**
 * Neue Montreal Font Configuration
 *
 * This file provides TypeScript definitions and utilities for the Neue Montreal font family.
 * It ensures type safety and provides consistent font usage across the application.
 */

export const FONT_FAMILIES = {
  NEUE_MONTREAL: "Neue Montreal",
  FALLBACK:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
} as const;

export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
} as const;

export const FONT_STYLES = {
  NORMAL: "normal",
  ITALIC: "italic",
} as const;

/**
 * Complete font family string with fallbacks
 */
export const NEUE_MONTREAL_FONT_FAMILY = `${FONT_FAMILIES.NEUE_MONTREAL}, ${FONT_FAMILIES.FALLBACK}`;

/**
 * Font utility object for easy access in components
 */
export const FONTS = {
  neueMontreal: {
    light: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.LIGHT,
      fontStyle: FONT_STYLES.NORMAL,
    },
    regular: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      fontStyle: FONT_STYLES.NORMAL,
    },
    medium: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.MEDIUM,
      fontStyle: FONT_STYLES.NORMAL,
    },
    bold: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontStyle: FONT_STYLES.NORMAL,
    },
    lightItalic: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.LIGHT,
      fontStyle: FONT_STYLES.ITALIC,
    },
    regularItalic: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      fontStyle: FONT_STYLES.ITALIC,
    },
    mediumItalic: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.MEDIUM,
      fontStyle: FONT_STYLES.ITALIC,
    },
    boldItalic: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontStyle: FONT_STYLES.ITALIC,
    },
  },
} as const;

/**
 * Material-UI theme typography configuration
 */
export const TYPOGRAPHY_CONFIG = {
  fontFamily: NEUE_MONTREAL_FONT_FAMILY,
  h1: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  h2: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  h3: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  h4: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  h5: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  h6: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  body1: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  body2: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  button: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
} as const;

/**
 * Tailwind CSS class names for Neue Montreal
 */
export const TAILWIND_FONT_CLASSES = {
  light: "font-neue-light",
  regular: "font-neue-regular",
  medium: "font-neue-medium",
  bold: "font-neue-bold",
  lightItalic: "font-neue-light-italic",
  regularItalic: "font-neue-regular-italic",
  mediumItalic: "font-neue-medium-italic",
  boldItalic: "font-neue-bold-italic",
  family: "font-neue-montreal",
} as const;

/**
 * React style objects for inline styles
 */
export const FONT_STYLES_INLINE = {
  light: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.LIGHT,
  },
  regular: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  medium: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
  bold: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  lightItalic: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.LIGHT,
    fontStyle: FONT_STYLES.ITALIC,
  },
  regularItalic: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontStyle: FONT_STYLES.ITALIC,
  },
  mediumItalic: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontStyle: FONT_STYLES.ITALIC,
  },
  boldItalic: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontStyle: FONT_STYLES.ITALIC,
  },
} as const;

// Type definitions for better TypeScript support
export type FontWeight = (typeof FONT_WEIGHTS)[keyof typeof FONT_WEIGHTS];
export type FontFamily = (typeof FONT_FAMILIES)[keyof typeof FONT_FAMILIES];
export type FontStyle = (typeof FONT_STYLES)[keyof typeof FONT_STYLES];
