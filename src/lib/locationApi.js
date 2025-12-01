// BASE URL from .env
const BASE = process.env.NEXT_PUBLIC_LOCATION_API_BASE;

// ----------------------------
// 1) Get Countries
// ----------------------------
export const getCountries = async () => {
  const res = await fetch(`${BASE}/countries/iso`);
  const json = await res.json();

  return json.data.map(c => ({
    code: c.Iso2,
    name: c.name
  }));
};

// ----------------------------
// 2) Get States by Country Name
// ----------------------------
export const getStates = async (countryName) => {
  const res = await fetch(`${BASE}/countries/states`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: countryName })
  });

  const json = await res.json();

  return json.data.states.map(s => ({
    code: s.name,
    name: s.name
  }));
};

// ----------------------------
// 3) Get Cities by Country + State
// ----------------------------
export const getCities = async (countryName, stateName) => {
  const res = await fetch(`${BASE}/countries/state/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: countryName, state: stateName })
  });

  const json = await res.json();

  return json.data.map(c => ({
    code: c,
    name: c
  }));
};

export const getColleges = async (countryName, stateName, cityName) => {
  const res = await fetch(`${BASE}/countries/state/city/colleges`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      country: countryName,
      state: stateName,
      city: cityName
    })
  });

  const json = await res.json();

  // IMPORTANT: adapt to API response
  return json.data?.map(col => ({
    id: col.id || col,
    name: col.name || col
  })) || [];
};
