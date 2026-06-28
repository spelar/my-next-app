import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    "content-type": "application/json",
  },
};
export const axiosInstance = axios.create(config); 