import { useState, useEffect } from "react";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import EditKitRenewalModal from "../components/renewal/EditKitRenewal";
import { AppLoader } from "../components/Loader/loader";
import PageHeader from "../components/PageHeader/PageHeader";
import { Calendar, CalendarDays, CheckCircle, Clock, DollarSign, Edit2, FileText, Mail, Search, UserCheck } from "lucide-react";
import { formatDate } from "../components/utils/date";
import MetricBox from "../components/MetricsBox/MetricsBox";
import { InfoCard } from "../components/InfoCard/Card";
import EmptyState from "../components/EmptyState/EmptyState";
import SearchWithButton from "../components/SearchInput/SearchInput";

const InvoicesPage = () => {
  const [kitNumber, setKitNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [editModalData, setEditModalData] = useState(null);

  // Fetch invoices on page load
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    setError("");

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/api/v1/admin/kit_renewals`);

      // Filter only records with status "invoice"
      const invoiceData = response.data.filter(item => item.status.toLowerCase() === "invoice");

      if (invoiceData.length > 0) {
        setInvoices(invoiceData);
        setFilteredInvoices(invoiceData);
      } else {
        setError("No invoice records found.");
      }
    } catch (err) {
      setError("Error fetching invoices.");
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = () => {
    if (!kitNumber.trim()) {
      setFilteredInvoices(invoices); // Reset to all invoices if search is empty
    } else {
      const searchResults = invoices.filter(item => item.kit_number.includes(kitNumber));
      setFilteredInvoices(searchResults);
    }
  };

  const handleEditClick = (item) => {
    setEditModalData(item);
  };

  const handleUpdateRecord = async (updatedData) => {
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.put(`/api/v1/admin/kit_renewals/${updatedData.id}`, updatedData);
      setEditModalData(null);
      fetchInvoices();
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  return (
    <div className="kit-container-renewal">
      <PageHeader title="Invoices" />
      <div className="kit-actions-bar">
    
    <SearchWithButton
        type="text"
        value={kitNumber}
        onChange={(e) => setKitNumber(e.target.value)}
        placeholder="Enter kit number"
      
        icon={<Mail size={24} />}
        loading={loading}
        onSearch={handleSearch}
        width="70%"
        withButton={true}
        buttonText="Search"
        loadingText="Searching..."
      />
    </div>
<div className="kit-metrics">
<MetricBox
        icon={<FileText size={24} />}
        title="Total Invoices"
        value={filteredInvoices.length}
        loading={loading}
        className="invoice-metric"
        style={{ width: '100%' }}
      />
      
</div>
   

      <div className="kit-content-area">
        {loading && <AppLoader />}
        {!loading && (
          <>
            {filteredInvoices.length > 0 ? (
              <div className="kit-grid">
                {filteredInvoices.map((item) => (
                   <InfoCard
                   key={item.id}
                   title={`Kit No: ${item.kit_number}`}
                   items={[
                     {
                       icon: <DollarSign size={16} />,
                       label: 'Amount',
                       value: `₦${item.amount}`
                     },
                     {
                       icon: <Calendar size={16} />,
                       label: 'Month',
                       value: item.month
                     },
                     {
                       icon: <Calendar size={16} />,
                       label: 'Year',
                       value: item.year
                     },
                     {
                       icon: <UserCheck size={16} />,
                       label: 'Credit Admin',
                       value: item.credit_admin ? "Yes" : "No",
                       className: item.credit_admin ? "status-badge active" : "status-badge inactive"
                     },
                     {
                       icon: <CalendarDays size={16} />,
                       label: 'Start Date',
                       value: formatDate(item.start_date)
                     },
                     {
                       icon: <CalendarDays size={16} />,
                       label: 'End Date',
                       value: formatDate(item.end_date)
                     },
                     {
                       icon: <Clock size={16} />,
                       label: 'Deadline',
                       value: formatDate(item.deadline)
                     },
                     {
                       icon: <CheckCircle size={16} />,
                       label: 'Prorated',
                       value: item.prorated ? "Yes" : "No",
                       className: item.prorated ? "status-badge active" : "status-badge inactive"
                     }
                   ]}
                   menuItems={[
                     {
                       icon: <Edit2 size={16} />,
                       label: 'Edit',
                       onClick: () => handleEditClick(item)
                     }
                   ]}
                   className={item.credit_admin ? "active" : ""}
                 />

                ))}
              </div>
            ) : (
              <EmptyState title='No Invoices Found' message="Try searching with a different kit number."  />
           
            )}
          </>
        )}
      </div>

      {editModalData && (
  <EditKitRenewalModal
    isOpen={!!editModalData} // Ensure it's a boolean
    closeModal={() => setEditModalData(null)} // Properly close modal
    transaction={editModalData} // Pass data to edit
    onSave={handleUpdateRecord} // Handle save
  />
)}


    </div>
  );
};

export default InvoicesPage;
