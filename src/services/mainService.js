import axios from "axios";

export const baseURL = "http://localhost:3000/";

const mainService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default mainService;
