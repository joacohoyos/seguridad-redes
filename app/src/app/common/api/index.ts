import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000/" }
});
export default api;
