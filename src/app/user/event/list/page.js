"use client";

import { useEffect, useState } from "react";
import { getAllEventsApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginPage } from "@/app/routes";
import { logoutUser } from "@/lib/logout";
import "./event-list.css";

export default function EventListPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    const res = await getAllEventsApi();

    if (res.success) {
      setEvents(res.data.data || []);
      setLoading(false);
    } else {
      toast.error(res.message || "Failed to load events");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="uev-wrapper">
      
      {/* Header */}
      <div className="uev-header">
        <h1 className="uev-title">All Events</h1>

        <div className="uev-actions">
          <button
            className="uev-btn-logout"
            onClick={() => {
              logoutUser();
              router.push(loginPage);
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <div className="uev-loading">Loading...</div>}

      {/* Empty */}
      {!loading && events.length === 0 && (
        <div className="uev-no-events">No events found</div>
      )}

      {/* Events Grid */}
      <div className="uev-grid">
        {events.map((ev) => {
          const id = ev.identity;
          const title = ev.title || "Untitled Event";
          const city = ev.city || ev.venue || "N/A";
          const date = ev.eventDate || "No date";
          const mode = ev.mode || "N/A";
          const price = ev.price || 0;
          const image = ev.bannerImage;

          return (
            <div
              key={id}
              className="uev-card"
              onClick={() => router.push(`/user/event/${id}`)}
            >
              <div className="uev-card-media">
                {image ? (
                  <img src={image} alt="event banner" />
                ) : (
                  <span className="uev-noimg">No Image</span>
                )}
              </div>

              <div className="uev-card-body">
                <h3 className="uev-card-title">{title}</h3>
                <div>📍 {city}</div>
                <div>📅 {date}</div>
                <div>🎟 Mode: {mode}</div>
                <div>💰 Price: ₹{price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
