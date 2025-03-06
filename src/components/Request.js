import { useState } from "react";
import "../styles/Request.css";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("funding");

  // Funding Data
  const [fundingData, setFundingData] = useState([
    { date: "2025-03-04", amount: "₦50,000", reference: "TXN12345", type: "Bank Transfer" },
    { date: "2025-03-03", amount: "₦20,000", reference: "TXN67890", type: "Card Payment" },
  ]);

  // Kits Data
  const [kits, setKits] = useState([
    { id: 1, nin: "123456789", address: "Lagos, Nigeria", name: "John Doe", kitNo: "KIT001", status: "Pending", plan: "Basic" },
    { id: 2, nin: "987654321", address: "Abuja, Nigeria", name: "Jane Smith", kitNo: "KIT002", status: "Approved", plan: "Premium" },
  ]);

  // Plans available
  const plans = ["Basic", "Standard", "Premium"];

  // Update Kit Status
  const handleStatusChange = (id, newStatus) => {
    setKits((prevKits) =>
      prevKits.map((kit) =>
        kit.id === id ? { ...kit, status: newStatus } : kit
      )
    );
  };

  // Update Kit Plan
  const handlePlanChange = (id, newPlan) => {
    setKits((prevKits) =>
      prevKits.map((kit) =>
        kit.id === id ? { ...kit, plan: newPlan } : kit
      )
    );
  };

  return (
    <div className="requests-section">
      <h3 className="request-header"> Requests</h3>
      <div className="tabs">
        <button className={activeTab === "funding" ? "active" : ""} onClick={() => setActiveTab("funding")}>
          Funding
        </button>
        <button className={activeTab === "kits" ? "active" : ""} onClick={() => setActiveTab("kits")}>
          Kits
        </button>
      </div>

      {/* Funding Tab */}
      {activeTab === "funding" && (
        <div className="funding-list">
          {fundingData.map((item, index) => (
            <div key={index} className="funding-card">
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Amount:</strong> {item.amount}</p>
              <p><strong>Reference:</strong> {item.reference}</p>
              <p><strong>Payment Type:</strong> {item.type}</p>
              <div className="cta">
                <select>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button className="save-btn">Save</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kits Tab */}
      {activeTab === "kits" && (
        <div className="funding-list">
          {kits.map((kit) => (
            <div key={kit.id} className="funding-card">
              <p><strong>NIN:</strong> {kit.nin}</p>
              <p><strong>Address:</strong> {kit.address}</p>
              <p><strong>Name:</strong> {kit.name}</p>
              <p><strong>Kit No:</strong> {kit.kitNo}</p>

              <div className="cta">
                {/* Status Dropdown */}
                <select value={kit.status} onChange={(e) => handleStatusChange(kit.id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </select>

                {/* Plan Dropdown */}
                <select value={kit.plan} onChange={(e) => handlePlanChange(kit.id, e.target.value)}>
                  {plans.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>

                <button className="save-btn">Save</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
