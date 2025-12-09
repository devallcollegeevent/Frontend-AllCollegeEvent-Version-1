"use client";

import { useSearchParams } from "next/navigation";
import SuccessPage from "@/components/auth/SuccessPage";
import "@/app/organizer/organizer-auth.css";

export default function Page() {
  const params = useSearchParams();
  const role = params.get("role") || "user";

  return <SuccessPage role={role} />;
}
