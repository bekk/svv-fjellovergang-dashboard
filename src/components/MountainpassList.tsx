import { Divider, Typography, Stack, Chip, Skeleton } from "@mui/material";
import { predictions } from "../types/PredictionTypes";
import { MountainPassData } from "../types/mountainPassTypes";
import MountainPassCard from "./MountainPassCard";

interface MountainPassListProps {
  individualGeojsons: MountainPassData[];
  loadingFjelloverganger: boolean;
}

function MountainPassList({
  individualGeojsons,
  loadingFjelloverganger,
}: MountainPassListProps) {
  return (
    <nav style={{ maxHeight: "100%", overflowY: "auto" }}>
      {loadingFjelloverganger ? (
        <Skeleton variant="rounded" height={"91vh"} />
      ) : (
        individualGeojsons.map((mountainPassData: MountainPassData) => (
          <MountainPassCard
            data={mountainPassData}
            key={mountainPassData.properties.id}
            selectPass={setSelectedPass}
            selectedPass={selectedPass}
            closed={passability?.passability}
          />
        ))
      )}
    </nav>
  );
}

export default MountainPassList;
