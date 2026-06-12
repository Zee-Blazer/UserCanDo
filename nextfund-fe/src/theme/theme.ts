import { createTheme } from "@mui/material/styles";
import { FONT_WEIGHTS, NEUE_MONTREAL_FONT_FAMILY } from "../styles/fonts";

/**
 * Material-UI Theme Configuration with Neue Montreal Font
 *
 * This theme configuration ensures that all Material-UI components
 * use the Neue Montreal font family consistently.
 */
export const theme = createTheme({
  typography: {
    fontFamily: NEUE_MONTREAL_FONT_FAMILY,
    h1: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontSize: "2rem",
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontSize: "1.75rem",
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontSize: "1.25rem",
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.BOLD,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body1: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      fontSize: "0.875rem",
      lineHeight: 1.7,
    },
    button: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      textTransform: "none", // Disable uppercase transformation
    },
    caption: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      fontSize: "0.75rem",
      lineHeight: 1.6,
    },
    overline: {
      fontFamily: NEUE_MONTREAL_FONT_FAMILY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      fontSize: "0.75rem",
      lineHeight: 1.6,
      textTransform: "uppercase",
    },
  },
  components: {
    // Global component overrides to ensure Neue Montreal is used
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontFamily: NEUE_MONTREAL_FONT_FAMILY,
          },
          "& .MuiInputLabel-root": {
            fontFamily: NEUE_MONTREAL_FONT_FAMILY,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
          fontWeight: FONT_WEIGHTS.BOLD,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontFamily: NEUE_MONTREAL_FONT_FAMILY,
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#22c55e",
      light: "#dcfce7",
      dark: "#15803d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1e3a8a",
      light: "#3b82f6",
      dark: "#1e2f4f",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#344054",
      secondary: "#6c757d",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export default theme;


