"use client";

export default function VerifyPage({ type }) {
  return (
    <div className="verify-overlay">
      <div className="verify-modal">
        <img src="/images/ace-logo.png" className="verify-logo" />

        <h2 className="verify-title">Verify your Account</h2>

        <p className="verify-text">
          A verification link has been sent to your {type} email.<br />
          Please click the link to activate your account.
        </p>
      </div>
    </div>
  );
}
