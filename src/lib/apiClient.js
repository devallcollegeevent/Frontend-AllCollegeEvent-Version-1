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
  return await handleApi(api.post("/acc/signup", data));
};

export const loginApi = async (data) => {
  return await handleApi(api.post("/acc/login", data));
};
export const googleAthuLoginApi = async (data) => {
  return await handleApi(api.post("/acc/google-login", data));
};

export const forgotApi = async (data) => {
  return await handleApi(api.post("/acc/forgot-password", data));
};

export const verifyOtpApi = async (data) => {
  return await handleApi(api.post("/acc/verify-otp", data));
};

export const resendOtpApi = async (data) => {
  return await handleApi(api.post("/acc/resend-otp", data));
};

export const resetPasswordApi = async (data) => {
  return await handleApi(api.post("/acc/reset-password", data));
};

export const profileApi = async () => {
  return await handleApi(api.get("/acc/profile"));
};


/* ================================
   AUTH APIs (organizer )
================================ */

export const organizerSignupApi = async (data) => {
  return await handleApi(api.post("/acc/signup", data));
};

export const verifyEmailApi = async (token) => {
  return await handleApi(
    api.get(`/acc/org/verify?token=${encodeURIComponent(token)}`)
  );
};


/* ================================
   EVENT APIs
================================ */

export const createEventApi = async (data) => {
  return await handleApi(
    api.post("/org/eve/create", data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  );
};

export const getOrganizerEventsApi = async (orgId) => {
  return await handleApi(api.get(`/org/${orgId}/eve`));
};


export const userEventsApi = async () => {
  return await handleApi(api.get("/event/user-events"));
};

export const getAllEventsApi = async () => {
  return await handleApi(api.get("/org/eve"));
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





