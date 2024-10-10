import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://webkamera.atlas.vegvesen.no/public",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllCameras = () => {
  return apiClient.get("/kameradatagruppert");
};

export const fetchCamera = (id: number) => {
  return apiClient.get(`/kamera?id=${id}`);
};
