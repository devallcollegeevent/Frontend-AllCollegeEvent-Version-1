"use client";

import "../../organizer-auth.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params?.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  function onChange(i, v) {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 3) refs[i + 1].current?.focus();
  }

  function onSubmit(e) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) return alert("Enter 4 digit code");
    // verify code with API if exists
    router.push(`/organizer/reset-password/${code}`);
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src="/images/organizer-forgot-left.png" alt="left" />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">Enter Code</h2>
          <div className="org-sub">Enter the 4-digit code sent to {email || "your email"}</div>

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
              <button className="btn-primary-ghost" type="submit">Continue</button>
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
