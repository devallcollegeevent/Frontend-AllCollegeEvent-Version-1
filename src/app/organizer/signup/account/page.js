"use client";

import "../../organizer-auth.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { organizerSignupApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { organizerRole, text } from "@/const-value/page";
import { organizerLoginPage } from "@/app/routes";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();

  const queryData = {
    category: params.get("cat") || "",
    country: params.get("country") || "",
    state: params.get("state") || "",
    city: params.get("city") || "",
    orgName: params.get("orgName") || "",
  };

  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onContinue(e) {
    e.preventDefault();

    if (!domain || !password || !confirm) return toast.error("Fill all fields");
    if (password !== confirm) return toast.error("Passwords do not match");
    if (!queryData.category)
      return toast.error("Category missing. Start again.");

    const payload = {
      org_cat: queryData.category,
      country: queryData.country,
      state: queryData.state,
      city: queryData.city,
      org_name: queryData.orgName,
      email: domain,
      password: password,
      type: organizerRole,
    };

    try {
      setLoading(true);
      const res = await organizerSignupApi(payload);

      if (!res.success) {
        toast.error(res.message || "Signup failed");
        return;
      }

      setShowModal(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    router.push(organizerLoginPage);
  }

  return (
    <>
      <div className="org-shell">
        <aside
          className="org-left"
          style={{ backgroundImage: "url('/images/organizer-bg-circles.png')" }}
        >
          <img
            className="org-left-img"
            src="/images/organizer-rocket.png"
            alt="rocket"
          />
        </aside>

        <main className="org-right">
          <div className="org-card">
            <div className="org-stepper">
              <div className="org-step active">
                <div className="dot">1</div>
                <div className="label">Organization Category</div>
              </div>

              <div className="line active" />

              <div className="org-step active">
                <div className="dot">2</div>
                <div className="label">Organization Details</div>
              </div>

              <div className="line active" />

              <div className="org-step active">
                <div className="dot">3</div>
                <div className="label">Account Creation</div>
              </div>
            </div>

            <h2 className="org-title">Account Creation</h2>
            <div className="org-sub">
              Add your domain mail id and set a password
            </div>

            <form className="org-form" onSubmit={onContinue}>
              <div className="form-group full">
                <label className="form-label">Domain Mail ID</label>
                <input
                  className="form-control"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="admin@yourdomain.com"
                />
              </div>

              <div className="form-group full">
                <label className="form-label">Password</label>
                <div className="pass-wrap">
                  <input
                    className="form-control"
                    type={showPass1 ? text : password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <span
                    className="pass-toggle"
                    onClick={() => setShowPass1(!showPass1)}
                    role="button"
                  >
                    {showPass1 ? <ViewIcon /> : <HideIcon />}
                  </span>
                </div>
              </div>

              <div className="form-group full">
                <label className="form-label">Confirm Password</label>
                <div className="pass-wrap">
                  <input
                    className="form-control"
                    type={showPass2 ? text : password}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter your password"
                  />
                  <span
                    className="pass-toggle"
                    onClick={() => setShowPass2(!showPass2)}
                    role="button"
                  >
                    {showPass2 ? <ViewIcon /> : <HideIcon />}
                  </span>
                </div>
              </div>

              <div className="form-actions">
                <button
                  className="btn-primary-ghost"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Verify Your Domain"}
                </button>
              </div>

              <div className="org-foot">
                Already have an Account!? <a href={organizerLoginPage}>Sign In</a>
              </div>
            </form>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="verify-overlay">
          <div className="verify-modal gradient-bg">
            <div onClick={closeModal} style={{ textAlign: "end" }}>
              close
            </div>
            <img src="/images/logo.png" alt="logo" className="verify-logo" />
            <h2 className="verify-title">Verify your Account</h2>
            <p className="verify-text">
              Link has been sent to your xyz.com domain mail id.
              <br />
              Please click and verify your account.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
