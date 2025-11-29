"use client";

import "../../organizer-auth.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DUMMY_COUNTRIES = [
  {
    code: "IN",
    name: "India",
    states: [
      {
        code: "TN",
        name: "Tamil Nadu",
        cities: ["Chennai", "Coimbatore", "Madurai"],
      },
      { code: "KA", name: "Karnataka", cities: ["Bengaluru", "Mysore"] },
    ],
  },
  {
    code: "US",
    name: "United States",
    states: [
      { code: "CA", name: "California", cities: ["San Francisco", "LA"] },
      { code: "NY", name: "New York", cities: ["New York City", "Buffalo"] },
    ],
  },
];

export default function Page() {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [orgName, setOrgName] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const c = DUMMY_COUNTRIES.find((x) => x.code === country);
    if (c) {
      setStates(c.states);
      setStateCode("");
      setCity("");
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
      setStateCode("");
      setCity("");
    }
  }, [country]);

  useEffect(() => {
    const s = states.find((x) => x.code === stateCode);
    if (s) {
      setCities(s.cities);
      setCity("");
    } else setCities([]);
  }, [stateCode, states]);

  function onContinue() {
    // if(!country || !stateCode || !city || !orgName) return alert('Please fill all fields');
    // pass via query or global state; demo push:
    router.push("/organizer/signup/account");
  }

  return (
    <div className="container-fluid organizer-shell">
      <div className="row g-0">
        <div
          className="col-lg-6 col-md-6 col-12 organizer-left"
          style={{ backgroundImage: "url('/images/organizer-bg-circles.png')" }}
        >
          <img
            className="organizer-left-img"
            src="/images/organizer-rocket.png"
            alt="rocket"
          />
        </div>

        <div className="col-lg-6 col-md-6 col-12 organizer-right">
          <div className="organizer-card">
            {/* Stepper - mark step 2 active */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div className="organizer-step active">
                <div className="dot">1</div>
                <div style={{ fontSize: 12, marginTop: 8 }}>
                  Organization Category
                </div>
              </div>
              <div style={{ flex: 1, height: 3, background: "#eee" }}></div>
              <div className="organizer-step active">
                <div className="dot">2</div>
                <div style={{ fontSize: 12, marginTop: 8 }}>
                  Organization Details
                </div>
              </div>
              <div style={{ flex: 1, height: 3, background: "#eee" }}></div>
              <div className="organizer-step">
                <div className="dot" style={{ background: "#eee" }}>
                  3
                </div>
                <div style={{ fontSize: 12, marginTop: 8 }}>
                  Account Creation
                </div>
              </div>
            </div>

            <h1 className="organizer-title">Organization Details</h1>
            <div className="organizer-sub">
              Provide the basic information about your organization
            </div>

            <div style={{ padding: "0px 102px" }}>
              <div className="form-group">
                <label className="form-label">Country</label>
                <select
                  className="form-control select-inline"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select your Country</option>
                  {DUMMY_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <select
                    className="form-control select-inline"
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                  >
                    <option value="">Select your State</option>
                    <option value="">Dharmapuri</option>
                    <option value="">coimbatore</option>
                    {states.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <select
                    className="form-control select-inline"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select your City</option>
                    <option value="">Select your City</option>
                    <option value="">Select your City</option>
                    <option value="">Select your City</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Organization Name</label>
                <input
                  className="form-control"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Enter Organization Name"
                />
              </div>

              <div style={{ marginTop: 8, padding: "10px 91px" }}>
                <button className="btn-primary-ghost" onClick={onContinue}>
                  Continue
                </button>
              </div>
              <div className="small-note">
                Already have an Account!?{" "}
                <a href="/organizer/login" className="u-organizer-link">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
