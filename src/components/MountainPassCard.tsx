import { Card, Typography, Chip, Box, Collapse, Divider } from "@mui/material";
import { KeyboardArrowRight, Circle } from "@mui/icons-material";
import { MountainPassData } from "../utils/mountainPassTypes";
import PrognoseCard from "./PrognoseCard";
import CardStats from "./CardStats";
import { predictions } from "../utils/PredictionTypes";
import { Dispatch, SetStateAction } from "react";

interface MountainPassCardProps {
  data: MountainPassData;
  prediction: predictions[];
  predictionLoading: boolean;
  selectPass: Dispatch<SetStateAction<MountainPassData | null>>;
  selectedPass: MountainPassData | null;
}

function MountainPassCard({
  data,
  prediction,
  predictionLoading,
  selectPass,
  selectedPass,
}: MountainPassCardProps) {
  const isOpen = selectedPass?.properties.id === data.properties.id;
  const handleCardClick = () =>
    selectPass((prevPass) =>
      prevPass && prevPass.properties.id === data.properties.id ? null : data
    );

  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: "10px",
        padding: 1,
        minWidth: 275,
        minHeight: 75,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 3,
          borderColor: "primary.main",
        },
      }}
      onClick={handleCardClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 75,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{data.properties.navn}</Typography>
          <KeyboardArrowRight />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Chip
            label={
              data.properties.veiKategori + "." + data.properties.veiNummer
            }
          />
          <Chip
            icon={<Circle color="success" />}
            label="Åpen"
            sx={{ backgroundColor: "#a2f1c4" }}
          />
        </Box>
      </Box>

      <Collapse in={isOpen} unmountOnExit>
        <Divider sx={{ marginTop: 2, marginBottom: 2, opacity: 0.8 }} />

        <Typography variant="body2">
          Fra: {data.properties.fra} - {data.properties.lokaltFra}
        </Typography>
        <Typography variant="body2">
          Til: {data.properties.til} - {data.properties.lokaltTil}
        </Typography>

        <Divider sx={{ marginTop: 2, opacity: 0.8 }} />

        <Typography variant="h6">Prognose</Typography>
        <PrognoseCard prediction={prediction} loading={predictionLoading} />

        <CardStats />
      </Collapse>
    </Card>
  );
}

export default MountainPassCard;
