"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import "../user-auth.css"; // keep for your custom styles
import { toast } from "react-hot-toast";
import { googleAthuLoginApi, loginApi } from "@/lib/apiClient";
import { saveToken } from "@/lib/auth";
import { signupPage, userEventListPage } from "@/app/routes";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "@/store/userAuthSlice";
import { userLoginSchema } from "@/components/validation";

// CONFIG CONSTANTS  
import {
  TEXT_SIGNIN,
  TEXT_SIGNUP,
  TEXT_FORGOT_PASSWORD,
  TEXT_NO_ACCOUNT,
  TITLE_USER_LOGIN,
  SUBTITLE_USER_LOGIN,
  LABEL_EMAIL,
  LABEL_PASSWORD,
  PH_USER_EMAIL,
  PH_PASSWORD,
  INPUT_PASSWORD ,
  INPUT_TEXT ,
  MSG_LOGIN_SUCCESS_USER,
  MSG_LOGIN_FAILED,
  MSG_GENERIC_ERROR,
  ROLE_USER,
} from "@/const-value/config-message/page";

export default function UserLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Show/hide password
  const [showPass, setShowPass] = useState(false);

  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    type: ROLE_USER,
  });

  // ---------------------------------------------------------
  // HANDLE NORMAL LOGIN
  // ---------------------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate form (Yup)
    try {
      await userLoginSchema.validate(
        { email: form.email, password: form.password },
        { abortEarly: false }
      );
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    try {
      const res = await loginApi(form);

      if (!res.success) {
        return toast.error(res.message || MSG_LOGIN_FAILED);
      }

      dispatch(userLoginSuccess(res.data.data));
      saveToken(res.data.token);

      document.cookie = `token=${res.data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `role=user; path=/;`;

      toast.success(MSG_LOGIN_SUCCESS_USER);
      router.push(userEventListPage);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(MSG_GENERIC_ERROR);
    }
  };

  // ---------------------------------------------------------
  // GOOGLE LOGIN
  // ---------------------------------------------------------
  const handleGoogleSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await googleAthuLoginApi({
        google: true,
        googleToken,
        type: ROLE_USER,
      });

      if (!res.success) return toast.error("Google Login Failed");

      saveToken(res.data.token);
      dispatch(userLoginSuccess(res.data.data));
      document.cookie = `role=user; path=/;`;

      toast.success("Google Login Successful!");
      router.push(userEventListPage);
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">

        {/* LEFT SIDE IMAGE */}
        <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center ">
          <img src="/images/auth-login.png" alt="login" className="img-fluid" style={{ maxHeight: "500px" }} />
        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div className="p-4" style={{ width: "100%", maxWidth: "420px" }}>

            {/* Title */}
            <h1 className="fw-bold text-center">{TITLE_USER_LOGIN}</h1>
            <p className="text-muted text-center mb-4">{SUBTITLE_USER_LOGIN}</p>

            <form onSubmit={onSubmit}>
              {/* Email */}
              <label className="form-label">{LABEL_EMAIL}</label>
              <input
                className="form-control mb-3"
                type="email"
                placeholder={PH_USER_EMAIL}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              {/* Password */}
              <label className="form-label">{LABEL_PASSWORD}</label>
              <div className="input-group mb-2">
                <input
                  type={showPass ? INPUT_TEXT : INPUT_PASSWORD}
                  className="form-control"
                  placeholder={PH_PASSWORD}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <span
                  className="input-group-text"
                  role="button"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <ViewIcon /> : <HideIcon />}
                </span>
              </div>

              {/* Forgot Password */}
              <div className="text-end mb-3">
                <a href="/auth/forgot-password?role=user">{TEXT_FORGOT_PASSWORD}</a>
              </div>

              {/* Sign In Button */}
              <button className="btn btn-primary w-100 mb-3" type="submit">
                {TEXT_SIGNIN}
              </button>

              {/* Divider */}
              <div className="text-center text-muted mb-3">— Or —</div>

              {/* Google Login */}
              <div className="d-flex justify-content-center mb-3">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Authentication Failed")}
                />
              </div>

              {/* Footer */}
              <p className="text-center">
                {TEXT_NO_ACCOUNT}{" "}
                <a href={signupPage}>{TEXT_SIGNUP}</a>
              </p>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
