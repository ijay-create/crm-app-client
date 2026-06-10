import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const fetchCustomers = (page) =>
  API.get(`/customers?page=${page}`);

export const createCustomer = (data) =>
  API.post("/customers", data);

export const updateCustomer = (id, data) =>
  API.put(`/customers/${id}`, data);

export const deleteCustomer = (id) =>
  API.delete(`/customers/${id}`);

export const updateCustomerStatus = (id, status) =>
  API.patch(`/customers/${id}/status`, { status });