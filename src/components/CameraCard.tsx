import {
  Card,
  Typography,
  Chip,
  Stack,
  CardMedia,
  CardContent,
  Skeleton,
} from "@mui/material";
import { Thermostat, Air, Thunderstorm } from "@mui/icons-material";
import { WeatherData } from "../types/dataTypes";

const cameras: { [id: number]: string } = {
  638645987: "1829006_2",
  91192878: "1629010_1",
  915906244: "1229047_2",
  79089974: "3000440_1",
  91141932: "1529007_1",
  761980521: "1429003_1",
  81833493: "1229021_1",
};

interface CameraCardProps {
  cameraId: number;
  fjell: string;
  weatherData: WeatherData | null;
  weatherLoading: boolean;
  weatherError: boolean;
}

function CameraCard({
  cameraId,
  fjell,
  weatherData,
  weatherLoading,
  weatherError,
}: CameraCardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="Traffik kamera"
        height="300"
        image={`https://webkamera.atlas.vegvesen.no/public/kamera?id=${cameras[cameraId]}`}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fjell}
        </Typography>
        {weatherLoading ? (
          <Skeleton variant="rounded" width={"25vh"} />
        ) : weatherError ? (
          <Typography>Error fetching weather data, try again later</Typography>
        ) : (
          <Stack direction={"row"} spacing={2}>
            {weatherData && weatherData.temperature && (
              <Chip
                label={weatherData.temperature + "°C"}
                icon={<Thermostat />}
              />
            )}
            {weatherData && weatherData.windSpeed && (
              <Chip label={weatherData.windSpeed + "m/s"} icon={<Air />} />
            )}
            {false ? <Chip label={"null"} icon={<Thunderstorm />} /> : <></>}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default CameraCard;
