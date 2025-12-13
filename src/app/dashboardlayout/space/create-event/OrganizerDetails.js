"use client";

import React from "react";
import styles from "./CreateEvents.module.css";
// 🔺 unga project path ku correct pannunga

export default function OrganizerDetails({ organizer, setOrganizer, setStep }) {
  return (
    <>
      {/* ================= ORGANIZER DETAILS CARD ================= */}
      <div className={styles.ceCard}>
        <h2 className={styles.ceSectionTitle}>Organizer Details</h2>

        {/* Organizer Type */}
        <div className={styles.ceGrid1}>
          <div className={styles.ceField}>
            <select
              className={styles.ceInput}
              value={organizer.orgType}
              onChange={(e) =>
                setOrganizer({ ...organizer, orgType: e.target.value })
              }
            >
              <option value="">Organizer Type *</option>
              <option value="Engineering&Technology">
                Engineering & Technology
              </option>
              <option value="Engineering_Institutes">
                Engineering Institutes
              </option>
              <option value="Environmental_Studies">
                Environmental Studies
              </option>
              <option value="Social_Sciences">Social Sciences</option>
              <option value="Science&Research">Science & Research</option>
              <option value="Medical&Pharmacy">Medical & Pharmacy</option>
              <option value="Education&Training">Education & Training</option>
              <option value="Polytechnic">Polytechnic</option>
              <option value="Design&Architecture">
                Design & Architecture
              </option>
              <option value="Creative_Arts&Media">
                Creative Arts & Media
              </option>
              <option value="Agriculture">Agriculture</option>
              <option value="Law">Law</option>
              <option value="Management">Management</option>
              <option value="Arts&Science">Arts & Science</option>
              <option value="Catering">Catering</option>
              <option value="Humanities">Humanities</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Organizer Name + Email */}
        <div className={styles.ceGrid2} style={{ marginTop: "30px" }}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>
              Organizer Name <span className={styles.ceReq}>*</span>
            </label>
            <input
              className={styles.ceInput}
              placeholder="Enter organization name"
              value={organizer.name}
              onChange={(e) =>
                setOrganizer({ ...organizer, name: e.target.value })
              }
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>
              Email <span className={styles.ceReq}>*</span>
            </label>
            <input
              className={styles.ceInput}
              placeholder="Enter Mail ID"
              value={organizer.email}
              onChange={(e) =>
                setOrganizer({ ...organizer, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Mobile Numbers */}
        <div className={styles.ceGrid2} style={{ marginTop: "20px" }}>
          <div className={styles.ceField}>
            <label className={styles.ceLabel}>
              Mobile Number <span className={styles.ceReq}>*</span>
            </label>
            <input
              className={styles.ceInput}
              placeholder="+91 - 98765 43210"
              value={organizer.mobile}
              onChange={(e) =>
                setOrganizer({ ...organizer, mobile: e.target.value })
              }
            />
          </div>

          <div className={styles.ceField}>
            <label className={styles.ceLabel}>Alternate Mobile</label>
            <input
              className={styles.ceInput}
              placeholder="+91 - 98765 43210"
              value={organizer.altMobile}
              onChange={(e) =>
                setOrganizer({ ...organizer, altMobile: e.target.value })
              }
            />
          </div>
        </div>

        {/* Add Coordinator */}
        <div className={styles.ceGrid1} style={{ marginTop: "30px" }}>
          <div className={styles.ceCordination}>
            <button
              className={styles.ceBtnOutline}
              onClick={() =>
                setOrganizer({
                  ...organizer,
                  coordinators: [
                    ...(organizer.coordinators || []),
                    { name: "", email: "", phone: "" },
                  ],
                })
              }
            >
              + Coordinator Details
            </button>
          </div>
        </div>

        {/* Coordinator List */}
        {organizer.coordinators?.map((c, i) => (
          <div key={i} className={styles.ceCoordRow}>
            <input
              className={styles.ceInput}
              placeholder="Coordinator Name"
              value={c.name}
              onChange={(e) => {
                const rows = [...organizer.coordinators];
                rows[i].name = e.target.value;
                setOrganizer({ ...organizer, coordinators: rows });
              }}
            />

            <input
              className={styles.ceInput}
              placeholder="Email"
              value={c.email}
              onChange={(e) => {
                const rows = [...organizer.coordinators];
                rows[i].email = e.target.value;
                setOrganizer({ ...organizer, coordinators: rows });
              }}
            />

            <input
              className={styles.ceInput}
              placeholder="Phone"
              value={c.phone}
              onChange={(e) => {
                const rows = [...organizer.coordinators];
                rows[i].phone = e.target.value;
                setOrganizer({ ...organizer, coordinators: rows });
              }}
            />

            <button
              className={styles.ceDelete}
              onClick={() =>
                setOrganizer({
                  ...organizer,
                  coordinators: organizer.coordinators.filter(
                    (_, idx) => idx !== i
                  ),
                })
              }
            >
              {"" || "🗑️"}
            </button>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ACTIONS ================= */}
      <div className={styles.ceCordinationEndAction}>
        <button className={styles.ceBtnOutline} onClick={() => setStep(1)}>
          Back
        </button>
        <button className={styles.ceBtnPrimary} onClick={() => setStep(3)}>
          Next
        </button>
      </div>
    </>
  );
}
