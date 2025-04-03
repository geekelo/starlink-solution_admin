import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  RefreshCw,
  CalendarDays,
  CheckCircle,
  FileText,
  Eye,
  Edit2,
} from "lucide-react";
import { InfoCard } from "../InfoCard/Card";
import { formatDate } from "../utils/date";
import EditRenewalModal from "./EditKitRenewal";

const Renewal = ({ transaction }) => {
  const location = useLocation();
  const isManageRenewalsPath =
    location.pathname.includes("/manage-renewal") ||
    location.pathname.includes("/renewals");

  // State to handle modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Function to open modal
  const openModal = (type, trans) => {
    if (type === "editKit") {
      setSelectedTransaction(trans);
      setModalOpen(true);
    }
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <InfoCard
        title="Renewal"
        className="renewal"
        menuItems={[
          {
            icon: <Eye size={16} />,
            label: "View Details",
            onClick: () => openModal("view", transaction),
          },
          ...(isManageRenewalsPath
            ? [
                {
                  icon: <Edit2 size={16} />,
                  label: "Edit Kit",
                  onClick: () => openModal("editKit", transaction),
                },
              ]
            : []),
        ]}
        items={[
          {
            icon: <FileText size={16} />,
            label: "Kit Number",
            value: transaction?.reference || transaction?.kit_number || "N/A",
          },
          {
            icon: <CheckCircle size={16} />,
            label: "Status",
            value: transaction?.status || "Receipt",
            className: `status-badge ${transaction?.status?.toLowerCase()}`,
          },
          {
            icon: <RefreshCw size={16} />,
            label: "Amount",
            value: `₦${
              transaction.amount
                ? parseFloat(transaction.amount).toLocaleString()
                : "0"
            }`,
          },
          {
            icon: <CalendarDays size={16} />,
            label: "Date",
            value: transaction?.date
              ? formatDate(transaction.date)
              : transaction?.start_date
              ? formatDate(transaction.start_date)
              : "N/A",
          },
        ]}
      />

      {/* Render EditRenewalModal if modal is open */}
      {modalOpen && (
        <EditRenewalModal
          isOpen={modalOpen}
          closeModal={closeModal}
          transaction={selectedTransaction}
          onSave={() => {
           
            closeModal();
          }}
        />
      )}
    </>
  );
};

export default Renewal;
