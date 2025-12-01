"use client";

import "../organizer-auth.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    // call API if exists
    // await forgotApi({ email });
    router.push(`/organizer/forgot-password/enter-code?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src="/images/organizer-forgot-left.png" alt="left" />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">Forgot Password</h2>
          <div className="org-sub">No worries, we'll send you a code to reset the password</div>

          <form className="org-form" onSubmit={onSubmit}>
            <div className="form-group full">
              <label className="form-label">Domain Mail ID</label>
              <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your domain mail id" />
            </div>

            <div className="form-actions">
              <button className="btn-primary-ghost" type="submit">Send Code</button>
            </div>

            <div className="org-foot">
              Already have an Account!? <a href="/organizer/login">Sign In</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
