"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage({ role }) {
  const router = useRouter();

  // ROLE-BASED UI CONFIG
  const config = {
    user: {
      image: "/images/auth-forgot.png",
      title: "Password Changed!",
      loginLink: "/user/login",
    },
    organizer: {
      image: "/images/or_passwordsuccess.png",
      title: "Verify your Account",
      loginLink: "/organizer/login",
    },
  };

  const ui = config[role];

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src={ui.image} alt="success image" />
      </aside>

      <main className="org-right">
        <div className="org-card org-success">
          <h2 className="org-title">{ui.title}</h2>

          {role === "organizer" && (
            <div className="org-sub">
              Link has been sent to your domain mail. Please verify your account.
            </div>
          )}

          {role === "user" && (
            <div className="org-sub">Your password has been updated successfully</div>
          )}

          <div className="form-actions">
            <button
              className="btn-primary-ghost"
              onClick={() => router.push(ui.loginLink)}
            >
              Go to Login
            </button>
          </div>

          <div className="org-foot" style={{ marginTop: 18 }}>
            Already have an Account? <a href={ui.loginLink}>Sign In</a>
          </div>
        </div>
      </main>
    </div>
  );
}
