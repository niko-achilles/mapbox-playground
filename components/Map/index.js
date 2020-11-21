import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";

import React, { useState, useEffect } from "react";

import { Icon } from "semantic-ui-react";

import Blog from "../Blog";

const INITIAL_VIEWPORT = {
  latitude: 37.079197,
  longitude: 22.428425,
  zoom: 13,
};

const Map = () => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  const [isDraftMarker, setIsDraftMarker] = useState({
    state: false,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  function handleMapClick(event) {
    console.log(event);
    const { lngLat, leftButton } = event;
    if (!leftButton) return;
    setIsDraftMarker(true);
    const [longitude, latitude] = lngLat;
    setIsDraftMarker({ state: true, latitude, longitude });
  }

  return (
    <>
      <div className="map">
        <ReactMapGL
          mapboxApiAccessToken="<your map box token>"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...viewport}
          width="100%"
          height="100vh"
          onViewportChange={(newViewport) => setViewport(newViewport)}
          onClick={handleMapClick}
        >
          <div className="navigation-control">
            <NavigationControl
              onViewportChange={(newViewport) => setViewport(newViewport)}
            />
          </div>

          {userPosition && (
            <Marker
              longitude={userPosition.longitude}
              latitude={userPosition.latitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <Icon name="map marker alternate" color="blue" size="huge" />
            </Marker>
          )}
          {isDraftMarker.state && (
            <Marker
              longitude={isDraftMarker.longitude}
              latitude={isDraftMarker.latitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <Icon name="map marker alternate" color="pink" size="huge" />
            </Marker>
          )}
        </ReactMapGL>
      </div>
      <div className="sidebar">
        <Blog />
      </div>
      <style jsx>{`
        .map {
          border-right: 1px solid black;
          width: 66.6666%;
        }

        .sidebar {
          width: 33.3333%;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          padding: 20px;
          font-size: 2em;
        }

        .navigation-control {
          position: absolute;
          top: 0;
          left: 0;
          margin: 1em;
        }
      `}</style>
    </>
  );
};

export default Map;
