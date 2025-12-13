"use client";

import React, { useEffect } from "react";
import styles from "./CreateEvents.module.css";

export default function FinalDetails({
  finalPayload,
  final,
  setFinal,
  setStep,
}) {
  useEffect(() => {
    console.log("FINAL PAYLOAD:", finalPayload);

    // open success modal
    setFinal({ showModal: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ceCard}>
      {/* TITLE */}
      <h2 className={styles.ceSectionTitle}>Final Details</h2>

      {/* SUCCESS MODAL */}
      {final.showModal && (
        <div className={styles.ceModalBackdrop}>
          <div className={styles.ceModal} style={{ maxWidth: "600px" }}>
            <h2 className={styles.ceModalTitle}>
              Submission Successful
            </h2>

            <p className={styles.ceModalText}>
              Your event will be published once verified.
            </p>

            <div className={styles.ceModalActions}>
              <button
                className={styles.ceBtnPrimary}
                onClick={() => {
                  // close modal
                  setFinal({ showModal: false });

                  // go back to step 1
                  setStep(1);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
