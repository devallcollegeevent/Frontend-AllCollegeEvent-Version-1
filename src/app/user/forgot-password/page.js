'use client';

import '../user-auth.css';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  function onSubmit(e){
    e.preventDefault();
    // you can call API here to send code; after success:
    router.push('/user/forgot-password/enter-code');
  }

  return (
    <div className="u-auth-shell container-fluid">
      <div className="row u-auth-row g-0">

        <div className="col-lg-6 u-auth-left">
          <img src="/images/auth-forgot.png" alt="forgot left" />
        </div>

        <div className="col-lg-6 u-auth-right">
          <div className="u-auth-card">
            <h1 className="u-auth-title">Forgot Password</h1>
            <div className="u-auth-sub">No worries, we'll send you a code <br/>to reset the password</div>

            <form onSubmit={onSubmit}>
              <label className="u-auth-muted">Email</label>
              <input className="u-auth-input" type="email" placeholder="Enter your mail id" required />

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
    </div>
  );
}
