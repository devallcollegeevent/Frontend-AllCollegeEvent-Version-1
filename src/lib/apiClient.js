import api from "./axios";

// Standard API Handler
async function handleApi(promise) {
  try {
    const res = await promise;

    console.log("=====api paylod",res)
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      status: err.response?.status || 500,
    };
  }
}

/* ================================
   AUTH APIs (User )
================================ */

// SIGNUP
export const signupApi = async (data) => {
  return await handleApi(api.post("/auth/signup", data));
};

// LOGIN
export const loginApi = async (data) => {
  return await handleApi(api.post("/auth/login", data));
};

// FORGOT PASSWORD
export const forgotApi = async (data) => {
  return await handleApi(api.post("/auth/forgot-password", data));
};

// VERIFY OTP
export const verifyOtpApi = async (data) => {
  return await handleApi(api.post("/auth/verify-otp", data));
};

// RESET PASSWORD
export const resetPasswordApi = async (data) => {
  return await handleApi(api.post("/auth/reset-password", data));
};

// PROFILE
export const profileApi = async () => {
  return await handleApi(api.get("/auth/profile"));
};


/* ================================
   AUTH APIs (organizer )
================================ */

// SIGNUP
export const organizerSignupApi = async (data) => {
  // change endpoint if your backend uses different path
  return await handleApi(api.post("/auth/signup", data));
};

export const verifyEmailApi = async (token) => {
  console.log("00000",token)
  return await handleApi(
    api.get(`/auth/org/verify?token=${encodeURIComponent(token)}`)
  );
};



