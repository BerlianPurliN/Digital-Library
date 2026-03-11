export const API_URL = "http://127.0.0.1:8000/api";

/**
 * Fungsi helper untuk hit API
 * @param {string} endpoint - URL endpoint
 * @param {RequestInit} options - Opsi fetch
 */
export async function fetchApi(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  /** @type {Record<string, string>} */
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  return await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
}
