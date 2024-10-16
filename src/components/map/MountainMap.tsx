import Map, { Layer, Source, ViewState, Marker } from "react-map-gl";

import { MountainPassData } from "../../types/mountainPassTypes";
import { WeatherData } from "../../types/dataTypes";
import CameraCard from "./CameraCard";
import MountainPassMapLines from "./MountainPassMapLines";
import { useEffect } from "react";
import { useMapZoom } from "../../hooks/MapZoom";

interface MountainMapProps {
  viewState: ViewState;
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  darkMode: boolean;
  mapRef: React.MutableRefObject<any>;
  mountainpassData: MountainPassData[] | null;
  mountainpassLoading: boolean;
  selectedPass: MountainPassData | null;
  setSelectedPass: React.Dispatch<
    React.SetStateAction<MountainPassData | null>
  >;
  weatherData: WeatherData | null;
  weatherLoading: boolean;
  weatherError: boolean;
}

const DARK_MAP = "mapbox://styles/mapbox/dark-v11";
const LIGHT_MAP = "mapbox://styles/mapbox/light-v11";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MountainMap({
  viewState,
  setViewState,
  darkMode,
  mapRef,
  mountainpassData,
  mountainpassLoading,
  selectedPass,
  setSelectedPass,
  weatherData,
  weatherLoading,
  weatherError,
}: MountainMapProps) {

  const { zoomTo, zoomOut, finishedZoom } = useMapZoom(mapRef);
  
  useEffect(() => {
    if (selectedPass) {
      zoomTo(selectedPass.properties.senter.coordinates);
    } else {
      zoomOut();
    }
  }, [selectedPass]);

  return (
    <Map
      {...viewState}
      ref={mapRef}
      mapStyle={darkMode ? DARK_MAP : LIGHT_MAP}
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(e) => setViewState(e.viewState)}
      style={{ flex: "3", height: "100%", width: "100%" }}
    >
      {mountainpassData?.map((mountainPassData: MountainPassData) => (
          <Source
            id={mountainPassData.properties.id.toString()}
            type="geojson"
            data={mountainPassData}
            key={mountainPassData.properties.id}
          >
            {selectedPass && finishedZoom && selectedPass.properties.senter && (
              <Marker
                longitude={selectedPass.properties.senter.coordinates[0]}
                latitude={selectedPass.properties.senter.coordinates[1]}
              ></Marker>
            )}
            <MountainPassMapLines
              mountainPassId={mountainPassData.properties.id}
              isMountainPassClosed={mountainPassData.properties.passability}
              loading={mountainpassLoading}
              mapRef={mapRef}
              setSelectedPass={setSelectedPass}
            />
          </Source>
        ))
      }

      {selectedPass && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            overflowX: "hidden",
          }}
        >
          <CameraCard
            cameraId={selectedPass.properties.id}
            fjell={selectedPass.properties.navn}
            weatherData={weatherData}
            weatherLoading={weatherLoading}
            weatherError={weatherError}
          />
        </div>
      )}
    </Map>
  );
}
export default MountainMap;
