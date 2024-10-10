import { Divider, Typography, Stack, Chip, Skeleton } from "@mui/material";
import { predictions } from "../types/PredictionTypes";

const LAV = 0.2;
const MEDIUM = 0.5;

interface ProgniseCardProps {
  prediction: predictions[];
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

function PrognoseCard({ prediction, loading }: ProgniseCardProps) {
  return (
    <Stack spacing={2}>
      <Typography>Risiko for stenging på grunn av vær</Typography>

      <Typography variant="subtitle1">I dag</Typography>

      {loading ? (
        <Skeleton variant="rounded" width={210} height={300} />
      ) : prediction.length > 0 ? (
        prediction.map((hour, index) => (
          <Stack key={index} direction={"row"} spacing={7}>
            <Typography>{hour.datetime.split(" ")[1]}</Typography>
            <Chip
              label={hour.prediction.toFixed(4)}
              sx={{ backgroundColor: getPredictionColor(hour.prediction) }}
            />
          </Stack>
        ))
      ) : (
        <Typography>Ingen prediksjon enda, desverre</Typography>
      )}
    </Stack>
  );
}

export default PrognoseCard;
