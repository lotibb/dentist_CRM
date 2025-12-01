import axios from "axios";
const API = "http://localhost:3000/expedientes";

export const getExpedientes = () => axios.get(API);
export const getExpediente = (id) => axios.get(`${API}/${id}`);
export const createExpediente = (data) => axios.post(API, data);
export const updateExpediente = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteExpediente = (id) => axios.delete(`${API}/${id}`);

