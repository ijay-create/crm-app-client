import API from "./axios";

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