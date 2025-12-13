"use client";

import { useState } from "react";
import { forgotApi } from "@/lib/apiClient";
import { saveEmail } from "@/lib/auth";
import { toast } from "react-hot-toast";
import {
  userForgotSchema,
  organizerForgotSchema,
} from "@/components/validation";

export default function ForgotPassword({ role }) {
  const [email, setEmail] = useState("");

  const config = {
    organizer: {
      image: "/images/or_forgotpassword.png",
      title: "Forgot Password",
      label: "Domain Mail ID",
      redirect: "/auth/enter-code?role=organizer",
      loginLink: "/organizer/login",
      schema: organizerForgotSchema,
    },
    user: {
      image: "/images/auth-forgot.png",
      title: "Forgot Password",
      label: "Email",
      redirect: "/auth/enter-code?role=user",
      loginLink: "/user/login",
      schema: userForgotSchema,
    },
  };

  const ui = config[role];

  async function onSubmit(e) {
    e.preventDefault();

    // ⭐ YUP VALIDATION
    try {
      await ui.schema.validate(
        { email },
        { abortEarly: false }
      );
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    try {
      await forgotApi({ email });
      saveEmail(email);
      toast.success("Code sent to your email");
      window.location.href = ui.redirect;
    } catch (err) {
      toast.error(err.response?.data?.message || "Email not found");
    }
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src={ui.image} />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">{ui.title}</h2>
          <div className="org-sub">No worries, we'll send you a code</div>

          <form className="org-form" onSubmit={onSubmit}>
            <label className="form-label">{ui.label}</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={ui.label}
            />

            <div className="form-actions">
              <button className="btn-primary-ghost" type="submit">
                Send Code
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
