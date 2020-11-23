const NoContent = () => (
  <div className="no-content">
    <span className="map-with-pin">
      <i className="fas fa-map-marked-alt"></i>
    </span>
    <p>Διάλεξε ένα σημείο στο χάρτη και πές μας...</p>
    <style jsx>
      {`
        .no-content {
          padding-top: 20rem;
        }
        .map-with-pin {
          font-size: 80px;
        }
        p {
          margin-top: 1rem;
        }
      `}
    </style>
  </div>
);

export default NoContent;
