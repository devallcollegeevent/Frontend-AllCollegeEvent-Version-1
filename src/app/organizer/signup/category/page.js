'use client';

import '../../organizer-auth.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CorporateIcon, EventManagementIcon, GovermentIcon, IndividualIcon, NgoIcon, SportsIcon, TechOneIcon, TrainingIcon, UniversityIcon } from '@/components/icons/Icons';

const CATEGORIES = [
  { id: 'college', title: 'College / University' , icon: <UniversityIcon/>  },
  { id: 'training', title: 'Training & Coaching Institute', icon:<TrainingIcon/> },
  { id: 'individual', title: 'Individual / Freelancer', icon:<IndividualIcon/> },
  { id: 'event', title: 'Event Management Company', icon:<EventManagementIcon/> },
  { id: 'tech', title: 'Tech / Professional Community', icon:<TechOneIcon/> },
  { id: 'sports', title: 'Sports Club / Fitness Association', icon:<SportsIcon/> },
  { id: 'corporate', title: 'Corporate / Company' ,icon:<CorporateIcon/>},
  { id: 'gov', title: 'Government Organization', icon:<GovermentIcon/>},
  { id: 'ngo', title: 'NGO / Non-Profit Organization' , icon:<NgoIcon/>}
];

export default function Page(){
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  function onContinue(){
    if(!selected) return alert('Please pick a category');
    router.push(`/organizer/signup/details?cat=${selected}`);
  }

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100 p-1">
        <div className="col-lg-6 col-md-6 col-12 organizer-left">
          <img className="organizer-left-img" src="/images/organizer-rocket.png" alt="rocket" />
        </div>

        <div className="col-lg-6 col-md-6 col-12 organizer-right">
          <div className="organizer-card">
            {/* Stepper */}
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:10}}>
              <div className="organizer-step active">
                <div className="dot">1</div>
                <div style={{fontSize:12, marginTop:8}}>Organization Category</div>
              </div>
              <div style={{flex:1, height:3, background:'#eee'}}></div>
              <div className="organizer-step">
                <div className="dot" style={{background:'#eee'}}>2</div>
                <div style={{fontSize:12, marginTop:8}}>Organization Details</div>
              </div>
              <div style={{flex:1, height:3, background:'#eee'}}></div>
              <div className="organizer-step">
                <div className="dot" style={{background:'#eee'}}>3</div>
                <div style={{fontSize:12, marginTop:8}}>Account Creation</div>
              </div>
            </div>

            <h2 className="organizer-title">Organization Category</h2>
            <div className="organizer-sub">Select which category best describes your organization</div>

            <div className="category-grid">
              {CATEGORIES.map(c => (
                <div
                  key={c.id}
                  className="category-card "
                  onClick={() => setSelected(c.id)}
                >
                  <div className="icon">
                  {c.icon}
                  </div>
                  <div style={{fontSize:13, fontWeight:600}}>{c.title}</div>
                </div>
              ))}
            </div>

           <div style={{marginTop:8 , padding:"10px 91px"}}>
                <button className="btn-primary-ghost" onClick={onContinue}>Continue</button>
              </div>

            <div className="small-note">Already have an Account!? <a href="/organizer/login" >Sign In</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
