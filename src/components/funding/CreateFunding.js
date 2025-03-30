import React from 'react';
import { X } from 'lucide-react';
import Modal from '../modal/modal';
import '../../styles/create-fund.css'
const CreateFundingModal = ({ 
  newFunding, 
  isOpen,
  setNewFunding, 
  handleCreateFunding,
  closeModal,
  loading
}) => {
  return (
    <Modal
    isOpen={isOpen}
    onClose={closeModal}
    title="Create Funding Request"
    footer={
      <>
        <button 
          className="btn btn-primary" 
          onClick={handleCreateFunding} 
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Funding Request"}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={closeModal}
        >
          Cancel
        </button>
      </>
    }
  >
    <div className="funding-form">
      <div className="form-group">
        <label>User Email</label>
        <input
          type="email"
          className="form-control"
          value={newFunding.email}
          onChange={(e) =>
            setNewFunding({ ...newFunding, email: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Funding Amount</label>
        <input
          type="number"
          className="form-control"
          value={newFunding.amount}
          onChange={(e) =>
            setNewFunding({ ...newFunding, amount: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>Transaction Type</label>
        <select
          className="form-control"
          value={newFunding.type}
          onChange={(e) =>
            setNewFunding({ ...newFunding, type: e.target.value })
          }
        >
          <option value="">Select Transaction Type</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          className="form-control"
          value={newFunding.status}
          onChange={(e) =>
            setNewFunding({ ...newFunding, status: e.target.value })
          }
        >
          <option value="pending">Pending</option>
          <option value="awaiting-approval">Awaiting Approval</option>
          <option value="approved">Approved</option>
          <option value="unapproved">Unapproved</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="form-group">
        <label>Payment Method</label>
        <select
          className="form-control"
          value={newFunding.payment_method}
          onChange={(e) =>
            setNewFunding({
              ...newFunding,
              payment_method: e.target.value,
            })
          }
        >
          <option value="">Select Payment Method</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
    </div>
  </Modal>
  );
};

export default CreateFundingModal;