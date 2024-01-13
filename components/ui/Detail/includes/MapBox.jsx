"use client";
import { Marker } from "react-map-gl";
import ReactMapGL from 'react-map-gl';

const MapBox = ({ locations }) => {

    const mapboxToken = process.env.MAPBOX_TOKEN;

    const viewport = {
        width: '100%',
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    };

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={mapboxToken}
        >
            {locations.map((loc, index) => (
                <Marker key={index} latitude={loc.coordinates[1]} longitude={loc.coordinates[0]}>
                    <div className="marker" />
                </Marker>
            ))}
        </ReactMapGL>
    );
};

export default MapBox;
