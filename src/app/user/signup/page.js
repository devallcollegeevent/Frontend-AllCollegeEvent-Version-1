"use client";

import "../user-auth.css";
import { useState } from "react";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { loginApi } from "@/lib/apiClient";

export default function Page() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

 async function onSubmit(e) {
  e.preventDefault();
  try {
    const payload = {
      email,
      password,
    };

    const res = await loginApi(payload);

    saveToken(res.data.token);
    toast.success("Login successful");
    router.push("/dashboard/user");
  } catch (err) {
    console.log("Login failed", err);
    toast.error("Invalid ");
  }
}

  return (
    <div className="u-auth-shell container-fluid">
      <div className="row u-auth-row g-0">
        {/* LEFT IMAGE */}
        <div className="col-lg-6 u-auth-left">
          <img src="/images/auth-signup.png" alt="signup" />
        </div>

        {/* RIGHT FORM */}
        <div className="col-lg-6 u-auth-right">
          <div className="u-auth-card">
            <h1 className="u-auth-title">Join us Now!!</h1>
            <div className="u-auth-sub">Let's Create your account</div>

            <form onSubmit={onSubmit}>
              {/* NAME */}
              <label className="u-auth-muted">Name</label>
              <input
                className="u-auth-input"
                type="text"
                placeholder="Enter your name"
                required
              />

              {/* EMAIL */}
              <label className="u-auth-muted">Email</label>
              <input
                className="u-auth-input"
                type="email"
                placeholder="Enter your mail id"
                required
              />

              {/* PASSWORD */}
              <label className="u-auth-muted">Password</label>
              <div className="u-auth-pass-wrap">
                <input
                  className="u-auth-input"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <span
                  className="u-auth-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <ViewIcon /> : <HideIcon />}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <label className="u-auth-muted">Confirm Password</label>
              <div className="u-auth-pass-wrap">
                <input
                  className="u-auth-input"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Enter your password again"
                  required
                />

                <span
                  className="u-auth-pass-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <ViewIcon /> : <HideIcon />}
                </span>
              </div>

              {/* SUBMIT */}
              <button className="u-auth-btn-primary" type="submit">
                Sign Up
              </button>

              {/* OR */}
              <div className="u-auth-center u-auth-muted">— Or —</div>

              {/* LOGIN LINK */}
              <div
                className="text-center u-auth-muted"
                style={{ marginTop: 10 }}
              >
                Already have an Account!?{" "}
                <a className="u-auth-link" href="/user/login">
                  Sign In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
