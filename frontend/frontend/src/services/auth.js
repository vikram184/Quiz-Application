import API from "./api";

export const login = (formData) => API.post("http://localhost:5000/api/auth/login", formData);
export const register = (formData) => API.post("http://localhost:5000/api/auth/register", formData);
