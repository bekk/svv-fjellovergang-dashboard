import React, { useRef, useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Switch, Typography, IconButton, Skeleton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { WeatherData } from "../types/dataTypes";

import { fetchAllMountainPasses, fetchWeatherData } from "../api/api";
import useFetch from "../hooks/useFetch";
import { buildIndividualGeoJson } from "../utils/buildGeoJson";

import { MountainPassData } from "../types/mountainPassTypes";
import MountainPassList from "../components/MountainpassList";
import MountainMap from "../components/map/MountainMap";
import { ViewState } from "react-map-gl";

const initialViewState: ViewState = {
  longitude: 8.4999235,
  latitude: 61.0502212,
  zoom: 6,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

function MapPage() {
  const {
    data: individualGeojsons,
    error: geoError,
    loading: loadingFjelloverganger,
  } = useFetch(fetchAllMountainPasses, buildIndividualGeoJson);

  const [showAll, setShowAll] = useState<boolean>(true);

  const [finishedZoom, setFinishedZoom] = useState<boolean>(false);

  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<boolean>(false);

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
    const getWeatherData = async () => {
      try {
        if (selectedPass !== null) {
          setWeatherLoading(true);
          setWeatherError(false);

          const weatherData = await fetchWeatherData(
            selectedPass.properties.senter.coordinates[0],
            selectedPass.properties.senter.coordinates[1]
          );
          if (weatherData.status === 200) {
            setWeatherData(weatherData.data);
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherError(true);
      } finally {
        setWeatherLoading(false);
      }
    };
    getWeatherData();
  }, [selectedPass]);

  useEffect(() => {
    if (mapRef.current) {
      setFinishedZoom(false);
      if (selectedPass) {
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
        setWeatherData(null);
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
          {loadingFjelloverganger && (
            <Skeleton variant="rounded" height={"91vh"} />
          )}
          {individualGeojsons && (
            <MountainPassList
              mountainPasses={individualGeojsons}
              selectedPass={selectedPass}
              setSelectedPass={setSelectedPass}
            />
          )}
        </div>
        <MountainMap
          viewState={viewState}
          setViewState={setViewState}
          darkMode={darkMode}
          mapRef={mapRef}
          showAll={showAll}
          mountainpassData={individualGeojsons}
          mountainpassLoading={loadingFjelloverganger}
          selectedPass={selectedPass}
          finishedZoom={finishedZoom}
          weatherData={weatherData}
          weatherLoading={weatherLoading}
          weatherError={weatherError}
        />
      </div>
    </ThemeProvider>
  );
}

export default MapPage;
