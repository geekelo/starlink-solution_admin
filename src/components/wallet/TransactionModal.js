import { XCircle } from "lucide-react";
import { formatDate } from "../utils/date";

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
              <p><strong>Date:</strong> {formatDate(transaction.date)}</p>
              
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
                    <p><strong>Deadline:</strong>{formatDate(transaction.deadline)}</p>
                  )}
                  
                  {transaction.start_date && (
                    <p><strong>Start Date:</strong>{formatDate(transaction.start_date)} </p>
                  )}
                  
                  {transaction.end_date && (
                    <p><strong>End Date:</strong> {formatDate(transaction.end_date)}</p>
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