import React, { useRef, useState, useEffect } from "react";
import Map, { Layer, Source, ViewState, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Switch, Typography, IconButton, Skeleton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import MountainPassCard from "../components/MountainPassCard";
import { MountainPassData, MountainPassType } from "../utils/mountainPassTypes";
import CameraCard from "../components/CameraCard";
import { fetchAllMountainPasses, fetchPrediction } from "../api/api";
import { predictions } from "../utils/PredictionTypes";
import wellknown from "wellknown";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const buildIndividualGeoJson = (data: any[]): MountainPassData[] => {
  return data.map((feature: any) => {
    const individualGeoJSON: MountainPassData = {
      type: "Feature",
      geometry: wellknown.parse(feature.wkt),
      properties: {
        id: feature.id,
        navn: feature.navn,
        overgangsType: feature.overgangstype,
        antallFylker: feature.antallFylker,
        veiKategori: feature.veiKategori,
        veiNummer: feature.veiNummer,
        strekningsType: feature.strekningsType,
        fra: feature.fra,
        til: feature.til,
        lokaltFra: feature.lokaltFra,
        lokaltTil: feature.lokaltTil,
        senter: wellknown.parse(feature.senter) as GeoJSON.Point,
        wkt: feature.wkt,
      },
    };
    return individualGeoJSON;
  });
};

const initialViewState: ViewState = {
  longitude: 8.4999235,
  latitude: 61.0502212,
  zoom: 6,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

function MapPage() {
  const [prediction, setPrediction] = useState<predictions[]>([]);
  const [predictionLoading, setPredictionLoading] = useState<boolean>(true);
  const [individualGeojsons, setIndividualGeojsons] = useState<
    MountainPassData[]
  >([]);

  const [showAll, setShowAll] = useState<boolean>(true);

  const [finishedZoom, setFinishedZoom] = useState<boolean>(false);

  const [loadingFjelloverganger, setLoadingFjelloverganger] =
    useState<boolean>(true);
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const [selectedPass, setSelectedPass] = useState<MountainPassData | null>(
    null
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const mapRef = useRef<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const pass = await fetchAllMountainPasses();
        setIndividualGeojsons(buildIndividualGeoJson(pass.data));
        setLoadingFjelloverganger(false);

        const result = await fetchPrediction();
        setPrediction(result.data);
        setPredictionLoading(false);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      setFinishedZoom(false);
      if (selectedPass && selectedPass.properties.senter) {
        const [longitude, latitude] =
          selectedPass.properties.senter.coordinates;
        mapRef.current
          .flyTo({
            center: [longitude, latitude],
            zoom: 10,
            duration: 2000,
          })
          .once("moveend", () => setFinishedZoom(true));
      } else {
        mapRef.current.flyTo({
          center: [initialViewState.longitude, initialViewState.latitude],
          zoom: 6,
          duration: 2000,
        });
      }
    }
  }, [selectedPass]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        <div
          style={{ flex: "1", height: "100vh", width: "100%", padding: "10px" }}
        >
          <section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="delete"
              color="inherit"
              size="large"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <Typography>Vis alle fjelloverganger</Typography>
            <Switch
              checked={showAll}
              onChange={() => setShowAll(!showAll)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </section>

          <nav style={{ maxHeight: "100%", overflowY: "auto" }}>
            {loadingFjelloverganger ? (
              <Skeleton variant="rounded" height={"91vh"} />
            ) : (
              individualGeojsons.map((mountainPassData: MountainPassData) => (
                <MountainPassCard
                  data={mountainPassData}
                  key={mountainPassData.properties.id}
                  prediction={prediction}
                  predictionLoading={predictionLoading}
                  selectPass={setSelectedPass}
                  selectedPass={selectedPass}
                />
              ))
            )}
          </nav>
        </div>
        <Map
          {...viewState}
          ref={mapRef}
          mapStyle={
            darkMode
              ? "mapbox://styles/mapbox/dark-v11"
              : "mapbox://styles/mapbox/light-v11"
          }
          mapboxAccessToken={MAPBOX_TOKEN}
          onMove={(e) => setViewState(e.viewState)}
          style={{ flex: "3", height: "100%", width: "100%" }}
        >
          {showAll ? (
            individualGeojsons.map((mountainPassData: MountainPassData) => (
              <Source
                id={mountainPassData.properties.id.toString()}
                type="geojson"
                data={mountainPassData}
                key={mountainPassData.properties.id}
              >
                {selectedPass &&
                  finishedZoom &&
                  selectedPass.properties.senter && (
                    <Marker
                      longitude={selectedPass.properties.senter.coordinates[0]}
                      latitude={selectedPass.properties.senter.coordinates[1]}
                    >
                      <CameraCard
                        imgSrc={
                          "https://webkamera.atlas.vegvesen.no/public/kamera?id=3000545_1"
                        }
                        fjell={selectedPass.properties.navn}
                      />
                    </Marker>
                  )}
                <Layer
                  id={`route-layer-${mountainPassData.properties.id}`}
                  type="line"
                  layout={{ "line-cap": "round", "line-join": "round" }}
                  paint={
                    mountainPassData.properties.strekningsType ===
                    "Fjellovergang"
                      ? { "line-color": "#FF9999", "line-width": 2 }
                      : { "line-color": "#99CCFF", "line-width": 2 }
                  }
                />
              </Source>
            ))
          ) : (
            <></>
          )}
          {selectedPass && !showAll ? (
            <Source
              id="mountain-pass-source"
              type="geojson"
              data={selectedPass}
            >
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
      </div>
    </ThemeProvider>
  );
}

export default MapPage;
