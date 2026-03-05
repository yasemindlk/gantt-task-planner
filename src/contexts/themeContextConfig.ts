import { createContext } from 'react';
import type { ThemeMode } from '../styles/theme';

export interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
