"use client";

import { useState, useRef } from "react";
import { verifyOtpApi, resendOtpApi } from "@/lib/apiClient";
import { getEmail } from "@/lib/auth";
import { toast } from "react-hot-toast";
import { otpSchema } from "@/components/validation";

export default function EnterOtp({ role }) {
  const email = getEmail();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // ROLE CONFIG
  const config = {
    user: {
      image: "/images/auth-forgot.png",
      redirect: "/auth/reset-password?role=user",
    },
    organizer: {
      image: "/images/or_forgotpassword.png",
      redirect: "/auth/reset-password?role=organizer",
    },
  };

  const ui = config[role];

  function onChange(index, value) {
    if (!/^\d*$/.test(value)) return;

    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);

    if (value && index < 3) {
      inputs[index + 1].current?.focus();
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const code = otp.join("");

    // ⭐ YUP VALIDATION
    try {
      await otpSchema.validate(
        { otp: code },
        { abortEarly: false }
      );
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    try {
      setLoading(true);
      const res = await verifyOtpApi({ email, otp: code });
      setLoading(false);

      if (res.success) {
        toast.success("Code verified!");
        window.location.href = ui.redirect;
      } else {
        toast.error(res.message || "Invalid code");
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  async function resendCode() {
    try {
      setResendLoading(true);
      const res = await resendOtpApi({ email });
      setResendLoading(false);

      if (res.success) {
        toast.success("New code sent!");
      } else {
        toast.error(res.message || "Failed to resend");
      }
    } catch (err) {
      toast.error("Something went wrong");
      setResendLoading(false);
    }
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src={ui.image} alt="left" />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">Enter Code</h2>
          <div className="org-sub">
            Enter the 4-digit code sent to {email || "your email"}
          </div>

          <form className="org-form" onSubmit={onSubmit}>
            <div className="otp-row">
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={inputs[i]}
                  className="otp-input"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => onChange(i, e.target.value)}
                />
              ))}
            </div>

            <div className="form-actions">
              <button
                className="btn-primary-ghost"
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </div>

            <div className="org-foot" style={{ marginTop: 10 }}>
              Didn’t receive the code?{" "}
              <button
                type="button"
                className="resendCondeText"
                onClick={resendCode}
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
