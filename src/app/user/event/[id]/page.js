"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getEventByIdApi } from "@/lib/apiClient";

import {
  DEFAULT_TEXT,
  DEFAULT_DATE,
  DEFAULT_PRICE,
  LABEL_EVENT_DATE,
  LABEL_EVENT_VENUE,
  LABEL_EVENT_PRICE,
  LABEL_EVENT_MODE,
  LABEL_EVENT_DESCRIPTION,
  DEFAULT_BACK,
} from "@/const-value/config-message/page";

export default function SingleEventPage() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);

  // ------------------------------------------------------
  // Load event when ID changes
  // ------------------------------------------------------
  useEffect(() => {
    if (id) loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      const res = await getEventByIdApi(id);
      if (res.success) setEvent(res.data.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // ------------------------------------------------------
  // Show loader until data arrives
  // ------------------------------------------------------
  if (!event) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container py-4 shadow-none p-3 mb-5 bg-light rounded mt-5">

      {/* Back Button */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => router.back()}
      >
        {DEFAULT_BACK}
      </button>

      {/* Event Card */}
      <div className="position-relative mb-4">

        {/* Banner */}
        <img
          src={event.bannerImage}
          className="card-img-top"
          alt="Event Banner"
          style={{ height: "340px", objectFit: "cover" }}
        />

        <div className="card-body">

          {/* Title */}
          <h2 className="fw-bold">{event.title || DEFAULT_TEXT}</h2>

          <hr />

          {/* Row 1 */}
          <div className="row mb-3">

            {/* Venue */}
            <div className="col-md-4">
              <h6 className="fw-semibold">{LABEL_EVENT_VENUE}</h6>
              <p className="text-muted">
                {event.city || event.venue || DEFAULT_TEXT}
              </p>
            </div>

            {/* Date */}
            <div className="col-md-4">
              <h6 className="fw-semibold">{LABEL_EVENT_DATE}</h6>
              <p className="text-muted">{event.eventDate || DEFAULT_DATE}</p>
            </div>

            {/* Price */}
            <div className="col-md-4">
              <h6 className="fw-semibold">{LABEL_EVENT_PRICE}</h6>
              <p className="text-muted">₹ {event.price || DEFAULT_PRICE}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row mb-3">

            {/* Mode */}
            <div className="col-md-4">
              <h6 className="fw-semibold">{LABEL_EVENT_MODE}</h6>
              <p className="text-muted">{event.mode || DEFAULT_TEXT}</p>
            </div>

            {/* Category */}
            <div className="col-md-4">
              <h6 className="fw-semibold">Category</h6>
              <p className="text-muted">{event.category || DEFAULT_TEXT}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h5 className="fw-bold">{LABEL_EVENT_DESCRIPTION}</h5>
            <p className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
              {event.description || DEFAULT_TEXT}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
