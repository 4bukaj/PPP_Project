import React from "react";
import "./App.css";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";

import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dashboard from "./pages/Dashboard";
import Crypto from "./pages/Crypto";
import Home from "./pages/Home";
import Charts from "./pages/Charts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#204254",
    },
    secondary: {
      main: "#B94A3E",
    },
    dark: {
      main: "#121B22",
    },
    light: {
      main: "#E1E7FD",
    },
  },
});

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider store={store}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <RequireAuth fallbackPath={"/signin"}>
                  <Dashboard />
                </RequireAuth>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/crypto" element={<Crypto />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
