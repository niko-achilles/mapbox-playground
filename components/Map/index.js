import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";

import React, { useState, useEffect } from "react";

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
    <div className="container">
      <div className="map">
        <ReactMapGL
          mapboxApiAccessToken="pk.eyJ1Ijoibmlrb2xhb3MtYWNoaWxsZXMiLCJhIjoiY2tocWkwcXZiMTZzNDJ2azZzOXVwcDh6MyJ9.ZM6iDnibLvpgIgTAJ5nE-A"
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
              <span className="user-position-marker">
                <i className="fas fa-map-marker-alt" />
              </span>
            </Marker>
          )}
          {isDraftMarker.state && (
            <Marker
              longitude={isDraftMarker.longitude}
              latitude={isDraftMarker.latitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <span className="draft-marker">
                <i className="fas fa-map-marker-alt" />
              </span>
            </Marker>
          )}
        </ReactMapGL>
      </div>
      <div className="sidebar">
        <Blog props={isDraftMarker} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
        }
        .map {
          flex: 3 0 70%;
          border-right: 1px solid black;
        }

        .sidebar {
          flex: 1 0 30%;
          align-self: center;
        }

        .navigation-control {
          position: absolute;
          top: 0;
          left: 0;
          margin: 1em;
        }

        .user-position-marker {
          color: blue;
          font-size: 3rem;
        }

        .draft-marker {
          color: tomato;
          font-size: 3rem;
        }
      `}</style>
    </div>
  );
};

export default Map;
