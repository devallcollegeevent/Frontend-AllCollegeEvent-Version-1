"use client";

import "../../user-auth.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { verifyOtpApi, resendOtpApi } from "@/lib/apiClient";
import { resetPasswordPage } from "@/app/routes";
import { getEmail } from "@/lib/auth";

export default function Page() {
  const router = useRouter();
  const email = getEmail();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function onChange(index, value) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 3) inputs[index + 1].current?.focus();
  }

  async function onSubmit(e) {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 4) {
      return toast.error("Enter 4-digit code");
    }

    setLoading(true);

    const res = await verifyOtpApi({ email, otp: code });

    setLoading(false);

    if (res.success) {
      toast.success("Code verified");
      router.push(resetPasswordPage);
    } else {
      toast.error(res.message || "Invalid code");
    }
  }

  async function resendCode() {
    if (!email) return toast.error("Email missing");

    setResendLoading(true);

    const res = await resendOtpApi({ email });

    setResendLoading(false);

    if (res.success) {
      toast.success("New code sent to your email");
    } else {
      toast.error(res.message || "Failed to resend");
    }
  }

  return (
    <div className="u-auth-shell">
      <div className="u-auth-left">
        <img src="/images/auth-forgot.png" alt="enter code left" />
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card">
          <h1 className="u-auth-title">Enter Code</h1>
          <div className="u-auth-sub">
            Enter the 4-digit code sent to {email || "your email"}
          </div>

          <form onSubmit={onSubmit}>
            <div className="u-auth-otp-row">
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={inputs[i]}
                  className="u-auth-otp"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => onChange(i, e.target.value)}
                />
              ))}
            </div>

            <button className="u-auth-btn-primary" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Continue"}
            </button>

            {/* RESEND CODE */}
            <div className="org-foot" style={{ marginTop: 10 }}>
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={resendCode}
                disabled={resendLoading}
                style={{
                  border: "none",
                  background: "none",
                  color: "#6C2BD9",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="u-auth-pager">
                <div className="u-auth-dot">1</div>
                <div className="u-auth-dot active">2</div>
                <div className="u-auth-dot">3</div>
                <div className="u-auth-dot">4</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
