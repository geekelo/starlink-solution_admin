import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import users from "../assets/User"; // Import user data
import "../styles/User.css";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((user) => user.id.toString() === id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState(user?.phone || "");
  const [whatsappNo, setWhatsappNo] = useState(user?.whatsappNo || "");

  if (!user) {
    return <p className="no-results">User not found.</p>;
  }

  const handleSave = () => {
    // Simulate updating user details
    console.log("Updated Phone:", phone);
    console.log("Updated WhatsApp:", whatsappNo);
    setIsModalOpen(false);
  };

  return (
    <div className="user-details-container">
      <div className="user-header">
        <h2>{user.name}'s Profile</h2>
        <button className="edit-btn" onClick={() => setIsModalOpen(true)}>
          Edit
        </button>
      </div>

      <div className="user-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>WhatsApp:</strong> {user.whatsappNo}</p>
        <p><strong>Wallet ID:</strong> {user.walletID}</p>
        <p><strong>Wallet Balance:</strong> ₦{user.walletBalance}</p>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit User Details</h3>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>WhatsApp Number:</label>
            <input
              type="text"
              value={whatsappNo}
              onChange={(e) => setWhatsappNo(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
