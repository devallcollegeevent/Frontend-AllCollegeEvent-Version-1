"use client";

import "../../organizer-auth.css";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getCountries,
  getStates,
  getCities,
  getColleges,
} from "@/lib/locationApi";

// Constants
import {
  LABEL_ORG_STEP_CATEGORY,
  LABEL_ORG_STEP_DETAILS,
  LABEL_ORG_STEP_ACCOUNT,
  SUBTITLE_ORG_DETAILS,
  MSG_ERR_FILL_ALL_FIELDS,
  BTN_CONTINUE,
  DEFAULT_COLLEGE,
  DEFAULT_TRAINING,
  LABEL_ORG_COUNTRY,
  LABEL_ORG_STATE,
  LABEL_ORG_SELECT_COUNTRY,
  MSG_ORG_SELECT_COUNTRY ,
  LABEL_ORG_CITY,
  MSG_ORG_SELECT_STATE ,
  LABEL_ORG_NAME ,
  PH_ORG_ORGANIZATION_NAME ,
  LABEL_LOADING ,
  LABEL_ORG_SELECT_STATE ,
  LABEL_LOADING_STATES ,
  LABEL_ORG_SELECT_CITY ,
  LABEL_LOADING_CITIES 

} from "@/const-value/config-message/page";

import { organizerSignupAccountPage } from "@/app/routes";
import { toast } from "react-hot-toast";

export default function OrganizerDetailsPage() {
  
  const router = useRouter();
  const params = useSearchParams();
  const selectedCat = params?.get("cat") || "";

  // Form Values
  const [country, setCountry] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [orgName, setOrgName] = useState("");

  // Dropdown Data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [collegeList, setCollegeList] = useState([]);

  // Loading flags
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(false);

  // -----------------------------
  // Load Countries
  // -----------------------------
  useEffect(() => {
    async function load() {
      setLoadingCountries(true);
      try {
        const data = await getCountries();
        setCountries(data || []);
      } finally {
        setLoadingCountries(false);
      }
    }
    load();
  }, []);

  // -----------------------------
  // Load States when Country changes
  // -----------------------------
  useEffect(() => {
    if (!country) {
      setStates([]);
      setStateCode("");
      return;
    }

    async function load() {
      setLoadingStates(true);
      try {
        const data = await getStates(country);
        setStates(data || []);
      } finally {
        setLoadingStates(false);
      }
    }
    load();
  }, [country]);

  // -----------------------------
  // Load Cities when State changes
  // -----------------------------
  useEffect(() => {
    if (!stateCode) {
      setCities([]);
      setCity("");
      return;
    }

    async function load() {
      setLoadingCities(true);
      try {
        const data = await getCities(country, stateCode);
        setCities(data || []);
      } finally {
        setLoadingCities(false);
      }
    }
    load();
  }, [stateCode]);

  // -----------------------------
  // Load College List (only for category: college or training)
  // -----------------------------
  useEffect(() => {
    if (![DEFAULT_COLLEGE, DEFAULT_TRAINING].includes(selectedCat)) return;
    if (!country || !stateCode || !city) return;

    async function loadCollegeList() {
      setLoadingColleges(true);
      try {
        const data = await getColleges(country, stateCode, city);
        setCollegeList(data || []);
      } finally {
        setLoadingColleges(false);
      }
    }

    loadCollegeList();
  }, [city, selectedCat]);

  const canContinue = country && stateCode && city && orgName;

  // -----------------------------
  // SUBMIT → Go to Account page
  // -----------------------------
  function onContinue(e) {
    e.preventDefault();

    if (!canContinue) {
      return toast.error(MSG_ERR_FILL_ALL_FIELDS);
    }

    const qs = new URLSearchParams({
      cat: selectedCat,
      country,
      state: stateCode,
      city,
      orgName,
    }).toString();

    router.push(`${organizerSignupAccountPage}?${qs}`);
  }

  return (
    <div className="org-shell container-fluid">
      
      {/* Left Image (Kept exactly as original) */}
      <aside
        className="org-left d-flex align-items-center justify-content-center"
        style={{ backgroundImage: "url('/images/organizer-bg-circles.png')" }}
      >
        <img
          className="org-left-img img-fluid"
          src="/images/organizer-rocket.png"
          alt="rocket"
        />
      </aside>

      {/* Right Section */}
      <main className="org-right">
        <div className="org-card shadow-sm p-4">

          {/* Stepper */}
          <div className="org-stepper mb-4">
            
            <div className="org-step active">
              <div className="dot">1</div>
              <div className="label">{LABEL_ORG_STEP_CATEGORY}</div>
            </div>

            <div className="line active"></div>

            <div className="org-step active">
              <div className="dot">2</div>
              <div className="label">{LABEL_ORG_STEP_DETAILS}</div>
            </div>

            <div className="line"></div>

            <div className="org-step">
              <div className="dot">3</div>
              <div className="label">{LABEL_ORG_STEP_ACCOUNT}</div>
            </div>
          </div>

          {/* Page Heading */}
          <h2 className="org-title">{LABEL_ORG_STEP_DETAILS}</h2>
          <div className="org-sub mb-4">{SUBTITLE_ORG_DETAILS}</div>

          {/* Form */}
          <form onSubmit={onContinue}>
            
            {/* COUNTRY */}
            <div className="mb-3">
              <label className="form-label">{LABEL_ORG_COUNTRY}</label>
              <select
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">
                  {loadingCountries ? LABEL_LOADING : LABEL_ORG_SELECT_COUNTRY}
                </option>
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* STATE + CITY */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">{LABEL_ORG_STATE}</label>
                <select
                  className="form-select"
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                >
                  <option value="">
                    {!country
                      ? MSG_ORG_SELECT_COUNTRY
                      : loadingStates
                      ? LABEL_LOADING_STATES
                      : LABEL_ORG_SELECT_STATE}
                  </option>
                  {states.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">{LABEL_ORG_CITY}</label>
                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">
                    {!stateCode
                      ? MSG_ORG_SELECT_STATE
                      : loadingCities
                      ? LABEL_LOADING_CITIES
                      : LABEL_ORG_SELECT_CITY}
                  </option>
                  {cities.map((ct) => (
                    <option key={ct.name} value={ct.name}>{ct.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Organization Name */}
            <div className="mb-3">
              <label className="form-label">{LABEL_ORG_NAME}</label>

              {(selectedCat === DEFAULT_COLLEGE || selectedCat === DEFAULT_TRAINING) ? (
                <select
                  className="form-select"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                >
                  <option value="">
                    {loadingColleges ? LABEL_LOADING_COLLEGE : LABEL_ORG_SELECT_COLLEGE}
                  </option>

                  {collegeList.map((col) => (
                    <option key={col.id} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="form-control"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder={PH_ORG_ORGANIZATION_NAME}
                />
              )}
            </div>

            {/* Continue Button */}
            <button
              className="btn btn-primary w-100 mt-3"
              type="submit"
              disabled={!canContinue}
            >
              {BTN_CONTINUE}
            </button>
          </form>

        </div>
      </main>
    </div>
  );
}
