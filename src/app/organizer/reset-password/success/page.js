"use client";

import "../../organizer-auth.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src="/images/organizer-rocket.png" alt="left" />
      </aside>

      <main className="org-right">
        <div className="org-card org-success">
          <h2 className="org-title">Verify your Account</h2>
          <div className="org-sub">Link has been sent to your xyz.com domain mail id. Please click and verify your account.</div>

          <div style={{ marginTop: 24 }}>
            <button className="btn-primary-ghost" onClick={() => router.push("/organizer/login")}>Go to Login</button>
          </div>

          <div style={{ marginTop: 18 }} className="org-foot">
            Already have an Account!? <a href="/organizer/login">Sign In</a>
          </div>
        </div>
      </main>
    </div>
  );
}
