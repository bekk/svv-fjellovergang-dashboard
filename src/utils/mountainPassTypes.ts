import { LineString, Point } from "geojson";

interface MountainPassPropData {
    id: number;
    navn: string;
    overgangstype: string;
    lokasjoner: number[];
    trafikkmeldinger:string[];
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
    geometry: LineString;
    properties: MountainPassPropData;
}