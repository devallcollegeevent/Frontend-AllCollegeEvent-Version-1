import { redirect } from "next/navigation";
import { dashboardlayoutProfile } from "../routes";

export default function DashboardIndexPage() {
  redirect(dashboardlayoutProfile);
}
