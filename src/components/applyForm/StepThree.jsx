// StepThree.js
import React from "react";
import { Award, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  scholarshipOptions,
  classOptions,
  combinationOptions,
} from "./constants";

const StepThree = ({ formData, errors, handleInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-6">
        <Award className="h-12 w-12 text-[#FF6B00] mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          {t("stepThree.title")}
        </h2>
        <p className="text-gray-600">{t("stepThree.subtitle")}</p>
      </div>

      {/* Scholarship Program */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t("stepThree.scholarshipLabel")} *
          </label>
          <div className="grid gap-4">
            {scholarshipOptions.map((option) => (
              <div
                key={option.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.scholarship === option.value
                    ? "border-[#FF6B00] bg-orange-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleInputChange("scholarship", option.value)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        formData.scholarship === option.value
                          ? "border-[#FF6B00] bg-[#FF6B00]"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.scholarship === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t("stepThree.target")}: {option.target}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#FF6B00]">{option.fee}</p>
                    <p className="text-xs text-gray-500">
                      {t("stepThree.enrollmentFee")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.scholarship && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.scholarship}
            </p>
          )}
        </div>

        {/* Student Class */}
        {formData.scholarship && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("stepThree.studentClassLabel")} *
              </label>
              <select
                value={formData.studentClass}
                onChange={(e) =>
                  handleInputChange("studentClass", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                  errors.class ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">
                  {t("stepThree.studentClassPlaceholder")}
                </option>
                {classOptions[formData.scholarship]?.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              {errors.studentClass && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.studentClass}
                </p>
              )}
            </div>

            {/* Subject Combination */}
            {formData.scholarship === "vstar" && formData.studentClass && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("stepThree.combinationLabel")} *
                </label>
                <select
                  value={formData.combination}
                  onChange={(e) =>
                    handleInputChange("combination", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent ${
                    errors.combination ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">
                    {t("stepThree.combinationPlaceholder")}
                  </option>

                  {/* ✅ Only show combinations based on selected stream */}
                  {(() => {
                    let stream = "";
                    if (formData.studentClass.includes("Arts")) stream = "Arts";
                    else if (formData.studentClass.includes("Commerce"))
                      stream = "Commerce";
                    else if (formData.studentClass.includes("Science"))
                      stream = "Science";

                    return combinationOptions[stream]?.map((combo) => (
                      <option key={combo} value={combo}>
                        {combo}
                      </option>
                    ));
                  })()}
                </select>

                {errors.combination && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.combination}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepThree;
