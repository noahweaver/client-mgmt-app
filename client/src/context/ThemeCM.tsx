import React from 'react';
import { createTheme } from '@material-ui/core/styles';


const themeCM = {
  palette: {
    type: 'light',
    primary: {
      main: '#001e90',
      light: '#ACC0FF',
      dark: '#001564',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff0006',
      light: '#ff3337',
      dark: '#b20004',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff0006',
      light: '#ff3337',
      dark: '#b20004',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    success: {
      main: '#4caf50',
      light: '#6fbf73',
      dark: '#357a38',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    warning: {
      main: '#ff9800',
      light: '#ffac33',
      dark: '#b26a00',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    info: {
      main: '#2196f3',
      light: '#4dabf5',
      dark: '#1769aa',
      contrastText: '#ffffff'
    },
    // need to add link colors, highlight colors, colors for different buttons and background colors etc
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  }
} as const; 

type CustomTheme = {
  [Key in keyof typeof themeCM]: typeof themeCM[Key]
}
declare module '@material-ui/core/styles/createTheme' {
  interface Theme extends CustomTheme { }
  interface ThemeOptions extends CustomTheme { }
}

export default createTheme(themeCM);
