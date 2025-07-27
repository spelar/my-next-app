import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    "content-type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
  },
};
export const axiosInstance = axios.create(config); 