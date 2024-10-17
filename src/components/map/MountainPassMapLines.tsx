import { Layer } from "react-map-gl";
import { useState } from "react";
import { MountainPassData } from "../../types/mountainPassTypes";
import { buildGeoJsonFromClickedEvent } from "../../utils/buildGeoJson";

interface MountainPassMapLinesProps {
  mountainPassId: number;
  isMountainPassClosed: boolean;
  loading: boolean;
  mapRef: React.MutableRefObject<any>;
  setSelectedPass: React.Dispatch<
    React.SetStateAction<MountainPassData | null>
  >;
}

function MountainPassMapLines({
  mountainPassId,
  isMountainPassClosed,
  loading,
  mapRef,
  setSelectedPass,
}: MountainPassMapLinesProps) {
  const map = mapRef.current;
  const [hover, setHover] = useState<boolean>(false);
  const [colors, setColors] = useState<Record<string, string>>({
    red: "#d65454",
    green: "#3bc474",
  });

  map.on("mouseenter", `click-layer-${mountainPassId}`, () => {
    setHover(true);
    setColors({
      red: "#9e3c3c",
      green: "#216e41",
    });
  });

  map.on("mouseleave", `click-layer-${mountainPassId}`, () => {
    setHover(false);
    setColors({
      red: "#d65454",
      green: "#3bc474",
    });
  });

  map.on(
    "click",
    `click-layer-${mountainPassId}`,
    (e: { features: string | any[] }) => {
      const vectorTileFeature = e.features[0];

      const geojsonFeature = buildGeoJsonFromClickedEvent(vectorTileFeature);
      console.log(geojsonFeature);
      setSelectedPass(geojsonFeature);
    }
  );

  return (
    <>
      <Layer
        id={`click-layer-${mountainPassId}`}
        source={mountainPassId.toString()}
        type="line"
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": 30,
          "line-opacity": 0,
        }}
      />
      <Layer
        id={`route-layer-${mountainPassId}`}
        source={mountainPassId.toString()}
        type="line"
        layout={{ "line-cap": "round", "line-join": "round" }}
        paint={{
          "line-width": hover ? 5 : 3,
          "line-color": loading
            ? "#888888"
            : isMountainPassClosed
              ? colors.red
              : colors.green,
        }}
      />
    </>
  );
}

export default MountainPassMapLines;
