import API from "../api/axios";

export const sendMessage = (data) =>
  API.post("/messages", data);

export const getMessages = () =>
  API.get("/messages");