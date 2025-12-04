"use client";

import { useRouter } from "next/navigation";
import { organizerEventCreatePage, organizerEventListPage } from "@/app/routes";
import "../dashboard/dashboard.css"

export default function Dashboard() {
  const router = useRouter();

  function goToCreateEvent() {
    router.push(organizerEventCreatePage);
  }
  function goToListEvent() {
    router.push(organizerEventListPage);
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-sub">Welcome to your dashboard</div>
    <div style={{display:"flex",gap:"50px", justifyContent:"center"}}>

      <button 
        onClick={goToCreateEvent}
        style={{
          padding: "12px 22px",
          borderRadius: "10px",
          background: "#7F00FF",
          color: "white",
          fontWeight: "600",
          border: "none",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        Go to Create Event Page
      </button>
      <button 
        onClick={goToListEvent}
        style={{
          padding: "12px 22px",
          borderRadius: "10px",
          background: "#7F00FF",
          color: "white",
          fontWeight: "600",
          border: "none",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        Go to List of  Event
      </button>
    </div>
    </div>
  );
}
