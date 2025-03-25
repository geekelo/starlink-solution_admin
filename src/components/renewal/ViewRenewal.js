import { XCircle } from "lucide-react";

export const ViewRenewalModal = ({ isOpen, closeModal, transaction }) => {
    if (!isOpen || !transaction) return null;
    
    return (
      <div className="modal-overlay">
        <div className="funding-modal">
          <div className="funding-modal-header">
            <h3>Renewal Details</h3>
            <button onClick={closeModal}>
              <XCircle size={20} />
            </button>
          </div>
          <div className="funding-modal-body">
            <div className="transaction-details">
              <p><strong>Kit Number:</strong> {transaction?.kit_number || "N/A"}</p>
              <p><strong>Status:</strong> {transaction?.status || "N/A"}</p>
              <p><strong>Amount:</strong> ₦{transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}</p>
              <p><strong>Deadline:</strong> {transaction.deadline ? new Date(transaction.deadline).toLocaleDateString() : "N/A"}</p>
              <p><strong>Start Date:</strong> {transaction.start_date ? new Date(transaction.start_date).toLocaleDateString() : "N/A"}</p>
              <p><strong>End Date:</strong> {transaction.end_date ? new Date(transaction.end_date).toLocaleDateString() : "N/A"}</p>
              <p><strong>Renewal Date:</strong> {transaction?.date_of_renewal ? new Date(transaction.date_of_renewal).toLocaleDateString() : "N/A"}</p>
              <p><strong>Month:</strong> {transaction.month || "N/A"}</p>
              <p><strong>Year:</strong> {transaction.year || "N/A"}</p>
              <p><strong>Admin Credit:</strong> {transaction.credit_admin ? "Yes" : "No"}</p>
              <p><strong>Transaction Date:</strong> {transaction?.created_at ? new Date(transaction.created_at).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>
          <div className="funding-modal-footer">
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    );
  };
  