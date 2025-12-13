"use client";

// Imports
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

import {
  ACTION_CREATE_EVENT,
  ACTION_LIST_EVENT,
  LABEL_DASHBOARD,
  LABEL_LOGOUT,
  MSG_GENERIC_ERROR,
  MSG_LOGOUT_SUCCESS,
  TITLE_WELCOME_DASHBOARD,
} from "@/const-value/config-message/page";

import { toast } from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Go to create event page
  const goToCreateEvent = () => {
    router.push(organizerEventCreatePage);
  };

  // Go to event list page
  const goToListEvent = () => {
    router.push(organizerEventListPage);
  };

  // Logout organizer
  const handleLogout = () => {
    try {
      dispatch(organizerLogout());
      logoutOrganizer();
      router.push(loginPage);
      toast.success(MSG_LOGOUT_SUCCESS);
    } catch (error) {
      toast.error(MSG_GENERIC_ERROR);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">{LABEL_DASHBOARD}</h1>
        <button onClick={handleLogout} className="logout-btn">
          {LABEL_LOGOUT}
        </button>
      </div>

      {/* Sub Text */}
      <div className="dashboard-sub">{TITLE_WELCOME_DASHBOARD}</div>

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <button onClick={goToCreateEvent} className="dashboard-btn">
          {ACTION_CREATE_EVENT}
        </button>
        <button onClick={goToListEvent} className="dashboard-btn">
          {ACTION_LIST_EVENT}
        </button>
      </div>
    </div>
  );
}
