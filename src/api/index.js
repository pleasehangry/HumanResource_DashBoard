import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
// AUTH
export const login = (formdata) => API.post("/auth/login", formdata);
export const register = (formdata) => API.post("/auth/register", formdata);

// USER
export const fetchEmployee = (id) => API.get(`/employee/${id}`);
export const addEmployee = (formdata) => API.get(`/employee/add`, formdata);
export const fetchEmployees = () => API.get(`/employee`);
export const updateEmployee = (id, updatedUser) =>
  API.put(`/employee/${id}`, updatedUser);
export const deleteEmployee = (id) => API.delete(`/employee/${id}`);
