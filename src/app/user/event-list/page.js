"use client";

import { useEffect, useState } from "react";
import { getAllEventsApi, deleteEventApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { organizerSignupCategoryPage } from "@/app/routes";
import { logoutUser } from "@/lib/logout";

export default function EventListPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Events
  const loadEvents = async () => {
    setLoading(true);
    const res = await getAllEventsApi();

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

  // DELETE EVENT
  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;

    const res = await deleteEventApi(id);

    if (res.success) {
      toast.success("Event deleted");
      setEvents((prev) => prev.filter((ev) => ev.id !== id && ev._id !== id));
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div style={{ padding: "25px" }}>
      {/* ================= HEADER ================== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        <h1 style={{ fontSize: "26px", fontWeight: "700" }}>My Events</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              logoutUser();
              router.push("/organizer/login");
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

          {/* CREATE EVENT BUTTON */}
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

      {/* LOADING */}
      {loading && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          Loading...
        </div>
      )}

      {/* NO EVENTS */}
      {!loading && events.length === 0 && (
        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "18px" }}>
          No events found
        </div>
      )}

      {/* ================================= GRID ================================ */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {events.map((ev) => {
          const id = ev.id ?? ev._id;
          const title = ev.event_title ?? "Untitled Event";
          const city = ev.city ?? ev.venue ?? "N/A";
          const date = ev.event_date ?? "No date";
          const mode = ev.mode ?? "N/A";
          const price = ev.price ?? 0;
          const image =
            ev.image?.startsWith("http") ? ev.image : `/uploads/${ev.image}`;

          return (
            <div
              key={id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                border: "1px solid #eaeaea",
                padding: "12px",
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              {/* IMAGE */}
              <img
                src={image}
                style={{
                  width: "100%",
                  height: "160px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />

              {/* DETAILS */}
              <div style={{ padding: "10px 4px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "8px" }}>
                  {title}
                </h3>

                <div>📍 {city}</div>
                <div style={{ marginTop: "5px" }}>
                  📅 {date}
                </div>
                <div style={{ marginTop: "5px" }}>
                  🎟 Mode: {mode}
                </div>
                <div style={{ marginTop: "5px" }}>
                  💰 Price: ₹{price}
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(id)}
                  style={{
                    marginTop: "12px",
                    padding: "6px 16px",
                    background: "#ffdddd",
                    color: "red",
                    borderRadius: "10px",
                    border: "1px solid red",
                    cursor: "pointer",
                    width: "100%",
                    fontWeight: "600",
                  }}
                >
                  Delete Event
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
