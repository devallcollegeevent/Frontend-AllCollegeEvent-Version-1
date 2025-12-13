"use client";

import React, { useEffect, useState } from "react";
import styles from "./CreateEvents.module.css";

/* =====================================================
   STATIC DEFAULT VALUES (NO API)
===================================================== */

const STATIC_EVENT_TYPES = [
  { _id: "1", name: "Workshop" },
  { _id: "2", name: "Seminar" },
  { _id: "3", name: "Hackathon" },
];

const STATIC_CATEGORIES = [
  { _id: "1", name: "Students", eventTypeId: { _id: "1" } },
  { _id: "2", name: "Professionals", eventTypeId: { _id: "2" } },
  { _id: "3", name: "Developers", eventTypeId: { _id: "3" } },
];

const STATIC_PERKS = [
  { _id: "1", name: "Free Lunch" },
  { _id: "2", name: "Certificate" },
  { _id: "3", name: "Networking" },
];

const STATIC_CERTIFICATIONS = [
  { _id: "1", name: "Participation Certificate" },
  { _id: "2", name: "Merit Certificate" },
];

export default function BasicDetails({
  title,
  setTitle,
  eventType,
  setEventType,
  category,
  setCategory,
  tags,
  tagInput,
  setTagInput,
  addTag,
  removeTag,
  about,
  setAbout,

  calendarRows,
  updateCalendarRow,
  multiDates,
  setMultiDates,
  addCalendarRow,
  removeCalendarRow,

  venue,
  setVenue,
  city,
  setCity,
  mapLink,
  webSiteLink,
  videoLink,
  setWebsiteLink,
  setVideoLink,
  setMapLink,

  files,
  setFiles,
  fileRef,
  onFilesChange,
  onDrop,

  whatsapp,
  setWhatsapp,
  instagram,
  setInstagram,
  linkedin,
  setLinkedin,

  setPerks,
  setCert,
  accommodation,
  setAccommodation,
  hybrid,
  setHybrid,

  onNext,
}) {
  const [perksValue, setPerksValue] = useState([]);
  const [defaultEventType, setDefaultEventType] = useState([]);
  const [defaultEventTypeCategory, setDefaultEventTypeCategory] = useState([]);
  const [defaultCertification, setDefaultCertification] = useState([]);

  const [selectedPerks, setSelectedPerks] = useState([]);
  const [selectedCertification, setSelectedCertification] = useState([]);

  /* ================= LOAD STATIC DATA ================= */

  useEffect(() => {
    setPerksValue(STATIC_PERKS);
    setDefaultEventType(STATIC_EVENT_TYPES);
    setDefaultEventTypeCategory(STATIC_CATEGORIES);
    setDefaultCertification(STATIC_CERTIFICATIONS);
  }, []);

  const filteredCategories = defaultEventTypeCategory.filter(
    (cat) => cat?.eventTypeId?._id === eventType
  );

  const togglePerk = (id) => {
    setSelectedPerks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

    setPerks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleCertification = (id) => {
    setSelectedCertification((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );

    setCert((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* ================= PRIMARY DETAILS ================= */}
      <div className={styles.ceCard}>
        <h2 className={styles.ceSectionTitle}>Primary Details</h2>

        <div className={styles.ceGrid3}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>
              Event Title <span className={styles.ceReq}>*</span>
            </label>
            <input
              className={styles.ceInput}
              placeholder="Enter event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Type of Event</label>
            <select
              className={styles.ceInput}
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="">Select type</option>
              {defaultEventType.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Target Category</label>
            <select
              className={styles.ceInput}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {filteredCategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TAGS */}
        <div className={styles.ceGrid2} style={{ marginTop: 25 }}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Tags</label>
            <div className={styles.ceTagRow}>
              <input
                className={styles.ceInput}
                placeholder="Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <button className={styles.ceBtnSmall} onClick={addTag}>
                Add
              </button>
            </div>

            <div className={styles.ceTagList}>
              {tags.map((t, i) => (
                <span key={i} className={styles.ceTag}>
                  {t}
                  <button
                    className={styles.ceTagClose}
                    onClick={() => removeTag(t)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Offer</label>
            <input className={styles.ceInput} placeholder="Enter offers" />
          </div>
        </div>

        <div className={styles.ceField}>
          <label className={styles.ceLabel}>About the event</label>
          <textarea
            className={styles.ceTextarea}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
      </div>

      {/* ================= LOCATION ================= */}
      <div className={styles.ceCard}>
        <h3 className={styles.ceSubtitle}>Location</h3>

        <div className={styles.ceGrid2}>
          <input
            className={styles.ceInput}
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
          <input
            className={styles.ceInput}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <input
          className={styles.ceInput}
          style={{ marginTop: 16 }}
          placeholder="Google map link"
          value={mapLink}
          onChange={(e) => setMapLink(e.target.value)}
        />
      </div>

      {/* ================= PERKS & CERT ================= */}
      <div className={styles.ceCard}>
        <label className={styles.ceLabel}>Perks</label>
        <div className={styles.cePerkBox}>
          {perksValue.map((item) => (
            <label key={item._id} className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={selectedPerks.includes(item._id)}
                onChange={() => togglePerk(item._id)}
              />
              {item.name}
            </label>
          ))}
        </div>

        <label className={styles.ceLabel} style={{ marginTop: 20 }}>
          Certification
        </label>
        <div className={styles.cePerkBox}>
          {defaultCertification.map((item) => (
            <label key={item._id} className={styles.cePerkItem}>
              <input
                type="checkbox"
                checked={selectedCertification.includes(item._id)}
                onChange={() => toggleCertification(item._id)}
              />
              {item.name}
            </label>
          ))}
        </div>
      </div>

      {/* ================= NEXT ================= */}
      <div className={styles.ceEndActions}>
        <button className={styles.ceBtnPrimary} onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
}
