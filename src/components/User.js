import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/User.css";
import { User2 } from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get("/api/v1/admin/user_records");

        const formattedUsers = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone_number,
          whatsapp: user.whatsapp_number,
          walletID: user.wallet_id || "N/A",
          walletBalance: user.wallet_balance || 0,
          otp: user.kit_count || 0,
          createdAt: user.created_at ? user.created_at.split("T")[0] : "N/A",
        }));

        setUsers(formattedUsers);
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.createdAt.toLowerCase().includes(query) ||
      (user.phone && user.phone.includes(query)) || 
      (user.whatsapp && user.whatsapp.includes(query)) ||
      (user.walletID && user.walletID.includes(query))
    );
  });

  return (
    <div className="kit-container">
      <div className="kit-nav">
        <h2 className="kit-header">User Management</h2>

        {error && <p className="error-message">{error}</p>}

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

      <div className="kit-grid">
        {loading ? (
          <p>Loading users...</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>WhatsApp:</strong> {user.whatsapp}</p>
              <p><strong>Wallet ID:</strong> {user.walletID}</p>
              <p><strong>Wallet Balance:</strong> ₦{user.walletBalance}</p>
              <p><strong>No Of Kits:</strong> {user.otp}</p>
              
              {/* New "Fund" Button */}
              <button 
                className="fund-btn" 
                onClick={() => navigate(`/funding?email=${user.email}`)}
              >
                Fund
              </button>
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
