"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Icons
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

// Routes
import { organizerLoginPage, organizerSignupDetailsPage } from "@/app/routes";

// Constants
import {
  TEXT_SIGNIN,
  TEXT_NO_ACCOUNT,
  TITLE_ORG_ACCOUNT_CREATION,
  SUBTITLE_ORG_ACCOUNT_CREATION,
  MSG_ERR_CATEGORY_MISSING,
  LABEL_ORG_STEP_CATEGORY,
  LABEL_ORG_STEP_DETAILS,
  LABEL_ORG_STEP_ACCOUNT,
  BTN_CONTINUE,
} from "@/const-value/config-message/page";
import { toast } from "react-hot-toast";

// Category List (inline UI titles are OK)
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

export default function OrganizerCategoryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  // Continue button handler
  const onContinue = () => {
    if (!selected) return toast.error(MSG_ERR_CATEGORY_MISSING);
    router.push(`${organizerSignupDetailsPage}?cat=${selected}`);
  };

  return (
    <div className="container py-5">
      {/* Stepper */}
      <div className="text-center mb-4">
        <div className="d-flex justify-content-center gap-4">
          <div className="text-center">
            <div className="fw-bold">1</div>
            <small>{LABEL_ORG_STEP_CATEGORY}</small>
          </div>

          <div className="text-center opacity-50">
            <div className="fw-bold">2</div>
            <small>{LABEL_ORG_STEP_DETAILS}</small>
          </div>

          <div className="text-center opacity-50">
            <div className="fw-bold">3</div>
            <small>{LABEL_ORG_STEP_ACCOUNT}</small>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <h2 className="text-center fw-bold">{TITLE_ORG_ACCOUNT_CREATION}</h2>
      <p className="text-center text-muted mb-4">
        {SUBTITLE_ORG_ACCOUNT_CREATION}
      </p>

      {/* Category Grid */}
      <div className="row g-3">
        {CATEGORIES.map((c) => (
          <div key={c.id} className="col-md-4 col-sm-6 col-12">
            <div
              className={`card p-3 shadow-sm text-center border-2 ${
                selected === c.id ? "border-primary" : "border-light"
              }`}
              role="button"
              onClick={() => setSelected(c.id)}
            >
              <div className="mb-2">{c.icon}</div>
              <h6 className="fw-semibold">{c.title}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-4 text-center">
        <button className="btn btn-primary px-4" onClick={onContinue}>
          {BTN_CONTINUE}
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-3">
        <small>
          {TEXT_NO_ACCOUNT}{" "}
          <a href={organizerLoginPage} className="text-primary fw-bold">
            {TEXT_SIGNIN}
          </a>
        </small>
      </div>
    </div>
  );
}
