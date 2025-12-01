// API Configuration
// In development, this will use VITE_API_URL or default to localhost
// In production, set VITE_API_URL to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default API_BASE_URL;

