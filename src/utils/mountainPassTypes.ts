import { GeoJSONGeometryOrNull } from "wellknown";

export interface MountainPassData {
  type: string;
  geometry: GeoJSONGeometryOrNull;
  properties: MountainPassType;
}

export type MountainPassType = {
  id: number;
  navn: string;
  overgangsType: string;
  antallFylker: number;
  veiKategori: string;
  veiNummer: number;
  strekningsType: string;
  fra: string;
  til: string;
  lokaltFra: string;
  lokaltTil: string;
  senter?: GeoJSON.Point;
  wkt: string;
};
