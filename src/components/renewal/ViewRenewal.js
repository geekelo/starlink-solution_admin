import { XCircle } from "lucide-react";

export const ViewRenewalModal = ({ isOpen, closeModal, transaction }) => {
  if (!isOpen || !transaction || Object.keys(transaction).length === 0) {
    console.log("View Modal not opening - transaction is empty or invalid", transaction);
    return null;
  }
  console.log("Transaction Data:", transaction);


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
          <p><strong>Kit Number:</strong> {transaction.reference || "N/A"}</p>
          <p><strong>Email:</strong> {transaction.email || "N/A"}</p>
          <p><strong>Amount:</strong> ₦{transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}</p>
          <p><strong>Date of Renewal:</strong> {transaction.date? new Date(transaction.date).toLocaleDateString("en-GB") : "N/A"}</p>

         <p><strong>ID:</strong> {transaction.id}</p>
        </div>
      </div>
      <div className="funding-modal-footer">
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  </div>
  );
};
