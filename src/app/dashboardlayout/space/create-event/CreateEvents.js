"use client";

import React, { useState, useRef } from "react";
import styles from "./CreateEvents.module.css";

// STEP COMPONENTS
import BasicDetails from "./BasicDetails";
import OrganizerDetails from "./OrganizerDetails";
import TicketDetails from "./TicketDetails";
import FinalDetails from "./FinalDetails";

export default function CreateEvents() {
  // ================= STEP =================
  const [step, setStep] = useState(1);

  // ================= BASIC DETAILS =================
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [about, setAbout] = useState("");

  // ================= CALENDAR =================
  const [calendarRows, setCalendarRows] = useState([
    { startDate: "", startTime: "", endDate: "", endTime: "" },
  ]);
  const [multiDates, setMultiDates] = useState(false);

  // ================= LOCATION =================
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [mapLink, setMapLink] = useState("");

  // ================= MEDIA =================
  const [videoLink, setVideoLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);

  // ================= SOCIAL =================
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // ================= EXTRA =================
  const [hybrid, setHybrid] = useState(false);
  const [accommodation, setAccommodation] = useState("");
  const [perks, setPerks] = useState([]);
  const [cert, setCert] = useState([]);

  // ================= ORGANIZER =================
  const [organizer, setOrganizer] = useState({
    orgType: "",
    name: "",
    email: "",
    mobile: "",
    altMobile: "",
    coordinators: [],
  });

  // ================= TICKETS =================
  const [tickets, setTickets] = useState({
    external: false,
    externalUrl: "",
    list: [],
  });

  // ================= FINAL =================
  const [finalPayload, setFinalPayload] = useState(null);
  const [final, setFinal] = useState({ showModal: false });

  // ================= TAG HANDLERS =================
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (t) => {
    setTags(tags.filter((x) => x !== t));
  };

  // ================= FILE HANDLERS =================
  const onFilesChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 6);
    setFiles(selected);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).slice(0, 6);
    setFiles(dropped);
  };

  // ================= CALENDAR HANDLERS =================
  const updateCalendarRow = (index, key, value) => {
    const updated = [...calendarRows];
    updated[index][key] = value;
    setCalendarRows(updated);
  };

  const addCalendarRow = () => {
    setCalendarRows([
      ...calendarRows,
      { startDate: "", startTime: "", endDate: "", endTime: "" },
    ]);
  };

  const removeCalendarRow = (index) => {
    setCalendarRows(calendarRows.filter((_, i) => i !== index));
  };

  // ================= UI =================
  return (
    <div className={styles.ceWrapper}>
      {/* ================= STEPPER ================= */}
      <div className={styles.ceStepper}>
        <div
          className={`${styles.ceStepItem} ${
            step === 1 ? styles.ceStepItemActive : ""
          }`}
          onClick={() => setStep(1)}
        >
          <p>BASIC DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            step === 2 ? styles.ceStepItemActive : ""
          }`}
          onClick={() => title && setStep(2)}
        >
          <p>ORGANIZER DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            step === 3 ? styles.ceStepItemActive : ""
          }`}
          onClick={() => organizer.name && setStep(3)}
        >
          <p>TICKET DETAILS</p>
        </div>

        <div
          className={`${styles.ceStepItem} ${
            step === 4 ? styles.ceStepItemActive : ""
          }`}
        >
          <p>FINAL</p>
        </div>
      </div>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <BasicDetails
          title={title}
          setTitle={setTitle}
          eventType={eventType}
          setEventType={setEventType}
          category={category}
          setCategory={setCategory}
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          addTag={addTag}
          removeTag={removeTag}
          about={about}
          setAbout={setAbout}
          calendarRows={calendarRows}
          updateCalendarRow={updateCalendarRow}
          multiDates={multiDates}
          setMultiDates={setMultiDates}
          addCalendarRow={addCalendarRow}
          removeCalendarRow={removeCalendarRow}
          venue={venue}
          setVenue={setVenue}
          city={city}
          setCity={setCity}
          mapLink={mapLink}
          setMapLink={setMapLink}
          webSiteLink={websiteLink}
          setWebsiteLink={setWebsiteLink}
          videoLink={videoLink}
          setVideoLink={setVideoLink}
          files={files}
          setFiles={setFiles}
          fileRef={fileRef}
          onFilesChange={onFilesChange}
          onDrop={onDrop}
          whatsapp={whatsapp}
          setWhatsapp={setWhatsapp}
          instagram={instagram}
          setInstagram={setInstagram}
          linkedin={linkedin}
          setLinkedin={setLinkedin}
          hybrid={hybrid}
          setHybrid={setHybrid}
          perks={perks}
          setPerks={setPerks}
          cert={cert}
          setCert={setCert}
          accommodation={accommodation}
          setAccommodation={setAccommodation}
          onNext={() => {
            if (!title.trim()) return alert("Event title required");
            setStep(2);
          }}
        />
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <OrganizerDetails
          organizer={organizer}
          setOrganizer={setOrganizer}
          setStep={setStep}
        />
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <TicketDetails
          tickets={tickets}
          setTickets={setTickets}
          setStep={setStep}
          title={title}
          eventType={eventType}
          category={category}
          tags={tags}
          about={about}
          calendarRows={calendarRows}
          venue={venue}
          city={city}
          mapLink={mapLink}
          webSiteLink={websiteLink}
          videoLink={videoLink}
          files={files}
          whatsapp={whatsapp}
          instagram={instagram}
          linkedin={linkedin}
          hybrid={hybrid}
          perks={perks}
          cert={cert}
          accommodation={accommodation}
          organizer={organizer}
          finalPayload={finalPayload}
          setFinalPayload={setFinalPayload}
        />
      )}

      {/* ================= STEP 4 ================= */}
      {step === 4 && (
        <FinalDetails
          finalPayload={finalPayload}
          final={final}
          setFinal={setFinal}
          setStep={setStep}
        />
      )}
    </div>
  );
}
