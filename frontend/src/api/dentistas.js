import axios from "axios";
import API_BASE_URL from "../config/api.config";

const API = `${API_BASE_URL}/dentistas`;

export const getDentistas = () => axios.get(API);
