"use client";

import { useState } from "react";
import styles from "./ManagePage.module.css";


export default function ManagePage() {
  const [mode, setMode] = useState("view");
  const [coverImage, setCoverImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file)); // preview
    }
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className={styles.title}>Manage Page</h2>
        <img
          src="/images/Pen.png"
          alt="edit"
          className={styles.editIcon}
          onClick={() => setMode("edit")}
        />
      </div>

      {/* ---------------- VIEW MODE ---------------- */}
      {mode === "view" && (
        <div className={styles.viewBox}>
          <div className={styles.item}>
            <div>
              <h4> LinkedIn</h4>
              <p>https://www.linkedin.com/in/nandhini007</p>
            </div>
          </div>

          <div className={styles.item}>
            <div>
              <h4> Instagram</h4>
              <p>https://www.linkedin.com/in/nandhini007</p>
            </div>
          </div>

          <div className={styles.item}>
            <div>
              <h4> Facebook</h4>
              <p>https://www.linkedin.com/in/nandhini007</p>
            </div>
          </div>

          <div className={styles.item}>
            <div>
              <h4> X (Twitter)</h4>
              <p>https://www.linkedin.com/in/nandhini007</p>
            </div>
          </div>

          <div className={styles.item}>
            <div>
              <h4> YouTube</h4>
              <p>https://www.linkedin.com/in/nandhini007</p>
            </div>
          </div>

          <div className={styles.item}>
            <div>
              <h4>Telegram</h4>
              <p>https://www.linkedin.com/in/nandhini007</p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- EDIT MODE ---------------- */}
      {mode === "edit" && (
        <div className={styles.editBox}>
          <div
            className={styles.uploadBox}
            onClick={() => document.getElementById("coverUpload")?.click()}
          >
            {!coverImage && (
              <>
                <div style={{ paddingBottom: "10px" }}></div>
                <p>Upload Cover Image</p>
              </>
            )}

            {coverImage && (
              <img
                src={coverImage}
                alt="cover"
                className={styles.previewImg}
              />
            )}

            <input
              type="file"
              id="coverUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>

          <div className={styles.grid}>
            <div>
              <label>LinkedIn</label>
              <input placeholder="Enter your profile URL" />
            </div>

            <div>
              <label>Instagram</label>
              <input placeholder="Enter your profile URL" />
            </div>

            <div>
              <label>Facebook</label>
              <input placeholder="Enter your profile URL" />
            </div>

            <div>
              <label>X (Twitter)</label>
              <input placeholder="Enter your profile URL" />
            </div>

            <div>
              <label>YouTube</label>
              <input placeholder="Enter your profile URL" />
            </div>

            <div>
              <label>Telegram</label>
              <input placeholder="Enter your profile URL" />
            </div>
          </div>

          <div className={styles.btnRow}>
            <button
              className={styles.cancelBtn}
              onClick={() => setMode("view")}
            >
              Cancel
            </button>

            <button
              className={styles.saveBtn}
              onClick={() => setMode("success")}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ---------------- SUCCESS ---------------- */}
      {mode === "success" && (
        <div className={styles.successBox}>Successfully Updated!!</div>
      )}
    </div>
  );
}
