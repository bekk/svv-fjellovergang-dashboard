import React, { useRef, useState } from 'react';
import Map, { Layer, Source, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Switch, Typography } from '@mui/material';

import jsonData from '../fjelloverganger.json';
import MountainPassCard from '../components/MountainPassCard';
import { MountainPassData } from '../utils/mountainPassTypes';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const mapStyle = 'mapbox://styles/mapbox/dark-v11';

const buildIndividualGeoJson = (data: any) => {
    return data.features.map((feature: any) => {
        const individualGeoJSON : MountainPassData = {
            type: 'Feature',
            geometry: feature.geometry,
            properties: feature.properties
        };
        return individualGeoJSON;
    });
};

const initialViewState: ViewState = {
    longitude: 8.4999235,
    latitude: 61.0502212,
    zoom: 6,
    bearing: 0,
    pitch: 0,
    padding: {top: 0, bottom: 0, left: 0, right: 0},
};

function MapPage() {

    const [showAll, setShowAll] = useState<boolean>(true);
    const [mountainPass, setMountainPass] = useState<MountainPassData | null>(null);
    const [viewState, setViewState] = useState<ViewState>(initialViewState);

    const mapRef = useRef<any>(null);

    const individualGeoJSONs: MountainPassData[] = buildIndividualGeoJson(jsonData);

    const handleClick = (id: number, open: boolean) => {
        if (open) {
            const foundPass = individualGeoJSONs.find(pass=> pass.properties.id === id);
            if (foundPass) {
                setMountainPass(foundPass);
                if (mapRef.current) {
                    mapRef.current.flyTo({
                        center:  [foundPass.properties.senter.coordinates[0], foundPass.properties.senter.coordinates[1]],
                        zoom: 9,
                        duration: 2000,
                    });
                }
            } else {
                console.log('Mountain pass not found');  
            }
        } else {
            setMountainPass(null);
        }
    }

    return (
        <div style={{display: "flex", height: "100vh", width: "100vw"}}>
            <div style={{ flex: "1", height: "100vh", width: "100%", padding: "10px"}}>
                <section style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                    <Typography>Vis alle fjelloverganger</Typography>
                    <Switch
                        checked={showAll}
                        onChange={() => setShowAll(!showAll)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </section>
                
                <div style={{ maxHeight: "100%", overflowY: "auto"}}>
                    {individualGeoJSONs.map((mountainPassData: MountainPassData) => 
                        <div key={mountainPassData.properties.id} style={{marginBottom: "10px"}}>
                            <MountainPassCard data={mountainPassData} handleClick={handleClick} />
                        </div>
                    )}
                </div>
            </div>
            <div style={{ flex: "3", height: "100%", width: "100%" }}>
                <Map
                    {...viewState}
                    ref={mapRef}
                    mapStyle={mapStyle}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    onMove={(e) => setViewState(e.viewState)}
                >
                    {showAll ? individualGeoJSONs.map((mountainPassData: MountainPassData) => 
                        <div key={mountainPassData.properties.id}>
                            <Source id={mountainPassData.properties.id} type="geojson" data={mountainPassData}>
                                <Layer 
                                    id={`route-layer-${mountainPassData.properties.id}`} 
                                    type="line" 
                                    layout={{"line-cap": "round", "line-join": "round"}} 
                                    paint={mountainPassData.properties.strekningstype === "Fjellovergang" ? 
                                            {"line-color": "#FF9999", "line-width": 2} 
                                            : {"line-color": "#99CCFF", "line-width": 2}}
                                />
                            </Source>
                        </div>) 
                        : <></>
                    }
                    {mountainPass && !showAll ? 
                        <>
                            <Source id="mountain-pass-source" type="geojson" data={mountainPass}>
                                <Layer 
                                    id="mountain-pass-layer" 
                                    type="line" 
                                    layout={{"line-cap": "round", "line-join": "round"}} 
                                    paint={mountainPass.properties.strekningstype === "Fjellovergang" ? 
                                        {"line-color": "#FF9999", "line-width": 2} 
                                        : {"line-color": "#99CCFF", "line-width": 2}}
                                />
                            </Source>
                        </> : <></>
                    }
                </Map>
            </div>
        </div>
    );
}

export default MapPage;
