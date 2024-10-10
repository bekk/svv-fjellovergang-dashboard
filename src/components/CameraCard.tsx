import {
  Card,
  Typography,
  Chip,
  Stack,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Thermostat, Air, Thunderstorm } from "@mui/icons-material";
import { WeatherData } from "../types/dataTypes";

interface CameraCardProps {
  imgSrc: string | null;
  fjell: string;
  weatherData: WeatherData;
}

function CameraCard({ imgSrc, fjell, weatherData }: CameraCardProps) {
  return (
    <Card>
      {imgSrc && (
        <CardMedia
          component="img"
          alt="Traffik kamera"
          height="300"
          image={`https://webkamera.atlas.vegvesen.no/public/kamera?id=${imgSrc}`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fjell}
        </Typography>
        <Stack direction={"row"} spacing={2}>
          {weatherData.temperature ? (
            <Chip
              label={weatherData.temperature + "°C"}
              icon={<Thermostat />}
            />
          ) : (
            <></>
          )}
          {weatherData.windSpeed ? (
            <Chip label={weatherData.windSpeed + "m/s"} icon={<Air />} />
          ) : (
            <></>
          )}
          {false ? <Chip label={"null"} icon={<Thunderstorm />} /> : <></>}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CameraCard;
