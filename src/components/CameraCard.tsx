import {
  Card,
  Typography,
  Chip,
  Stack,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Thermostat, Air, Thunderstorm } from "@mui/icons-material";

interface CameraCardProps {
  imgSrc: string;
  fjell: string;
}

function CameraCard({ imgSrc, fjell }: CameraCardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="Traffik kamera"
        height="300"
        image={imgSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fjell}
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Chip label={"2.7 C"} icon={<Thermostat />} />
          <Chip label={"4.5 m/c"} icon={<Air />} />
          <Chip label={"2.7 mm/t"} icon={<Thunderstorm />} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CameraCard;
