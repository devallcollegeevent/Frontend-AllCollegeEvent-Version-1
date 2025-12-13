"use client";

import { useState } from "react";
import { resetPasswordApi } from "@/lib/apiClient";
import { clearEmail, getEmail } from "@/lib/auth";
import { toast } from "react-hot-toast";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { password, text } from "@/const-value/page";
import { userResetSchema } from "@/components/validation";

export default function ResetPassword({ role }) {
  const email = getEmail();

  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  // ROLE CONFIG
  const config = {
    user: {
      image: "/images/auth-forgot.png",
      redirect: "/auth/success?role=user",
      loginLink: "/user/login",
    },
    organizer: {
      image: "/images/or_forgotpasswordnextimage.png",
      redirect: "/auth/success?role=organizer",
      loginLink: "/organizer/login",
    },
  };

  const ui = config[role];

  async function onSubmit(e) {
    e.preventDefault();

    // ⭐ YUP VALIDATION
    try {
      await userResetSchema.validate(
        {
          password: pass,
          confirmPassword: confirm,
        },
        { abortEarly: false }
      );
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    // ⭐ API CALL
    try {
      await resetPasswordApi({ email, password: pass });

      toast.success("Password updated successfully");
      clearEmail();
      window.location.href = ui.redirect;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src={ui.image} alt="left" />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">Set New Password</h2>
          <div className="org-sub">Must be at least 8 characters</div>

          <form className="org-form" onSubmit={onSubmit}>
            {/* New Password */}
            <div className="form-group full">
              <label className="form-label">Set new password</label>
              <div className="pass-wrap">
                <input
                  className="form-control"
                  type={show1 ? text : password}
                  placeholder="Enter new password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <span className="pass-toggle" onClick={() => setShow1(!show1)}>
                  {show1 ? <ViewIcon /> : <HideIcon />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group full">
              <label className="form-label">Confirm password</label>
              <div className="pass-wrap">
                <input
                  className="form-control"
                  type={show2 ? text : password}
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <span className="pass-toggle" onClick={() => setShow2(!show2)}>
                  {show2 ? <ViewIcon /> : <HideIcon />}
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-primary-ghost" type="submit">
                Continue
              </button>
            </div>

            <div className="org-foot">
              Already have an Account? <a href={ui.loginLink}>Sign In</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
