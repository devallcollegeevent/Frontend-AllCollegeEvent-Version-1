// GLOBAL VALIDATIONS
import * as Yup from "yup";

export const required = (name) => Yup.string().required(`${name} is required`);

export const email = Yup.string()
  .email("Invalid email format")
  .required("Email is required");

export const password8 = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required");

export const confirmPassword = (ref) =>
  Yup.string()
    .oneOf([Yup.ref(ref), null], "Passwords do not match")
    .required("Confirm password is required");

// ------------------------------
// ORGANIZER VALIDATIONS
// ------------------------------

export const organizerLoginSchema = Yup.object({
  email,
  password: password8,
});

export const organizerForgotSchema = Yup.object({
  email,
});

export const organizerResetSchema = Yup.object({
  password: password8,
  confirmPassword: confirmPassword("password"),
});

export const organizerSignupSchema = Yup.object({
  email,
  password: password8,
  confirmPassword: confirmPassword("password"),
});

// ------------------------------
// EVENT CREATION VALIDATION
// ------------------------------

export const eventSchema = Yup.object({
  eventTitle: required("Event Title"),
  description: required("Description"),
  eventDate: required("Event Date"),
  eventTime: required("Event Time"),
  mode: required("Mode"),

  venue: Yup.string().when("mode", (mode, schema) => {
    if (mode === "offline" || mode === "hybrid") {
      return schema.required("Venue is required");
    }
    return schema.nullable();
  }),
});

// ------------------------------
// USER VALIDATIONS
// ------------------------------

export const userSignupSchema = Yup.object({
  name: required("Name"),
  email,
  password: password8,
  confirmPassword: confirmPassword("password"),
});

export const userLoginSchema = Yup.object({
  email,
  password: password8,
});

export const userForgotSchema = Yup.object({
  email,
});

export const otpSchema = Yup.object({
  otp: Yup.string()
    .length(4, "OTP must be 4 digits")
    .required("OTP is required"),
});


export const userResetSchema = Yup.object({
  password: password8,
  confirmPassword: confirmPassword("password"),
});
