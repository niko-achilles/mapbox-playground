import ContextProvider from "../context/contextProvider";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

function Root({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default Root;
