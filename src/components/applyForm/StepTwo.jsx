import React from "react";
import {
  GraduationCap,
  School,
  CreditCard,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { formatAadhar } from "./validators";
import { useTranslation } from "react-i18next";

const boards = [
  "CBSE",
  "ICSE",
  "Andhra Pradesh Board",
  "Arunachal Pradesh Board",
  "Assam Board",
  "Bihar Board",
  "Chhattisgarh Board",
  "Goa Board",
  "Gujarat Board",
  "Haryana Board",
  "Himachal Pradesh Board",
  "Jharkhand Board",
  "Karnataka Board",
  "Kerala Board",
  "Madhya Pradesh Board",
  "Maharashtra Board",
  "Manipur Board",
  "Meghalaya Board",
  "Mizoram Board",
  "Nagaland Board",
  "Odisha Board",
  "Punjab Board",
  "Rajasthan Board",
  "Sikkim Board",
  "Tamil Nadu Board",
  "Telangana Board",
  "Tripura Board",
  "Uttar Pradesh Board",
  "Uttarakhand Board",
  "West Bengal Board",
];

const StepTwo = ({ formData, errors, handleInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-6">
        <GraduationCap className="h-12 w-12 text-[#FF6B00] mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          {t("stepTwo.title")}
        </h2>
        <p className="text-gray-600">{t("stepTwo.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* School/College Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepTwo.schoolCollegeLabel")}
          </label>
          <div className="relative">
            <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.schoolCollege}
              onChange={(e) =>
                handleInputChange("schoolCollege", e.target.value)
              }
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.schoolCollege ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("stepTwo.schoolCollegePlaceholder")}
            />
          </div>
          {errors.schoolCollege && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.schoolCollege}
            </p>
          )}
        </div>

        {/* Board Name Dropdown */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Board Name *
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={formData.boardName || ""}
              onChange={(e) => handleInputChange("boardName", e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.boardName ? "border-red-500" : "border-gray-300"
              }`}
              style={{ maxHeight: "200px", overflowY: "auto" }} // ✅ limit height
            >
              <option value="">Select Board</option>
              {boards.map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
          </div>

          {errors.boardName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.boardName}
            </p>
          )}
        </div>

        {/* Aadhar Number */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("stepTwo.aadharLabel")}
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.aadharNo}
              onChange={(e) =>
                handleInputChange("aadharNo", formatAadhar(e.target.value))
              }
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                errors.aadharNo ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("stepTwo.aadharPlaceholder")}
              maxLength="14"
            />
          </div>
          {errors.aadharNo && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.aadharNo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
