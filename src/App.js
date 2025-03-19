import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminPanel from './components/Admin';
import UserDetails from './components/Userdetail';
import FundingPage from './components/ManageFunding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<AdminPanel />} /> 
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path='/funding' element={<FundingPage />} />

      </Routes>
    </Router>
  );
}

export default App;