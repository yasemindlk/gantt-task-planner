export type ThemeMode = 'light' | 'dark';

export interface Breakpoints {
  mobile: string;
  tablet: string;
}

export const breakpoints: Breakpoints = {
  mobile: '768px',
  tablet: '1024px',
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.tablet})`,
};

export interface AppTheme {
  mode: ThemeMode;
  breakpoints: Breakpoints;
  colors: {
    primary: string;
    background: string;
    backgroundSecondary: string;
    border: string;
    text: string;
    textMuted: string;
    barMain: string;
    barSub: string;
  };
}

const lightThemeColors = {
  primary: '#e8578a',
  background: '#ffffff',
  backgroundSecondary: '#f7f7fa',
  border: '#e8e8ee',
  text: '#2c2c3a',
  textMuted: '#8c8c9a',
  barMain: '#e8578a',
  barSub: '#5b8def',
};

const darkThemeColors = {
  primary: '#f291b5',
  background: '#2b2b33',
  backgroundSecondary: '#33333d',
  border: '#46464f',
  text: '#e4e4e8',
  textMuted: '#9898a4',
  barMain: '#f291b5',
  barSub: '#7aafff',
};

export const lightTheme: AppTheme = {
  mode: 'light',
  breakpoints,
  colors: lightThemeColors,
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  breakpoints,
  colors: darkThemeColors,
};

export const themes: Record<ThemeMode, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
};
