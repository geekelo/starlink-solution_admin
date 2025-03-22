import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminPanel from "./components/Admin";
import UserDetails from "./components/Userdetail";
import FundingPage from "./components/ManageFunding";
import PublicRoute from "./components/publicRoute";
import ProtectedRoute from "./components/protectedRoutes";

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
