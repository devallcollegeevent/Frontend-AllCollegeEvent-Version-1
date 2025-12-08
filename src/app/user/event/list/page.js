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
        {events.map((event) => {
          return (
            <div
              key={event.identity}
              className="uev-card"
              onClick={() => router.push(`/user/event/${event.identity}`)}
            >
              <div className="uev-card-media">
                {event.bannerImage ? (
                  <img src={event.bannerImage} alt="event banner" />
                ) : (
                  <span className="uev-noimg">No Image</span>
                )}
              </div>

              <div className="uev-card-body">
                <h3 className="uev-card-title">{event.title}</h3>
                <div>📍 {event.venue}</div>
                <div>📅 {event.eventDate}</div>
                <div>🎟 Mode: {event.mode || "N/A"}</div>
                <div>💰 Price: ₹{event.price || 0}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
