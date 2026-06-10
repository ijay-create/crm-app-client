import API from "../api/axios";


export const fetchDashboardStats = () =>
  API.get("/analytics/dashboard");