import { jwtDecode } from "jwt-decode";
import {
  STORAGE_TOKEN,
  STORAGE_USER_DATA,
  STORAGE_USER_EMAIL,
  MSG_TOKEN_DECODE_FAILED,
  MSG_GET_TOKEN_ERROR,
  MSG_USERDATA_PARSE_ERROR,
  MSG_CLEAR_TOKEN_ERROR,
  MSG_SAVE_EMAIL_ERROR,
  MSG_GET_EMAIL_ERROR,
  MSG_CLEAR_EMAIL_ERROR,
} from "@/const-value/config-message/page";

export const saveToken = (token) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_TOKEN, token);

  try {
    const decoded = jwtDecode(token);
    localStorage.setItem(STORAGE_USER_DATA, JSON.stringify(decoded.data));
  } catch (err) {
    console.error(MSG_TOKEN_DECODE_FAILED, err);
  }
};

export const getToken = () => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_TOKEN);
    }
  } catch (err) {
    console.error(MSG_GET_TOKEN_ERROR, err);
  }
  return null;
};

export const getUserData = () => {
  try {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(STORAGE_USER_DATA);
      return data ? JSON.parse(data) : null;
    }
  } catch (err) {
    console.error(MSG_USERDATA_PARSE_ERROR, err);
    return null;
  }
  return null;
};

export const clearToken = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_USER_DATA);
    }
  } catch (err) {
    console.error(MSG_CLEAR_TOKEN_ERROR, err);
  }
};

export const saveEmail = (email) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_USER_EMAIL, email);
    }
  } catch (err) {
    console.error(MSG_SAVE_EMAIL_ERROR, err);
  }
};

export const getEmail = () => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_USER_EMAIL);
    }
  } catch (err) {
    console.error(MSG_GET_EMAIL_ERROR, err);
  }
  return null;
};

export const clearEmail = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_USER_EMAIL);
    }
  } catch (err) {
    console.error(MSG_CLEAR_EMAIL_ERROR, err);
  }
};
