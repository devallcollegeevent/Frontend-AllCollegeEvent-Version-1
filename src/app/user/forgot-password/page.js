'use client';

import '../user-auth.css';
import { useRouter } from 'next/navigation';
import { forgotApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useState } from 'react';
import { enterCodePage } from '@/app/routes';
import { saveEmail } from '@/lib/auth';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  async function onSubmit(e){
    e.preventDefault();

    try {
      await forgotApi({ email });
       saveEmail(email)
      toast.success("Code sent to your email");
      router.push(enterCodePage);
    } catch (err) {
      toast.error(err.response?.data?.message || "Email not found");
    }
  }

  return (
    <div className="u-auth-shell">
      <div className="u-auth-left">
        <img src="/images/auth-forgot.png" alt="forgot left" />
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card">
          <h1 className="u-auth-title">Forgot Password</h1>
          <div className="u-auth-sub">No worries, we'll send you a code <br/>to reset the password</div>

          <form onSubmit={onSubmit}>
            <label className="u-auth-muted">Email</label>
            <input
              className="u-auth-input"
              type="email"
              placeholder="Enter your mail id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="u-auth-btn-primary" type="submit">Send Code</button>
          </form>

          <div style={{marginTop:16}}>
            <div className="u-auth-pager">
              <div className="u-auth-dot active">1</div>
              <div className="u-auth-dot">2</div>
              <div className="u-auth-dot">3</div>
              <div className="u-auth-dot">4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
