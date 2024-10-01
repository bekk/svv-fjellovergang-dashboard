import { Card, Typography, Chip, Box, Collapse, Divider } from "@mui/material";
import { KeyboardArrowRight, Circle } from "@mui/icons-material";
import { MountainPassData } from "../utils/mountainPassTypes";
import PrognoseCard from "./PrognoseCard";
import CardStats from "./CardStats";

function MountainPassCard({
  data,
  handleClick,
  index,
  openIndex,
}: {
  data: MountainPassData;
  handleClick: (id: number, open: boolean, index: number) => void;
  index: number;
  openIndex: number | null;
}) {
  const isOpen = openIndex == index;
  const handleCardClick = () => handleClick(data.properties.id, !isOpen, index);

  return (
    <Card
      variant="outlined"
      sx={{
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
              data.properties.vegkategori + "." + data.properties.vegnummer
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
        <Divider sx={{ marginTop: 2, opacity: 0.8 }} />
        <Box sx={{ padding: 1, marginTop: 1 }}>
          <Typography variant="body2">
            Fra: {data.properties.stedfesting.fra} -{" "}
            {data.properties.stedfesting.lokaltFra}
          </Typography>
          <Typography variant="body2">
            Til: {data.properties.stedfesting.til} -{" "}
            {data.properties.stedfesting.lokaltTil}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 2, opacity: 0.8 }} />
        <Typography variant="h6">Prognose</Typography>
        <PrognoseCard />
        <CardStats></CardStats>
      </Collapse>
    </Card>
  );
}

export default MountainPassCard;
