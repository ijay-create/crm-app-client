import API from "./axios";

export const fetchRevenue = () =>
  API.get("/finance/revenue");