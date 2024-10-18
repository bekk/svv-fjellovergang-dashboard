import { Divider, Typography, Stack, Chip, Skeleton } from "@mui/material";
import { parameters, predictions } from "../types/PredictionTypes";
import { isToday, isTomorrow, nextTimeInterval } from "../utils/dateCheckers";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";

const LAV = 0.2;
const MEDIUM = 0.5;

interface ProgniseCardProps {
  id: number;
  predictions: predictions[];
  loading: boolean;
  parameters: parameters;
  parametersLoading: boolean;
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

interface IdToName {
  [id: number]: string;
}

const mountainPassIdNames: IdToName = {
  91192878: "de11iq8bwnzlsb", // Dovrefjell
  638645987: "fdyg4nqolil1ce", // Saltfjellet
  915906244: "de11hkvh6x7uof", // Haukelifjellet
  761980521: "ee11ix6s6nrb4e", // Hol - Aurland
  81833493: "ee11iyx9l80zkc", // Hardangervidda
  79089974: "de11ikylzarcwb", // Aurlandsfjellet
  91141932: "fe11ivb8k05j4c", // Geiranger - Langvatn
};

function PrognoseCard({
  id,
  predictions,
  loading,
  parameters,
  parametersLoading,
}: ProgniseCardProps) {
  return (
    <Stack spacing={2}>
      <Typography>
        Risiko for stenging av fjellovergangen på grunn av vær
      </Typography>

      <Typography>
        Følgende parameter har blitt brukt i denne prognosen
      </Typography>

      <Stack direction={"row"} spacing={1}>
        {parametersLoading ? (
          <Skeleton />
        ) : (
          parameters.inFeatures.map((parameter: string) => (
            <Chip label={parameter.replace(/_|mean/g, " ").trim()} />
          ))
        )}
      </Stack>

      <Typography
        component="a"
        href={`https://gyda1210.grafana.net/d/${mountainPassIdNames[id]}`}
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
                  <Typography>
                    {prediction.datetime.split(" ")[1].slice(0, 5) +
                      " - " +
                      nextTimeInterval(
                        prediction.datetime.split(" ")[1].slice(0, 2)
                      )}
                  </Typography>
                  <Chip
                    label={prediction.prediction.toFixed(4)}
                    sx={{
                      backgroundColor: getPredictionColor(
                        prediction.prediction
                      ),
                    }}
                  />
                </Stack>
              );
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
                    sx={{
                      backgroundColor: getPredictionColor(
                        prediction.prediction
                      ),
                    }}
                  />
                </Stack>
              );
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
function elif(arg0: boolean) {
  throw new Error("Function not implemented.");
}
