import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/User.css";
import { Edit, User2, Wallet } from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
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
  const handleEditClick = (users) => {
    console.log("Edit button clicked for user:", users.id);
    console.log(users)
    setSelectedUser(users); // Set user details in state
    setIsModalOpen(true); // Open modal
  };
  
  const handleSave = async () => {
    if (!selectedUser) return;
  
    try {
      const axiosInstance = createAxiosInstance();
      
      const updatedData = {
        starlink_user: {
          email: selectedUser.email,
          phone_number: selectedUser.phone,
          name: selectedUser.name,
          whatsapp_number: selectedUser.whatsapp,
          email_confirmed: selectedUser.email_confirmed ?? false,
          whatsapp_number_confirmed: selectedUser.whatsapp_number_confirmed ?? false,
        },
      };
  
      const response = await axiosInstance.patch(`/api/v1/admin/user_records/${selectedUser.id}`, updatedData);
  
      console.log("User updated successfully:", response.data);
      setIsModalOpen(false);
      alert("User updated successfully!"); // Feedback
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      alert("Failed to update user. Please try again.");
    }
  };
  
  

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
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredUsers.length / usersPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
          <p className="no-results">Loading users...</p>
        ) : currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>WhatsApp:</strong> {user.whatsapp}</p>
              <p><strong>Wallet ID:</strong> {user.walletID}</p>
              <p><strong>Wallet Balance:</strong> ₦{user.walletBalance}</p>
              <p><strong>No Of Kits:</strong> {user.otp}</p>
              
              {/* Fund Button */}
              <div
                className="fund-btn" 
                onClick={() => navigate(`/funding?email=${user.email}`)}
              >
                <Wallet size={24} color="#007bff" /> Fundings
              </div>

              {/* Edit Button */}
              <button 
                className="fundedit-button" 
                onClick={() => handleEditClick(user)}
              >
                <Edit size={20} color="#fff" />
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No users found.</p>
        )}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {isModalOpen && selectedUser && (
  <>
    <div className="user-modal-overlay" onClick={() => setIsModalOpen(false)}></div>
    <div className="user-modal-container">
      <h2 className="user-modal-title">Edit User</h2>

      <div className="user-modal-content">
  <label className="user-modal-label">Name:</label>
  <input
    className="user-modal-input"
    type="text"
    value={selectedUser.name}
    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
  />

  <label className="user-modal-label">Email:</label>
  <input
    className="user-modal-input"
    type="text"
    value={selectedUser.email}
    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
  />

  <label className="user-modal-label">Phone:</label>
  <input
    className="user-modal-input"
    type="text"
    value={selectedUser.phone}
    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
  />

  <label className="user-modal-label">WhatsApp:</label>
  <input
    className="user-modal-input"
    type="text"
    value={selectedUser.whatsapp}
    onChange={(e) => setSelectedUser({ ...selectedUser, whatsapp: e.target.value })}
  />

  <label className="user-modal-label">Email Confirmed:</label>
  <select
    className="user-modal-input"
    value={selectedUser.email_confirmed}
    onChange={(e) =>
      setSelectedUser({ ...selectedUser, email_confirmed: e.target.value === "true" })
    }
  >
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>

  <label className="user-modal-label">WhatsApp Confirmed:</label>
  <select
    className="user-modal-input"
    value={selectedUser.whatsapp_number_confirmed}
    onChange={(e) =>
      setSelectedUser({ ...selectedUser, whatsapp_number_confirmed: e.target.value === "true" })
    }
  >
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
</div>


      <div className="user-modal-actions">
        <button className="user-modal-button save" onClick={handleSave}>Save</button>
        <button className="user-modal-button cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </div>
  </>
)}


    </div>
  );
};

export default Users;