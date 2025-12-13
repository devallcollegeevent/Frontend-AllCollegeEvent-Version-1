"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./DashboardLayout.css";
import ProfileHeader from "@/components/commonCreaterProfile/ProfileHeader";
import { getUserData } from "@/lib/auth";

export default function DashboardLayout({ children }) {
  const [hover, setHover] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  // ===============================
  // ROLE FROM LOCALSTORAGE USERDATA
  // ===============================
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = getUserData();
    if (!userData) return;

    // backend sends: type: "org" | "user"
    setUserRole(userData.type);
  }, []);

  // ===============================
  // BASE PATH
  // ===============================
  const basePath =
    userRole === "org"
      ? "/organizer/dashboard"
      : "/user/dashboard";

  // ===============================
  // HEADER HIDE PATHS
  // ===============================
  const hideHeaderPaths = [
    "/organizer/dashboard/my-space/organizer-create-events",
    "/organizer/dashboard/home",
    "/user/dashboard/home",
    "/organizer/dashboard",
  ];

  const hideHeader = hideHeaderPaths.some((path) =>
    pathname.startsWith(path)
  );

  // ===============================
  // ACTIVE MENU LOGIC
  // ===============================
  const isProfileActive = pathname.includes(`${basePath}/my-profile`);
  const isActivitiesActive = pathname.includes(
    `${basePath}/my-activities`
  );
  const isSettingsActive = pathname.includes(`${basePath}/setting`);
  const isMySpaceActive =
    userRole === "org" &&
    pathname.includes(`${basePath}/my-space`);

  const toggleMenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  // ⬇️ No react-icons dependency
  const Arrow = ({ isOpen }) => (
    <span className="arrow-icon">{isOpen ? "▲" : "▼"}</span>
  );

  return (
    <div className="dash-container">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`sidebar ${hover ? "expanded" : ""}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* -------- PROFILE -------- */}
        <div
          className={`menu-item ${
            isProfileActive ? "active-menu" : ""
          }`}
          onClick={() => toggleMenu("profile")}
        >
          <img src="/images/User.png" className="side_nav_img" />
          {hover && (
            <div className="side_nav_content">
              <span className="title">Profile</span>
              <Arrow isOpen={openMenu === "profile"} />
            </div>
          )}
        </div>

        {hover && openMenu === "profile" && (
          <div className="dropdown">
            <Link
              href={`${basePath}/my-profile/profile`}
              className="sub-link"
            >
              My Profile
            </Link>

            {userRole === "org" && (
              <Link
                href="/organizer/dashboard/my-profile/managepage"
                className="sub-link"
              >
                Manage Page
              </Link>
            )}

            <Link
              href={`${basePath}/my-profile/delete`}
              className="sub-link"
            >
              Delete
            </Link>
          </div>
        )}

        {/* -------- ACTIVITIES -------- */}
        <div
          className={`menu-item ${
            isActivitiesActive ? "active-menu" : ""
          }`}
          onClick={() => toggleMenu("activities")}
        >
          <img
            src="/images/myactivityes.png"
            className="side_nav_img"
          />
          {hover && (
            <div className="side_nav_content">
              <span className="title">My Activities</span>
              <Arrow isOpen={openMenu === "activities"} />
            </div>
          )}
        </div>

        {hover && openMenu === "activities" && (
          <div className="dropdown">
            <Link
              href={`${basePath}/my-activities/saved-event`}
              className="sub-link"
            >
              My Saved List
            </Link>

            {userRole === "org" && (
              <Link
                href="/organizer/dashboard/my-activities/booking-event"
                className="sub-link"
              >
                My Bookings
              </Link>
            )}
          </div>
        )}

        {/* -------- MY SPACE (ORGANIZER ONLY) -------- */}
        {userRole === "org" && (
          <>
            <div
              className={`menu-item ${
                isMySpaceActive ? "active-menu" : ""
              }`}
              onClick={() => toggleMenu("space")}
            >
              <img
                src="/images/myspace.png"
                className="side_nav_img"
              />
              {hover && (
                <div className="side_nav_content">
                  <span className="title">My Space</span>
                  <Arrow isOpen={openMenu === "space"} />
                </div>
              )}
            </div>

            {hover && openMenu === "space" && (
              <div className="dropdown">
                <Link
                  href="/organizer/dashboard/my-space/organizer-create-events"
                  className="sub-link"
                >
                  Create Event
                </Link>

                <Link
                  href="/organizer/dashboard/my-space/organizer-dashboard"
                  className="sub-link"
                >
                  Dashboard
                </Link>

                <Link
                  href="/organizer/dashboard/my-space/organizer-my-event"
                  className="sub-link"
                >
                  My Event
                </Link>
              </div>
            )}
          </>
        )}

        {/* -------- SETTINGS -------- */}
        <div
          className={`menu-item ${
            isSettingsActive ? "active-menu" : ""
          }`}
          onClick={() => toggleMenu("settings")}
        >
          <img src="/images/Settings.png" className="side_nav_img" />
          {hover && (
            <div className="side_nav_content">
              <span className="title">Settings</span>
              <Arrow isOpen={openMenu === "settings"} />
            </div>
          )}
        </div>

        {hover && openMenu === "settings" && (
          <div className="dropdown">
            <Link
              href={`${basePath}/setting/notification`}
              className="sub-link"
            >
              Notifications
            </Link>

            <Link
              href={`${basePath}/setting/email-setting`}
              className="sub-link"
            >
              Email Setting
            </Link>
          </div>
        )}
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="right-content role-container">
        {!hideHeader && (
          <ProfileHeader
            profileImage="/images/user.jpg"
            name="Vanisree M"
            followers="357"
            following="357"
            rank="12"
            reviews="537"
            role={userRole === "org" ? "Organizer" : "User"}
          />
        )}

        <div className="page-wrapper">{children}</div>
      </div>
    </div>
  );
}
