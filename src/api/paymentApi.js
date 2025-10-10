import axios from "axios";
import axiosInstance from "./axiosInstance.js";

// ✅ Create order
export const createOrder = async (amount, studentId) => {
  return axiosInstance.post("/payment/order", { amount, studentId });
};

// ✅ Verify payment
export const verifyPayment = async (data) => {
  return axiosInstance.post("/payment/verify", data);
};