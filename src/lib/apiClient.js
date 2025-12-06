import api from "./axios";

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

// ============================user auth =================================

export const signupApi = async (data) => {
  return await handleApi(api.post("/v1/auth/signup", data));
};

export const loginApi = async (data) => {
  return await handleApi(api.post("/v1/auth/login", data));
};
export const googleAthuLoginApi = async (data) => {
  return await handleApi(api.post("/v1/auth/google-login", data));
};

export const forgotApi = async (data) => {
  return await handleApi(api.post("/v1/auth/forgot-password", data));
};

export const verifyOtpApi = async (data) => {
  return await handleApi(api.post("/v1/auth/verify-otp", data));
};

export const resendOtpApi = async (data) => {
  return await handleApi(api.post("/v1/auth/resend-otp", data));
};

export const resetPasswordApi = async (data) => {
  return await handleApi(api.post("/v1/auth/reset-password", data));
};

export const profileApi = async () => {
  return await handleApi(api.get("/acc/profile"));
};


// ============================organization auth =================================

export const organizerSignupApi = async (data) => {
  return await handleApi(api.post("/v1/auth/signup", data));
};

export const verifyEmailApi = async (token) => {
  return await handleApi(
    api.get(`/v1/auth/org/verify?token=${encodeURIComponent(token)}`)
  );
};

// ============================organizer creat , and list Event =================================

export const createEventApi = async (orgId, data) => {
  return await handleApi(
    api.post(`/v1/organizations/${orgId}/events`, data)
  );
};


export const getOrganizerEventsApi = async (orgId) => {
  return await handleApi(api.get(`/v1/organizations/${orgId}/events`));
};

export const getOrganizerSingleEventApi = async (orgId, eventId) => {
  return await handleApi(
    api.get(`/v1/organizations/${orgId}/events/${eventId}`)
  );
};


export const updateOrganizerSingleEventApi = async (orgId, eventId, data) => {
  return await handleApi(
    api.put(`/v1/organizations/${orgId}/events/${eventId}`, data)
  );
};



// ============================user view  Event =================================

export const getAllEventsApi = async () => {
  return await handleApi(api.get("/v1/organizations/eve"));
};


export const getEventByIdApi = async (orgId, eventId) => {
  return await handleApi(
    api.get(`/v1/organizations/${orgId}/events/${eventId}`)
  );
};

export const deleteEventApi = async (id) => {
  return await handleApi(api.delete(`/event/delete/${id}`));
};





