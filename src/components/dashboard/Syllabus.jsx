import React, { useState, useEffect } from "react";
import { syllabusUpload, getAllSyllabus } from "../../api/authApi";
import toast from "react-hot-toast";

const combinationOptions = {
  Arts: [
    "History, Economics, Political Science",
    "History, Economics, Sociology",
    "History, Psychology, Sociology",
    "Other Arts Combination",
  ],
  Commerce: [
    "Accountancy, Business Studies, Economics",
    "Accountancy, Business Studies, Computer Science",
    "Other Commerce Combination",
  ],
  Science: [
    "Physics, Chemistry, Mathematics",
    "Physics, Chemistry, Biology",
    "Physics, Chemistry, Computer Science",
    "Other Science Combination",
  ],
};

const Syllabus = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [studentClass, setStudentClass] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [combination, setCombination] = useState("");
  const [loading, setLoading] = useState(false);
  const [syllabusList, setSyllabusList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchSyllabus = async () => {
      try {
        const res = await getAllSyllabus();
        if (isMounted) {
          setSyllabusList(res.data.syllabuses || []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load syllabus list");
      }
    };
    fetchSyllabus();

    return () => {
      isMounted = false;
    };
  }, []);

  // Reset studentClass and combination when scholarship changes
  useEffect(() => {
    setStudentClass("");
    setCombination("");
  }, [scholarship]);

  // Reset combination when studentClass changes
  useEffect(() => {
    setCombination("");
  }, [studentClass]);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedPdf(file);
    } else {
      alert("Please select a valid PDF file!");
    }
  };

  const handleUploadSyllabus = async () => {
    if (!studentClass || !scholarship || !selectedPdf) {
      alert("Please enter all required fields and select a PDF file!");
      return;
    }
    if (scholarship === "V-STAR" && !combination) {
      alert("Please select a subject combination!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("studentClass", studentClass);
      formData.append("scholarship", scholarship);
      formData.append("file", selectedPdf);
      if (scholarship === "V-STAR") {
        formData.append("combination", combination);
      }

      let res = await syllabusUpload(formData);
      toast.success("Syllabus uploaded successfully!");
      setStudentClass("");
      setScholarship("");
      setCombination("");
      setSelectedPdf(null);

      res = await getAllSyllabus();
      setSyllabusList(res.data.syllabuses);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  // Define class options based on scholarship
  const classOptions = scholarship === "VEES"
    ? ["5th", "6th", "7th", "8th", "9th", "10th"]
    : scholarship === "V-STAR"
    ? ["12th/PUC - Arts", "12th/PUC - Commerce", "12th/PUC - Science"]
    : [];

  // Define combination options based on studentClass
  const getCombinationOptions = () => {
    if (scholarship !== "V-STAR") return [];
    if (studentClass === "12th/PUC - Arts") return combinationOptions.Arts;
    if (studentClass === "12th/PUC - Commerce") return combinationOptions.Commerce;
    if (studentClass === "12th/PUC - Science") return combinationOptions.Science;
    return [];
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto p-4 mt-8 border rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload Syllabus
        </h2>

        {/* Scholarship Dropdown */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scholarship
        </label>
        <select
          value={scholarship}
          onChange={(e) => setScholarship(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
        >
          <option value="">-- Select Scholarship --</option>
          <option value="VEES">VEES</option>
          <option value="V-STAR">V-STAR</option>
        </select>

        {/* Student Class Dropdown */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Student Class
        </label>
        <select
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          disabled={!scholarship}
        >
          <option value="">-- Select Class --</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {/* Combination Dropdown (only for V-STAR) */}
        {scholarship === "V-STAR" && studentClass && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Combination
            </label>
            <select
              value={combination}
              onChange={(e) => setCombination(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              disabled={!studentClass}
            >
              <option value="">-- Select Combination --</option>
              {getCombinationOptions().map((comb) => (
                <option key={comb} value={comb}>
                  {comb}
                </option>
              ))}
            </select>
          </>
        )}

        {/* PDF Upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-[#FF6B00] file:text-white
                   hover:file:bg-[#e55c00]"
        />

        {/* Selected File Info */}
        {selectedPdf && (
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-1">
              📄 File Selected: <b>{selectedPdf.name}</b>
            </p>
            <a
              href={URL.createObjectURL(selectedPdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B00] hover:underline"
            >
              Open PDF
            </a>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUploadSyllabus}
          disabled={loading}
          className="mt-4 w-full py-2 rounded-md bg-[#FF6B00] text-white font-semibold hover:bg-[#e55c00] disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Syllabus"}
        </button>
      </div>
      {/* List of Syllabus */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Uploaded Syllabus
      </h3>
      {syllabusList.length === 0 ? (
        <p className="text-gray-500 text-sm">No syllabus uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {syllabusList.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  Class: {item.studentClass}
                </p>
                <p className="text-sm text-gray-600">
                  Scholarship: {item.scholarship}
                </p>
                {item.combination && (
                  <p className="text-sm text-gray-600">
                    Combination: {item.combination}
                  </p>
                )}
              </div>
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FF6B00] text-white rounded-md font-medium hover:bg-[#e55c00]"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Syllabus;