"use client";

import "../user-auth.css";
import { useState } from "react";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signupApi } from "@/lib/apiClient";
import { loginPage } from "@/app/routes";
import { userRole } from "@/const-value/page";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type:userRole
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        type: form.type
      };

      const res = await signupApi(payload);
      toast.success("Signup successfully!");

      router.push(loginPage);
    } catch (err) {
      toast.error(err.response?.data?.message || "signup failed");
    }
  }

  return (
    <div className="u-auth-shell">
      <div className="u-auth-left">
        <img src="/images/auth-signup.png" alt="signup" />
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card">
          <h1 className="u-auth-title">Join us Now!!</h1>
          <div className="u-auth-sub">Let's Create your account</div>

          <form onSubmit={onSubmit}>
            <label className="u-auth-muted">Name</label>
            <input
              className="u-auth-input"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <label className="u-auth-muted">Email</label>
            <input
              className="u-auth-input"
              type="email"
              placeholder="Enter your mail id"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label className="u-auth-muted">Password</label>
            <div className="u-auth-pass-wrap">
              <input
                className="u-auth-input"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span
                className="u-auth-pass-toggle"
                onClick={() => setShowPass(!showPass)}
                role="button"
                aria-label="toggle password"
              >
                {showPass ? <ViewIcon /> : <HideIcon />}
              </span>
            </div>

            <label className="u-auth-muted">Confirm Password</label>
            <div className="u-auth-pass-wrap">
              <input
                className="u-auth-input"
                type={showConfirm ? "text" : "password"}
                placeholder="Enter your password again"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
              <span
                className="u-auth-pass-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
                role="button"
                aria-label="toggle confirm password"
              >
                {showConfirm ? <ViewIcon /> : <HideIcon />}
              </span>
            </div>

            <button className="u-auth-btn-primary" type="submit">
              Sign Up
            </button>

            <div className="u-auth-center u-auth-muted">— Or —</div>

            <div className="u-auth-foot">
              Already have an Account!?{" "}
              <a className="u-auth-link" href={loginPage}>
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
