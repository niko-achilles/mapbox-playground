import Blog from "../components/Blog";
import Header from "../components/Header";
import Map from "../components/Map";

const Home = () => {
  return (
    <main className="content">
      <div className="map-area">
        <Map />
      </div>
      <div className="blog-area">
        <Blog />
      </div>

      <style jsx>
        {`
          .content {
            display: flex;
            flex-direction: row;
            height: 100vh;
          }

          .blog-area {
            flex: 1 0 30%;
            padding: 1em;
          }

          .map-area {
            border-left: 1px solid #fff;

            flex: 3 0 70%;
          }
        `}
      </style>
    </main>
  );
};

export default Home;
