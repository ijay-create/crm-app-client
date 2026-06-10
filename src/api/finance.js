import API from "../api/axios";

export const fetchRevenue = () =>
  API.get("/finance/revenue");