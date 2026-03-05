import { useState, useCallback, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, type ThemeMode } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import { ThemeContext } from './themeContextConfig';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const theme = themes[mode];

  const toggleMode = useCallback(() => {
    setModeState((m) => (m === 'light' ? 'dark' : 'light'));
  }, []);

  const value = { mode, toggleMode };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
