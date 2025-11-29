export const saveToken = (token) => {
  if (typeof window !== "undefined") localStorage.setItem("token", token);
};
export const getToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
};
export const clearToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem("token");
};
