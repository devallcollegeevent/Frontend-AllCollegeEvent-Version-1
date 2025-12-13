"use client";

import { useState } from "react";
import styles from "./EmailSettings.module.css";

export default function EmailSettingsPage() {
  const [created, setCreated] = useState(true);
  const [status, setStatus] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Email Settings</h2>

      {/* Event Created */}
      <div className={styles.card}>
        <div>
          <h4>Event Created Successfully</h4>
          <p>We will notify you once your event is reviewed and approved.</p>
        </div>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={created}
            onChange={() => setCreated(!created)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      {/* Event Status */}
      <div className={styles.card}>
        <div>
          <h4>Event Status</h4>
          <p>We will notify your event is approved or rejected.</p>
        </div>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={status}
            onChange={() => setStatus(!status)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      {/* Event Completed */}
      <div className={styles.card}>
        <div>
          <h4>Event Completed</h4>
          <p>We will notify your event has ended.</p>
        </div>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
}
