"use client";

import { useSearchParams } from "next/navigation";
import EnterOtp from "@/components/auth/EnterOtp";
import "@/app/organizer/organizer-auth.css";

export default function Page() {
  const params = useSearchParams();
  const role = params.get("role") || "user";

  return <EnterOtp role={role} />;
}
