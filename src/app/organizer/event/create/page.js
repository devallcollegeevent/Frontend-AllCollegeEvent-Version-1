"use client";

/**
 * Create & Edit Event Page
 * Bootstrap 5 version
 * Simple comments + clean structure
 */

import { useState, useEffect } from "react";
import {
  createEventApi,
  getOrganizerSingleEventApi,
  updateOrganizerSingleEventApi,
} from "@/lib/apiClient";

import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserData } from "@/lib/auth";
import { organizerEventListPage } from "@/app/routes";

import {
  MODE_OFFLINE,
  MODE_HYBRID,
  LABEL_EVENT_DATE,
  LABEL_EVENT_TIME,
  LABEL_EVENT_MODE,
  LABEL_EVENT_VENUE,
  MSG_EVENT_LOAD_ERROR,
  MODE_ONLINE,
  MSG_EVENT_UPDATE_SUCCESS,
  MSG_EVENT_UPDATE_FAILED,
  MSG_EVENT_UPDATE_ERROR,
  MSG_EVENT_CREATE_SUCCESS,
  MSG_EVENT_CREATE_FAILED,
  MSG_EVENT_CREATE_ERROR,
  PH_EVENT_TITLE,
  LABEL_FORM_DESCRIPTION,
  PH_DESCRIPTION,
  BTN_SUBMIT_EVENT,
  BTN_UPDATE_EVENT,
  PH_VENUE,
  LABEL_FORM_EVENT_TITLE,
  LABEL_SELECT_MODE,
  LABEL_FORM_IMAGE
} from "@/const-value/config-message/page";

import { eventSchema } from "@/components/validation";

export default function CreateEventPage() {
  const router = useRouter();
  const params = useSearchParams();

  const eventId = params.get("id");
  const isEdit = Boolean(eventId);

  const userData = getUserData();

  // Form states
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [mode, setMode] = useState("");
  const [venue, setVenue] = useState("");

  // Load data when editing
  useEffect(() => {
    if (!isEdit) return;
    loadEvent();
  }, [eventId]);

  // Load existing event
  const loadEvent = async () => {
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
      toast.error(MSG_EVENT_LOAD_ERROR);
    }
  };

  // Select image
  const onImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    try {
      await eventSchema.validate(
        { eventTitle, description, eventDate, eventTime, mode, venue },
        { abortEarly: false }
      );
    } catch (err) {
      return toast.error(err.errors[0]);
    }

    // Build formData
    const formData = new FormData();
    formData.append("event_title", eventTitle);
    formData.append("description", description);
    formData.append("event_date", eventDate);
    formData.append("event_time", eventTime);
    formData.append("mode", mode);
    formData.append("venue", venue);
    formData.append("org_id", userData.identity);
    if (image) formData.append("image", image);

    // EDIT FLOW
    if (isEdit) {
      try {
        const res = await updateOrganizerSingleEventApi(
          userData.identity,
          eventId,
          formData
        );

        if (res.success) {
          toast.success(MSG_EVENT_UPDATE_SUCCESS);
          router.push(organizerEventListPage);
        } else {
          toast.error(res.message || MSG_EVENT_UPDATE_FAILED);
        }
      } catch {
        toast.error(MSG_EVENT_UPDATE_ERROR);
      }
      return;
    }

    // CREATE FLOW
    try {
      const res = await createEventApi(userData.identity, formData);

      if (res.success) {
        toast.success(MSG_EVENT_CREATE_SUCCESS);
        router.push(organizerEventListPage);
      } else {
        toast.error(res.message || MSG_EVENT_CREATE_FAILED);
      }
    } catch {
      toast.error(MSG_EVENT_CREATE_ERROR);
    }
  };

  return (
    <div className="container py-4">
      {/* Title */}
      <h2 className="text-center mb-4">
        {isEdit ? "Edit Event" : "Create Event"}
      </h2>

      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <form onSubmit={onSubmit}>
          {/* Event Title */}
          <div className="mb-3">
            <label className="form-label">{LABEL_FORM_EVENT_TITLE}</label>
            <input
              className="form-control"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder={PH_EVENT_TITLE}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">{LABEL_FORM_DESCRIPTION}</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={PH_DESCRIPTION}
              rows={4}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">{LABEL_FORM_IMAGE}</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={onImageSelect}
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          )}

          <div className="row">
            {/* Event Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">{LABEL_EVENT_DATE}</label>
              <input
                type="date"
                className="form-control"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            {/* Event Time */}
            <div className="col-md-6 mb-3">
              <label className="form-label">{LABEL_EVENT_TIME}</label>
              <input
                type="time"
                className="form-control"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
          </div>

          {/* Mode */}
          <div className="mb-3">
            <label className="form-label">{LABEL_EVENT_MODE}</label>
            <select
              className="form-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="">{LABEL_SELECT_MODE}</option>
              <option value={MODE_ONLINE}>{MODE_ONLINE}</option>
              <option value={MODE_OFFLINE}>{MODE_OFFLINE}</option>
              <option value={MODE_HYBRID}>{MODE_HYBRID}</option>
            </select>
          </div>

          {/* Venue (only offline/hybrid) */}
          {(mode === MODE_OFFLINE || mode === MODE_HYBRID) && (
            <div className="mb-3">
              <label className="form-label">{LABEL_EVENT_VENUE}</label>
              <input
                className="form-control"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder={PH_VENUE}
              />
            </div>
          )}

          {/* Submit Button */}
          <button className="btn btn-primary w-100">
            {isEdit ? BTN_UPDATE_EVENT : BTN_SUBMIT_EVENT}
          </button>
        </form>
      </div>
    </div>
  );
}
