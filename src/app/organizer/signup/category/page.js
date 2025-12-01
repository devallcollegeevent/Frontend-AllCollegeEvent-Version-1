"use client";

import "../../organizer-auth.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CorporateIcon,
  EventManagementIcon,
  GovermentIcon,
  IndividualIcon,
  NgoIcon,
  SportsIcon,
  TechOneIcon,
  TrainingIcon,
  UniversityIcon,
} from "@/components/icons/Icons";
import { organizerSignupDetailsPage } from "@/app/routes";

const CATEGORIES = [
  { id: "college", title: "College / University", icon: <UniversityIcon /> },
  {
    id: "training",
    title: "Training & Coaching Institute",
    icon: <TrainingIcon />,
  },
  {
    id: "individual",
    title: "Individual / Freelancer",
    icon: <IndividualIcon />,
  },
  {
    id: "event",
    title: "Event Management Company",
    icon: <EventManagementIcon />,
  },
  { id: "tech", title: "Tech / Professional Community", icon: <TechOneIcon /> },
  {
    id: "sports",
    title: "Sports Club / Fitness Association",
    icon: <SportsIcon />,
  },
  { id: "corporate", title: "Corporate / Company", icon: <CorporateIcon /> },
  { id: "gov", title: "Government Organization", icon: <GovermentIcon /> },
  { id: "ngo", title: "NGO / Non-Profit Organization", icon: <NgoIcon /> },
];

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  function onContinue() {
    if (!selected) {
      return alert("Please pick a category");
    }
    // push to details page with category as query param
   router.push(`${organizerSignupDetailsPage}?cat=${selected}`);
  }

  return (
    <div className="org-shell">
      <aside className="org-left">
        <img
          className="org-left-img"
          src="/images/organizer-rocket.png"
          alt="rocket"
        />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <div className="org-stepper">
            <div className="org-step active">
              <div className="dot">1</div>
              <div className="label">Organization Category</div>
            </div>

            <div className="line" />

            <div className="org-step">
              <div className="dot">2</div>
              <div className="label">Organization Details</div>
            </div>

            <div className="line" />

            <div className="org-step">
              <div className="dot">3</div>
              <div className="label">Account Creation</div>
            </div>
          </div>

          {/* stepper and headings omitted for brevity */}
          <h2 className="org-title">Organization Category</h2>
          <div className="org-sub">
            Select which category best describes your organization
          </div>

          <div className="category-grid">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`category-card ${
                  selected === c.id ? "selected" : ""
                }`}
                onClick={() => setSelected(c.id)}
              >
                <div className="icon">{c.icon}</div>
                <div className="cat-title">{c.title}</div>
              </button>
            ))}
          </div>

          <div className="org-actions">
            <button className="btn-primary-ghost" onClick={onContinue}>
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
