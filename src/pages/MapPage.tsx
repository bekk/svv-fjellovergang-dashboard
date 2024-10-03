import React, { useRef, useState, useEffect } from "react";
import Map, { Layer, Source, ViewState, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Switch, Typography, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import jsonData from "../fjelloverganger.json";
import MountainPassCard from "../components/MountainPassCard";
import { MountainPassData } from "../utils/mountainPassTypes";
import CameraCard from "../components/CameraCard";
import { fetchPrediction } from "../api/api";
import { predictions } from "../utils/PredictionTypes";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const buildIndividualGeoJson = (data: any) => {
  return data.features.map((feature: any) => {
    const individualGeoJSON: MountainPassData = {
      type: "Feature",
      geometry: feature.geometry,
      properties: feature.properties,
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

  const [showAll, setShowAll] = useState<boolean>(true);
  const [mountainPass, setMountainPass] = useState<MountainPassData | null>(
    null
  );
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const mapStyle = darkMode
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";

  const mapRef = useRef<any>(null);

  const individualGeoJSONs: MountainPassData[] =
    buildIndividualGeoJson(jsonData);

  const handleClick = (id: number, open: boolean, index: number) => {
    setActiveCardIndex((prevIndex) => (prevIndex === index ? null : index));

    if (open) {
      const foundPass = individualGeoJSONs.find(
        (pass) => pass.properties.id === id
      );
      if (foundPass) {
        setMountainPass(foundPass);
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [
              foundPass.properties.senter.coordinates[0],
              foundPass.properties.senter.coordinates[1],
            ],
            zoom: 10,
            duration: 2000,
          });
          setCoordinates([
            foundPass.properties.senter.coordinates[0] + 0.1,
            foundPass.properties.senter.coordinates[1] + 0.1,
          ]);
        }
      } else {
        console.log("Mountain pass not found");
      }
    } else {
      setMountainPass(null);
      mapRef.current.flyTo({
        zoom: 6,
        duration: 2000,
      });
      setCoordinates(null);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchPrediction();
        setPrediction(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

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

          <div style={{ maxHeight: "100%", overflowY: "auto" }}>
            {individualGeoJSONs.map((mountainPassData: MountainPassData) => (
              <div
                key={mountainPassData.properties.id}
                style={{ marginBottom: "10px" }}
              >
                <MountainPassCard
                  data={mountainPassData}
                  handleClick={handleClick}
                  index={mountainPassData.properties.id}
                  openIndex={activeCardIndex}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: "3", height: "100%", width: "100%" }}>
          <Map
            {...viewState}
            ref={mapRef}
            mapStyle={mapStyle}
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={(e) => setViewState(e.viewState)}
          >
            {showAll ? (
              individualGeoJSONs.map((mountainPassData: MountainPassData) => (
                <div key={mountainPassData.properties.id}>
                  <Source
                    id={mountainPassData.properties.id}
                    type="geojson"
                    data={mountainPassData}
                  >
                    {coordinates && (
                      <Marker
                        longitude={coordinates[0]}
                        latitude={coordinates[1]}
                      >
                        {/* Din tilpassede komponent */}
                        <CameraCard
                          imgSrc={
                            "https://webkamera.atlas.vegvesen.no/public/kamera?id=3000545_1"
                          }
                        />
                      </Marker>
                    )}
                    <Layer
                      id={`route-layer-${mountainPassData.properties.id}`}
                      type="line"
                      layout={{ "line-cap": "round", "line-join": "round" }}
                      paint={
                        mountainPassData.properties.strekningstype ===
                        "Fjellovergang"
                          ? { "line-color": "#FF9999", "line-width": 2 }
                          : { "line-color": "#99CCFF", "line-width": 2 }
                      }
                    />
                  </Source>
                </div>
              ))
            ) : (
              <></>
            )}
            {mountainPass && !showAll ? (
              <>
                <Source
                  id="mountain-pass-source"
                  type="geojson"
                  data={mountainPass}
                >
                  <Layer
                    id="mountain-pass-layer"
                    type="line"
                    layout={{ "line-cap": "round", "line-join": "round" }}
                    paint={
                      mountainPass.properties.strekningstype === "Fjellovergang"
                        ? { "line-color": "#FF9999", "line-width": 2 }
                        : { "line-color": "#99CCFF", "line-width": 2 }
                    }
                  />
                </Source>
              </>
            ) : (
              <></>
            )}
          </Map>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MapPage;
