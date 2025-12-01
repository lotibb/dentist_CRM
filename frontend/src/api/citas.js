import axios from "axios";
import API_BASE_URL from "../config/api.config";

const API = `${API_BASE_URL}/citas`;

export const createCita = (data) => axios.post(API, data);
export const getCitas = () => axios.get(API);
