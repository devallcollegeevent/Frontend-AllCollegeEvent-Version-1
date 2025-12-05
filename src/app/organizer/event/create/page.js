"use client";

import { useState } from "react";
import "./create-event.css";
import { createEventApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserData } from "@/lib/auth";

const CreateEventPage = () => {
  const router = useRouter();
  const userData = getUserData(); 

  if (!userData) {
    if (typeof window !== "undefined") {
      toast.error("Please login as organizer");
      router.push("/organizer/login");
    }
  }

  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [mode, setMode] = useState("");
  const [venue, setVenue] = useState("");

  const onImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!eventTitle || !description || !eventDate || !eventTime || !mode)
      return toast.error("Please fill all fields");

    if ((mode === "offline" || mode === "hybrid") && !venue)
      return toast.error("Venue required");

    if (!userData?.identity)
      return toast.error("Organizer ID missing");

    const formData = new FormData();
    formData.append("event_title", eventTitle);
    formData.append("description", description);
    formData.append("event_date", eventDate);
    formData.append("event_time", eventTime);
    formData.append("mode", mode);
    formData.append("venue", venue);
    formData.append("org_id", userData.identity);

    if (image) formData.append("image", image);

    const res = await createEventApi(formData);

    if (res.success) {
      toast.success("Event Created Successfully!");
      router.push("/organizer/event/list");
    } else {
      toast.error(res.message || "Failed to create");
    }
  };

  return (
    <div className="create-event-wrapper">
      <h2 className="create-event-title">Create Event</h2>

      <div className="create-event-card">
        <form onSubmit={onSubmit}>
          <div className="ce-field">
            <label className="ce-label">Event Title</label>
            <input
              className="ce-input"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="ce-field">
            <label className="ce-label">Description</label>
            <textarea
              className="ce-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          <div className="ce-field">
            <label className="ce-label">Event Image</label>
            <input type="file" accept="image/*" onChange={onImageSelect} />
          </div>

          {preview && (
            <img
              src={preview}
              style={{
                width: "100%",
                maxHeight: "240px",
                objectFit: "cover",
                borderRadius: "12px",
                marginTop: 10,
              }}
            />
          )}

          <div className="ce-row">
            <div className="ce-col ce-field">
              <label className="ce-label">Event Date</label>
              <input
                className="ce-input"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            <div className="ce-col ce-field">
              <label className="ce-label">Event Time</label>
              <input
                className="ce-input"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
          </div>

          <div className="ce-field">
            <label className="ce-label">Mode</label>
            <select
              className="ce-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {(mode === "offline" || mode === "hybrid") && (
            <div className="ce-field">
              <label className="ce-label">Venue</label>
              <input
                className="ce-input"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Enter venue"
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
