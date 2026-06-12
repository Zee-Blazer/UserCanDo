"use client";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React from 'react';
import { theme } from './theme';

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * Material-UI Theme Provider with Neue Montreal Font
 * 
 * This provider wraps the application with Material-UI theme configuration
 * that includes the Neue Montreal font family for all components.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;


