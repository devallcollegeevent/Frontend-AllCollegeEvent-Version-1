"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmailApi } from "@/lib/apiClient";
import { organizerLoginPage } from "@/app/routes";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); 
  // loading | success | failed

  useEffect(() => {
    if (!token) {
      setStatus("failed");
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await verifyEmailApi(token);
        if (res?.success) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg p-4 text-center"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        {/* LOGO */}
        <div className="mb-3">
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ height: "60px" }}
          />
        </div>

        {/* LOADING */}
        {status === "loading" && (
          <>
            <div className="spinner-border text-primary mb-3" role="status" />
            <h5 className="fw-bold">Verifying your account</h5>
            <p className="text-muted mb-0">
              Please wait while we verify your email…
            </p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <h4 className="fw-bold text-success">Account Verified</h4>
            <p className="text-muted">
              Your account has been successfully verified.
              You can now login to continue.
            </p>

            <a
              href={organizerLoginPage}
              className="btn btn-success w-100 mt-3"
            >
              Go to Login
            </a>
          </>
        )}

        {/* FAILED */}
        {status === "failed" && (
          <>
            <h4 className="fw-bold text-danger">Verification Failed</h4>
            <p className="text-muted">
              The verification link is invalid or has expired.
              Please request a new verification email.
            </p>
            <button
              className="btn btn-outline-secondary w-100 mt-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
