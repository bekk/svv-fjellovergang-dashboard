import React, { useRef, useEffect, useState } from 'react';
import Map, { Marker, Layer, Source} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import jsonData from '../fjelloverganger.json';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const mapStyle = 'mapbox://styles/mapbox/dark-v11';


const buildIndividualGeoJson = (data: any) => {
    return data.features.map((feature: any, index: number) => {
        const individualGeoJSON = {
            type: 'Feature',
            geometry: feature.geometry,
            properties: feature.properties
        };
        return individualGeoJSON;
    });
};

const initialViewState = {
    longitude: 8.4999235,
    latitude: 61.0502212,
    zoom: 6,
    width: '100%',
    height: 600,
};


function MapPage() {

    const mapRef = useRef(null);

    const individualGeoJSONs = buildIndividualGeoJson(jsonData);

    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <div style={{ margin: "5%", height: "80%", width: "90%"}}>
                <Map
                    initialViewState={initialViewState}
                    ref={mapRef}
                    mapStyle={mapStyle}
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    {individualGeoJSONs.map((mountainPassData: any) => 
                        <>
                            <Source id={mountainPassData.properties.id} type="geojson" data={mountainPassData}>
                                <Layer id={`route-layer-${mountainPassData.properties.id}`} type="line" layout={{"line-cap": "round", "line-join": "round"}} paint={{"line-color": "red", "line-width": 2}}/>
                            </Source>
                            <Marker latitude={mountainPassData.properties.senter.coordinates[1]} longitude={mountainPassData.properties.senter.coordinates[0]}>
                                <div style={{ backgroundColor: 'blue', height: '10px', width: '10px', borderRadius: '50%' }}></div>
                            </Marker>
                        </>
                    )}
                </Map>
            </div>
        </div>
    );
}

export default MapPage;
