import { LineString, MultiLineString, Point } from "geojson";
import { GeoJSONGeometryOrNull } from "wellknown";

interface MountainPassPropData {
  id: number;
  navn: string;
  overgangstype: string;
  lokasjoner: number[];
  trafikkmeldinger: string[];
  vegkategori: string;
  vegnummer: number;
  regioner: string[];
  fylker: number[];
  strekningstype: string;
  status: string;
  vurdering: string;
  statusTungbil: string;
  senter: Point;
  harFasteKolonnetider: boolean;
  stedfesting: {
    fra: string;
    til: string;
    lokaltFra: string;
    lokaltTil: string;
  };
}

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
  senter: Point;
  wkt: string;
};
