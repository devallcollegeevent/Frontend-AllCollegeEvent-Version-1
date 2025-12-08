"use client";

export function logoutUser() {
  // Clear cookies
  document.cookie = "token=; path=/; max-age=0";
  document.cookie = "role=; path=/; max-age=0";

  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("userData");

  // Session clear
  sessionStorage.clear();
}

export function logoutOrganizer() {
  // Clear cookies
  document.cookie = "token=; path=/; max-age=0";
  document.cookie = "role=; path=/; max-age=0";

  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("userData");

  // Session clear
  sessionStorage.clear();
}
