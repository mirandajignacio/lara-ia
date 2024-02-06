import {
  /* the components you used */
  createTheme,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5048E5",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#111827",
    },
    background: {
      default: "#F3F0FF",
    },
    error: {
      main: "#D14343",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: "Inter",
          fontSize: "56px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "137.5%",
        },
        h2: {
          fontFamily: "Inter",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "137.5%",
        },
        h5: {
          fontFamily: "Inter",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "137.5%",
        },
        button: {
          textDecoration: "none",
          fontSize: "14px",
        },
        body1: {
          fontFamily: "Inter",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "8px !important",
          padding: "16px 12px !important",
        },
      },
    },
    MuiButtonBase: {},
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "unset",
          fontWeight: "600",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "13px",
        },
        sizeMedium: {
          padding: "8px 20px",
          fontSize: "14px",
          height: "40px",
        },
        sizeLarge: {
          padding: "11px 24px",
          fontSize: "15px",
          height: "48px",
        },
        contained: {
          borderRadius: "8px",
        },
        outlined: {
          borderRadius: "8px",
          backgroundColor: "rgb(80, 72, 229, 0.08)",
        },
      },
    },
  },
});

export { theme };
