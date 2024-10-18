import { Divider, Typography, Stack, Chip, Skeleton } from "@mui/material";
import { predictions } from "../types/PredictionTypes";
import { isToday, isTomorrow, nextTimeInterval } from "../utils/dateCheckers";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

const LAV = 0.2;
const MEDIUM = 0.5;

interface ProgniseCardProps {
  id: number;
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

function PrognoseCard({ id, predictions, loading }: ProgniseCardProps) {

  return (
    <Stack spacing={2}>
      <Typography>Risiko for stenging på grunn av vær</Typography>

      <Typography
        component="a"
        href={`https://grafana-1041777169352.europe-west1.run.app/d/be15ano9pawhsf/svv-fjelloverganger?orgId=1&var-fjellovergangID=${id}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          fontWeight: "bold",
          textDecoration: "none",
          color: "primary.main",
          display: "inline-flex",
          "&:hover": {
            color: "secondary.main",
          },
        }}
      >
        <LaunchOutlinedIcon sx={{ fontSize: 22, mr: 0.5 }} />
        Detaljert visning
      </Typography>

      {loading ? (
        <Skeleton variant="rounded" width={210} height={300} />
      ) : predictions.length > 0 ? (
        <>
          <Typography variant="subtitle1">I dag</Typography>
          {predictions.map((prediction, index) => {
            if (isToday(prediction.datetime)) {
              return (
                <Stack key={index} direction={"row"} spacing={7}>
                  <Typography>{prediction.datetime.split(" ")[1].slice(0, 5) + " - " + nextTimeInterval(prediction.datetime.split(" ")[1].slice(0, 2))}</Typography>
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
