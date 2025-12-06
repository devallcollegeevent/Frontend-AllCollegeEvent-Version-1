"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrganizerSingleEventApi } from "@/lib/apiClient";
import "./style.css";
import { toast } from "react-hot-toast";
import { getUserData } from "@/lib/auth";

export default function OrganizerEventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const userData = getUserData();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getOrganizerSingleEventApi(userData.identity, id);
        setEvent(res.data?.event || null);
      } catch (err) {
        toast.error("Failed to load event");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p className="p-4">Loading event...</p>;
  if (!event) return <p className="p-4">Event not found</p>;

  const banner = event.bannerImage || "/no-image.png";

  return (
    <div className="container event-page-wrapper shadow p-3 mb-5 mt-5 bg-body-tertiary rounded">
      {/* Back Button */}
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      {/* Banner */}
      <div className="event-banner-box mb-4">
        <img src={banner} className="event-banner-img" />
        <span className="event-status-tag">
          {event.eventDate > new Date().toISOString().split("T")[0]
            ? "Upcoming"
            : "Completed"}
        </span>
      </div>

      <div className="row g-4">
        {/* LEFT CONTENT */}
        <div className="col-lg-8">
          {/* Title */}
          <h2 className="event-title">{event.title}</h2>

          {/* Tags */}
          <div className="event-tags mt-2">
            <span className="tag tag-purple">{event.mode}</span>
            <span className="tag tag-light">{event.eventDate}</span>
            <span className="tag tag-light">{event.eventTime}</span>
          </div>

          {/* Description */}
          <p className="event-description mt-4">
            {event.description || "No description available"}
          </p>

          {/* DETAIL GRID */}
          <div className="detail-grid mt-4">
            <div className="detail-item">
              <span className="detail-icon">🏫</span>
              <div>
                <strong>Organizer</strong>
                <p>{event.org?.organizationName || "N/A"}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <strong>Venue</strong>
                <p>{event.venue}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <div>
                <strong>Date</strong>
                <p>{event.eventDate}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">⏰</span>
              <div>
                <strong>Time</strong>
                <p>{event.eventTime}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">🎫</span>
              <div>
                <strong>Mode</strong>
                <p>{event.mode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR CARD */}
        <div className="col-lg-4">
          <div className="right-card p-4 shadow-sm">
            <h5 className="fw-bold mb-3">Event Summary</h5>

            <div className="summary-item">
              <span>📅</span> <p>{event.eventDate}</p>
            </div>

            <div className="summary-item">
              <span>⏰</span> <p>{event.eventTime}</p>
            </div>

            <div className="summary-item">
              <span>📍</span> <p>{event.venue}</p>
            </div>

            <div className="summary-item">
              <span>🎫</span> <p>{event.mode}</p>
            </div>

            <button
              className="btn btn-primary w-100 mt-4"
              onClick={() =>
                router.push(`/organizer/event/create?id=${event.identity}`)
              }
            >
              Edit Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
