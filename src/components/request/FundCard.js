import React, { useState, useRef, useEffect } from "react";
import {
  DollarSign,
  Calendar,
  FileText,
  Box,
  Save,
  MoreVertical,
  Eye,
  Edit2,
  X,
  Wallet2,
  User,
  BadgeCheck,
  Barcode,
  CheckCircle,
  CreditCard,
  IdCard,
} from "lucide-react";
import { formatDate } from "../utils/date";

const FundingCard = ({ item }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Pending");

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleViewClick = () => {
    console.log("View details for:", item);
    setShowDropdown(false);
    setShowModal(true);
  };

  const handleEditClick = () => {
    console.log("Edit:", item);
    setShowDropdown(false);
    setShowModal(true);
  };

  const handleSave = () => {
    console.log("Saving funding request status:", {
      reference: item.reference,
      status,
    });
    setShowModal(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        event.target.className !== "modal-overlay"
      ) {
        // Don't close if clicking inside the modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="kit-card renewal">
      <h3>
        Funding Request
        <div className="menu-dots" onClick={toggleDropdown}>
          <MoreVertical size={20} />
        </div>
      </h3>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="dropdown-menu" ref={dropdownRef}>
          {/* <div className="dropdown-item" onClick={handleViewClick}>
            <Eye size={16} />
            View Details
          </div> */}
          <div className="dropdown-item" onClick={handleEditClick}>
            <Edit2 size={16} />
            Edit
          </div>
        </div>
      )}

      <div className="card-content">
        <div className="info-item">
          <IdCard size={16} />
          <p>
            <strong>Id:</strong> {item.id}
          </p>
        </div>
        <div className="info-item">
  <DollarSign size={16} />
  <p><strong>Amount:</strong> {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.amount)}</p>
</div>

        <div className="info-item">
          <CheckCircle size={16} />
          <p>
            <strong>Status:</strong> {item.status}
          </p>
        </div>

        <div className="info-item">
          <BadgeCheck size={16} />
          <p>
            <strong>Paid:</strong> {item.paid}
          </p>
        </div>
        <div className="info-item">
          <Calendar size={16} />
          <p>
            <strong>Created_at:</strong> {formatDate(item.created_at)}
          </p>
        </div>
       
        <div className="info-item">
          <User size={16} />
          <p>
            <strong>User_name:</strong> {item.user_name}
          </p>
        </div>
        <div className="info-item">
          <Calendar size={16} />
          <p>
            <strong>User_email:</strong> {item.user_email}
          </p>
        </div>

        <div className="info-item">
          <Wallet2 size={16} />
          <p>
            <strong>Wallet_Id:</strong> {item.wallet_id}
          </p>
        </div>
        <div className="info-item">
          <Barcode size={16} />
          <p>
            <strong>Wallet Balance:</strong>  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.wallet_balance)}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <h4>Manage Funding Request</h4>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingCard;
