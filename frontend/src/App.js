import React from "react";
import "./App.css";

import SignUp from "./pages/SignUp/Signup";
import SignIn from "./pages/SignIn/SignIn";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import PrivateRoute from "./components/Auth/PrivateRoute";

import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChartsDashboard from "./components/Charts/ChartsDashboard";
import Crypto from "./components/Crypto/Crypto";
import Home from "./components/Home/Home";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/charts" element={<ChartsDashboard />} />
              <Route path="/crypto" element={<Crypto />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
