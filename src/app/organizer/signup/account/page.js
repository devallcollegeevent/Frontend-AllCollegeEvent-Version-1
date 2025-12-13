"use client";

import "../../organizer-auth.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { organizerSignupApi } from "@/lib/apiClient";
import { toast } from "react-hot-toast";

// ✔ Using ONLY constants that EXIST in your const file
import {
  TITLE_ORG_ACCOUNT_CREATION,
  SUBTITLE_ORG_ACCOUNT_CREATION,
  LABEL_ORG_EMAIL,
  LABEL_PASSWORD,
  LABEL_CONFIRM_PASSWORD,
  PH_ORG_EMAIL,
  PH_PASSWORD,
  PH_CONFIRM_PASSWORD,
  MSG_ERR_FILL_ALL_FIELDS,
  MSG_ERR_PASSWORD_MISMATCH,
  MSG_ERR_CATEGORY_MISSING,
  MSG_ERR_SIGNUP_FAILED,
  MSG_GENERIC_ERROR,
  INPUT_PASSWORD ,
  ROLE_ORGANIZER,
  BTN_VERIFY_DOMAIN,
  BTN_VERIFY_DOMAIN_LOADING,
  BTN_CLOSE,
  TEXT_NO_ACCOUNT,
  TEXT_SIGNIN,
  TITLE_VERIFY_ACCOUNT,
  MSG_VERIFY_EMAIL_SENT,
  INPUT_TEXT ,
  
} from "@/const-value/config-message/page";

import { organizerLoginPage } from "@/app/routes";
import { ViewIcon, HideIcon } from "@/components/icons/Icons";

export default function OrganizerAccountPage() {
  const router = useRouter();
  const params = useSearchParams();

  // Previous step values
  const queryData = {
    category: params.get("cat") || "",
    country: params.get("country") || "",
    state: params.get("state") || "",
    city: params.get("city") || "",
    orgName: params.get("orgName") || "",
  };

  // Form states
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Toggles
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  // Modal + loading
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Submit handler
  async function onContinue(e) {
    e.preventDefault();

    if (!domain || !password || !confirm)
      return toast.error(MSG_ERR_FILL_ALL_FIELDS);

    if (password !== confirm) return toast.error(MSG_ERR_PASSWORD_MISMATCH);

    if (!queryData.category) return toast.error(MSG_ERR_CATEGORY_MISSING);

    const payload = {
      org_cat: queryData.category,
      country: queryData.country,
      state: queryData.state,
      city: queryData.city,
      org_name: queryData.orgName,
      email: domain,
      password,
      type: ROLE_ORGANIZER,
    };

    try {
      setLoading(true);
      const res = await organizerSignupApi(payload);

      if (!res.success) {
        toast.error(res.message || MSG_ERR_SIGNUP_FAILED);
        return;
      }

      setShowModal(true);
    } catch (err) {
      toast.error(MSG_GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    router.push(organizerLoginPage);
  }

  return (
    <>
      <div className="org-shell container-fluid">
        {/* Left Image (Kept exactly as original) */}
        <aside
          className="org-left d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: "url('/images/organizer-bg-circles.png')",
          }}
        >
          <img
            className="org-left-img img-fluid"
            src="/images/organizer-rocket.png"
            alt="rocket"
          />
        </aside>

        {/* RIGHT FORM SECTION */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="fw-bold text-center">
              {TITLE_ORG_ACCOUNT_CREATION}
            </h2>
            <p className="text-muted text-center mb-4">
              {SUBTITLE_ORG_ACCOUNT_CREATION}
            </p>

            {/* FORM */}
            <form onSubmit={onContinue}>
              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">{LABEL_ORG_EMAIL}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={PH_ORG_EMAIL}
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">{LABEL_PASSWORD}</label>
                <div className="input-group">
                  <input
                    type={showPass1 ? INPUT_TEXT : INPUT_PASSWORD}
                    className="form-control"
                    placeholder={PH_PASSWORD}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text"
                    role="button"
                    onClick={() => setShowPass1(!showPass1)}
                  >
                    {showPass1 ? <ViewIcon /> : <HideIcon />}
                  </span>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-3">
                <label className="form-label">
                  {LABEL_CONFIRM_PASSWORD}
                </label>
                <div className="input-group">
                  <input
                    type={showPass2 ? INPUT_TEXT : INPUT_PASSWORD}
                    className="form-control"
                    placeholder={PH_CONFIRM_PASSWORD}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <span
                    className="input-group-text"
                    role="button"
                    onClick={() => setShowPass2(!showPass2)}
                  >
                    {showPass2 ? <ViewIcon /> : <HideIcon />}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={loading}
              >
                {loading ? BTN_VERIFY_DOMAIN_LOADING : BTN_VERIFY_DOMAIN}
              </button>

              <p className="text-center mt-3">
                {TEXT_NO_ACCOUNT} <a href={organizerLoginPage}>{TEXT_SIGNIN}</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="verify-overlay d-flex justify-content-center align-items-center">
          <div className="verify-modal p-4 bg-white rounded shadow-lg text-center">
            <button
              className="btn btn-sm btn-outline-dark float-end"
              onClick={closeModal}
            >
              {BTN_CLOSE}
            </button>

            <img
              src="/images/logo.png"
              alt="logo"
              className="verify-logo mb-3"
            />

            <h2 className="fw-bold">{TITLE_VERIFY_ACCOUNT}</h2>
            <p className="text-muted">{MSG_VERIFY_EMAIL_SENT}</p>
          </div>
        </div>
      )}
    </>
  );
}
