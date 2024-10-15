import { Card, Typography, Chip, Box, Collapse, Divider, Tooltip } from "@mui/material";
import { KeyboardArrowRight, Circle, Warning} from "@mui/icons-material";
import { MountainPassData } from "../types/mountainPassTypes";
import PrognoseCard from "./PrognoseCard";
import { Dispatch, SetStateAction } from "react";
import { fetchPrediction } from "../api/api";
import useFetch from "../hooks/useFetch";

interface MountainPassCardProps {
  data: MountainPassData;
  selectPass: Dispatch<SetStateAction<MountainPassData | null>>;
  selectedPass: MountainPassData | null;
}

function MountainPassCard({
  data,
  selectPass,
  selectedPass,
}: MountainPassCardProps) {
  const isOpen = selectedPass?.properties.id === data.properties.id;
  const handleCardClick = () =>
    selectPass((prevPass) =>
      prevPass && prevPass.properties.id === data.properties.id ? null : data
    );

  const {
    data: prediction,
    error: predictionError,
    loading: predictionLoading,
  } = useFetch(() => fetchPrediction(data.properties.id.toString()));

  const isMountainPassClosed = data.properties.passability;

  const isPredictionHigh = () => {
    if (prediction !== null) {
      return prediction.some((pred: any) => pred.prediction >= 0.5);
    }
    return false;
  };
  

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
          
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isPredictionHigh() && 
              <Tooltip title="Det er muligens fare for stengning ved denne fjellovergangen" placement="top">
                <Warning sx={{ color: "orange" }} />
              </Tooltip>
            }
            <Chip
              icon={<Circle color={isMountainPassClosed ? "error" : "success"} />}
              label={isMountainPassClosed ? "Stengt" : "Åpen"}
              sx={{
                backgroundColor: isMountainPassClosed ? "#693030" : "#306948",
              }}
            />
          </div>
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
        <PrognoseCard id={data.properties.id} predictions={prediction} loading={predictionLoading} />
      </Collapse>
    </Card>
  );
}

export default MountainPassCard;
