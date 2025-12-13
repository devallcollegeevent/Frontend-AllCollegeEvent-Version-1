"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

import "./DashboardLayout.css";
import Navbar from "@/components/Navbar/Navbar";
import ProfileHeader from "@/app/commonCreaterProfile/ProfileHeader";

export default function DashboardLayout({ children }) {
  const [hover, setHover] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  // ===============================
  // GET ROLE FROM TOKEN
  // ===============================
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error("Invalid token");
    }
  }

  // ===============================
  // BASE PATH (NOW SAME DASHBOARD)
  // ===============================
  const basePath = "/dashboardlayout";

  // ===============================
  // HEADER HIDE PATHS
  // ===============================
  const hideHeaderPaths = [
    "/dashboardlayout/space/create-event",
    "/dashboardlayout",
  ];

  const hideHeader = hideHeaderPaths.some((path) =>
    pathname.startsWith(path)
  );

  // ===============================
  // ACTIVE MENU LOGIC
  // ===============================
  const isProfileActive = pathname.includes("/profile");
  const isActivitiesActive = pathname.includes("/activities");
  const isSettingsActive = pathname.includes("/settings");
  const isMySpaceActive =
    userRole === "organizer" && pathname.includes("/space");

  const toggleMenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  const Arrow = ({ isOpen }) =>
    isOpen ? (
      <FaChevronUp className="arrow-icon" />
    ) : (
      <FaChevronDown className="arrow-icon" />
    );

  return (
    <>
      <Navbar />

      <div className="dash-container">
        {/* ================= SIDEBAR ================= */}
        <div
          className={`sidebar ${hover ? "expanded" : ""}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* -------- PROFILE -------- */}
          <div
            className={`menu-item ${isProfileActive ? "active-menu" : ""}`}
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
              <Link href={`${basePath}/profile`} className="sub-link">
                My Profile
              </Link>

              {userRole === "organizer" && (
                <Link
                  href={`${basePath}/profile/manage`}
                  className="sub-link"
                >
                  Manage Page
                </Link>
              )}

              <Link
                href={`${basePath}/profile/delete`}
                className="sub-link"
              >
                Delete
              </Link>
            </div>
          )}

          {/* -------- ACTIVITIES -------- */}
          <div
            className={`menu-item ${isActivitiesActive ? "active-menu" : ""}`}
            onClick={() => toggleMenu("activities")}
          >
            <img src="/images/myactivityes.png" className="side_nav_img" />
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
                href={`${basePath}/activities/saved-event`}
                className="sub-link"
              >
                My Saved List
              </Link>

              {userRole === "organizer" && (
                <Link
                  href={`${basePath}/activities/booking-event`}
                  className="sub-link"
                >
                  My Bookings
                </Link>
              )}
            </div>
          )}

          {/* -------- MY SPACE (ORGANIZER) -------- */}
          {userRole === "organizer" && (
            <>
              <div
                className={`menu-item ${isMySpaceActive ? "active-menu" : ""}`}
                onClick={() => toggleMenu("space")}
              >
                <img src="/images/myspace.png" className="side_nav_img" />
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
                    href={`${basePath}/space/create-event`}
                    className="sub-link"
                  >
                    Create Event
                  </Link>

                  <Link
                    href={`${basePath}/space/dashboard`}
                    className="sub-link"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href={`${basePath}/space/my-event`}
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
            className={`menu-item ${isSettingsActive ? "active-menu" : ""}`}
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
                href={`${basePath}/settings/notification`}
                className="sub-link"
              >
                Notifications
              </Link>

              <Link
                href={`${basePath}/settings/email-setting`}
                className="sub-link"
              >
                Email Setting
              </Link>
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="right-content role-container">
          {!hideHeader && (
            <ProfileHeader
              profileImage="/images/user.jpg"
              name="Vanisree M"
              followers="357"
              following="357"
              rank="12"
              reviews="537"
              role={userRole === "organizer" ? "Organizer" : "User"}
            />
          )}

          <div className="page-wrapper">{children}</div>
        </div>
      </div>
    </>
  );
}
