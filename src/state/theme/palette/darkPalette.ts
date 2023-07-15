import type { PaletteOptions } from "@mui/material/styles";

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: '#3e2723',
    light: '#5d4037',
    dark: '#a1887f',
  },
  secondary: {
    main: '#62513a',
    light: '#62513a',
    dark: '#ffca28',
  },
  divider: '#d0aa5e',
  background: {
    default: "#212121",
    paper: "#242424",
  },
  success: {
    main: "#67be23",
    contrastText: "#fff",
  },
  error: {
    main: "#ee2a1e",
    contrastText: "#fff",
  },
  warning: {
    main: "#fa8c16",
    contrastText: "#fff",
  },
  info: {
    main: "#1890ff",
    contrastText: "#fff",
  },

  text: {
    primary: "#fff",
    secondary: "rgba(255,255,255,0.7)",
    disabled: "#d1d1d1",
  },
};
