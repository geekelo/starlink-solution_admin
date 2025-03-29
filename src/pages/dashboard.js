import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton/Button";
import '../styles/dashboard.css'
import { Download } from "lucide-react";
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-buttons">
        <AppButton onClick={() => navigate("/wallet-withdrawal")}>
        Withdrawal
        </AppButton>
        <AppButton onClick={() => navigate("/monthly-renewals")} leftIcon={<Download />}>
        Download Renewals
        </AppButton>
        {/* <button onClick={() => navigate("/wallet-withdrawal")}>
    
        </button>
       
        <button onClick={() => navigate("/monthly-renewals")}>
     
        </button> */}
      </div>
    </div>
  );
};

export default Dashboard;
