"use client";

import { useState } from "react";
import styles from "./DeleteProfile.module.css";

export default function DeleteProfilePage() {
  const [deleted, setDeleted] = useState(false);

  return (
    <div className={styles.wrapper}>
      {!deleted && (
        <div className={styles.confirmBox}>
          <img
            src="/images/deleteprofileimage.png"
            alt="delete"
            className={styles.icon}
          />

          <h2>Delete Account Permanently?</h2>

          <p>
            This will permanently delete your account and all data.
            <br />
            This action cannot be undone.
          </p>

          <div className={styles.btnRow}>
            <button
              className={styles.cancelBtn}
              onClick={() => setDeleted(false)}
            >
              Cancel
            </button>

            <button
              className={styles.deleteBtn}
              onClick={() => setDeleted(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}

      {deleted && (
        <div className={styles.successBox}>
          Your account was deleted
        </div>
      )}
    </div>
  );
}
