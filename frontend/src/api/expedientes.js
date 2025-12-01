import axios from "axios";
import API_BASE_URL from "../config/api.config";

const API = `${API_BASE_URL}/expedientes`;

export const getExpedientes = () => axios.get(API);
export const getExpediente = (id) => axios.get(`${API}/${id}`);
export const createExpediente = (data) => axios.post(API, data);
export const updateExpediente = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteExpediente = (id) => axios.delete(`${API}/${id}`);

