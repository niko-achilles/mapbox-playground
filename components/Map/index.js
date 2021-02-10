import React from "react";

import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";

import MarkerIcon from "./parts/markerIcon";

import Blog from "../Blog";
import Context from "../../context/context";

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13,
};

const Map = () => {
  const { state, dispatch } = React.useContext(Context);

  const [viewport, setViewport] = React.useState(INITIAL_VIEWPORT);

  const [userPosition, setUserPosition] = React.useState(null);
  React.useEffect(() => {
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

  const [popup, setPopup] = React.useState(null);

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: "CREATE_DRAFT" });
    }
    const [longitude, latitude] = lngLat;
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: { longitude, latitude },
    });
  };

  const handleSelectPin = (pin) => {
    console.log(pin);
    setPopup(pin);
    dispatch({ type: "SET_PIN", payload: pin });
  };

  return (
    <>
      <ReactMapGL
        height="100%"
        width="100%"
        mapboxApiAccessToken="<YOUR MAPBOX API KEY>"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
        {/* Navigation Control */}
        <div className="__navigationcontrol">
          <NavigationControl
            onViewportChange={(newViewport) => setViewport(newViewport)}
          />
        </div>

        {/* Marker for User's Current Position */}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <MarkerIcon size={40} color="blue" />
          </Marker>
        )}

        {/* Draft Marker */}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <MarkerIcon size={40} color="grey" />
          </Marker>
        )}

        {/* Created Pins */}
        {state.pins.map((pin) => (
          <Marker
            key={pin.title}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <MarkerIcon
              size={40}
              color="tomato"
              onClick={() => handleSelectPin(pin)}
            />
          </Marker>
        ))}
        {/* Popup Dialog for Created Pins */}
        {popup && (
          <Popup
            anchor="top"
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <img className="popup__image" src={popup.url} alt={popup.title} />
            <div className="popup__tab">
              <p>
                {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
              </p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
      <style jsx>{`
        .__navigationcontrol {
          position: absolute;
          top: 0;
          left: 0;
          margin: 1em;
        }
        :global(.popup__image) {
          padding: 0.4em;
          height: 200;
          width: 200;
          object-fit: cover;
        }
        :global(.popup__tab) {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default Map;
