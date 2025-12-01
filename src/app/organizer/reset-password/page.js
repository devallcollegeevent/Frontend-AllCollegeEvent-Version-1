"use client";

import "../organizer-auth.css";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { organizerResetPasswordSuccessPage } from "@/app/routes";
import { resetPasswordApi } from "@/lib/apiClient";
import { clearEmail, getEmail } from "@/lib/auth";
import { toast } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const email = getEmail();
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (pass !== confirm) {
      return toast.error("Passwords don't match");
    }

    try {
      await resetPasswordApi({ email, password: pass });

      toast.success("Password updated");
      router.push(organizerResetPasswordSuccessPage);
      clearEmail();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img
          className="org-left-img"
          src="/images/or_forgotpasswordnextimage.png"
          alt="left"
        />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">Set New Password</h2>
          <div className="org-sub">Must be at least 8 characters</div>

          <form className="org-form" onSubmit={onSubmit}>
            <div className="form-group full">
              <label className="form-label">Set new password</label>
              <div className="pass-wrap">
                <input
                  className="form-control"
                  type={show1 ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your new password"
                />
                <span className="pass-toggle" onClick={() => setShow1(!show1)}>
                  {show1 ? <HideIcon /> : <ViewIcon />}
                </span>
              </div>
            </div>

            <div className="form-group full">
              <label className="form-label">Confirm Password</label>
              <div className="pass-wrap">
                <input
                  className="form-control"
                  type={show2 ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                />
                <span className="pass-toggle" onClick={() => setShow2(!show2)}>
                  {show2 ? <HideIcon /> : <ViewIcon />}
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-primary-ghost" type="submit">
                Continue
              </button>
            </div>

            <div className="org-foot">
              Already have an Account!? <a href="/organizer/login">Sign In</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
