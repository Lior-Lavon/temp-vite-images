import axios from "axios";

// import from env variable
const API_KEY = import.meta.env.VITE_API_KEY;

export const customFetch = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});
