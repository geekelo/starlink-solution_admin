import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AdminPanel from "./components/Admin";
import FundingPage from "./components/funding/ManageFunding";
import UserDetails from "./components/user/Userdetail";
import RenewalPage from "./components/renewal/ManageRenewal";

function App() {
  const token = localStorage.getItem("candra"); // Check if user is logged in

  return (
    <Router>
      <Routes>
        {/* Redirect to login if no token */}
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Redirect logged-in users away from the login page */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />

            {/* Protected Routes */}
            <Route path="/" element={<AdminPanel />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/funding" element={<FundingPage />} />
            <Route path="/renewals" element={<RenewalPage />} />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
