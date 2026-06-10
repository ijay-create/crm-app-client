import API from "./axios";

export const fetchActivityLogs = () =>
  API.get("/activity");