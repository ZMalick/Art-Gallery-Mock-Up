import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { themes, ThemeMode, ThemeTokens } from './theme';

interface ThemeContextValue {
  theme: ThemeTokens;
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  defaultMode?: ThemeMode;
  children: React.ReactNode;
}

export function ThemeProvider({ defaultMode = 'light', children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: themes[mode],
      mode,
      toggleTheme,
      setMode,
    }),
    [mode, toggleTheme]
  );

  const cssVars = useMemo(() => {
    const t = themes[mode];
    return {
      '--color-background': t.background,
      '--color-surface': t.surface,
      '--color-surface-hover': t.surfaceHover,
      '--color-text': t.text,
      '--color-text-secondary': t.textSecondary,
      '--color-text-inverse': t.textInverse,
      '--color-border': t.border,
      '--color-border-focus': t.borderFocus,
      '--color-overlay': t.overlay,
      '--color-primary': t.primary,
      '--color-primary-hover': t.primaryHover,
      '--color-primary-text': t.primaryText,
      '--color-secondary': t.secondary,
      '--color-secondary-hover': t.secondaryHover,
      '--color-secondary-text': t.secondaryText,
      '--color-error': t.error,
      '--color-error-text': t.errorText,
      '--color-success': t.success,
      '--color-success-text': t.successText,
      '--color-warning': t.warning,
      '--color-warning-text': t.warningText,
    } as React.CSSProperties;
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <div style={cssVars} data-theme={mode}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
