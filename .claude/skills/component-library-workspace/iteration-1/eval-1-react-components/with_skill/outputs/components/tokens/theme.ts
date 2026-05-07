/**
 * Design Tokens
 * Centralized theme tokens for the component library.
 * Supports light and dark themes.
 */

export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  accent: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
} as const;

export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Fira Code', 'Cascadia Code', Consolas, monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const radii = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
} as const;

export interface ThemeTokens {
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textSecondary: string;
  textInverse: string;
  border: string;
  borderFocus: string;
  overlay: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  secondary: string;
  secondaryHover: string;
  secondaryText: string;
  error: string;
  errorText: string;
  success: string;
  successText: string;
  warning: string;
  warningText: string;
}

export const lightTheme: ThemeTokens = {
  background: '#ffffff',
  surface: colors.neutral[50],
  surfaceHover: colors.neutral[100],
  text: colors.neutral[900],
  textSecondary: colors.neutral[600],
  textInverse: '#ffffff',
  border: colors.neutral[300],
  borderFocus: colors.primary[500],
  overlay: 'rgba(0, 0, 0, 0.5)',
  primary: colors.primary[600],
  primaryHover: colors.primary[700],
  primaryText: '#ffffff',
  secondary: colors.secondary[600],
  secondaryHover: colors.secondary[700],
  secondaryText: '#ffffff',
  error: colors.error[600],
  errorText: colors.error[700],
  success: colors.success[600],
  successText: colors.success[700],
  warning: colors.warning[600],
  warningText: colors.warning[700],
};

export const darkTheme: ThemeTokens = {
  background: colors.neutral[900],
  surface: colors.neutral[800],
  surfaceHover: colors.neutral[700],
  text: colors.neutral[50],
  textSecondary: colors.neutral[400],
  textInverse: colors.neutral[900],
  border: colors.neutral[600],
  borderFocus: colors.primary[400],
  overlay: 'rgba(0, 0, 0, 0.7)',
  primary: colors.primary[500],
  primaryHover: colors.primary[400],
  primaryText: '#ffffff',
  secondary: colors.secondary[400],
  secondaryHover: colors.secondary[300],
  secondaryText: colors.neutral[900],
  error: colors.error[400],
  errorText: colors.error[300],
  success: colors.success[400],
  successText: colors.success[300],
  warning: colors.warning[400],
  warningText: colors.warning[300],
};

export type ThemeMode = 'light' | 'dark';

export const themes: Record<ThemeMode, ThemeTokens> = {
  light: lightTheme,
  dark: darkTheme,
};
