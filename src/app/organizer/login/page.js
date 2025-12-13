"use client";

import "../organizer-auth.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { loginApi } from "@/lib/apiClient";
import { saveToken } from "@/lib/auth";
import { toast } from "react-hot-toast";

import {
  ROLE_ORGANIZER,
  INPUT_TEXT,
  INPUT_PASSWORD,
  MSG_INVALID_CREDENTIALS,
  MSG_LOGIN_SUCCESS_ORGANIZER,
  TITLE_ORG_LOGIN_MAIN ,
  SUBTITLE_ORG_LOGIN ,
  LABEL_ORG_EMAIL ,
  PH_ORG_EMAIL ,
  LABEL_PASSWORD ,
  PH_PASSWORD ,
  TEXT_FORGOT_PASSWORD ,
  TEXT_SIGNIN ,
  TEXT_NO_ACCOUNT ,
  TEXT_SIGNUP ,
  
} from "@/const-value/config-message/page";

import { landingPage, organizerSignupCategoryPage } from "@/app/routes";
import { organizerLoginSchema } from "@/components/validation";

// --------------------------------------------------------------
// Organizer Login Page
// Handles organizer authentication with validation + bootstrap
// --------------------------------------------------------------
export default function OrganizerLoginPage() {
  const router = useRouter();

  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // --------------------------------------------------------------
  // Submit Handler
  // --------------------------------------------------------------
  async function onSubmit(e) {
    e.preventDefault();

    // Form Validation (YUP)
    try {
      await organizerLoginSchema.validate(
        { email: domain, password },
        { abortEarly: false }
      );
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    // API Request
    try {
      const res = await loginApi({
        email: domain,
        password,
        type: ROLE_ORGANIZER,
      });

      if (!res.success) return toast.error(MSG_INVALID_CREDENTIALS);

      saveToken(res.data.token);

      document.cookie = `token=${res.data.token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }`;
      document.cookie = `role=organizer; path=/;`;

      toast.success(MSG_LOGIN_SUCCESS_ORGANIZER);
      router.push(landingPage);
    } catch (err) {
      toast.error(MSG_INVALID_CREDENTIALS);
    }
  }

  return (
    <div className="org-shell">
      {/* LEFT SIDE IMAGE */}
      <aside className="org-left">
        <img className="org-left-img" src="/images/or_login.png" alt="left" />
      </aside>

      {/* RIGHT SIDE FORM */}
      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">{TITLE_ORG_LOGIN_MAIN }</h2>
          <div className="org-sub">{SUBTITLE_ORG_LOGIN}</div>

          {/* LOGIN FORM */}
          <form className="org-form" onSubmit={onSubmit}>
            {/* Email */}
            <div className="form-group mb-3">
              <label className="form-label">{LABEL_ORG_EMAIL }</label>
              <input
                className="form-control"
                type={INPUT_TEXT}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder={PH_ORG_EMAIL}
              />
            </div>

            {/* Password */}
            <div className="form-group mb-3">
              <label className="form-label">{LABEL_PASSWORD }</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type={showPass ? INPUT_TEXT : INPUT_PASSWORD}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={PH_PASSWORD} 
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <ViewIcon /> : <HideIcon />}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-end mb-2">
              <a href="/auth/forgot-password?role=organizer">
                {TEXT_FORGOT_PASSWORD} 
              </a>
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-100" type="submit">
              {TEXT_SIGNIN}
            </button>

            {/* Footer Link */}
            <div className="org-foot mt-3">
              {TEXT_NO_ACCOUNT}{" "}
              <a href={organizerSignupCategoryPage}>{TEXT_SIGNUP}</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
