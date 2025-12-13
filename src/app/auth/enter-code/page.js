"use client";

import { useSearchParams } from "next/navigation";
import EnterOtp from "@/components/auth/EnterOtp";
import "@/app/organizer/organizer-auth.css";
import { ROLE_USER } from "@/const-value/config-message/page";

export default function Page() {
  const params = useSearchParams();
  const role = params.get("role") || ROLE_USER;

  return <EnterOtp role={role} />;
}
