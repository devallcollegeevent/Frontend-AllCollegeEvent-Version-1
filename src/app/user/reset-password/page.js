"use client";

import "../user-auth.css";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { resetPasswordApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { resetPasswordSuccessPage } from "@/app/routes";
import { clearEmail, getEmail } from "@/lib/auth";

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
      router.push(resetPasswordSuccessPage);
      clearEmail()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  }

  return (
    <div className="u-auth-shell">
      <div className="u-auth-left">
        <img src="/images/auth-forgot.png" alt="reset left" />
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card">
          <h1 className="u-auth-title">Set New Password</h1>
          <div className="u-auth-sub">Must be at least 8 characters</div>

          <form onSubmit={onSubmit}>
            <label className="u-auth-muted">Set new password</label>

            <div className="u-auth-pass-wrap">
              <input
                className="u-auth-input"
                type={show1 ? "text" : "password"}
                placeholder="Enter new password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <span
                className="u-auth-pass-toggle"
                onClick={() => setShow1(!show1)}
              >
                {show1 ? <ViewIcon /> : <HideIcon />}
              </span>
            </div>

            <label className="u-auth-muted">Confirm Password</label>

            <div className="u-auth-pass-wrap">
              <input
                className="u-auth-input"
                type={show2 ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <span
                className="u-auth-pass-toggle"
                onClick={() => setShow2(!show2)}
              >
                {show2 ? <ViewIcon /> : <HideIcon />}
              </span>
            </div>

            <button className="u-auth-btn-primary" type="submit">
              Continue
            </button>

            <div style={{ marginTop: 16 }}>
              <div className="u-auth-pager">
                <div className="u-auth-dot">1</div>
                <div className="u-auth-dot">2</div>
                <div className="u-auth-dot active">3</div>
                <div className="u-auth-dot">4</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
