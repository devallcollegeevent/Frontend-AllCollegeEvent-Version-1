import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", token);

  try {
    const decoded = jwtDecode(token);

    localStorage.setItem("userData", JSON.stringify(decoded.data));
  } catch (err) {
    console.error("Token decode failed", err);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
};

export const getUserData = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  }
};

export const saveEmail = (email) => {
  if (typeof window !== "undefined") localStorage.setItem("userEmail", email);
};
export const getEmail = () => {
  if (typeof window !== "undefined") return localStorage.getItem("userEmail");
};
export const clearEmail = () => {
  if (typeof window !== "undefined") localStorage.removeItem("userEmail");
};
