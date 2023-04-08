import {
  Theme,
  ThemeColors,
  ThemeGradients,
  ThemeShadows,
  ThemeFontSizes,
  ThemeLineHeights,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeBreakpoints,
} from "./Theme.types";

export const colors: ThemeColors = {
  accent: {
    50: "var(--colors-accent-50)",
    100: "var(--colors-accent-100)",
    200: "var(--colors-accent-200)",
    300: "var(--colors-accent-300)",
    400: "var(--colors-accent-400)",
    500: "var(--colors-accent-500)",
    600: "var(--colors-accent-600)",
    700: "var(--colors-accent-700)",
    800: "var(--colors-accent-800)",
    900: "var(--colors-accent-900)",
  },
  gray: {
    50: "var(--colors-gray-50)",
    100: "var(--colors-gray-100)",
    200: "var(--colors-gray-200)",
    300: "var(--colors-gray-300)",
    400: "var(--colors-gray-400)",
    500: "var(--colors-gray-500)",
    600: "var(--colors-gray-600)",
    700: "var(--colors-gray-700)",
    800: "var(--colors-gray-800)",
    900: "var(--colors-gray-900)",
  },
  success: {
    50: "var(--colors-success-50)",
    100: "var(--colors-success-100)",
    200: "var(--colors-success-200)",
    300: "var(--colors-success-300)",
    400: "var(--colors-success-400)",
    500: "var(--colors-success-500)",
    600: "var(--colors-success-600)",
    700: "var(--colors-success-700)",
    800: "var(--colors-success-800)",
    900: "var(--colors-success-900)",
  },
  warning: {
    50: "var(--colors-warning-50)",
    100: "var(--colors-warning-100)",
    200: "var(--colors-warning-200)",
    300: "var(--colors-warning-300)",
    400: "var(--colors-warning-400)",
    500: "var(--colors-warning-500)",
    600: "var(--colors-warning-600)",
    700: "var(--colors-warning-700)",
    800: "var(--colors-warning-800)",
    900: "var(--colors-warning-900)",
  },
  alert: {
    50: "var(--colors-alert-50)",
    100: "var(--colors-alert-100)",
    200: "var(--colors-alert-200)",
    300: "var(--colors-alert-300)",
    400: "var(--colors-alert-400)",
    500: "var(--colors-alert-500)",
    600: "var(--colors-alert-600)",
    700: "var(--colors-alert-700)",
    800: "var(--colors-alert-800)",
    900: "var(--colors-alert-900)",
  },
  white: "var(--colors-white)",
  black: "var(--colors-black)",
  transparent: "var(--colors-transparent)",
};

export const gradients: ThemeGradients = {
  primary:
    "linear-gradient(45deg, hsl(356.4, 90.3%, 63.7%), hsl(280.2, 77.5%, 68.6%) 50%, hsl(190.9, 85.7%, 49.2%));",
};

export const shadows: ThemeShadows = {
  outline: "var(--shadows-outline)",
  soft: "var(--shadows-soft)",
};

export const fontSizes: ThemeFontSizes = {
  xs: "var(--font-sizes-xs)",
  sm: "var(--font-sizes-sm)",
  base: "var(--font-sizes-base)",
  lg: "var(--font-sizes-lg)",
  xl: "var(--font-sizes-xl)",
  "2xl": "var(--font-sizes-2xl)",
  "3xl": "var(--font-sizes-3xl)",
  "4xl": "var(--font-sizes-4xl)",
  "5xl": "var(--font-sizes-5xl)",
  "6xl": "var(--font-sizes-6xl)",
  "7xl": "var(--font-sizes-7xl)",
};

export const lineHeights: ThemeLineHeights = {
  xs: "var(--line-heights-xs)",
  sm: "var(--line-heights-sm)",
  base: "var(--line-heights-base)",
  lg: "var(--line-heights-lg)",
  xl: "var(--line-heights-xl)",
  "2xl": "var(--line-heights-2xl)",
  "3xl": "var(--line-heights-3xl)",
  "4xl": "var(--line-heights-4xl)",
  "5xl": "var(--line-heights-5xl)",
  "6xl": "var(--line-heights-6xl)",
  "7xl": "var(--line-heights-7xl)",
};

export const spacing: ThemeSpacing = {
  xs: "var(--spacing-xs)",
  sm: "var(--spacing-sm)",
  base: "var(--spacing-base)",
  lg: "var(--spacing-lg)",
  xl: "var(--spacing-xl)",
  "2xl": "var(--spacing-2xl)",
  "3xl": "var(--spacing-3xl)",
  "4xl": "var(--spacing-4xl)",
  "5xl": "var(--spacing-5xl)",
  "6xl": "var(--spacing-6xl)",
  "7xl": "var(--spacing-7xl)",
};

export const borderRadius: ThemeBorderRadius = {
  sm: "var(--border-radius-sm)",
  base: "var(--border-radius-base)",
  lg: "var(--border-radius-lg)",
  circle: "var(--border-radius-circle)",
};

export const breakpoints: ThemeBreakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const theme: Theme = {
  colors,
  gradients,
  shadows,
  fontSizes,
  lineHeights,
  spacing,
  borderRadius,
  breakpoints,
};

export default theme;
