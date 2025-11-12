import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentScholarshipSidebar from "../components/studentDashboard/StudentSlideBar";
import ProfileStats from "../components/studentDashboard/stats";
import StudentSyllabus from "../components/studentDashboard/syllabus";
import AdmitCard from "../components/studentDashboard/admitCard";
import Certificate from "../components/studentDashboard/certificate";
import ExamCalendar from "../components/studentDashboard/examCalender";
import Result from "../components/studentDashboard/result";
import Offer from "../components/studentDashboard/Offer";



export default function StudentDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("prof");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("prof");
    }
  }, [location.search]);

  return (
    <div className="flex min-h-screen mt-5">
      {/* Sidebar - fixed width */}
      <div className="md:w-50 lg:w-60 bg-white border-r shadow-md">
        <StudentScholarshipSidebar />
      </div>

      {/* Main content - takes remaining space */}
      <div className="flex-1 p-4 overflow-auto">
        {tab === "prof" && <ProfileStats />}
        {tab === "offer" && <Offer/>}
        {tab === "student-syllabus" && <StudentSyllabus />}
        {tab === "student-examCalender" &&<ExamCalendar/>}
        {tab === "student-admitCard" && <AdmitCard />}
        {tab === "student-result" && <Result />}
        {tab === "student-certificate" && <Certificate/>}
        {/* Add other tab content here */}
      </div>
    </div>
  );
}
