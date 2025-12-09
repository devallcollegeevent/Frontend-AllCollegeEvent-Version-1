"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getEventByIdApi } from "@/lib/apiClient";
import "./event.css";

export default function SingleEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    try {
      if (id) loadEvent();
    } catch (error) {
      console.error("Load event error:", error);
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      const res = await getEventByIdApi(id);
      if (res.success) {
        setEvent(res.data.data);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  if (!event) return <div className="event-loading">Loading…</div>;

  return (
    <div className="event-view-container">

      <button
        className="event-back-btn"
        onClick={() => {
          try {
            router.back();
          } catch (err) {
            console.error("Back navigation error:", err);
          }
        }}
      >
        ← Back
      </button>

      <div className="event-card">
        <img src={event.bannerImage} className="event-banner" />

        <div className="event-card-body">
          <h2 className="event-title">{event.title}</h2>

          <div className="event-divider"></div>

          {/* Row 1 */}
          <div className="event-row">
            <div className="event-box">
              <h6 className="event-box-title">📍 Location</h6>
              <p>{event.city || event.venue}</p>
            </div>

            <div className="event-box">
              <h6 className="event-box-title">📅 Date</h6>
              <p>{event.eventDate}</p>
            </div>

            <div className="event-box">
              <h6 className="event-box-title">💰 Price</h6>
              <p>₹ {event.price}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="event-row">
            <div className="event-box">
              <h6 className="event-box-title">🎟 Event Mode</h6>
              <p>{event.mode}</p>
            </div>

            <div className="event-box">
              <h6 className="event-box-title">📌 Category</h6>
              <p>{event.category}</p>
            </div>
          </div>

          {/* Description */}
          <div className="event-description-box">
            <h4 className="event-desc-title">Event Description</h4>
            <p className="event-description">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
