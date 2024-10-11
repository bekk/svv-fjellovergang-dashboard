import { Divider, Typography, Stack, Chip, Skeleton } from "@mui/material";
import { predictions } from "../types/PredictionTypes";
import { isToday, isTomorrow } from "../utils/dateCheckers";

const LAV = 0.2;
const MEDIUM = 0.5;

interface ProgniseCardProps {
  predictions: predictions[];
  loading: boolean;
}

const getPredictionColor = (prediction: number): string => {
  if (prediction <= LAV) {
    return "green";
  } else if (prediction >= MEDIUM) {
    return "red";
  } else {
    return "orange";
  }
};

function PrognoseCard({ predictions, loading }: ProgniseCardProps) {

  return (
    <Stack spacing={2}>
      <Typography>Risiko for stenging på grunn av vær</Typography>

      

      {loading ? (
        <Skeleton variant="rounded" width={210} height={300} />
      ) : predictions.length > 0 ? (
        <>
          <Typography variant="subtitle1">I dag</Typography>
          {predictions.map((prediction, index) => {
            if (isToday(prediction.datetime)) {
              return (
                <Stack key={index} direction={"row"} spacing={7}>
                  <Typography>{prediction.datetime.split(" ")[1]}</Typography>
                  <Chip
                    label={prediction.prediction.toFixed(4)}
                    sx={{ backgroundColor: getPredictionColor(prediction.prediction) }}
                  />
                </Stack>
              )
            }
          })}

          <Typography variant="subtitle1">I morgen</Typography>
          {predictions.map((prediction, index) => {
            if (isTomorrow(prediction.datetime)) {
              return (
                <Stack key={index} direction={"row"} spacing={7}>
                  <Typography>{prediction.datetime.split(" ")[1]}</Typography>
                  <Chip
                    label={prediction.prediction.toFixed(4)}
                    sx={{ backgroundColor: getPredictionColor(prediction.prediction) }}
                  />
                </Stack>
              )
            }
          })}
        </>
      ) : (
        <Typography>Ingen prediksjon enda, desverre</Typography>
      )}
    </Stack>
  );
}

export default PrognoseCard;
