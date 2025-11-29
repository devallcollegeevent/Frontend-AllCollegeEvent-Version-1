// src/lib/fetchWrapper.js (SSR Safe Fetch)

export async function serverFetch(url, options = {}) {
  const base = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(base + url, {
    ...options,
    cache: "no-store",         // full SSR re-render
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Unknown error occurred";
    try {
      const errorBody = await res.json();
      message = errorBody.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}
