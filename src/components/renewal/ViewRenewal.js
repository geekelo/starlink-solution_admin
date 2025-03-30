import React from 'react';

import { 
  FileText, 
  AlertCircle, 
  DollarSign, 
  Clock, 
  Calendar, 
  CalendarRange, 
  CalendarDays,
  CircleCheck,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import Modal from '../modal/modal';
import '../../styles/view-renewal.css'
import AppButton from '../AppButton/Button';

export const ViewRenewalModal = ({ isOpen, closeModal, transaction }) => {
  if (!transaction) return null;
  
  // Define transaction details with icons
  const transactionDetails = [
    {
      icon: <FileText size={18} />,
      label: "Kit Number",
      value: transaction?.kit_number || "N/A"
    },
    {
      icon: <AlertCircle size={18} />,
      label: "Status",
      value: transaction?.status || "N/A",
      className: `status-badge ${transaction?.status?.toLowerCase()}`
    },
    {
      icon: <DollarSign size={18} />,
      label: "Amount",
      value: `₦${transaction?.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}`
    },
    {
      icon: <Clock size={18} />,
      label: "Deadline",
      value: transaction?.deadline ? new Date(transaction.deadline).toLocaleDateString() : "N/A"
    },
    {
      icon: <Calendar size={18} />,
      label: "Start Date",
      value: transaction?.start_date ? new Date(transaction.start_date).toLocaleDateString() : "N/A"
    },
    {
      icon: <CalendarRange size={18} />,
      label: "End Date",
      value: transaction?.end_date ? new Date(transaction.end_date).toLocaleDateString() : "N/A"
    },
    {
      icon: <CalendarDays size={18} />,
      label: "Renewal Date",
      value: transaction?.date_of_renewal ? new Date(transaction.date_of_renewal).toLocaleDateString() : "N/A"
    },
    {
      icon: <CircleCheck size={18} />,
      label: "Month",
      value: transaction?.month || "N/A"
    },
    {
      icon: <CircleCheck size={18} />,
      label: "Year",
      value: transaction?.year || "N/A"
    },
    {
      icon: <ShieldCheck size={18} />,
      label: "Admin Credit",
      value: transaction?.credit_admin ? "Yes" : "No"
    },
    {
      icon: <CreditCard size={18} />,
      label: "Transaction Date",
      value: transaction?.created_at ? new Date(transaction.created_at).toLocaleDateString() : "N/A"
    }
  ];
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Renewal Details"
      footer={
        <AppButton onClick={closeModal}> Close</AppButton>
      
      }
      size="md"
    >
      <div className="transaction-details">
        {transactionDetails.map((detail, index) => (
          <div key={index} className="detail-row">
            <div className="detail-icon">
              {detail.icon}
            </div>
            <div className="detail-content">
              <strong>{detail.label}:</strong>{' '}
              {detail.className ? (
                <span className={detail.className}>
                  {detail.value}
                </span>
              ) : (
                detail.value
              )}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

