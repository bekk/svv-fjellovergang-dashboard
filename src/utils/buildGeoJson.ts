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

export const buildGeoJsonFromClickedEvent = (feature: any) => {
  return {
    type: "Feature",
    geometry: feature.geometry,
    properties: {
      id: feature.properties.id,
      navn: feature.properties.navn,
      veiKategori: feature.properties.veiKategori,
      veiNummer: feature.properties.veiNummer,
      strekningsType: feature.properties.strekningsType,
      fra: feature.properties.fra,
      til: feature.properties.til,
      lokaltFra: feature.properties.lokaltFra,
      lokaltTil: feature.properties.lokaltTil,
      senter: JSON.parse(feature.properties.senter) as GeoJSON.Point,
      passability: feature.properties.passability,
      wkt: feature.properties.wkt,
    },
  };
};
