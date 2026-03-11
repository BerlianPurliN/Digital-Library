import { writable } from "svelte/store";

function getStoredUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
}

export const token = writable(localStorage.getItem("token") || "");
export const user = writable(getStoredUser());

/**
 * @param {string} newToken
 * @param {any} newUser
 */
export function setAuth(newToken, newUser) {
  token.set(newToken);
  user.set(newUser);
  localStorage.setItem("token", newToken);
  localStorage.setItem("user", JSON.stringify(newUser));
}

export function clearAuth() {
  token.set("");
  user.set(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
