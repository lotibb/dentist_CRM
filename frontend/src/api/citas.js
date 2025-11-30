import axios from "axios";
const API = "http://localhost:3000/citas";

export const createCita = (data) => axios.post(API, data);
export const getCitas = () => axios.get(API);
