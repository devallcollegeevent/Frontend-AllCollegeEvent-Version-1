"use client";

import "../../user-auth.css";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Page() {
  const router = useRouter();
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function handleInput(e, idx) {
    const v = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    e.target.value = v;
    if (v && idx < 3) refs[idx + 1].current.focus();
  }

  function onSubmit(e) {
    e.preventDefault();
    const code = refs.map((r) => r.current.value).join("");
    if (code.length !== 4) return alert("Enter 4 digit code");
    router.push("/user/reset-password/dummy-token");
  }

  return (
    <div className="u-auth-shell container-fluid">
      <div className="row u-auth-row g-0">
        <div className="col-lg-6 u-auth-left">
          <img src="/images/auth-forgot.png" alt="otp left" />
        </div>

        <div className="col-lg-6 u-auth-right">
          <div className="u-auth-card">
            <h1 className="u-auth-title">Forgot Password</h1>
            <div className="u-auth-sub">
              No worries, we'll send you a code <br />
              to reset the password
            </div>

            <form onSubmit={onSubmit}>
              <div className="u-auth-otp-row">
                <input
                  ref={refs[0]}
                  className="u-auth-otp"
                  onChange={(e) => handleInput(e, 0)}
                  maxLength={1}
                />
                <input
                  ref={refs[1]}
                  className="u-auth-otp"
                  onChange={(e) => handleInput(e, 1)}
                  maxLength={1}
                />
                <input
                  ref={refs[2]}
                  className="u-auth-otp"
                  onChange={(e) => handleInput(e, 2)}
                  maxLength={1}
                />
                <input
                  ref={refs[3]}
                  className="u-auth-otp"
                  onChange={(e) => handleInput(e, 3)}
                  maxLength={1}
                />
              </div>
              <div style={{display:"flex" , justifyContent:"center", paddingTop:"60px"}}>
                <button
                  className="u-auth-btn-primary-contine"
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>

            <div style={{ marginTop: 16 }}>
              <div className="u-auth-pager">
                <div className="u-auth-dot">1</div>
                <div className="u-auth-dot active">2</div>
                <div className="u-auth-dot">3</div>
                <div className="u-auth-dot">4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
