export interface ThemeColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export type ThemeColorSelection = keyof ThemeColor;

export type SimpleColor = string;

export type ThemeColors = {
  accent: ThemeColor;
  gray: ThemeColor;
  success: ThemeColor;
  warning: ThemeColor;
  alert: ThemeColor;
  white: SimpleColor;
  black: SimpleColor;
  transparent: SimpleColor;
};

export type ThemeShadows = {
  outline: string;
  soft: string;
};

export type ThemeGradients = {
  primary: string;
};

export type ThemeFontSizes = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
};

export type ThemeLineHeights = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
};

export type ThemeSpacing = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
};

export type ThemeBorderRadius = {
  sm: string;
  base: string;
  lg: string;
  circle: string;
};

export type ThemeBreakpoints = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export interface Theme {
  colors: ThemeColors;
  gradients: ThemeGradients;
  shadows: ThemeShadows;
  fontSizes: ThemeFontSizes;
  lineHeights: ThemeLineHeights;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  breakpoints: ThemeBreakpoints;
}
