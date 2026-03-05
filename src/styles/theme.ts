export type ThemeMode = 'light' | 'dark';

export interface AppTheme {
  mode: ThemeMode;
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
  colors: lightThemeColors,
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: darkThemeColors,
};

export const themes: Record<ThemeMode, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
};
