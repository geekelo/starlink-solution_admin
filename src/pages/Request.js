import { useState, useEffect } from "react";
import { createAxiosInstance } from "../config/axios";
import "../styles/Request.css";
import InvoiceReminder from "../components/reminders/InvoiceReminder";
import KitCard from "../components/request/KitCard";
import FundingCard from "../components/request/FundCard";
import {Box, HandCoins } from "lucide-react";
import { AppLoader } from "../components/Loader/loader";
import EmptyState from "../components/EmptyState/EmptyState";
import TabGroup from "../components/TabGroup/Tab";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("Funding");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Success message

  const [fundingData, setFundingData] = useState([]);
  const [kits, setKits] = useState([]);
  const [plans, setPlans] = useState([]); // Store Starlink plans from API

  useEffect(() => {
    fetchFundingRequests();
    fetchStarlinkKits();
    fetchStarlinkPlans(); // Fetch available plans
  }, []);

  const fetchFundingRequests = async () => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        "/api/v1/admin/funding_kit_requests/pending_paid"
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setFundingData(sortedData);
    } catch (err) {
      setError("Failed to fetch funding requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStarlinkKits = async () => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        "/api/v1/admin/funding_kit_requests/pending_starlink_kits"
      );
      setKits(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setError("Failed to fetch Starlink kits.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStarlinkPlans = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/starlink_plans");
      setPlans(response.data); // Store the plans in state
    } catch (err) {
      setError("Failed to fetch Starlink plans.");
    }
  };
  return (
    <div className="requests-section">
    
      {message && <p className="success-message">{message}</p>}
         <TabGroup
              tabs={['Funding', 'Kits']}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabPrefix="tab"
            />
      {/* <div className="tabs">
        <button
          className={activeTab === "funding" ? "active" : ""}
          onClick={() => setActiveTab("funding")}
        >
         
          <HandCoins size={18} />
          <span>Funding</span>
        </button>
        <button
          className={activeTab === "kits" ? "active" : ""}
          onClick={() => setActiveTab("kits")}
        >
          <Box size={18} />
          <span>Kits</span>
        </button>
      </div> */}
      
      {loading ? (
         <AppLoader />
      ) : (
        <>
          {activeTab === "Funding" && (
            <div className="funding-list">
              {fundingData.length > 0 ? (
                fundingData.map((item, index) => (
                  <FundingCard key={index} item={item} />
               
                ))
              ) : (
                <EmptyState message="No funding requests available"/>
             
              )}
            </div>
          )}
          

          {activeTab === "Kits" && (
            <div className="kit-grid">
              {kits.length > 0 ? (
                kits.map((kit, index) => (
                  <KitCard key={kit.id} kit={kit} plans={plans} index={index}/>
                ))
              ) : (
                <p className="req-message">No Starlink kit requests available.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

};

export default Requests;