import { useNavigate } from "react-router-dom";
import { CircleAlert, Download } from "lucide-react";
import PageHeader from "../components/PageHeader/PageHeader";
import Reminders from "../components/reminders/reminders";
import { ActionCard } from "../components/ActionCard/ActionCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard-container">
      <PageHeader title="Dashboard" />

      {/* Navigation Cards Section */}
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
            buttonText="Download Reports"
            onClick={() => handleNavigation("/monthly-renewals")}
          />

          <Reminders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
