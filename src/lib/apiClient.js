import api from "./axios";

// Standard API Handler
async function handleApi(promise) {
  try {
    console.log("======lplp",promise)
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

export const signupApi = async (data) => {
  console.log("0000",data)
  return await handleApi(api.post("/auth/signup", data));
};

export const loginApi = async (data) => {
  return await handleApi(api.post("/auth/login", data));
};
export const googleAthuLoginApi = async (data) => {
  return await handleApi(api.post("/auth/google-login", data));
};

export const forgotApi = async (data) => {
  return await handleApi(api.post("/auth/forgot-password", data));
};

export const verifyOtpApi = async (data) => {
  return await handleApi(api.post("/auth/verify-otp", data));
};

export const resendOtpApi = async (data) => {
  return await handleApi(api.post("/auth/resend-otp", data));
};

export const resetPasswordApi = async (data) => {
  return await handleApi(api.post("/auth/reset-password", data));
};

export const profileApi = async () => {
  return await handleApi(api.get("/auth/profile"));
};


/* ================================
   AUTH APIs (organizer )
================================ */

export const organizerSignupApi = async (data) => {
  return await handleApi(api.post("/auth/signup", data));
};

export const verifyEmailApi = async (token) => {
  return await handleApi(
    api.get(`/auth/org/verify?token=${encodeURIComponent(token)}`)
  );
};


/* ================================
   EVENT APIs
================================ */

export const createEventApi = async (data) => {
  return await handleApi(
    api.post("/event/create", data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  );
};

export const organizerEventsApi = async () => {
  return await handleApi(api.get("/event/organizer-events"));
};

export const userEventsApi = async () => {
  return await handleApi(api.get("/event/user-events"));
};

export const getAllEventsApi = async () => {
  return await handleApi(api.get("/event/all"));
};

export const getEventByIdApi = async (id) => {
  return await handleApi(api.get(`/event/${id}`));
};

export const updateEventApi = async (id, data) => {
  return await handleApi(
    api.put(`/event/update/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  );
};

export const deleteEventApi = async (id) => {
  return await handleApi(api.delete(`/event/delete/${id}`));
};





