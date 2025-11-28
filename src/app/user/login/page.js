'use client';

import { ViewIcon, HideIcon } from '@/components/icons/Icons';
import '../user-auth.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    alert('Demo login');
  }

  return (
    <div className="u-auth-shell container-fluid">
      <div className="row u-auth-row g-0">

        {/* LEFT IMAGE */}
        <div className="col-lg-6 u-auth-left">
          <img src="/images/auth-login.png" alt="login" />
        </div>

        {/* RIGHT FORM */}
        <div className="col-lg-6 u-auth-right">
          <div className="u-auth-card">
            <h1 className="u-auth-title">Welcome Back</h1>
            <div className="u-auth-sub">Please login your account</div>

            <form onSubmit={onSubmit}>
              {/* EMAIL FIELD */}
              <label className="u-auth-muted">Email</label>
              <input
                className="u-auth-input"
                type="email"
                placeholder="Enter your mail id"
                required
              />

              {/* PASSWORD FIELD */}
              <label className="u-auth-muted">Password</label>
              <div className="u-auth-pass-wrap">
                <input
                  className="u-auth-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                />

                <span
                  className="u-auth-pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <HideIcon /> : <ViewIcon />}
                </span>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-end" style={{ marginBottom: '15px' }}>
                <a className="u-auth-link" href="/user/forgot-password">
                  Forgot Password!
                </a>
              </div>

              {/* SIGN IN BUTTON */}
              <button className="u-auth-btn-primary" type="submit">
                Sign In
              </button>

              {/* OR DIVIDER */}
              <div className="u-auth-center u-auth-muted" style={{ margin: '15px 0' }}>
                — Or —
              </div>

              {/* GOOGLE SIGNIN */}
              <button type="button" className="u-auth-btn-ghost">
                <img src="/images/google.png" style={{ width: 20, marginRight: 8 }} />
                Continue with Google
              </button>

              {/* SIGN UP LINK */}
              <div className="text-center u-auth-muted" style={{ marginTop: 25 }}>
                Didn’t have an Account!?{' '}
                <a className="u-auth-link" href="/user/signup">
                  Sign Up
                </a>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
