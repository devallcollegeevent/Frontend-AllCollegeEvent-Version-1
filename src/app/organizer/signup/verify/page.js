"use client";
import React from "react";

export default function VerifyModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="verify-overlay">
      <div className="verify-modal">

        <img
          src="/images/ace-logo.png"
          alt="logo"
          className="verify-logo"
        />

        <h2 className="verify-title">Verify your Account</h2>

        <p className="verify-text">
          Link has been sent to your xyz.com domain mail id.<br />
          Please click and verify your account.
        </p>

      </div>
    </div>
  );
}
