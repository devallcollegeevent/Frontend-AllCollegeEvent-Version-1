'use client';

import { loginPage } from '@/app/routes';
import '../../user-auth.css';
import { useRouter } from 'next/navigation';

export default function Page(){
  const router = useRouter();

  return (
    <div className="u-auth-shell">
      <div className="u-auth-left">
        <img src="/images/auth-forgot.png" alt="success left" />
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card u-auth-success">
          <h1 className="u-auth-title">Password Changed !</h1>
          <div style={{marginTop:20}}>
            <button className="u-auth-btn-primary" onClick={()=>router.push(loginPage)}>Go to Login</button>
          </div>

          <div>
            <div className="u-auth-pager">
              <div className="u-auth-dot">1</div>
              <div className="u-auth-dot">2</div>
              <div className="u-auth-dot">3</div>
              <div className="u-auth-dot active">4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
