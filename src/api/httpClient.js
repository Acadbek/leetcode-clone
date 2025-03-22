import ky, { HTTPError } from "ky";
import { API_BASE } from "./constants";

export const httpClient = ky.create({
  prefixUrl: API_BASE,
  timeout: false,
  retry: {
    limit: 2,
    statusCodes: [401, 408, 413, 429, 500, 502, 503, 504],
    methods: ["get", "post", "put", "delete"],
  },
});
