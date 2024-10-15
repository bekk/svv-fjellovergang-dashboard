import Map, { Layer, Source, ViewState, Marker } from "react-map-gl";

import { MountainPassData } from "../../types/mountainPassTypes";
import { WeatherData } from "../../types/dataTypes";
import CameraCard from "./CameraCard";
import MountainPassMapLines from "./MountainPassMapLines";

interface MountainMapProps {
  viewState: ViewState;
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  darkMode: boolean;
  mapRef: React.MutableRefObject<any>;
  showAll: boolean;
  mountainpassData: MountainPassData[] | null;
  mountainpassLoading: boolean;
  selectedPass: MountainPassData | null;
  finishedZoom: boolean;
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
  showAll,
  mountainpassData,
  mountainpassLoading,
  selectedPass,
  finishedZoom,
  weatherData,
  weatherLoading,
  weatherError,
}: MountainMapProps) {
  return (
    <Map
      {...viewState}
      ref={mapRef}
      mapStyle={darkMode ? DARK_MAP : LIGHT_MAP}
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(e) => setViewState(e.viewState)}
      style={{ flex: "3", height: "100%", width: "100%" }}
    >
      {showAll ? (
        mountainpassData?.map((mountainPassData: MountainPassData) => (
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
              >
                <CameraCard
                  cameraId={selectedPass.properties.id}
                  fjell={selectedPass.properties.navn}
                  weatherData={weatherData}
                  weatherLoading={weatherLoading}
                  weatherError={weatherError}
                />
              </Marker>
            )}
            <MountainPassMapLines
              mountainPassId={mountainPassData.properties.id}
              isMountainPassClosed={mountainPassData.properties.passability}
              loading={mountainpassLoading}
            />
          </Source>
        ))
      ) : (
        <></>
      )}
      {selectedPass && !showAll ? (
        <Source id="mountain-pass-source" type="geojson" data={selectedPass}>
          <Layer
            id="mountain-pass-layer"
            type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={
              selectedPass.properties.strekningsType === "Fjellovergang"
                ? { "line-color": "#FF9999", "line-width": 2 }
                : { "line-color": "#99CCFF", "line-width": 2 }
            }
          />
        </Source>
      ) : (
        <></>
      )}
    </Map>
  );
}

export default MountainMap;
