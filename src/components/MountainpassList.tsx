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
    <nav style={{position: "relative", maxHeight: "94vh", overflowY: "auto", overflowX: "hidden"}}>
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
