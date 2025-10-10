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
import { useTranslation } from "react-i18next";

const StepOne = ({ formData, errors, handleInputChange }) => {
  const { t } = useTranslation();
  const [showPhoneOtpField, setPhoneShowOtpField] = useState(false);
  const [showEmailOtpField, setPhoneEmailOtpField] = useState(false);
  const [showPhoneVerified, setShowPhoneVerified] = useState(false);
  const [showEmailVerified, setShowEmailVerified] = useState(false);

  // Send Phone OTP
  const handleSendOtp = async () => {
    if (!formData.mobileNo || formData.mobileNo.length !== 10) {
      toast.error(t("stepOne.mobileNo.error"));
      return;
    }
    try {
      await sendPhoneOtp({ mobileNo: formData.mobileNo });
      toast.success(t("stepOne.mobileNo.sendOtp") + " ✔️");
      setPhoneShowOtpField(true);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // Send Email OTP
  const handleSendEmailOtp = async () => {
    if (!formData.emailId) {
      toast.error(t("stepOne.emailId.error"));
      return;
    }
    try {
      await sendEmailOtp({ emailId: formData.emailId });
      toast.success(t("stepOne.emailId.sendOtp") + " ✔️");
      setPhoneEmailOtpField(true);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // Verify Phone OTP
  const handleVerifyPhoneOtp = async () => {
    if (!formData.phoneOtp) {
      toast.error(t("stepOne.mobileNo.otpLabel"));
      return;
    }
    try {
      await verifyPhoneOtp({
        otp: formData.phoneOtp,
        mobileNo: formData.mobileNo,
      });
      toast.success("Verified Phone!");
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
      toast.error(t("stepOne.emailId.otpLabel"));
      return;
    }
    try {
      await verifyEmailOtp({
        otp: formData.emailOtp,
        emailId: formData.emailId,
      });
      toast.success("Verified Email!");
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
          {t("stepOne.title")}
        </h2>
        <p className="text-gray-600">{t("stepOne.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepOne.studentName.label")}
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
              placeholder={t("stepOne.studentName.placeholder")}
            />
          </div>
          {errors.studentName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("stepOne.studentName.error")}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepOne.mobileNo.label")}
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
                placeholder={t("stepOne.mobileNo.placeholder")}
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
                    {t("stepOne.mobileNo.otpLabel")}
                  </label>
                  <input
                    type="text"
                    value={formData.phoneOtp}
                    onChange={(e) =>
                      handleInputChange("phoneOtp", e.target.value)
                    }
                    className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                    placeholder={t("stepOne.mobileNo.otpPlaceholder")}
                    maxLength="6"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleVerifyPhoneOtp}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {t("stepOne.mobileNo.verify")}
                  </button>
                </div>
              </div>
            )}
          </div>
          {errors.mobileNo && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("stepOne.mobileNo.error")}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepOne.emailId.label")}
          </label>
          <div className="relative flex items-center gap-2">
            <Mail className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="email"
              value={formData.emailId}
              onChange={(e) => handleInputChange("emailId", e.target.value)}
              className={`flex-1 pl-10 pr-28 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.emailId ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("stepOne.emailId.placeholder")}
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
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("stepOne.emailId.otpLabel")}
                </label>
                <input
                  type="text"
                  value={formData.emailOtp}
                  onChange={(e) =>
                    handleInputChange("emailOtp", e.target.value)
                  }
                  className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  placeholder={t("stepOne.emailId.otpPlaceholder")}
                  maxLength="6"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyEmailOtp}
                className="mt-7 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t("stepOne.emailId.verify")}
              </button>
            </div>
          )}
          {errors.emailId && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("stepOne.emailId.error")}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepOne.address.label")}
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
              placeholder={t("stepOne.address.placeholder")}
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("stepOne.address.error")}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepOne.city.label")}
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
              placeholder={t("stepOne.city.placeholder")}
            />
          </div>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("stepOne.city.error")}
            </p>
          )}
        </div>

        {/* State / District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepOne.district.label")}
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
              placeholder={t("stepOne.district.placeholder")}
            />
          </div>
          {errors.district && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("stepOne.district.error")}
            </p>
          )}
        </div>

        {/* PIN Code */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepOne.pinCode.label")}
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
              placeholder={t("stepOne.pinCode.placeholder")}
              maxLength="6"
            />
          </div>
          {errors.pinCode && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {t("stepOne.pinCode.error")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
