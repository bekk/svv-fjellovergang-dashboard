import wellknown from "wellknown";
import { MountainPassData } from "../types/mountainPassTypes";

export const buildIndividualGeoJson = (data: any[]): MountainPassData[] => {
  return data.map((feature: any) => {
    const individualGeoJSON: MountainPassData = {
      type: "Feature",
      geometry: wellknown.parse(feature.wkt),
      properties: {
        id: feature.id,
        navn: feature.navn,
        veiKategori: feature.veiKategori,
        veiNummer: feature.veiNummer,
        strekningsType: feature.strekningsType,
        fra: feature.fra,
        til: feature.til,
        lokaltFra: feature.lokaltFra,
        lokaltTil: feature.lokaltTil,
        senter: wellknown.parse(feature.senter) as GeoJSON.Point,
        passability: feature.passability,
        wkt: feature.wkt,
      },
    };
    return individualGeoJSON;
  });
};
