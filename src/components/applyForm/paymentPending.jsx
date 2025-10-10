// PaymentPendingPage.js
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentPendingPage = ({ onGoToDashboard }) => {
  const applicationId = location.state?.applicationId || "N/A";
  const navigate = useNavigate();

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Incomplete
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your application has been submitted, but your payment was not completed.
        </p>

        {/* Optional info */}
        <p className="text-gray-500 mb-6 text-sm">
         Please complete the payment to confirm your enrollment. You can contact our support team for assistance.
        </p>

        {/* Button */}
        <button
          onClick={()=>navigate("/")}
          className="w-full bg-[#FF6B00] text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
        >
         BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default PaymentPendingPage;
