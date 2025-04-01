import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/User.css";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Edit2,
  KeyIcon,
  Mail,
  MoreVertical,
  Package,
  Phone,
  PhoneIncoming,
  Search,
  User2,
  Wallet,
  WalletCards,
  WalletMinimal,
} from "lucide-react";
import { formatDate } from "../utils/date";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
  
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get("/api/v1/admin/user_records");
        const formattedUsers = response.data
          .map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone_number,
            whatsapp: user.whatsapp_number,
            walletID: user.wallet_id || "N/A",
            walletBalance: user.wallet_balance || 0,
            otp: user.kits_owned ,
            createdAt: user.created_at ? new Date(user.created_at) : null, // Convert to Date object
          }))
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); // Sort from latest to oldest
  
        setUsers(formattedUsers);
      
      } catch (err) {
        console.error(
          "Error fetching users:",
          err.response?.data || err.message
        );
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleEditClick = (users) => {
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
          whatsapp_number_confirmed:
            selectedUser.whatsapp_number_confirmed ?? false,
        },
      };

      const response = await axiosInstance.patch(
        `/api/v1/admin/user_records/${selectedUser.id}`,
        updatedData
      );

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
      (user.createdAt && user.createdAt.toISOString().toLowerCase().includes(query)) ||
      (user.phone && user.phone.includes(query)) ||
      (user.whatsapp && user.whatsapp.includes(query)) ||
      (user.walletID && user.walletID.includes(query))
    );
  });
  

  const toggleDropdown = (userId, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".menu-dots")
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastKit = currentPage * totalPages;
  const indexOfFirstKit = indexOfLastKit - totalPages;
  const currentKits = filteredUsers.slice(indexOfFirstKit, indexOfLastKit);
  const indexOfLastItem = currentPage * totalPages;
  return (
    <div className="kit-container">
      <div className="kit-nav">
        <h2 className="kit-header">User Management</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="search-box">
          <Search size={24} color="#b6bbc1" />
          <input
            type="text"
            placeholder="Search by Name, Email, Phone, WhatsApp, Wallet ID, or OTP"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="kit-metrics">
        <div className="kitmetric-box">
          <div className="metric-icon">
            <User2 size={40} color="#b6bbc1" />
            <h4>Total Users</h4>
          </div>
          <p>{loading ? "-" : filteredUsers.length}</p>
        </div>
      </div>

      <div className="kit-grid">
        {loading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div key={user.id} className={`user-card active`}>
              <h3>
                {user.name}{" "}
                <div
                  className="menu-dots"
                  onClick={(e) => toggleDropdown(user.id, e)}
                >
                  <MoreVertical size={20} />
                </div>
              </h3>
              {/* Dropdown Menu */}
              {activeDropdown === user.id && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  <div
                    className="dropdown-item"
                    onClick={() => handleEditClick(user)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => navigate(`/funding?email=${user.email}`)}
                  >
                    <Wallet size={16} />
                    Fundings
                  </div>
                </div>
              )}
              {/* Grid layout with icons for each field */}
              <div className="kit-info-grid">
                <div className="kit-info-icon">
                  <Mail size={16} />
                </div>
                <div className="kit-info-text">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="kit-info-icon">
                  <Phone size={16} />
                </div>
                <div className="kit-info-text">
                  <strong>Phone:</strong> {user.phone}
                </div>
                <div className="kit-info-icon">
                  <PhoneIncoming size={16} />
                </div>
                <div className="kit-info-text">
                  <strong>WhatsApp:</strong> {user.whatsapp}
                </div>
                <div className="kit-info-icon">
                  <WalletMinimal size={16} />
                </div>
                <div className="kit-info-text">
                  <strong>Wallet ID:</strong> {user.walletID}
                </div>

                <div className="kit-info-icon">
                  <WalletCards size={16} />
                </div>
                <div className="kit-info-text">
                  <strong>Wallet Balance:</strong> {user.walletBalance}
                </div>
                <div className="kit-info-icon">
                  <Package size={16} />
                </div>
                <div className="kit-info-text">
                  <strong>No Of Kits:</strong> {user.otp}
                </div>
                <div className="kit-info-icon">
  <Calendar size={16} />
</div>
<div className="kit-info-text">
  <strong>Date:</strong> {user.createdAt ? formatDate(user.createdAt) : "N/A"}
</div>

              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No users found.</p>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastItem < currentKits.length ? prev + 1 : prev
            )
          }
         
        >
          <ChevronRight size={18} />
        </button>
      </div>
      {isModalOpen && selectedUser && (
        <>
          <div
            className="user-modal-overlay"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="user-modal-container">
            <h2 className="user-modal-title">Edit User</h2>

            <div className="user-modal-content">
              <label className="user-modal-label">Name:</label>
              <input
                className="user-modal-input"
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />

              <label className="user-modal-label">Email:</label>
              <input
                className="user-modal-input"
                type="text"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />

              <label className="user-modal-label">Phone:</label>
              <input
                className="user-modal-input"
                type="text"
                value={selectedUser.phone}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, phone: e.target.value })
                }
              />

              <label className="user-modal-label">WhatsApp:</label>
              <input
                className="user-modal-input"
                type="text"
                value={selectedUser.whatsapp}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, whatsapp: e.target.value })
                }
              />

              <label className="user-modal-label">Email Confirmed:</label>
              <select
                className="user-modal-input"
                value={selectedUser.email_confirmed}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    email_confirmed: e.target.value === "true",
                  })
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
                  setSelectedUser({
                    ...selectedUser,
                    whatsapp_number_confirmed: e.target.value === "true",
                  })
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="user-modal-actions">
              <button className="user-modal-button save" onClick={handleSave}>
                Save
              </button>
              <button
                className="user-modal-button cancel"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
