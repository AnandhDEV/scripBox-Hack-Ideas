import { ThemeProvider } from "@emotion/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

let store = {};
store = mockStore({
  challenges: [],
  users: [
    {
      id: 1,
      name: "Success",
      userId: "login@success.com",
    },
  ],
});

function Wrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

const customRender = (ui, options) => {
  render(ui, {
    wrapper: Wrapper,
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
