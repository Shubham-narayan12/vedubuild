// StepOne.js
import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  sendPhoneOtp,
  sendEmailOtp,
  verifyPhoneOtp,
  verifyEmailOtp,
} from "../../api/studentApi.js";
import toast from "react-hot-toast";

const StepOne = ({ formData, errors, handleInputChange }) => {
  const [showPhoneOtpField, setPhoneShowOtpField] = useState(false);
  const [showEmailOtpField, setPhoneEmailOtpField] = useState(false);
  const [showPhoneVerified, setShowPhoneVerified] = useState(false);
  const [showEmailVerified, setShowEmailVerified] = useState(false);

  // Send Phone OTP
  const handleSendOtp = async () => {
    if (!formData.mobileNo || formData.mobileNo.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      await sendPhoneOtp({ mobileNo: formData.mobileNo });
      toast.success("OTP sent successfully! ✔️");
      setPhoneShowOtpField(true);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // Send Email OTP
  const handleSendEmailOtp = async () => {
    if (!formData.emailId) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      await sendEmailOtp({ emailId: formData.emailId });
      toast.success("OTP sent successfully! ✔️");
      setPhoneEmailOtpField(true);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // Verify Phone OTP
  const handleVerifyPhoneOtp = async () => {
    if (!formData.phoneOtp) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      await verifyPhoneOtp({
        otp: formData.phoneOtp,
        mobileNo: formData.mobileNo,
      });
      toast.success("Phone Verified!");
      handleInputChange("isPhoneVerified", true);
      setPhoneShowOtpField(false);
      setShowPhoneVerified(true);
    } catch {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  // Verify Email OTP
  const handleVerifyEmailOtp = async () => {
    if (!formData.emailOtp) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      await verifyEmailOtp({
        otp: formData.emailOtp,
        emailId: formData.emailId,
      });
      toast.success("Email Verified!");
      handleInputChange("isEmailVerified", true);
      setPhoneEmailOtpField(false);
      setShowEmailVerified(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-6">
        <User className="h-12 w-12 text-[#FF6B00] mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h2>
        <p className="text-gray-600">Enter your basic details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => handleInputChange("studentName", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.studentName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter student name"
            />
          </div>
          {errors.studentName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Student name is required
            </p>
          )}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father's Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.fatherName}
              onChange={(e) => handleInputChange("fatherName", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.fatherName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter father's name"
            />
          </div>
          {errors.fatherName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Father's name is required
            </p>
          )}
        </div>

        {/* Email and Mobile Number in same row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="email"
              value={formData.emailId}
              onChange={(e) => handleInputChange("emailId", e.target.value)}
              className={`flex-1 pl-10 pr-28 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.emailId ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {showEmailVerified ? (
              <div className="absolute right-3 flex items-center gap-1 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Verified</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSendEmailOtp}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 cursor-pointer bg-[#FF6B00] text-white text-sm rounded-lg hover:bg-orange-600"
              >
                Send OTP
              </button>
            )}
          </div>

          {/* Email OTP */}
          {showEmailOtpField && (
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email OTP
                </label>
                <input
                  type="text"
                  value={formData.emailOtp}
                  onChange={(e) =>
                    handleInputChange("emailOtp", e.target.value)
                  }
                  className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  placeholder="Enter OTP"
                  maxLength="6"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyEmailOtp}
                className="mt-7 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Verify
              </button>
            </div>
          )}
          {errors.emailId && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Please enter a valid email address
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <div className="space-y-3">
            <div className="relative flex items-center">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={formData.mobileNo}
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                className={`flex-1 pl-10 pr-20 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                  errors.mobileNo ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter mobile number"
                maxLength="10"
              />
              {showPhoneVerified ? (
                <div className="absolute right-3 flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="absolute right-2 px-3 py-1 bg-[#FF6B00] text-white cursor-pointer text-sm rounded-lg hover:bg-orange-600"
                >
                  Send OTP
                </button>
              )}
            </div>

            {/* Phone OTP */}
            {showPhoneOtpField && (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile OTP
                  </label>
                  <input
                    type="text"
                    value={formData.phoneOtp}
                    onChange={(e) =>
                      handleInputChange("phoneOtp", e.target.value)
                    }
                    className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    placeholder="Enter OTP"
                    maxLength="6"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleVerifyPhoneOtp}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>
          {errors.mobileNo && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Please enter a valid 10-digit mobile number
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
              placeholder="Enter your complete address"
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Address is required
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter city"
            />
          </div>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              City is required
            </p>
          )}
        </div>

        {/* State / District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.district}
              onChange={(e) => handleInputChange("district", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.district ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter district"
            />
          </div>
          {errors.district && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              District is required
            </p>
          )}
        </div>

        {/* PIN Code */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) => handleInputChange("pinCode", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.pinCode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter PIN code"
              maxLength="6"
            />
          </div>
          {errors.pinCode && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Please enter a valid PIN code
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;