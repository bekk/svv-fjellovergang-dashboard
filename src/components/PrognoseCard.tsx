import { Divider, Typography, Stack, Chip, Box } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { predictions } from "../utils/PredictionTypes";
import { fetchPrediction } from "../api/api";

function PrognoseCard() {
  const [predictions, setPrediction] = useState<predictions[]>([]);

  const now = new Date();
  const dato = now
    .toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "")
    .replace(/\//g, "-");

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const futureTimeStr = endOfDay
    .toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "")
    .replace(/\//g, "-");

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
    <Stack spacing={2}>
      <Typography>Risiko for stenging på grunn av vær</Typography>

      <Typography variant="subtitle1">I dag</Typography>

      {predictions.map((prediction) =>
        prediction.datetime >= dato && prediction.datetime <= futureTimeStr ? (
          <Stack direction={"row"} spacing={7}>
            <Typography>{prediction.datetime.split(" ")[1]}</Typography>
            <Chip
              label={prediction.prediction.toFixed(2)}
              sx={{ backgroundColor: "#2fd460" }}
            />
          </Stack>
        ) : null
      )}
      <Divider sx={{ marginTop: 2, opacity: 0.8 }} />
      <Typography variant="subtitle1">I morgen</Typography>

      {predictions.map((prediction) =>
        prediction.datetime >= futureTimeStr ? (
          <Stack direction={"row"} spacing={7}>
            <Typography>{prediction.datetime.split(" ")[1]}</Typography>
            <Chip
              label={prediction.prediction.toFixed(2)}
              sx={{ backgroundColor: "#2fd460" }}
            />
          </Stack>
        ) : null
      )}
    </Stack>
  );
}

export default PrognoseCard;
