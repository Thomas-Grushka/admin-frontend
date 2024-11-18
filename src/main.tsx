import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import router from "./router.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#5255bc",
      light: "#5255bc",
      dark: "#5255bc",
      contrastText: "#fcfcfc",
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* <Sidebar children={ */}
          <RouterProvider router={router} />
          {/* // } /> */}
        </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
