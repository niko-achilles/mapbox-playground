const Blog = ({ props }) => {
  return (
    <div>
      {props.state ? (
        <p>pin placed</p>
      ) : (
        <div className="content-placeholder">
          <span className="map-with-pin">
            <i className="fas fa-map-marked-alt"></i>
          </span>
          <p>Click on the map to add pin</p>
        </div>
      )}
      <style jsx>
        {`
          .content-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
          }
          .map-with-pin {
            font-size: 80px;
          }

          .content-placeholder > p {
            font-size: 2rem;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default Blog;
