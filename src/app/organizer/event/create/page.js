"use client";

import { useState } from "react";
import "./create-event.css";

export default function CreateEventPage() {
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [mode, setMode] = useState("");
  const [venue, setVenue] = useState("");

  function onImageSelect(e) {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      event_title: eventTitle,
      description,
      event_date: eventDate,
      event_time: eventTime,
      mode,
      venue,
      image: image ? image.name : null,
    };

    console.log("===== EVENT CREATE PAYLOAD =====");
    console.log(payload);
  }

  return (
    <div className="create-event-wrapper">
      <h2 className="create-event-title">Create Event</h2>
      <p className="create-event-sub">Add event details below</p>

      <div className="create-event-card">
        <form onSubmit={onSubmit}>
          {/* Event Title */}
          <div className="ce-field">
            <label className="ce-label">Event Title</label>
            <input
              className="ce-input"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Description */}
          <div className="ce-field">
            <label className="ce-label">Description</label>
            <textarea
              className="ce-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="ce-field">
            <label className="ce-label">Event Image</label>
            <input
              className="ce-file"
              type="file"
              accept="image/*"
              onChange={onImageSelect}
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div style={{ marginTop: 10 }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "240px",
                  objectFit: "contain",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  background: "black",
                  marginBottom: "30px",
                }}
              />
            </div>
          )}

          {/* Date + Time */}
          <div className="ce-row">
            <div className="ce-col ce-field">
              <label className="ce-label">Event Date</label>
              <input
                className="ce-input"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>

            <div className="ce-col ce-field">
              <label className="ce-label">Event Time</label>
              <input
                className="ce-input"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Mode */}
          <div className="ce-field">
            <label className="ce-label">Mode of Event</label>
            <select
              className="ce-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              required
            >
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* VENUE FIELD (only if offline/hybrid) */}
          {(mode === "offline" || mode === "hybrid") && (
            <div className="ce-field">
              <label className="ce-label">Venue</label>
              <input
                className="ce-input"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Enter venue location"
                required={mode !== "online"}
              />
            </div>
          )}
          <button className="ce-btn-submit" type="submit">
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
}
