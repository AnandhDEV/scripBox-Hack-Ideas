import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: 0,
          color: theme.palette.text.primary,
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },
        }),
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#12232E",
      contrastText: "#fff",
    },
    secondary: {
      main: "#007CC7",
      contrastText: "#fff",
    },
    error: {
      light: "#FF6166",
      main: "#FF4C51",
      dark: "#E04347",
      contrastText: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 500,
      letterSpacing: "-1.5px",
      color: "rgba(0, 0, 0, 0.87)",
    },
    h4: {
      fontWeight: 500,
      letterSpacing: "0.25px",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    h6: {
      letterSpacing: "0.15px",
    },
    subtitle1: {
      letterSpacing: "0.15px",
    },
    subtitle2: {
      letterSpacing: "0.1px",
    },
  },
});

theme = responsiveFontSizes(theme);
