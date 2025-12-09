import api from "./axios";

async function handleApi(promise) {
  try {
    const res = await promise;

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.error("API Error:", err?.response || err);

    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong",
      status: err?.response?.status || 500,
    };
  }
}

// ============================ USER AUTH ============================

export const signupApi = async (data) => {
  try {
    return await handleApi(api.post("/v1/auth/signup", data));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const loginApi = async (data) => {
  try {
    return await handleApi(api.post("/v1/auth/login", data));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const googleAthuLoginApi = async (data) => {
  try {
    return await handleApi(api.post("/v1/auth/google-login", data));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

// Step 1: send email
export const forgotApi = async (data) => {
  return await handleApi(api.post("/v1/auth/forgot-password", data));
};

// Step 2: verify OTP
export const verifyOtpApi = async (data) => {
  return await handleApi(api.post("/v1/auth/verify-otp", data));
};

// Resend OTP
export const resendOtpApi = async (data) => {
  return await handleApi(api.post("/v1/auth/resend-otp", data));
};

// Step 3: reset password
export const resetPasswordApi = async (data) => {
  return await handleApi(api.post("/v1/auth/reset-password", data));
};


export const profileApi = async () => {
  try {
    return await handleApi(api.get("/acc/profile"));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

// ============================ ORGANIZATION AUTH ============================

export const organizerSignupApi = async (data) => {
  try {
    return await handleApi(api.post("/v1/auth/signup", data));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const verifyEmailApi = async (token) => {
  try {
    return await handleApi(
      api.get(`/v1/auth/org/verify?token=${encodeURIComponent(token)}`)
    );
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

// ============================ ORGANIZER EVENTS ============================

export const createEventApi = async (orgId, data) => {
  try {
    return await handleApi(
      api.post(`/v1/organizations/${orgId}/events`, data)
    );
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const getOrganizerEventsApi = async (orgId) => {
  try {
    return await handleApi(api.get(`/v1/organizations/${orgId}/events`));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const getOrganizerSingleEventApi = async (orgId, eventId) => {
  try {
    return await handleApi(
      api.get(`/v1/organizations/${orgId}/events/${eventId}`)
    );
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const updateOrganizerSingleEventApi = async (orgId, eventId, data) => {
  try {
    return await handleApi(
      api.put(`/v1/organizations/${orgId}/events/${eventId}`, data)
    );
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

// ============================ USER EVENTS ============================

export const getAllEventsApi = async () => {
  try {
    return await handleApi(api.get("/v1/events"));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const getEventByIdApi = async (eventId) => {
  try {
    return await handleApi(api.get(`/v1/events/${eventId}`));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};

export const deleteEventApi = async (id) => {
  try {
    return await handleApi(api.delete(`/event/delete/${id}`));
  } catch (err) {
    return handleApi(Promise.reject(err));
  }
};
