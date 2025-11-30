import axios from "axios";
const API = "http://localhost:3000/dentistas";

export const getDentistas = () => axios.get(API);
