'use client';

import '../../user-auth.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ViewIcon, HideIcon } from '@/components/icons/Icons';

export default function Page(){
  const router = useRouter();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  function onSubmit(e){
    e.preventDefault();
    // validate and call API -> on success:
    router.push('/user/reset-password/success');
  }

  return (
    <div className="u-auth-shell container-fluid">
      <div className="row u-auth-row g-0">

        <div className="col-lg-6 u-auth-left">
          <img src="/images/auth-forgot.png" alt="reset left" />
        </div>

        <div className="col-lg-6 u-auth-right">
          <div className="u-auth-card">
            <h1 className="u-auth-title">Set New Password</h1>
            <div className="u-auth-sub">Must be at least 8 characters</div>

            <form onSubmit={onSubmit}>
              <label className="u-auth-muted">Set new password</label>
              <div className="u-auth-pass-wrap">
                <input className="u-auth-input" type={show1 ? 'text' : 'password'} placeholder="Enter your new password"  />
                <span className="u-auth-pass-toggle" onClick={()=>setShow1(!show1)}>
                  {show1 ? <HideIcon/> : <ViewIcon/>}
                </span>
              </div>

              <label className="u-auth-muted">Confirm Password</label>
              <div className="u-auth-pass-wrap">
                <input className="u-auth-input" type={show2 ? 'text' : 'password'} placeholder="Re-enter password"  />
                <span className="u-auth-pass-toggle" onClick={()=>setShow2(!show2)}>
                  {show2 ? <HideIcon/> : <ViewIcon/>}
                </span>
              </div>

              <button className="u-auth-btn-primary" type="submit">Continue</button>
            </form>

            <div style={{marginTop:16}}>
              <div className="u-auth-pager">
                <div className="u-auth-dot">1</div>
                <div className="u-auth-dot">2</div>
                <div className="u-auth-dot active">3</div>
                <div className="u-auth-dot">4</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
