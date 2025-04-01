import React, { useState, useRef, useEffect } from 'react';
import { Box, Calendar, FileText, Save, MoreVertical, Eye, Edit2, X } from 'lucide-react';

const KitCard = ({ kit, plans }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(kit.status);
  const [selectedPlan, setSelectedPlan] = useState(kit.plan);
  
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const isManageRenewalsPath = true; // This would be determined by your router in a real app
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleViewClick = () => {
    console.log('View details for kit:', kit.id);
    setShowDropdown(false);
    setShowModal(true);
  };
  
  const handleEditClick = () => {
    console.log('Edit kit:', kit.id);
    setShowDropdown(false);
    setShowModal(true);
  };
  
  const handleSave = () => {
    console.log('Saving changes:', {
      kitId: kit.id,
      status,
      plan: selectedPlan
    });
    setShowModal(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      
      if (modalRef.current && !modalRef.current.contains(event.target) && event.target.className !== 'modal-overlay') {
        // Don't close if clicking inside the modal
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="kit-card renewal">
      <h3>
        Renewal
        <div 
          className="menu-dots" 
          onClick={toggleDropdown}
        >
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
          {isManageRenewalsPath && (
            <div className="dropdown-item" onClick={handleEditClick}>
              <Edit2 size={16} />
              Edit
            </div>
          )}
        </div>
      )}
      
      <div className="card-content">
        <div className="info-item">
          <FileText size={16} />
          <p><strong>NIN:</strong> {kit.nin}</p>
        </div>
        <div className="info-item">
          <FileText size={16} />
          <p><strong>Address:</strong> {kit.address}</p>
        </div>
        <div className="info-item">
          <FileText size={16} />
          <p><strong>Id:</strong> {kit.id}</p>
        </div>
        <div className="info-item">
          <Box size={16} />
          <p><strong>Kit No:</strong> {kit.kit_number}</p>
        </div>
        <div className="info-item">
          <FileText size={16} />
          <p><strong>Company Name:</strong> {kit.company_name}</p>
        </div>
        <div className="info-item">
          <Calendar size={16} />
          <p><strong>Date:</strong> {new Date(kit.created_at).toLocaleDateString("en-US")}</p>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <h4>Manage Kit Request</h4>
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Plan</label>
                <select 
                  value={selectedPlan} 
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
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

export default KitCard;