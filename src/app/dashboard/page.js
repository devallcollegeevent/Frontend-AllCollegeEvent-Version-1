"use client";

import { useRouter } from "next/navigation";
import {
  loginPage,
  organizerEventCreatePage,
  organizerEventListPage,
} from "@/app/routes";
import "../dashboard/dashboard.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  function goToCreateEvent() {
    router.push(organizerEventCreatePage);
  }

  function goToListEvent() {
    router.push(organizerEventListPage);
  }

  function handleLogout() {
    document.cookie = "token=; Max-Age=0; path=/;"; 
    clearToken(); 
    dispatch(logoutUser()); 
    router.push(loginPage);
  }

  return (
    <div className="dashboard-wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <h1 className="dashboard-title">Dashboard</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            background: "#FF4B4B",
            color: "white",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div className="dashboard-sub">Welcome to your dashboard</div>

      <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
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
            cursor: "pointer",
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
            cursor: "pointer",
          }}
        >
          Go to List of Event
        </button>
      </div>
    </div>
  );
}
