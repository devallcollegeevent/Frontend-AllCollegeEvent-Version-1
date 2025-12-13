"use client";

import "../user-auth.css";
import { useState } from "react";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signupApi } from "@/lib/apiClient";
import { loginPage } from "@/app/routes";
import { password, text, userRole } from "@/const-value/page";
import { userSignupSchema } from "@/components/validation";

// ✅ Import ONLY existing constants (NO new constants created)
import {
  TITLE_USER_SIGNUP,
  SUBTITLE_USER_SIGNUP,

  LABEL_NAME,
  LABEL_EMAIL,
  LABEL_PASSWORD,
  LABEL_CONFIRM_PASSWORD,

  PH_NAME,
  PH_USER_EMAIL,
  PH_PASSWORD,
  PH_CONFIRM_PASSWORD,

  TEXT_SIGNUP,
  TEXT_NO_ACCOUNT,
  TEXT_SIGNIN,

  MSG_SIGNUP_SUCCESS,
  MSG_ERR_SIGNUP_FAILED,
} from "@/const-value/config-message/page";

export default function UserSignupPage() {
  const router = useRouter();

  // ---------------------------------------------
  // FORM STATE
  // ---------------------------------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: userRole,
  });

  // Password visibility toggles
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ---------------------------------------------
  // SUBMIT HANDLER
  // ---------------------------------------------
  async function onSubmit(e) {
    e.preventDefault();

    // Yup validation
    try {
      await userSignupSchema.validate(
        {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        },
        { abortEarly: false }
      );
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    // API call
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        type: form.type,
      };

      const res = await signupApi(payload);

      if (!res.success) {
        toast.error(res.message || MSG_ERR_SIGNUP_FAILED);
        return;
      }

      toast.success(MSG_SIGNUP_SUCCESS);
      router.push(loginPage);
    } catch (err) {
      toast.error(err?.response?.data?.message || MSG_ERR_SIGNUP_FAILED);
    }
  }

  return (
    <div className="u-auth-shell">
      {/* LEFT IMAGE SECTION */}
      <div className="u-auth-left d-none d-lg-flex justify-content-center align-items-center">
        <img src="/images/auth-signup.png" alt="signup" className="img-fluid" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="u-auth-right d-flex justify-content-center align-items-center">
        <div className="u-auth-card w-75">

          {/* Title + Subtitle */}
          <h1 className="u-auth-title">{TITLE_USER_SIGNUP}</h1>
          <div className="u-auth-sub">{SUBTITLE_USER_SIGNUP}</div>

          {/* FORM */}
          <form onSubmit={onSubmit}>

            {/* NAME */}
            <label className="u-auth-muted">{LABEL_NAME}</label>
            <input
              className="u-auth-input"
              type="text"
              placeholder={PH_NAME}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* EMAIL */}
            <label className="u-auth-muted">{LABEL_EMAIL}</label>
            <input
              className="u-auth-input"
              type="email"
              placeholder={PH_USER_EMAIL}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* PASSWORD */}
            <label className="u-auth-muted">{LABEL_PASSWORD}</label>
            <div className="u-auth-pass-wrap">
              <input
                className="u-auth-input"
                type={showPass ? text : password}
                placeholder={PH_PASSWORD}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <span
                className="u-auth-pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <ViewIcon /> : <HideIcon />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <label className="u-auth-muted">{LABEL_CONFIRM_PASSWORD}</label>
            <div className="u-auth-pass-wrap">
              <input
                className="u-auth-input"
                type={showConfirm ? text : password}
                placeholder={PH_CONFIRM_PASSWORD}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              <span
                className="u-auth-pass-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <ViewIcon /> : <HideIcon />}
              </span>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="u-auth-btn-primary" type="submit">
              {TEXT_SIGNUP}
            </button>

            {/* FOOTER */}
            <div className="u-auth-foot">
              {TEXT_NO_ACCOUNT}{" "}
              <a className="u-auth-link" href={loginPage}>
                {TEXT_SIGNIN}
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
