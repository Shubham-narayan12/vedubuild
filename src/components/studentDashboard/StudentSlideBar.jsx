import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  User,
  LogOut,
  Image,
  MessageSquare,
  GraduationCap,
  Layout,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Calendar,
  Award,
  CreditCard,
  FileText,
  ClipboardList,
  KeyRound,
  Lock,
  Unlock,
  RefreshCw,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  studentLogout,
  resetStudentPasswordOtp,
  resetStudentPassword,
} from "../../api/studentApi";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const SidebarIcon = ({ icon: Icon }) => <Icon size={20} />;

export default function StudentScholarshipSidebar() {
  const [isExamManagementOpen, setIsExamManagementOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isOtpField, setOtpField] = useState(false);
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    emailId: "",
  });

  // Mock location for demo - replace with actual useLocation in your app
  const navigate = useNavigate();

  const isActiveTab = (tab) => {
    return location.search.includes(`tab=${tab}`);
  };

  const toggleExamManagement = () => {
    setIsExamManagementOpen(!isExamManagementOpen);
  };

  const handleStudentLogout = async () => {
    try {
      const res = await studentLogout();

      if (res.status === 200) {
        logout(); // 👈 direct global state se logout
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Something went wrong during logout");
    }
  };

  const hanldeResetPasswordOtp = async () => {
    if (!formData.aplication_id) {
      toast.error("Please enter Application Id");
      return;
    }
    try {
      const response = await resetStudentPasswordOtp({
        aplication_id: formData.aplication_id.trim(),
      });
      console.log("OTP SEND", response);
      toast.success("OTP Send successfully!");
      setIsResetOpen(false);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Failed to Send OTP. Please try again.");
    }
  };
  const handleResetPassword = async () => {
    if (!formData.otp || !formData.password) {
      toast.error("Please enter Otp and Password");
      return;
    }
    // 👇 LocalStorage se emailId nikaal
    const studentApplicationId = JSON.parse(localStorage.getItem("student"));
    const Application_Id = studentApplicationId.application_id

    if (!Application_Id) {
      toast.error("No Application Id found, please login again.");
      return;
    }
    try {
      const response = await resetStudentPassword({
        aplication_id:Application_Id, // 👈 yaha se jaa raha hai
        otp: formData.otp,
        newPassword: formData.password,
      });
      console.log("OTP SEND", response);
      toast.success("Password Reset successfully!");
      setOtpField(false);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Failed to send Otp. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen mt-6 md:w-50 lg:w-60 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="flex flex-col gap-2 p-2">
        <a href="/student-dashboard?tab=prof" className="block">
          <div
            className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${
              isActiveTab("dash") ? "bg-green-200" : ""
            }`}
          >
            <SidebarIcon icon={PieChart} />
            <span className="ml-3 text-sm font-medium">Profile</span>
          </div>
        </a>

        <a href="/student-dashboard?tab=student-syllabus" className="block">
          <div
            className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${
              isActiveTab("syllabus") ? "bg-green-200" : ""
            }`}
          >
            <SidebarIcon icon={BookOpen} />
            <span className="ml-3 text-sm font-medium">Syllabus</span>
          </div>
        </a>

        <a href="/student-dashboard?tab=student-examCalender" className="block">
          <div
            className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${
              isActiveTab("exam-schedule") ? "bg-green-200" : ""
            }`}
          >
            <SidebarIcon icon={Calendar} />
            <span className="ml-3 text-sm font-medium">Exam Calender</span>
          </div>
        </a>

        <a href="/student-dashboard?tab=student-certificate" className="block">
          <div
            className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${
              isActiveTab("certificate") ? "bg-green-200" : ""
            }`}
          >
            <SidebarIcon icon={Award} />
            <span className="ml-3 text-sm font-medium">Certificate</span>
          </div>
        </a>

        <a href="/student-dashboard?tab=student-admitCard" className="block">
          <div
            className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${
              isActiveTab("admit-card") ? "bg-green-200" : ""
            }`}
          >
            <SidebarIcon icon={CreditCard} />
            <span className="ml-3 text-sm font-medium">Admit Card</span>
          </div>
        </a>
        <a href="/student-dashboard?tab=student-result" className="block">
          <div
            className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${
              isActiveTab("result") ? "bg-green-200" : ""
            }`}
          >
            <SidebarIcon icon={FileText} />
            <span className="ml-3 text-sm font-medium">Result</span>
          </div>
        </a>

        <hr className="my-4 border-gray-200" />
        <div className="mt-4">
          <div
            onClick={toggleExamManagement}
            className="flex items-center justify-between p-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer group"
          >
            <div className="flex items-center">
              <SidebarIcon icon={Settings} />
              <span className="ml-3 text-sm font-medium">Setting</span>
            </div>
            {isExamManagementOpen ? (
              <ChevronDown size={16} className="text-gray-500" />
            ) : (
              <ChevronRight size={16} className="text-gray-500" />
            )}
          </div>

          {/* Collapsible Exam Management Items */}
          {isExamManagementOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <div
                onClick={() => setIsResetOpen(true)}
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer"
              >
                <SidebarIcon icon={KeyRound} />
                <span className="ml-3 text-sm font-medium">Reset Password</span>
              </div>
              <div
                onClick={handleStudentLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
              >
                <SidebarIcon icon={LogOut} />
                <span className="ml-3 text-sm font-medium">Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reset Password Modal */}
      {isResetOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
            <input
              type="Application Id"
              placeholder="Enter your Application Id"
              value={formData.aplication_id}
              onChange={(e) =>
                setFormData({ ...formData, aplication_id: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsResetOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  hanldeResetPasswordOtp();
                  setOtpField(true);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      )}
      {isOtpField && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Reset Password</h2>

            {/* OTP Field */}
            <input
              type="text"
              placeholder="Enter your OTP"
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />

            {/* Password Field + Eye Toggle */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your New password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setOtpField(false);
                  setFormData({ emailId: "", otp: "", password: "" }); // 👈 Reset form
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
