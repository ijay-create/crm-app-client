import API from "./axios";

export const fetchDashboardStats = () =>
  API.get("/analytics/dashboard");