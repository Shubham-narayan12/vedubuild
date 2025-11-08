import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    PieChart,
    User,
    LogOut,
    Image,
    MessageSquare,
    GraduationCap,
    ChevronDown,
    ChevronRight,
    BookOpen,
    Calendar,
    Award,
    CreditCard,
    FileText,
    ClipboardList
} from "lucide-react";
import toast from "react-hot-toast";
import { logoutUser } from "../../api/authApi";

const SidebarIcon = ({ icon: Icon }) => <Icon size={20} />;

export default function ScholarshipSidebar() {
    const [isExamManagementOpen, setIsExamManagementOpen] = useState(false);
    const navigate = useNavigate();

    const isActiveTab = (tab) => {
        return location.search.includes(`tab=${tab}`);
    };

    const toggleExamManagement = () => {
        setIsExamManagementOpen(!isExamManagementOpen);
    };

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res.status === 200) {
                localStorage.removeItem("isLoggedIn");
                toast.success("Logged out successfully");
                navigate("/login");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Something went wrong during logout");
        }
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto h-screen fixed left-0 top-0 z-50">
            {/* Admin Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
                <div className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="bg-green-600 text-white p-1 rounded mr-2">AD</span>
                    <span>Admin</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-4">
                <a href="/dashboard?tab=dash" className="block">
                    <div className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("dash") ? "bg-green-200" : ""}`}>
                        <SidebarIcon icon={PieChart} />
                        <span className="ml-3 text-sm font-medium">Dashboard</span>
                    </div>
                </a>

                <a href="/dashboard?tab=banner" className="block">
                    <div className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("banner") ? "bg-green-200" : ""}`}>
                        <SidebarIcon icon={Image} />
                        <span className="ml-3 text-sm font-medium">Banner</span>
                    </div>
                </a>

                <a href="/dashboard?tab=enquiries" className="block">
                    <div className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("enquiries") ? "bg-green-200" : ""}`}>
                        <SidebarIcon icon={MessageSquare} />
                        <span className="ml-3 text-sm font-medium">Enquiries</span>
                    </div>
                </a>

                <a href="/dashboard?tab=students" className="block">
                    <div className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("students") ? "bg-green-200" : ""}`}>
                        <SidebarIcon icon={GraduationCap} />
                        <span className="ml-3 text-sm font-medium">Students</span>
                    </div>
                </a>

                <a href="/dashboard?tab=events" className="block">
                    <div className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("events") ? "bg-green-200" : ""}`}>
                        <SidebarIcon icon={Calendar} />
                        <span className="ml-3 text-sm font-medium">Event Management</span>
                    </div>
                </a>

                {/* Exam Management Section */}
                <div className="mt-2">
                    <div
                        onClick={toggleExamManagement}
                        className="flex items-center justify-between p-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer group"
                    >
                        <div className="flex items-center">
                            <SidebarIcon icon={ClipboardList} />
                            <span className="ml-3 text-sm font-medium">Exam Management</span>
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
                            <a href="/dashboard?tab=syllabus" className="block">
                                <div className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("syllabus") ? "bg-green-200" : ""}`}>
                                    <SidebarIcon icon={BookOpen} />
                                    <span className="ml-3 text-sm font-medium">Syllabus</span>
                                </div>
                            </a>

                            <a href="/dashboard?tab=exam-schedule" className="block">
                                <div className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("exam-schedule") ? "bg-green-200" : ""}`}>
                                    <SidebarIcon icon={Calendar} />
                                    <span className="ml-3 text-sm font-medium">Exam Schedule</span>
                                </div>
                            </a>

                            <a href="/dashboard?tab=certificate" className="block">
                                <div className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("certificate") ? "bg-green-200" : ""}`}>
                                    <SidebarIcon icon={Award} />
                                    <span className="ml-3 text-sm font-medium">Certificate</span>
                                </div>
                            </a>

                            <a href="/dashboard?tab=admit-card" className="block">
                                <div className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("admit-card") ? "bg-green-200" : ""}`}>
                                    <SidebarIcon icon={CreditCard} />
                                    <span className="ml-3 text-sm font-medium">Admit Card</span>
                                </div>
                            </a>

                            <a href="/dashboard?tab=result" className="block">
                                <div className={`flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group cursor-pointer ${isActiveTab("result") ? "bg-green-200" : ""}`}>
                                    <SidebarIcon icon={FileText} />
                                    <span className="ml-3 text-sm font-medium">Result</span>
                                </div>
                            </a>
                        </div>
                    )}
                </div>

                <hr className="my-4 border-gray-200" />

                <div
                    onClick={handleLogout}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                >
                    <SidebarIcon icon={LogOut} />
                    <span className="ml-3 text-sm font-medium">Sign Out</span>
                </div>
            </div>
        </div>
    );
}