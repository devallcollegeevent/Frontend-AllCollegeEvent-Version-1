"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Home.css";

export default function HomeRoleSelect() {
  const router = useRouter();
  const [pages, setPages] = useState(0);

  const roles = [
    { name: "College", img: "/images/college.png" },
    { name: "University", img: "/images/university.png" },
    { name: "Industry/Corporate", img: "/images/corporat.png" },
    { name: "Freelancer", img: "/images/freelance.png" },
    { name: "Other", img: "/images/freelance.png" },
  ];

  const handleSelect = (name) => {
    localStorage.setItem("selectedEvent", name);
    setPages(1);
  };

  return (
    <div className="wrapper">
      {pages === 0 && (
        <>
          <h2 className="role-title">Select who you represent</h2>

          <div className="role-cards">
            {roles.map((item) => (
              <div
                className="role-card"
                key={item.name}
                onClick={() => handleSelect(item.name)}
              >
                <div className="role-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <p className="role-name">{item.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {pages === 1 && (
        <div className="event-mode-container">
          <h2 className="mode-event-title">Select Your Mode of Event</h2>
          <p className="event-subtitle">
            Let participants know where and how your event is happening.
          </p>

          <div className="event-card-wrapper">
            <div
              className="event-card"
              onClick={() =>
                router.push("/dashboardlayout/space/create-event")
              }
            >
              <h3>Virtual Event</h3>
              <p>
                Conduct online events through platforms like Zoom, Google Meet,
                ELEarnix.
              </p>
            </div>

            <div
              className="event-card"
              onClick={() =>
                router.push("/dashboardlayout/space/create-event")
              }
            >
              <h3>Physical / Hybrid Event</h3>
              <p>Select if your event is offline or both</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
