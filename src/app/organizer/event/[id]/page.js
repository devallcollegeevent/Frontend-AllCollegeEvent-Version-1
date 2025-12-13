"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrganizerSingleEventApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { getUserData } from "@/lib/auth";

import {
  LABEL_EVENT_DATE,
  LABEL_EVENT_TIME,
  LABEL_EVENT_MODE,
  LABEL_EVENT_VENUE,
  DEFAULT_TEXT,
  DEFAULT_DATE,
  DEFAULT_TIME,
  DEFAULT_MODE,
  MSG_EVENT_LOAD_ERROR,
  LABEL_LOADING ,
  DEFAULT_BACK ,

} from "@/const-value/config-message/page";
import "../[id]/style.css"

// ------------------------------------------------------------
// Organizer Event Details Page
// Shows event banner, details, and edit button
// ------------------------------------------------------------
export default function OrganizerEventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const userData = getUserData();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------------
  // Load single event by ID
  // ------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await getOrganizerSingleEventApi(userData.identity, id);
        setEvent(res.data?.data || null);
      } catch (err) {
        toast.error(MSG_EVENT_LOAD_ERROR);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p className="p-4">{LABEL_LOADING}</p>;
  if (!event) return <p className="p-4">{MSG_NO_EVENT_FOUND_FOR_USER}</p>;

  const banner = event.bannerImage || "/no-image.png";

  return (
    <div className="container py-4 shadow-none p-3 mb-5 bg-light rounded mt-5">

      {/* Back Button */}
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => router.back()}
      >
        ← {DEFAULT_BACK}
      </button>

      {/* Banner */}
      <div className="position-relative mb-4">
        <img
          src={banner}
          className="img-fluid rounded singel_event_img"
         
        />

        <span
          className="position-absolute bottom-0 start-0 m-3 px-3 py-2 rounded text-white"
          style={{ background: "var(--primary-color)" }}
        >
          {event.eventDate > new Date().toISOString().split("T")[0]
            ? "Upcoming"
            : "Completed"}
        </span>
      </div>

      <div className="row g-4">

        {/* LEFT SIDE */}
        <div className="col-lg-8">

          <h2 className="fw-bold">{event.title}</h2>

          {/* Tags */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            <span className="badge bg-primary-subtle text-primary">{event.mode || DEFAULT_MODE}</span>
            <span className="badge bg-light text-dark">{event.eventDate || DEFAULT_DATE}</span>
            <span className="badge bg-light text-dark">{event.eventTime || DEFAULT_TIME}</span>
          </div>

          {/* Description */}
          <p className="mt-4">{event.description || DEFAULT_TEXT}</p>

          {/* Details Grid */}
          <div className="row g-3 mt-3">

            <div className="col-md-6">
              <div className="p-3 border rounded bg-light">
                <strong>Organizer</strong>
                <div>{event.org?.organizationName || DEFAULT_TEXT}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 border rounded bg-light">
                <strong>{LABEL_EVENT_VENUE}</strong>
                <div>{event.venue || DEFAULT_TEXT}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 border rounded bg-light">
                <strong>{LABEL_EVENT_DATE}</strong>
                <div>{event.eventDate || DEFAULT_DATE}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 border rounded bg-light">
                <strong>{LABEL_EVENT_TIME}</strong>
                <div>{event.eventTime || DEFAULT_TIME}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 border rounded bg-light">
                <strong>{LABEL_EVENT_MODE}</strong>
                <div>{event.mode || DEFAULT_MODE}</div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-lg-4">
          <div className="p-4 border rounded shadow-sm">

            <h5 className="fw-bold mb-3">Event Summary</h5>

            <p><strong>{LABEL_EVENT_DATE} :</strong> {event.eventDate || DEFAULT_DATE}</p>
            <p><strong>{LABEL_EVENT_TIME} :</strong> {event.eventTime || DEFAULT_TIME}</p>
            <p><strong>{LABEL_EVENT_VENUE} :</strong> {event.venue || DEFAULT_TEXT}</p>
            <p><strong>{LABEL_EVENT_MODE} :</strong> {event.mode || DEFAULT_MODE}</p>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => router.push(`/organizer/event/create?id=${event.identity}`)}
            >
              Edit Event
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
