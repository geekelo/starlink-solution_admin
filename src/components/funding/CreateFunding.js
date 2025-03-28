import React from 'react';
import { X } from 'lucide-react';

const CreateFundingModal = ({ 
  newFunding, 
  setNewFunding, 
  handleCreateFunding,
  closeModal,
  loading
}) => {
  return (
    <div className="modal-overlay">
      <div className="funding-modal">
        <div className="funding-modal-header">
          <h3>Create Funding Request</h3>
          <button onClick={closeModal}>
            <X size={20} />
          </button>
        </div>

        <div className="funding-modal-body">
          <label>User Email</label>
          <input
            type="email"
            value={newFunding.email}
            onChange={(e) =>
              setNewFunding({ ...newFunding, email: e.target.value })
            }
          />

          <label>Funding Amount</label>
          <input
            type="number"
            value={newFunding.amount}
            onChange={(e) =>
              setNewFunding({ ...newFunding, amount: e.target.value })
            }
          />

          <label>Transaction Type</label>
          <select
            value={newFunding.type}
            onChange={(e) =>
              setNewFunding({ ...newFunding, type: e.target.value })
            }
          >
            <option value="">Select Transaction Type</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          <label>Status</label>
          <select
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

          <label>Payment Method</label>
          <select
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

        <div className="funding-modal-footer">
          <button onClick={handleCreateFunding} disabled={loading}>
            {loading ? "Processing..." : "Submit Funding Request"}
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateFundingModal;