import api from "./axios";

// USER + ORGANIZER
export const signupApi = (data) => api.post("/auth/signup", data);
export const loginApi = (data) => api.post("/auth/login", data);
export const forgotApi = (data) => api.post("/auth/forgot-password", data);
export const verifyOtpApi = (data) => api.post("/auth/verify-otp", data);
export const resetPasswordApi = (data) => api.post("/auth/reset-password", data);

export const profileApi = () => api.get("/auth/profile");
