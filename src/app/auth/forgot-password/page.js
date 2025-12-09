"use client";

import { useSearchParams } from "next/navigation";
import ForgotPassword from "@/components/auth/ForgotPassword";
import "@/app/organizer/organizer-auth.css";

export default function Page() {
  const params = useSearchParams();
  const role = params.get("role") || "user"; // default

  return <ForgotPassword role={role} />;
}
