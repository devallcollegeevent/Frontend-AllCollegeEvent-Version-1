// ================================
// USER AUTH ROUTES
// ================================

export const signupPage = "/user/signup";
export const loginPage = "/user/login";
export const forgotPasswordPage = "/user/forgot-password";
export const enterCodePage = "/user/forgot-password/enter-code";
export const resetPasswordPage = (token) => `/user/reset-password/${token}`;
export const resetPasswordSuccessPage = "/user/reset-password/success";

// ==================================
// ORGANIZER AUTH ROUTES
// ==================================

export const organizerLoginPage = "/organizer/login";
export const organizerSignupCategoryPage = "/organizer/signup";   // main signup page
export const organizerSignupDetailsPage = "/organizer/signup/details";
export const organizerSignupAccountPage = "/organizer/signup/account";
export const organizerSignupVerifyPage = "/organizer/signup/verify";
export const organizerResetPasswordPage = (token) =>
  `/organizer/reset-password/${token}`;
export const organizerResetPasswordSuccessPage =
  "/organizer/reset-password/success";

