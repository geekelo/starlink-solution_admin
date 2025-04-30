import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import { toast } from "react-toastify";
import Renewal from "../components/renewal/Renewal";
import { ViewRenewalModal } from "../components/renewal/ViewRenewal";
import EditRenewalModal from "../components/renewal/EditKitRenewal";
import { AppLoader } from "../components/Loader/loader";
import PageHeader from "../components/PageHeader/PageHeader";
import { FormSelect } from "../components/FormSelect";
import Pagination from "../components/Pagination/Pagination";
import EmptyState from "../components/EmptyState/EmptyState";
import { Package, Search } from "lucide-react";
import SearchWithButton from "../components/SearchInput/SearchInput";
import MetricBox from "../components/MetricsBox/MetricsBox";

const MonthlyRenewalPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [renewalData, setRenewalData] = useState([]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [kitNumber, setKitNumber] = useState("");

  // Date selectors
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;

  const totalPages = Math.ceil(renewalData.length / recordsPerPage) || 1;
  const currentRecords = renewalData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Fetch all renewals (raw)
  const fetchRenewals = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/kit_renewals");
      return response.data || [];
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch renewal records.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on selected month/year and kitNumber
  const filterRenewals = (data) => {
    const filteredByDate = data.filter((item) => {
      if (!item.date_of_renewal) return false;
      const itemDate = new Date(item.date_of_renewal);
      const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, "0");
      const itemYear = itemDate.getFullYear().toString();

      return selectedMonth === "All"
        ? itemYear === selectedYear
        : itemMonth === selectedMonth && itemYear === selectedYear;
    });

    const filteredByKit = kitNumber
      ? filteredByDate.filter((item) =>
          item.kit_number.toLowerCase().includes(kitNumber.toLowerCase())
        )
      : filteredByDate;

    return filteredByKit.sort(
      (a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal)
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    setCurrentPage(1);
    const allRenewals = await fetchRenewals();
    const finalData = filterRenewals(allRenewals);

    if (finalData.length > 0) {
      setRenewalData(finalData);
      toast.success("Renewals fetched successfully.");
    } else {
      setRenewalData([]);
      const noDataMsg = `No renewals found for ${selectedMonth}/${selectedYear}.`;
      setErrorMessage(noDataMsg);
      toast.info(noDataMsg);
    }
    setLoading(false);
  };

  const handleOpenViewModal = (transaction) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  // Trigger fetch only when month/year/kitNumber changes, debounce kitNumber
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [selectedMonth, selectedYear, kitNumber]);

  return (
    <div className="kit-container-renewal">
      <PageHeader
        title="Monthly Renewals"
        rightElement={
          <div className="kit-select">
            <FormSelect
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="All">All</option>
              {Array.from({ length: 12 }, (_, index) => {
                const monthValue = (index + 1).toString().padStart(2, "0");
                return (
                  <option key={index} value={monthValue}>
                    {new Date(2025, index).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                );
              })}
            </FormSelect>
            <FormSelect
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {Array.from({ length: 5 }, (_, index) => {
                const yearValue = (
                  currentDate.getFullYear() - 2 + index
                ).toString();
                return (
                  <option key={yearValue} value={yearValue}>
                    {yearValue}
                  </option>
                );
              })}
            </FormSelect>
          </div>
        }
      />

      <div className="kit-actions-bar">
        <SearchWithButton
          type="text"
          value={kitNumber}
          onChange={(e) => setKitNumber(e.target.value)}
          placeholder="Search by Kit Number"
          icon={<Search size={24} />}
          withButton={false}
          style={{ maxWidth: "600px" }}
        />
      </div>

      <div className="kit-grid-box kit-box">
        <MetricBox
          icon={<Package size={40} color="#b6bbc1" />}
          title="Total Renewals"
          value={renewalData.length}
          loading={loading}
        />
      </div>

      <div className="kit-content-area">
        {loading && <AppLoader />}

        {!loading && renewalData.length > 0 && (
          <div className="kit-grid">
            {currentRecords.map((item) => (
              <div key={item.id} className="kit-renewal-item">
                <Renewal transaction={item} openModal={handleOpenViewModal} />
              </div>
            ))}
          </div>
        )}

        {!loading && renewalData.length === 0 && (
          <EmptyState
            icon={<Search />}
            message={errorMessage || "Select a month and year or enter a kit number to search."}
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={renewalData.length}
        itemsPerPage={recordsPerPage}
        showPageNumbers={true}
      />

      {viewModalOpen && selectedTransaction && (
        <ViewRenewalModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}

      {editModalOpen && selectedTransaction && (
        <EditRenewalModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
          
        />
      )}
    </div>
  );
};

export default MonthlyRenewalPage;
