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

  const goToCreateEvent = () => {
    try {
      router.push(organizerEventCreatePage);
    } catch (error) {
      console.error("Error in goToCreateEvent:", error);
    }
  };

  const goToListEvent = () => {
    try {
      router.push(organizerEventListPage);
    } catch (error) {
      console.error("Error in goToListEvent:", error);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(organizerLogout());
      logoutOrganizer();
      router.push(loginPage);
    } catch (error) {
      console.error("Error in handleLogout:", error);
    }
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
