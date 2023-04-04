import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Token ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
// AUTH
export const login = (formdata) => API.post("/auth/login", formdata);
export const register = (formdata) => API.post("/api/register", formdata);

// USER
export const fetchEmployee = (id) => API.get(`/staff/${id}`);
export const addEmployee = (formdata) => API.post(`/employee/add`, formdata);
export const fetchEmployees = () => API.get(`/staff/list`);
export const updateEmployee = (id, updatedUser) =>
  API.put(`/employee/${id}`, updatedUser);
export const deleteEmployee = (id) => API.delete(`/employee/${id}`);
