"use client";

import { getOrganizerEventsApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { organizerEventCreatePage, organizerLoginPage } from "@/app/routes";
import { logoutUser } from "@/lib/logout";
import { getUserData } from "@/lib/auth";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  MSG_ORGANIZER_NOT_FOUND,
  MSG_EVENT_LOAD_FAILED,
  MSG_EVENT_LOAD_ERROR,
  MSG_LOGOUT_FAILED,
  ACTION_CREATE_EVENT,
  LABEL_LOGOUT,
  ACTION_MY_EVENT,
  LABEL_LOADING,
  MSG_NOIMAGE_FAILED,
  MSG_NO_EVENT_FOUND_FOR_ORGANIZER,
  LABEL_EVENT_DATE,
  LABEL_EVENT_TIME,
  LABEL_EVENT_MODE,
  LABEL_EVENT_VENUE,
  LABEL_EVENT_PRICE,
  DEFAULT_TEXT,
  DEFAULT_PRICE,
  DEFAULT_MODE,
  DEFAULT_DATE,
  DEFAULT_TIME,
} from "@/const-value/config-message/page";
import "../list/event-list.css";

export default function OrganizerEventListPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = getUserData();

  // Load events
  const loadEvents = async () => {
    try {
      if (!userData?.identity) {
        toast.error(MSG_ORGANIZER_NOT_FOUND);
        router.push(organizerLoginPage);
        return;
      }

      setLoading(true);

      const res = await getOrganizerEventsApi(userData.identity);

      if (res.success) {
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setEvents(list);
      } else {
        toast.error(MSG_EVENT_LOAD_FAILED);
      }
    } catch (error) {
      toast.error(MSG_EVENT_LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Logout
  const handleLogout = () => {
    try {
      logoutUser();
      router.push(organizerLoginPage);
    } catch (error) {
      toast.error(MSG_LOGOUT_FAILED);
    }
  };

  return (
    <div className="container py-4">
      {/* Logout Button */}
      <div className="text-end mb-3">
        <button onClick={handleLogout} className="btn btn-danger">
          {LABEL_LOGOUT}
        </button>
      </div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 m-0">{ACTION_MY_EVENT}</h1>

        <button
          onClick={() => router.push(organizerEventCreatePage)}
          className="btn btn-primary"
        >
          {ACTION_CREATE_EVENT}
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center">{LABEL_LOADING}</p>}

      {/* Empty */}
      {!loading && events.length === 0 && (
        <p className="text-center">{MSG_NO_EVENT_FOUND_FOR_ORGANIZER}</p>
      )}

      {/* Event Cards */}
      <div className="row g-4">
        {events.map((event) => (
          <div key={event.identity} className="col-md-4 col-sm-6 col-12">
            <div
              className="card shadow-sm h-100"
              role="button"
              onClick={() => router.push(`/organizer/event/${event.identity}`)}
            >
              {/* Image */}
              {event.bannerImage ? (
                <img
                  src={event.bannerImage}
                  className="card-img-top"
                  alt="Event Banner"
                />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center bg-light"
                  style={{ height: "180px" }}
                >
                  {MSG_NOIMAGE_FAILED}
                </div>
              )}

              <div className="card-body">
                {/* Title */}
                <h5 className="card-title fw-bold text-uppercase">
                  {event.title || DEFAULT_TEXT}
                </h5>

                {/* Details */}
                <div className="d-flex justify-content-between mt-3 gap-3">
                  {/* Left side */}
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
                      <span className="ms-1">{event.mode || DEFAULT_MODE}</span>
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex-grow-1 text-end" style={{ minWidth: 0 }}>
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
