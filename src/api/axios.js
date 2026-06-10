import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
API.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("crm_user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (err) {
      console.warn("Token parse error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR (FIXED)
========================= */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // ❌ DO NOT auto-refresh (this is breaking your login)
    if (status === 401) {
      console.warn("Unauthorized request blocked (no auto logout)");

      // IMPORTANT: just reject, do NOT clear storage
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default API;