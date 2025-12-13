"use client";

import React from "react";
import styles from "./BookingEvent.module.css";
import { DATEICON, LOCATION_ICON, SAVEDICON } from "@/const/const";

export default function BookingEventPage() {
  const bookingEvents = [
    {
      title: "International Conference...",
      location: "Coimbatore",
      date: "Dec 29, 2025",
      img: "/images/event.png",
    },
    {
      title: "International Conference...",
      location: "Coimbatore",
      date: "Dec 29, 2025",
      img: "/images/event.png",
    },
    {
      title: "International Conference...",
      location: "Coimbatore",
      date: "Dec 29, 2025",
      img: "/images/event.png",
    },
    {
      title: "International Conference...",
      location: "Coimbatore",
      date: "Dec 29, 2025",
      img: "/images/event.png",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Booking Events</h2>

      <div className={styles.grid}>
        {bookingEvents.map((event, index) => (
          <div className={styles.card} key={index}>
            {/* Offer Badge */}
            <div className={styles.offer}>Offers</div>

            {/* Event Image */}
            <img
              src={event.img}
              alt="event"
              className={styles.eventImg}
            />

            {/* Content */}
            <div className={styles.content}>
              <h3 className={styles.eventTitle}>{event.title}</h3>

              <div className={styles.row}>
                {LOCATION_ICON}
                <span>{event.location}</span>
              </div>

              <div className={styles.row}>
                {DATEICON}
                <span>{event.date}</span>
              </div>
            </div>

            {/* Bookmark Icon */}
            <div className={styles.bookmarkBox}>
              {SAVEDICON}
            </div>

            {/* Paid Badge */}
            <p className={styles.paidBtn}>Paid</p>
          </div>
        ))}
      </div>
    </div>
  );
}
