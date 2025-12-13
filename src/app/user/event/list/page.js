"use client";

import { useEffect, useState } from "react";
import { getAllEventsApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "../list/event-list.css";

// ROUTES
import { loginPage } from "@/app/routes";

// LOGOUT HANDLER
import { logoutUser } from "@/lib/logout";

// CONST VALUES (already exist — using only what you have)
import {
  LABEL_LOADING,
  LABEL_LOGOUT,
  MSG_NO_EVENT_FOUND_FOR_USER,
  MSG_EVENT_LOAD_FAILED,
  MSG_GENERIC_ERROR,
  MSG_NOIMAGE_FAILED,
  LABEL_EVENT_DATE,
  LABEL_EVENT_VENUE,
  LABEL_EVENT_MODE,
  LABEL_EVENT_PRICE,
  DEFAULT_TEXT,
  DEFAULT_DATE,
  DEFAULT_MODE,
  DEFAULT_PRICE,
  LABEL_EVENT_TIME,
  DEFAULT_TIME,
} from "@/const-value/config-message/page";

export default function EventListPage() {
  const router = useRouter();

  // -----------------------------
  // STATE
  // -----------------------------
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // LOAD EVENTS
  // -----------------------------
  const loadEvents = async () => {
    try {
      const res = await getAllEventsApi();

      if (res.success) {
        setEvents(res.data?.data || []);
      } else {
        toast.error(res.message || MSG_EVENT_LOAD_FAILED);
      }
    } catch (error) {
      toast.error(MSG_GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="container py-5">
      {/* ---------------- HEADER ---------------- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">All Events</h2>

        <button
          className="btn btn-danger"
          onClick={() => {
            try {
              logoutUser();
              router.push(loginPage);
            } catch (err) {
              console.error("Logout error:", err);
            }
          }}
        >
          {LABEL_LOGOUT}
        </button>
      </div>

      {/* ---------------- LOADING ---------------- */}
      {loading && <p className="text-center">{LABEL_LOADING}</p>}

      {/* ---------------- EMPTY ---------------- */}
      {!loading && events.length === 0 && (
        <p className="text-center text-muted">{MSG_NO_EVENT_FOUND_FOR_USER}</p>
      )}

      {/* ---------------- EVENTS GRID (Bootstrap 5) ---------------- */}
      <div className="row g-4">
        {!loading &&
          events.map((event) => (
            <div key={event.identity} className="col-lg-4 col-md-6 col-12">
              <div
                className="card h-100 shadow-sm"
                role="button"
                onClick={() => router.push(`/user/event/${event.identity}`)}
              >
                {/* Image */}
                {event.bannerImage ? (
                  <img
                    src={event.bannerImage}
                    className="card-img-top"
                    alt="Event Banner"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center bg-light"
                    style={{ height: "200px" }}
                  >
                    {MSG_NOIMAGE_FAILED}
                  </div>
                )}

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title fw-bold text-uppercase">
                    {event.title || DEFAULT_TEXT}
                  </h5>

                  <div className="d-flex justify-content-between mt-3 gap-3">
                    {/* LEFT SIDE */}
                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                      <p className="mb-1 text-truncate">
                        <strong>{LABEL_EVENT_DATE} :</strong>
                        <span className="ms-1">
                          {event.eventDate || DEFAULT_DATE}
                        </span>
                      </p>

                      <p className="mb-1 text-truncate">
                        <strong>{LABEL_EVENT_TIME} :</strong>
                        <span className="ms-1">
                          {event.eventTime || DEFAULT_TIME}
                        </span>
                      </p>

                      <p className="mb-1 text-capitalize text-truncate">
                        <strong>{LABEL_EVENT_MODE} :</strong>
                        <span className="ms-1">
                          {event.mode || DEFAULT_MODE}
                        </span>
                      </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div
                      className="flex-grow-1 text-end"
                      style={{ minWidth: 0 }}
                    >
                      <p className="mb-1 text-truncate">
                        <strong>{LABEL_EVENT_VENUE} :</strong>
                        <span className="ms-1">
                          {event.venue || DEFAULT_TEXT}
                        </span>
                      </p>

                      <p className="mb-1 text-truncate">
                        <strong>{LABEL_EVENT_PRICE} :</strong>
                        <span className="ms-1">
                          ₹{event.price || DEFAULT_PRICE}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
