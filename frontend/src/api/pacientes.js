import axios from "axios";
const API = "http://localhost:3000/pacientes";

export const getPacientes = () => axios.get(API);
export const getPaciente = (id) => axios.get(`${API}/${id}`);
export const createPaciente = (data) => axios.post(API, data);
export const updatePaciente = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePaciente = (id) => axios.delete(`${API}/${id}`);
