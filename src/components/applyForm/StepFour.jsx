// StepFour.js
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { scholarshipOptions } from "./constants";
import { useTranslation } from "react-i18next";

const StepFour = ({ formData ,setFormData}) => {
  const { t } = useTranslation();

  const selectedScholarship = scholarshipOptions.find(
    (opt) => opt.value === formData.scholarship
  );

  const fee = selectedScholarship?.fee || 0;

   React.useEffect(() => {
    setFormData((prev) => ({ ...prev, fee }));
  }, [fee, setFormData]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-6">
        <CheckCircle className="h-12 w-12 text-[#FF6B00] mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          {t("stepFour.title")}
        </h2>
        <p className="text-gray-600">{t("stepFour.subtitle")}</p>
      </div>

      {/* Info Review Section */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">{t("stepFour.studentName")}</p>
            <p className="font-semibold">{formData.studentName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("stepFour.mobileNo")}</p>
            <p className="font-semibold">{formData.mobileNo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("stepFour.emailId")}</p>
            <p className="font-semibold">{formData.emailId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {t("stepFour.studentClass")}
            </p>
            <p className="font-semibold">{formData.studentClass}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {t("stepFour.schoolCollege")}
            </p>
            <p className="font-semibold">{formData.schoolCollege}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("stepFour.aadharNo")}</p>
            <p className="font-semibold">{formData.aadharNo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("stepFour.city")}</p>
            <p className="font-semibold">{formData.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("stepFour.state")}</p>
            <p className="font-semibold">{formData.district}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t("stepFour.pinCode")}</p>
            <p className="font-semibold">{formData.pinCode}</p>
          </div>
          {formData.combination && (
            <div>
              <p className="text-sm text-gray-600">
                {t("stepFour.combination")}
              </p>
              <p className="font-semibold">{formData.combination}</p>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-600">{t("stepFour.address")}</p>
          <p className="font-semibold">{formData.address}</p>
        </div>

        {/* Program Section */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">
            {t("stepFour.selectedProgram")}
          </p>
          <p className="font-semibold text-[#FF6B00]">
            {selectedScholarship?.label}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {t("stepFour.enrollmentFee")}: {fee}
          </p>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700">
              <strong>{t("stepFour.importantNote")}</strong>{" "}
              {t("stepFour.importantMsg")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
