import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPrediction = (id: string) => {
  return apiClient.get(`/getPredictions/${id}`);
};

export const fetchAllMountainPasses = () => {
  return apiClient.get("/getRelevantMountainPassesWithPassability");
};

export const fetchMountainPasses = (id: string) => {
  return apiClient.get(`/mountainPass/${id}`);
};

export const fetchWeatherData = (lat: number, lon: number) => {
  return apiClient.get(`/getCurrentWeather?lat=${lat}&lon=${lon}`);
};

export const fetchPassabillity = (id: number) => {
  return apiClient.get(`/getCurrentPassability/${id}`);
};
