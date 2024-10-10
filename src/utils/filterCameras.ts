import { cameraData, MountainPassData } from "../types/mountainPassTypes";

export const filterCameras = (
  data: any,
  mountainPassList: MountainPassData[]
): cameraData[] => {
  return Object.keys(data).flatMap((key) =>
    data[key]
      .filter((entry: any) =>
        mountainPassList.some(
          (fjellovergang) => fjellovergang.properties.navn === entry.stedsnavn
        )
      )
      .slice(0, 1)
      .map((entry: any) => ({
        kameraId: entry.id,
        sted: entry.stedsnavn,
      }))
  );
};
