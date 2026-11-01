import "dotenv/config";

export const settings = {
  apiBaseUrl: process.env.API_BASE_URL,
  timeoutMs: Number(process.env.TIMEOUT_MS),
};
