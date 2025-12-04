"use client";

export function logoutUser() {
  document.cookie = "token=; path=/; max-age=0";
  document.cookie = "role=; path=/; max-age=0";

  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  sessionStorage.clear();
}
