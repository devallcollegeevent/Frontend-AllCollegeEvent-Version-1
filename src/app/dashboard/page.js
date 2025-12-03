"use client";

import { useRouter } from "next/navigation";
import { organizerEventCreatePage } from "@/app/routes";
import "../dashboard/dashboard.css"

export default function Dashboard() {
  const router = useRouter();

  function goToCreateEvent() {
    router.push(organizerEventCreatePage);
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-sub">Welcome to your dashboard</div>

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
    </div>
  );
}
