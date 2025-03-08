import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import users from "../assets/User"; // Import user data
import "../styles/User.css";
import { User2 } from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.createdAt.toLowerCase().includes(query) ||
      (user.phone && user.phone.includes(query)) || 
      (user.whatsapp && user.whatsapp.includes(query)) 
    );
  });
  
  

  return (
    <div className="kit-container">
      <div className="kit-nav">
        <h2 className="kit-header">User Management</h2>

        {/* Search & Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by Name, Email, Phone, WhatsApp, Wallet ID, or OTP"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="kit-metrics">
      <div className="kitmetric-box">
          <div className="metric-icon">
            <User2 size={40} color="#b6bbc1" />
            <h4>Total Users</h4>
          </div>
          <p>{filteredUsers.length}</p>
        </div>
        </div>
      {/* User List */}
      <div className="kit-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => navigate(`/user/${user.id}`)} // Navigate to individual user page
            >
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>WhatsApp:</strong> {user.whatsapp}</p>
              <p><strong>Wallet ID:</strong> {user.walletID}</p>
              <p><strong>Wallet Balance:</strong> ₦{user.walletBalance}</p>
              <p><strong>No Of Kits:</strong> {user.otp}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
