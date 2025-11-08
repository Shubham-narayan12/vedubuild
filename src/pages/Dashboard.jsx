import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScholarshipSidebar from "../components/dashboard/Sidebar";
import StudentCardTable from "../components/dashboard/Students";
import EnquiryTable from "../components/dashboard/Enquiry";
import ImageUploader from "../components/dashboard/ImageUploader";
import Stats from "../components/dashboard/Stats";
import Syllabus from "../components/dashboard/Syllabus";
import ExamSchedule from "../components/dashboard/ExamSchedule";
import AdmitCard from "../components/dashboard/AdmitCard";
import Events from "../components/dashboard/Events";
import AdminHeader from "../components/dashboard/AdminHeader";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dash");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("dash");
    }
  }, [location.search]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Completely Fixed (No Slider) */}
      <div className="w-60 bg-white border-r shadow-md fixed left-0 top-0 h-screen overflow-y-auto z-50">
        <ScholarshipSidebar />
      </div>

      {/* Main content - with left margin for sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Sticky Header */}
        <AdminHeader />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="flex-1 p-5 overflow-auto ml-60">
            {tab === "dash" && <Stats />}
            {tab === "banner" && <ImageUploader />}
            {tab === "students" && <StudentCardTable />}
            {tab === "events" && <Events />}
            {tab === "enquiries" && <EnquiryTable />}
            {tab === "syllabus" && <Syllabus />}
            {tab === "exam-schedule" && <ExamSchedule />}
            {tab === "admit-card" && <AdmitCard />}
            {/* Add other tab content here */}
          </div>
        </main>
      </div>
    </div>
  );
}
