import { Download, Upload } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import {
  applyBulk,
  getAllStudentData,
  updatePaymentStatus,
  sendCredentials
} from "../../api/studentApi";

// import { downloadStudentData, applyBulk } from "../../api/studentApi";

import { saveAs } from "file-saver";
import toast from "react-hot-toast";

export default function StudentCardTable() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [filters, setFilters] = useState({
    scholarship: "all",
    schoolCollege: "all",
    studentClass: "all", // ✅ instead of class
    city: "all",
    district: "all", // ✅ instead of state
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await getAllStudentData();
        setStudents(res.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdatePaymentStatus = async (id) => {
    try {
      const res = await updatePaymentStatus(id);

      if (res.data.success) {
        toast.success("Payment status updated to success ✅");
        await sendCredentials(id);
        // ✅ Re-fetch and update state
        const updatedData = await getAllStudentData();
        setStudents(updatedData.data.students);
      } else {
        toast.error(res.data.message || "Unable to update payment status ❌");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Something went wrong while updating payment status!");
    }
  };

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const scholarships = [...new Set(students.map((s) => s.scholarship))];
    const schools = [...new Set(students.map((s) => s.schoolCollege))];
    const classes = [...new Set(students.map((s) => s.studentClass))]; // ✅
    const cities = [...new Set(students.map((s) => s.city))];
    const states = [...new Set(students.map((s) => s.district))]; // ✅

    return { scholarships, schools, classes, cities, states };
  }, [students]);

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (!student) return false;

      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        search === "" ||
        student.studentName?.toLowerCase().includes(search) ||
        student.emailId?.toLowerCase().includes(search) ||
        student.mobileNo?.toString().includes(search) ||
        student.aplication_id?.toString().toLowerCase().includes(search); // Added aplication_id search

      const matchesScholarship =
        filters.scholarship === "all" ||
        student.scholarship === filters.scholarship;

      const matchesSchool =
        filters.schoolCollege === "all" ||
        student.schoolCollege === filters.schoolCollege;

      const matchesClass =
        filters.studentClass === "all" ||
        student.studentClass === filters.studentClass;

      const matchesCity =
        filters.city === "all" || student.city === filters.city;

      const matchesDistrict =
        filters.district === "all" || student.district === filters.district;

      return (
        matchesSearch &&
        matchesScholarship &&
        matchesSchool &&
        matchesClass &&
        matchesCity &&
        matchesDistrict
      );
    });
  }, [searchTerm, filters, students]);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    setStudentIdToDelete(id);
    setShowDeleteModal(true);
  };
  const handlePaymentClick = (student, e) => {
    e.stopPropagation();
    setSelectedStudent(student);
    setShowPaymentModal(true);
  };

  const confirmDelete = () => {
    console.log("Delete student with ID:", studentIdToDelete);
    setShowDeleteModal(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      scholarship: "all",
      schoolCollege: "all",
      studentClass: "all",
      city: "all",
      district: "all",
    });
    setSearchTerm("");
  };

  const studentHandleDownload = () => {
    window.open(
      `https://api.vedubuild.org/api/vedubuildApply/download-data`,
      "_blank"
    );
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Student List ({filteredStudents.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={studentHandleDownload}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* student upload pop up */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">
              Upload Students Excel
            </h2>

            {/* File input */}
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="border border-gray-300 rounded w-full p-2 mb-4"
            />

            {/* Upload button */}
            <button
              onClick={() => {
                if (!selectedFile) {
                  alert("Please select a file first.");
                  return;
                }
                const formData = new FormData();
                formData.append("file", selectedFile);

                applyBulk(formData)
                  .then((res) => {
                    alert("File uploaded successfully!");
                    setShowUploadModal(false);
                  })
                  .catch((err) => {
                    console.error(err);
                    alert("Error uploading file");
                  });
              }}
              className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
            >
              Upload
            </button>
          </div>
        </div>
      )}
      {/*student pop uo end here  */}

      {/* Search and Filters */}
      <div className="mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by application_id, name, mobile, or email..."
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {/* Scholarship Filter */}
          <select
            className="border border-gray-300 rounded-md py-2 px-2"
            value={filters.scholarship}
            onChange={(e) => handleFilterChange("scholarship", e.target.value)}
          >
            <option value="all">All Scholarships</option>
            {filterOptions.scholarships.map((scholarship) => (
              <option key={scholarship} value={scholarship}>
                {scholarship}
              </option>
            ))}
          </select>

          {/* School/College Filter */}
          <select
            className="border border-gray-300 rounded-md py-2 px-2"
            value={filters.schoolCollege}
            onChange={(e) =>
              handleFilterChange("schoolCollege", e.target.value)
            }
          >
            <option value="all">All Schools</option>
            {filterOptions.schools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>

          {/* Class Filter */}
          <select
            className="border border-gray-300 rounded-md py-2 px-2"
            value={filters.class}
            onChange={(e) => handleFilterChange("class", e.target.value)}
          >
            <option value="all">All Classes</option>
            {filterOptions.classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          {/* City Filter */}
          <select
            className="border border-gray-300 rounded-md py-2 px-2"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          >
            <option value="all">All Cities</option>
            {filterOptions.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* State Filter */}
          <select
            className="border border-gray-300 rounded-md py-2 px-2"
            value={filters.state}
            onChange={(e) => handleFilterChange("state", e.target.value)}
          >
            <option value="all">All States</option>
            {filterOptions.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center py-10 text-gray-600">
            Loading student data...
          </div>
        ) : (
          <table className="min-w-full table-auto text-left border-collapse">
            <thead className="bg-orange-200">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Application Id
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Mobile
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Email
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Class
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  School/College
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Board
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Aadhar No
                </th>

                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Address
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  City
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  State
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Pin Code
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Combination
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Scholarship
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 whitespace-nowrap">
                  Payment Status
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  onClick={() => handleRowClick(student)}
                  className="bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {student.aplication_id}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {student.studentName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.mobileNo}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.emailId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.studentClass}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.schoolCollege}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.boardName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.aadharNo}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.address}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.city}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.district}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.pinCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {student.combination}
                  </td>

                  {/* 🎓 Scholarship Badge */}
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      student.scholarship === "Merit-based"
                        ? "bg-green-100 text-green-800"
                        : student.scholarship === "Need-based"
                        ? "bg-blue-100 text-blue-800"
                        : student.scholarship === "Sports"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                    >
                      {student.scholarship}
                    </span>
                  </td>

                  {/* 💳 Payment Status Badge */}
                  <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                    {student.paymentStatus === "Pending" ? (
                      <button
                        onClick={(e) => handlePaymentClick(student, e)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium 
                                 text-yellow-800 hover:text-yellow-900 hover:bg-yellow-100 
                                 rounded transition-colors"
                      >
                        {student.paymentStatus}
                      </button>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          student.paymentStatus === "Success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.paymentStatus}
                      </span>
                    )}
                  </td>

                  {/* 🗑 Delete Button */}
                  <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                    <button
                      onClick={(e) => handleDeleteClick(student._id, e)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan="13"
                    className="px-4 py-8 text-center text-gray-500 text-sm"
                  >
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Payment Status Change Modal  */}
      {showPaymentModal && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Update Payment Status for {selectedStudent.studentName}
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Current Status:{" "}
                <span className="text-yellow-600 font-semibold">
                  {selectedStudent.paymentStatus}
                </span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    await handleUpdatePaymentStatus(selectedStudent._id);
                    setShowPaymentModal(false);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Mark Success
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white max-w-lg w-full rounded-md shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">Student Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {selectedStudent.studentName}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedStudent.mobileNo}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.emailId}
              </p>
              <p>
                <strong>Class:</strong> {selectedStudent.studentClass}
              </p>
              <p>
                <strong>Combination:</strong> {selectedStudent.combination}
              </p>
              <p>
                <strong>School/College:</strong> {selectedStudent.schoolCollege}
              </p>
              <p>
                <strong>Board</strong> {selectedStudent.boardName}
              </p>
              <p>
                <strong>Aadhar:</strong> {selectedStudent.aadharNo}
              </p>
              <p>
                <strong>Address:</strong> {selectedStudent.address}
              </p>
              <p>
                <strong>City:</strong> {selectedStudent.city}
              </p>
              <p>
                <strong>State:</strong> {selectedStudent.district}
              </p>
              <p>
                <strong>Pin Code:</strong> {selectedStudent.pinCode}
              </p>

              <p>
                <strong>Scholarship:</strong> {selectedStudent.scholarship}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                <span
                  className={
                    selectedStudent.paymentStatus === "Success"
                      ? "text-green-600 font-semibold"
                      : selectedStudent.paymentStatus === "Pending"
                      ? "text-red-600 font-semibold"
                      : "text-gray-600"
                  }
                >
                  {selectedStudent.paymentStatus}
                </span>
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <h3 className="mb-5 text-lg text-gray-500">
                Are you sure you want to delete this student?
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
