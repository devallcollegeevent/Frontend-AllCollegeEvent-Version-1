'use client';

import { ViewIcon, HideIcon } from '@/components/icons/Icons';
import '../user-auth.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { googleAthuLoginApi, loginApi } from '@/lib/apiClient';
import { saveToken } from '@/lib/auth';
import { landingPage, loginPage, signupPage } from '@/app/routes';
import { userRole } from '@/const-value/page';
import { GoogleLogin } from '@react-oauth/google';

export default function Page() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    type:userRole
  });

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const res = await loginApi(form);
      saveToken(res.data.token);
      toast.success("Login successful!");

      router.push(landingPage);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  }

  // GOOGLE LOGIN HANDLER
  async function handleGoogleSuccess(response) {
    try {
      const googleToken = response.credential;
      console.log("google token :",googleToken)

      const res = await googleAthuLoginApi({
        google: true,
        googleToken,
        type: userRole
      });

      saveToken(res.data.token);

      toast.success("Google Login Successful!");
      router.push(landingPage);
    } catch (err) {
      toast.error("Google Login Failed");
      console.log(err);
    }
  }

  return (
    <div className="u-auth-shell">
      <div className="u-auth-left">
        <img src="/images/auth-login.png" alt="login" />
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card">
          <h1 className="u-auth-title">Welcome Back</h1>
          <div className="u-auth-sub">Please login your account</div>

          <form onSubmit={onSubmit}>
            <label className="u-auth-muted">Email</label>
            <input
              className="u-auth-input"
              type="email"
              placeholder="Enter your mail id"
              value={form.email}
              onChange={(e)=>setForm({...form, email:e.target.value})}
              required
            />

            <label className="u-auth-muted">Password</label>
            <div className="u-auth-pass-wrap">
              <input
                className="u-auth-input"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e)=>setForm({...form, password:e.target.value})}
                required
              />

              <span
                className="u-auth-pass-toggle"
                onClick={() => setShowPass(!showPass)}
                role="button"
                aria-label="toggle password"
              >
                {showPass ?  <ViewIcon /> : <HideIcon />}
              </span>
            </div>

            <div className="text-end" style={{ marginBottom: '15px' }}>
              <a className="u-auth-link" href="/user/forgot-password">
                Forgot Password!
              </a>
            </div>

            <button className="u-auth-btn-primary" type="submit">
              Sign In
            </button>

            <div className="u-auth-center u-auth-muted" style={{ margin: '15px 0' }}>
              — Or —
            </div>

            {/* GOOGLE LOGIN BUTTON */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Authentication Failed")}
              />
            </div>

            <div className="u-auth-foot" style={{ marginTop: 20 }}>
              Didn't have an Account!?{' '}
              <a className="u-auth-link" href={signupPage}>
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
