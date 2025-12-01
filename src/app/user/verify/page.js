"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { verifyEmailApi } from "@/lib/apiClient";
import "../user-auth.css"; // optional

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  console.log("check",token)

  const [status, setStatus] = useState("loading");
  // loading | success | error

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("error");
        toast.error("Invalid verification link");
        return;
      }

      const res = await verifyEmailApi(token);

      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="u-auth-shell verify-center">
      <div className="u-auth-card" style={{ textAlign: "center" }}>

        {status === "loading" && (
          <>
            <h1 className="u-auth-title">Verifying...</h1>
            <p className="u-auth-sub">Please wait while we verify your email</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="u-auth-title">Email Verified 🎉</h1>
            <p className="u-auth-sub">You can now log in to your account.</p>

            <button
              className="u-auth-btn-primary"
              onClick={() => router.push("/user/login")}
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="u-auth-title">Verification Failed ❌</h1>
            <p className="u-auth-sub">
              The link may be expired or already used.
            </p>

            <button
              className="u-auth-btn-primary"
              onClick={() => router.push("/user/login")}
            >
              Go to Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}
