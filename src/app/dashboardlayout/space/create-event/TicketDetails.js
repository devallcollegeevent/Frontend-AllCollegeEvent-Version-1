"use client";

import React, { useState } from "react";
import styles from "./CreateEvents.module.css";
// 🔺 path adjust pannunga unga project-la epdi iruko

export default function TicketDetails({
  tickets,
  setTickets,
  setStep,

  title,
  eventType,
  category,
  tags,
  about,
  calendarRows,
  venue,
  city,
  mapLink,
  webSiteLink,
  videoLink,
  files,
  whatsapp,
  instagram,
  linkedin,
  hybrid,
  perks,
  cert,
  accommodation,
  organizer,
  finalPayload,
  setFinalPayload,
}) {
  // ================= STATE =================
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingFrom, setSellingFrom] = useState("");
  const [sellingTo, setSellingTo] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [totalCount, setTotalCount] = useState("1000");
  const [minCount, setMinCount] = useState("01");
  const [maxCount, setMaxCount] = useState("1000");

  const totalOptions = ["1000", "2000", "5000"];
  const minOptions = ["01", "02", "05", "10"];
  const maxOptions = ["100", "500", "1000", "5000"];

  const currencyOptions = [
    { code: "INR", label: "₹ India" },
    { code: "USD", label: "$ USD" },
    { code: "EUR", label: "€ EUR" },
  ];

  // ================= FUNCTIONS =================
  const resetForm = () => {
    setName("");
    setDescription("");
    setSellingFrom("");
    setSellingTo("");
    setIsPaid(false);
    setCurrency("INR");
    setAmount("");
    setTotalCount("1000");
    setMinCount("01");
    setMaxCount("1000");
  };

  const handleSaveTicket = () => {
    if (!name.trim()) {
      alert("Please enter ticket name");
      return;
    }

    if (isPaid && (!amount || Number(amount) <= 0)) {
      alert("Please enter valid amount");
      return;
    }

    const newTicket = {
      id: Date.now(),
      name,
      description,
      sellingFrom,
      sellingTo,
      isPaid,
      currency,
      amount: isPaid ? amount : "0",
      totalCount,
      minCount,
      maxCount,
    };

    setTickets({
      ...tickets,
      list: [...(tickets.list || []), newTicket],
    });

    resetForm();
    setShowForm(false);
  };

  const handleDeleteTicket = (id) => {
    setTickets({
      ...tickets,
      list: tickets.list.filter((t) => t.id !== id),
    });
  };

  // ================= UI =================
  return (
    <div className={styles.ceCard}>
      <h2 className={styles.ceSectionTitle}>Ticket Information</h2>

      <p style={{ color: "#666" }}>
        Use an external gateway for your desired payment options.
      </p>

      {/* External payment */}
      <div className={styles.ceGrid2}>
        <div className={styles.ceField}>
          <label className={styles.ceLabel}>Buy Ticket at</label>
          <label className={styles.ceSwitchLine}>
            <input
              type="checkbox"
              checked={tickets.external}
              onChange={() =>
                setTickets({ ...tickets, external: !tickets.external })
              }
            />
            <span>{tickets.external ? "External" : "Internal"}</span>
          </label>
        </div>

        <div className={styles.ceField}>
          <label className={styles.ceLabel}>Payment URL</label>
          <input
            className={styles.ceInput}
            value={tickets.externalUrl || ""}
            onChange={(e) =>
              setTickets({ ...tickets, externalUrl: e.target.value })
            }
          />
        </div>
      </div>

      {/* Add ticket */}
      <div className={styles.ceEndActions}>
        <button
          className={styles.ceBtnOutline}
          onClick={() => setShowForm(true)}
        >
          + Add Ticket
        </button>
      </div>

      {/* Ticket list */}
      {tickets.list?.length > 0 && (
        <div>
          {tickets.list.map((t) => (
            <div key={t.id} className={styles.ceTicketRow}>
              <span>{t.name}</span>
              <span>{t.isPaid ? `${t.currency} ${t.amount}` : "Free"}</span>
              <button
                className={styles.ceDelete}
                onClick={() => handleDeleteTicket(t.id)}
              >
                {"🗑️" || "🗑️"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bottom buttons */}
      <div className={styles.ceEndActions}>
        <button className={styles.ceBtnOutline} onClick={() => setStep(2)}>
          Back
        </button>

        {tickets.list?.length > 0 && (
          <button
            className={styles.ceBtnPrimary}
            onClick={() => {
              const payload = {
                basic: {
                  title,
                  eventType,
                  category,
                  tags,
                  about,
                  calendarRows,
                  venue,
                  city,
                  mapLink,
                  webSiteLink,
                  videoLink,
                  files,
                  whatsapp,
                  instagram,
                  linkedin,
                  hybrid,
                  perks,
                  cert,
                  accommodation,
                },
                organizer,
                tickets,
              };

              setFinalPayload(payload);
              setStep(4);
            }}
          >
            Submit
          </button>
        )}
      </div>

      {/* Create ticket modal */}
      {showForm && (
        <div className={styles.ceModalBackdrop}>
          <div className={styles.ceModal}>
            <h3>Create Ticket</h3>

            <input
              className={styles.ceInput}
              placeholder="Ticket Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className={styles.ceTextarea}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className={styles.ceEndActions}>
              <button
                className={styles.ceBtnOutline}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className={styles.ceBtnPrimary}
                onClick={handleSaveTicket}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
