"use client";

import { getOrganizerEventsApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import {
  organizerEventCreatePage,
  organizerLoginPage,
} from "@/app/routes";
import { logoutUser } from "@/lib/logout";
import { getUserData } from "@/lib/auth";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./event-list.css";

export default function OrganizerEventListPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = getUserData();

  const loadEvents = async () => {
    if (!userData?.identity) {
      toast.error("Organizer not found");
      router.push(organizerLoginPage);
      return;
    }

    setLoading(true);

    const res = await getOrganizerEventsApi(userData.identity);

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
    <div className="evlist-shell">

      {/* Logout Button */}
      <button onClick={handleLogout} className="evlist-logout-btn">
        Logout
      </button>

      {/* Header */}
      <div className="evlist-header">
        <h1 className="evlist-title">My Events</h1>

        <button
          onClick={() => router.push(organizerEventCreatePage)}
          className="evlist-create-btn"
        >
          + Create Event
        </button>
      </div>

      {/* Loading */}
      {loading && <div className="evlist-loading">Loading...</div>}

      {/* Empty State */}
      {!loading && events.length === 0 && (
        <div className="evlist-empty">No events found for this organizer</div>
      )}

      {/* Events Grid */}
      <div className="evlist-grid">
        {events.map((ev) => {
          const id = ev.identity;
          const title = ev.title || "Untitled Event";
          const city = ev.venue || "Unknown";
          const date = ev.eventDate || "N/A";
          const mode = ev.mode || "N/A";
          const price = ev.price || 500;
          const image = ev.bannerImage || "";

          return (
            <div
              key={id}
              onClick={() => router.push(`/organizer/event/${id}`)}
              className="ev-card"
            >
              <div className="ev-card-media">
                {image ? (
                  <img src={image} />
                ) : (
                  <span className="ev-card-noimg">No Image</span>
                )}
              </div>

              <h3 className="ev-card-title">{title}</h3>

              <div className="ev-card-meta">
                <span>📅 {date}</span>
                <span className="ev-mode">{mode}</span>
              </div>

              <div className="ev-card-venue">📍 {city}</div>
              <div className="ev-card-venue">💰 ₹{price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
