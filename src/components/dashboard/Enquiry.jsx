import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getAllEnquiry, deleteEnquiry } from "../../api/enquiryApi";

export default function EnquiryTable() {
  const [enquiries, setEnquiries] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [enquiryIdToDelete, setEnquiryIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await getAllEnquiry();
        setEnquiries(res.data.enquiries); // adjust key as per your backend
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch enquiries");
      }
    };
    fetchEnquiries();
  }, []);

  // ✅ Format Date for Display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Filtering Logic
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      const enquiryDate = new Date(enquiry.date);
      const enquiryDateOnly = new Date(
        enquiryDate.getFullYear(),
        enquiryDate.getMonth(),
        enquiryDate.getDate()
      );

      const matchesSearch =
        searchTerm === "" ||
        enquiry.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.phone?.toString().includes(searchTerm) ||
        enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesDateRange = true;

      if (filters.fromDate) {
        const fromDate = new Date(filters.fromDate);
        matchesDateRange = matchesDateRange && enquiryDateOnly >= fromDate;
      }

      if (filters.toDate) {
        const toDate = new Date(filters.toDate);
        matchesDateRange = matchesDateRange && enquiryDateOnly <= toDate;
      }

      return matchesSearch && matchesDateRange;
    });
  }, [enquiries, searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
    });
    setSearchTerm("");
  };

  const confirmDelete = async () => {
    try {
      console.log("Deleting enquiry with ID:", enquiryIdToDelete);

      // Delete request backend pe bhejna
      const response = await deleteEnquiry(enquiryIdToDelete);

      // Success case
      if (response.status === 200 || response.success) {
        toast.success(" Enquiry deleted successfully!");

        // ✅ IMPORTANT: Local state se remove kar do
        setEnquiries((prev) =>
          prev.filter((enq) => enq._id !== enquiryIdToDelete)
        );
      } else {
        toast.error("❌ Failed to delete enquiry");
      }
    } catch (err) {
      console.error("Delete error:", err);

      // Specific error handling
      if (err.response?.status === 404) {
        toast.error("❌ Enquiry not found. It may have been already deleted.");
      } else if (err.response?.status === 500) {
        toast.error("❌ Server error. Please try again later.");
      } else {
        toast.error(
          "❌ Failed to delete enquiry. Please check your connection."
        );
      }
    } finally {
      setShowDeleteModal(false);
      setEnquiryIdToDelete(null);
    }
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    console.log("Deleting enquiry ID:", id);
    setEnquiryIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleEnquiryDownload = () => {
    window.open(
      `https://api.vedubuild.org/api/enquiry/download/data`,
      "_blank"
    );
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Enquiries ({filteredEnquiries.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleEnquiryDownload}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by name, phone, email, or message..."
            className="border border-gray-300 w-[400px] rounded-md py-2 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={clearAllFilters}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange("fromDate", e.target.value)}
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={filters.toDate}
              onChange={(e) => handleFilterChange("toDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-orange-200">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                Mobile
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                Email
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap min-w-[300px]">
                Message
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                Date & Time
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEnquiries.map((message) => (
              <tr
                key={message._id}
                className="bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm whitespace-nowrap font-medium">
                  {message.fullName}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {message.phone}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-blue-600">
                  {message.email}
                </td>
                <td className="px-4 py-3 text-sm max-w-[300px]">
                  <div className="truncate" title={message.message}>
                    {message.message}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <div className="text-gray-900">
                    {formatDate(message.date)}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  <button
                    onClick={(e) => handleDeleteClick(message._id, e)}
                    className="text-red-500 hover:text-red-700 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredEnquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No enquiries found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Statistics */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {filteredEnquiries.length}
          </div>
          <div className="text-sm text-gray-600">Total Enquiries</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {
              filteredEnquiries.filter(
                (e) =>
                  new Date(e.dateAndTime).toDateString() ===
                  new Date().toDateString()
              ).length
            }
          </div>
          <div className="text-sm text-gray-600">Today's Enquiries</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {
              filteredEnquiries.filter((e) => {
                const enquiryDate = new Date(e.dateAndTime);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return enquiryDate >= weekAgo;
              }).length
            }
          </div>
          <div className="text-sm text-gray-600">This Week</div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <h3 className="mb-5 text-lg text-gray-500">
                Are you sure you want to delete this enquiry?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
