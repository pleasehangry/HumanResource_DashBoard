import axios from "axios";
import { HOST_API } from "../constants/Api";

const API = axios.create({
  baseURL: HOST_API,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

API.interceptors.request.use((req) => {
  let profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.Authorization = `Token ${JSON.parse(profile).token}`;
  }
  return req;
});
// AUTH
export const login = (formdata) => API.post("/api/login/", formdata);
export const register = (formdata) => API.post("/api/register/", formdata);

// USER
export const fetchEmployee = (userId) =>
  API.get(`/staff/detail/user/${userId}`);
export const addEmployee = (formdata) => API.post(`/staff/create`, formdata);
export const fetchEmployees = () => API.get(`/staff/list`);
export const fetchAttandance = (date) =>
  API.get(
    `/staff/attendance/statistical?day=${date.day.concat(
      "&"
    )}month=${date.month.concat("&")}year=${date.year}`
  );
export const updateEmployee = (id, updatedUser) =>
  API.put(`/employee/${id}`, updatedUser);
export const deleteEmployee = (id) => API.delete(`/staff/detail/${id}/delete`);
