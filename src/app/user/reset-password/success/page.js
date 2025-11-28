'use client';

import '../../user-auth.css';
import { useRouter } from 'next/navigation';

export default function Page(){
  const router = useRouter();

  return (
    <div className="u-auth-shell container-fluid">
      <div className="row u-auth-row g-0">

        <div className="col-lg-6 u-auth-left">
          <img src="/images/auth-forgot.png" alt="success left" />
        </div>

        <div className="col-lg-6 u-auth-right">
          <div className="u-auth-card" style={{textAlign:'center'}}>
            <h1 className="u-auth-title">Password Changed !</h1>
            <div style={{marginTop:20}}>
              <button className="u-auth-btn-primary" onClick={()=>router.push('/user/login')}>Go to Login</button>
            </div>

            <div style={{marginTop:16}}>
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
    </div>
  );
}
