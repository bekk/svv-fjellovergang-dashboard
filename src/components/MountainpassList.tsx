import { Skeleton } from "@mui/material";
import { MountainPassData } from "../types/mountainPassTypes";
import MountainPassCard from "./MountainPassCard";

interface MountainPassListProps {
  mountainPasses: MountainPassData[];
  selectedPass: MountainPassData | null;
  setSelectedPass: React.Dispatch<
    React.SetStateAction<MountainPassData | null>
  >;
}

function MountainPassList({
  mountainPasses,
  selectedPass,
  setSelectedPass,
}: MountainPassListProps) {
  return (
    <nav style={{ maxHeight: "100%", overflowY: "auto" }}>
      {mountainPasses.map((mountainPassData: MountainPassData) => (
        <MountainPassCard
          data={mountainPassData}
          key={mountainPassData.properties.id}
          selectPass={setSelectedPass}
          selectedPass={selectedPass}
        />
      ))}
    </nav>
  );
}

export default MountainPassList;
