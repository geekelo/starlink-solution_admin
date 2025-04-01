import { useNavigate } from "react-router-dom";
import InvoiceReminder from "../components/reminders/InvoiceReminder";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/wallet-withdrawal")}>
        Withdrawal
        </button>
       
        <button onClick={() => navigate("/monthly-renewals")}>
          Download Renewals
        </button>
      </div>
      <div>
      <InvoiceReminder />
      </div>
    </div>
  );
};

export default Dashboard;