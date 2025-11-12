import { X, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { studentLogin } from "../api/studentApi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const navItems = [
    { label: t("navbar.home"), path: "/" },
    { label: t("navbar.about"), path: "/about" },
    { label: t("navbar.scholarships"), path: "/scholarships" },
    { label: t("navbar.partners"), path: "/partners" },
    { label: t("navbar.contact"), path: "/contact" },
  ];

  // Handle Student login
  const handleStudentLogin = async () => {
  if (!formData.aplication_id || !formData.password) {
    toast.error("Please enter Application Id and password");
    return;
  }
  try {
    const response = await studentLogin({
      aplication_id: formData.aplication_id.trim(), 
      password: formData.password.trim(), 
    });
    login(response.data.token);
    // localStorage.setItem("studentEmail", response.data.student.emailId);
    localStorage.setItem("student", JSON.stringify(response.data.student));
    console.log("Login successfully:", response);
    toast.success("Login successfully!");
    setIsLoginOpen(false);
  } catch (error) {
    console.error("Error in Login:", error);
    toast.error("Failed to Login. Please try again.");
  }
};

  const handleLogoClick = () => {
    navigate("/");

    // TRANSLATION
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  };

  return (
    <div className="relative z-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img
                src="/img/partners/VEDUBUILD LOGO.jpg"
                alt="Vedubuild Logo"
                className="h-14 w-auto object-contain cursor-pointer" // cursor-pointer add kiya
                onClick={handleLogoClick} // Click handler add kiya
              />

              {/* 🔽 Language Dropdown instead of EN/HI buttons */}
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                defaultValue="en"
                className="px-2 py-1 border rounded bg-white text-gray-800 text-sm hidden"
              >
                <option value="en">ENGLISH</option>
                <option value="hi">HINDI</option>
                <option value="tel">TELGU</option>
                <option value="ml">MALAYALAM</option>
                <option value="tam">TAMIL</option>
                <option value="kan">KANNAD</option>
              </select>

              <div className="text-gray-9000">
                <div id="google_translate_element"></div>
              </div>
            </div>

            {/* Desktop Links */}
            <div
              className={`hidden md:flex items-center ${
                ["en", "hi"].includes(i18n.language) ? "space-x-8" : "space-x-4"
              }`}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
        ${
          ["en", "hi"].includes(i18n.language)
            ? "text-base whitespace-nowrap"
            : "text-sm whitespace-normal break-words max-w-[120px] text-center"
        }
        font-semibold transition-colors
        ${
          isActive(item.path)
            ? "text-[#FF6B00]"
            : "text-gray-700 hover:text-[#51A545]"
        }
      `}
                >
                  {item.label.toUpperCase()}
                </Link>
              ))}

              {!isLoggedIn && (
                <button
                  onClick={() => navigate("/apply")}
                  className={`
    bg-gray-100 hover:bg-[#FF6B00] text-gray-800 hover:text-white border border-[#FF6B00] 
    px-4 py-2 rounded-md font-semibold transition-colors
    ${
      ["en", "hi"].includes(i18n.language)
        ? "text-base whitespace-nowrap" // ✅ en/hi me ek line
        : "text-sm whitespace-normal"
    }    // ✅ baki language me wrap allow
  `}
                >
                  {t("actions.applyNow")}
                </button>
              )}

              {isLoggedIn ? (
                <button
                  onClick={() => navigate("/student-dashboard")}
                  className={`bg-[#51A545] hover:bg-[#3e873c] text-white px-4 py-2 rounded-md font-semibold transition-colors ${
                    // ✅ UPDATED: Dashboard button ka font-size language ke hisaab se
                    ["en", "hi"].includes(i18n.language)
                      ? "text-base"
                      : "text-sm"
                  }`}
                >
                  {t("actions.dashboard")}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setMobileOpen(false);
                  }}
                  className={` w-full bg-[#FF6B00] hover:bg-[#e55c00] text-white px-4 py-2 rounded-md font-semibold transition-colors ${
                    // ✅ UPDATED: Login button ka font-size language ke hisaab se
                    ["en", "hi"].includes(i18n.language)
                      ? "text-base"
                      : "text-sm"
                  }`}
                >
                  {t("auth.login")}
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-gray-800"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t px-4 pt-4 pb-6 shadow-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-base font-medium ${
                  isActive(item.path)
                    ? "text-[#FF6B00]"
                    : "text-gray-700 hover:text-[#51A545]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => navigate("/apply")}
              className="bg-gray-100 hover:bg-[#FF6B00] text-gray-800 hover:text-white border border-[#FF6B00] px-4 py-2 rounded-md text-base font-semibold transition-colors"
            >
              {t("actions.applyNow")}
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/student-dashboard")}
                className="bg-[#51A545] hover:bg-[#3e873c] text-white px-4 py-2 rounded-md text-base font-semibold transition-colors"
              >
                {t("actions.dashboard")}
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setMobileOpen(false);
                }}
                className="w-full bg-[#FF6B00] hover:bg-[#e55c00] text-white px-4 py-2 rounded-md text-base font-semibold transition-colors"
              >
                {t("auth.login")}
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#3B3B3B]">
                  {t("auth.login")}
                </h3>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Id *
                  </label>
                  <input
                    type="Application Id"
                    placeholder="Application Id"
                    value={formData.aplication_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aplication_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />

                  {/* 👁️ Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-600">
                      {t("auth.rememberMe")}
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#51A545] hover:underline"
                  >
                    {t("auth.forgotPassword")}
                  </a>
                </div>
                <button
                  type="button"
                  className="w-full bg-[#FF6B00] hover:bg-[#e55c00] text-white py-2 rounded-md font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleStudentLogin();
                  }}
                >
                  {t("auth.signIn")}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
