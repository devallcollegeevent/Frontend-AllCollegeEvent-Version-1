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
import { organizerSignupAccountPage } from "@/app/routes";
import { toast } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const selectedCat = params?.get("cat") || "";

  const [country, setCountry] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [orgName, setOrgName] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [collegeList, setCollegeList] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(false);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    async function load() {
      setLoadingCountries(true);
      try {
        const data = await getCountries();
        setCountries(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCountries(false);
      }
    }
    load();
  }, []);

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
        setStateCode("");
        setCities([]);
        setCity("");
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStates(false);
      }
    }
    load();
  }, [country]);

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
        setCity("");
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCities(false);
      }
    }
    load();
  }, [stateCode]);

  useEffect(() => {
    async function loadCollegeList() {
      if (selectedCat !== "college" && selectedCat !== "training") return;
      if (!country || !stateCode || !city) return;

      setLoadingColleges(true);
      try {
        const data = await getColleges(country, stateCode, city);
        setCollegeList(data || []);
      } catch (err) {
        console.error("College load error:", err);
      } finally {
        setLoadingColleges(false);
      }
    }

    loadCollegeList();
  }, [city, selectedCat]);

  const canContinue = country && stateCode && city && orgName;

  function onContinue(e) {
    e.preventDefault();

    try {
      if (!canContinue) {
        toast.error("Fill all fields");
        return;
      }

      const qs = new URLSearchParams({
        cat: selectedCat,
        country,
        state: stateCode,
        city,
        orgName,
      }).toString();

      router.push(`${organizerSignupAccountPage}?${qs}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="org-shell">
      <aside
        className="org-left"
        style={{ backgroundImage: "url('/images/organizer-bg-circles.png')" }}
      >
        <img
          className="org-left-img"
          src="/images/organizer-rocket.png"
          alt="rocket"
        />
      </aside>

      <main className="org-right">
        <div className="org-card">
          <div className="org-stepper">
            <div className="org-step active">
              <div className="dot">1</div>
              <div className="label">Organization Category</div>
            </div>

            <div className="line active" />

            <div className="org-step active">
              <div className="dot">2</div>
              <div className="label">Organization Details</div>
            </div>

            <div className="line" />

            <div className="org-step">
              <div className="dot">3</div>
              <div className="label">Account Creation</div>
            </div>
          </div>

          <h2 className="org-title">Organization Details</h2>
          <div className="org-sub">Provide your organization information</div>

          <form className="org-form" onSubmit={onContinue}>
            <div className="form-row">
              <div className="form-group full">
                <label className="form-label">Country</label>
                <select
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={loadingCountries}
                >
                  <option value="">
                    {loadingCountries ? "Loading..." : "Select Country"}
                  </option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="two-col">
                <div className="form-group">
                  <label className="form-label">State</label>
                  <select
                    className="form-control"
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    disabled={!country || loadingStates}
                  >
                    <option value="">
                      {!country
                        ? "Select country first"
                        : loadingStates
                        ? "Loading states..."
                        : "Select State"}
                    </option>
                    {states.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <select
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!stateCode || loadingCities}
                  >
                    <option value="">
                      {!stateCode
                        ? "Select state first"
                        : loadingCities
                        ? "Loading cities..."
                        : "Select City"}
                    </option>
                    {cities.map((ct) => (
                      <option key={ct.name} value={ct.name}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group full">
                <label className="form-label">Organization Name</label>

                {(selectedCat === "college" || selectedCat === "training") ? (
                  <select
                    className="form-control"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  >
                    <option value="">
                      {loadingColleges ? "Loading colleges..." : "Select College"}
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
                    placeholder="Enter Organization Name"
                  />
                )}
              </div>

              <div className="form-actions">
                <button
                  className="btn-primary-ghost"
                  type="submit"
                  disabled={!canContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
