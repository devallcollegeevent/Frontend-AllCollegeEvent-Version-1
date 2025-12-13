"use client";
import React from "react";

// ✅ Import constants only (no hardcoded strings)
import {
  TITLE_VERIFY_ACCOUNT,
  MSG_VERIFY_EMAIL_SENT,
} from "@/const-value/config-message/page";

export default function VerifyModal({ show, onClose }) {
  // ---------------------------------------------------------
  // If modal is not visible → return nothing
  // ---------------------------------------------------------
  if (!show) return null;

  return (
    <div
      className="verify-overlay d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1050,
      }}
    >
      {/* ---------------------------------------------
          MODAL BOX (Bootstrap styling applied)
      --------------------------------------------- */}
      <div className="verify-modal bg-white p-4 rounded shadow-lg text-center position-relative"
        style={{ width: "100%", maxWidth: "420px" }}
      >

        {/* Close Button */}
        <button
          className="btn-close position-absolute"
          style={{ top: "12px", right: "12px" }}
          onClick={onClose}
        ></button>

        {/* Logo */}
        <img
          src="/images/ace-logo.png"
          alt="logo"
          className="verify-logo mb-3 img-fluid"
          style={{ maxWidth: "140px" }}
        />

        {/* Title */}
        <h2 className="fw-bold mb-2">{TITLE_VERIFY_ACCOUNT}</h2>

        {/* Message */}
        <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
          {MSG_VERIFY_EMAIL_SENT}
        </p>

      </div>
    </div>
  );
}
