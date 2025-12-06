"use client";

import { useSearchParams, useParams ,useRouter} from "next/navigation";
import { useState, useEffect } from "react";
import { getEventByIdApi } from "@/lib/apiClient";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SingleEventPage() {
  const { id } = useParams(); 
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");
  const router = useRouter();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (orgId && id) loadEvent();
  }, [orgId, id]);

  const loadEvent = async () => {
    const res = await getEventByIdApi(orgId, id);
    if (res.success) {
      setEvent(res.data.event);
    }
  };

  if (!event) return <div className="text-center mt-5">Loading…</div>;


  return (
    <div className="container event-page-wrapper shadow p-3 mb-5 mt-5 bg-body-tertiary rounded">
      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => router.back()}
      >
        ← Back
      </button>
      {/* Banner Image */}
      <div className="card shadow-sm">
        <img
          src={event.bannerImage}
          className="card-img-top"
          style={{ height: "320px", objectFit: "cover", borderRadius: "10px" }}
        />

        <div className="card-body">
          {/* Title */}
          <h2 className="fw-bold">{event.title}</h2>

          <hr />

          {/* Row Layout */}
          <div className="row mt-3">
            <div className="col-md-4 mb-3">
              <div className="p-3 border rounded bg-light">
                <h6 className="fw-bold">📍 Location</h6>
                <p className="mb-0">{event.city || event.venue}</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 border rounded bg-light">
                <h6 className="fw-bold">📅 Date</h6>
                <p className="mb-0">{event.eventDate}</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 border rounded bg-light">
                <h6 className="fw-bold">💰 Price</h6>
                <p className="mb-0">₹ {event.price}</p>
              </div>
            </div>
          </div>

          {/* Mode & Category */}
          <div className="row mt-2">
            <div className="col-md-6 mb-3">
              <div className="p-3 border rounded bg-light">
                <h6 className="fw-bold">🎟 Event Mode</h6>
                <p className="mb-0">{event.mode}</p>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="p-3 border rounded bg-light">
                <h6 className="fw-bold">📌 Category</h6>
                <p className="mb-0">{event.category}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 p-3 border rounded bg-white shadow-sm">
            <h4 className="fw-bold">Event Description</h4>
            <p className="mt-2" style={{ lineHeight: "1.7" }}>
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
