import axios from "axios";
import { EnvironmentConfig } from "@/environments/config";

const client = axios.create({
  baseURL: EnvironmentConfig.getUrl(),
  timeout: 30000,
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
