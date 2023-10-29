import axios from "axios";
const httpClient = axios.create({
  baseURL: process.env.API_HOST,
});

export default httpClient;
