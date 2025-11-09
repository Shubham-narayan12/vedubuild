// studentService.js
import axiosInstance from "./axiosInstance";

export const applyBulk = (formData) => {
  return axiosInstance.post("/vedubuildApply/bulk-apply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const sendPhoneOtp = (data) => {
  return axiosInstance.post("/otp/request-phone-otp", data, {
    responseType: "blob",
  });
};

export const verifyPhoneOtp = (data) => {
  return axiosInstance.post("/otp/verify-phone-otp", data, {
    responseType: "blob",
  });
};

export const sendEmailOtp = (data) => {
  return axiosInstance.post("/otp/request-email-otp", data, {
    responseType: "blob",
  });
};
export const verifyEmailOtp = (data) => {
  return axiosInstance.post("/otp/verify-email-otp", data, {
    responseType: "blob",
  });
};

export const addStudentData = (data) => {
  return axiosInstance.post("/vedubuildApply/apply", data);
};

export const getAllStudentData = () => {
  return axiosInstance.get("/vedubuildApply/get-allstudents-data");
};

export const studentLogin = (credentials) => {
  return axiosInstance.post("/vedubuildApply/login", credentials);
};

export const studentLogout = () => {
  return axiosInstance.get("/vedubuildApply/logout");
};

export const getStudentProfile = () => {
  const token = localStorage.getItem("token"); // JWT token
  return axiosInstance.get("/vedubuildApply/get-student-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const resetStudentPasswordOtp = (emailId) => {
  return axiosInstance.post("/vedubuildApply/request-otp", emailId, {
    responseType: "blob",
  });
};
export const resetStudentPassword = (formData) => {
  return axiosInstance.post("/vedubuildApply/reset-password", formData, {
    responseType: "blob",
  });
};

export const totalStudents = () => {
  return axiosInstance.get("/vedubuildApply/total-students");
};


export const sendCredentials = (studentId)=>{
  return axiosInstance.post(`/vedubuildApply/${studentId}/send-credentials`)
};

export const updatePaymentStatus = (id)=>{
  return axiosInstance.post(`/vedubuildApply/update-payment-status/${id}`)
}

export const deleteStudent = (id)=>{
  return axiosInstance.delete(`/vedubuildApply/${id}`)
}
