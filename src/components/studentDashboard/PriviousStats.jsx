import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  IdCard,
  Lock,
  Award,
  BookOpen,
} from "lucide-react";

export default function ProfileStats({ student }) {
  const studentData = JSON.parse(localStorage.getItem("student"));

  const fields = [
    {
      label: "Application ID",
      value: studentData.application_id,
      icon: IdCard,
    },
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
    <div className="min-h-screen mt-5">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white flex flex-col md:flex-row items-center md:items-end justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
              {studentData?.profileImage? (
                <img
                  src={`http://localhost:8000/api/vedubuildApply/image/${studentData.emailId}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-green-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{studentData.studentName}</h1>
              <p className="text-green-100">
                Application ID: {studentData.application_id}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div
                key={index}
                className="flex items-center bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{field.label}</p>
                  <p className="text-base font-semibold text-gray-900">
                    {field.value}
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

