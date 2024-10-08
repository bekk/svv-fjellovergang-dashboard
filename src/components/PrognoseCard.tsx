import { Divider, Typography, Stack, Chip, Skeleton } from "@mui/material";
import { predictions } from "../types/PredictionTypes";

const formatDate = (date: Date): string => {
  return date
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
};

interface ProgniseCardProps {
  prediction: predictions[];
  loading: boolean;
}
function PrognoseCard({ prediction, loading }: ProgniseCardProps) {
  const now = formatDate(new Date());

  const futureDate = new Date(now);
  futureDate.setHours(23, 59, 59, 999);

  const endOfDay = formatDate(futureDate);

  return (
    <Stack spacing={2}>
      <Typography>Risiko for stenging på grunn av vær</Typography>

      <Typography variant="subtitle1">I dag</Typography>

      {loading ? (
        <Skeleton variant="rounded" width={210} height={300} />
      ) : (
        prediction.map((hour, index) =>
          hour.datetime >= now && hour.datetime <= endOfDay ? (
            <Stack key={index} direction={"row"} spacing={7}>
              <Typography>{hour.datetime.split(" ")[1]}</Typography>
              <Chip
                label={hour.prediction.toFixed(2)}
                sx={{ backgroundColor: "#2fd460" }}
              />
            </Stack>
          ) : null
        )
      )}

      <Divider sx={{ marginTop: 2, opacity: 0.8 }} />

      <Typography variant="subtitle1">I morgen</Typography>
      {loading ? (
        <Skeleton variant="rounded" width={210} height={300} />
      ) : (
        prediction.map((hour, index) =>
          hour.datetime >= endOfDay ? (
            <Stack key={index} direction={"row"} spacing={7}>
              <Typography>{hour.datetime.split(" ")[1]}</Typography>
              <Chip
                label={hour.prediction.toFixed(2)}
                sx={{ backgroundColor: "#2fd460" }}
              />
            </Stack>
          ) : null
        )
      )}
    </Stack>
  );
}

export default PrognoseCard;
