"use client";

import { useState, useEffect } from "react";
import "./create-event.css";
import {
  createEventApi,
  getOrganizerSingleEventApi,
  updateOrganizerSingleEventApi,
} from "@/lib/apiClient";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserData } from "@/lib/auth";
import { organizerEventListPage } from "@/app/routes";
import { hybrid, offline } from "@/const-value/page";

export default function CreateEventPage() {
  const router = useRouter();
  const params = useSearchParams();

  const eventId = params.get("id");
  const isEdit = Boolean(eventId);

  const userData = getUserData();

  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [mode, setMode] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    loadEvent();
  }, [eventId]);

  async function loadEvent() {
    try {
      const res = await getOrganizerSingleEventApi(userData.identity, eventId);

      if (res.success) {
        const event = res.data.data;
        setEventTitle(event.title);
        setDescription(event.description);
        setEventDate(event.eventDate);
        setEventTime(event.eventTime);
        setMode(event.mode);
        setVenue(event.venue);
        setPreview(event.bannerImage);
      }
    } catch {
      toast.error("Failed to load event");
    }
  }

  const onImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!eventTitle || !description || !eventDate || !eventTime || !mode) {
      return toast.error("Please fill all fields");
    }

    if ((mode === offline || mode === hybrid) && !venue) {
      return toast.error("Venue required");
    }

    const formData = new FormData();
    formData.append("event_title", eventTitle);
    formData.append("description", description);
    formData.append("event_date", eventDate);
    formData.append("event_time", eventTime);
    formData.append("mode", mode);
    formData.append("venue", venue);
    formData.append("org_id", userData.identity);

    if (image) formData.append("image", image);

    if (isEdit) {
      const res = await updateOrganizerSingleEventApi(
        userData.identity,
        eventId,
        formData
      );
      if (res.success) {
        toast.success("Event Updated Successfully!");
        router.push(organizerEventListPage);
      } else {
        toast.error(res.message || "Failed to update");
      }
      return;
    }

    const res = await createEventApi(userData.identity, formData);
    if (res.success) {
      toast.success("Event Created Successfully!");
      router.push(organizerEventListPage);
    } else {
      toast.error(res.message || "Failed to create");
    }
  };

  return (
    <div className="create-event-wrapper">
      <h2 className="create-event-title">
        {isEdit ? "Edit Event" : "Create Event"}
      </h2>

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

          {preview && <img src={preview} className="ce-preview-img" />}

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

          {(mode === offline || mode === hybrid) && (
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
            {isEdit ? "Update Event" : "Submit Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

