import { Divider, Typography, Stack, Chip, Skeleton } from "@mui/material";
import { predictions } from "../types/PredictionTypes";
import { MountainPassData } from "../types/mountainPassTypes";
import MountainPassCard from "./MountainPassCard";

interface MountainPassListProps {
  mountainPasses: MountainPassData[];
  loadingFjelloverganger: boolean;
  selectedPass: MountainPassData | null;
  setSelectedPass: React.Dispatch<
    React.SetStateAction<MountainPassData | null>
  >;
  passability: any;
}

function MountainPassList({
  mountainPasses,
  loadingFjelloverganger,
  selectedPass,
  setSelectedPass,
  passability,
}: MountainPassListProps) {
  return (
    <nav style={{ maxHeight: "100%", overflowY: "auto" }}>
      {loadingFjelloverganger ? (
        <Skeleton variant="rounded" height={"91vh"} />
      ) : (
        mountainPasses.map((mountainPassData: MountainPassData) => (
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
