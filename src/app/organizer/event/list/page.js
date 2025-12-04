"use client";

import { useEffect, useState } from "react";
import "./event-list.css";
import { organizerEventsApi, deleteEventApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { organizerEventCreatePage } from "@/app/routes";

const OrganizerEventListPage = () => {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load events
  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await organizerEventsApi();
      if (res.success) {
        // assume API returns array in res.data
        setEvents(Array.isArray(res.data) ? res.data : res.data?.events || []);
      } else {
        setError(res.message || "Failed to load events");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    try {
      const res = await deleteEventApi(id);
      if (res.success) {
        toast.success("Event deleted");
        // remove from UI
        setEvents((prev) => prev.filter((ev) => ev.id !== id && ev._id !== id));
      } else {
        toast.error(res.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // Navigate to create/edit/view
  const goToCreate = () => router.push(organizerEventCreatePage);
  const goToEdit = (id) => router.push(`/organizer/event/edit/${id}`);
  const goToView = (id) => router.push(`/organizer/event/${id}`);

  return (
    <div className="evlist-shell">
      <div className="evlist-header">
        <h1 className="evlist-title">My Events</h1>
        <button className="evlist-create-btn" onClick={goToCreate}>
          + Create Event
        </button>
      </div>

      {loading && <div className="evlist-empty">Loading events...</div>}

      {!loading && error && <div className="evlist-empty evlist-error">{error}</div>}

      {!loading && !error && events.length === 0 && (
        <div className="evlist-empty">
          No events found. <button className="link-btn" onClick={goToCreate}>Create your first event</button>
        </div>
      )}

      <div className="evlist-grid">
        {events.map((ev) => {
          // support both id or _id shapes
          const id = ev.id ?? ev._id ?? ev.event_id;
          const title = ev.event_title ?? ev.title ?? ev.name ?? "Untitled Event";
          const description = ev.description ?? "";
          const date = ev.event_date ?? ev.date ?? "";
          const time = ev.event_time ?? ev.time ?? "";
          const mode = ev.mode ?? "";
          const venue = ev.venue ?? "";
          const image = ev.image ?? ev.banner ?? ev.image_url ?? null;

          return (
            <div key={id} className="ev-card">
              <div className="ev-card-media">
                {image ? (
                  // if the API returns filename, you might need to prefix baseURL; adjust if needed
                  <img src={image.startsWith("http") ? image : `/uploads/${image}`} alt={title} />
                ) : (
                  <div className="ev-card-noimg">No Image</div>
                )}
              </div>

              <div className="ev-card-body">
                <h3 className="ev-card-title">{title}</h3>
                <div className="ev-card-meta">
                  <span>{date ? `${date}` : "Date N/A"}</span>
                  <span>{time ? ` • ${time}` : ""}</span>
                  <span className="ev-mode">{mode}</span>
                </div>

                <div className="ev-card-venue">{venue}</div>

                <p className="ev-card-desc">{description.length > 140 ? description.slice(0, 140) + "..." : description}</p>

                <div className="ev-card-actions">
                  <button className="btn-ghost" onClick={() => goToView(id)}>View</button>
                  <button className="btn-outline" onClick={() => goToEdit(id)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizerEventListPage;
