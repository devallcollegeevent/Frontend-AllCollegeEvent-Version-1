"use client";

import "../organizer-auth.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";
import { loginApi } from "@/lib/apiClient";
import { saveToken } from "@/lib/auth";
import { toast } from "react-hot-toast";
import { organizerRole } from "@/const-value/page";
import { landingPage, organizerSignupCategoryPage } from "@/app/routes";

export default function Page() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [show1, setShow1] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await loginApi({
        email: domain,
        password,
        type: organizerRole,
      });

      if (!res.success) {
        toast.error("Invalid credentials");
        return;
      }

      saveToken(res.data.token);

      document.cookie = `token=${res.data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `role=organizer; path=/;`;

      toast.success("Organizer Logged In Successfully!");
      router.push("/organizer/event/list");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img className="org-left-img" src="/images/or_login.png" alt="left" />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <h2 className="org-title">Host. Manage. Inspire.</h2>
          <div className="org-sub">Turn Ideas into Events — Let's Begin!</div>

          <form className="org-form" onSubmit={onSubmit}>
            <div className="form-group full">
              <label className="form-label">Domain Mail ID</label>
              <input
                className="form-control"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter your domain mail id"
              />
            </div>

            <div className="form-group full">
              <label className="form-label">Password</label>
              <div className="pass-wrap">
                <input
                  className="form-control"
                  type={show1 ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span className="pass-toggle" onClick={() => setShow1(!show1)}>
                  {show1 ? <ViewIcon /> : <HideIcon />}
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right", marginBottom: 12 }}>
              <a className="u-organizer-link" href="/organizer/forgot-password">
                Forgot Password!
              </a>
            </div>

            <div className="form-actions">
              <button className="btn-primary-ghost" type="submit">
                Sign In
              </button>
            </div>

            <div className="org-foot">
              Didn’t have an Account!?{" "}
              <a href={organizerSignupCategoryPage}>Sign Up</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
