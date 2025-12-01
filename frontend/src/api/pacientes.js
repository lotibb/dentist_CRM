import axios from "axios";
import API_BASE_URL from "../config/api.config";

const API = `${API_BASE_URL}/pacientes`;

export const getPacientes = () => axios.get(API);
export const getPaciente = (id) => axios.get(`${API}/${id}`);
export const createPaciente = (data) => axios.post(API, data);
export const updatePaciente = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePaciente = (id) => axios.delete(`${API}/${id}`);
