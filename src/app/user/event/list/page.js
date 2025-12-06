"use client";

import { useEffect, useState } from "react";
import { getAllEventsApi, deleteEventApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginPage, organizerSignupCategoryPage } from "@/app/routes";
import { logoutUser } from "@/lib/logout";

export default function EventListPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    const res = await getAllEventsApi();


    if (res.success) {
      setEvents(res.data.events || []);
      setLoading(false)
    } else {
      toast.error(res.message || "Failed to load events");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div style={{ padding: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "26px", fontWeight: "700" }}>My Events</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              logoutUser();
              router.push(loginPage);
            }}
            style={{
              padding: "8px 16px",
              background: "red",
              color: "#fff",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>

          <button
            onClick={() => router.push(organizerSignupCategoryPage)}
            style={{
              padding: "10px 18px",
              background: "#7f00ff",
              color: "#fff",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            + Create Event
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>Loading...</div>
      )}

      {!loading && events.length === 0 && (
        <div
          style={{ marginTop: "40px", textAlign: "center", fontSize: "18px" }}
        >
          No events found
        </div>
      )}

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
        
      >
        {events.map((ev) => {
          const id = ev.identity ?? ev.identity;
          const title = ev.title ?? "Untitled Event";
          const city = ev.city ?? ev.venue ?? "N/A";
          const date = ev.eventDate ?? "No date";
          const mode = ev.mode ?? "N/A";
          const price = ev.price ?? 0;
          const image = ev.bannerImage ?? "--";

          return (
            <div
              key={id}
              onClick={() => router.push(`/user/event/${id}?orgId=${ev.orgIdentity}`)}
              style={{
                background: "#fff",
                borderRadius: "18px",
                border: "1px solid #eaeaea",
                padding: "12px",
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              <img
                src={image}
                style={{
                  width: "100%",
                  height: "160px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "10px 4px" }}>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </h3>

                <div>📍 {city}</div>
                <div style={{ marginTop: "5px" }}>📅 {date}</div>
                <div style={{ marginTop: "5px" }}>🎟 Mode: {mode}</div>
                <div style={{ marginTop: "5px" }}>💰 Price: ₹{price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
