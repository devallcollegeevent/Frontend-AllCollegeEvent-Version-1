"use client";

import { getOrganizerEventsApi, deleteEventApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { organizerEventCreatePage, organizerLoginPage } from "@/app/routes";
import { logoutUser } from "@/lib/logout";
import { getUserData } from "@/lib/auth";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrganizerEventListPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = getUserData();  
  const organizerId = userData?.identity; 

  const loadEvents = async () => {
    if (!organizerId) {
      toast.error("Organizer not logged in");
      router.push(organizerLoginPage);
      return;
    }

    setLoading(true);

    const res = await getOrganizerEventsApi(organizerId);

    if (res.success) {
      const list = Array.isArray(res.data) ? res.data : res.data?.events || [];
      setEvents(list);
    } else {
      toast.error("Failed to load events");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push(organizerLoginPage);
  };

  return (
    <div style={{ padding: 25 }}>
      
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          background: "#ff4444",
          color: "#fff",
          borderRadius: "10px",
          marginBottom: 20,
          cursor: "pointer",
          border: "none",
        }}
      >
        Logout
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <h1 style={{ fontSize: 26, fontWeight: "700" }}>My Events</h1>

        <button
          onClick={() => router.push(organizerEventCreatePage)}
          style={{
            padding: "10px 18px",
            background: "#7f00ff",
            color: "#fff",
            borderRadius: "10px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Create Event
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: 40, textAlign: "center" }}>Loading...</div>
      )}

      {!loading && events.length === 0 && (
        <div style={{ marginTop: 40, textAlign: "center", fontSize: 18 }}>
          No events found for this organizer
        </div>
      )}

      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 25,
        }}
      >
        {events.map((ev) => {
          const id = ev.identity || ev.identity;
          const title = ev.title || "Untitled Event";
          const city = ev.venue || ev.venue || "Unknown";
          const date = ev.eventDate || "N/A";
          const mode = ev.mode || "N/A";
          const price = ev.price || 500;

          const image = ev.bannerImage || "==="

          return (
            <div
              key={id}
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid #eaeaea",
                padding: 12,
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              <img
                src={image}
                style={{
                  width: "100%",
                  height: 160,
                  borderRadius: 12,
                  objectFit: "cover",
                }}
              />

              <h3 style={{ fontSize: 17, fontWeight: 700, margin: "10px 0 6px" }}>
                {title}
              </h3>

              <div>📍 {city}</div>
              <div>💰 ₹{price}</div>
              <div>📅 {date} • {mode}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
