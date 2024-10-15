import { Layer } from "react-map-gl";

interface MountainPassMapLinesProps {
  mountainPassId: number;
  isMountainPassClosed: boolean;
  loading: boolean;
}

function MountainPassMapLines({
  mountainPassId,
  isMountainPassClosed,
  loading,
}: MountainPassMapLinesProps) {
  return (
    <Layer
      id={`route-layer-${mountainPassId}`}
      source={mountainPassId.toString()}
      type="line"
      layout={{ "line-cap": "round", "line-join": "round" }}
      paint={{
        "line-width": 3,
        "line-color": loading
          ? "#888888"
          : isMountainPassClosed
            ? "#d65454"
            : "#3bc474",
      }}
    />
  );
}

export default MountainPassMapLines;
