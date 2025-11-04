import "./i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pt-10">
        {" "}
        {/* To offset fixed navbar height */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scholarships" element={<ScholarshipPage />} />
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
          {/* private route */}
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
