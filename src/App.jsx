import "./i18n";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DetailedScholarshipPage from "./pages/ScholarshipDetail";
import { ScholarshipPage } from "./pages/ScholarshipPage";
import ScholarshipApplicationForm from "./pages/ApplyForm";
import PartnerPage from "./pages/PartnerPage";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Privacy_Policy from "./pages/Privacy_Policy";
import RefundPolicy from "./pages/RefundPolicy";
import TermAndCondition from "./pages/TermAndCondition";
import { Toaster } from "react-hot-toast";
import StudentDashboard from "./pages/StudentDasboard";
import PaymentPendingPage from "./components/applyForm/paymentPending";
import EventPage from "./pages/EventPage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";

// Main App component
function AppContent() {
  const location = useLocation();
  
  const isAdminPage = (pathname) => {
    return pathname.startsWith("/dashboard");
  };

  const shouldShowNavbarFooter = !isAdminPage(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Conditionally render Navbar */}
      {shouldShowNavbarFooter && (
        <div className="pt-10">
          <Navbar />
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scholarships" element={<ScholarshipPage />} />
        <Route path="/blog" element={<BlogPage/>} />
        <Route path="/blogdetails" element={<BlogDetails/>} />
        <Route path="/payment-pending" element={<PaymentPendingPage />} />
        <Route
          path="/scholarship/:id"
          element={<DetailedScholarshipPage />}
        />
        <Route path="/apply" element={<ScholarshipApplicationForm />} />
        <Route path="/partners" element={<PartnerPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/privacy-policy" element={<Privacy_Policy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        
        {/* Dashboard route - yahan navbar/footer show nahi hoga */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Conditionally render Footer */}
      {shouldShowNavbarFooter && <Footer />}
    </div>
  );
}

// App wrapper with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;