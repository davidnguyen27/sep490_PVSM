import { ENV } from "./env.config";

export const AXIOS_CONFIG = {
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
};
