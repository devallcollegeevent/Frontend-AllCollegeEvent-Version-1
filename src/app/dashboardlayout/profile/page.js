"use client";

import { useState } from "react";
import styles from "./Profile.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IMAGEICON , LOCKICON} from "@/const-value/config-icons/page";

export default function ProfilePage() {
  const [mode, setMode] = useState("view");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <div className={styles.profileWrapper}>
      {/* ================= VIEW MODE ================= */}
      {mode === "view" && (
        <div className={styles.viewBox}>
          <div>
            <label>Full Name</label>
            <p>Vanisree M</p>
          </div>

          <div>
            <label>Domain Mail ID</label>
            <p>editor@glbconference.com</p>
          </div>

          <img
            src="/images/Pen.png"
            alt="edit"
            className={styles.editIcon}
            onClick={() => setMode("edit")}
          />
        </div>
      )}

      {/* ================= EDIT MODE ================= */}
      {mode === "edit" && (
        <div className={styles.editBox}>
          <div className={styles.left}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />

            <label>Domain Email Id</label>
            <input type="text" placeholder="Enter your domain Id" />

            <p
              className={styles.changePassword}
              onClick={() => setMode("otp")}
            >
              {LOCKICON} Change Password
            </p>
          </div>

          <div>
            <div className={styles.uploadBox}>
              <div style={{ paddingBottom: "10px" }}>{IMAGEICON}</div>
              <p>Upload Profile picture (1:1) in PNG or JPEG Format</p>
            </div>

            <div className={styles.btnRow}>
              <button
                className={styles.cancelBtn}
                onClick={() => setMode("view")}
              >
                Cancel
              </button>
              <button className={styles.saveBtn}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= OTP MODE ================= */}
      {mode === "otp" && (
        <div className={styles.otpBox}>
          <h2>Change Your Password</h2>
          <p>Please enter the code sent to your gmail account</p>

          <div className={styles.otpInputs}>
            {[1, 2, 3, 4].map((_, i) => (
              <input key={i} type="text" maxLength="1" />
            ))}
          </div>

          <div className={styles.btnRow}>
            <button
              className={styles.cancelBtn}
              onClick={() => setMode("edit")}
            >
              Cancel
            </button>
            <button
              className={styles.saveBtn}
              onClick={() => setMode("newpassword")}
            >
              Continue
            </button>
          </div>

          <p className={styles.resend} style={{ marginTop: "10px" }}>
            Didn’t receive the email? <span>Resend Code</span>
          </p>
        </div>
      )}

      {/* ================= NEW PASSWORD ================= */}
      {mode === "newpassword" && (
        <div className={styles.passwordBox}>
          <h2>Set Your Password</h2>
          <p>
            It must contain at least 8 characters, including numbers and symbols.
          </p>

          <div className={styles.inputWrapper}>
            <input
              type={showPass1 ? "text" : "password"}
              placeholder="Enter new password"
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPass1(!showPass1)}
            >
              {showPass1 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className={styles.inputWrapper}>
            <input
              type={showPass2 ? "text" : "password"}
              placeholder="Confirm password"
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPass2(!showPass2)}
            >
              {showPass2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className={styles.btnRow}>
            <button
              className={styles.cancelBtn}
              onClick={() => setMode("edit")}
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

      {/* ================= SUCCESS ================= */}
      {mode === "success" && (
        <div className={styles.successBox}>
          <p>Password Successfully Changed!!</p>
        </div>
      )}
    </div>
  );
}
