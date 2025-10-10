import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  IdCard,
  Award,
  BookOpen,
} from "lucide-react";

export default function ProfileStats() {
  const studentData = JSON.parse(localStorage.getItem("student"));

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 font-semibold">
          No student data found. Please log in.
        </p>
      </div>
    );
  }

  const fields = [
    { label: "Application ID", value: studentData.application_id, icon: IdCard },
    { label: "Student Name", value: studentData.studentName, icon: User },
    { label: "Mobile No", value: studentData.mobileNo, icon: Phone },
    { label: "Email ID", value: studentData.emailId, icon: Mail },
    { label: "Address", value: studentData.address, icon: Home },
    { label: "City", value: studentData.city, icon: MapPin },
    { label: "District", value: studentData.district, icon: MapPin },
    { label: "Pin Code", value: studentData.pinCode, icon: MapPin },
    {
      label: "School / College",
      value: studentData.schoolCollege,
      icon: BookOpen,
    },
    { label: "Scholarship", value: studentData.scholarship, icon: Award },
    { label: "Class", value: studentData.studentClass, icon: BookOpen },
    { label: "Combination", value: studentData.combination, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Profile Header - Light Green Gradient */}
        <div className="relative p-8 md:p-10 text-white bg-gradient-to-br from-green-400 to-emerald-500">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between">
            <div className="flex items-center space-x-5">
              {/* Profile Image with Shadow Ring */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center ring-4 ring-white/30">
                {studentData?.profileImage ? (
                  <img
                    src={`http://localhost:8000/api/vedubuildApply/image/${studentData.emailId}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg">
                  {studentData.studentName}
                </h1>
                <p className="text-green-50 text-sm md:text-lg break-words drop-shadow-md">
                  Application ID:{" "}
                  <span className="font-semibold text-white">
                    {studentData.application_id}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div
                key={index}
                className="flex items-start bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="p-3 rounded-xl mr-4 flex-shrink-0 bg-gradient-to-tr from-green-300 to-emerald-400 text-white shadow-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-500">
                    {field.label}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 break-words truncate md:whitespace-normal">
                    {field.value || "--"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}