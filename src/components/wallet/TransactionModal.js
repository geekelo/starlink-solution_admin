import { XCircle } from "lucide-react";

export const TransactionModal = ({ isOpen, closeModal, transaction, type, error }) => {
    if (!isOpen || !transaction) return null;
    
    return (
      <div className="modal-overlay">
        <div className="funding-modal">
          <div className="funding-modal-header">
            <h3>Transaction Details</h3>
            <button onClick={closeModal}>
              <XCircle size={20} />
            </button>
          </div>
          <div className="funding-modal-body">
            {error && <p className="error-message">{error}</p>}
            
            <div className="transaction-details">
              <p><strong>Type:</strong> {transaction.type}</p>
              <p><strong>Amount:</strong> ₦{transaction.amount?.toLocaleString()}</p>
              <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
              
              {transaction.email && (
                <p><strong>Email:</strong> {transaction.email}</p>
              )}
              
              {transaction.reference && (
                <p><strong>Reference:</strong> {transaction.reference}</p>
              )}
              
              {transaction.status && (
                <p><strong>Status:</strong> {transaction.status}</p>
              )}
              
              {transaction.kit_number && (
                <p><strong>Kit Number:</strong> {transaction.kit_number}</p>
              )}
              
              {/* Additional fields for Renewal type */}
              {transaction.type === 'Renewal' && (
                <>
                  {transaction.deadline && (
                    <p><strong>Deadline:</strong> {new Date(transaction.deadline).toLocaleDateString()}</p>
                  )}
                  
                  {transaction.start_date && (
                    <p><strong>Start Date:</strong> {new Date(transaction.start_date).toLocaleDateString()}</p>
                  )}
                  
                  {transaction.end_date && (
                    <p><strong>End Date:</strong> {new Date(transaction.end_date).toLocaleDateString()}</p>
                  )}
                  
                  {transaction.month && (
                    <p><strong>Month:</strong> {transaction.month}</p>
                  )}
                  
                  {transaction.year && (
                    <p><strong>Year:</strong> {transaction.year}</p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="funding-modal-footer">
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    );
  };