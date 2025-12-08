"use client";

import { useRouter } from "next/navigation";
import {
  loginPage,
  organizerEventCreatePage,
  organizerEventListPage,
} from "@/app/routes";
import "../dashboard/dashboard.css";
import { useDispatch } from "react-redux";
import { organizerLogout } from "@/store/organizerAuthSlice";
import { logoutOrganizer } from "@/lib/logout";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToCreateEvent = () => router.push(organizerEventCreatePage);
  const goToListEvent = () => router.push(organizerEventListPage);

  const handleLogout = () => {
    dispatch(organizerLogout());
    logoutOrganizer();
    router.push(loginPage);
  };

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-sub">Welcome to your dashboard</div>

      <div className="dashboard-actions">
        <button onClick={goToCreateEvent} className="dashboard-btn">
          Go to Create Event Page
        </button>

        <button onClick={goToListEvent} className="dashboard-btn">
          Go to List of Event
        </button>
      </div>
    </div>
  );
}
