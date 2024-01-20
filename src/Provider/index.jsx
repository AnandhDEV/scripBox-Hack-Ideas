import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { theme } from "../Utils/theme";
import { store } from "../Store";

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};
