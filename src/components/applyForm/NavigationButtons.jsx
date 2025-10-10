// NavigationButtons.js
import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { addStudentData, sendCredentials } from "../../api/studentApi.js";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "../../api/paymentApi.js";
import { toast } from "react-toastify";
import { useState } from "react";

const NavigationButtons = ({
  currentStep,
  onPrevious,
  onNext,
  onSubmit,
  formData,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleAddStudentData = async () => {
    if (!formData) {
      alert("Please enter data");
      return;
    }
    try {
      const response = await addStudentData(formData);
      console.log("Apply successfully:", response);
      // alert("Apply successfully!");
      return response;
    } catch (error) {
      console.error("Error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    }
  };

  // ✅ RAZORPAY PAYMENT FLOW
  const handlePayment = async (studentId) => {
    try {
      // 1️⃣ create order on backend
      const cleanFee = Number(formData.fee.replace(/[^0-9]/g, ""));
      const { data } = await createOrder(cleanFee, studentId);
      const { order } = data;

      // 2️⃣ open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "VeduBuild",
        description: "Student Application Fee",
        order_id: order.id,
        handler: async function (response) {
          // 3️⃣ verify payment on backend
          const verifyRes = await verifyPayment(response);
          setLoading(false);
          if (verifyRes.data.success) {
            alert("Payment Successful and Apply successfully! 🎉");
            onSubmit(); // move to next step / dashboard
            await sendCredentials(studentId);
          } else {
            alert("Payment verification failed ❌");
          }
        },
        prefill: {
          name: formData.studentName,
          email: formData.emailId,
          contact: formData.mobileNo,
        },
        theme: { color: "#FF6B00" },

        // ✅ handle popup close (payment incomplete)
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed by user");
            // Redirect to a page showing payment pending message
            navigate("/payment-pending")
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="flex justify-between pt-8">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`flex items-center px-6 py-3 rounded-lg font-medium transition ${
          currentStep === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        <ChevronLeft className="h-5 w-5 mr-2" />
        Previous
      </button>

      {currentStep < 4 ? (
        <button
          onClick={onNext}
          className="flex items-center px-6 py-3 bg-[#FF6B00] text-white rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Next
          <ChevronRight className="h-5 w-5 ml-2" />
        </button>
      ) : (
        <button
          onClick={async () => {
            if (loading) return; // ✅ prevent double clicks
            setLoading(true); // ✅ start loader
            const studentRes = await handleAddStudentData();
            if (studentRes?.data?.student?._id) {
              await handlePayment(studentRes.data.student._id);
            } else {
              toast.error("Student ID not found! Payment cannot proceed.");
              setLoading(false);
            }
          }}
          disabled={loading} // ✅ disable button while loading
          className={`flex items-center px-8 py-3 rounded-lg font-medium transition ${
            loading
              ? "bg-green-400 text-white cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Pay and Submit
              <CheckCircle className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
