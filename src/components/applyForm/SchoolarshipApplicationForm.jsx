import React, { useState } from "react";
import { initialFormData, steps } from "./constants";
import { validateStep } from "./validators";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import SuccessPage from "./SuccessPage";
import ProgressBar from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";

export default function ScholarshipApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Clear class and combination when scholarship changes
    if (field === "scholarship") {
      setFormData((prev) => ({ ...prev, studentClass: "", combination: "" }));
    }

    // Clear combination when class changes
    if (field === "studentClass") {
      setFormData((prev) => ({ ...prev, combination: "" }));
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    const stepErrors = validateStep(3, formData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Form submitted:", formData);
    }
  };

  const handleNewApplication = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData(initialFormData);
    setErrors({});
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <StepTwo
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <StepThree
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return <StepFour formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <SuccessPage onNewApplication={handleNewApplication} />;
  }

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Scholarship Application Form
          </h1>
          <p className="text-gray-600">
            Apply for Vedubuild Educational Excellence Programs
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} steps={steps} />

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <NavigationButtons
            formData={formData}
            currentStep={currentStep}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
