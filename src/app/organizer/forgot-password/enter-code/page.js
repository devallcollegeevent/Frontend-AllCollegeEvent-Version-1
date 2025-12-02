"use client";

import { organizerResetPasswordPage } from "@/app/routes";
import "../../organizer-auth.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { verifyOtpApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { getEmail } from "@/lib/auth";

export default function Page() {
  const router = useRouter();
  const email = getEmail();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  function onChange(i, v) {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 3) refs[i + 1].current?.focus();
  }

  async function onSubmit(e) {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 4) return toast.error("Enter 4 digit code");

    const res = await verifyOtpApi({ email, otp: code });

    if (res.success) {
      toast.success("Code verified");

      router.push(organizerResetPasswordPage);
      setOtp(["", "", "", ""]);
    } else {
      toast.error(res.message || "Invalid code");
    }
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img
          className="org-left-img"
          src="/images/or_forgotpassword.png"
          alt="left"
        />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">Enter Code</h2>
          <div className="org-sub">
            Enter the 4-digit code sent to {email || "your email"}
          </div>

          <form className="org-form" onSubmit={onSubmit}>
            <div className="otp-row">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  className="otp-input"
                  inputMode="numeric"
                  maxLength={1}
                  value={v}
                  onChange={(e) => onChange(i, e.target.value)}
                />
              ))}
            </div>

            <div className="form-actions">
              <button className="btn-primary-ghost" type="submit">
                Continue
              </button>
            </div>

            <div className="org-foot">
              Didn't receive the code? <a href="#">Resend Code</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
