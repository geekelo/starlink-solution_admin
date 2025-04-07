import React from "react";
import {
  ArrowUpCircle,
  CalendarDays,
  CheckCircle,
  User,
  CreditCard,
  Edit,
} from "lucide-react";
import { InfoCard } from "../InfoCard/Card";
import { formatDate } from "../utils/date";

const Funding = ({ transaction, openModal }) => {
  return (
    <InfoCard
      title="Funding"
      active={true}
      className="funding"
      menuItems={[
        {
          icon: <Edit size={16} />,
          label: "Edit Details",
          onClick: () => openModal(transaction),
        },
      ]}
      items={[
        {
          icon: <ArrowUpCircle size={16} />,
          label: "Amount",
          value: `₦${transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}`,
        },
        {
          icon: <User size={16} />,
          label: "Email",
          value: transaction.email || "N/A",
        },
        {
          icon: <CheckCircle size={16} />,
          label: "Status",
          value: transaction.status || "Pending",
          className: `status-badge ${transaction.status}`,
        },
        {
          icon: <CreditCard size={16} />,
          label: "Reference",
          value: transaction.reference || "N/A",
        },
        {
          icon: <CalendarDays size={16} />,
          label: "Date",
          value: transaction.date ? formatDate(transaction.date) : "N/A",
        },
      ]}
    />
  );
};

export default Funding;
