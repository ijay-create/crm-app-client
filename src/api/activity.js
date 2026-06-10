import API from "../api/axios";

export const fetchActivityLogs = () =>
  API.get("/activity");