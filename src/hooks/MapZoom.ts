import { useState } from "react";
import { initialViewState } from "../pages/MapPage";

export const useMapZoom = (mapRef: any) => {
  const [finishedZoom, setFinishedZoom] = useState<boolean>(false);

  const zoomTo = (coordinates: number[]) => {
    setFinishedZoom(false);
    const [longitude, latitude] = coordinates;
    mapRef.current
      .flyTo({
        center: [longitude, latitude],
        zoom: 10,
        duration: 2000,
      })
      .once("moveend", () => setFinishedZoom(true));
  };

  const zoomOut = () => {
    setFinishedZoom(false);

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [initialViewState.longitude, initialViewState.latitude],
        zoom: 6,
        duration: 2000,
      });
    }
  };

  return { zoomTo, zoomOut, finishedZoom };
};
