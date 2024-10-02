import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPrediction = () => {
  return apiClient.get("/getPredictions");
};

export const fetchAllMountainPasses = () => {
  return apiClient.get("/getAllMountainPasses");
};

export const fetchMountainPasses = (id: string) => {
  return apiClient.get(`/mountainPass/${id}`);
};
