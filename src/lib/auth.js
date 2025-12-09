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
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
  } catch (err) {
    console.error("Get token error:", err);
  }
  return null;
};

export const getUserData = () => {
  try {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("userData");
      return data ? JSON.parse(data) : null;
    }
  } catch (err) {
    console.error("UserData parse error:", err);
    return null;
  }
  return null;
};

export const clearToken = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    }
  } catch (err) {
    console.error("Clear token error:", err);
  }
};

export const saveEmail = (email) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("userEmail", email);
    }
  } catch (err) {
    console.error("Save email error:", err);
  }
};

export const getEmail = () => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userEmail");
    }
  } catch (err) {
    console.error("Get email error:", err);
  }
  return null;
};

export const clearEmail = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userEmail");
    }
  } catch (err) {
    console.error("Clear email error:", err);
  }
};
