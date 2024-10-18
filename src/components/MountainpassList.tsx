import { fetchTrainingParameters } from "../api/api";
import useFetch from "../hooks/useFetch";
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
  const {
    data: parameters,
    error: parametersError,
    loading: parametersLoading,
  } = useFetch(fetchTrainingParameters);

  return (
    <nav
      style={{
        position: "relative",
        maxHeight: "94vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {mountainPasses.map((mountainPassData: MountainPassData) => (
        <MountainPassCard
          data={mountainPassData}
          key={mountainPassData.properties.id}
          selectPass={setSelectedPass}
          selectedPass={selectedPass}
          parameters={parameters}
          parametersLoading={parametersLoading}
        />
      ))}
    </nav>
  );
}

export default MountainPassList;
