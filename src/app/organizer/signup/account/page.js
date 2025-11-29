"use client";

import "../../organizer-auth.css";
import { useState } from "react";

export default function Page() {
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showModal, setShowModal] = useState(false); // 👈 modal state

  function onContinue(e) {
    e.preventDefault();
    // if(!domain) return alert('Enter domain mail id');
    // if(password.length < 6) return alert('Password must be at least 6 chars');
    // if(password !== confirm) return alert('Passwords do not match');

    setShowModal(true); // 👈 show popup
  }

  return (
    <>
      <div className="container-fluid organizer-shell">
        <div className="row g-0">
          <div
            className="col-lg-6 col-md-6 col-12 organizer-left"
            style={{
              backgroundImage: "url('/images/organizer-bg-circles.png')",
            }}
          >
            <img
              className="organizer-left-img"
              src="/images/organizer-rocket.png"
              alt="rocket"
            />
          </div>

          <div className="col-lg-6 col-md-6 col-12 organizer-right">
            <div className="organizer-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div className="organizer-step active">
                  <div className="dot">1</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>
                    Organization Category
                  </div>
                </div>
                <div style={{ flex: 1, height: 3, background: "#eee" }}></div>
                <div className="organizer-step active">
                  <div className="dot">2</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>
                    Organization Details
                  </div>
                </div>
                <div style={{ flex: 1, height: 3, background: "#eee" }}></div>
                <div className="organizer-step active">
                  <div className="dot">3</div>
                  <div style={{ fontSize: 12, marginTop: 8 }}>
                    Account Creation
                  </div>
                </div>
              </div>

              <h2 className="organizer-title">Account Creation</h2>
              <div className="organizer-sub">
                Add your domain mail id and set a password
              </div>

              <form onSubmit={onContinue} style={{ padding: "0px 102px" }}>
                <div className="form-group">
                  <label className="form-label">Domain Mail ID</label>
                  <input
                    className="form-control"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter your domain"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="pass-wrap">
                    <input
                      className="form-control"
                      type={show1 ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <span
                      className="pass-toggle"
                      onClick={() => setShow1(!show1)}
                    >
                      {show1 ? "Hide" : "Show"}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div className="pass-wrap">
                    <input
                      className="form-control"
                      type={show2 ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Re-enter password"
                    />
                    <span
                      className="pass-toggle"
                      onClick={() => setShow2(!show2)}
                    >
                      {show2 ? "Hide" : "Show"}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 8, padding: "10px 91px" }}>
                  <button className="btn-primary-ghost" type="submit">
                    Verify Your Domain
                  </button>
                </div>
              </form>

              <div className="small-note">
                Already have an Account!?{" "}
                <a href="/organizer/login" className="u-organizer-link">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL POPUP */}
      {showModal && (
        <div className="verify-overlay">
          <div className="verify-modal">
            <img
              src="/images/logo.png"
              alt="logo"
              className="verify-logo"
            />

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
