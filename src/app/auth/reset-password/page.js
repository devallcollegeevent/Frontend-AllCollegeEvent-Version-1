"use client";

import { useSearchParams } from "next/navigation";
import ResetPassword from "@/components/auth/ResetPassword";
import "@/app/organizer/organizer-auth.css";

export default function Page() {
  const params = useSearchParams();
  const role = params.get("role") || "user";

  return <ResetPassword role={role} />;
}
