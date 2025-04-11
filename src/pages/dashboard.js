import { useNavigate } from "react-router-dom";
import { CircleAlert, Download } from "lucide-react";
import PageHeader from "../components/PageHeader/PageHeader";
import Reminders from "../components/reminders/reminders";
import { ActionCard } from "../components/ActionCard/ActionCard";
import { toast } from "react-toastify";
import { useState } from "react";
import { createAxiosInstance } from "../config/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loadingDeactivate, setLoadingDeactivate] = useState(false);

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleDeactivateKits = async () => {
    setLoadingDeactivate(true);
    try {
      const axiosInstance = createAxiosInstance();
      const res = await axiosInstance.get(
        "/api/v1/admin/kit_deactivations/deactivate_expired_kits"
      );
      
      const { message, count } = res.data;
      toast.success(`${message}`);
    } catch (err) {
      toast.error("Failed to deactivate kits.");
    } finally {
      setLoadingDeactivate(false);
    }
  };

  return (
    <div className="dashboard-container">
      <PageHeader title="Dashboard" />

      <div className="dashboard-section">
        <div className="cards-container">
          <ActionCard
            title="WITHDRAWAL"
            description="Withdraw your funds with over 350 payment methods to choose from."
            icon={<CircleAlert size={32} />}
            buttonText="Withdraw Funds"
            onClick={() => handleNavigation("/wallet-withdrawal")}
          />

          <ActionCard
            title="DOWNLOAD RENEWALS"
            description="Access and download your monthly renewal reports with ease."
            icon={<Download size={32} />}
            buttonText="See Reports"
            onClick={() => handleNavigation("/monthly-renewals")}
          />

          <ActionCard
            title="DEACTIVATE KITS"
            description="You can deactivate kits whose subscription is expired"
            icon={<Download size={32} />}
            buttonText={loadingDeactivate ? "Deactivating..." : "Deactivate"}
            onClick={handleDeactivateKits}
          />

          <Reminders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
