"use client";

import '../../user-auth.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { verifyCodeApi } from '@/lib/apiClient'; // optional: if exists
import {  resetPasswordPage } from '@/app/routes';

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params?.get('email') || "";
  const [otp, setOtp] = useState(["", "", "", ""]);
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
    if (code.length !== 4) return toast.error("Enter 4 digit code");

    try {
      // if you have API to verify:
      // await verifyCodeApi({ email, code });
      toast.success("Code verified");
      router.push(resetPasswordPage(token));
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid code");
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
          <div className="u-auth-sub">Enter the 4-digit code sent to {email || "your email"}</div>

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

            <button className="u-auth-btn-primary" type="submit">Continue</button>

            <div style={{marginTop:16}}>
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
