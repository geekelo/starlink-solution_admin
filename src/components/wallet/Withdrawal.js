
import "../../styles/Withdrawal.css";
import { ArrowDownCircle, CalendarDays, FileText } from "lucide-react";
import WithdrawalFormModal from "./withdrawalForm";
import {InfoCard} from "../InfoCard/Card";

const Withdrawal = ({ transaction = {} }) => {
  return (
    <div className="kit-grid">
      <InfoCard
        title="Withdrawal"
        className="withdrawal"
        items={[
          {
            icon: <ArrowDownCircle size={16} />,
            label: "Amount",
            value: `₦${transaction.amount 
              ? parseFloat(transaction.amount).toLocaleString() 
              : "0"}`
          },
          {
            icon: <FileText size={16} />,
            label: "Purpose",
            value: transaction.purpose || "N/A"
          },
          {
            icon: <CalendarDays size={16} />,
            label: "Date",
            value: transaction.date
              ? new Date(transaction.date).toLocaleDateString()
              : "N/A"
          }
        ]}
      />
    </div>
  );
};

export default Withdrawal;
