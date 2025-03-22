import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import PublicRoute from "./components/routes/publicRoute";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProtectedRoute from "./components/routes/protectedRoutes";
import AdminPanel from "./components/Admin";
import UserDetails from "./components/user/Userdetail";
import FundingPage from "./components/funding/ManageFunding";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Redirect if already logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected Routes (Only for logged-in users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/funding" element={<FundingPage />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
