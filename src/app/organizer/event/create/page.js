"use client";

import { useState } from "react";
import "./create-event.css";
import { createEventApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserData } from "@/lib/auth";

const CreateEventPage = () => {
  const router = useRouter();
  const userData = getUserData(); // decoded token user data

  // If organizer not logged in → block
  if (!userData) {
    toast.error("Please login as organizer");
    if (typeof window !== "undefined") router.push("/organizer/login");
  }

  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [mode, setMode] = useState("");
  const [venue, setVenue] = useState("");

  // Image Selector
  const onImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Handler
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!eventTitle || !description || !eventDate || !eventTime || !mode) {
      return toast.error("Please fill all fields");
    }

    if ((mode === "offline" || mode === "hybrid") && !venue) {
      return toast.error("Venue is required for offline/hybrid events");
    }

    if (!userData?.id) {
      return toast.error("Organizer ID not found! Login again.");
    }

    // Create FormData
    const formData = new FormData();
    formData.append("event_title", eventTitle);
    formData.append("description", description);
    formData.append("event_date", eventDate);
    formData.append("event_time", eventTime);
    formData.append("mode", mode);
    formData.append("venue", venue);
    formData.append("org_id", userData.id); // organizer ID from token

    if (image) {
      formData.append("image", image);
    }

    // Debugging (important)
    console.log("====== FORMDATA SENT ======");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // API CALL
    const res = await createEventApi(formData);

    if (res.success) {
      toast.success("Event Created Successfully!");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Event creation failed");
    }
  };

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
                required
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
};

export default CreateEventPage;
