import axios from "axios";

const API_URL = "http://localhost:5000/api";

// -------- Blogs --------
export const getBlogs = () => axios.get(`${API_URL}/blogs`);
export const createBlog = (data) => axios.post(`${API_URL}/blogs`, data);
export const updateBlog = (id, data) => axios.put(`${API_URL}/blogs/${id}`, data);
export const deleteBlog = (id) => axios.delete(`${API_URL}/blogs/${id}`);

// -------- Auth --------
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
